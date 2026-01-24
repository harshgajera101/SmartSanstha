// // frontend/src/pages/AuthPage.tsx
// import React, { useState } from 'react';
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   updateProfile,
//   sendEmailVerification
// } from "firebase/auth";
// import { auth } from "../firebase";

// import { User, Mail, KeyRound, Calendar, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';

// interface UserData {
//   id: string;
//   name: string;
//   email: string;
//   category: string;
// }

// interface AuthPageProps {
//   onLoginSuccess: (userData: UserData) => void;
// }

// // --- Styled Components ---

// interface CardProps {
//   children: React.ReactNode;
//   className?: string;
// }

// const Card: React.FC<CardProps> = ({ children, className = '' }) => (
//   <div className={`bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-xl p-6 ${className}`}>
//     {children}
//   </div>
// );

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   children: React.ReactNode;
//   icon?: React.ReactNode;
// }

// const Button: React.FC<ButtonProps> = ({ children, icon, ...props }) => (
//   <button
//     {...props}
//     className="flex items-center justify-center gap-3 w-full px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50"
//   >
//     {icon}
//     {children}
//   </button>
// );

// interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   icon: React.ReactNode;
// }

// const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(({ icon, ...props }, ref) => (
//   <div className="relative">
//     <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
//       {icon}
//     </div>
//     <input
//       ref={ref}
//       {...props}
//       className="w-full bg-slate-700 border border-slate-600 rounded-xl pl-12 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//     />
//   </div>
// ));

// // --- Main Component ---

// export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
//   const [isLoginView, setIsLoginView] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [name, setName] = useState('');
//   const [dob, setDob] = useState('');

//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const today = new Date();
//   const maxDate = new Date(today.getFullYear() - 12, today.getMonth(), today.getDate())
//     .toISOString()
//     .split('T')[0];

//   const toggleView = () => {
//     setIsLoginView(!isLoginView);
//     setError(null);
//     setSuccess(null);
//     setEmail('');
//     setPassword('');
//     setConfirmPassword('');
//     setName('');
//     setDob('');
//   };

//   // ---------------- REGISTER ----------------
//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     const birthDate = new Date(dob);
//     const age = today.getFullYear() - birthDate.getFullYear();
//     if (age < 12) {
//       setError("You must be at least 12 years old.");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       await updateProfile(userCredential.user, {
//         displayName: name,
//       });

//       await sendEmailVerification(userCredential.user);

//       setSuccess("Verification email sent! Please verify your email before signing in.");
//       setIsLoginView(true);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ---------------- LOGIN ----------------
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       const user = userCredential.user;

//       if (!user.emailVerified) {
//         setError("Please verify your email before logging in.");
//         await auth.signOut();
//         return;
//       }


//       // 🔥 NEW: Sync with backend
//       const token = await user.getIdToken();
//       await fetch("http://localhost:5001/api/auth/firebase", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//       });

//       onLoginSuccess({
//         id: user.uid,
//         name: user.displayName || "",
//         email: user.email || "",
//         category: "user",
//       });
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   const PasswordToggle = () => (
//     <button
//       type="button"
//       onClick={() => setShowPassword(!showPassword)}
//       className="absolute inset-y-0 right-0 pr-4 text-slate-400"
//     >
//       {showPassword ? <EyeOff /> : <Eye />}
//     </button>
//   );

//   return (
//     <div className="w-full max-w-md my-8">
//       <Card>
//         <div className="text-center mb-6">
//           <div className="inline-flex w-16 h-16 items-center justify-center bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4">
//             {isLoginView ? <LogIn /> : <UserPlus />}
//           </div>
//           <h1 className="text-2xl font-bold text-white">
//             {isLoginView ? "Welcome Back!" : "Create Account"}
//           </h1>
//         </div>

//         <form onSubmit={isLoginView ? handleLogin : handleRegister} className="space-y-4">
//           {!isLoginView && (
//             <>
//               <InputField
//                 icon={<User />}
//                 placeholder="Full Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//               <InputField
//                 icon={<Calendar />}
//                 type="date"
//                 max={maxDate}
//                 value={dob}
//                 onChange={(e) => setDob(e.target.value)}
//                 required
//               />
//             </>
//           )}

//           <InputField
//             icon={<Mail />}
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <div className="relative">
//             <InputField
//               icon={<KeyRound />}
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <PasswordToggle />
//           </div>

//           {!isLoginView && (
//             <InputField
//               icon={<KeyRound />}
//               type={showPassword ? "text" : "password"}
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           )}

//           {error && <p className="text-red-400 text-xs text-center">{error}</p>}
//           {success && <p className="text-green-400 text-xs text-center">{success}</p>}

//           <Button type="submit" disabled={isLoading}>
//             {isLoading ? "Processing..." : isLoginView ? "Sign In" : "Sign Up"}
//           </Button>
//         </form>

//         <div className="text-center mt-4">
//           <button onClick={toggleView} className="text-sm text-slate-400">
//             {isLoginView ? "No account? Sign Up" : "Have an account? Sign In"}
//           </button>
//         </div>
//       </Card>
//     </div>
//   );
// };














// frontend/src/pages/AuthPage.tsx
import React, { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  AuthError
} from "firebase/auth";
import { auth } from "../firebase";

import { User, Mail, KeyRound, Calendar, LogIn, UserPlus, Eye, EyeOff, Shield } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  category: string;
}

interface AuthPageProps {
  onLoginSuccess: (userData: UserData) => void;
  onNavigate: (page: string) => void; // ✅ Add this
}

// --- Styled Components ---

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-xl p-6 ${className}`}>
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
    className="flex items-center justify-center gap-3 w-full px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
    <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
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

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess, onNavigate }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  const API_URL = import.meta.env.VITE_AUTH_API_BASE_URL;

  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 12, today.getMonth(), today.getDate())
    .toISOString()
    .split('T')[0];

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError(null);
    setSuccess(null);
    setShowVerificationMessage(false);
    
    // Only clear fields when manually switching (not after registration)
    if (!showVerificationMessage) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
      setDob('');
    }
  };

  /**
   * Get user-friendly error message from Firebase error code
   */
  const getFirebaseErrorMessage = (error: AuthError): string => {
    switch (error.code) {
      // Login errors
      case 'auth/user-not-found':
        return 'Email not found. Please check your email or sign up.';
      case 'auth/wrong-password':
        return 'Wrong password. Please try again.';
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please try again.';
      case 'auth/too-many-requests':
        return 'Too many failed login attempts. Please try again later.';
      
      // Registration errors
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please log in instead.';
      case 'auth/weak-password':
        return 'Password is too weak. Use at least 6 characters.';
      case 'auth/invalid-email':
        return 'Invalid email format. Please enter a valid email.';
      
      // Network errors
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';
      
      // Default
      default:
        console.error('Firebase error:', error.code, error.message);
        return error.message || 'An error occurred. Please try again.';
    }
  };

  // ---------------- REGISTER ----------------
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate age
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    
    const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
    
    if (actualAge < 12) {
      setError("You must be at least 12 years old to register.");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2. Update Firebase user profile with name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // 3. Send email verification
      await sendEmailVerification(userCredential.user);

      // 4. Switch to login view with pre-filled credentials
      setIsLoginView(true);
      setShowVerificationMessage(true);
      setConfirmPassword(''); // Clear confirm password
      setName(''); // Clear name
      setDob(''); // Clear DOB
      // Keep email and password filled

    } catch (err: any) {
      const errorMessage = getFirebaseErrorMessage(err as AuthError);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- LOGIN ----------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // 1. Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 2. Check email verification
      if (!user.emailVerified) {
        setError("Please verify your email before logging in. Check your inbox for the verification link.");
        await auth.signOut();
        setIsLoading(false);
        return;
      }

      // 3. Get Firebase ID token
      const token = await user.getIdToken();

      // 4. Sync with backend to get JWT session tokens
      const response = await fetch(`${API_URL}/api/auth/firebase`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Backend authentication failed");
      }

      // 5. Success - trigger login callback
      onLoginSuccess({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        category: data.user.category,
      });

    } catch (err: any) {
      // Check if it's a Firebase error or backend error
      if (err.code && err.code.startsWith('auth/')) {
        const errorMessage = getFirebaseErrorMessage(err as AuthError);
        setError(errorMessage);
      } else {
        setError(err.message || "Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const PasswordToggle = () => (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 pr-4 text-slate-400 hover:text-slate-300 transition-colors"
      tabIndex={-1}
    >
      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    </button>
  );

  return (
    <div className="w-full max-w-md my-8">
      <Card>
        <div className="text-center mb-6">
          <div className="inline-flex w-16 h-16 items-center justify-center bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4">
            {isLoginView ? <LogIn className="w-8 h-8 text-white" /> : <UserPlus className="w-8 h-8 text-white" />}
          </div>
          <h1 className="text-2xl font-bold text-white">
            {isLoginView ? "Welcome Back!" : "Create Account"}
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            {isLoginView ? "Sign in to continue learning" : "Join SmartSanstha today"}
          </p>
        </div>

        {/* Verification Message - Only show on login page after registration */}
        {isLoginView && showVerificationMessage && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-4">
            <p className="text-blue-400 text-sm text-center">
              Account created successfully! Please check your email and verify your account before logging in.
            </p>
          </div>
        )}

        <form onSubmit={isLoginView ? handleLogin : handleRegister} className="space-y-4">
          {!isLoginView && (
            <>
              <InputField
                icon={<User className="w-5 h-5" />}
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
              <InputField
                icon={<Calendar className="w-5 h-5" />}
                type="date"
                max={maxDate}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                title="You must be at least 12 years old"
              />
            </>
          )}

          <InputField
            icon={<Mail className="w-5 h-5" />}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <div className="relative">
            <InputField
              icon={<KeyRound className="w-5 h-5" />}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={isLoginView ? "current-password" : "new-password"}
            />
            <PasswordToggle />
          </div>

          {!isLoginView && (
            <div className="relative">
              <InputField
                icon={<KeyRound className="w-5 h-5" />}
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <p className="text-green-400 text-sm text-center">{success}</p>
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isLoading}
            icon={isLoginView ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          >
            {isLoading ? "Processing..." : isLoginView ? "Sign In" : "Sign Up"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <button 
            onClick={toggleView} 
            className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
            disabled={isLoading}
          >
            {isLoginView 
              ? "Don't have an account? Sign Up" 
              : "Already have an account? Sign In"}
          </button>
        </div>


        {isLoginView && (
    <div className="mt-4 pt-4 border-t border-slate-700">
      <button
        onClick={() => {
          // ✅ FIXED: Use onNavigate instead of window.location
          onNavigate('admin-login');
        }}
        className="w-full text-sm text-slate-500 hover:text-orange-400 transition-colors flex items-center justify-center gap-2"
      >
        <Shield className="w-4 h-4" />
        Admin Login
      </button>
    </div>
  )}

      </Card>
    </div>
  );
};