
/**
 * Login Page
 * 
 * User authentication page for:
 * - Email/password login
 * - Two-factor authentication
 * - Password reset functionality
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

  return (
    <LoginForm 
      onBack={handleBack}
      onSwitchToSignup={handleSwitchToSignup}
      onLoginSuccess={handleLoginSuccess}
    />
  );
};

export default LoginPage;
