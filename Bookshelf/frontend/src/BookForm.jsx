import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/BookForm.css";

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

const BookForm = ({ addBook }) => {
  const navigate = useNavigate();

  const [icon, setIcon] = useState("");
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [shelfAddDate, setShelfAddDate] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  const [iconURL, setIconURL] = useState("");
  const [previewURL, setPreviewURL] = useState("");

  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleLoadIcon = () => {
    setPreviewURL(iconURL);
  };

  useEffect(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    setShelfAddDate(formattedDate);
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:5000/api/my-books", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          // Possibly save the data to the state if needed
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Virhe kirjojen hakemisessa:", error);
        alert("Jotain meni vikaan.");
      }
    };

    fetchBooks();
  }, []);

  const goHome = () => {
    navigate("/home");
  };

  const handleSaveBook = async () => {
    if (!title || !authors || !description || !iconURL || !releaseDate || selectedGenres.length === 0) {
      setWarningMessage("Kaikki kentät on täytettävä, ja vähintään yksi genre on valittava.");
      return;
    }

    setWarningMessage("");

    const newBook = {
      title,
      authors,
      description,
      icon: previewURL,
      releaseDate,
      shelfAddDate,
      genres: selectedGenres,
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/save-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBook),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Kirja tallennettu onnistuneesti!");
        navigate("/home");
      } else {
        setWarningMessage(data.message || "Jotain meni vikaan.");
      }
    } catch (error) {
      console.error("Virhe kirjan tallentamisessa:", error);
      setWarningMessage("Jotain meni vikaan. Yritä uudelleen.");
    }
  };

  return (
    <div>
      {warningMessage && (
        <div className="warning-message">
          <p>{warningMessage}</p>
        </div>
      )}

      <div className="bf-book-creation-container">
        <div className="bf-icon-preview-box">
          {previewURL ? (
            <img
              src={previewURL}
              alt="Kirjan kuvakkeen esikatselu"
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
              {genres.map((genre) => (
                <div key={genre} className="genre-checkbox">
                  <input
                    type="checkbox"
                    id={`genre-${genre}`}
                    value={genre}
                    checked={selectedGenres.includes(genre)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedGenres([...selectedGenres, genre]);
                      } else {
                        setSelectedGenres(selectedGenres.filter((g) => g !== genre));
                      }
                    }}
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
                placeholder="Kirjan kuvakkeen URL"
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
