import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const API_BASE = "http://localhost:8000";

export async function apiFetch(path, options = {}) {
    const token = await auth.currentUser?.getIdToken();

    const res = await fetch(API_BASE + path, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...options.headers,
        },
    });

    if (res.status === 401) {
        // allows 1 retry
        try {
            const freshToken = await auth.currentUser?.getIdToken(true); // force refresh
            const retry = await fetch(API_BASE + path, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${freshToken}`,
                },
            });
            if (retry.ok) return retry.json();
        } catch (_) { }

        await signOut(auth); // triggers onAuthStateChanged → null → redirect to /login
        throw new Error("Session expired. Please sign in again.");
    }

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }

    return res.json();
}