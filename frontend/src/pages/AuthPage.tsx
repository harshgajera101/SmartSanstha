import React, { useState } from 'react';
import { User, Mail, KeyRound, Calendar, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';

// Define a type for the user data we expect from the backend
interface UserData {
  id: string;
  name: string;
  email: string;
  category: string;
}

// Props now include a callback function to notify the parent component of a successful login
interface AuthPageProps {
  onLoginSuccess: (userData: UserData) => void;
}

// --- Styled Components (Replicated from your project's style - NO CHANGES) ---
// ... (Card, Button, InputField components remain unchanged) ...
interface CardProps {
  children: React.ReactNode;
  className?: string;
}
const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-xl p-8 ${className}`}>
    {children}
  </div>
);
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}
const Button: React.FC<ButtonProps> = ({ children, icon, ...props }) => (
  <button
    {...props}
    className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {icon}
    {children}
  </button>
);
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
}
const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(({ icon, ...props }, ref) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
      {icon}
    </div>
    <input
      ref={ref}
      {...props}
      className="w-full bg-slate-700 border border-slate-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
    />
  </div>
));
// --- Main Authentication Page Component ---

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Get the API base URL from the environment variable
  const API_URL = import.meta.env.VITE_AUTH_API_BASE_URL;

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError(null);
    setSuccess(null);
    setEmail('');
    setPassword('');
    setName('');
    setDob('');
    setConfirmPassword('');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, dob, email, password, confirmPassword }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to register.');
      }
      
      setSuccess("Registration successful! Please sign in.");
      setIsLoginView(true); // Switch to login view
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        // IMPORTANT: This allows cookies to be sent and received
        credentials: 'include',
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to login.');
      }
      
      // On success, call the function passed from App.tsx
      onLoginSuccess(data.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const PasswordToggle = () => (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-white"
    >
      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    </button>
  );

  return (
    <div className="w-full max-w-md animate-fade-in">
      <Card>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl mb-6">
            {isLoginView ? <LogIn className="w-10 h-10 text-white" /> : <UserPlus className="w-10 h-10 text-white" />}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLoginView ? 'Welcome Back!' : 'Create Your Account'}
          </h1>
          <p className="text-slate-400">
            {isLoginView ? 'Sign in to continue your journey.' : 'Join us to start learning about the constitution.'}
          </p>
        </div>
        <form onSubmit={isLoginView ? handleLogin : handleRegister} className="space-y-6">
          {!isLoginView && (
            <>
              <InputField
                icon={<User className="w-5 h-5" />}
                type="text"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputField
                icon={<Calendar className="w-5 h-5" />}
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </>
          )}
          <InputField
            icon={<Mail className="w-5 h-5" />}
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <InputField
              icon={<KeyRound className="w-5 h-5" />}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordToggle />
          </div>
          {!isLoginView && (
            <div className="relative">
              <InputField
                icon={<KeyRound className="w-5 h-5" />}
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
               <PasswordToggle />
            </div>
          )}
          {error && <p className="text-sm text-red-400 bg-red-500/10 p-3 rounded-lg text-center">{error}</p>}
          {success && <p className="text-sm text-green-400 bg-green-500/10 p-3 rounded-lg text-center">{success}</p>}

          <Button type="submit" disabled={isLoading} icon={isLoginView ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}>
            {isLoading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Sign Up')}
          </Button>
        </form>
        <div className="text-center mt-6">
          <button onClick={toggleView} className="text-sm text-slate-400 hover:text-white">
            {isLoginView ? "Don't have an account?" : "Already have an account?"}
            <span className="font-semibold text-orange-400 hover:text-orange-300 ml-1">
              {isLoginView ? 'Sign Up' : 'Sign In'}
            </span>
          </button>
        </div>
      </Card>
    </div>
  );
};