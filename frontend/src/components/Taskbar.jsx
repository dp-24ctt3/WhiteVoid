import { useState } from "react";
import { logOut } from "../services/auth";

const todayStr = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
const yearStr = new Date().getFullYear();

export default function Taskbar({ centerContent, onCenter, user }) {
    const [powerOpen, setPowerOpen] = useState(false);

    const initial = user?.displayName?.[0] || user?.email?.[0]?.toUpperCase() || "?";

    const handleLogout = async () => {
        await logOut();
    };

    return (
        <div className="taskbar">
            <div className="tb-date">
                {todayStr}<br />{yearStr}
            </div>

            <button
                className={`tb-btn${centerContent === "welcome" ? " active" : ""}`}
                title="Welcome"
                onClick={() => { onCenter("welcome"); setPowerOpen(false); }}
            >○</button>

            <button
                className={`tb-btn${centerContent === "manual" ? " active" : ""}`}
                title="Manual"
                onClick={() => { onCenter("manual"); setPowerOpen(false); }}
            >?</button>

            <div className="tb-spacer" />

            <div className="power-wrap">
                <button
                    className={`tb-btn${powerOpen ? " active" : ""}`}
                    title="Account"
                    onClick={() => setPowerOpen(o => !o)}
                >⏻</button>

                {powerOpen && (
                    <div className="power-menu">
                        <div className="pm-name">{user?.displayName ? `Formally known as ${user?.displayName}` : `Name..? Right. You don't have one.`}</div>

                        <div className="pm-user">
                            <div className="pm-avatar">{initial ?? "?"}</div>
                            <div className="pm-email">{user?.email}</div>
                        </div>
                        <button className="pm-logout" onClick={handleLogout}>
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
