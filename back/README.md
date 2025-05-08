# 📚 Laravel API – Présence & QR Code

Ce projet est une API Laravel permettant de gérer :

-   l'enregistrement et l'authentification des utilisateurs,
-   la création de cours,
-   la génération de QR codes associés,
-   et la validation des présences à l’aide de ces QR codes.

---

## ✅ Prérequis

-   PHP ≥ 8.1
-   Composer
-   MySQL ou MariaDB
-   Laravel installé (`composer global require laravel/installer`)
-   Postman ou autre client API

---

## 🚀 Lancer le projet en local

```bash
git clone https://github.com/tonrepo/laravel-api-qr.git
cd laravel-api-qr
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve --host=192.168.x.x --port=8000  # IP locale si besoin
```

⚠️ Assure-toi d'avoir une base de données configurée dans `.env`.

---

## 🔐 Authentification

### 🔹 Register

`POST /api/register`

```json
{
    "name": "Alice",
    "email": "alice@example.com",
    "password": "password",
    "password_confirmation": "password"
}
```

### 🔹 Login

`POST /api/login`

```json
{
    "email": "alice@example.com",
    "password": "password"
}
```

✅ Réponse : token d’authentification (`Bearer TOKEN`) à utiliser dans l’en-tête `Authorization`.

---

## 📘 Routes principales

### 🔹 Créer un cours

`POST /api/courses`

```json
{
    "name": "Mathématiques",
    "code": "MATH101",
    "description": "Cours de base",
    "start_time": "2025-05-10 09:00:00",
    "end_time": "2025-05-10 11:00:00"
}
```

🔐 Nécessite `Authorization: Bearer TOKEN`

---

### 🔹 Générer un QR Code pour un cours

`POST /api/courses/{id}/generate-qr`

Retourne le `qr_code` en base64.

---

### 🔹 Afficher un QR Code dans une page web (HTML)

`GET /courses/{id}/show`

Retourne une vue HTML avec le QR Code affiché (`<img src="...">`)

---

### 🔹 Pointer une présence

`POST /api/attendance/check-in`

```json
{
    "qr_data": "eyJjb3Vyc2VfaWQiOjF9" // Donnée base64 ou JSON du QR code
}
```

---

## 🔓 Routes protégées (`auth:sanctum`)

Toutes les routes `/api/courses/*` et `/api/attendance/*` nécessitent que l'utilisateur soit authentifié avec un token Bearer.

---

## 🛠 Astuce : Tester rapidement

1. **Créer un utilisateur** avec `/api/register`
2. **Se connecter** avec `/api/login`
3. **Copier le token reçu**
4. **Ajouter un en-tête `Authorization: Bearer VOTRE_TOKEN`**
5. **Créer un cours**
6. **Générer un QR Code**
7. **Tester la route HTML ou le check-in**

---

## 📸 Aperçu HTML (QR)

<img src="https://via.placeholder.com/150" alt="QR Code" />

---

## 🧹 Réinitialiser la base

```bash
php artisan migrate:fresh --seed
```

---
