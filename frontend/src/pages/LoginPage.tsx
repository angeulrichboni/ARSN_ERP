import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FormInput } from '../components/FormInput';
import { ToastNotification } from '../components/ToastNotification';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);
  
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        setToast({ message: 'Connexion réussie !', type: 'success' });
        // La redirection sera gérée par le guard d'authentification
      } else {
        setToast({ message: 'Identifiants invalides', type: 'error' });
      }
    } catch {
      setToast({ message: 'Erreur lors de la connexion', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ARSN - Connexion
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Autorité de Radioprotection, de Sûreté et de Sécurité Nucléaires
          </p>
        </div>
        
        <div className="mt-8 bg-white py-8 px-6 shadow rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="nom@arsn.gov"
              required
            />
            
            <FormInput
              label="Mot de passe"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Mot de passe"
              required
            />

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </button>
            </div>
          </form>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-2">Comptes de test :</p>
              <div className="space-y-1">
                <p>Agent: agent@arsn.gov / password123</p>
                <p>Chef: chef@arsn.gov / password123</p>
                <p>Responsable: responsable@arsn.gov / password123</p>
                <p>Admin: admin@arsn.gov / password123</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <ToastNotification
          isVisible={true}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};
