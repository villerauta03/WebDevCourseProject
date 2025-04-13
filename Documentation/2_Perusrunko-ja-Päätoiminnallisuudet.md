# Projektin 2. vaihe - Perusrunko ja päätoiminnallisuudet

yms yms yms

## 1. Ympäristö

Add something

## 2. Backend

Add something

## 3. Frontend

Add something

## 4. Tietokanta

Add something

## 5. Perusrunko ja arkkitehtuuri

Verkkosovelluksemme on toteutettu käyttäen Reactia, Node.js ja Express, sekä PostgreSQL tietokantana. Tietokannassamme on kaksi eri pöytää, `users` ja `books`. Backendimme server.js kautta kutsumme useita eri API-kutsuja, jotka suorittavat toiminnallisuuksia React-koodiimme perustuen. Tyylitiedostomme olemme luoneet itse perus CSS käyttäen.  

### Käytetyt lisäteknologiat
- **Express**: Käytetään luomaan HTTP-palvelin, tarjoaa reitityksen ja middleware-tuen.
- **dotenv**: Lataa ympäristömuuttujat `.env` tiedostosta (user: process.env.DATABASE_USER, host: process.env.DATABASE_HOST,database: process.env.DATABASE_NAME, password: process.env.DATABASE_PASSWORD, port: process.env.DATABASE_PORT). Käytetään konfiguroimaan sovellus turvallisesti esimerkiksi tietokannan ja salausavainten yhteydessä.
- **CORS** (Cross-Origin Resource Sharing): Mahdollistaa pyyntöjen lähettämisen eri alkuperästä, kuten frontendistä backendille. Ratkaisee CORS-ongelmia, joita voi ilmetä, kun verkkosovellus käyttää API:a.
- **bcryptjs**: Hashaa ja vertaa salasanoja turvallisesti. Käytetään varmistamaan, että tallennetut salasanat eivät ole suoraan luettavissa tietokannasta.
- **pg** (PostgreSQL): Mahdollistaa tietokantakyselyt PostgreSQL:n kanssa. Käytetään esimerkiksi tietojen tallentamiseen ja hakemiseen tauluista.
- **jsonwebtoken** (JWT): Luo ja vahvistaa JSON Web Token -tokeneita. Käytetään autentikoinnissa, jotta käyttäjän istunto pysyy suojattuna.
- **React Router**: Käytetään reitityksessä React-sovelluksessa. Tarjoaa navigointifunktion käyttäjän siirtämiseksi eri sivuille.
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
- app.post("/api/register", async (req, res) => {
- app.post("/api/login", async (req, res) => {
- app.delete("/api/delete-account", authenticateToken, async (req, res) => {
- app.post("/api/change-password", authenticateToken, async (req, res) => {
- app.get("/api/my-books", authenticateToken, async (req, res) => {
- app.post("/api/save-book", authenticateToken, async (req, res) => {
- app.get("/api/my-books/:id", authenticateToken, async (req, res) => {
- app.delete('/api/my-books/:id', authenticateToken, async (req, res) => {
- app.put('/api/my-books/:id', authenticateToken, async (req, res) => {
  
Useassa kohdassa viitataan `const authenticateToken = (req, res, next) => {`, joka hallitsee JWT-tokenin validoinnin hakemalla sille lähetetystä `Authorization` headeristä `Bearer <token>` JWT-tokenin, joka tarkistetaan `jwt.verify()`:n avulla käyttämällä sovelluksessa määriteltyä salausavainta (jwtSecretKey). Validit tokenit palauttavat dekoodatut tiedot req.user objektiin käytettäväksi.  

## 6. Toiminnallisuudet

Add something

## 7. Koodin laatu ja dokumentointi

Add something

## 8. Testaus ja virheenkäsittely

Add something

## 9. Käyttöliittymä ja vuorovaikutus

Add something
