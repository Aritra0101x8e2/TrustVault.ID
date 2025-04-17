
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { verifyAccessCode, getVaultData } from '@/services/authService';
import { toast } from "sonner";
import { Wallet, Key, File, LogOut, Shield, Coins, FileText, KeyRound } from 'lucide-react';
import NetworkTraffic from '@/components/NetworkTraffic';

const VaultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [vaultData, setVaultData] = useState<any>(null);
  const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
    const accessCode = location.state?.accessCode;
    if (!accessCode || !verifyAccessCode(accessCode)) {
      toast.error("Invalid or expired access code. Please log in again.");
      navigate('/login');
      return;
    }
    
    setAuthenticated(true);
    const data = getVaultData();
    setVaultData(data);
  }, [location.state, navigate]);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate('/login');
  };

  if (!authenticated) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin text-trustvault-light">
        <Shield className="h-12 w-12" />
      </div>
    </div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-trustvault-light mr-3" />
          <h1 className="text-2xl font-bold text-trustvault-light text-glow">TrustVault.ID</h1>
        </div>
        <Button 
          variant="outline" 
          className="border-trustvault-light/30 hover:bg-trustvault-light/10"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-trustvault-light">Your Secure Vault</h2>
        <p className="text-muted-foreground">
          Welcome to your blockchain-secured personal vault. All your data is encrypted and secure.
        </p>
      </div>
      
      <Tabs defaultValue="assets">
        <TabsList className="grid grid-cols-3 mb-8 bg-trustvault-navy">
          <TabsTrigger value="assets" className="data-[state=active]:bg-trustvault-light/10">
            <Coins className="h-4 w-4 mr-2" />
            Crypto Assets
          </TabsTrigger>
          <TabsTrigger value="passwords" className="data-[state=active]:bg-trustvault-light/10">
            <KeyRound className="h-4 w-4 mr-2" />
            Passwords
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-trustvault-light/10">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="assets">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vaultData?.cryptoAssets.map((asset: any, index: number) => (
              <Card key={index} className="bg-trustvault-navy border-trustvault-light/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Wallet className="h-5 w-5 mr-2 text-trustvault-light" />
                    {asset.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{asset.amount}</div>
                  <div className="text-sm text-muted-foreground">Value: {asset.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="passwords">
          <div className="space-y-4">
            {vaultData?.passwords.map((item: any, index: number) => (
              <Card key={index} className="bg-trustvault-navy border-trustvault-light/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Key className="h-5 w-5 mr-2 text-trustvault-light" />
                    {item.site}
                  </CardTitle>
                  <CardDescription>{item.username}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-mono">{item.password}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="documents">
          <div className="grid gap-4 md:grid-cols-2">
            {vaultData?.documents.map((doc: any, index: number) => (
              <Card key={index} className="bg-trustvault-navy border-trustvault-light/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <File className="h-5 w-5 mr-2 text-trustvault-light" />
                    {doc.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">Type: {doc.type}</div>
                  <div className="text-sm text-muted-foreground">Size: {doc.size}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12">
        <NetworkTraffic />
      </div>
    </div>
  );
};

export default VaultPage;
