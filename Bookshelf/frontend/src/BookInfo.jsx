import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [error, setError] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/my-books/${id}`, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (response.ok) {
                    setBook(data);
                } else {
                    alert(data.message || "Virhe kirjatietojen haussa.");
                }
            } catch (error) {
                console.error("Virhe kirjatietojen haussa:", error);
                alert("Jotain meni väärin.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id, navigate]);

    const handleDeleteBook = async () => {
        setIsDeleting(true);
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`http://localhost:5000/api/my-books/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error("Virhe kirjan poistossa.");
            }

            const data = await response.json();
            alert(data.message || "Kirja poistettu onnistuneesti.");
            navigate("/"); 
        } catch (error) {
            console.error("Virhe kirjan poistossa:", error);
            setError("Kirjaa ei voitu poistaa. Yritä uudelleen.");
        } finally {
            setIsDeleting(false);
            setIsConfirmationOpen(false);
        }
    };

    if (loading) {
        return <p>Ladataan...</p>;
    }

    if (!book) {
        return <p>Kirjaa ei löytynyt.</p>;
    }

    return (
        <div>
            <button className="bf-home-btn" onClick={navigate.bind(null, "/")}>
                Takaisin
            </button>

            <div className="bf-topbuttons">
                <button className="bf-edit-btn" onClick={() => navigate(`/book/edit/${id}`)}>
                    Muokkaa
                </button>
                <button className="bf-delete-btn" onClick={() => setIsConfirmationOpen(true)}>
                    Poista
                </button>
            </div>

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
                                {isDeleting ? "Poistetaan..." : "OK"}
                            </button>
                            <button
                                className="bf-delete-modal-cancel-btn"
                                onClick={() => {
                                    setIsConfirmationOpen(false);
                                    setError("");
                                }}
                            >
                                Peruuta
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bf-book-creation-container">
                <div className="bf-icon-preview-box">
                    {book.icon_url ? (
                        <img
                            src={book.icon_url}
                            alt="Kirjan kuvake"
                            className="bf-icon-preview-image"
                        />
                    ) : (
                        <p className="bf-placeholder-text">Kuvasuhde 9:16</p>
                    )}
                </div>

                <div className="bf-form-content">
                    <div className="bf-date-fields-fixed">
                        <div className="bf-createbook-form-group">
                            <label className="bf-createbook-spotlabel">Hyllyynlisäämispäivämäärä</label>
                            <p className="bf-shelf-add-date">
                                {new Date(book.shelf_add_date).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="bf-createbook-form-group">
                            <label className="bf-createbook-spotlabel">Julkaisupäivämäärä</label>
                            <p className="bf-book-info-text">
                                {new Date(book.release_date).toLocaleDateString()}
                            </p>
                        </div>
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
