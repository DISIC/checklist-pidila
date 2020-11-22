## Checklist Pidila

Développée conjointement par le PiDILA et la DINUM, la Checklist Pidila est désormais maintenue par le pôle DesignGouv de la DINUM.

Ce dépôt contient une version "autoportée" de l'application de création et d'affichage de la [Checklist Pidila](https://pidila.gitlab.io/checklist-pidila/).

**IMPORTANT : si vous utilisez ce dépôt pour créer votre propre liste ou modifier la liste existante et la diffuser, vous ne devez pas utiliser le nom "Checklist Pidila".**

La Checklist Pidila regroupe les référentiels généraux obligatoires pour les sites publics et gouvernementaux ainsi qu'un ensemble de bonnes pratiques. Les doublons d’un référentiel à l’autre ont été supprimés, des regroupements ont été opérés. Elle se présente sous forme de checklist unique filtrable par profil, référentiel, thématique.

Elle est mise à jour deux fois par an pour refléter l’évolution des référentiels qui la composent :

* Référentiel général d’amélioration de l’accessibilité
* Critères d’application des 10 principes d'une démarche en ligne exemplaire
* Charte internet de l’État
* Référentiel d’éco-conception
* Bonnes pratiques Opquast

Pour en savoir plus sur ces référentiels, consulter [la page dédiée du site des ressources du Pidila](https://pidila.gitlab.io/checklist-pidila/referentiels.html).

## Prérequis

Pour déployer une instance de la checklist vous devrez préalablement avoir installé [nodejs et npm](https://openclassrooms.com/fr/courses/1056721-des-applications-ultra-rapides-avec-node-js/1056956-installer-node-js).


## Technologies utilisées

* Librairie front : [Vue.js](https://vuejs.org/v2/api/)
* Framework front : [Nuxt](https://nuxtjs.org/guide)
* Librairie de test : [Jest](https://facebook.github.io/jest/docs/en/api.html)

Les CSS sont réalisés avec la bibliothèque de composants [Scampi](https://pidila.gitlab.io/scampi/), un outil développé par l'équipe du Pôle intégration de la DILA.


## Installation et lancement

Après avoir cloné le dépôt ou avoir téléchargé son archive, lancer les deux commandes suivantes :

```
$ npm install
$ npm run dev
```

La page est alors visible sur http://localhost:3000/checklistOnly

Après modification des critères, il faut relancer la compilation des datas :

```
$ npm run bundleData
```

## Faire tourner les tests

Les tests utilisent le framework jest. Pour faire passer les tests : 

```
$ npm test
```

Chaque composant aura son html testé grâce à un snapshot. Pour remettre à jour de façon automatisé les snapshots après avoir validé que le snapshot a été modifié de façon pertinente : 

```
$ npm test -- -u
```

Parfois alors qu'un template de composant a été modifié, le test de snapshot ne semble pas échouer. Cela peut être du à un cache de jest qui ne se remet pas à jour. Pour supprimer le cache de jest effectuer la commande suivante depuis le dossier root : 

```
$ node ./node_modules/jest/bin/jest.js --clearCache
```
En relançant les tests après, les snapshots devraient échouer comme prévu.


## Licence

L'application est sous double licence [MIT](https://gitlab.com/pidila/scampi-twig/blob/master/LICENCE-MIT.md) et [CeCILL-B](http://www.cecill.info/licences/Licence_CeCILL-B_V1-fr.html)

Les contenus sont sous licences respectives de chaque référentiel alimentant la Checklist Pidila.

