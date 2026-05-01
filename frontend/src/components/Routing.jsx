import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function ProtectedRoute({ children }) {
    const { user } = useAuth();

    if (user === undefined) return <p className="loading-screen">Loading...</p>;
    if (user === null) return <Navigate to="/login" replace />;

    return children;
}

export function PublicRoute({ children }) {
    const { user } = useAuth();
    if (user === undefined) return null; // still loading
    if (user) return <Navigate to="/dashboard" replace />;
    return children;
}