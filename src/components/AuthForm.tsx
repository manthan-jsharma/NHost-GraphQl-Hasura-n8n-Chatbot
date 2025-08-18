// "use client";

// import type React from "react";

// import { useState } from "react";
// import { useSignInEmailPassword, useSignUpEmailPassword } from "@nhost/react";

// export function AuthForm() {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const {
//     signInEmailPassword,
//     isLoading: isSigningIn,
//     error: signInError,
//   } = useSignInEmailPassword();
//   const {
//     signUpEmailPassword,
//     isLoading: isSigningUp,
//     error: signUpError,
//   } = useSignUpEmailPassword();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (isSignUp) {
//       await signUpEmailPassword(email, password);
//     } else {
//       await signInEmailPassword(email, password);
//     }
//   };

//   const isLoading = isSigningIn || isSigningUp;
//   const error = signInError || signUpError;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             {isSignUp ? "Create your account" : "Sign in to your account"}
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <input
//                 type="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div>
//               <input
//                 type="password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           {error && (
//             <div className="text-red-600 text-sm text-center">
//               {error.message}
//             </div>
//           )}

//           <div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//             >
//               {isLoading ? "Loading..." : isSignUp ? "Sign up" : "Sign in"}
//             </button>
//           </div>

//           <div className="text-center">
//             <button
//               type="button"
//               className="text-indigo-600 hover:text-indigo-500"
//               onClick={() => setIsSignUp(!isSignUp)}
//             >
//               {isSignUp
//                 ? "Already have an account? Sign in"
//                 : "Don't have an account? Sign up"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// "use client";

// import type React from "react";
// import { useState } from "react";
// import {
//   useSignInEmailPassword,
//   useSignUpEmailPassword,
//   useResetPassword,
// } from "@nhost/react";
// import { Eye, EyeOff, Loader2, Mail, Lock, User } from "lucide-react";
// import { ThemeToggle } from "./ThemeToggle";

// export function AuthForm() {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(true);

//   const {
//     signInEmailPassword,
//     isLoading: isSigningIn,
//     error: signInError,
//   } = useSignInEmailPassword();
//   const {
//     signUpEmailPassword,
//     isLoading: isSigningUp,
//     error: signUpError,
//   } = useSignUpEmailPassword();
//   const {
//     resetPassword,
//     isLoading: isResetting,
//     error: resetError,
//     isSuccess: resetSuccess,
//   } = useResetPassword();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (showForgotPassword) {
//       await resetPassword(email);
//       return;
//     }

//     if (isSignUp) {
//       await signUpEmailPassword(email, password);
//     } else {
//       await signInEmailPassword(email, password, { rememberMe });
//     }
//   };

//   const isLoading = isSigningIn || isSigningUp || isResetting;
//   const error = signInError || signUpError || resetError;

//   const getErrorMessage = (error: any) => {
//     if (!error) return null;

//     const message = error.message || error.error || "An error occurred";

//     // Convert technical errors to user-friendly messages
//     if (message.includes("Invalid email or password")) {
//       return "The email or password you entered is incorrect. Please try again.";
//     }
//     if (message.includes("User already registered")) {
//       return "An account with this email already exists. Try signing in instead.";
//     }
//     if (message.includes("Email not verified")) {
//       return "Please check your email and click the verification link before signing in.";
//     }
//     if (message.includes("Too many requests")) {
//       return "Too many attempts. Please wait a few minutes before trying again.";
//     }

//     return message;
//   };

//   if (showForgotPassword) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <div className="absolute top-4 right-4">
//           <ThemeToggle />
//         </div>
//         <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-xl shadow-lg border">
//           <div className="text-center">
//             <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
//               <Mail className="h-6 w-6 text-primary" />
//             </div>
//             <h2 className="mt-4 text-2xl font-bold text-foreground">
//               Reset your password
//             </h2>
//             <p className="mt-2 text-sm text-muted-foreground">
//               Enter your email address and we'll send you a link to reset your
//               password.
//             </p>
//           </div>

//           {resetSuccess ? (
//             <div className="text-center space-y-4">
//               <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
//                 <p className="text-green-800 dark:text-green-200">
//                   Password reset email sent! Check your inbox.
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 className="text-primary hover:text-primary/80 font-medium"
//                 onClick={() => setShowForgotPassword(false)}
//               >
//                 Back to sign in
//               </button>
//             </div>
//           ) : (
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-foreground mb-2"
//                 >
//                   Email address
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//                   <input
//                     id="email"
//                     type="email"
//                     required
//                     className="pl-10 w-full px-3 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {error && (
//                 <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
//                   <p className="text-destructive text-sm">
//                     {getErrorMessage(error)}
//                   </p>
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
//                     Sending...
//                   </>
//                 ) : (
//                   "Send reset link"
//                 )}
//               </button>

//               <div className="text-center">
//                 <button
//                   type="button"
//                   className="text-primary hover:text-primary/80 font-medium"
//                   onClick={() => setShowForgotPassword(false)}
//                 >
//                   Back to sign in
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background">
//       <div className="absolute top-4 right-4">
//         <ThemeToggle />
//       </div>
//       <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-xl shadow-lg border">
//         <div className="text-center">
//           <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
//             <User className="h-6 w-6 text-primary" />
//           </div>
//           <h2 className="mt-4 text-2xl font-bold text-foreground">
//             {isSignUp ? "Create your account" : "Welcome back"}
//           </h2>
//           <p className="mt-2 text-sm text-muted-foreground">
//             {isSignUp
//               ? "Sign up to start chatting with AI"
//               : "Sign in to continue your conversations"}
//           </p>
//         </div>

//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-foreground mb-2"
//             >
//               Email address
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//               <input
//                 id="email"
//                 type="email"
//                 required
//                 className="pl-10 w-full px-3 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-foreground mb-2"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 required
//                 className="pl-10 pr-10 w-full px-3 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-5 w-5" />
//                 ) : (
//                   <Eye className="h-5 w-5" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {!isSignUp && (
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-primary focus:ring-primary border-input rounded"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                 />
//                 <label
//                   htmlFor="remember-me"
//                   className="ml-2 block text-sm text-foreground"
//                 >
//                   Remember me
//                 </label>
//               </div>
//               <button
//                 type="button"
//                 className="text-sm text-primary hover:text-primary/80"
//                 onClick={() => setShowForgotPassword(true)}
//               >
//                 Forgot password?
//               </button>
//             </div>
//           )}

//           {error && (
//             <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
//               <p className="text-destructive text-sm">
//                 {getErrorMessage(error)}
//               </p>
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
//                 {isSignUp ? "Creating account..." : "Signing in..."}
//               </>
//             ) : isSignUp ? (
//               "Create account"
//             ) : (
//               "Sign in"
//             )}
//           </button>

//           <div className="text-center">
//             <button
//               type="button"
//               className="text-primary hover:text-primary/80 font-medium"
//               onClick={() => setIsSignUp(!isSignUp)}
//             >
//               {isSignUp
//                 ? "Already have an account? Sign in"
//                 : "Don't have an account? Sign up"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
// "use client";

// import type React from "react";
// import { useState } from "react";
// import { useSignInEmailPassword, useSignUpEmailPassword } from "@nhost/react";
// import { Eye, EyeOff, Loader2, Mail, Lock, User } from "lucide-react";
// import { ThemeToggle } from "./ThemeToggle";

// export function AuthForm() {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(true);

//   const {
//     signInEmailPassword,
//     isLoading: isSigningIn,
//     error: signInError,
//   } = useSignInEmailPassword();
//   const {
//     signUpEmailPassword,
//     isLoading: isSigningUp,
//     error: signUpError,
//   } = useSignUpEmailPassword();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (isSignUp) {
//       await signUpEmailPassword(email, password);
//     } else {
//       // The `signInEmailPassword` function only takes email and password.
//       // Session persistence ("Remember Me") is handled by Nhost's client configuration.
//       await signInEmailPassword(email, password);
//     }
//   };

//   const isLoading = isSigningIn || isSigningUp;
//   const error = signInError || signUpError;

//   const getErrorMessage = (error: any) => {
//     if (!error) return null;

//     const message = error.message || error.error || "An error occurred";

//     // Convert technical errors to user-friendly messages
//     if (message.includes("Invalid email or password")) {
//       return "The email or password you entered is incorrect. Please try again.";
//     }
//     if (message.includes("User already registered")) {
//       return "An account with this email already exists. Try signing in instead.";
//     }
//     if (message.includes("Email not verified")) {
//       return "Please check your email and click the verification link before signing in.";
//     }
//     if (message.includes("Too many requests")) {
//       return "Too many attempts. Please wait a few minutes before trying again.";
//     }

//     return message;
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background">
//       <div className="absolute top-4 right-4">
//         <ThemeToggle />
//       </div>
//       <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-xl shadow-lg border">
//         <div className="text-center">
//           <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
//             <User className="h-6 w-6 text-primary" />
//           </div>
//           <h2 className="mt-4 text-2xl font-bold text-foreground">
//             {isSignUp ? "Create your account" : "Welcome back"}
//           </h2>
//           <p className="mt-2 text-sm text-muted-foreground">
//             {isSignUp
//               ? "Sign up to start chatting with AI"
//               : "Sign in to continue your conversations"}
//           </p>
//         </div>

//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-foreground mb-2"
//             >
//               Email address
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//               <input
//                 id="email"
//                 type="email"
//                 required
//                 className="pl-10 w-full px-3 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-foreground mb-2"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 required
//                 className="pl-10 pr-10 w-full px-3 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-5 w-5" />
//                 ) : (
//                   <Eye className="h-5 w-5" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {!isSignUp && (
//             <div className="flex items-center">
//               <input
//                 id="remember-me"
//                 type="checkbox"
//                 className="h-4 w-4 text-primary focus:ring-primary border-input rounded"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//               />
//               <label
//                 htmlFor="remember-me"
//                 className="ml-2 block text-sm text-foreground"
//               >
//                 Remember me
//               </label>
//             </div>
//           )}

//           {error && (
//             <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
//               <p className="text-destructive text-sm">
//                 {getErrorMessage(error)}
//               </p>
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
//                 {isSignUp ? "Creating account..." : "Signing in..."}
//               </>
//             ) : isSignUp ? (
//               "Create account"
//             ) : (
//               "Sign in"
//             )}
//           </button>

//           <div className="text-center">
//             <button
//               type="button"
//               className="text-primary hover:text-primary/80 font-medium"
//               onClick={() => setIsSignUp(!isSignUp)}
//             >
//               {isSignUp
//                 ? "Already have an account? Sign in"
//                 : "Don't have an account? Sign up"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import type React from "react";
import { useSignInEmailPassword, useSignUpEmailPassword } from "@nhost/react";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  User,
  Bot,
  ExternalLink,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

// Helper for animations
const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const RotatingWords = () => {
  const words = [
    "Converse with the future.",
    "Unlock creative potential.",
    "Powered by intelligence.",
    "Your AI companion.",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-10 overflow-hidden text-2xl md:text-3xl font-bold text-white">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {words[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    signInEmailPassword,
    isLoading: isSigningIn,
    error: signInError,
  } = useSignInEmailPassword();
  const {
    signUpEmailPassword,
    isLoading: isSigningUp,
    error: signUpError,
  } = useSignUpEmailPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      await signUpEmailPassword(email, password);
    } else {
      await signInEmailPassword(email, password);
    }
  };

  const isLoading = isSigningIn || isSigningUp;
  const error = signInError || signUpError;
  const getErrorMessage = (error: any) =>
    error?.message || "An error occurred.";

  return (
    <div className="flex min-h-screen font-sans">
      {/* Left Panel: Form */}
      <div className="relative flex flex-col items-center justify-center w-full lg:w-1/2 bg-background p-8">
        {/* Enhanced Netlify Deployment Link */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-4 left-4 z-50"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg blur-sm transition-all duration-300 group-hover:blur-md group-hover:scale-110" />
            <div className="relative bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <ExternalLink className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide">
                    Netlify Link:
                  </span>
                  <motion.a
                    href="https://nhost-n8n-hasura-chatbot.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300 relative"
                    whileHover={{ scale: 1.02 }}
                  >
                    View Live Demo
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Theme Toggle */}
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={formVariants}
          transition={{ staggerChildren: 0.1 }}
          className="w-full max-w-md space-y-6"
        >
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {isSignUp ? "Create an Account" : "Welcome Back"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {isSignUp
                ? "Join to start your AI journey."
                : "Sign in to continue."}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isSignUp ? "signup" : "signin"}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={formVariants}
              transition={{ duration: 0.3 }}
              className="space-y-4"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full rounded-md border border-input bg-transparent pl-10 pr-4 py-2.5 transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full rounded-md border border-input bg-transparent pl-10 pr-10 py-2.5 transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500">{getErrorMessage(error)}</p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center rounded-md bg-primary px-4 py-2.5 font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSignUp ? "Create Account" : "Sign In"}
              </motion.button>
            </motion.form>
          </AnimatePresence>

          <p className="text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-semibold text-primary hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </motion.div>
      </div>

      {/* Right Panel: Branding */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-4 bg-white/10 rounded-full inline-block">
            <Bot size={64} className="mx-auto text-white" />
          </div>
          <h2 className="mt-6 text-4xl font-extrabold text-white">
            Welcome to the Future
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Your intelligent assistant for seamless conversations.
          </p>
          <div className="mt-10">
            <RotatingWords />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
