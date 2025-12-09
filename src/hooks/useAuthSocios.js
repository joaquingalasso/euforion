import { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile as updateAuthProfile
} from 'firebase/auth';
import {
    doc,
    getDoc,
    updateDoc
} from 'firebase/firestore';

export const useAuthSocios = () => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null); // Firestore data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Derived State
    const isAdmin = userData?.rol === 'admin';

    // Initial Auth Check
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            if (currentUser) {
                setUser(currentUser);
                // If the user has a display name (which stores the DNI), fetch their data
                if (currentUser.displayName) {
                    await fetchProfile(currentUser.displayName);
                }
            } else {
                setUser(null);
                setUserData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const fetchProfile = async (dniKey) => {
        if (!dniKey) return;
        try {
            const docRef = doc(db, 'socios', dniKey);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserData(docSnap.data());
            }
        } catch (e) {
            console.error("Error fetching profile", e);
        }
    };

    // 1. Step 1: Validate DNI (Check if exists + active)
    const validateDNI = async (dni) => {
        setLoading(true);
        setError(null);
        try {
            const docRef = doc(db, 'socios', dni.toString());
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                throw new Error("No se encontró un socio con ese DNI.");
            }

            const data = docSnap.data();

            if (data.ya_registro_password) {
                throw new Error("Esta cuenta ya fue activada. Por favor ingresá con tu email y contraseña.");
            }

            // Return necessary info for next steps
            return {
                exists: true,
                hasBirthdateStored: !!data.fecha_nacimiento,
                name: data.nombres,
                dni: dni.toString()
            };

        } catch (e) {
            console.error(e);
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    // 2. Step 2: Confirm Identity (Birthdate Check or Capture)
    const confirmIdentity = async (dni, birthdateInput) => {
        setLoading(true);
        setError(null);
        try {
            const docRef = doc(db, 'socios', dni.toString());
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();

            const normalize = (d) => d ? d.replace(/-/g, '/').trim() : '';

            if (data.fecha_nacimiento) {
                // If DB has birthdate, it MUST match
                if (normalize(data.fecha_nacimiento) !== normalize(birthdateInput)) {
                    throw new Error("La fecha de nacimiento no coincide con nuestros registros.");
                }
            } else {
                // If DB missing birthdate, SAVE it (Reverse Sync will take care of Sheet later)
                await updateDoc(docRef, {
                    fecha_nacimiento: birthdateInput
                });
            }
            return true;
        } catch (e) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    // 3. Step 3: Register User (Create Auth)
    const registerUser = async (dni, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const docRef = doc(db, 'socios', dni.toString());

            // Create Auth User
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;

            // Save DNI in DisplayName
            await updateAuthProfile(newUser, { displayName: dni.toString() });

            // Update Firestore
            await updateDoc(docRef, {
                email_auth: email,
                ya_registro_password: true,
                uid: newUser.uid
            });

            setUser(newUser);
            await fetchProfile(dni.toString());
        } catch (e) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError("Email o contraseña incorrectos.");
        } finally {
            setLoading(false);
        }
    };

    const logout = () => signOut(auth);

    return {
        user,
        userData,
        loading,
        error,
        validateDNI,
        confirmIdentity,
        registerUser,
        login,
        logout,
        isAdmin
    };
};
