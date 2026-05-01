import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCe9vJEnJUcU5z5o1BQRGhj9e8i20rSlVw",
    authDomain: "todo-noteapp.firebaseapp.com",
    projectId: "todo-noteapp",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();