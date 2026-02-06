## 🧩 Présentation du projet

Cette API REST a été développée dans le cadre d’un TP dont l’objectif est de concevoir une **API de réseau social** inspirée de Facebook.

Elle permet de gérer :

* des **utilisateurs**
* des **groupes**
* des **événements**
* des **fils de discussion et messages**
* une **billetterie** pour les événements publics

Le projet respecte **strictement le cahier des charges fourni**.

---

## 🛠️ Technologies utilisées

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (authentification)
* bcrypt (hash des mots de passe)
* Swagger (documentation API)
* Postman (tests)

---

## 🚀 Installation & lancement

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/imensouidi/my-social-networks-api.git
cd my-social-networks-api
```

### 2️⃣ Installer les dépendances

```bash
npm install
```

### 3️⃣ Variables d’environnement

Créer un fichier `.env` à la racine :

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/social-network
JWT_SECRET=secret123
```

### 4️⃣ Lancer le serveur

```bash
npm run dev
```

➡️ L’API démarre sur :
`http://localhost:3000`

---

## 🔐 Authentification

L’API utilise **JWT**.

Après connexion, le token doit être envoyé dans les headers :

```
Authorization: Bearer <token>
```

---

## 👤 Utilisateurs

### ➕ Inscription

**POST** `/auth/register`

```json
{
  "firstname": "Imen",
  "lastname": "Souidi",
  "email": "imen@test.com",
  "password": "123456"
}
```

---

### 🔑 Connexion

**POST** `/auth/login`

```json
{
  "email": "imen@test.com",
  "password": "123456"
}
```

---

## 👥 Groupes

### ➕ Créer un groupe

**POST** `/groups` *(auth requis)*

```json
{
  "name": "Groupe Test",
  "description": "Groupe conforme TP",
  "type": "public",
  "icon": "icon.png",
  "coverPhoto": "cover.jpg",
  "allowPost": true,
  "allowEventCreation": true
}
```

✔️ Le créateur devient automatiquement **admin** et **membre**.

---

## 📅 Événements

### ➕ Créer un événement

**POST** `/events` *(auth requis)*

```json
{
  "name": "Soirée Tech",
  "description": "Événement public",
  "startDate": "2026-03-10T18:00:00.000Z",
  "endDate": "2026-03-10T23:00:00.000Z",
  "location": "Paris",
  "coverPhoto": "event.jpg",
  "isPublic": true
}
```

✔️ Le créateur est **organisateur** et **participant**.

---

## 💬 Fils de discussion

### ➕ Créer une discussion pour un groupe

**POST** `/discussions/group/:groupId` *(auth requis)*

### ➕ Créer une discussion pour un événement

**POST** `/discussions/event/:eventId` *(auth requis)*

---

## 📨 Messages

### ➕ Poster un message

**POST** `/messages/:discussionId` *(auth requis)*

```json
{
  "content": "Bonjour tout le monde 👋"
}
```

---

### 📥 Récupérer les messages

**GET** `/messages/:discussionId` *(auth requis)*

---

## 🎟️ Billetterie

### ➕ Créer un type de billet (organisateur)

**POST** `/tickets/:eventId/types` *(auth requis)*

```json
{
  "name": "VIP",
  "price": 50,
  "quantity": 20
}
```

---

### 🛒 Acheter un billet (public)

**POST** `/tickets/:eventId/buy`

```json
{
  "ticketType": "VIP",
  "firstname": "Amal",
  "lastname": "Souidi",
  "address": "10 rue de Paris, 75000 Paris"
}
```
## 🛒 Shopping list & 🚗 Covoiturage (Bonus)
Fonctionnalités bonus permettant aux participants d’indiquer ce qu’ils apportent
ou de proposer un covoiturage pour un événement.

✔️ Un billet par personne
✔️ Quantité limitée
✔️ Date d’achat enregistrée

---

## 📄 Documentation API

La documentation Swagger est disponible à l’adresse :

```
/api-docs
```

Elle décrit :

* les routes
* les schémas
* les exemples de requêtes

---

## ✅ Fonctionnalités conformes au cahier des charges

* Utilisateurs uniques (email)
* Groupes (public / privé / secret)
* Événements publics et privés
* Discussions liées à un groupe ou un événement
* Messages avec auteurs
* Billetterie avec types de billets et règles métier

---

## 👩‍💻 Auteur

**Imen Souidi**
Projet réalisé dans le cadre d’un TP académique.

---

## 🎯 Conclusion

Ce projet respecte l’ensemble des exigences fonctionnelles demandées, avec une architecture claire, sécurisée et documentée.

---

