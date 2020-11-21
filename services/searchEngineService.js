import elasticlunr from 'elasticlunr'
import stopWordsFr from '~/lib/stopWordsFr'

const SEARCH_CONFIG = {
  fields: {
    id: {boost: 5, bool: 'OR'},
    title: {boost: 1, bool: 'AND', expand: true},
    textContent: {boost: 1}
  },
  bool: 'OR'
}

export default class {
  constructor (criterias) {
    configureElasticlunr()
    elasticlunr.addStopWords(stopWordsFr)
    this.index = elasticlunr(function () {
      this.setRef('id')
      this.addField('id')
      this.addField('title')
      this.addField('textContent')
    })
    criterias.forEach(criteria => {
      this.index.addDoc(criteria)
    })
  }

  search (query) {
    return this.index.search(query, SEARCH_CONFIG).map(result => result.ref)
  }
}

function configureElasticlunr () {
  elasticlunr.tokenizer.setSeperator(/[\s]+/)
  elasticlunr.clearStopWords()
  elasticlunr.addStopWords(stopWordsFr)
}
