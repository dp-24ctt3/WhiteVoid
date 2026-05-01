import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp, signInWithGoogle } from "../services/auth.js";
import { ErrorMessages } from "../utils/authErrors.js";

const GoogleIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

const BASE_URL = "http://localhost:8000";

export default function Login() {
    const navigate = useNavigate();
    const [mode, setMode] = useState("in"); // "in" | "up"

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const [fieldErrors, setFieldErrors] = useState({});
    const [globalError, setGlobalError] = useState("");
    const [loading, setLoading] = useState(false);

    const [tagline, setTagline] = useState("");
    useEffect(() => {
        fetch(BASE_URL + "/")
            .then(r => r.json())
            .then(data => setTagline(data.message))
            .catch(() => { });
    }, []);

    const clearErrors = () => { setFieldErrors({}); setGlobalError(""); };

    const setMode_ = (m) => { setMode(m); clearErrors(); setConfirm(""); };

    const validate = () => {
        const errs = {};
        if (!email) errs.email = "Email cannot be empty.";
        else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email address.";
        if (!password) errs.password = "Password cannot be empty.";
        else if (mode === "up" && password.length < 6) errs.password = "Password must be at least 6 characters.";
        if (mode === "up" && password && confirm !== password) errs.confirm = "Passwords do not match.";
        return errs;
    };

    const handleSubmit = async () => {
        clearErrors();
        const errs = validate();
        if (Object.keys(errs).length) { setFieldErrors(errs); return; }

        setLoading(true);
        try {
            if (mode === "in") {
                await signIn(email, password);
            } else {
                await signUp(email, password);
            }
            navigate("/dashboard");
        } catch (err) {
            setGlobalError(ErrorMessages(err.code));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        clearErrors();
        setLoading(true);
        try {
            await signInWithGoogle();
            navigate("/dashboard");
        } catch (err) {
            setGlobalError(ErrorMessages(err.code));
        } finally {
            setLoading(false);
        }
    };

    const handleKey = (e) => { if (e.key === "Enter") handleSubmit(); };

    return (
        <div className="login-screen">
            <div className="brand">WhiteVoid,</div>
            <div className="subtitle">{tagline ?? (mode === "in" ? "Sign in" : "Register")}</div>

            <div className="form-area">
                <div className="global-err">{globalError}</div>

                <input
                    className={`login-input${fieldErrors.email ? " err" : ""}`}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={handleKey}
                    disabled={loading}
                />
                {fieldErrors.email && <div className="field-err show">{fieldErrors.email}</div>}

                <input
                    className={`login-input${fieldErrors.password ? " err" : ""}`}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={handleKey}
                    disabled={loading}
                />
                {fieldErrors.password && <div className="field-err show">{fieldErrors.password}</div>}

                {mode === "up" && (
                    <>
                        <input
                            className={`login-input${fieldErrors.confirm ? " err" : ""}`}
                            type="password"
                            placeholder="Confirm password"
                            value={confirm}
                            onChange={e => setConfirm(e.target.value)}
                            onKeyDown={handleKey}
                            disabled={loading}
                        />
                        {fieldErrors.confirm && <div className="field-err show">{fieldErrors.confirm}</div>}
                    </>
                )}

                <div className="row-actions">
                    <div />
                    <button className="toggle-link" onClick={() => setMode_(mode === "in" ? "up" : "in")}>
                        {mode === "in" ? "New here?" : "Already have an account?"}
                    </button>
                </div>

                <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                    {loading ? "…" : mode === "in" ? "Sign In" : "Create Account"}
                </button>

                <div className="divider">
                    <div className="div-line" />
                    <div className="div-text">or</div>
                    <div className="div-line" />
                </div>

                <button className="google-btn" onClick={handleGoogle} disabled={loading}>
                    <GoogleIcon />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}
