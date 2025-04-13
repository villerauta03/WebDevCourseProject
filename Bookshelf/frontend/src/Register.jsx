import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/styles.css";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/home");
        } else {
            setIsLoading(false);
        }
    }, [navigate]);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Salasanat eivät täsmää!");
            return;
        }
        setError("");
        setIsLoading(true);

        const userData = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post("http://localhost:5000/api/register", userData);
            navigate("/login");
        } catch (error) {
            setError("Rekisteröinti epäonnistui. Yritä uudelleen.");
            if (error.response) {
                setError(error.response.data.message);
            } else if (error.request) {
                setError("Ei vastausta palvelimelta. Tarkista verkkoyhteys.");
            } else {
                setError("Tapahtui odottamaton virhe.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackClick = () => {
        navigate("/login");
    };

    if (isLoading) {
        return null;
    }

    return (
        <div className="container">
            <button className="back-button" onClick={handleBackClick}>
                <img src="arrow.png" alt="Takaisin" className="back-icon" />
            </button>

            <div className="container">
                <div className="login-box">
                    <h2 className="title">Rekisteröidy</h2>
                    <input
                        type="email"
                        placeholder="Sähköpostiosoite..."
                        className="input"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Salasana..."
                        className="input"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Vahvista salasana..."
                        className="input"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    <br />
                    {error && <div className="error-message">{error}</div>}
                    <br />
                    <button className="login-button" onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? "Rekisteröidään..." : "Rekisteröi"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
