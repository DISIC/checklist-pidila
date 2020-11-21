export default {
  cssClasses: {
    'Référentiel': 'referentiel-list',
    'Profil': 'profile-list',
    'Niveau': 'level-list',
    'Thématique': 'theme-list'
  },
  operators: {
    'Profil': 'pour',
    'Référentiel': 'dans',
    'Niveau': 'de niveau',
    'Thématique': 'concernant'
  },
  globalFilters: [
    {
      title: 'Profil',
      tags: ['Pilotage', 'Conception', 'Graphisme', 'Intégration', 'Développement', 'Rédactionnel']
    },
    {
      title: 'Référentiel',
      tags: ['RGAA', 'Charte internet de l\'État', 'Bonnes pratiques Opquast', 'Éco-conception']
    },
    // {
    //   title: 'Niveau',
    //   tags: ['1', '2', '3']
    // },
    {
      title: 'Thématique',
      tags: ['Contenus textuels', 'Contenus non textuels', 'e-Commerce', 'Formalités et pages obligatoires', 'Formulaires', 'Identité du site', 'Navigation', 'Newsletter', 'Présentation', 'Relations usagers', 'Scripts', 'Serveur sécurité et performances', 'Structure', 'Syndication', 'Tableaux']
    }
  ]
}
