/**  
 * BookEdit.jsx
 * Tää on kirjan muokkaus-sivu. Käyttäjä voi kyseisen kirjan tietoja muokata halutessaan tällä sivulla olevan toiminnallisuuden avulla.
 * Lomake on periaattees sama kuin BookForm.jsx, muutamia eroja, CSS periaattees ihan sama kuiteski helpottaan kehityst
 * Kutsutaan backendistä kirjojen hakua (GET) ja kirjojen muokkausta (PUT)
 * 
 * huomaa että jossakin kohdissa tän koodin kommentointiin on käytetty apuna tekoälyä
*/

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/BookForm.css"; //käytetään samat tyylit kuin BookForm.jsx ja BookInfo.jsx

//jatkokehitys idea: käyttäjien omat genret ja lisäykset, tietokantaan (?). pudotuslistasta jossa checkmarkit (?)
const genresList = [ //asetetaan genret vain tälleen tässä vaiheessa
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

    // kirjan tiedot asetetaan näin ja päivitetään näitä käyttäen
    const [iconURL, setIconURL] = useState("");
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState("");
    const [description, setDescription] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [shelfAddDate, setShelfAddDate] = useState("");
    const [previewURL, setPreviewURL] = useState(""); //tällä näytämme kirjan kuvakkeen sivulla
    const [selectedGenres, setSelectedGenres] = useState([]); //array valituille genreille jotka tallennetaan kirjatietoihin

    //jatkokehitys idea: kättäjät ei sais nähä tuota sivua ennen kun se on ladattu tai sillee et se ei näkyis uloskirjautuneille käyttäjille ollenkaan edes vilauksena (?)
    const [loading, setLoading] = useState(true); //lataus hifistelyä, periaatteessa pelkästää muuttaa jotkut napit lukemaan "Ladataan..." jos jotaki tapahtuu (tässä vaiheessa)

    //päivämäärä täytyy muotoilla erikseen koska se tallennetaan tietokantaan eri muodossa (oletuksella emt)
    const formatDateToDDMMYYYY = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`; // DD/MM/YYYY
    };

    useEffect(() => {
        const token = localStorage.getItem("token"); //hateaan JWT
        if (!token) { //jos ei ole tokenia käyttäjä viedään takaisin loginiin automaattisesti
            navigate("/login");
            return;
        }

        // -- kirjan tietojen haku täällä --
        const fetchBookDetails = async () => { //huomaa async
            try { //muistetaan try catch virheitä varten
                const response = await fetch(`http://localhost:5000/api/my-books/${id}`, { //kutsutaan backendistä API jolla haetaan kyseisen kirjan tiedot
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }, // Authorization !!
                });

                const data = await response.json(); //tämä on backendin palauttama data
                if (response.ok) { //jos kutsu onnistuu talletetaan kaikki kirjan tiedot omille muuttujille
                    setIconURL(data.icon_url);
                    setTitle(data.title);
                    setAuthors(data.authors);
                    setDescription(data.description);
                    setReleaseDate(data.release_date.split("T")[0]); //pitää splitata
                    setShelfAddDate(formatDateToDDMMYYYY(data.shelf_add_date)); //huomaa formatointi
                    setPreviewURL(data.icon_url);
                    setSelectedGenres(data.genres ? data.genres.split(",") : []); //splitataan genret ja talletetaan arrayhin
                } else { //virhe tapahtuu jos kutsu epäonnistuu
                    alert(data.message || "Virhe kirjatietojen haussa.");
                }
            } catch (error) { //virhe tapahtuu jos muuten menee vikaan
                alert("Jotain meni väärin.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails(); //kutsutaan tietojen hakua useEffectin sisäl 
    }, [id, navigate]); // kertoo millon ladataan uudestaan (kun id vaihtuu, kun navigate vaihtuu)


    //tää auttaa lataan ton kuvakkeen näkymän
    const handleLoadIcon = () => {
        setPreviewURL(iconURL);
    };

    // -- kirjan tietojen tallennus backendille täältä --
    const handleSaveChanges = async () => { //async tarpeen

        //luodaan uus "updateBook" objekti johon tallennetaa kaikki kirja tiedot
        const updatedBook = {
            title,
            authors,
            description,
            icon_url: previewURL,
            release_date: releaseDate,
            shelf_add_date: shelfAddDate,
            genres: selectedGenres.join(","),
        }; //tää sitte lähetetään backendille korvaamaan se siellä oleva tieto

        try { //try catch virheiden vuoks taas. 
            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:5000/api/my-books/${id}`, { //tällä kutsutaan tota apita server.js backendissä kirjan idn mukasesti
                method: "PUT", //eli päivitys
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Authorization !! muista
                },
                body: JSON.stringify(updatedBook), //tää on se objekti joka lähetetään backendille
            });

            const data = await response.json(); //tää on se data joka backend palauttaa
            if (response.ok) { //jos kaikki ok nii palautetaa käyttäjä takas kotiruudulle suoraan
                navigate("/home");
            } else { //muuten tehää vaan selainkohtanen alert
                alert(data.message || "Kirjan päivitys epäonnistui.");
            }
        } catch (error) { //generaalinen catch
            alert("Jotain meni väärin.");
        }
    };

    // genren valinnan hallinta, arraysta poisto ja lisäys
    const handleGenreChange = (genre) => {
        if (selectedGenres.includes(genre)) { // jos genre valittu se otetaa pois arraysta
            setSelectedGenres(selectedGenres.filter((g) => g !== genre)); // poistetaa genre arraysta
        } else {
            setSelectedGenres([...selectedGenres, genre]); // muuten sit lisätään genre arrayhin
        }
    };

    const goHome = () => { ///kotinavigaation apukutsunta
        navigate(`/book/${id}`);
    };

    if (loading) { //lautuksen hifistely
        return <p>Ladataan...</p>;
    }

    return (
        <div>
            {/* sisältää ton koko kirjatiedon lomakkeen (tää on siis se harmaa alue) */}
            <div className="bf-book-creation-container">

                {/* käyttäjän lisäämän URL-kuvakkeen tarkasteluu varten */}
                <div className="bf-icon-preview-box">
                    {previewURL ? (
                        // jos URL annettu, lataa
                        <img
                            src={previewURL}
                            alt="Kirjan kuvake"
                            className="bf-icon-preview-image"
                        />
                    ) : (
                        // jos ei URL annettu, placeholder teksti
                        <p className="bf-placeholder-text">Kuvasuhde 9:16</p>
                    )}
                </div>

                {/* tää sisältää kaikki noi formit jne. pääasiassa tällä tehää tyylitys noille formeille ton harmaan laatikon sisällä */}
                <div className="bf-form-content">

                    {/* nää on noille päivämäärille jotka istuu siinä harmaan laatikon oikeessa puoles */}
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

                        {/* huomaa että me kans heitetää tää genren valinta sinne samalle puolelle vaikka se ei oo päivämäärä (en jaksanu nimetä tota classia uuestaa) */}
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

                    {/* täs on niinku kaikki nää inputit noille muille tiedoille. huomaa et ne ei oo missää luokassa itessää 
                    (tuo bf-form-content hoitaa suurimmaks osaks oikeen näkymän näille. ei kaikista responsiivisin tyylitys.)
                    !! -- Jatkokehitys-idea: Tee sivuston tyylityksestä responsiivinen*/}
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

                    {/* huomaa et kuvaukselle on oma luokka css koska se on vähä laajempi ja eris kohas kun nää muut */}
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

            {/* nää on ton harmaan laatikon alla. nappien toimintaa */}
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
