import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed (`npm install axios`)
import "./styles.css"; // Import the CSS file

const RegisterPage = () => {
    const navigate = useNavigate();

    // State to store input values
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(""); // State to store error message
    const [isLoading, setIsLoading] = useState(false); // For handling loading state

    // Handle input changes
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate password match
        if (password !== confirmPassword) {
            setError("Salasanat eivät täsmää!"); // Error message if passwords don't match
            return;
        }

        setError(""); // Clear error if passwords match
        setIsLoading(true); // Show loading state

        // Prepare data to send to backend
        const userData = {
            email: email,
            password: password,
        };

        try {
            // Send the POST request to the backend (replace with your actual backend URL)
            const response = await axios.post("http://localhost:5000/api/register", userData);
            console.log(response.data); // Handle success response from backend

            // On successful registration, navigate to login page
            navigate("/");
        } catch (error) {
            setError("Rekisteröinti epäonnistui. Yritä uudelleen."); // Error if registration fails
            console.error(error);
        } finally {
            setIsLoading(false); // Hide loading state
        }
    };

    // Back to login page
    const handleBackClick = () => {
        navigate("/");
    };

    return (
        <div className="container">
            {/* Back to Login button */}
            <button className="back-button" onClick={handleBackClick}>
                <img src="/images/arrow.png" alt="Back" className="back-icon" />
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
