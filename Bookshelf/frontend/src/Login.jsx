import React, { useState, useEffect } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }); 
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.email);
        setMessage("Login successful.");
        navigate("/home");
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return null;
  }

  return (
    <div className="container">
      <div className="login-box">
        <h2 className="title">Sisäänkirjautuminen</h2>
        <input 
        type="email" 
        placeholder="Sähköpostiosoite..." 
        className="input" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input 
        type="password" 
        placeholder="Salasana..." 
        className="input" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <Link to="/register" className="register-link">Rekisteröidy</Link>
        <br></br>
        <button className="login-button" onClick={handleLogin}>Kirjaudu</button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LoginPage;
