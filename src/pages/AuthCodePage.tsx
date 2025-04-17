
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateAccessCode, getAccessCodeTimeRemaining, isAccessCodeExpired } from '@/services/authService';
import { toast } from "sonner";
import { Copy, KeyRound, RefreshCw, LockKeyhole } from 'lucide-react';

const AuthCodePage = () => {
  const navigate = useNavigate();
  const [accessCode, setAccessCode] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [codeGenerated, setCodeGenerated] = useState(false);

  useEffect(() => {
    // Generate a new code when component mounts
    generateNewCode();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (codeGenerated) {
      // Check time remaining every second
      timer = setInterval(() => {
        const remaining = getAccessCodeTimeRemaining();
        setTimeRemaining(remaining);
        
        if (remaining <= 0) {
          setCodeGenerated(false);
          clearInterval(timer!);
          toast.error("Your access code has expired. Please generate a new one.");
        }
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [codeGenerated]);

  const generateNewCode = () => {
    const code = generateAccessCode();
    setAccessCode(code);
    setTimeRemaining(30);
    setCodeGenerated(true);
    toast.success("New access code generated successfully!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accessCode);
    toast.success("Access code copied to clipboard!");
  };

  const enterVault = () => {
    if (isAccessCodeExpired()) {
      toast.error("Your access code has expired. Please generate a new one.");
      return;
    }
    navigate('/vault', { state: { accessCode } });
  };

  // Format code with spaces for readability
  const formattedCode = accessCode.replace(/(.{4})/g, '$1 ').trim();

  return (
    <div className="max-w-md mx-auto p-6">
      <Card className="bg-trustvault-navy border-trustvault-light/20 box-glow">
        <CardHeader className="pb-4">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-trustvault-dark border border-trustvault-light/20">
              <KeyRound className="h-8 w-8 text-trustvault-light" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center text-trustvault-light text-glow">Access Code</CardTitle>
          <CardDescription className="text-center">
            This code is valid for {timeRemaining} seconds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <div className="p-4 bg-trustvault-dark rounded-lg border border-trustvault-light/20 text-center font-mono text-xl tracking-wider text-trustvault-light animate-pulse-glow">
                {formattedCode || '• • • • • • • • • • • • • • • •'}
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-trustvault-navy px-3 py-1 rounded-full border border-trustvault-light/20 text-xs">
                <span className="flex items-center">
                  <LockKeyhole className="h-3 w-3 mr-1" />
                  <span className={`${timeRemaining <= 10 ? 'text-red-400' : 'text-trustvault-light'}`}>
                    {timeRemaining}s remaining
                  </span>
                </span>
              </div>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="border-trustvault-light/30 hover:bg-trustvault-light/10"
                onClick={copyToClipboard}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Code
              </Button>
              <Button 
                variant="outline" 
                className="border-trustvault-light/30 hover:bg-trustvault-light/10"
                onClick={generateNewCode}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
          
          <div className="mt-4">
            <Button 
              className="w-full bg-gradient-to-r from-trustvault-light to-trustvault-highlight text-trustvault-navy font-semibold hover:opacity-90"
              onClick={enterVault}
            >
              Enter Vault
            </Button>
          </div>
          
          <p className="text-xs text-center text-muted-foreground mt-6">
            This code will grant access to your personal blockchain vault. 
            Do not share it with anyone.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCodePage;
