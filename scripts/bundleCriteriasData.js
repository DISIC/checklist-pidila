const showdown = require('showdown')
const fs = require('fs')

const PROD_PARAMS = {
  criteriasPath: './data/criteres/',
  bundledDataPath: './assets/data/bundledCriteriasData.json'
}

const TEST_PARAMS = {
  criteriasPath: './scripts/__spec__/fixtures/criterias/',
  bundledDataPath: './scripts/__spec__/bundledCriteriasData.json'
}

const resultObject = {
  criterias: [],
  globalFilters: []
}

let params = {}
const isTest = process.argv[2] === '--test'

params = isTest ? TEST_PARAMS : PROD_PARAMS

fs.readdirSync(params.criteriasPath).forEach(fileName => {
  const filePath = params.criteriasPath + fileName
  const file = fs.readFileSync(filePath).toString()

  const fileId = fileName.replace(/\.md?/, '').replace('_', '-')

  const fileDatas = file.split('---', 3)

  const metaDatasWithTitle = fileDatas[1]
    .trim()
    .split('\n')
    .map((metaData) => {
      const metaDataArray = metaData.split(' : ')
      return {
        title: metaDataArray[0],
        content: metaDataArray[1]
      }
    })

  const metaDatasWithoutTitle = metaDatasWithTitle
    .filter((metaData) => metaData.title !== 'Titre')
    .map((metaData) => {
      return {
        title: metaData.title.trim(),
        tags: metaData.content.split(', ').map(tag => tag.trim())
      }
    })

  try {
    var title = extractMetadata(metaDatasWithTitle, 'Titre')
  } catch (error) {
    const errorMessage = `Missing metadata in file ${fileName}`
    throw new Error(errorMessage)
  }

  var converter = new showdown.Converter({noHeaderId: true, headerLevelStart: 3, openLinksInNewWindow: true})
  converter.setFlavor('github')
  const rawHtml = converter.makeHtml(fileDatas[2])
  let textContent = fileDatas[2]
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')

  const replacementString = 'title="$1 - nouvelle fenêtre" target="_blank" rel="noopener noreferrer">' +
    '$1<svg aria-hidden="true" focusable="false" class="svg-icon icon-lien_externe">' +
    '<use xlink:href="svg/icon-sprite.svg#externe"></use></svg></a>'

  resultObject.criterias.push({
    id: fileId,
    title: title,
    filters: metaDatasWithoutTitle,
    rawHTMLContent: rawHtml.replace(/target="_blank">(.*?)<\/a>/g, replacementString),
    textContent: textContent
  })

  defineGlobalFilters(metaDatasWithoutTitle, resultObject)
})

fs.writeFileSync(params.bundledDataPath, JSON.stringify(resultObject))

function extractMetadata (metaDatas, metaDataTitle) {
  let metaData = metaDatas
    .filter((metaData) => metaData.title === metaDataTitle)
    .map((metaData) => {
      return metaData.content
    })[0]

  if (typeof metaData === 'undefined') {
    throw new Error()
  }

  return metaData
}

function defineGlobalFilters (initialFilters, targetObject) {
  let copyOfFilters = JSON.parse(JSON.stringify(initialFilters))

  copyOfFilters.forEach((newFilter) => {
    let indexOfFilter = targetObject.globalFilters.map(filter => filter.title).indexOf(newFilter.title)

    if (indexOfFilter !== -1) {
      const duplicatedArray = targetObject.globalFilters[indexOfFilter].tags.concat(newFilter.tags)
      const deduplicatedArray = Array.from(new Set(duplicatedArray))
      targetObject.globalFilters[indexOfFilter].tags = deduplicatedArray
    } else {
      targetObject.globalFilters = targetObject.globalFilters.concat(newFilter)
    }
  })
}
