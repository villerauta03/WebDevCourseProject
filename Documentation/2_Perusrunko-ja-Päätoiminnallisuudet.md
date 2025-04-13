# Projektin 2. vaihe - Perusrunko ja päätoiminnallisuudet

## 1. Perusrunko ja arkkitehtuuri

Verkkosovelluksemme on toteutettu käyttäen Reactia, Node.js ja Express, sekä PostgreSQL tietokantana. Tietokannassamme on kaksi eri pöytää, `users` ja `books`. Backendimme server.js kautta kutsumme useita eri API-kutsuja, jotka suorittavat toiminnallisuuksia React-koodiimme perustuen. Tyylitiedostomme olemme luoneet itse perus CSS käyttäen.  

### Ympäristö
- Ohjelmiston näkyvyyden ja toiminnallisuuden testaamiseen käytimme selaimena `Firefox 137.0.1 (64-bit)`.  
- Kehitysympäristönämme käytimme `Visual Studio Code version 1.99.2`, ja versionhallintaan sekä tallennukseen olemme pitäneet koodia GitHubissa.
- Frontend on rakennettu käyttäen `React 19.1.0`
- Backend on rakennettu käyttäen `Node v22.14.0` ja `express@5.1.0` käyttäen
- Tietokantanamme olemme käyttäneet `PostgreSQL 17.4 on x86_64-windows, compiled by msvc-19.42.34436, 64-bit`.
- Projektimme on isännöity (host) paikallisella koneella, `http://localhost:5000` (API-kutsut) ja `http://localhost:5173` (oman paikallisen koneen frontend, saattaa olla eri jos itse kasaat tämän koneellesi)

### Projektin kansiorakenne
Projektin kansiorakenteen voi myös nähdä GitHubin sisällä menemällä Bookshelf-kansioon, mutta lyhyesti se näyttää tältä:
```
/backend
  server.js
  .env
/frontend
  /public
    stockphotoman.jpg (placeholder image)
    arrow.png
    vite.svg
  /src
    /styles
      BookForm.css
      BookItem.css
      home.css
      styles.css
      UserSettings.css
    App.jsx
    BookEdit.jsx
    BookForm.jsx
    BookInfo.jsx
    BookItem.jsx
    Home.jsx
    Login.jsx
    main.jsx
    Register.jsx
    UserSettings.jsx
```

### Käytetyt lisäteknologiat
- **Express**: Käytetään luomaan HTTP-palvelin, tarjoaa reitityksen ja middleware-tuen.
- **dotenv**: Lataa ympäristömuuttujat `.env` tiedostosta (user: process.env.DATABASE_USER, host: process.env.DATABASE_HOST,database: process.env.DATABASE_NAME, password: process.env.DATABASE_PASSWORD, port: process.env.DATABASE_PORT). Käytetään konfiguroimaan sovellus turvallisesti esimerkiksi tietokannan ja salausavainten yhteydessä.
- **CORS** (Cross-Origin Resource Sharing): Mahdollistaa pyyntöjen lähettämisen eri alkuperästä, kuten frontendistä backendille. Ratkaisee CORS-ongelmia, joita voi ilmetä, kun verkkosovellus käyttää API:a.
- **bcryptjs**: Hashaa ja vertaa salasanoja turvallisesti. Käytetään varmistamaan, että tallennetut salasanat eivät ole suoraan luettavissa tietokannasta.
- **pg** (PostgreSQL): Mahdollistaa tietokantakyselyt PostgreSQL:n kanssa. Käytetään esimerkiksi tietojen tallentamiseen ja hakemiseen tauluista.
- **jsonwebtoken** (JWT): Luo ja vahvistaa JSON Web Token -tokeneita. Käytetään autentikoinnissa, jotta käyttäjän istunto pysyy suojattuna.
- **React Router**: Käytetään reitityksessä React-sovelluksessa. Tarjoaa navigointifunktion käyttäjän siirtämiseksi eri sivuille. Erityisesti käytössämme ollut `useState` ja `useEffect`. 
- Rekisteröinnissä käytettiin myös pikaisesti **Axios**, joka hallitsi HTTP-pyynnön lähetyksen. 

### Frontend React
React-sovelluksemme on rakennettu .jsx tiedostoihin. `App.jsx` hoitaa applikaation sisällä tapahtuvan reitityksen ja navigaation. Sen sisälle olemme luoneet 'react-router-dom' käyttäen reititykset jokaiseen sivustoon, mitä applikaatiolla on. Näihin sivustoihin kuuluu:
- `/`: App.jsx index-sivu, joka on ensimmäinen mihin kohdataan, kun applikaatio avataan. Sivulla on koodipätkä, joka vie käyttäjän suoraan joko `/login` tai `/home` riippuen siitä, onko käyttäjän paikallisessa muistissa olemassa JWT token vai ei.
- `/login`: Login.jsx-sivu, joka hoitaa käyttäjän sisäänkirjautumisen mahdollisuuden. Käyttäjä asettaa tiedot (Sähköposti + salasana) sivulla oleviin input-laatikkoihin. Nämä tiedot katsotaan API-kutsun avulla backendissä PostgreSQL-tietokannasta, että onko kyseistä käyttäjää olemassa kyseisellä salasanalla.
- `/register`: Register.jsx-sivu, joka hoitaa käyttäjän rekisteröinnin. Käyttäjä asettaa sähköpostiosoitteen, salasanan, sekä vahvistaa salasanan. Painamalla nappia, sivu lähettää kutsun backendille, joka luo kyseisen käyttäjätilin tietokantaan. Sivu myös vahvistaa käyttäjän salasanan, molempien salasanaruutujen on oltava samoja että käyttäjätilin voi luoda.
- `/home`: Home.jsx-kotisivu josta voidaan siirtyä jokaiselle muulle sivulle. Sovellus sisältää lista-alueen, johon haetaan tietokannasta (`books`) käyttäjän ID:llä tallennetut kirjat, jotka täyttävät alueen kirja-itemeillä (nämä kirja-itemit määritellään tiedostossa `BookItem.jsx`). Kirjaa painamalla siirrymme kyseisen kirjan info-sivulle (`BookInfo.jsx`). Sivulla on myös Asetukset-nappi (menee `UserSettings.jsx`), "Luo"-nappi (menee kirjanluontiin `BookForm.jsx`, sekä "Kirjaudu ulos"-nappi.
- `/settings`: UserSettings.jsx-sivusto, josta käyttäjä voi vaihtaa salasanansa ja poistaa käyttäjätilinsä. Salasanan vaihdon yhteydessä on vanhan salasanan tarkistus (käyttäjän tämänhetkinen salasana on täytettävä ruutuun), sekä uuden salasanan vahvistus (kaksi tekstikenttää, joiden on oltava sama ennen kuin voimme lähettää backendiin päivityspyynnon käyttäjän salasanalle). Käyttäjän poiston nappia painaessa avautuu erillinen pop-up ruuduke samalle sivulle (modal), johon käyttäjän on täytettävä salasanansa ennen kuin käyttäjätilin poisto voidaan suorittaa. Käyttäjällä on myös sivulla "Takaisin"-nappi (vie kotisivulle), sekä "Kirjaudu ulos"-nappi.
- `/new-book`: BookForm.jsx-kirjanluontisivu, jossa täytämme lomakkeeseen kirjan tiedot. Kirjan tietoihin sisältyy kirjan nimi, tekijä(t), kuvakkeen URL (kuvan esikatselu näkyy tietolaatikkojen viereisessä ruudussa painamalla "Lataa"-nappia tekstilaatikon vieressä), hyllyynlisäämispäivämäärä (automaattisesti haetaan `today.getDate()`, `today.getMonth()`, `today.getFullYear()` avulla), julkaisupäivämäärä, kirjan kuvaus, sekä genren valinta valintalaatikolla. Jokaiseen inputtiin on täytettävä jotain (kuvakkeen URL on ladattava), ja vähintään 1 genre valittava ennen kuin kirjan voi lähettää backendille API-kutsulla.
- `/book/:id`: BookInfo.jsx-tietosivu, joka on kirjan ID:hen perustuva kirjakohtainen tietonäkymä, josta voidaan tarkastella tarkemmin kirjan tiedot. Sivulla näkyy kaikki tiedot, mitä täytettiin luontisivulla, sekä kuvakkeen URL erikatselu. Sama CSS kuin BookForm.css laajasti. Sivulla "Muokkaa" ja "Poista"-painikkeet, joiden avulla käyttäjä joko siirretään kirjan muokkaussivulle tai avataan modal, jolla varmistetaan kirjan poisto API-kutsulla.
- `/book/edit/:id`: BookEdit.jsx kirjanmuokkaussivu, joka näyttää laajalti samalta kuin BookForm.jsx, ja jolla on samat inputit kuin BookForm.jsx:ssä. Kirjan tiedot haetaan ruutuihin backendistä (GET), ja muokatut tiedot lähetetään backendille tietokantaan päivitettäväksi (PUT).

`BookItem.jsx`-tiedostolla määrittelemme `/home`-sivulla harmaan laatikon sisällä näkyvät kirja-itemit, johon kuuluu kirjan nimi, kirjailijan nimi, sekä kuvakkeen URL:llä ladattu kuvake.

### Backend server.js (Express Node.js ja PostgreSQL)
Kutsumme monta kertaa Reactin frontendistä backendiin server.js:ssä olevia API-kutsuja. Näihin API-kutsuihin kuuluu:
- `app.post("/api/register", async (req, res) => {`: Jonka kautta luomme käyttäjien tauluun tietokannassa käyttäjän antamien sähköpostin ja salasanan avulla `"INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email"`
- `app.post("/api/login", async (req, res) => {`: Jonka kautta annamme käyttäjälle JWT-tokenin 1 tunnin ajaksi, jos frontendistä annetaan OK vastaus salasanan ja sähköpostiosoitteen tarkistukselle. `"SELECT * FROM users WHERE email = $1"` ja `const token = jwt.sign({ id: user.id, email: user.email }, jwtSecretKey, { expiresIn: "1h",}`
- `app.delete("/api/delete-account", authenticateToken, async (req, res) => {`: Jonka kautta poistamme käyttäjätilin jos salasana vastaa tietokannassa olevaa `"SELECT password FROM users WHERE id = $1"`. Poistamme käyttäjätilin `"DELETE FROM users WHERE id = $1 RETURNING id"`
- `app.post("/api/change-password", authenticateToken, async (req, res) => {`: Jonka kautta vaihdamme käyttäjän salasanaa kun oikea salasana on varmistettu salasana-ruudussa `"SELECT * FROM users WHERE id = $1`. Vaihdamme käyttäjätilin salasanaa jos se onnistuu `"UPDATE users SET password = $1 WHERE id = $2"`.
- `app.get("/api/my-books", authenticateToken, async (req, res) => {`: Jonka kautta haemme käyttäjän kirjat ja palautamme ne frontendiin `"SELECT * FROM books WHERE user_id = $1"`.
- `app.post("/api/save-book", authenticateToken, async (req, res) => {`: Jonka kautta tallennamme muokatun kirjan kun saamme tarvittavat tiedot frontendistä `"INSERT INTO books (user_id, title, authors, description, icon_url, release_date, shelf_add_date, genres) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id"`.
- `app.get("/api/my-books/:id", authenticateToken, async (req, res) => {`: Joka hakee tietyn kirjan tiedot frontendille kun sitä kutsutaan `"SELECT title, authors, description, icon_url, release_date, shelf_add_date, genres FROM books WHERE id = $1 AND user_id = $2"`
- `app.delete('/api/my-books/:id', authenticateToken, async (req, res) => {`: Joka poistaa jonkun kyseisen kirjan tietokannasta kun sitä kutsutaan `'DELETE FROM books WHERE id = $1 AND user_id = $2 RETURNING id'`
- `app.put('/api/my-books/:id', authenticateToken, async (req, res) => {`: Joka päivittää jonkun kyseisen kirjan tietoja sille annettujen tietojen perusteella `'UPDATE books SET title = $1, authors = $2, description = $3, icon_url = $4, release_date = $5, shelf_add_date = $6, genres = $7 WHERE id = $8 AND user_id = $9 RETURNING *'`
  
Useassa kohdassa viitataan `const authenticateToken = (req, res, next) => {`, joka hallitsee JWT-tokenin validoinnin hakemalla sille lähetetystä `Authorization` headeristä `Bearer <token>` JWT-tokenin, joka tarkistetaan `jwt.verify()`:n avulla käyttämällä sovelluksessa määriteltyä salausavainta (jwtSecretKey). Validit tokenit palauttavat dekoodatut tiedot req.user objektiin käytettäväksi.  

Näiden toiminnallisuuksien avulla voimme taata ohjelmiston backend-toiminnallisuuden.

## 2. Toiminnallisuudet

Meidän koodissamme on toiminnallisuuksia CRUD-menetelmän mukaisesti. Kokoamme keskeisimmät toiminnallisuudet alla olevaan taulukkoon:
| Nimi | Kuvaus | Missä? |
|------|-----------|--------------|
| Käyttäjän automaattinen reititys JWT perusteella | Käyttäjä automaattisesti viedään suoraan joko kotiruutuun tai sisäänkirjautumiseen perustuen siihen, onko käyttäjän JWT olemassa hänen selaimen paikallisessa localStorage:ssa. | Koko applikaatiostruktuurissa (/login ja /register eivät anna sisäänkirjautuneen käyttäjän päästä sisään) |
| Käyttäjän kyky navigoida sovelluksen sisällä | Käyttäjällä on mahdollisuus liikkua sovelluksen sisällä sivulta toiseen nappeja painamalla | Koko applikaatiostruktuurissa |
| Sisäänkirjautuminen | Käyttäjän mahdollisuus kirjautua sisään käyttäjällä, joka on olemassa PostgreSQL-tietokannan `users`-pöydässä. Käyttäjälle tallennetaan localStorage:en JWT tokeni, joka vanhenee 1h päästä. | `Login.jsx - '/login' `|
| Rekisteröityminen | Käyttäjä kykenee luomaan oman käyttäjätilinsä tietokantaan `users`-pöytään kutsumalla API:ta kun salasanat ja sähköpostiosoite on validoitu. Onnistuneen rekisteröinnin yhteydessä käyttäjä siirretään automaattisesti takaisin sisäänkirjautumisen sivulle. | `Register.jsx - '/register'` |
| Käyttäjän kirjojen hakeminen | Sisäänkirjautuneen käyttäjän ID:hen linkitetyt kirjat haetaan `books`-pöydästä ja täytetään harmaaseen laatikkoon BookItemeinä. | `Home.jsx - '/home'` |
| Kirjojen suodatus genren mukaan | Harmaan laatikon sisällä olevat kirjaitemit voidaan suodattaa sillä tavalla pudostusvalikosta, että vain kyseisen genren kirjat näkyvät listassa | `Home.jsx - '/home'` |
| Kirjojen lajittelu | Harmaan laatikon sisällä olevat kirjaitemit voidaan lajitella pudotusvalikosta käyttäjän valitsemalla tavalla. Nimi A-Ö ja Ö-A, Kirjailijat A-Ö ja Ö-A, Julkaisupäivä Vanhin-Uusin ja Uusin-Vanhin, Lisäyspäivä Vanhin-Uusin ja Uusin-Vanhin | `Home.jsx - '/home'` |
| Kirjojen hakusuodatus hakupalkin avulla | Harmaan laatikon sisällä olevat kirjaitemit voidaan suodattaa hakemalla nimellä kirjaa hakupalkin avulla | `Home.jsx - '/home'` |
| Käyttäjän uloskirjautuminen | Painamalla uloskirjautumisen painiketta, käyttäjän paikallisesta localStorage:sta tyhjennetään sinne tallennettu JWT-tokeni ja muu informaatio, mikä kirjaa ulos sisäänkirjautuneen käyttäjän | `Home.jsx - '/home'`, `UserSettings.jsx - '/settings'` |
| Kirjojen suodatus genren mukaan | Harmaan laatikon sisällä olevat kirjaitemit voidaan suodattaa sillä tavalla, että vain kyseisen genren kirjat näkyvät listassa | `Home.jsx - '/home'` |
| Kirjojen suodatus genren mukaan | Harmaan laatikon sisällä olevat kirjaitemit voidaan suodattaa sillä tavalla, että vain kyseisen genren kirjat näkyvät listassa | `Home.jsx - '/home'` |
| KirjaItemin painaminen avaa kyseisen kirjan inforuudun | Kirjaitemiä (`BookItem.jsx`) painaminen harmaassa laatikossa vie käyttäjän sen kyseisen kirjan tietosivulle | `Home.jsx - '/home'` |
| Kirjan luonti | Kirjan luonti-ikkunassa täyttämällä kaikki kirjan tiedot niille osotettuihin ruutuihin (nimi, tekijä(t), kuvakkeen URL ja Lataa-painike, julkaisupäivämäärä, kuvaus) ja valitsemalla genret-valikosta kirjalle vähintaan yhden genren, kirja lisätään `books`-pöytään, ja linkitetään käyttähän ID:hen. | `BookForm.jsx - '/new-book'` |
| Kirjan kuvakkeen URL esikatselu | Kirjan kuvakkeen URL täytettyä input-laatikkoon ja painamalla "Lataa"-painiketta esikatselu-laatikkoon tulisi ilmestyä käyttäjän täyttämässä URL:ssä oleva kuva. Muilla sivuilla se näkyy automaattisesti tietokannasta haettuna. | `BookForm.jsx - '/new-book'`, `BookInfo.jsx - '/book/:id'`, `BookEdit.jsx - '/book/edit/:id'` |
| Kyseisen kirjan tietojen hakeminen tietokannasta | Kirjaan täytetyt tiedot haetaan infosivulle lomakkeeseen niille osotetuille kohdille näkyville käyttäjälle | `BookInfo.jsx - '/book/:id'` |
| Kyseisen kirjan poistaminen tietokannasta | Kirja voidaan poistaa `books`-pöydästä painamalla "Poista"-painiketta kyseisen kirjan inforuudusta (`BookInfo.jsx`) | `BookInfo.jsx - '/book/:id'` |
| Kyseisen kirjan muokkauslomakkeelle siirtyminen | Kirjan muokkaus mahdollistetaan menemällä inforuudusta (`BookInfo.jsx`) kirjanmuokkauslomake-sivulle painamalla "Muokkaa"-nappia | `BookInfo.jsx - '/book/:id'` |
| Kyseisen kirjan tietojen hakeminen ja niiden muokaus | Kirjan tiedot haetaan tietokannasta samalla tavalla muokkauslomakkeeseen kuin inforuutuun. Kirjan tietoja kuitenkin voidaan muokkauslomakesivun sisällä muokata käyttäjän mukaan, ja tallentaa tietokantaan kyseisen kirjan tietojen päälle painamalla "Lähetä". | `BookEdit.jsx - '/book/edit/:id'` |



## 3. Dokumentointi

Koodin sisäinen kommentointi on suoritettu suurimmassa osassa tiedostoissa itse. Joissakin tiedostoissa ollaan mainittu, jos niiden dokumentoinnissa ollaan käytetty apuna tekoälyä. CSS-tiedostoja ei olla kommentoitu koska oli myöhä ja tuli väsy. 
Backending `server.js` kommentointi jäi vähäiseksi, eikä sen avuksi käytetty tekoälyä. 

Dokumentoinnissa GitHubin sisällä oleva README.md sisältää ohjeet, jolla asentaa kaiken tarvittavan rakenteen minkä mukaisesti applikaation voi asentaa ja sitä voidaan testata omalla koneella paikallisesti. Katso halutessasi. Tämä on siis ihan tiedostorakenteen juuressa oleva README.md, eikä se mikä on 'frontend'-kansion sisällä.

## 4. Testaus ja virheenkäsittely

Add something

## 5. Käyttöliittymä ja vuorovaikutus

Add something
