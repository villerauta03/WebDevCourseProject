import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // Import the CSS file

const RegisterPage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    }

  return (
    <div className="container">
    {/* Back to Login button */}
    <button className="back-button" onClick={handleClick}>
      <img
        src="/images/arrow.png"
        alt="Back"
        className="back-icon"
      />
    </button>

    <div className="container">
      <div className="login-box">
        <h2 className="title">Rekisteröidy</h2>
        <input type="email" placeholder="Sähköpostiosoite..." className="input" />
        <br />
        <input type="password" placeholder="Salasana..." className="input" />
        <br/>
        <input type="password" placeholder="Vahvista salasana..." className="input" />
        <br></br><br></br>
        <button className="login-button">Rekisteröi</button>
      </div>
    </div>
    </div>
  );
};

export default RegisterPage;
