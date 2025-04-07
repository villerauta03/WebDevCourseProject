import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();  // For redirecting to login
    const [message, setMessage] = useState(""); // We'll eventually display user data here
    const [userEmail, setUserEmail] = useState(""); // For storing the user's email

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove the token
        localStorage.removeItem("username");
        navigate("/login"); // Redirect to login
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("username");

        if (!token) {
            navigate("/login");
            return;
        } else {
            setUserEmail(email);
        }
    }, [navigate]);

    return (
        <div>
            <h1>Hello, {userEmail ? userEmail : "User"}! </h1>
            <button onClick={handleLogout}>Log out</button>
        </div>
    );
};

export default HomePage;
