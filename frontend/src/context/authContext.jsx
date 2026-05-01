
import { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../config/firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser)
        });

        return unsubcribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}