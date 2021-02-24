# Orinoco

Cinquième projet du parcours "Développeur Web" proposé par OpenClassrooms. <br>
L'objectif est de créer un premier MVP du site pour démontrer le fonctionnement de ses applications aux investisseurs de l'entreprise.

Vous trouverez le [brief complet ici](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P5/P5_Spe%CC%81cifications%20fonctionnelles%20Orinoco%20(2).pdf)

Le projet contient deux dossiers : 
- back-end (déjà mis en place et cloné à partir de ce [repository](https://github.com/OpenClassrooms-Student-Center/JWDP5)). Suivre les instructions ci-dessous pour installer le serveur localement.
- front-end

## Pour installer le backend en local

- Prérequis : avoir Node et `npm` installés en local sur votre machine.
- Installation : clonez ce [repo](https://github.com/OpenClassrooms-Student-Center/JWDP5). Dans le dossier du projet, lancez un `npm install`. Vous pouvez déployer le serveur avec `node server`. Le serveur devrait se lancer automatiquement sur `localhost` avec comme port par défaut `3000`.

##Produit présenté 

Dans un premier temps, une seule catégorie de produits (parmi 3 propositions : ours en peluche, appareils photos et meubles en chêne) sera présentée. Pour ce projet, le choix se portera sur les **ours en peluche faits à la main**.

## Architecture générale du site 

L'application web sera composée de 4 pages : 
- une page **accueil** sous forme de liste, montrant tous les articles disponibles à la vente
- une page **produit**, qui affiche de manière dynamique l'élément sélectionné par l'utilisateur et lui permet de personnaliser le produit et de l'ajouter à son panier
- une page **panier** contenant un résumé des produits dans le panier, le prix total et un formulaire permettant de passer une commande. Les données du formulaire doivent être correctes et bien formatées avant d'être renvoyées au back-end.
- une page de **confirmation de commande**, remerciant l'utilisateur pour sa commande, et indiquant le prix total et l'identifiant de commande envoyé par le serveur.

## Validation des données 

Pour les routes **POST**, l'objet contact envoyé au serveur doit contenir les champs **firstName**, **lastName**, **address**, **city**, et **email**.
Le tableau des produits envoyé au back-end doit être un array de strings product_id.

## Planification de tests unitaires 

Le plan de tests unitaires se trouve [ici](https://docs.google.com/spreadsheets/d/1G3iU2fb5bTMHGX8S7QC1u572WISqx4OatUMIJC9st0I/edit?usp=sharing).
Ce plan de tests doit couvrir au minimum 80% de la base de code pour le front-end.

##Informations complémentaires

Pour le MVP, la personnalisation du produit ne sera pas fonctionnelle : la page contenant un seul article aura un menu déroulant permettant à l'utilisateur de
choisir une option de personnalisation, mais celle-ci ne sera ni envoyée au serveur ni reflétée dans la réponse du serveur. Le code source devra être indenté et utiliser des commentaires. Il devra également utiliser des fonctions globales. Concernant l’API, des promesses devront être utilisées pour éviter les rappels. Les inputs des utilisateurs doivent être validés avant l’envoi à l’API.

## URL de l'API choisie 

Ours en peluche faits à la main : http://localhost:3000/api/teddies

## Technologies utilisées

HTML, CSS, SaSS, JavaScript

