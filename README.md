# Projet de Jeux et Chat

## Configuration initiale

1. Clonez ce dépôt sur votre machine locale.

2. Installez les dépendances du projet. Dans le répertoire du frontend et du backend, exécutez la commande suivante :

    ```bash
    npm install
    ```

3. Créez un fichier `.env` à la racine du projet avec les informations d'identification de votre base de données. Le fichier doit avoir la structure suivante :

    ```env
    USERNAME=""
    PASSWORD=""
    HOST=""
    DATABASE=""
    PORT=""
    ```

4. Installez PostgreSQL si ce n'est pas déjà fait et créez une base de données appelée `games`.

5. Dans cette base de données, créez les deux tables suivantes :

    ```sql
    CREATE TABLE messages (
        id SERIAL PRIMARY KEY,
        nickname VARCHAR(255) NOT NULL,
        message TEXT NOT NULL
    );

    CREATE TABLE games (
        id SERIAL PRIMARY KEY,
        gameTitle VARCHAR(255) NOT NULL,
        isDone BOOLEAN
    );
    ```

## Exécution du projet

1. Pour démarrer le backend, naviguez vers le répertoire du backend et exécutez la commande suivante :

    ```bash
    npm start
    ```

2. Pour démarrer le frontend, naviguez vers le répertoire du frontend et exécutez la commande suivante :

    ```bash
    npm run dev
    ```

C'est tout ! Vous devriez maintenant pouvoir utiliser l'application.
