import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/BookForm.css";

const genresList = [
    "Fantasia",
    "Tieteiskirjallisuus",
    "Mysteerit",
    "Romantiikka",
    "Kauhu",
    "Tietokirjallisuus",
    "Historiallinen",
    "Jännitys",
    "Elämäkerrat",
    "Seikkailu",
];

const BookEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [iconURL, setIconURL] = useState("");
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState("");
    const [description, setDescription] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [shelfAddDate, setShelfAddDate] = useState("");
    const [previewURL, setPreviewURL] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    const formatDateToDDMMYYYY = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/my-books/${id}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();

                if (response.ok) {
                    setIconURL(data.icon_url);
                    setTitle(data.title);
                    setAuthors(data.authors);
                    setDescription(data.description);
                    setReleaseDate(data.release_date.split("T")[0]);
                    setShelfAddDate(formatDateToDDMMYYYY(data.shelf_add_date));
                    setPreviewURL(data.icon_url);
                    setSelectedGenres(data.genres ? data.genres.split(",") : []);
                } else {
                    alert(data.message || "Virhe kirjatietojen haussa.");
                }
            } catch (error) {
                alert("Jotain meni väärin.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id, navigate]);

    const handleLoadIcon = () => {
        setPreviewURL(iconURL);
    };

    const handleSaveChanges = async () => {
        const updatedBook = {
            title,
            authors,
            description,
            icon_url: previewURL,
            release_date: releaseDate,
            shelf_add_date: shelfAddDate,
            genres: selectedGenres.join(","),
        };

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:5000/api/my-books/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedBook),
            });

            const data = await response.json();
            if (response.ok) {
                navigate("/home");
            } else {
                alert(data.message || "Kirjan päivitys epäonnistui.");
            }
        } catch (error) {
            alert("Jotain meni väärin.");
        }
    };

    const handleGenreChange = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    const goHome = () => {
        navigate(`/book/${id}`);
    };

    if (loading) {
        return <p>Ladataan...</p>;
    }

    return (
        <div>
            <div className="bf-book-creation-container">
                <div className="bf-icon-preview-box">
                    {previewURL ? (
                        <img
                            src={previewURL}
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
                            <p className="bf-shelf-add-date">{shelfAddDate}</p>
                        </div>
                        <div className="bf-createbook-form-group">
                            <label className="bf-createbook-spotlabel">Julkaisupäivämäärä</label>
                            <input
                                type="date"
                                className="bf-input"
                                value={releaseDate}
                                onChange={(e) => setReleaseDate(e.target.value)}
                            />
                        </div>
                        <div className="bf-createbook-form-group">
                            <label className="bf-createbook-spotlabel">Genret</label>
                            {genresList.map((genre) => (
                                <div key={genre} className="genre-checkbox">
                                    <input
                                        type="checkbox"
                                        id={`genre-${genre}`}
                                        value={genre}
                                        checked={selectedGenres.includes(genre)}
                                        onChange={() => handleGenreChange(genre)}
                                    />
                                    <label htmlFor={`genre-${genre}`}>{genre}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bf-createbook-form-group">
                        <label className="bf-createbook-spotlabel">Kirjan nimi</label>
                        <input
                            type="text"
                            className="bf-input"
                            placeholder="Kirjan nimi"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="bf-createbook-form-group">
                        <label className="bf-createbook-spotlabel">Kirjailija(t)</label>
                        <input
                            type="text"
                            className="bf-input"
                            placeholder="Kirjailija(t)"
                            value={authors}
                            onChange={(e) => setAuthors(e.target.value)}
                        />
                    </div>
                    <div className="bf-createbook-form-group">
                        <label className="bf-createbook-spotlabel">Kuvakkeen URL</label>
                        <div className="bf-input-button-group">
                            <input
                                type="text"
                                className="bf-input"
                                placeholder="Kuvakkeen URL"
                                value={iconURL}
                                onChange={(e) => setIconURL(e.target.value)}
                            />
                            <button className="bf-load-btn" onClick={handleLoadIcon}>
                                Lataa
                            </button>
                        </div>
                    </div>
                    <div className="bf-createbook-form-group">
                        <label className="bf-createbook-spotlabel_textarea">Kuvaus</label>
                        <textarea
                            className="bf-textarea"
                            placeholder="Kirjan kuvaus"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="bf-bottombuttons">
                <button className="bf-submit-btn" onClick={handleSaveChanges}>
                    Lähetä
                </button>
                <button className="bf-cancel-btn" onClick={goHome}>
                    Peruuta
                </button>
            </div>
        </div>
    );
};

export default BookEdit;
