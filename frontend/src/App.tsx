import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DossierProvider } from './contexts/DossierContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { DossiersPage } from './pages/DossiersPage';
import { UtilisateursPage } from './pages/UtilisateursPage';
import { ServicesPage } from './pages/ServicesPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <DossierProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dossiers"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <DossiersPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/utilisateurs"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Layout>
                      <UtilisateursPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/services"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Layout>
                      <ServicesPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </DossierProvider>
    </AuthProvider>
  );
}

export default App;
