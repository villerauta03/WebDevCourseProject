/**
 * server.js
 * backend tiedosto joka hoitaa kaikki tietokannan yhteydet ja muun logiikan
 * sisältää
 * - käyttäjien rekisteröinnin
 * - käyttäjien kirjautumisen
 * - käyttäjien tilin poistamisen
 * - käyttäjien salasanan vaihtamisen
 * - käyttäjien kirjojen tallentamisen
 * - käyttäjien kirjojen hakemisen
 * - käyttäjien kirjojen poistamisen
 * - käyttäjien kirjojen muokkaamisen
 * - käyttäjien kirjojen tietojen hakemisen
 * myös sisältää JWT-todennuksen käyttäjien suojaamiseksi
 * käytetään bcryptjs-kirjastoa salasanojen hashaukseen ja vertailuun
 * käytetään pg-kirjastoa PostgreSQL-tietokannan kanssa
 * käytetään dotenv-kirjastoa ympäristömuuttujien lataamiseen
 * käytetään cors-kirjastoa CORS-ongelmien ratkaisemiseen
 * käytetään express-kirjastoa palvelimen luomiseen
 * 
 * huom kommentointi on jätetty muuten vähäiseksi
 */
const express = require("express"); // Express-kirjasto palvelimen luomiseen
require("dotenv").config(); // Lataa ympäristömuuttujat .env-tiedostosta
const cors = require("cors"); // CORS-kirjasto CORS-ongelmien ratkaisemiseen
const bcrypt = require("bcryptjs"); // Bcryptjs-kirjasto salasanojen hashaukseen ja vertailuun
const { Pool } = require("pg"); // PostgreSQL-kirjasto tietokannan kanssa työskentelyyn
const jwt = require("jsonwebtoken"); // JWT-kirjasto JSON Web Tokenien luomiseen ja tarkistamiseen
const app = express(); // Luo Express-sovellus

const jwtSecretKey = process.env.JWT_SECRET_KEY; // Lataa JWT-salainen avain ympäristömuuttujista (.env tiedosto hoitaa)

const pool = new Pool({ // Luo uusi Pool PostgreSQL-tietokannan kanssa
  //seuraavat tiedot postgre yhteyden vaatimiseen tullaan hakemaan backendissä olevasta .env tiedostosta
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});
pool.on("error", (err) => { // Käsittele tietokannan virheet
  console.error("Odottamaton virhe tietokannassa:", err);
  process.exit(-1);
});

app.use(cors()); // Ota CORS käyttöön kaikissa reiteissä
app.use(express.json()); // Ota käyttöön JSON-tiedostojen käsittely

// !! -- KÄYTTÄJÄN REKISTERÖINTI -- !!
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Sähköposti ja salasana vaaditaan." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, hashedPassword]
    );
    res.status(201).json({
      message: "Käyttäjä rekisteröity onnistuneesti.",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Virhe rekisteröinnissä:", error);
    res.status(500).json({ message: "Jotain meni vikaan palvelinpuolella." });
  }
});

// !! -- KÄYTTÄJÄN KIRJAUTUMINEN -- !!
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Sähköposti ja salasana vaaditaan." });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Väärät tiedot. Käyttäjää ei löydy." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Väärät tiedot. Salasana on väärä." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecretKey, {
      expiresIn: "1h",
    });

    res.json({
      message: "Sisäänkirjautuminen onnistui!",
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("Virhe kirjautumisessa:", error);
    res.status(500).json({ message: "Jotain meni vikaan." });
  }
});

// !! -- JWT TOKENIN VALIDOINTI JA VAHVISTAMINEN -- !!
const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const verified = jwt.verify(token, jwtSecretKey);
    req.user = verified;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

// !! -- KÄYTTÄJÄN TILIN POISTAMINEN -- !!
app.delete("/api/delete-account", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Salasana vaaditaan." });
  }

  try {
    const userResult = await pool.query("SELECT password FROM users WHERE id = $1", [userId]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ message: "Käyttäjää ei löydetty." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Väärä salasana. Tiliä ei poistettu." });
    }

    const deleteResult = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id", [userId]);

    if (deleteResult.rowCount === 0) {
      return res.status(404).json({ message: "Käyttäjää ei löydetty." });
    }
    res.status(200).json({ message: "Käyttäjätili poistettu onnistuneesti." });
  } catch (error) {
    console.error("Virhe tilin poistossa:", error);
    res.status(500).json({ message: "Jotain meni vikaan palvelinpuolella." });
  }
});

app.use((req, res, next) => {
  res.jsonResponse = function (data, status = 200) {
    res.status(status).json(data);
  };
  next();
});

// !! -- KÄYTTÄJÄN SALASANAN VAIHTAMINEN -- !!
app.post("/api/change-password", authenticateToken, async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.jsonResponse({ message: "Täytä kaikki ruudut." }, 400);
  }

  if (newPassword !== confirmPassword) {
    return res.jsonResponse({ message: "Uudet salasanasi eivät täsmää." }, 400);
  }

  try {
    const userId = req.user.id;
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    const user = result.rows[0];

    if (!user) {
      return res.jsonResponse({ message: "Käyttäjää ei löydy." }, 404);
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.jsonResponse({ message: "Vanha salasanasi on väärä." }, 401);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [hashedPassword, userId]);

    res.jsonResponse({ message: "Salasana päivitetty!" });
  } catch (error) {
    console.error("Virhe salasanan vaihdossa:", error);
    res.jsonResponse({ message: "Palvelinvirhe." }, 500);
  }
});

// !! -- KÄYTTÄJÄN KIRJOJEN HAKEMINEN -- !!
app.get("/api/my-books", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query("SELECT * FROM books WHERE user_id = $1", [userId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Virhe kirjojen hakemisessa:", error);
    res.status(500).json({ message: "Jotain meni vikaan palvelinpuolella." });
  }
});

// !! -- KÄYTTÄJÄN KIRJOJEN TALLENTAMINEN -- !!
app.post("/api/save-book", authenticateToken, async (req, res) => {
  const { title, authors, description, icon, releaseDate, shelfAddDate, genres } = req.body;
  const userId = req.user.id;

  if (!title || !authors || !description || !icon || !releaseDate || !shelfAddDate || !genres) {
    return res.status(400).json({
      message: "Kaikki kentät täytyy täyttää.",
    });
  }

  try {
    const genresString = Array.isArray(genres) ? genres.join(",") : genres;

    const result = await pool.query(
      "INSERT INTO books (user_id, title, authors, description, icon_url, release_date, shelf_add_date, genres) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
      [userId, title, authors, description, icon, releaseDate, shelfAddDate, genresString]
    );

    const newBookId = result.rows[0].id;

    res.status(201).json({
      message: "Kirja luotiin onnistuneesti!",
      bookId: newBookId,
    });
  } catch (error) {
    console.error("Virhe kirjan luomisessa:", error);
    res.status(500).json({ message: "Jotain meni vikaan palvelinpuolella." });
  }
});


//READ (CRUD)
// !! -- KÄYTTÄJÄN KIRJOJEN YKSILLINEN HAKU (BookInfo-sivulle) -- !!
// Hae tietty kirja ID:llä
app.get("/api/my-books/:id", authenticateToken, async (req, res) => {
  const bookId = req.params.id;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT title, authors, description, icon_url, release_date, shelf_add_date, genres FROM books WHERE id = $1 AND user_id = $2",
      [bookId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Kirjaa ei löytynyt." });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Virhe kirjan hakemisessa:", error);
    res.status(500).json({ message: "Virhe kirjan tietojen hakemisessa." });
  }
});

//DELETE (CRUD)
// !! -- KÄYTTÄJÄN KIRJOJEN POISTAMINEN -- !!
app.delete('/api/my-books/:id', authenticateToken, async (req, res) => {
  const bookId = req.params.id;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'DELETE FROM books WHERE id = $1 AND user_id = $2 RETURNING id',
      [bookId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Kirjaa ei löytynyt tai se ei kuulu käyttäjälle.' });
    }

    res.status(200).json({ message: 'Kirja poistettiin onnistuneesti.' });
  } catch (error) {
    console.error("Virhe kirjan poistossa:", error);
    res.status(500).json({ message: "Jotain meni vikaan palvelinpuolella." });
  }
});

// UPDATE (CRUD)
// !! -- KÄYTTÄJÄN KIRJOJEN MUOKKAAMINEN -- !!
app.put('/api/my-books/:id', authenticateToken, async (req, res) => {
  const bookId = req.params.id;
  const userId = req.user.id;
  const { title, authors, description, icon_url, release_date, shelf_add_date, genres } = req.body;

  if (!title || !authors || !description || !icon_url || !release_date || !shelf_add_date) {
    return res.status(400).json({
      message: 'Kaikki kentät täytyy täyttää.',
    });
  }

  try {
    const result = await pool.query(
      'UPDATE books SET title = $1, authors = $2, description = $3, icon_url = $4, release_date = $5, shelf_add_date = $6, genres = $7 WHERE id = $8 AND user_id = $9 RETURNING *',
      [title, authors, description, icon_url, release_date, shelf_add_date, genres, bookId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: 'Kirjaa ei löytynyt tai se ei kuulu käyttäjälle.',
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Virhe kirjan päivittämisessä:", error);
    res.status(500).json({
      message: "Jotain meni vikaan palvelinpuolella.",
    });
  }
});

// !! -- PALVELIN KÄYNNISTYY TÄÄLTÄ -- !!
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Palvelin käynnissä portissa ${PORT}`);
});
