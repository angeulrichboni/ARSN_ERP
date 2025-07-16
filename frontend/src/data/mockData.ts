export interface User {
  id: string;
  email: string;
  password: string;
  nom: string;
  prenom: string;
  role: 'agent' | 'chef' | 'responsable' | 'admin';
  services: string[];
}

export interface Service {
  id: string;
  nom: string;
  description: string;
}

export interface Dossier {
  id: string;
  numero: string;
  date: string;
  expediteur: string;
  objet: string;
  servicesImputes: string[];
  statut: 'en_cours' | 'cloture' | 'urgent';
  observations: string[];
  noteParticuliere: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  historique: HistoriqueEntry[];
}

export interface HistoriqueEntry {
  id: string;
  date: string;
  action: string;
  utilisateur: string;
  details: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'agent@arsn.gov',
    password: 'password123',
    nom: 'Dupont',
    prenom: 'Jean',
    role: 'agent',
    services: ['CT-01']
  },
  {
    id: '2',
    email: 'chef@arsn.gov',
    password: 'password123',
    nom: 'Martin',
    prenom: 'Marie',
    role: 'chef',
    services: ['CT-01', 'CT-02']
  },
  {
    id: '3',
    email: 'responsable@arsn.gov',
    password: 'password123',
    nom: 'Bernard',
    prenom: 'Pierre',
    role: 'responsable',
    services: ['CT-01', 'CT-02', 'CT-03']
  },
  {
    id: '4',
    email: 'admin@arsn.gov',
    password: 'password123',
    nom: 'Admin',
    prenom: 'System',
    role: 'admin',
    services: ['CT-01', 'CT-02', 'CT-03', 'CT-04']
  }
];

export const mockServices: Service[] = [
  {
    id: 'CT-01',
    nom: 'Contrôle Technique',
    description: 'Service de contrôle technique des installations'
  },
  {
    id: 'CT-02',
    nom: 'Sûreté Nucléaire',
    description: 'Service de sûreté nucléaire'
  },
  {
    id: 'CT-03',
    nom: 'Radioprotection',
    description: 'Service de radioprotection'
  },
  {
    id: 'CT-04',
    nom: 'Sécurité Nucléaire',
    description: 'Service de sécurité nucléaire'
  }
];

export const mockDossiers: Dossier[] = [
  {
    id: '1',
    numero: 'ARSN-2025-001',
    date: '2025-01-15',
    expediteur: 'Centrale Nucléaire A',
    objet: 'Demande d\'autorisation pour maintenance',
    servicesImputes: ['CT-01', 'CT-02'],
    statut: 'en_cours',
    observations: ['Vérification technique requise', 'Documentation complète'],
    noteParticuliere: 'Urgence relative à la maintenance préventive',
    createdBy: '1',
    createdAt: '2025-01-15T10:00:00',
    updatedAt: '2025-01-15T10:00:00',
    historique: [
      {
        id: '1',
        date: '2025-01-15T10:00:00',
        action: 'Création du dossier',
        utilisateur: 'Jean Dupont',
        details: 'Dossier créé par l\'agent CT'
      }
    ]
  },
  {
    id: '2',
    numero: 'ARSN-2025-002',
    date: '2025-01-14',
    expediteur: 'Laboratoire B',
    objet: 'Déclaration d\'incident mineur',
    servicesImputes: ['CT-03'],
    statut: 'urgent',
    observations: ['Incident de niveau 1', 'Rapport détaillé fourni'],
    noteParticuliere: 'Traitement prioritaire requis',
    createdBy: '2',
    createdAt: '2025-01-14T14:30:00',
    updatedAt: '2025-01-14T14:30:00',
    historique: [
      {
        id: '2',
        date: '2025-01-14T14:30:00',
        action: 'Création du dossier',
        utilisateur: 'Marie Martin',
        details: 'Dossier créé suite à déclaration d\'incident'
      }
    ]
  },
  {
    id: '3',
    numero: 'ARSN-2025-003',
    date: '2025-01-10',
    expediteur: 'Institut de Recherche C',
    objet: 'Renouvellement d\'autorisation',
    servicesImputes: ['CT-01', 'CT-04'],
    statut: 'cloture',
    observations: ['Autorisation renouvelée', 'Conditions respectées'],
    noteParticuliere: 'Renouvellement standard',
    createdBy: '1',
    createdAt: '2025-01-10T09:00:00',
    updatedAt: '2025-01-12T16:00:00',
    historique: [
      {
        id: '3',
        date: '2025-01-10T09:00:00',
        action: 'Création du dossier',
        utilisateur: 'Jean Dupont',
        details: 'Dossier créé pour renouvellement'
      },
      {
        id: '4',
        date: '2025-01-12T16:00:00',
        action: 'Clôture du dossier',
        utilisateur: 'Pierre Bernard',
        details: 'Autorisation renouvelée avec succès'
      }
    ]
  }
];

export const observationOptions = [
  'Documentation complète',
  'Vérification technique requise',
  'Conformité réglementaire',
  'Incident déclaré',
  'Maintenance préventive',
  'Autorisation accordée',
  'Conditions particulières',
  'Suivi requis'
];
