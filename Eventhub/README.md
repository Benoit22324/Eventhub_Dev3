## Initialisation du back
Pour initialiser le back, il faudra d'abord avoir le projet avec un ```git clone```   
Puis vous allez devoir installer les dépendances avec un ```npm i```  
N'oublier pas de mettre les variables d'environnements dans le **.env**  

Ensuite, il faudra faire initialiser la base de donnée Docker
```
docker-compose up -d
```
Puis il faudra initialiser la base de donnée **Postgresql** avec Prisma.   
Pour faire cela, il faudra faire les commandes suivantes:
```
npx prisma migrate dev --name init
```
```
npx prisma migrate reset
```
```
npx prisma generate
```
Puis mettre les valeurs par défaut avec la commande ci-dessous
```
npm run seed
```
Enfin, vous pouvez lancer le back avec un ```npm start```
