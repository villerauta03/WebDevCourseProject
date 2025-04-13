/**
 * BookInfo.jsx
 * Tää tiedosto hallitsee kirjojen tietojen tarkemman tarkastelun sivustot. Jokaselle sivustolle perustuen ID:seen oma sivusto jossa niiden tiedot näkyy.
 * Kutsutaan backendillä kirjojen hakua ja niiden poistamista "Poista" napin avulla. 
 * tässä kans käytetty samaa tyylii kun bookform ja bookinfo
 * 
 * huomioi että tässä tiedostossa on käytetty apuna tekoälyä kommentien tekoon (tosiaan kommentit melkeen täysin muokattu tekoälyllä tässä tiedostossa)
 * (en jaksanu ite alkaa kirjottaan kunnolla)
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./styles/BookForm.css";

const BookInfo = () => {
    const { id } = useParams(); // Haetaan kirjan id URL-parametreista
    const navigate = useNavigate(); // Navigointi eri sivuille
    const [book, setBook] = useState(null); // Kirjan tiedot tallennetaan tänne
    const [loading, setLoading] = useState(true); // Lataustila, näytetään "Ladataan..." kun kirjatietoja haetaan

    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // Kirjan poiston vahvistusmodalin tila
    const [error, setError] = useState(""); // Mahdolliset virheviestit kirjapoistossa
    const [isDeleting, setIsDeleting] = useState(false); // Tila, seurataan onko kirjan poisto käynnissä

    useEffect(() => {
        // Tarkistetaan käyttäjän kirjautuminen JWT tokenilla
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login"); // Siirretään takaisin login-sivulle, jos ei kirjautumista
            return;
        }

        // Haetaan kirjan tiedot backendistä
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/my-books/${id}`, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` }, // Authorization-tunnistus
                });
                const data = await response.json(); // Parsitaan JSON-vastaus
                if (response.ok) {
                    setBook(data); // Tallennetaan kirjan tiedot
                } else {
                    alert(data.message || "Virhe kirjatietojen haussa."); // Näytetään virheviesti, jos vastaus ei onnistu
                }
            } catch (error) {
                console.error("Virhe kirjatietojen haussa:", error);
                alert("Jotain meni väärin."); // Geneerinen virheviesti jos haussa tapahtuu virhe
            } finally {
                setLoading(false); // Lataus valmis
            }
        };

        fetchBookDetails(); // Suoritetaan funktio
    }, [id, navigate]); // Suoritetaan uudelleen, jos id tai navigate muuttuvat

    const handleDeleteBook = async () => {
        setIsDeleting(true); // Poiston käynnistäminen
        const token = localStorage.getItem("token");

        try {
            // Lähetetään DELETE-pyyntö kirjan poistamiseksi backendistä
            const response = await fetch(`http://localhost:5000/api/my-books/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }, // Authorization
            });

            if (!response.ok) {
                throw new Error("Virhe kirjan poistossa."); // Heitetään virhe, jos vastaus ei onnistu
            }

            const data = await response.json(); // Parsitaan JSON-vastaus
            navigate("/"); // Siirretään takaisin kotisivulle, kun kirja poistettu
        } catch (error) {
            console.error("Virhe kirjan poistossa:", error);
            setError("Kirjaa ei voitu poistaa. Yritä uudelleen."); // Näytetään virheviesti
        } finally {
            setIsDeleting(false); // Poisto valmis
            setIsConfirmationOpen(false); // Suljetaan vahvistusmodal
        }
    };

    if (loading) {
        return <p>Ladataan...</p>; // Näytetään lataustila, kun kirjatietoja haetaan
    }

    if (!book) {
        return <p>Kirjaa ei löytynyt.</p>; // Näytetään viesti, jos kirjatietoja ei löydy
    }

    return (
        <div>
            {/* Yläpainikkeet: Takaisin, Muokkaa, Poista */}
            <div className="bf-topbuttons">
                <button className="bf-home-btn" onClick={navigate.bind(null, "/")}>
                    Takaisin
                </button>
                <button className="bf-edit-btn" onClick={() => navigate(`/book/edit/${id}`)}>
                    Muokkaa
                </button>
                <button className="bf-delete-btn" onClick={() => setIsConfirmationOpen(true)}>
                    Poista
                </button>
            </div>

            {/* Poiston vahvistusmodal */}
            {isConfirmationOpen && (
                <div className="bf-delete-confirmation-modal">
                    <div className="bf-delete-modal-content">
                        <h2>Haluatko varmasti poistaa tämän kirjan?</h2>
                        {error && <p className="bf-delete-error-message">{error}</p>}
                        <div className="bf-delete-modal-actions">
                            <button
                                className="bf-delete-modal-confirm-btn"
                                onClick={handleDeleteBook}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Poistetaan..." : "OK"} {/* Tila: poisto käynnissä */}
                            </button>
                            <button
                                className="bf-delete-modal-cancel-btn"
                                onClick={() => {
                                    setIsConfirmationOpen(false);
                                    setError(""); // Poistetaan virheviesti
                                }}
                            >
                                Peruuta
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Kirjan tiedot näytettävänä */}
            <div className="bf-book-creation-container">
                <div className="bf-icon-preview-box">
                    {book.icon_url ? (
                        <img
                            src={book.icon_url}
                            alt="Kirjan kuvake"
                            className="bf-icon-preview-image"
                        />
                    ) : (
                        <p className="bf-placeholder-text">Kuvasuhde 9:16</p> // Paikkateksti, jos kuvaketta ei ole
                    )}
                </div>

                {/* Lomake sisältyy kirjan kaikkiin tietoihin */}
                <div className="bf-form-content">
                    <div className="bf-date-fields-fixed">
                        <div className="bf-createbook-form-group">
                            <label className="bf-createbook-spotlabel">Hyllyynlisäämispäivämäärä</label>
                            <p className="bf-shelf-add-date">
                                {new Date(book.shelf_add_date).toLocaleDateString()} {/* Päivämäärä muotoiltu */}
                            </p>
                        </div>
                        <div className="bf-createbook-form-group">
                            <label className="bf-createbook-spotlabel">Julkaisupäivämäärä</label>
                            <p className="bf-book-info-text">
                                {new Date(book.release_date).toLocaleDateString()} {/* Julkaisupäivämäärä */}
                            </p>
                        </div>

                        {/* Genrejen lista tai paikkateksti */}
                        <div className="bf-createbook-form-group">
                            <label className="bf-createbook-spotlabel">Genret</label>
                            {book.genres ? (
                                <ul className="bf-genres-list">
                                    {book.genres.split(",").map((genre) => (
                                        <li key={genre} className="bf-genre-item">{genre}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="bf-placeholder-text">Ei valittuja genrejä.</p>
                            )}
                        </div>
                    </div>

                    {/* Kirjan tiedot näkyvillä */}
                    <div className="bf-createbook-form-group">
                        <label className="bf-createbook-spotlabel">Kirjan nimi</label>
                        <p className="bf-book-info-text">{book.title}</p>
                    </div>
                    <div className="bf-createbook-form-group">
                        <label className="bf-createbook-spotlabel">Kirjailija(t)</label>
                        <p className="bf-book-info-text">{book.authors}</p>
                    </div>
                    <div className="bf-createbook-form-group">
                        <label className="bf-createbook-spotlabel">Kuvakkeen URL</label>
                        <p className="bf-book-info-text">{book.icon_url}</p>
                    </div>
                    <div className="bf-createbook-form-group">
                        <label className="bf-createbook-spotlabel_textarea">Kuvaus</label>
                        <p className="bf-book-description-text">{book.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookInfo;
