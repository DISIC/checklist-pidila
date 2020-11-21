require('jsdom-global')()

const shallowMount = require('@vue/test-utils').shallowMount
const TurndownService = require('turndown')
const fs = require('fs')
const html = require('./tempComp.json').html

const markdownConvertor = new TurndownService()
let wrapper = shallowMount({
  template: html
})

const articleWrappers = wrapper.findAll('article')

articleWrappers.wrappers
  .forEach((articleWrapper, index) => {
    const id = generateId(index)
    const criteria = createCriteriaFromArticleWrapper(articleWrapper, id)
    console.log('generating article ' + (index + 1))
    createMarkdownFileForCriteria(criteria)
  })

function createCriteriaFromArticleWrapper (articleWrapper, currentId) {
  let title = articleWrapper.find('h2 button').text().replace(/[ ]+/g, ' ')

  let filters = articleWrapper.find('ul.crit-item-meta').findAll('li').wrappers
    .map((filterWrapper) => {
      const metaDataArray = filterWrapper.element.textContent.split(' : ')
      return {
        title: metaDataArray[0],
        content: metaDataArray[1]
      }
    })
    .map((metaData) => {
      const tags = metaData.content.split(', ').map(tag => tag.replace(/,/g, '').trim())
      return {
        title: metaData.title.trim(),
        tags: tags
      }
    })

  let htmlContent = articleWrapper.find('.crit-item-test-content').html() +
    articleWrapper.find('.crit-item-related').html()

  return {
    id: currentId,
    title: title,
    filters: filters,
    rawHTMLContent: htmlContent
  }
}

function createMarkdownFileForCriteria (criteria) {
  let markdownString = '---\n'
  markdownString += 'Titre : ' + criteria.title + '\n'

  markdownString += criteria.filters.reduce((filterString, filter) => {
    filterString += filter.title + ' : ' + filter.tags.join(', ') + '\n'
    return filterString
  }, '')

  markdownString += '\n---\n'

  markdownString += convertToMd(criteria.rawHTMLContent)

  fs.writeFileSync(generateOutputPath(criteria.id), markdownString)
}

function convertToMd (html) {
  return markdownConvertor.turndown(html)
    .replace(/</g, '`<')
    .replace(/>/g, '>`')
    .replace(/#+/g, '#')
}

function generateId (index) {
  return 'tmp_' + leftPad(index + 1, 3)
}

function generateOutputPath (id) {
  return './criteres/' + id + '.md'
}

function leftPad (number, targetLength) {
  var output = number + ''
  while (output.length < targetLength) {
    output = '0' + output
  }
  return output
}
