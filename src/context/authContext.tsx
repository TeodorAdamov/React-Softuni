
import { firebaseAuth } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: User | null;
    register: (email: string, password: string, displayName: string) => void;
    logout: () => void;
}

const defaultContextValues: AuthContextType = {
    user: null,
    register: () => { },
    logout: () => { }
}

const AuthContext = createContext<AuthContextType>(defaultContextValues);

const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
            setUser(user);
        })
        return () => unsubscribe();
    }, []);

    const register = (email: string, password: string, displayName: string) => {
        createUserWithEmailAndPassword(firebaseAuth, email, password)
            .then(async (userCredentials) => {
                const userData = userCredentials.user
                await updateProfile(userData, { displayName: displayName })
                setUser({ ...userData, displayName });
            }).catch((err) => {
                throw err
            });
    };

    const logout = async () => {
        await firebaseAuth.signOut();
    }

    const values = {
        user,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthProvider, useAuth }