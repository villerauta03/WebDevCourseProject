import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/UserSettings.css"; // Make sure this path is correct!

const UserSettings = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // Modal state
    const [password, setPassword] = useState(""); // Password input state for deletion
    const [error, setError] = useState(""); // Error message state
    const [isDeleting, setIsDeleting] = useState(false); // Deleting loading state

    // Password change states
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordChangeMessage, setPasswordChangeMessage] = useState("");
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    // Handle user logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
    };

    // Handle account deletion
    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:5000/api/delete-account", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ password }),
            });

            if (!response.ok) {
                throw new Error("Virhe on tapahtunut.");
            }

            const data = await response.json();

            if (data.message) {
                console.log(data.message);
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                navigate("/login");
            }

        } catch (error) {
            console.error("Error deleting account:", error);
            setError("Väärä salasana!");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setPasswordChangeMessage("Uudet salasanasi eivät täsmää.");
            return;
        }
    
        setIsChangingPassword(true);
        setPasswordChangeMessage("");
        const token = localStorage.getItem("token");
    
        try {
            const response = await fetch("http://localhost:5000/api/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    oldPassword,
                    newPassword,
                    confirmPassword,
                }),
            });
    
            const contentType = response.headers.get("content-type");
    
            let data = {};
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const text = await response.text();
                data.message = text; // fallback
            }
    
            if (!response.ok) {
                throw new Error(data.message || "Salasanan vaihto epäonnistui.");
            }
    
            setPasswordChangeMessage(data.message || "Salasana vaihdettu onnistuneesti.");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Error changing password:", error);
            setPasswordChangeMessage(error.message || "Salasanan vaihto epäonnistui.");
        } finally {
            setIsChangingPassword(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("username");
        if (!token) {
            navigate("/login");
            return;
        } else {
            setUserEmail(email);
            setLoading(false);
        }
    }, [navigate]);

    return (
        <div className="page-container">
            <div className="top">
                <h1>Käyttäjäasetukset</h1>
                <button className="backbutton" onClick={() => navigate("/")}>Takaisin</button>
            </div>

            <div className="graybox">
                {/* Left Side */}
                <div className="left-side">
                    <div className="email-section">
                        <label htmlFor="email">Sähköpostiosoite:</label>
                        <p id="email">{userEmail}</p>
                    </div>

                    <div className="password-change">
                        <h2>Salasana:</h2>
                        <div className="password-field">
                            <input
                                type="password"
                                id="old-password"
                                name="old-password"
                                placeholder="Vanha salasana..."
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <br />
                        <div className="password-field">
                            <input
                                type="password"
                                id="new-password"
                                name="new-password"
                                placeholder="Uusi salasana..."
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div className="password-field">
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirm-password"
                                placeholder="Vahvista salasana uudestaan..."
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {/* Always render the error message area */}
                        <p className="password-change-message">{passwordChangeMessage}</p>

                        <button
                            className="OK"
                            onClick={handleChangePassword}
                            disabled={isChangingPassword}
                        >
                            {isChangingPassword ? "Odota..." : "OK"}
                        </button>
                    </div>

                </div>

                {/* Right Side */}
                <div className="right-side">
                    <button className="logout-button" onClick={handleLogout}>Kirjaudu ulos</button>
                    <button className="delete-button" onClick={() => setIsConfirmationOpen(true)}>Poista tili</button>
                </div>
            </div>

            {/* Modal for Account Deletion Confirmation */}
            {isConfirmationOpen && (
                <div className="confirmation-modal">
                    <div className="modal-content">
                        <h2>Oletko varma?<br />Vahvista salasanasi.</h2>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Salasana..."
                        />
                        {error && <p className="error-message">{error}</p>}
                        <div className="modal-actions">
                            <button className="OK" onClick={handleDeleteAccount} disabled={isDeleting}>
                                {isDeleting ? "Poistetaan..." : "OK"}
                            </button>
                            <button className="backbutton" onClick={() => setIsConfirmationOpen(false)}>Peruuta</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserSettings;
