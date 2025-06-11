
/**
 * Landing Page
 * 
 * Main entry point of the application featuring:
 * - Hero section with value proposition
 * - How it works explanation
 * - Testimonials and social proof
 * - Call-to-action sections
 */

import { useNavigate } from 'react-router-dom';
import LandingPage from '@/components/LandingPage';

const Index = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  const handleAccountCreated = () => {
    navigate('/dashboard');
  };

  return (
    <LandingPage 
      onLogin={handleLogin}
      onAccountCreated={handleAccountCreated}
    />
  );
};

export default Index;
