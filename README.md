# Orinoco

Cinquième projet du parcours "Développeur Web" proposé par OpenClassrooms. <br>
L'objectif est de créer un premier MVP du site pour démontrer le fonctionnement de ses applications aux investisseurs de l'entreprise.

Vous trouverez le [brief complet ici](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P5/P5_Spe%CC%81cifications%20fonctionnelles%20Orinoco%20(2).pdf)

Le projet contient deux dossiers : 
- backend (déjà mis en place et cloné à partir de ce [repository](https://github.com/OpenClassrooms-Student-Center/JWDP5)). Suivre les instructions ci-dessous pour installer le serveur localement.
- frontend

## Pour installer le backend en local

- Prérequis : avoir Node et `npm` installés en local sur votre machine.
- Installation : clonez ce [repo](https://github.com/OpenClassrooms-Student-Center/JWDP5). Dans le dossier du projet, lancez un `npm install`. Vous pouvez déployer le serveur avec `node server`. Le serveur devrait se lancer automatiquement sur `localhost` avec comme port par défaut `3000`.

## Architecture générale du site 

L'application web sera composée de 4 pages : 
● une page **accueil** sous forme de liste, montrant tous les articles disponibles à la vente
● une page **produit**, qui affiche de manière dynamique l'élément sélectionné par l'utilisateur et lui permet de personnaliser le produit et de l'ajouter à son panier
● une page **panier** contenant un résumé des produits dans le panier, le prix total et un formulaire permettant de passer une commande. Les données du formulaire doivent être correctes et bien formatées avant d'être renvoyées au back-end.
● une page de **confirmation de commande**, remerciant l'utilisateur pour sa commande, et indiquant le prix total et l'identifiant de commande envoyé par le serveur.
