import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed (`npm install axios`)
import "./styles/styles.css"; // Import the CSS file

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Redirect if user is already logged in
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
            console.log(response.data);
            navigate("/login");
        } catch (error) {
            setError("Rekisteröinti epäonnistui. Yritä uudelleen.");
            console.error(error);
            if (error.response) {
                setError(error.response.data.message);
            } else if (error.request) {
                setError("No response from server. Please check your connection.");
            } else {
                setError("An unexpected error occurred.");
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
            {/* Back to Login button */}
            <button className="back-button" onClick={handleBackClick}>
                <img src="arrow.png" alt="Back" className="back-icon" />
            </button>

            <div className="container">
                <div className="login-box">
                    <h2 className="title">Rekisteröidy</h2>

                    {/* Email input */}
                    <input
                        type="email"
                        placeholder="Sähköpostiosoite..."
                        className="input"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <br />

                    {/* Password input */}
                    <input
                        type="password"
                        placeholder="Salasana..."
                        className="input"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <br />

                    {/* Confirm password input */}
                    <input
                        type="password"
                        placeholder="Vahvista salasana..."
                        className="input"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    <br />

                    {/* Error message */}
                    {error && <div className="error-message">{error}</div>}

                    <br/>
                    {/* Submit button */}
                    <button className="login-button" onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? "Rekisteröidään..." : "Rekisteröi"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
