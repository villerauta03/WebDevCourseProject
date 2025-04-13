/**
 * UserSettings.jsx
 * tässä tiedostossa hoidetaan käyttäjäasetukset
 * näihin toiminnallisuuksiin siis kuuluu käyttäjän salasanan vaihto sekä käyttäjätilin poisto
 * käyttäjätilin poiston yhteydessä käyttäjän kuuluu vahvistaa salasana ennen kuin tili poistetaan
 * salasanan vaihdon yhteydessä on myös varmistettava vanha salasana ennen kuin uusi salasana voidaan vaihtaa
 * uuden salasanan vahvistus on myös paikoillaan eikä sitä saa vaihdettua ennen kuin salasanat molemmissa "uusi salasana" kentissä täsmää
 * (huom! tässä tilanteessa käyttäjä voi vielä vaihtaa salasanan samaksi kuin mikä se nyt on. Jatkokehityksen aihetta.)
 * (Jatkokehityksessä vois myös pitää muistissa 1 viime salasanan ettei käyttäjä saisi vaihtaa sitä niinkun siihen tämänhetkiseen tai edelliseen salasanaan.)
 * käyttäjä voi myös kirjautua ulos tällä sivulla samoin kuin home.jsx
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/UserSettings.css";

const UserSettings = () => {
    const navigate = useNavigate(); // käytetään navigointiin
    const [userEmail, setUserEmail] = useState("");  // käyttäjän sähköpostiosoite
    const [loading, setLoading] = useState(true);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // vahvistusikkuna käyttäjätilin poistolle
    const [password, setPassword] = useState(""); // käyttäjän syöttämä salasana tilin poistoa varten
    const [error, setError] = useState(""); // virheviesti käyttäjälle
    const [isDeleting, setIsDeleting] = useState(false); // käyttäjätilin poisto

    // Salasanan vaihto
    // käyttäjä syöttää vanhan salasanan, uuden salasanan ja vahvistaa sen
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // vahvistus uusi salasana
    const [passwordChangeMessage, setPasswordChangeMessage] = useState(""); // viesti käyttäjälle salasanan vaihdosta
    const [isChangingPassword, setIsChangingPassword] = useState(false); 
 
    
    const handleLogout = () => { //poistetaan käyttäjän token ja username localStoragesta ja navigoidaan kirjautumissivulle
        localStorage.removeItem("token"); 
        localStorage.removeItem("username");
        navigate("/login");
    };

    const handleDeleteAccount = async () => { // käyttäjätilin poisto
        setIsDeleting(true);
        const token = localStorage.getItem("token");

        try { 
            const response = await fetch("http://localhost:5000/api/delete-account", { // kutsutaan poistofunktiota backendissä
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // huomaa authorization
                },
                body: JSON.stringify({ password }), // käyttäjän syöttämä salasana
            });

            if (!response.ok) { // tarkistetaan onko vastaus ok
                throw new Error("Virhe on tapahtunut."); // virheviesti käyttäjälle
            }

            const data = await response.json(); // odotetaan vastausta backendistä
 
            if (data.message) { // jos viesti on
                localStorage.removeItem("token"); // poistetaan token localStoragesta
                localStorage.removeItem("username"); // poistetaan käyttäjänimi localStoragesta
                navigate("/login");
            }

        } catch (error) { // jos virhe tapahtuu
            setError("Väärä salasana!"); 
        } finally { // lopuksi asetetaan isDeleting falseksi
            setIsDeleting(false);
        }
    };

    const handleChangePassword = async () => { // salasanan vaihto
        if (newPassword !== confirmPassword) { // tarkistetaan että uudet salasanat täsmää
            setPasswordChangeMessage("Uudet salasanasi eivät täsmää.");
            return;
        }
    
        setIsChangingPassword(true); // asetetaan isChangingPassword trueksi
        setPasswordChangeMessage(""); // tyhjennetään viesti
        const token = localStorage.getItem("token"); // otetaan token localStoragesta

        try { // kutsutaan salasanan vaihto funktiota backendissä
            const response = await fetch("http://localhost:5000/api/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // huomaa authorization
                },
                body: JSON.stringify({ // lähetetään vanha salasana, uusi salasana ja vahvistus uusi salasana
                    oldPassword,
                    newPassword,
                    confirmPassword,
                }),
            });
    
            const contentType = response.headers.get("content-type"); // tarkistetaan content-type
    
            let data = {}; // alustetaan data muuttuja
            if (contentType && contentType.includes("application/json")) { // jos content-type on json
                data = await response.json();   // odotetaan json vastausta
            } else { // muuten odotetaan teksti vastausta
                const text = await response.text();
                data.message = text;
            }
    
            if (!response.ok) { // tarkistetaan onko vastaus ok
                throw new Error(data.message || "Salasanan vaihto epäonnistui.");
            }
    
            setPasswordChangeMessage(data.message || "Salasana vaihdettu onnistuneesti."); 
            setOldPassword(""); // tyhjennetään kentät
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            setPasswordChangeMessage(error.message || "Salasanan vaihto epäonnistui.");
        } finally {
            setIsChangingPassword(false);
        }
    };

    useEffect(() => { // tarkistetaan onko käyttäjä kirjautunut sisään
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("username");
        if (!token) { // jos token ei ole olemassa
            navigate("/login"); // navigoidaan kirjautumissivulle
            return;
        } else { // jos token on olemassa
            setUserEmail(email); // asetetaan käyttäjän sähköpostiosoite
            setLoading(false); // asetetaan loading falseksi
        }
    }, [navigate]);

    return (
        <div className="page-container">
            <div className="top">
                <h1>Käyttäjäasetukset</h1>
                <button className="backbutton" onClick={() => navigate("/")}>Takaisin</button>
            </div>

            <div className="graybox">
                <div className="left-side">
                    <div className="email-section">
                        <label htmlFor="email">Sähköpostiosoite:</label>
                        <p id="email">{userEmail}</p>
                    </div>

                    <div className="password-change">
                        <h2>Salasana:</h2>
                        <div className="password-field">
                            <input
                                type="password"
                                id="old-password"
                                name="old-password"
                                placeholder="Vanha salasana..."
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <br />
                        <div className="password-field">
                            <input
                                type="password"
                                id="new-password"
                                name="new-password"
                                placeholder="Uusi salasana..."
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div className="password-field">
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirm-password"
                                placeholder="Vahvista salasana uudestaan..."
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <p className="password-change-message">{passwordChangeMessage}</p>

                        <button
                            className="OK"
                            onClick={handleChangePassword}
                            disabled={isChangingPassword}
                        >
                            {isChangingPassword ? "Odota..." : "OK"}
                        </button>
                    </div>
                </div>

                <div className="right-side">
                    <button className="logout-button" onClick={handleLogout}>Kirjaudu ulos</button>
                    <button className="delete-button" onClick={() => setIsConfirmationOpen(true)}>Poista tili</button>
                </div>
            </div>

            {isConfirmationOpen && (
                <div className="confirmation-modal">
                    <div className="modal-content">
                        <h2>Oletko varma?<br />Vahvista salasanasi.</h2>
                        {error && <p className="error-message">{error}</p>}
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Salasana..."
                        />
                        <div className="modal-actions">
                            <button className="OK" 
                            onClick={ () => {
                                handleDeleteAccount();
                                setPassword("");
                            } }
                            disabled={isDeleting}
                            >
                                OK
                            </button>
                            <button className="backbutton" 
                            onClick={() => {
                                setIsConfirmationOpen(false);
                                setPassword("");
                                setError("");
                            } }
                            >
                                Peruuta</button>
                        </div>  
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserSettings;
