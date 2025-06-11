
/**
 * Login Page
 * 
 * User authentication page for:
 * - Email/password login
 * - Two-factor authentication
 * - Password reset functionality
 * - Admin login (admin@valoov.com)
 */

import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleSwitchToSignup = () => {
    navigate('/signup');
  };

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  const handleAdminLoginSuccess = () => {
    navigate('/admin/dashboard');
  };

  return (
    <LoginForm 
      onBack={handleBack}
      onSwitchToSignup={handleSwitchToSignup}
      onLoginSuccess={handleLoginSuccess}
      onAdminLoginSuccess={handleAdminLoginSuccess}
    />
  );
};

export default LoginPage;
