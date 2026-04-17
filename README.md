# Eventhub
## Présentation du projet
**Eventhub** est le projet fil rouge de l'année et elle sera développer durant plusieurs semaines de cours pour qu'on puisse apprendre et pratiquer ce qu'on voit durant ces semaines.

## Initialisation
Il faut d'abord installer les dépendences du back.
```bash
cd Eventhub
npm install
```
Lorsqu'on aura installer les dépendences du back, il faudra mettre en place la bdd mais on verra ça à la prochaine étape.\
Maintenant, allez dans le front et installer les dépendences.
```bash
cd ../EventhubFront
npm install
```
Dès que toutes les dépendences sont installés, on va construire nos conteneurs **Docker** pour initialiser les bases de données.
```bash
cd ../          # Pour retourner à la racine
docker compose up -d --build
```
S'il y a un problème avec Nginx, vérifier bien que le volume est bien sur le local.

## Mise en place de la bdd
Lorsque vos conteneurs **Docker** sont build, il faudra maintenant créer votre bdd **Postgresql** avec **Prisma**.
```bash
cd Eventhub                     # Retourner dans le dossier back
npx prisma generate             # Génère le Client Prisma
npx prisma migrate deploy       # Migration de la structure de la base de donnée
# Optionnel
npm run seed                    # Génération des seeds par défaut
```
Voilà, votre projet de base doit être mis en place désormais.
