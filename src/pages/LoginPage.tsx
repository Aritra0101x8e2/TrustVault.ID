
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getUserData, verifyLogin, deleteUserData } from '@/services/authService';
import { toast } from "sonner";
import { LogIn, Shield, Trash2, AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const securityQuestions = [
  "What is the name of your current pet?",
  "In which city were you born?",
  "What was your first car?",
  "What is your mother's name?",
  "What was the name of your school?"
];

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    securityQuestion: securityQuestions[0],
    securityAnswer: '',
    password: ''
  });
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Get user data to prefill the form
    const existingUser = getUserData();
    if (existingUser) {
      setUserData(existingUser);
      setFormData(prev => ({
        ...prev,
        securityQuestion: existingUser.securityQuestion
      }));
    } else {
      // If no user data, redirect to register
      navigate('/register');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, securityQuestion: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginAttempted(true);
    
    if (verifyLogin(formData)) {
      toast.success("Login successful! Generating your access code...");
      navigate('/auth-code');
    } else {
      toast.error("Login failed! Please ensure all details match exactly with your registered information.");
    }
  };

  const handleDeleteData = () => {
    deleteUserData();
    toast.success("Your identity data has been successfully deleted.");
    navigate('/register');
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Shield className="h-12 w-12 text-trustvault-light animate-pulse-glow" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-trustvault-light text-glow mb-2">
          Access Your Identity
        </h1>
        <p className="text-sm text-muted-foreground">
          Login to your decentralized blockchain identity
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            className={`bg-trustvault-navy border-trustvault-light/30 ${loginAttempted && !formData.fullName ? 'border-red-500' : ''}`}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={`bg-trustvault-navy border-trustvault-light/30 ${loginAttempted && !formData.email ? 'border-red-500' : ''}`}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="securityQuestion">Security Question</Label>
          <Select value={formData.securityQuestion} onValueChange={handleSelectChange}>
            <SelectTrigger className="bg-trustvault-navy border-trustvault-light/30">
              <SelectValue placeholder="Select a security question" />
            </SelectTrigger>
            <SelectContent>
              {securityQuestions.map(question => (
                <SelectItem key={question} value={question}>{question}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="securityAnswer">Security Answer</Label>
          <Input
            id="securityAnswer"
            name="securityAnswer"
            placeholder="Answer to your security question"
            value={formData.securityAnswer}
            onChange={handleChange}
            className={`bg-trustvault-navy border-trustvault-light/30 ${loginAttempted && !formData.securityAnswer ? 'border-red-500' : ''}`}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className={`bg-trustvault-navy border-trustvault-light/30 ${loginAttempted && !formData.password ? 'border-red-500' : ''}`}
          />
        </div>
        
        <Button type="submit" className="w-full bg-gradient-to-r from-trustvault-light to-trustvault-highlight text-trustvault-navy font-semibold hover:opacity-90">
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Button>
      </form>
      
      <div className="mt-6 flex justify-center">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Data
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-trustvault-navy border border-red-500/50">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                Confirm Data Deletion
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all your identity data. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-transparent border-gray-500">Cancel</AlertDialogCancel>
              <AlertDialogAction 
                className="bg-red-600 hover:bg-red-700" 
                onClick={handleDeleteData}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default LoginPage;
