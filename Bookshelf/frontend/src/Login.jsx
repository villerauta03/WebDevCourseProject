import React from "react";
import "./styles.css"; // Import the CSS file
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const LoginPage = () => {
  return (
    <div className="container">
      <div className="login-box">
        <h2 className="title">Sisäänkirjautuminen</h2>
        <input type="email" placeholder="Sähköpostiosoite..." className="input" />
        <br />
        <input type="password" placeholder="Salasana..." className="input" />
        <br/>
        <Link to="/register">
            <a  className="register-link">Rekisteröidy</a><br></br>
        </Link>
        <button className="login-button">Kirjaudu</button>
      </div>
    </div>
  );
};

export default LoginPage;
