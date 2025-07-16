# ARSN - Système de Gestion des Dossiers Administratifs

Application ERP complète pour la gestion des dossiers administratifs de l'ARSN (Autorité de Radioprotection, de Sûreté et de Sécurité Nucléaires).

## 🚀 Fonctionnalités

### 🔐 Authentification
- Connexion sécurisée avec gestion des rôles
- Autorisation automatique selon le profil utilisateur
- Persistance de session

### 👥 Gestion des Rôles
- **Agent CT** : Création de dossiers
- **Chef de service** : Modification des statuts
- **Responsable** : Consultation complète + observations
- **Admin** : Gestion utilisateurs et services

### 📁 Gestion des Dossiers
- Création, modification, suppression
- Suivi des statuts (En cours, Clôturé, Urgent)
- Historique des modifications
- Système d'observations avec checklist
- Multi-sélection des services imputés
- Notes particulières

### 🏢 Administration
- Gestion des utilisateurs (admin uniquement)
- Gestion des services (admin uniquement)
- Interface d'administration complète

## 🛠️ Technologies Utilisées

- **React 19** + **TypeScript**
- **Vite** (Build tool)
- **React Router DOM** (Navigation)
- **Tailwind CSS** (Styling)
- **Flowbite React** (Composants UI)
- **React Icons** (Icônes)

## 📋 Comptes de Test

| Rôle | Email | Mot de passe | Permissions |
|------|-------|--------------|-------------|
| Agent | `agent@arsn.gov` | `password123` | Créer dossiers |
| Chef | `chef@arsn.gov` | `password123` | Modifier statuts |
| Responsable | `responsable@arsn.gov` | `password123` | Consulter tout |
| Admin | `admin@arsn.gov` | `password123` | Gestion complète |

## 🚀 Installation et Lancement

### Prérequis
- Node.js (v18 ou supérieur)
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone [URL_DU_REPO]
cd frontend_v2

# Installer les dépendances
npm install

# Lancer l'application
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📱 Interface Utilisateur

### Page de Connexion
- Formulaire sécurisé avec validation
- Informations des comptes de test
- Redirection automatique après connexion

### Dashboard
- Statistiques en temps réel
- Alertes pour dossiers urgents
- Liste des dossiers récents
- Compteurs par statut

### Gestion des Dossiers
- Tableau avec tri et filtres
- Pagination automatique
- Actions contextuelles selon les permissions
- Formulaire de création/modification

### Administration
- Interface dédiée pour les admins
- Gestion des utilisateurs
- Gestion des services
- Confirmations de suppression

## 🎨 Design System

### Couleurs
- **Bleu ARSN** : Couleur principale (#3b82f6)
- **Statuts** :
  - En cours : Bleu
  - Clôturé : Vert
  - Urgent : Rouge

### Composants
- Interface responsive (Desktop/Mobile)
- Composants réutilisables
- Animations fluides
- Accessibilité respectée

## 🔧 Architecture

### Structure des Dossiers
```
src/
├── components/          # Composants réutilisables
├── contexts/           # Contextes React (Auth, Dossiers)
├── data/              # Données simulées
├── hooks/             # Hooks personnalisés
├── pages/             # Pages de l'application
├── App.tsx            # Composant principal
└── main.tsx          # Point d'entrée
```

### Gestion d'État
- **AuthContext** : Authentification et permissions
- **DossierContext** : Gestion des dossiers et services
- **LocalStorage** : Persistance des sessions

### Routage
- Routes protégées selon les rôles
- Redirection automatique
- Navigation contextuelle

## 📊 Données Simulées

L'application utilise des données simulées (mockData.ts) comprenant :
- 4 utilisateurs avec rôles différents
- 4 services ARSN
- 3 dossiers exemples
- Historique des modifications

## 🔒 Sécurité

- Authentification frontend simulée
- Contrôle d'accès basé sur les rôles
- Validation des formulaires
- Protection des routes sensibles

## 📝 Scripts Disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Aperçu de production
npm run preview

# Lint du code
npm run lint
```

## 🎯 Prochaines Améliorations

- [ ] Connexion à une API backend
- [ ] Notifications push
- [ ] Export PDF des dossiers
- [ ] Recherche avancée
- [ ] Tableau de bord personnalisable
- [ ] Module de reporting

## 📞 Support

Pour toute question ou assistance, contactez l'équipe de développement ARSN.

---

**Application développée pour l'ARSN - Autorité de Radioprotection, de Sûreté et de Sécurité Nucléaires**
