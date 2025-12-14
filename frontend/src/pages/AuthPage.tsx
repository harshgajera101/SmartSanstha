import React, { useState } from 'react';
import { User, Mail, KeyRound, Calendar, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  category: string;
}

interface AuthPageProps {
  onLoginSuccess: (userData: UserData) => void;
}

// --- Styled Components ---

interface CardProps {
  children: React.ReactNode;
  className?: string;
}
// CHANGE 1: Reduced padding from p-8 to p-6 to make the card smaller
const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-xl p-6 ${className}`}>
    {children}
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}
// CHANGE 2: Slightly reduced padding in button (py-2.5 instead of py-3) for a compact look
const Button: React.FC<ButtonProps> = ({ children, icon, ...props }) => (
  <button
    {...props}
    className="flex items-center justify-center gap-3 w-full px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {icon}
    {children}
  </button>
);

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
}
// CHANGE 3: Slightly reduced vertical padding in inputs (py-2.5 instead of py-3)
const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(({ icon, ...props }, ref) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
      {icon}
    </div>
    <input
      ref={ref}
      {...props}
      className="w-full bg-slate-700 border border-slate-600 rounded-xl pl-12 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all [color-scheme:dark]"
    />
  </div>
));

// --- Main Component ---

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
  
  const API_URL = import.meta.env.VITE_AUTH_API_BASE_URL;

  const today = new Date();
  const maxDateObj = new Date(today.getFullYear() - 12, today.getMonth(), today.getDate());
  const maxDate = maxDateObj.toISOString().split('T')[0];

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

    const birthDate = new Date(dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const m = currentDate.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 12) {
      setError("You must be at least 12 years old to create an account.");
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
        credentials: 'include',
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Failed to register.');
      
      setSuccess("Registration successful! Please sign in.");
      setIsLoginView(true);
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
        credentials: 'include',
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Failed to login.');
      
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
    // CHANGE 4: Added 'my-8' to give space from top and bottom. 
    // Kept max-w-md, but you can change to max-w-sm if you want the card narrower width-wise too.
    <div className="w-full max-w-md animate-fade-in my-8">
      <Card>
        <div className="text-center mb-6">
          {/* CHANGE 5: Reduced icon size from w-20 h-20 to w-16 h-16 */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl mb-4">
            {isLoginView ? <LogIn className="w-8 h-8 text-white" /> : <UserPlus className="w-8 h-8 text-white" />}
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            {isLoginView ? 'Welcome Back!' : 'Create Account'}
          </h1>
          <p className="text-sm text-slate-400">
            {isLoginView ? 'Sign in to continue.' : 'Join to start learning.'}
          </p>
        </div>

        {/* CHANGE 6: Reduced space-y-6 to space-y-4 to make form shorter */}
        <form onSubmit={isLoginView ? handleLogin : handleRegister} className="space-y-4">
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
              
              <div className="relative">
                <InputField
                  icon={<Calendar className="w-5 h-5" />}
                  type="date"
                  required
                  value={dob}
                  max={maxDate}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl pl-12 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all [color-scheme:dark]"
                />
                <p className="text-[10px] text-slate-500 mt-1 ml-1">
                   Must be 12+ years old.
                </p>
              </div>

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
          {error && <p className="text-xs text-red-400 bg-red-500/10 p-2 rounded-lg text-center">{error}</p>}
          {success && <p className="text-xs text-green-400 bg-green-500/10 p-2 rounded-lg text-center">{success}</p>}

          <Button type="submit" disabled={isLoading} icon={isLoginView ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}>
            {isLoading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Sign Up')}
          </Button>
        </form>
        <div className="text-center mt-4">
          <button onClick={toggleView} className="text-sm text-slate-400 hover:text-white">
            {isLoginView ? "No account?" : "Have an account?"}
            <span className="font-semibold text-orange-400 hover:text-orange-300 ml-1">
              {isLoginView ? 'Sign Up' : 'Sign In'}
            </span>
          </button>
        </div>
      </Card>
    </div>
  );
};