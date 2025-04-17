
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Shield, Lock, Database, ArrowRight } from 'lucide-react';
import { getUserData } from '@/services/authService';
import BlockchainAnimation from '@/components/BlockchainAnimation';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      setTimeout(() => {
        navigate('/login');
      }, 3000); 
    }
  }, [navigate]);
  
  const handleGetStarted = () => {
    const userData = getUserData();
    navigate(userData ? '/login' : '/register');
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {}
      <BlockchainAnimation />
      
      {}
      <div className="container mx-auto px-4 py-16 flex-1 flex flex-col justify-center items-center relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-4 bg-trustvault-navy bg-opacity-80 rounded-full mb-6 border border-trustvault-light/20 box-glow">
            <Shield className="h-16 w-16 text-trustvault-light animate-pulse-glow" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-trustvault-light text-glow">
            TrustVault.ID
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Secure your digital identity and assets with blockchain technology
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-trustvault-navy bg-opacity-80 border border-trustvault-light/20 p-6 rounded-lg">
              <Lock className="h-10 w-10 text-trustvault-light mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-trustvault-light">Decentralized Identity</h3>
              <p className="text-muted-foreground">Create a secure identity that you control, not owned by any corporation</p>
            </div>
            
            <div className="bg-trustvault-navy bg-opacity-80 border border-trustvault-light/20 p-6 rounded-lg">
              <Database className="h-10 w-10 text-trustvault-light mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-trustvault-light">Secure Vault</h3>
              <p className="text-muted-foreground">Store your passwords, documents, and crypto assets safely</p>
            </div>
            
            <div className="bg-trustvault-navy bg-opacity-80 border border-trustvault-light/20 p-6 rounded-lg">
              <Shield className="h-10 w-10 text-trustvault-light mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-trustvault-light">Time-Limited Access</h3>
              <p className="text-muted-foreground">Enhanced security with temporary access codes for your vault</p>
            </div>
          </div>
          
          <Button 
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-trustvault-light to-trustvault-highlight text-trustvault-dark px-8 py-6 text-lg font-semibold rounded-full hover:opacity-90 animate-float shadow-lg"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <footer className="py-6 text-center text-muted-foreground relative z-10">
        <p>&copy; {new Date().getFullYear()} TrustVault.ID by DarkWave - Aritra Kundu • Secure Your Digital Future</p>
      </footer>
    </div>
  );
};

export default Index;
