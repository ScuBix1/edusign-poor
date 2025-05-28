# EduSign - Application de Gestion des Présences

EduSign est une application mobile permettant de gérer les présences des élèves dans les cours. Elle offre deux interfaces distinctes : une pour les enseignants et une pour les élèves.

## Fonctionnalités

### Pour les Enseignants

- Création et gestion des cours
- Génération de QR codes pour chaque cours
- Marquage manuel des présences via l'email des élèves
- Modification des horaires des cours
- Visualisation des présences en temps réel

### Pour les Élèves

- Scanner des QR codes pour pointer leur présence
- Visualisation de leur historique de présence
- Interface simple et intuitive

## Installation

### Prérequis

- Node.js (version 18 ou supérieure)
- PHP 8.1 ou supérieur
- Composer
- MySQL ou MariaDB
- Expo CLI

### Backend (Laravel)

1. Naviguez dans le dossier backend :

```bash
cd back
```

2. Installez les dépendances PHP :

```bash
composer install
```

3. Copiez le fichier d'environnement :

```bash
cp .env.example .env
```

4. Générez la clé d'application :

```bash
php artisan key:generate
```

5. Configurez votre base de données dans le fichier .env

6. Exécutez les migrations :

```bash
php artisan migrate
```

7. Démarrez le serveur :

```bash
php artisan serve
```

### Frontend (React Native avec Expo)

1. Naviguez dans le dossier frontend :

```bash
cd frontend
```

2. Installez les dépendances :

```bash
npm install
```

3. Copiez le fichier d'environnement :

```bash
cp .env.example .env
```

4. Configurez l'URL de l'API dans le fichier .env

5. Démarrez l'application :

```bash
npx expo start
```

## Utilisation

1. Créez un compte en tant qu'enseignant ou élève
2. Connectez-vous à l'application
3. Pour les enseignants :
   - Créez un cours
   - Utilisez le QR code généré ou marquez manuellement les présences
4. Pour les élèves :
   - Scannez le QR code affiché par l'enseignant
   - Consultez votre historique de présence

## Sécurité

- Authentification par token JWT
- Validation des rôles utilisateur
- Protection des routes sensibles
- Validation des données côté serveur

## Support

Pour toute question ou problème, veuillez ouvrir une issue sur le dépôt GitHub du projet.
