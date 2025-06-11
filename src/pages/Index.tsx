
/**
 * Index Page (Legacy)
 * 
 * This file is now simplified as routing is handled in App.tsx.
 * This serves as a fallback/redirect component.
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home/questionnaire route
    navigate('/questionnaire');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800">Redirecting...</h2>
        <p className="text-gray-600">Please wait while we load your dashboard</p>
      </div>
    </div>
  );
};

export default Index;
