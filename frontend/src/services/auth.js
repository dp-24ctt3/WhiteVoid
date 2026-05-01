import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { apiFetch } from "../utils/api";

export const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

export const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

export const signInWithGoogle = () =>
    signInWithPopup(auth, googleProvider);

export const logOut = () => signOut(auth);

export const getToken = () => auth.currentUser?.getIdToken();

export const getUserDetail = () => apiFetch("/auth/me");