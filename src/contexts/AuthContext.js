import { jsx as _jsx } from "react/jsx-runtime";
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, firestoreDb } from '../firebaseConfig';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [firebaseUser, setFirebaseUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [viewedPatient, setViewedPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            if (!currentUser) {
                setFirebaseUser(null);
                setProfile(null);
                setViewedPatient(null);
                setLoading(false);
                return;
            }
            setFirebaseUser(currentUser);
            try {
                const snapshot = await getDoc(doc(firestoreDb, 'users', currentUser.uid));
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    const nextProfile = {
                        uid: currentUser.uid,
                        name: data.name ?? currentUser.displayName ?? '',
                        email: data.email ?? currentUser.email ?? '',
                        type: data.type === 'profissional' ? 'profissional' : 'paciente',
                        assignedProfessionalId: data.assignedProfessionalId?.trim().toLowerCase(),
                    };
                    setProfile(nextProfile);
                    if (nextProfile.type === 'paciente') {
                        setViewedPatient({
                            uid: nextProfile.uid,
                            name: nextProfile.name,
                            email: nextProfile.email,
                            type: 'paciente',
                            assignedProfessionalId: nextProfile.assignedProfessionalId,
                        });
                    }
                    else {
                        setViewedPatient(null);
                    }
                }
            }
            finally {
                setLoading(false);
            }
        });
        return unsubscribe;
    }, []);
    const logout = async () => {
        await auth.signOut();
    };
    return (_jsx(AuthContext.Provider, { value: {
            firebaseUser,
            profile,
            viewedPatient,
            setViewedPatient,
            loading,
            logout,
        }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de AuthProvider');
    }
    return context;
};
