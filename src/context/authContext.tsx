
import { firebaseAuth } from "@/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    user: User | null;
    register: (email: string, password: string, displayName: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
            setUser(user);
        })
        return () => unsubscribe();
    }, []);

    const register = async (email: string, password: string, displayName: string): Promise<void> => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            const userData = userCredentials.user;
            await updateProfile(userData, { displayName: displayName });
            setUser({ ...userData, displayName });
            navigate('/products');
        } catch (err) {
            throw err
        }
    };

    const login = async (email: string, password: string): Promise<void> => {
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, password);
            navigate('/products');
        } catch (err) {
            throw err
        }
    }


    const logout = async (): Promise<void> => {
        await firebaseAuth.signOut();
    }

    const values = {
        user,
        register,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthProvider, useAuth }