
/**
 * Signup Page
 * 
 * User registration page for:
 * - Account creation
 * - Company information
 * - Email verification
 * - Two-factor setup
 */

import { useNavigate } from 'react-router-dom';
import SignupForm from '@/components/SignupForm';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleAccountCreated = () => {
    navigate('/dashboard');
  };

  return (
    <SignupForm 
      onBack={handleBack}
      onLogin={handleLogin}
      onAccountCreated={handleAccountCreated}
    />
  );
};

export default SignupPage;
