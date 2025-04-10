import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/UserSettings.css"; // make sure this path is correct!

const UserSettings = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        } else {
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
                {/* Settings page stuff */}
                <div className="email-section">
                    <label htmlFor="email">Sähköpostiosoite:</label>
                    <p id="email">SampleEmail@gmail.com{/* Display user's email here */}</p>
                </div>

                <div className="password-change">
                    <h2>Salasana:</h2>
                    <div className="password-field">
                        <input
                            type="password"
                            id="old-password"
                            name="old-password"
                            placeholder="Vanha salasana..."
                        />
                    </div>
                    <br></br>
                    <div className="password-field">
                        <input
                            type="password"
                            id="new-password"
                            name="new-password"
                            placeholder="Uusi salasana..."
                        />
                    </div>

                    <div className="password-field">
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            placeholder="Vahvista salasana uudestaan..."
                        />
                    </div>
                    <br></br>
                    <button className="OK">OK</button>
                </div>
            </div>
        </div>
    );
};

export default UserSettings;
