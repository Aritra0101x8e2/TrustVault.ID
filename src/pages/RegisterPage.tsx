
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveUserData, getUserData } from '@/services/authService';
import { toast } from "sonner";
import { Shield, Key, CheckCircle } from 'lucide-react';

const securityQuestions = [
  "What is the name of your current pet?",
  "In which city were you born?",
  "What was your first car?",
  "What is your mother's name?",
  "What was the name of your school?"
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    securityQuestion: securityQuestions[0],
    securityAnswer: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  useEffect(() => {
    const existingUser = getUserData();
    if (existingUser) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, securityQuestion: value }));
  };

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.securityAnswer.trim()) {
      newErrors.securityAnswer = 'Security answer is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      
      const { confirmPassword, ...userData } = formData;
      saveUserData(userData);
      
      toast.success("Identity created successfully! Please login to continue.");
      navigate('/login');
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Shield className="h-12 w-12 text-trustvault-light animate-pulse-glow" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-trustvault-light text-glow mb-2">
          Create Your Identity
        </h1>
        <p className="text-sm text-muted-foreground">
          Register your decentralized identity on the blockchain
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
            className={`bg-trustvault-navy border-trustvault-light/30 ${errors.fullName ? 'border-red-500' : ''}`}
          />
          {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
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
            className={`bg-trustvault-navy border-trustvault-light/30 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
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
            className={`bg-trustvault-navy border-trustvault-light/30 ${errors.securityAnswer ? 'border-red-500' : ''}`}
          />
          {errors.securityAnswer && <p className="text-red-500 text-xs">{errors.securityAnswer}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            className={`bg-trustvault-navy border-trustvault-light/30 ${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`bg-trustvault-navy border-trustvault-light/30 ${errors.confirmPassword ? 'border-red-500' : ''}`}
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
        </div>
        
        <Button type="submit" className="w-full bg-gradient-to-r from-trustvault-light to-trustvault-highlight text-trustvault-navy font-semibold hover:opacity-90">
          <Shield className="mr-2 h-4 w-4" />
          Register Identity
        </Button>
      </form>
      
      <p className="text-center mt-6 text-sm text-muted-foreground">
        Already have an identity?{' '}
        <Button 
          variant="link" 
          className="p-0 text-trustvault-light" 
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      </p>
    </div>
  );
};

export default RegisterPage;
