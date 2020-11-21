import SearchEngineService from '../searchEngineService'

describe('services | searchEngineService', () => {
  let searchEngine = {}
  beforeEach(() => {
    const criterias = [
      {
        'id': 'tmp-001',
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
        'id': 'tmp-002',
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
        'id': 'tmp-003',
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
        'id': 'tmp-004',
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
        'id': 'tmp-005',
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
        'id': 'tmp-006',
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
    searchEngine = new SearchEngineService(criterias)
  })

  it('should return one criteria matching the id when search query is the id', () => {
    // when
    const queryResults = searchEngine.search('tmp-001')

    // then
    expect(queryResults).toEqual(['tmp-001'])
  })

  it('should return two criterias matching the ids when search query is two different ids', () => {
    // when
    const queryResults = searchEngine.search('tmp-001, tmp-002')

    // then
    expect(queryResults).toEqual(['tmp-001', 'tmp-002'])
  })

  it('should return criterias matching the ids when search query is two different ids', () => {
    // when
    const queryResults = searchEngine.search('tmp-001, tmp-002')

    // then
    expect(queryResults).toEqual(['tmp-001', 'tmp-002'])
  })

  it('should return criterias matching the title', () => {
    // when
    const queryResults = searchEngine.search('navigation')

    // then
    expect(queryResults).toEqual(['tmp-006', 'tmp-003'])
  })

  it('should return criterias matching a sentence', () => {
    // when
    const queryResults = searchEngine.search('présentation cohérente')

    // then
    expect(queryResults).toEqual(['tmp-003'])
  })

  it('should return criterias matching an id OR a title OR a textContent', () => {
    // when
    const queryResults = searchEngine.search('tmp-001 navigation présentation cohérente')

    // then
    expect(queryResults).toEqual(['tmp-001', 'tmp-003', 'tmp-006'])
  })

  it('should return no criterias when search query is empty', () => {
    // when
    const queryResults = searchEngine.search('')

    // then
    expect(queryResults).toEqual([])
  })
})
