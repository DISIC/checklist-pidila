const showdown = require('showdown')
const fs = require('fs')

const PROD_PARAMS = {
  alertsPath: './data/alerts/',
  bundledAlertsDataPath: './assets/data/bundledAlertsData.json'
}

const TEST_PARAMS = {
  alertsPath: './scripts/__spec__/fixtures/alerts/',
  bundledAlertsDataPath: './scripts/__spec__/bundledAlertsData.json'
}

const resultObject = {
  alerts: []
}

let params = {}
const isTest = process.argv[2] === '--test'

params = isTest ? TEST_PARAMS : PROD_PARAMS

fs.readdirSync(params.alertsPath).forEach(fileName => {
  const filePath = params.alertsPath + fileName
  const file = fs.readFileSync(filePath).toString()

  const fileId = fileName.replace(/\.md?/, '')

  const fileDatas = file.split('---', 3)

  const metaDatas = fileDatas[1]
    .trim()
    .split('\n')
    .map((metaData) => {
      const metaDataArray = metaData.split(' : ')
      return {
        key: metaDataArray[0],
        value: metaDataArray[1]
      }
    })

  try {
    var type = extractMetadata(metaDatas, 'Type')
    var isDisplayed = JSON.parse(extractMetadata(metaDatas, 'EstAffichée'))

  } catch (error) {
    const errorMessage = `Missing metadata in file ${fileName}`
    throw new Error(errorMessage)
  }

  var converter = new showdown.Converter({noHeaderId: true, headerLevelStart: 3, openLinksInNewWindow: true})
  converter.setFlavor('github')
  const rawHtml = converter.makeHtml(fileDatas[2])

  const replacementString = 'title="$1 - nouvelle fenêtre" target="_blank" rel="noopener noreferrer">' +
    '$1<svg aria-hidden="true" focusable="false" class="svg-icon icon-lien_externe">' +
    '<use xlink:href="svg/icon-sprite.svg#externe"></use></svg></a>'

  if (isDisplayed) {
    resultObject.alerts.push({
      id: fileId,
      type: type,
      rawHTMLContent: rawHtml.replace(/target="_blank">(.*?)<\/a>/g, replacementString)
    })
  }
})

fs.writeFileSync(params.bundledAlertsDataPath, JSON.stringify(resultObject))

function extractMetadata(metaDatas, metaDataTitle) {
  metaData = metaDatas
    .filter((metaData) => metaData.key === metaDataTitle)
    .map((metaData) => {
      return metaData.value
    })[0]

  if (typeof metaData === 'undefined') {
    throw new Error()
  }

  return metaData
}
