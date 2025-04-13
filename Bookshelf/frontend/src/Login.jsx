/**
 * Login.jsx
 * tää hoitaa käyttäjän sisäänkirjautumisen. Tänne ei siis pääse jos on jo kirjautunut sisään, se lähettää suoraan kotisivulle jos JWT tokeni löytyy
 * lähetetään käyttäjän lisäämä sähköposti ja salasana tarkistukseen backendille, jossa sisäänkirjautuminen hoidetaan
 */

import React, { useState, useEffect } from "react";
import "./styles/styles.css";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  //käyttäjän lisäämät sähköposti ja salasana
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); //ilmoitus käyttäjälle sisäänkirjautumisesta (jos siis joku virhe niin se näkyy tän avulla)
  const [loading, setLoading] = useState(true); //ladataan sivu ensin
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); //kahtoo onks JWT tokeni olemassa jo
    if (token) { //lähettää kotisivulle jos se on
      navigate("/home");
    } else { //muuten vaan lataa sivun
      setLoading(false);
    }
  }, [navigate]); //kutsu kun navigaatio muuttuu

// -- sisäänkirjautuminen hoidetaan täällä --
  const handleLogin = async () => { //huomaa async
    try { //try catch virheiden varalta
      const response = await fetch("http://localhost:5000/api/login", { //tää lähetetään backendille tän apin mukaan
        //huomaa varmistaa backendistä että toi osote on oikein
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), //tällä lähetetään jsonilla tonne 
      }); 
      const data = await response.json(); //kahto se vastaus sieltä backendiltä
      if (data.token) { //jos tokeni löytyy niin se on onnistunut
        localStorage.setItem("token", data.token); //asetetaan sit datasta saadut tiedot käyttäjälle paikallisesti
        localStorage.setItem("username", data.user.email);
        setMessage("Sisäänkirjautuminen onnistui."); //käyttäjä ei välttämättä nää tätä kun tuo vie sen suoraan kotisivulle heti
        navigate("/home");
      } else {
        setMessage(data.message || "Sisäänkirjautuminen epäonnistui."); //tää näkyis tuos jos siinä datassa on tapahtunu joku hässäkkä
      }
    } catch (error) { //geneerinen virheviesti. tapahtuu jos esim. unohtuu pistää päälle server.js kehityksen aikana
      setMessage("On tapahtunut virhe. Yritä uudelleen.");
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
