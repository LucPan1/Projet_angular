# Projet Angular

Bienvenue sur mon projet Angular. Vous pouvez accéder à la page d'accueil via http://localhost:4200/. Cette page est assez basique avec une barre de navigation. J'ai préféré me concentrer sur les fonctionnalités plutôt que sur le design. Bien que je sois conscient qu'un bon design est important, j'ai mis l'accent sur les fonctionnalités. Toutes les pages que j'ai créées sont responsives et adaptées au format mobile. 

## Lancement

Pour le projet, j'ai utiliser une fakeapi pour les données. Lancer le serveur JSON en utilisant la commande json-server --watch db.json, puis l'application Angular avec ng serve -o.


## Login, Register, Logout, Home

Les pages de connexion et d'inscription sont opérationnelles, avec une simulation de connexion et un menu de déconnexion disponible après connexion. La redirection se fait vers la page d'accueil une fois connecté.

## CRUD Employés

La page de gestion des employés est accessible à http://localhost:4200/employeesList. Cette page permet de manipuler les données du fichier db.json. Les opérations CRUD sont entièrement fonctionnelles.

## Filtrage des employés 

Le filtrage des employés est possible grâce à une barre de recherche comportant une liste déroulante avec les noms, prénoms et email. J'ai utilisé un Observable pour le filtrage des données.







