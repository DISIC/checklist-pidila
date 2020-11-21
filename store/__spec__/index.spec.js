import {state, mutations, actions, getters} from '../index'
import {getCriteriasData, getAlertsData} from '~/services/getBundledDataService'
import {getConfigData} from '~/services/getConfigService'

jest.mock('~/services/getBundledDataService', () => ({
  getCriteriasData: jest.fn(),
  getAlertsData: jest.fn()
}))

jest.mock('~/services/getConfigService', () => ({
  getConfigData: jest.fn()
}))

beforeEach(() => {
  getCriteriasData.mockReset()
  getAlertsData.mockReset()
  getConfigData.mockReset()
})

describe('state', () => {
  it('should be initialized with an object', () => {
    // then
    expect(state).toEqual({criterias: [], alerts: [], globalFilters: [], checkedFilters: [], searchQuery: ''})
  })
})

describe('mutations | SET_CRITERIAS', () => {
  it('should set criterias property of state', () => {
    // given
    const state = {criterias: []}
    const payload = {
      criterias: [
        {title: 'Merveilleux titre'}
      ]
    }

    // when
    mutations.SET_CRITERIAS(state, payload)

    // then
    const expectedObject = {
      criterias: [
        {title: 'Merveilleux titre'}
      ]
    }

    expect(state).toEqual(expectedObject)
  })
})

describe('mutations | SET_GLOBAL_FILTERS', () => {
  it('should set global filters property of state', () => {
    // given
    const state = {globalFilters: []}
    const payload = {
      globalFilters: [
        {title: 'Merveilleux titre', tags: ['tag', 'tag2']}
      ]
    }

    // when
    mutations.SET_GLOBAL_FILTERS(state, payload)

    // then
    const expectedObject = {
      globalFilters: [
        {title: 'Merveilleux titre', tags: ['tag', 'tag2']}
      ]
    }

    expect(state).toEqual(expectedObject)
  })
})

describe('mutations | SET_ALERTS', () => {
  it('should set alerts property of state', () => {
    // given
    const state = {alerts: []}
    const payload = {
      alerts: [
        {type: 'warning'}
      ]
    }

    // when
    mutations.SET_ALERTS(state, payload)

    // then
    const expectedObject = {
      alerts: [
        {type: 'warning'}
      ]
    }

    expect(state).toEqual(expectedObject)
  })
})

describe('mutations | UPDATE_FILTER_TAGS', () => {
  it('should set checkedFilters property of state', () => {
    // given
    const state = {checkedFilters: []}
    const payload = {title: 'Référentiel', tags: ['RGAA', 'Bonnes Pratiques Opquast']}
    // when
    mutations.UPDATE_FILTER_TAGS(state, payload)

    // then
    const expectedObject = {
      checkedFilters: [
        {title: 'Référentiel', tags: ['RGAA', 'Bonnes Pratiques Opquast']}
      ]
    }

    expect(state).toEqual(expectedObject)
  })

  it('should update correctly checkedFilters property of state', () => {
    // given
    const state = {checkedFilters: [{title: 'Référentiel', tags: ['RGAA', 'Bonnes Pratiques Opquast']}]}
    const payload = {title: 'Thématiques', tags: ['AirGuitar', 'Gulp']}
    // when
    mutations.UPDATE_FILTER_TAGS(state, payload)

    // then
    const expectedObject = {
      checkedFilters: [
        {title: 'Référentiel', tags: ['RGAA', 'Bonnes Pratiques Opquast']},
        {title: 'Thématiques', tags: ['AirGuitar', 'Gulp']}
      ]
    }

    expect(state).toEqual(expectedObject)
  })

  it('should replace correctly checkedFilters if element title already exists', () => {
    // given
    const state = {checkedFilters: [{title: 'Référentiel', tags: ['RGAA', 'Bonnes Pratiques Opquast']}]}
    const payload = {title: 'Référentiel', tags: ['Coréen']}

    // when
    mutations.UPDATE_FILTER_TAGS(state, payload)

    // then
    const expectedObject = {
      checkedFilters: [
        {title: 'Référentiel', tags: ['Coréen']}
      ]
    }

    expect(state).toEqual(expectedObject)
  })

  it('should update URL query params with the checked filters', () => {
    // given
    const state = {checkedFilters: []}
    const payload = {title: 'Référentiel', tags: ['RGAA', 'Bonnes Pratiques Opquast']}
    // when
    mutations.UPDATE_FILTER_TAGS(state, payload)

    // then

    // expect(state).toEqual(expectedObject)
  })
})

describe('mutations | UPDATE_GLOBAL_FILTERS', () => {
  it('should set globalFilters property of state', () => {
    // given
    const state = {globalFilters: []}
    const payload = {globalFilters: [{title: 'Référentiel', tags: ['RGAA', 'Bonnes Pratiques Opquast']}]}
    // when
    mutations.UPDATE_GLOBAL_FILTERS(state, payload)

    // then
    const expectedObject = {
      globalFilters: [
        {title: 'Référentiel', tags: ['RGAA', 'Bonnes Pratiques Opquast']}
      ]
    }

    expect(state).toEqual(expectedObject)
  })

  it('should update correctly globalFilters property of state', () => {
    // given
    const state = {globalFilters: [{title: 'Référentiel', tags: ['RGAA', 'Bonnes Pratiques Opquast']}]}
    const payload = {globalFilters: [{title: 'Thématiques', tags: ['AirGuitar', 'Gulp']}]}

    // when
    mutations.UPDATE_GLOBAL_FILTERS(state, payload)

    // then
    const expectedObject = {
      globalFilters: [
        {title: 'Référentiel', tags: ['RGAA', 'Bonnes Pratiques Opquast']},
        {title: 'Thématiques', tags: ['AirGuitar', 'Gulp']}
      ]
    }

    expect(state).toEqual(expectedObject)
  })

  it('should add new globalFilter tag if element title already exists', () => {
    // given
    const state = {globalFilters: [{title: 'Référentiel', tags: ['RGAA', 'Bonnes Pratiques Opquast']}]}
    const payload = {globalFilters: [{title: 'Référentiel', tags: ['Coréen']}]}

    // when
    mutations.UPDATE_GLOBAL_FILTERS(state, payload)

    // then
    const expectedObject = {
      globalFilters: [
        {title: 'Référentiel', tags: ['RGAA', 'Bonnes Pratiques Opquast', 'Coréen']}
      ]
    }

    expect(state).toEqual(expectedObject)
  })
})

describe('mutations | SET_FILTER_TAGS_FROM_URL_QUERY', () => {
  it('should not update the checked filters if the metadata is not present in the global filters', () => {
    // given
    const state = {
      checkedFilters: [],
      globalFilters: [{
        title: 'Référentiel',
        tags: ['RGAA', 'Bonnes pratiques Opquast']
      }]
    }
    const payload = {
      'Coréen': ['tag1', 'tag2']
    }
    // when
    mutations.SET_FILTER_TAGS_FROM_URL_QUERY(state, payload)

    // then
    const expectedFilters = []
    expect(state.checkedFilters).toEqual(expectedFilters)
  })

  it('should update the checked filters if the metadata and the tags are present in the global filters', () => {
    // given
    const state = {
      checkedFilters: [],
      globalFilters: [{
        title: 'Référentiel',
        tags: ['RGAA']
      }]
    }
    const payload = {
      'Référentiel': ['RGAA', 'Bonnes pratiques Opquast'],
      'Profil': 'Développeur'
    }
    // when
    mutations.SET_FILTER_TAGS_FROM_URL_QUERY(state, payload)

    // then
    const expectedFilters = [{
      title: 'Référentiel',
      tags: ['RGAA']
    }]
    expect(state.checkedFilters).toEqual(expectedFilters)
  })
})

describe('mutations | SET_SEARCH_QUERY_FROM_URL_QUERY', () => {
  it('should set the search query at empty when search query is not present', () => {
    // given
    const state = {
      searchQuery: 'PEPSI'
    }
    const payload = {
      'Coréen': ['tag1', 'tag2']
    }
    // when
    mutations.SET_SEARCH_QUERY_FROM_URL_QUERY(state, payload)

    // then
    const expectedSearchQuery = ''
    expect(state.searchQuery).toEqual(expectedSearchQuery)
  })

  it('should set the search query when search query is present', () => {
    // given
    const state = {
      searchQuery: 'PEPSI'
    }
    const payload = {
      'Coréen': ['tag1', 'tag2'],
      searchQuery: 'COCA'
    }
    // when
    mutations.SET_SEARCH_QUERY_FROM_URL_QUERY(state, payload)

    // then
    const expectedSearchQuery = 'COCA'
    expect(state.searchQuery).toEqual(expectedSearchQuery)
  })
})

describe('mutations | SET_SEARCH_QUERY', () => {
  it('should set searchQueryTags property of state', () => {
    // given
    const state = {searchQuery: ''}
    const payload = 'Kébab, Tacos'

    // when
    mutations.SET_SEARCH_QUERY(state, payload)

    // then
    const expectedObject = {
      searchQuery: 'Kébab, Tacos'
    }

    expect(state).toEqual(expectedObject)
  })
})

describe('actions | LOAD_DATA', () => {
  let commit
  const criteriasPayload = {
    criterias: [
      {title: 'Merveilleux titre'}
    ],
    globalFilters: [
      {title: 'Merveilleux titre', tags: ['tag', 'tag2']}
    ]
  }

  const configPayload = {
    globalFilters: [
      {title: 'Merveilleux titre', tags: ['tag', 'tag2']}
    ]
  }
  const alertsPayload = {
    alerts: [
      {type: 'warning'}
    ]
  }

  beforeEach(() => {
    commit = jest.fn()
    getCriteriasData.mockReturnValue(Promise.resolve(criteriasPayload))
    getAlertsData.mockReturnValue(Promise.resolve(alertsPayload))
    getConfigData.mockReturnValue(Promise.resolve(configPayload))
  })

  it('should call getBundledDataService when store is initialized', async () => {
    // when
    await actions.LOAD_DATA({commit})

    // then
    expect(getCriteriasData).toHaveBeenCalled()
  })

  it('should call getConfigService when store is initialized', async () => {
    // when
    await actions.LOAD_DATA({commit})

    // then
    expect(getConfigData).toHaveBeenCalled()
  })

  it('should update criterias', async () => {
    // when
    await actions.LOAD_DATA({commit})

    // then
    expect(commit).toHaveBeenCalledWith('SET_CRITERIAS', criteriasPayload)
  })

  it('should set globalFilters with configuration', async () => {
    // when
    await actions.LOAD_DATA({commit})

    // then
    expect(commit).toHaveBeenCalledWith('SET_GLOBAL_FILTERS', configPayload)
  })

  it('should update globalFilters with data from json', async () => {
    // when
    await actions.LOAD_DATA({commit})

    // then
    expect(commit).toHaveBeenCalledWith('UPDATE_GLOBAL_FILTERS', criteriasPayload)
  })

  it('should update alerts', async () => {
    // when
    await actions.LOAD_DATA({commit})

    // then
    expect(commit).toHaveBeenCalledWith('SET_ALERTS', alertsPayload)
  })
})

describe('getters | displayedCriteriasNumber', () => {
  it('should return the number of displayedCriterias', () => {
    // given
    const state = {}
    const mockGetters = {
      filteredCriterias: [{}]
    }
    const expectedResult = 1

    // then
    expect(getters.displayedCriteriasNumber(state, mockGetters)).toEqual(expectedResult)
  })
})

describe('getters | orderedFilters', () => {
  it('should return the displayed filter tags in the right order', () => {
    // given
    const state = {
      globalFilters: [
        {title: 'Référentiel', tags: ['RGAA', 'Charte de l\'État', 'Bonnes pratiques Opquast']},
        {title: 'Profil', tags: ['Conception', 'Graphisme', 'Intégration']}
      ],
      checkedFilters: [
        {title: 'Profil', tags: ['Graphisme']},
        {title: 'Référentiel', tags: ['Bonnes pratiques Opquast', 'RGAA']}
      ]
    }
    const expectedResult = [
      {title: 'Référentiel', tags: ['RGAA', 'Bonnes pratiques Opquast']},
      {title: 'Profil', tags: ['Graphisme']}
    ]

    // then
    expect(getters.orderedFilters(state)).toEqual(expectedResult)
  })
})

describe('getters | tagsFromFilterTitle', () => {
  it('should return empty array for a given title that doesn\'t exist', () => {
    // given
    const state = {
      checkedFilters: [
        {title: 'Profil', tags: ['Graphisme']},
        {title: 'Référentiel', tags: ['RGAA', 'Bonnes pratiques Opquast']}
      ]
    }
    const title = 'Salade'

    const expectedResult = []

    // then
    expect(getters.tagsFromFilterTitle(state)(title)).toEqual(expectedResult)
  })

  it('should return the correct tags for a given title', () => {
    // given
    const state = {
      checkedFilters: [
        {title: 'Profil', tags: ['Graphisme']},
        {title: 'Référentiel', tags: ['RGAA', 'Bonnes pratiques Opquast']}
      ]
    }
    const title = 'Référentiel'

    const expectedResult = ['RGAA', 'Bonnes pratiques Opquast']

    // then
    expect(getters.tagsFromFilterTitle(state)(title)).toEqual(expectedResult)
  })
})

describe('getters | filteredCriterias', () => {
  const criterias = [
    {
      'id': 'tmp_001',
      'title': "L'attribut alt des images, zones réactives et boutons graphiques est présent.",
      'filters': [
        {
          'title': 'Profil',
          'tags': [
            'Intégration',
            'Développement',
            'Rédactionnel'
          ]
        },
        {
          'title': 'Référentiel',
          'tags': [
            'RGAA',
            'Bonnes pratiques Opquast'
          ]
        },
        {
          'title': 'Niveau',
          'tags': [
            '1'
          ]
        },
        {
          'title': 'Thématique',
          'tags': [
            'Alternatives'
          ]
        }
      ],
      'rawHTMLContent': "<p>Chaque image (balise img) a-t-elle un attribut alt ?</p>\n<p>Chaque zone (balise area) d'une image réactive a-t-elle un attribut alt ?</p>\n<p>Chaque bouton de formulaire (balise input avec l'attribut type=\"image\") a-t-il un attribut alt ?</p>\n<h3>Références</h3>\n<ul>\n<li>RGAA : 1.1.1, 1.1.2, 1.1.3</li>\n<li>Bonnes pratiques Opquast : 1, 2, 3</li>\n</ul>",
      'textContent': "\nChaque image (balise img) a-t-elle un attribut alt ?\n\nChaque zone (balise area) d'une image réactive a-t-elle un attribut alt ?\n\nChaque bouton de formulaire (balise input avec l'attribut type=\"image\") a-t-il un attribut alt ?\n\n# Références\n\n*   RGAA : 1.1.1, 1.1.2, 1.1.3\n*   Bonnes pratiques Opquast : 1, 2, 3"
    },
    {
      'id': 'tmp_002',
      'title': "Les images légendées utilisent l'élément figure, le rôle group et une alternative textuelle donnant la référence à la légende.",
      'filters': [
        {
          'title': 'Profil',
          'tags': [
            'Intégration',
            'Développement',
            'Rédactionnel'
          ]
        },
        {
          'title': 'Référentiel',
          'tags': [
            'RGAA'
          ]
        },
        {
          'title': 'Niveau',
          'tags': [
            '2'
          ]
        },
        {
          'title': 'Thématique',
          'tags': [
            'Alternatives'
          ]
        }
      ],
      'rawHTMLContent': '<p>Chaque image légendée (balise img ou input avec l’attribut type="image" associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?</p>\n<p>L’image (balise img) et sa légende sont contenues dans une balise figure ;</p>\n<p>La balise figure possède un attribut role="group" ;</p>\n<p>Le contenu de l’attribut alt de l’image contient une référence à la légende adjacente.</p>\n<p>Chaque image objet légendée (balise object avec l’attribut type="image/…" associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?</p>\n<p>L’image objet (balise object) et sa légende sont contenues dans une balise figure ;</p>\n<p>La balise figure possède un attribut role="group".</p>\n<p>Chaque image embarquée légendée (balise embed associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?</p>\n<p>L’image embarquée (balise embed) et sa légende sont contenues dans une balise figure ;</p>\n<p>La balise figure possède un attribut role="group" ;</p>\n<p>L’alternative contient une référence à la légende adjacente.</p>\n<p>Chaque image vectorielle légendée (balise svg associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?</p>\n<p>L’image vectorielle (balise svg) et sa légende sont contenues dans une balise figure ;</p>\n<p>La balise figure possède un role="group" ;</p>\n<p>Le contenu de la propriété aria-label ou de la balise desc de l’image vectorielle contient une référence à la légende adjacente.</p>\n<p>Chaque image bitmap légendée (balise canvas associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?</p>\n<p>L’image bitmap (balise canvas) et sa légende sont contenues dans une balise figure ;</p>\n<p>La balise figure possède un attribut role="group" ;</p>\n<p>Le contenu entre <code>&lt;canvas&gt;</code> et <code>&lt;/canvas&gt;</code> de l’image bitmap contient une référence à la légende adjacente.</p>\n<h3>Références</h3>\n<ul>\n<li>RGAA : 1.10.1, 1.10.2, 1.10.3, 1.10.4, 1.10.5</li>\n</ul>',
      'textContent': '\nChaque image légendée (balise img ou input avec l’attribut type="image" associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?\n\nL’image (balise img) et sa légende sont contenues dans une balise figure ;\n\nLa balise figure possède un attribut role="group" ;\n\nLe contenu de l’attribut alt de l’image contient une référence à la légende adjacente.\n\nChaque image objet légendée (balise object avec l’attribut type="image/…" associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?\n\nL’image objet (balise object) et sa légende sont contenues dans une balise figure ;\n\nLa balise figure possède un attribut role="group".\n\nChaque image embarquée légendée (balise embed associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?\n\nL’image embarquée (balise embed) et sa légende sont contenues dans une balise figure ;\n\nLa balise figure possède un attribut role="group" ;\n\nL’alternative contient une référence à la légende adjacente.\n\nChaque image vectorielle légendée (balise svg associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?\n\nL’image vectorielle (balise svg) et sa légende sont contenues dans une balise figure ;\n\nLa balise figure possède un role="group" ;\n\nLe contenu de la propriété aria-label ou de la balise desc de l’image vectorielle contient une référence à la légende adjacente.\n\nChaque image bitmap légendée (balise canvas associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?\n\nL’image bitmap (balise canvas) et sa légende sont contenues dans une balise figure ;\n\nLa balise figure possède un attribut role="group" ;\n\nLe contenu entre `<canvas>` et `</canvas>` de l’image bitmap contient une référence à la légende adjacente.\n\n# Références\n\n*   RGAA : 1.10.1, 1.10.2, 1.10.3, 1.10.4, 1.10.5'
    },
    {
      'id': 'tmp_003',
      'title': 'Les menus de navigation sont affichés et placés dans le code source de manière cohérente à travers toutes les pages.',
      'filters': [
        {
          'title': 'Profil',
          'tags': [
            'Conception',
            'Graphisme',
            'Intégration',
            'Développement'
          ]
        },
        {
          'title': 'Référentiel',
          'tags': [
            'RGAA',
            "Charte de l'État",
            'Bonnes pratiques Opquast'
          ]
        },
        {
          'title': 'Niveau',
          'tags': [
            '2'
          ]
        },
        {
          'title': 'Thématique',
          'tags': [
            'Navigation'
          ]
        }
      ],
      'rawHTMLContent': "<p>Dans chaque ensemble de pages, chaque page ayant un menu de navigation vérifie-t-elle ces conditions (hors cas particuliers) ?</p>\n<p>• Le menu de navigation est toujours à la même place dans la présentation</p>\n<p>• Le menu de navigation se présente toujours dans le même ordre relatif dans le code source.</p>\n<p>Chaque barre de navigation répétée dans un ensemble de pages vérifie-t-elle ces conditions (hors cas particuliers) ?</p>\n<p>• La barre de navigation est toujours à la même place dans la présentation</p>\n<p>• La barre de navigation se présente toujours dans le même ordre relatif dans le code source.</p>\n<p>Dans chaque ensemble de pages, le menu de navigation principal a-t-il une présentation cohérente (hors cas particuliers) ?</p>\n<p>Dans chaque ensemble de pages, les barres de navigation répétées ont-elles une présentation cohérente (hors cas particuliers) ?</p>\n<h3>Références</h3>\n<ul>\n<li>RGAA : 12.2.1, 12.2.2, 12.3.1, 12.3.2</li>\n<li>Charte de l'État : 1</li>\n<li>Bonnes pratiques Opquast : 16</li>\n</ul>",
      'textContent': "\nDans chaque ensemble de pages, chaque page ayant un menu de navigation vérifie-t-elle ces conditions (hors cas particuliers) ?\n\n• Le menu de navigation est toujours à la même place dans la présentation\n\n• Le menu de navigation se présente toujours dans le même ordre relatif dans le code source.\n\nChaque barre de navigation répétée dans un ensemble de pages vérifie-t-elle ces conditions (hors cas particuliers) ?\n\n• La barre de navigation est toujours à la même place dans la présentation\n\n• La barre de navigation se présente toujours dans le même ordre relatif dans le code source.\n\nDans chaque ensemble de pages, le menu de navigation principal a-t-il une présentation cohérente (hors cas particuliers) ?\n\nDans chaque ensemble de pages, les barres de navigation répétées ont-elles une présentation cohérente (hors cas particuliers) ?\n\n# Références\n\n*   RGAA : 12.2.1, 12.2.2, 12.3.1, 12.3.2\n*   Charte de l'État : 1\n*   Bonnes pratiques Opquast : 16"
    },
    {
      'id': 'tmp_004',
      'title': 'Si une image non décorative, une zone réactive ou un bouton graphique a un attribut title, celui-ci est identique à son attribut alt.',
      'filters': [
        {
          'title': 'Profil',
          'tags': [
            'Intégration',
            'Développement'
          ]
        },
        {
          'title': 'Référentiel',
          'tags': [
            'RGAA'
          ]
        },
        {
          'title': 'Niveau',
          'tags': [
            '2'
          ]
        },
        {
          'title': 'Thématique',
          'tags': [
            'Alternatives'
          ]
        }
      ],
      'rawHTMLContent': '<p>Chaque image (balise img) porteuse d’information, ayant un attribut alt, vérifie-t-elle ces conditions (hors cas particuliers) ?</p>\n<p>* Le contenu de l’attribut alt est pertinent ;</p>\n<p>* S’il est présent, le contenu de l’attribut title est identique au contenu de l’attribut alt ;</p>\n<p>* S’il est présent, le contenu de la propriété aria-label est identique au contenu de l’attribut alt ;</p>\n<p>* S’il est présent, le contenu du passage de texte lié via la propriété aria-labelledby est identique au contenu de l’attribut alt.</p>\n<p>Chaque zone (balise area) d’une image réactive porteuse d’information, ayant un attribut alt, vérifie-t-elle ces conditions (hors cas particuliers) ?</p>\n<p>Le contenu de l’attribut alt est pertinent ;</p>\n<p>S’il est présent, le contenu de l’attribut title est identique au contenu de l’attribut alt ;</p>\n<p>S’il est présent, le contenu de la propriété aria-label est identique au contenu de l’attribut alt ;</p>\n<p>S’il est présent, le contenu du passage de texte lié via la propriété aria-labelledby est identique au contenu de l’attribut alt.</p>\n<p>Chaque bouton associé à une image (balise input avec l’attribut type="image"), ayant un attribut alt, vérifie-t-il ces conditions (hors cas particuliers) ?</p>\n<p>* Le contenu de l’attribut alt est pertinent ;</p>\n<p>* S’il est présent, le contenu de l’attribut title est identique au contenu de l’attribut alt ;</p>\n<p>* S’il est présent, le contenu de la propriété aria-label est identique au contenu de l’attribut alt ;</p>\n<p>* S’il est présent, le contenu du passage de texte lié via la propriété aria-labelledby est identique au contenu de l’attribut alt.</p>\n<h3>Références</h3>\n<ul>\n<li>RGAA : 1.3.1, 1.3.2, 1.3.3</li>\n</ul>',
      'textContent': '\nChaque image (balise img) porteuse d’information, ayant un attribut alt, vérifie-t-elle ces conditions (hors cas particuliers) ?\n\n\\* Le contenu de l’attribut alt est pertinent ;\n\n\\* S’il est présent, le contenu de l’attribut title est identique au contenu de l’attribut alt ;\n\n\\* S’il est présent, le contenu de la propriété aria-label est identique au contenu de l’attribut alt ;\n\n\\* S’il est présent, le contenu du passage de texte lié via la propriété aria-labelledby est identique au contenu de l’attribut alt.\n\nChaque zone (balise area) d’une image réactive porteuse d’information, ayant un attribut alt, vérifie-t-elle ces conditions (hors cas particuliers) ?\n\nLe contenu de l’attribut alt est pertinent ;\n\nS’il est présent, le contenu de l’attribut title est identique au contenu de l’attribut alt ;\n\nS’il est présent, le contenu de la propriété aria-label est identique au contenu de l’attribut alt ;\n\nS’il est présent, le contenu du passage de texte lié via la propriété aria-labelledby est identique au contenu de l’attribut alt.\n\nChaque bouton associé à une image (balise input avec l’attribut type="image"), ayant un attribut alt, vérifie-t-il ces conditions (hors cas particuliers) ?\n\n\\* Le contenu de l’attribut alt est pertinent ;\n\n\\* S’il est présent, le contenu de l’attribut title est identique au contenu de l’attribut alt ;\n\n\\* S’il est présent, le contenu de la propriété aria-label est identique au contenu de l’attribut alt ;\n\n\\* S’il est présent, le contenu du passage de texte lié via la propriété aria-labelledby est identique au contenu de l’attribut alt.\n\n# Références\n\n*   RGAA : 1.3.1, 1.3.2, 1.3.3'
    },
    {
      'id': 'tmp_005',
      'title': 'Les alternatives textuelles des contenus non textuels (images, zones cliquables, boutons graphiques, etc.) sont concises et pertinentes.',
      'filters': [
        {
          'title': 'Profil',
          'tags': [
            'Intégration',
            'Développement'
          ]
        },
        {
          'title': 'Référentiel',
          'tags': [
            'RGAA',
            'Bonnes pratiques Opquast'
          ]
        },
        {
          'title': 'Niveau',
          'tags': [
            '2'
          ]
        },
        {
          'title': 'Thématique',
          'tags': [
            'Alternatives'
          ]
        }
      ],
      'rawHTMLContent': '<p>Pour chaque image porteuse d’information et ayant une alternative textuelle, l’alternative textuelle est-elle courte et concise (hors cas particuliers) ?</p>\n<p>Chaque zone (balise area) d’une image réactive porteuse d’information, ayant un attribut alt, vérifie-t-elle ces conditions (hors cas particuliers) ?</p>\n<p>Le contenu de l’attribut alt est pertinent ;</p>\n<p>S’il est présent, le contenu de l’attribut title est identique au contenu de l’attribut alt ;</p>\n<p>S’il est présent, le contenu de la propriété aria-label est identique au contenu de l’attribut alt ;</p>\n<p>S’il est présent, le contenu du passage de texte lié via la propriété aria-labelledby est identique au contenu de l’attribut alt.</p>\n<p>Chaque bouton associé à une image (balise input avec l’attribut type="image"), ayant un attribut alt, vérifie-t-il ces conditions (hors cas particuliers) ?</p>\n<p>* Le contenu de l’attribut alt est pertinent ;</p>\n<p>* S’il est présent, le contenu de l’attribut title est identique au contenu de l’attribut alt ;</p>\n<p>* S’il est présent, le contenu de la propriété aria-label est identique au contenu de l’attribut alt ;</p>\n<p>* S’il est présent, le contenu du passage de texte lié via la propriété aria-labelledby est identique au contenu de l’attribut alt.</p>\n<h3>Références</h3>\n<ul>\n<li>RGAA : 1.3.13, 1.3.2, 1.3.3</li>\n<li>Bonnes pratiques Opquast : 2, 3</li>\n</ul>',
      'textContent': '\nPour chaque image porteuse d’information et ayant une alternative textuelle, l’alternative textuelle est-elle courte et concise (hors cas particuliers) ?\n\nChaque zone (balise area) d’une image réactive porteuse d’information, ayant un attribut alt, vérifie-t-elle ces conditions (hors cas particuliers) ?\n\nLe contenu de l’attribut alt est pertinent ;\n\nS’il est présent, le contenu de l’attribut title est identique au contenu de l’attribut alt ;\n\nS’il est présent, le contenu de la propriété aria-label est identique au contenu de l’attribut alt ;\n\nS’il est présent, le contenu du passage de texte lié via la propriété aria-labelledby est identique au contenu de l’attribut alt.\n\nChaque bouton associé à une image (balise input avec l’attribut type="image"), ayant un attribut alt, vérifie-t-il ces conditions (hors cas particuliers) ?\n\n\\* Le contenu de l’attribut alt est pertinent ;\n\n\\* S’il est présent, le contenu de l’attribut title est identique au contenu de l’attribut alt ;\n\n\\* S’il est présent, le contenu de la propriété aria-label est identique au contenu de l’attribut alt ;\n\n\\* S’il est présent, le contenu du passage de texte lié via la propriété aria-labelledby est identique au contenu de l’attribut alt.\n\n# Références\n\n*   RGAA : 1.3.13, 1.3.2, 1.3.3\n*   Bonnes pratiques Opquast : 2, 3'
    },
    {
      'id': 'tmp_006',
      'title': 'Un système de navigation secondaire est présent si la navigation dépasse 3 niveaux',
      'filters': [
        {
          'title': 'Profil',
          'tags': [
            'Conception'
          ]
        },
        {
          'title': 'Référentiel',
          'tags': [
            "Charte de l'État"
          ]
        },
        {
          'title': 'Niveau',
          'tags': [
            '2'
          ]
        },
        {
          'title': 'Thématique',
          'tags': [
            'Navigation'
          ]
        }
      ],
      'rawHTMLContent': "<p>Si la profondeur du site dépasse la profondeur maximale du système de navigation, il</p>\n<p>faut mettre en place un ou des système(s) de navigation complémentaire.</p>\n<h3>Références</h3>\n<ul>\n<li>Charte de l'État : 5</li>\n</ul>",
      'textContent': "\nSi la profondeur du site dépasse la profondeur maximale du système de navigation, il\n\nfaut mettre en place un ou des système(s) de navigation complémentaire.\n\n# Références\n\n*   Charte de l'État : 5"
    }
  ]

  it('should return an array with all criterias when no filters are applied and search query is empty', () => {
    // given
    const state = {
      criterias: [{
        id: 'pi_001',
        title: 'Merveilleux titre',
        filters: [
          {
            title: 'Référentiel',
            tags: ['Intégration', 'Rédactionnel']
          },
          {
            title: 'Profil',
            tags: ['Développement']
          }
        ],
        rawHTMLContent: '<p>Contenu de qualité.</p>'
      }],
      checkedFilters: [],
      searchQuery: ''
    }

    // when
    const filteredCriterias = getters.filteredCriterias(state)

    // then
    expect(filteredCriterias).toEqual(state.criterias)
  })

  it('should return an array with all criterias when checkedFilters contains one filter with no tags and search query is empty', () => {
    // given
    const state = {
      criterias: [{
        id: 'pi_001',
        title: 'Merveilleux titre',
        filters: [
          {
            title: 'Référentiel',
            tags: ['Intégration', 'Rédactionnel']
          },
          {
            title: 'Profil',
            tags: ['Développement']
          }
        ],
        rawHTMLContent: '<p>Contenu de qualité.</p>'
      }],
      checkedFilters: [
        {title: 'Thématique', tags: []}
      ],
      searchQuery: ''
    }

    // when
    const filteredCriterias = getters.filteredCriterias(state)

    // then
    expect(filteredCriterias).toEqual(state.criterias)
  })

  it('should return an array with filtered criterias when some filters are applied and search query is empty', () => {
    // given
    const state = {
      criterias: [
        {
          id: 'pi_001',
          title: 'Merveilleux titre',
          filters: [
            {title: 'Référentiel', tags: ['RGAA', 'Bonnes pratiques Opquast']},
            {title: 'Profil', tags: ['Développement']}
          ],
          rawHTMLContent: '<p>Contenu de qualité.</p>'
        },
        {
          id: 'pi_002',
          title: 'Autre titre',
          filters: [
            {title: 'Référentiel', tags: ['RGAA', 'Bonnes pratiques Opquast']},
            {title: 'Profil', tags: ['Graphisme']},
            {title: 'Nourriture', tags: ['coréen']}
          ],
          rawHTMLContent: '<p>Contenu de qualité.</p>'
        },
        {
          id: 'pi_003',
          title: 'Autre titre',
          filters: [
            {title: 'Référentiel', tags: ['RGAA', 'Bonnes pratiques Opquast']},
            {title: 'Profil', tags: ['Graphisme']},
            {title: 'Nourriture', tags: ['salade']}
          ],
          rawHTMLContent: '<p>Contenu de qualité.</p>'
        }
      ],
      checkedFilters: [
        {title: 'Profil', tags: ['Graphisme']},
        {title: 'Référentiel', tags: ['RGAA', 'Bonnes pratiques Opquast']},
        {title: 'Thématique', tags: []},
        {title: 'Nourriture', tags: ['coréen']}
      ],
      searchQuery: ''
    }
    const expectedFilteredCriterias = [
      {
        id: 'pi_002',
        title: 'Autre titre',
        filters: [
          {title: 'Référentiel', tags: ['RGAA', 'Bonnes pratiques Opquast']},
          {title: 'Profil', tags: ['Graphisme']},
          {title: 'Nourriture', tags: ['coréen']}
        ],
        rawHTMLContent: '<p>Contenu de qualité.</p>'
      }
    ]

    // when
    const filteredCriterias = getters.filteredCriterias(state)

    // then
    expect(filteredCriterias).toEqual(expectedFilteredCriterias)
  })

  it('should return an array with one criteria matching the search query ' +
    'when no filters are applied and the search query matches only one criteria', () => {
    // given
    const state = {
      criterias: criterias,
      checkedFilters: [],
      searchQuery: 'tmp_001'
    }
    const expectedFilteredCriterias = [
      {
        'id': 'tmp_001',
        'title': "L'attribut alt des images, zones réactives et boutons graphiques est présent.",
        'filters': [
          {
            'title': 'Profil',
            'tags': [
              'Intégration',
              'Développement',
              'Rédactionnel'
            ]
          },
          {
            'title': 'Référentiel',
            'tags': [
              'RGAA',
              'Bonnes pratiques Opquast'
            ]
          },
          {
            'title': 'Niveau',
            'tags': [
              '1'
            ]
          },
          {
            'title': 'Thématique',
            'tags': [
              'Alternatives'
            ]
          }
        ],
        'rawHTMLContent': "<p>Chaque image (balise img) a-t-elle un attribut alt ?</p>\n<p>Chaque zone (balise area) d'une image réactive a-t-elle un attribut alt ?</p>\n<p>Chaque bouton de formulaire (balise input avec l'attribut type=\"image\") a-t-il un attribut alt ?</p>\n<h3>Références</h3>\n<ul>\n<li>RGAA : 1.1.1, 1.1.2, 1.1.3</li>\n<li>Bonnes pratiques Opquast : 1, 2, 3</li>\n</ul>",
        'textContent': "\nChaque image (balise img) a-t-elle un attribut alt ?\n\nChaque zone (balise area) d'une image réactive a-t-elle un attribut alt ?\n\nChaque bouton de formulaire (balise input avec l'attribut type=\"image\") a-t-il un attribut alt ?\n\n# Références\n\n*   RGAA : 1.1.1, 1.1.2, 1.1.3\n*   Bonnes pratiques Opquast : 1, 2, 3"
      }
    ]

    // when
    const filteredCriterias = getters.filteredCriterias(state)

    // then
    expect(filteredCriterias).toEqual(expectedFilteredCriterias)
  })

  it('should return a sorted array with criterias matching the search query ' +
    'when no filters are applied and the search query matches multiple criterias', () => {
    // given
    const state = {
      criterias: [{
        id: 'pi_001',
        title: 'Merveilleux titre',
        filters: [
          {
            title: 'Référentiel',
            tags: ['Intégration', 'Rédactionnel']
          },
          {
            title: 'Profil',
            tags: ['Développement']
          }
        ],
        textContent: 'Contenu de qualité.'
      }, {
        id: 'pi_002',
        title: 'Merveilleux titre',
        filters: [
          {
            title: 'Référentiel',
            tags: ['Intégration', 'Rédactionnel']
          },
          {
            title: 'Profil',
            tags: ['Développement']
          }
        ],
        textContent: 'Contenu contenu de qualité.'
      }],
      checkedFilters: [],
      searchQuery: 'contenu'
    }
    const expectedFilteredCriterias = [
      {
        id: 'pi_002',
        title: 'Merveilleux titre',
        filters: [
          {
            title: 'Référentiel',
            tags: ['Intégration', 'Rédactionnel']
          },
          {
            title: 'Profil',
            tags: ['Développement']
          }
        ],
        textContent: 'Contenu contenu de qualité.'
      },
      {
        id: 'pi_001',
        title: 'Merveilleux titre',
        filters: [
          {
            title: 'Référentiel',
            tags: ['Intégration', 'Rédactionnel']
          },
          {
            title: 'Profil',
            tags: ['Développement']
          }
        ],
        textContent: 'Contenu de qualité.'
      }
    ]

    // when
    const filteredCriterias = getters.filteredCriterias(state)

    // then
    expect(filteredCriterias).toEqual(expectedFilteredCriterias)
  })

  it('should return a sorted array with criterias matching the search query and the filters' +
    'when filters are applied and the search query matches multiple criterias', () => {
    // given
    const state = {
      criterias: criterias,
      checkedFilters: [{title: 'Thématique', tags: ['Alternatives']}],
      searchQuery: 'texte'
    }
    const expectedFilteredCriterias = [
      {
        'id': 'tmp_005',
        'title': 'Les alternatives textuelles des contenus non textuels (images, zones cliquables, boutons graphiques, etc.) sont concises et pertinentes.',
        'filters': [
          {
            'title': 'Profil',
            'tags': [
              'Intégration',
              'Développement'
            ]
          },
          {
            'title': 'Référentiel',
            'tags': [
              'RGAA',
              'Bonnes pratiques Opquast'
            ]
          },
          {
            'title': 'Niveau',
            'tags': [
              '2'
            ]
          },
          {
            'title': 'Thématique',
            'tags': [
              'Alternatives'
            ]
          }
        ],
        'rawHTMLContent': '<p>Pour chaque image porteuse d’information et ayant une alternative textuelle, l’alternative textuelle est-elle courte et concise (hors cas particuliers) ?</p>\n<p>Chaque zone (balise area) d’une image réactive porteuse d’information, ayant un attribut alt, vérifie-t-elle ces conditions (hors cas particuliers) ?</p>\n<p>Le contenu de l’attribut alt est pertinent ;</p>\n<p>S’il est présent, le contenu de l’attribut title est identique au contenu de l’attribut alt ;</p>\n<p>S’il est présent, le contenu de la propriété aria-label est identique au contenu de l’attribut alt ;</p>\n<p>S’il est présent, le contenu du passage de texte lié via la propriété aria-labelledby est identique au contenu de l’attribut alt.</p>\n<p>Chaque bouton associé à une image (balise input avec l’attribut type="image"), ayant un attribut alt, vérifie-t-il ces conditions (hors cas particuliers) ?</p>\n<p>* Le contenu de l’attribut alt est pertinent ;</p>\n<p>* S’il est présent, le contenu de l’attribut title est identique au contenu de l’attribut alt ;</p>\n<p>* S’il est présent, le contenu de la propriété aria-label est identique au contenu de l’attribut alt ;</p>\n<p>* S’il est présent, le contenu du passage de texte lié via la propriété aria-labelledby est identique au contenu de l’attribut alt.</p>\n<h3>Références</h3>\n<ul>\n<li>RGAA : 1.3.13, 1.3.2, 1.3.3</li>\n<li>Bonnes pratiques Opquast : 2, 3</li>\n</ul>',
        'textContent': '\nPour chaque image porteuse d’information et ayant une alternative textuelle, l’alternative textuelle est-elle courte et concise (hors cas particuliers) ?\n\nChaque zone (balise area) d’une image réactive porteuse d’information, ayant un attribut alt, vérifie-t-elle ces conditions (hors cas particuliers) ?\n\nLe contenu de l’attribut alt est pertinent ;\n\nS’il est présent, le contenu de l’attribut title est identique au contenu de l’attribut alt ;\n\nS’il est présent, le contenu de la propriété aria-label est identique au contenu de l’attribut alt ;\n\nS’il est présent, le contenu du passage de texte lié via la propriété aria-labelledby est identique au contenu de l’attribut alt.\n\nChaque bouton associé à une image (balise input avec l’attribut type="image"), ayant un attribut alt, vérifie-t-il ces conditions (hors cas particuliers) ?\n\n\\* Le contenu de l’attribut alt est pertinent ;\n\n\\* S’il est présent, le contenu de l’attribut title est identique au contenu de l’attribut alt ;\n\n\\* S’il est présent, le contenu de la propriété aria-label est identique au contenu de l’attribut alt ;\n\n\\* S’il est présent, le contenu du passage de texte lié via la propriété aria-labelledby est identique au contenu de l’attribut alt.\n\n# Références\n\n*   RGAA : 1.3.13, 1.3.2, 1.3.3\n*   Bonnes pratiques Opquast : 2, 3'
      },
      {
        'id': 'tmp_004',
        'title': 'Si une image non décorative, une zone réactive ou un bouton graphique a un attribut title, celui-ci est identique à son attribut alt.',
        'filters': [
          {
            'title': 'Profil',
            'tags': [
              'Intégration',
              'Développement'
            ]
          },
          {
            'title': 'Référentiel',
            'tags': [
              'RGAA'
            ]
          },
          {
            'title': 'Niveau',
            'tags': [
              '2'
            ]
          },
          {
            'title': 'Thématique',
            'tags': [
              'Alternatives'
            ]
          }
        ],
        'rawHTMLContent': '<p>Chaque image (balise img) porteuse d’information, ayant un attribut alt, vérifie-t-elle ces conditions (hors cas particuliers) ?</p>\n<p>* Le contenu de l’attribut alt est pertinent ;</p>\n<p>* S’il est présent, le contenu de l’attribut title est identique au contenu de l’attribut alt ;</p>\n<p>* S’il est présent, le contenu de la propriété aria-label est identique au contenu de l’attribut alt ;</p>\n<p>* S’il est présent, le contenu du passage de texte lié via la propriété aria-labelledby est identique au contenu de l’attribut alt.</p>\n<p>Chaque zone (balise area) d’une image réactive porteuse d’information, ayant un attribut alt, vérifie-t-elle ces conditions (hors cas particuliers) ?</p>\n<p>Le contenu de l’attribut alt est pertinent ;</p>\n<p>S’il est présent, le contenu de l’attribut title est identique au contenu de l’attribut alt ;</p>\n<p>S’il est présent, le contenu de la propriété aria-label est identique au contenu de l’attribut alt ;</p>\n<p>S’il est présent, le contenu du passage de texte lié via la propriété aria-labelledby est identique au contenu de l’attribut alt.</p>\n<p>Chaque bouton associé à une image (balise input avec l’attribut type="image"), ayant un attribut alt, vérifie-t-il ces conditions (hors cas particuliers) ?</p>\n<p>* Le contenu de l’attribut alt est pertinent ;</p>\n<p>* S’il est présent, le contenu de l’attribut title est identique au contenu de l’attribut alt ;</p>\n<p>* S’il est présent, le contenu de la propriété aria-label est identique au contenu de l’attribut alt ;</p>\n<p>* S’il est présent, le contenu du passage de texte lié via la propriété aria-labelledby est identique au contenu de l’attribut alt.</p>\n<h3>Références</h3>\n<ul>\n<li>RGAA : 1.3.1, 1.3.2, 1.3.3</li>\n</ul>',
        'textContent': '\nChaque image (balise img) porteuse d’information, ayant un attribut alt, vérifie-t-elle ces conditions (hors cas particuliers) ?\n\n\\* Le contenu de l’attribut alt est pertinent ;\n\n\\* S’il est présent, le contenu de l’attribut title est identique au contenu de l’attribut alt ;\n\n\\* S’il est présent, le contenu de la propriété aria-label est identique au contenu de l’attribut alt ;\n\n\\* S’il est présent, le contenu du passage de texte lié via la propriété aria-labelledby est identique au contenu de l’attribut alt.\n\nChaque zone (balise area) d’une image réactive porteuse d’information, ayant un attribut alt, vérifie-t-elle ces conditions (hors cas particuliers) ?\n\nLe contenu de l’attribut alt est pertinent ;\n\nS’il est présent, le contenu de l’attribut title est identique au contenu de l’attribut alt ;\n\nS’il est présent, le contenu de la propriété aria-label est identique au contenu de l’attribut alt ;\n\nS’il est présent, le contenu du passage de texte lié via la propriété aria-labelledby est identique au contenu de l’attribut alt.\n\nChaque bouton associé à une image (balise input avec l’attribut type="image"), ayant un attribut alt, vérifie-t-il ces conditions (hors cas particuliers) ?\n\n\\* Le contenu de l’attribut alt est pertinent ;\n\n\\* S’il est présent, le contenu de l’attribut title est identique au contenu de l’attribut alt ;\n\n\\* S’il est présent, le contenu de la propriété aria-label est identique au contenu de l’attribut alt ;\n\n\\* S’il est présent, le contenu du passage de texte lié via la propriété aria-labelledby est identique au contenu de l’attribut alt.\n\n# Références\n\n*   RGAA : 1.3.1, 1.3.2, 1.3.3'
      },
      {
        'id': 'tmp_002',
        'title': "Les images légendées utilisent l'élément figure, le rôle group et une alternative textuelle donnant la référence à la légende.",
        'filters': [
          {
            'title': 'Profil',
            'tags': [
              'Intégration',
              'Développement',
              'Rédactionnel'
            ]
          },
          {
            'title': 'Référentiel',
            'tags': [
              'RGAA'
            ]
          },
          {
            'title': 'Niveau',
            'tags': [
              '2'
            ]
          },
          {
            'title': 'Thématique',
            'tags': [
              'Alternatives'
            ]
          }
        ],
        'rawHTMLContent': '<p>Chaque image légendée (balise img ou input avec l’attribut type="image" associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?</p>\n<p>L’image (balise img) et sa légende sont contenues dans une balise figure ;</p>\n<p>La balise figure possède un attribut role="group" ;</p>\n<p>Le contenu de l’attribut alt de l’image contient une référence à la légende adjacente.</p>\n<p>Chaque image objet légendée (balise object avec l’attribut type="image/…" associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?</p>\n<p>L’image objet (balise object) et sa légende sont contenues dans une balise figure ;</p>\n<p>La balise figure possède un attribut role="group".</p>\n<p>Chaque image embarquée légendée (balise embed associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?</p>\n<p>L’image embarquée (balise embed) et sa légende sont contenues dans une balise figure ;</p>\n<p>La balise figure possède un attribut role="group" ;</p>\n<p>L’alternative contient une référence à la légende adjacente.</p>\n<p>Chaque image vectorielle légendée (balise svg associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?</p>\n<p>L’image vectorielle (balise svg) et sa légende sont contenues dans une balise figure ;</p>\n<p>La balise figure possède un role="group" ;</p>\n<p>Le contenu de la propriété aria-label ou de la balise desc de l’image vectorielle contient une référence à la légende adjacente.</p>\n<p>Chaque image bitmap légendée (balise canvas associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?</p>\n<p>L’image bitmap (balise canvas) et sa légende sont contenues dans une balise figure ;</p>\n<p>La balise figure possède un attribut role="group" ;</p>\n<p>Le contenu entre <code>&lt;canvas&gt;</code> et <code>&lt;/canvas&gt;</code> de l’image bitmap contient une référence à la légende adjacente.</p>\n<h3>Références</h3>\n<ul>\n<li>RGAA : 1.10.1, 1.10.2, 1.10.3, 1.10.4, 1.10.5</li>\n</ul>',
        'textContent': '\nChaque image légendée (balise img ou input avec l’attribut type="image" associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?\n\nL’image (balise img) et sa légende sont contenues dans une balise figure ;\n\nLa balise figure possède un attribut role="group" ;\n\nLe contenu de l’attribut alt de l’image contient une référence à la légende adjacente.\n\nChaque image objet légendée (balise object avec l’attribut type="image/…" associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?\n\nL’image objet (balise object) et sa légende sont contenues dans une balise figure ;\n\nLa balise figure possède un attribut role="group".\n\nChaque image embarquée légendée (balise embed associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?\n\nL’image embarquée (balise embed) et sa légende sont contenues dans une balise figure ;\n\nLa balise figure possède un attribut role="group" ;\n\nL’alternative contient une référence à la légende adjacente.\n\nChaque image vectorielle légendée (balise svg associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?\n\nL’image vectorielle (balise svg) et sa légende sont contenues dans une balise figure ;\n\nLa balise figure possède un role="group" ;\n\nLe contenu de la propriété aria-label ou de la balise desc de l’image vectorielle contient une référence à la légende adjacente.\n\nChaque image bitmap légendée (balise canvas associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?\n\nL’image bitmap (balise canvas) et sa légende sont contenues dans une balise figure ;\n\nLa balise figure possède un attribut role="group" ;\n\nLe contenu entre `<canvas>` et `</canvas>` de l’image bitmap contient une référence à la légende adjacente.\n\n# Références\n\n*   RGAA : 1.10.1, 1.10.2, 1.10.3, 1.10.4, 1.10.5'
      }
    ]

    // when
    const filteredCriterias = getters.filteredCriterias(state)

    // then
    expect(filteredCriterias).toEqual(expectedFilteredCriterias)
  })
})

describe('getters | displayedApplicationTitle', () => {
  it('should return the default page title when no filters and no search query are specified', () => {
    // given
    const state = {
      checkedFilters: [],
      searchQuery: ''
    }
    const mockGetters = {
      displayedCriteriasNumber: 3
    }

    // when
    const pageTitle = getters.displayedApplicationTitle(state, mockGetters)
    const DEFAULT_PAGE_TITLE = 'Liste des critères - Checklist Pidila'

    // then
    expect(pageTitle).toEqual(DEFAULT_PAGE_TITLE)
  })

  it('should return the page title when one filter is checked and three criterias are displayed', () => {
    // given
    const state = {
      checkedFilters: [
        {title: 'Référentiel', tags: ['RGAA']}
      ],
      searchQuery: ''
    }
    const mockGetters = {
      displayedCriteriasNumber: 3
    }

    // when
    const pageTitle = getters.displayedApplicationTitle(state, mockGetters)

    // then
    expect(pageTitle).toEqual('3 critères pour 1 filtre appliqué - Checklist Pidila')
  })

  it('should return the page title when two filter are checked and three criterias are displayed', () => {
    // given
    const state = {
      checkedFilters: [
        {title: 'Référentiel', tags: ['RGAA', 'BPO']}
      ],
      searchQuery: ''
    }
    const mockGetters = {
      displayedCriteriasNumber: 3
    }

    // when
    const pageTitle = getters.displayedApplicationTitle(state, mockGetters)

    // then
    expect(pageTitle).toEqual('3 critères pour 2 filtres appliqués - Checklist Pidila')
  })

  it('should return the page title when two filter are checked and three criterias are displayed and the search query is not empty', () => {
    // given
    const state = {
      checkedFilters: [
        {title: 'Référentiel', tags: ['RGAA', 'Bonnes pratiques Opquast']}
      ],
      searchQuery: 'navigation'
    }
    const mockGetters = {
      displayedCriteriasNumber: 3
    }

    // when
    const pageTitle = getters.displayedApplicationTitle(state, mockGetters)

    // then
    expect(pageTitle).toEqual('3 critères pour 3 filtres appliqués - Checklist Pidila')
  })
})
