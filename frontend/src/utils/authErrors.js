const messages = {
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/too-many-requests": "Too many attempts. Try again later.",
    "auth/popup-closed-by-user": "Sign-in was cancelled.",
    "auth/invalid-credential": "Incorrect email or password.",
};

export const ErrorMessages = (code) =>
    messages[code] ?? "Something went wrong. Please try again.";