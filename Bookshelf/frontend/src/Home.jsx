import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookItem from "./BookItem";
import "./styles/Home.css";

const HomePage = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [selectedGenre, setSelectedGenre] = useState(""); // State for filtering books by genre

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
        "Seikkailu"
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
    };

    const goSettings = () => {
        navigate("/settings");
    };

    const goBookForm = () => {
        navigate("/new-book");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userEmail = localStorage.getItem("username");

        if (!token) {
            navigate("/login");
            return;
        } else {
            setUserEmail(userEmail);
        }

        setLoading(true);

        const fetchBooks = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/my-books", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setBooks(data);
                } else {
                    alert(data.message || "Jotain meni vikaan.");
                }
            } catch (error) {
                alert("Jotain meni vikaan.");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [navigate]);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
    };

    const handleSort = (e) => {
        setSortOption(e.target.value);
    };

    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value);
    };

    const filteredBooks = books
        .filter((book) => {
            const matchesQuery = book.title.toLowerCase().includes(searchQuery) ||
                book.authors.toLowerCase().includes(searchQuery);

            const matchesGenre = selectedGenre === "" ||
                (book.genres && book.genres.toLowerCase().includes(selectedGenre.toLowerCase()));

            return matchesQuery && matchesGenre;
        })
        .sort((a, b) => {
            switch (sortOption) {
                case "name-asc":
                    return a.title.localeCompare(b.title);
                case "name-desc":
                    return b.title.localeCompare(a.title);
                case "author-asc":
                    return a.authors.localeCompare(b.authors);
                case "author-desc":
                    return b.authors.localeCompare(a.authors);
                case "release-date-asc":
                    return new Date(a.release_date) - new Date(b.release_date);
                case "release-date-desc":
                    return new Date(b.release_date) - new Date(a.release_date);
                case "shelf-date-asc":
                    return new Date(a.shelf_add_date) - new Date(b.shelf_add_date);
                case "shelf-date-desc":
                    return new Date(b.shelf_add_date) - new Date(a.shelf_add_date);
                default:
                    return 0;
            }
        });


    return (
        <div>
            <div className="top-section">
                <div className="left-side">
                    <button className="create-button" onClick={goBookForm}>
                        Luo
                    </button>
                </div>
                <div className="right-side">
                    <div className="top-row">
                        <button className="settings-button" onClick={goSettings}>Asetukset</button>
                        <span className="separator">|</span>
                        <button className="settings-button" onClick={handleLogout}>
                            Kirjaudu ulos
                        </button>
                    </div>
                    <div className="bottom-row">
                        <select className="sort-dropdown" onChange={handleGenreChange}>
                            <option value="">Valitse genre...</option>
                            {genresList.map((genre) => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                        <div className="search-bar">
                            <select className="sort-dropdown" onChange={handleSort}>
                                <option value="">Järjestä...</option>
                                <option value="name-asc">Kirjan nimi (A-Ö)</option>
                                <option value="name-desc">Kirjan nimi (Ö-A)</option>
                                <option value="author-asc">Kirjailijat (A-Ö)</option>
                                <option value="author-desc">Kirjailijat (Ö-A)</option>
                                <option value="release-date-asc">Julkaisupäivä (Vanhin-Uusin)</option>
                                <option value="release-date-desc">Julkaisupäivä (Uusin-Vanhin)</option>
                                <option value="shelf-date-asc">Lisäyspäivä (Vanhin-Uusin)</option>
                                <option value="shelf-date-desc">Lisäyspäivä (Uusin-Vanhin)</option>
                            </select>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Hae..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="gray-box">
                <main className="content">
                    {loading ? (
                        <p>Ladataan...</p>
                    ) : (
                        filteredBooks.length === 0 ? (
                            <p>Kirjoja ei löytynyt.</p>
                        ) : (
                            filteredBooks.map((book) => (
                                <BookItem
                                    key={book.id}
                                    id={book.id}
                                    icon={book.icon_url}
                                    title={book.title}
                                    authors={book.authors}
                                />
                            ))
                        )
                    )}
                </main>
            </div>
        </div>
    );
};

export default HomePage;
