/**
 * Register.jsx
 * tässä tiedostossa hoidetaan käyttäjän rekisteröinnin sivu ja sen toiminnallisuudet (eli käyttäjän luonti)
 * käyttäjän luonnin mahdollistamiseen on kutsuttava backendiä POST:illa että se voidaan luoda
 * on myös käyttäjän salasanojen validaatio (varmistaa että käyttäjä kirjoittaa sen oikein)
 * automaattinen ohjaus kirjautumissivulle onnistuneen rekisteröinnin jälkeen, ja ohjaus kotisivulle jos JWT tokeni on jo olemassa paikallisesti
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/styles.css";

const RegisterPage = () => {
    //tällä sit lähetetään noi käyttähän syötteet backendiin ja validoidaan muutenki
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); //käyttäjän salasanan vahvistus
    //tällä sit saadaan virheviesti näkyviin jos käyttäjä syöttää väärin jotain tai backendi ei hyväksy käyttäjää
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => { //tarkistetaan onko käyttäjä jo kirjautunut sisään
        const token = localStorage.getItem("token"); 
        if (token) { //jos käyttäjä on kirjautunut sisään, ohjataan se kotisivulle
            navigate("/home");
        } else {  //jos käyttäjä ei ole kirjautunut sisään, laitetaan loading tilaan falseksi että käyttäjä voi rekisteröityä
            setIsLoading(false);
        }
    }, [navigate]);

    const handleEmailChange = (e) => setEmail(e.target.value); //tällä saadaan käyttäjän syöttämä sähköposti talteen
    const handlePasswordChange = (e) => setPassword(e.target.value); //tällä saadaan käyttäjän syöttämä salasana talteen
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value); //tällä saadaan käyttäjän syöttämä salasana vahvistus talteen

    const handleSubmit = async (e) => { //tällä hoidetaan käyttäjän rekisteröinti backendiin
        e.preventDefault(); //estetään sivun uudelleenlataus

        if (password !== confirmPassword) { //tarkistetaan että käyttäjän syöttämä salasana ja vahvistus on sama
            setError("Salasanat eivät täsmää!");
            return;
        }
        setError("");  //tyhjennetään virheviesti ennen kuin lähetetään pyyntö backendiin
        setIsLoading(true); //laitetaan loading tilaan että käyttäjä ei voi painaa rekisteröi nappia uudestaan

        const userData = { //tällä luodaan käyttäjätiedot että saadaan ne lähetettyä backendiin
            email: email,
            password: password,
        };

        try {
            const response = await axios.post("http://localhost:5000/api/register", userData); //tällä lähetetään käyttäjätiedot backendiin
            navigate("/login"); //onnistuneen rekisteröinnin jälkeen ohjataan käyttäjä kirjautumissivulle
        } catch (error) { //tällä käsitellään mahdolliset virheet rekisteröinnissä
            setError("Rekisteröinti epäonnistui. Yritä uudelleen."); 
            if (error.response) { //tarkistetaan onko backendi antanut virheviestin
                setError(error.response.data.message);
            } else if (error.request) { //tarkistetaan onko backendiin yritetty ottaa yhteyttä
                setError("Ei vastausta palvelimelta. Tarkista verkkoyhteys.");
            } else { //tarkistetaan onko tapahtunut odottamaton virhe
                setError("Tapahtui odottamaton virhe.");
            }
        } finally {   //tällä varmistetaan että loading tila laitetaan falseksi vaikka rekisteröinti epäonnistuisikin
            setIsLoading(false);
        }
    };

    const handleBackClick = () => { //tällä hoidetaan takaisinnappi että käyttäjä voi palata kirjautumissivulle
        navigate("/login");
    };

    if (isLoading) { //jos loading tila on true, näytetään latausviesti
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
