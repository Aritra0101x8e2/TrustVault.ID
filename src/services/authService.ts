
// Data structure for user
export interface UserData {
  fullName: string;
  email: string;
  securityQuestion: string;
  securityAnswer: string;
  password: string;
}

const USER_STORAGE_KEY = 'trustvault-user-data';
const TOKEN_STORAGE_KEY = 'trustvault-access-token';
const TOKEN_EXPIRY_KEY = 'trustvault-token-expiry';

// Save user data to localStorage
export const saveUserData = (userData: UserData): void => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
};

// Get user data from localStorage
export const getUserData = (): UserData | null => {
  const data = localStorage.getItem(USER_STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

// Delete user data from localStorage
export const deleteUserData = (): void => {
  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
};

// Verify login data against stored data
export const verifyLogin = (inputData: UserData): boolean => {
  const storedData = getUserData();
  if (!storedData) return false;
  
  return (
    inputData.email === storedData.email &&
    inputData.password === storedData.password &&
    inputData.fullName === storedData.fullName &&
    inputData.securityQuestion === storedData.securityQuestion &&
    inputData.securityAnswer === storedData.securityAnswer
  );
};

// Generate a random 16-digit access code
export const generateAccessCode = (): string => {
  let code = '';
  for (let i = 0; i < 16; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }
  
  // Store the code and its expiry time
  const expiryTime = Date.now() + 30000; // 30 seconds from now
  localStorage.setItem(TOKEN_STORAGE_KEY, code);
  localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
  
  return code;
};

// Verify the access code
export const verifyAccessCode = (code: string): boolean => {
  const storedCode = localStorage.getItem(TOKEN_STORAGE_KEY);
  const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
  
  if (!storedCode || !expiryTime) return false;
  
  const now = Date.now();
  const isExpired = now > parseInt(expiryTime);
  
  if (isExpired) {
    // Clear expired token
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
    return false;
  }
  
  return code === storedCode;
};

// Check if the access code has expired
export const isAccessCodeExpired = (): boolean => {
  const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
  
  if (!expiryTime) return true;
  
  return Date.now() > parseInt(expiryTime);
};

// Get time remaining on access code in seconds
export const getAccessCodeTimeRemaining = (): number => {
  const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
  
  if (!expiryTime) return 0;
  
  const remaining = parseInt(expiryTime) - Date.now();
  return Math.max(0, Math.floor(remaining / 1000));
};

// Save mock vault data
export const saveVaultData = (vaultData: any): void => {
  localStorage.setItem('trustvault-vault-data', JSON.stringify(vaultData));
};

// Get vault data
export const getVaultData = (): any => {
  const data = localStorage.getItem('trustvault-vault-data');
  
  if (!data) {
    // Return default vault data if none exists
    return {
      cryptoAssets: [
        { name: 'Bitcoin', amount: '0.025', value: '$612.50' },
        { name: 'Ethereum', amount: '0.5', value: '$925.00' },
        { name: 'Solana', amount: '5', value: '$475.00' }
      ],
      passwords: [
        { site: 'Example Bank', username: 'user123', password: '************' },
        { site: 'Email Provider', username: 'user@example.com', password: '************' }
      ],
      documents: [
        { name: 'Insurance Policy', type: 'PDF', size: '2.4 MB' },
        { name: 'Property Deed', type: 'PDF', size: '1.8 MB' }
      ]
    };
  }
  
  return JSON.parse(data);
};
