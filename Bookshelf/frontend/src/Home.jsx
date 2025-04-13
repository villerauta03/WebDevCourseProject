/**
 * Home.jsx
 * täs ois tän sovelluksen pääsivu, jossa toiminnallisuuksiin liittyy
 * - käyttäjän kirjojen hakeminen harmaaseen laatikkoon
 * - harmaan laatikon lajittelu, genrejen valinnan perusteinen suodatus, ja hakutoiminto kirjan nimen perusteella
 * - siirtymiset kaikkialle muualle sovellukseen
 * kans lähettää automaattisesti suoraan kirjautumissivulle jos JWT tokenia ei löydy
 * huom ! täällä on joku bugi joskus että kun jättää vähäks aikaa olemaan niin ei enää osaa ladata niitä kirjoja kunnolla. 
 * ( Kirjaudu ulos ja takasin sisään tässä tilanteessa ) en oo ihan varma miks se tekee tolleen nii on pakko ollu jättää
 * Mahdollinen jatkokehitys korjaus? Ehkä ei, vaikuttaa laajalta.
 * 
 * huom 2 ! tässä kommentoinnissa käytetty aika laajasti tekoälyä apuna kuvailemaan noi toiminnot
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookItem from "./BookItem";
import "./styles/Home.css";

const HomePage = () => {
    const navigate = useNavigate(); // Navigointifunktiot
    const [books, setBooks] = useState([]); // käyttäjän kirjat hoidetaan tällä
    const [loading, setLoading] = useState(true); // lataustilan hifistelyä

    //const [userEmail, setUserEmail] = useState(""); 
        // -> halusin tehä tervetuloviestin kotisivulle mut se ei mahu tällä tyylillä tonne oikeen mihinkään

    const [searchQuery, setSearchQuery] = useState(""); // tällä hallitaan ton harmaan laatgikon hakutoimintoa, se hakee kirjan nimen avulla
    const [sortOption, setSortOption] = useState(""); // tällä järjestellään ton harmaan laatikon kirjat käyttäjän valinnan mukaan
    const [selectedGenre, setSelectedGenre] = useState(""); // tällä suodatetaan kirjat genren mukaan

    // genret listataan nyt vaan arrayssa tässä vaiheessa, jatkokehityshommaa mahdollisesti tän niinku kunnollinen toimivuus
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

    // tässä hallitaan uloskirjautuminen käyttäjälle
    const handleLogout = () => {
        localStorage.removeItem("token"); // Poistetaan token localStoragesta (muistista)
        localStorage.removeItem("username"); // Poistetaan käyttäjänimi localStoragesta (muistista)
        navigate("/login");
    };

    // siirtymiselle vaan apuna nämä
    const goSettings = () => {
        navigate("/settings");
    };
    const goBookForm = () => {
        navigate("/new-book");
    };

    useEffect(() => {
        const token = localStorage.getItem("token"); // käyttäjän JWT tokeni pitäs olla paikallisesti
        //const userEmail = localStorage.getItem("username"); //tervetuloviestille joka ei mahtunu mihinkää

        if (!token) {
            navigate("/login"); // Siirretään login-sivulle, jos ei tokenia
            return;
        } 

        /*else {
            setUserEmail(userEmail); // Asetetaan käyttäjän email (ei käytössä tässä sovelluksessa)
        }*/

        setLoading(true); // Aloitetaan lataus

// -- käyttäjern kirjojen haku tapahtuu täällä --
        const fetchBooks = async () => { //huomaa async
            try {
                const response = await fetch("http://localhost:5000/api/my-books", { //kato sitten et tää on 100% oikeen backendissä kans
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`, // Authorization 
                    },
                });
                const data = await response.json(); // Parsitaan JSON-vastaus
                if (response.ok) { //jos toi vastaus on ok nii tallennetaan kirjat tilaan
                    setBooks(data);
                } else {
                    alert(data.message || "Jotain meni vikaan."); // Virhe, jos data ei ole onnistunut
                }
            } catch (error) {
                alert("Jotain meni vikaan."); // Geneerinen virhe
            } finally {
                setLoading(false); // Lopetetaan lataus
            }
        };

        fetchBooks(); // Suoritetaan kirjatietojen haku
    }, [navigate]); // Haku riippuvainen navigointifunktiosta (sitten tää jos navigaatio tila muuttuu)

    //täs on toi hakutoiminto kirjan nimen perusteella
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase(); // Muutetaan hakusana pieniksi kirjaimiksi
        setSearchQuery(query); // Asetetaan hakusana
    };

    // tää on toi lajittelu
    const handleSort = (e) => {
        setSortOption(e.target.value); // Asetetaan järjestämisvaihtoehto
    };

    //tää on toi genresuodatus
    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value); // Asetetaan valittu genre
    };

    // Suodatetaan ja järjestetään kirjat käyttäjän valintojen perusteella
    const filteredBooks = books
        .filter((book) => {
            const matchesQuery = book.title.toLowerCase().includes(searchQuery) || // Tarkistaa hakusanaa otsikosta
                book.authors.toLowerCase().includes(searchQuery); // Tarkistaa hakusanaa kirjailijoista

            const matchesGenre = selectedGenre === "" || // Tarkistaa genren suodatusta
                (book.genres && book.genres.toLowerCase().includes(selectedGenre.toLowerCase()));

            return matchesQuery && matchesGenre; // Palauttaa vain suodatetut kirjat
        })
        .sort((a, b) => { // Järjestetään käyttäjän valinnan perusteella
            switch (sortOption) {
                case "name-asc":
                    return a.title.localeCompare(b.title); // Nimi (A-Ö)
                case "name-desc":
                    return b.title.localeCompare(a.title); // Nimi (Ö-A)
                case "author-asc":
                    return a.authors.localeCompare(b.authors); // Kirjailija (A-Ö)
                case "author-desc":
                    return b.authors.localeCompare(a.authors); // Kirjailija (Ö-A)
                case "release-date-asc":
                    return new Date(a.release_date) - new Date(b.release_date); // Julkaisupäivä (Vanhin-Uusin)
                case "release-date-desc":
                    return new Date(b.release_date) - new Date(a.release_date); // Julkaisupäivä (Uusin-Vanhin)
                case "shelf-date-asc":
                    return new Date(a.shelf_add_date) - new Date(b.shelf_add_date); // Lisäyspäivä (Vanhin-Uusin)
                case "shelf-date-desc":
                    return new Date(b.shelf_add_date) - new Date(a.shelf_add_date); // Lisäyspäivä (Uusin-Vanhin)
                default:
                    return 0; // Ei järjestämistä
            }
        });

    return (
        <div>
            {/* Sivun yläosan painikkeet */}
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

            {/* Kirjat listataan tässä laatikossa */}
            <div className="gray-box">
                <main className="content">
                    {loading ? (
                        <p>Ladataan...</p> // Näytetään lataustila
                    ) : (
                        filteredBooks.length === 0 ? (
                            <p>Kirjoja ei löytynyt.</p> // Näytetään, jos ei löydy suodatettuja kirjoja
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
