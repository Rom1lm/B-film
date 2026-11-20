<style>@page { margin: 13mm 16mm; } h1 { margin-top: 0; } h2 { margin-top: 14px; }</style>

# Projet final — Variante B : « Ma vidéothèque »

**En binôme** (un trinôme si nécessaire). Expo SDK 58, Expo Go. Vous pouvez partir du code vu en cours ou d'un projet neuf.

## Déroulé

| Heure | Étape |
|---|---|
| 9 h 00 | Présentation du sujet, constitution des binômes |
| 9 h 20 – 12 h 30 | Développement |
| **12 h 30** | **Rendu du code : plus aucune modification après cette heure** |
| 13 h 30 – 13 h 50 | Réflexion en binôme sur un extrait de code (20 min, sans ordinateur) |
| 14 h 00 – 16 h 00 | Reviews : environ 12 min par binôme, démo sur téléphone et questions |

<img src="file:///Users/fabricegouedard/Mille M Dropbox/1000FG/FORMATIONS/SupdeVinci/2026-2027/cours/expo-react-native-nov-26/Évaluation 2026/qr-depot.svg" style="float:right;width:28mm;margin:0 0 4px 10px">**Rendu avant 12 h 30**, par le lien de dépôt (ou le QR code ci-contre) : [https://www.dropbox.com/request/xyk8oftwdjx16pu7g56s](https://www.dropbox.com/request/xyk8oftwdjx16pu7g56s). Un zip par binôme, **sans `node_modules`** (moins de 5 Mo), nommé avec **la lettre de votre variante (B)** puis vos noms : `B-nom1-nom2.zip`. Si vous déposez plusieurs fois, c'est le dernier dépôt avant 12 h 30 qui compte. L'app doit se lancer avec `npm install` puis `npx expo start`. **Testez-la sur téléphone avant 12 h 30.**

## Fichiers fournis (ne pas les modifier)

- `src/data/films.js` : 12 films (id, titre, catégorie, année, durée, réalisateur, image, synopsis). Certains éléments n'ont **pas d'image**.
- `src/api/films.js` : une API simulée qui se comporte comme un vrai serveur :
  - `chargerFilms()` : tous les éléments. Le mode se choisit avec `choisirMode("succes" | "lent" | "vide" | "erreur500")` ; l'erreur 500 est ponctuelle ;
  - `chargerFilm(id)` : un élément ; un id inconnu lève une erreur `"introuvable"` ;
  - `rechercherParCategorie(categorie)` : les éléments d'une catégorie (ou `"Toutes"`) ; le délai de réponse est **aléatoire**.

## Ce que l'app doit faire (dans cet ordre)

### 1. Navigation
- Deux onglets : **Films** et **Favoris**. (Le troisième onglet, **Avis**, vient avec le bonus.)
- Dans l'onglet Films, une **pile** : la liste, puis la fiche, `films/[id]`.
- La fiche se charge **à partir de l'id de l'adresse**. L'adresse `/films/F03` ouverte directement affiche « Le Petit Robot des dunes ». Un id inconnu affiche un message clair et un moyen d'en sortir.

### 2. Liste et réseau
- La liste affiche les **quatre états** : chargement, erreur avec **Réessayer**, liste vide, succès. Un moyen de choisir le mode de l'API (pour la démo).
- Des boutons de **catégorie** (Toutes, Comédie, Drame, Animation) qui utilisent `rechercherParCategorie`. En touchant vite plusieurs catégories, l'écran doit **toujours** afficher la dernière catégorie demandée.

### 3. Favoris partagés
- Un cœur sur chaque élément, dans la liste et sur la fiche. L'onglet **Favoris** affiche les éléments marqués ; un changement fait à un endroit se voit partout.
- Les favoris vivent dans un **store Zustand**.

### Bonus — Mes avis (jusqu'à +2 points)
*Seulement quand les parties 1 à 3 marchent.* Ajoutez un onglet **Avis**.

- Sur la fiche, un formulaire **« Donner mon avis »** : une **note de 1 à 5** et un **commentaire**.
- Validation : note obligatoire, commentaire d'au moins 10 caractères, avec des messages d'erreur visibles. Le bouton n'enregistre que si tout est valide.
- L'onglet **Avis** affiche les avis donnés (titre du film, note, commentaire). On peut **supprimer** un avis.
- Le formulaire reste utilisable quand le clavier est ouvert.

**Qualité attendue partout** : `FlatList` avec des clés stables ; rien sous l'encoche, la barre de statut ou les onglets ; un élément sans image s'affiche proprement ; des composants lisibles aux noms clairs.

**D'autres idées si vous avez tout fini** (non notées) : Modifier un avis existant (un seul avis par film) ; afficher la note moyenne sur la fiche. Garder les favoris après fermeture (AsyncStorage).

## Notation sur 20

| Partie | Points |
|---|---|
| **Projet en binôme** : navigation (3), liste et réseau (4), favoris (3). Bonus mes avis : jusqu'à +2, qui compensent des points perdus ailleurs (maximum 10) | 10 |
| **Questions orales sur votre code**, individuelles | 5 |
| **Extrait de code** : réponse écrite en binôme, puis chacun explique seul une question à l’oral | 5 |

Mieux vaut trois parties qui marchent et que vous comprenez qu'un bonus à moitié fait. À la review, **chacun** doit pouvoir expliquer n'importe quelle partie du projet ; on parlera de votre code et des grands principes vus en cours.
