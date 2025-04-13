/**  
 * BookForm.jsx
 * Tää on kirjan luonti-sivu. Käyttäjä luo kirjan ja lisää sen backendin kutsunnalla tietokantaan käyttäjäkohtasesti.
 * Lomake alkuperäsesti luotu tähän, samaa tyylitystä myös hyödynnetty BookEdit.jsx ja BookInfo.jsx
 * Kutsutaan backendistä kirjojen luontia (POST)
 * 
 * huomaa että jossakin kohdissa tän koodin kommentointiin on käytetty apuna tekoälyä
*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/BookForm.css"; //samaa tyylitiedostoo käytetty täällä ku BookEdit ja BookInfo

//pistetää tänne vaan genret arrayna tässä vaiheessa, jatkokehitykses voiaa tehä jotakin muuta tälle mahdollisesti
const genres = [
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

const BookForm = () => { //täsä oli aiemmin addbook. aattelin kutsuu tätä jostakin jossaa vaiheessa jatkokehitystä varten mut päätin jättää poies
  const navigate = useNavigate(); //navigaatiot

  // kirjan luontitiedot joita sit lähetetään backendiin. (huom täs oli aiemmin turha icon seticon jolla ei tehty mitään)
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [shelfAddDate, setShelfAddDate] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  //nää mahdollistaa ton kuvakkeen lisäämisen ja sen kahtelun kun sen lisää
  const [iconURL, setIconURL] = useState("");
  const [previewURL, setPreviewURL] = useState("");

  const [selectedGenres, setSelectedGenres] = useState([]); //genret menee arrayhin

  const handleLoadIcon = () => { //huolehditaa URL avulla kuvakkeen lataminen
    setPreviewURL(iconURL);
  };

  useEffect(() => {
    //käyttäjän kirjautuminen tarkistetaan. lähetetään takas sisäänkirjautumaan jos ei oo JWT
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    //huomaa et täällä kans formatoidaan päivämäärä hyllyynlisäämispäivämäärälle
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`; // DD/MM/YYYY
    setShelfAddDate(formattedDate);
  }, [navigate]);

  const goHome = () => { //tää on apuna kotiruudulle palautumisessa
    navigate("/home");
  };

  // !! -- täällä tallennetaan tän avulla postgresql tietokantaan tää kirja --
  const handleSaveBook = async () => { //huomaa async
    // kaikkiin kenttiin on täytettävä jotakin ennen kun se antaa sun lähettää kirjan lisäämiseen. Jopa siis 1 genre pitää valita vähintään
    // - (mahdollinen jatkokehitys mää ottaisin ton genren valinnan validoinnin pois ja ehkä myös kuvakkeen URL validoinnin pois)
    if (!title || !authors || !description || !iconURL || !releaseDate || selectedGenres.length === 0) {
      setWarningMessage("Kaikki kentät on täytettävä, ja vähintään yksi genre on valittava.");
      return;
    }
    setWarningMessage(""); //puhistetaan pois varotusviesti jos oli aiempi olemassa

    // luodaan newbook objekti, tän avulla sit lähetetään kaikki noi kirjan tiedot backendille, talletetaan kirjatiedot sisälle.
    const newBook = {
      title,
      authors,
      description,
      icon: previewURL,
      releaseDate,
      shelfAddDate,
      genres: selectedGenres,
    };

    try { //nyt sit koitetaan lisätä tietokantaan lähettämällä backendin api kutsu. try-catch käsittelee virheet
      const token = localStorage.getItem("token"); // JWT tokeni tallennetaa tonne

      //kutsutaan backendin api tallentaan kirjan tiedot tietokantaan
      const response = await fetch("http://localhost:5000/api/save-book", { //varmista sitte myös et tää on oikein
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // !! Authorization 
        },
        body: JSON.stringify(newBook), // tän avulla lähetetään kirjan tiedot backendille (muunna JSON)
      });

      const data = await response.json(); // odotetaan et saadaan vastaus backendiltä
      if (response.ok) { // jos ok nii käyttäjä takas kotisivulle, jos pitäis olla sit ladattuna se kirja kotisivun harmaaseen laatikkoon
        navigate("/home");
      } else {
        setWarningMessage(data.message || "Jotain meni vikaan."); // virhe jos saatu data ei oo ok
      }
    } catch (error) { //geneerinen catch
      console.error("Virhe kirjan tallentamisessa:", error);
      setWarningMessage("Jotain meni vikaan. Yritä uudelleen.");
    }
  };


  return (
    <div>
      {/* varotusviesti asetettu tänne alkuun, se sitten tulis näkymään tossa formin ihan yläosassa */}
      {warningMessage && (
        <div className="warning-message">
          <p>{warningMessage}</p>
        </div>
      )}

      {/* tää on toi harmaa laatikko */}
      <div className="bf-book-creation-container">

        {/* kuvakkeen esikatselulle tehty luokka */}
        <div className="bf-icon-preview-box">
          {previewURL ? (
            // Näytetään kuvake, jos previewURL on asetettu
            <img
              src={previewURL}
              alt="Kirjan kuvakkeen esikatselu"
              className="bf-icon-preview-image"
            />
          ) : (
            // Näytetään paikkateksti, jos previewURL puuttuu
            <p className="bf-placeholder-text">Kuvasuhde 9:16</p>
          )}
        </div>

        {/* tässä sisältyy kaikki noi tekstikentät ja käyttäjän lisäykset */}
        <div className="bf-form-content">

          {/* päivämäärille tarkoitettu laatikon oikean puolen halaaminen */}
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

            {/* genret kans oikealla puolella laatikkoa */}
            <div className="bf-createbook-form-group">
              <label className="bf-createbook-spotlabel">Genret</label>
              {genres.map((genre) => (
                <div key={genre} className="genre-checkbox">
                  <input
                    type="checkbox"
                    id={`genre-${genre}`}
                    value={genre}
                    checked={selectedGenres.includes(genre)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedGenres([...selectedGenres, genre]); // Lisää genren valittujen listaan
                      } else {
                        setSelectedGenres(selectedGenres.filter((g) => g !== genre)); // Poistaa genren valittujen listasta
                      }
                    }}
                  />
                  <label htmlFor={`genre-${genre}`}>{genre}</label>
                </div>
              ))}
            </div>
          </div>

          {/* täs nää muut tekstikentät (eli nää ois tos vasemmalla puolella laatikkoa */}
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
                placeholder="Kirjan kuvakkeen URL"
                value={iconURL}
                onChange={(e) => setIconURL(e.target.value)}
              />
              <button className="bf-load-btn" onClick={handleLoadIcon}>
                Lataa
              </button>
            </div>
          </div>

          {/* huomaa et kuvauksen tekstialueel oltava oma luokka koska se on tolleen pitempi */}
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

      {/* nää painikkeet on ton harmaan laatikon alla */}
      <div className="bf-bottombuttons">
        <button className="bf-submit-btn" onClick={handleSaveBook}>
          Lähetä
        </button>
        <button className="bf-cancel-btn" onClick={goHome}>
          Peruuta
        </button>
      </div>
    </div>

  );
};

export default BookForm;
