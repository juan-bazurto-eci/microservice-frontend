import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase";

export type AuthContextType = {
  signUp: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  resetPassword: (email: string) => void;
  user: User | null;
  loading: boolean;
};

export const authContext = createContext<AuthContextType>({
  signUp: (email, password) => {},
  login: (email, password) => {},
  logout: () => {},
  resetPassword: (email) => {},
  user: null,
  loading: true,
});

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signUp = (email: any, password: any) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email: any, password: any) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const resetPassword = (email: any) => {
    sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  return (
    <authContext.Provider
      value={{
        signUp,
        login,
        logout,
        resetPassword,
        user,
        loading,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
