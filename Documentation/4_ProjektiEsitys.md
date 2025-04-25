# Vaihe 4 – Projektin esittely

## 🎯 Projektin nimi

Käyttäjäkohtainen kirjahylly

---

## 📝 Projektin yleiskuvaus

Projektin tarkoituksen oli luoda kirjahylly-sovellus, johon käyttäjät pystyisivät lisätä omia kirjamerkintöjään sivustolla olevaan listaan, joka sitten esitettäisiin käyttäjälle. Käyttäjällä olisi mahdollisuus hakea listasta nimen avulla kirjoja, joita hän on itse lisännyt, ryhmitellä näitä kirjoja sille valitun genren (tai genrejen) mukaan, sekä lajitella kirjahyllynsä haluamallaan tavalla pudotusvalikosta. 

Käyttäjällä olisi mahdollisuus lisätä kirja täyttämällä kirjan tiedot lomakkeeseen, sekä lisätä kirjalle kuvake/kuva, jota hän voi esikatsella luontilomakkeesta, sekä nähdä kirjojen lopullisessa listassa.

Kirjoja voisi tulla katselemaan tarkemmin, ja nähdä kaikki kirjalle lisätyt tiedot inforuudusta, joka avautuisi kun kirjan ikonia painaa kirjojen listassa sivustolla. Täältä kirjan inforuudulta voitaisiin sitten painamalla nappia poistaa kirja käyttäjän tietokannasta, tai painamalla muokkaa painiketta siirtyä kirjan muokkaamislomakkeeseen, jossa käyttäjä voisi korvata halutessaan kirjalle täytettyjä tietoja.

Näiden toiminnallisuuksien lisäksi käyttäjä voisi pystyä muuttamaan omaa salasanaansa asetukset-sivulta, jossa hän voi varmistamalla vanhan salasanansa ja uuden salasanansa jälkeen vaihtaa hänelle tallennettua salasanaa. Tämän lisäksi käyttäjä pystyisi poistamaan oman tilinsä halutessaan, mutta hänen täytyy aluksi täyttää oma salasanansa ennen kuin tili voidaan poistaa.

Kaiken toiminnallisuuden takan on myös sisäänkirjautumis- sekä rekisteröintitoiminnallisuudet, jotka mahdollistavat sovelluksen käytön. Käyttäjä voi myös kirjautua ulos painamalla "Kirjaudu ulos" nappia muutamalla sivulla.   
Käyttäjä myös siirretään takaisin sisäänkirjautumiseen, jos hän yrittää päästä millekkään sivuston sivulle ilman kirjautumatta sisään. Sama tapahtuu, että käyttäjä viedään takaisin kotisivulle, jos hän yrittää mennä takaisin sisäänkirjautumis-sivulle sen jälkeen, kun on jo kirjautunut sisään.

---

## 📌 Käyttötapausten yhteenveto

[_Linkki vaiheessa 1 määriteltyihin käyttötapauksiin._](https://github.com/villerauta03/WebDevCourseProject/blob/main/Documentation/1_M%C3%A4%C3%A4rittely-ja-Suunnittelu.md#eli-siis-sovelluksen-toiminnallisuudet-tulevat-olemaan)

| Käyttötapaus | Toteutettu (Kyllä/Ei) | Esittely / Huomiot |
|--------------|------------------------|---------------------|
| Käyttäjän rekisteröinti | Kyllä |  |
| Käyttäjän sisäänkirjautuminen | Kyllä |  |
| Käyttäjän uloskirjautuminen | Kyllä | |
| Käyttäjän automaattinen uudelleenohjaus | Kyllä | Ei määritelty alkusuunnitelmassa. |
| Kirjojen listan näkyvyys | Kyllä | |
| Kirjojen merkitseminen luetuksi | Ei | Toiminnallisuus unohtui kunnes oli liian myöhä. |
| Kirjojen lisäys listaan | Kyllä | Ei voitu lisätä erillistä kuvan tallennusta,<br>käytämme URL.<br>Kirjan genret ei olla tallennettu<br>käyttäjän tietokantaan, vaan<br>itse koodiin.|
| Kirjojen haku listasta | Kyllä | |
| Kirjojen lajittelu pudotusvalikosta | Kyllä | |
| Kirjojen suodatus genren mukaan | Kyllä | Jatkokehityksessä voidaan lisätä käyttäjän<br>mahdollisuus lisätä omat genrensä.<br>Nämä genret tulisi päivittyä automaattise-<br>sti pudotusvalikkoon. |
| Kirjan inforuutu kirjan ikonia painaessa | Kyllä | |
| Kirjan poistaminen inforuudun kautta | Kyllä | |
| Kirjan muokkaaminen inforuudun kautta | Kyllä | |
| Käyttäjän salasanan vaihto | Kyllä | |
| Käyttäjän tilin poistaminen | Kyllä | |

---

## ✍️ Tekninen toteutus

Tekniseen toteutukseen sovellettiin frontendissä Reactia. 

Backendissä, käytimme päämääräisesti Express ja Node.js runkoon, sitten lisättiin teknologioita eri tarkoituksiin.
- **dotenv**: Turvalliseen tietokannan yhteyden konfigurointiin
- **CORS**: Ratkaisee CORS-ongelmia, mahdollistaa pyyntöjen lähettämisen eri alkuperästä.
- **bcryptjs**: Käytetään salasanojen vahvaan hash-toimintaan
- **pg**: PostgreSQL yhteydet
- **jsonwebtoken**: Mahdollistamaan käyttäjäkohtaiset sessiot
- **React Router**: Hoitamaan linkitykset sivujen välillä
- Rekisteröinnin pieni Axios käyttö hallitsemaan HTTP-pyynnön. 

Tietokantanamme käytimme PostgreSQL, jossa kaksi pöytää: users ja books.

Projekti on isännöity pelkästään paikallisella koneella.

📌[Projektin kansiorakenne](https://github.com/villerauta03/WebDevCourseProject/blob/main/Documentation/2_Perusrunko-ja-P%C3%A4%C3%A4toiminnallisuudet.md#projektin-kansiorakenne)

📌[Projektin tarkemmat tekniset tiedot](https://github.com/villerauta03/WebDevCourseProject/blob/main/Documentation/2_Perusrunko-ja-P%C3%A4%C3%A4toiminnallisuudet.md#1-perusrunko-ja-arkkitehtuuri)

---

## 🚂 Kehitysprosessi

Alkuvaiheissa, projekti tuntui olevan helppo ja nopea suoritus, ainakin siis suhteellisesti annettuun ajanmäärään verraten. Tajusin nopeasti, kuinka monia uusia teknologioita minun täytyi hyödyntää sovellukseni onnistuneessa toteutuksessa. Rehellisesti sanoen unohdin dokumentoida koodiin kommenteilla suurimmaksi osaksi mitään, jonka takia lisäisin kaiken kommnetaation vasta loppuvaiheissa. 

Alkuvaiheen hankaluuksia oli monia, kesti muutama päivä ennen kuin edes saatiin yksi sivu valmiiksi. Tapeltiin enimmäkseen frontendin kanssa, ja backendin yhteyden kanssa. Lopulta, kun saimme nämä toimimaan, kiihtyi toteutuksen vauhti tarpeeksi että saimme projektin valmiiksi ennen määrääpäivää. Oli pieniä ongelmia tietokantayhteyksien kanssa, jonka saimme toimimaan helposti sen jälkeen, kun muunnimme HTTPS-yhteydet HTTP-yhteyksiksi. 

Projektin keskivaiheessa suurimmat ongelmat nousivat koodivirheistä, enemminkin frontendin vääristä tyyleistä ja lajitteluista. Kaikki toiminnallisuus onnistui suurimmaksi osaksi ilman lisähaasteita tässä vaiheessa.

Lopputilanteessa ongelmat nousivat isännöinnin aiheessa. Emme saaneet projektia isännöityä muuta kuin paikallisella koneella, johon se rakennettiin. Tuli aika myöhä, ja olin keskittynyt enemmän dokumentaation kirjoitukseen. Oma virtuaalikone oli myös poistanut Ubuntun tietokoneelta ja uudelleenasennus kesti muutaman tunnin, eikä aikaa vain riittänyt.

Saimme kuitenkin kaikki toiminnallisuudet toteutettua onnistuneesti tyydyttävällä tasolla, joten harkitsen projektia onnistuneeksi.

---

## ☀️ Pohdinta ja tuleva kehitys

Mikä toimi yllättävän hyvin, on JWT-tokenien session hallinta. Pidin hyvin siitä, miten helppoa se oikeastaan oli tarkistaa, onko käyttäjä sisäänkirjautunut, ja sisäänkirjautuneen käyttäjän tallennukset. 

Oli hieman hankaluuksia alussa, kun koitimme käyttää TailwindCSS, mutta se ei halunnut asentaa. Oli myös ongelmia PostgreSQL:n käyttöönotossa, sekä frontendin tyylien määrittämisessä nousi enemmän kuin muutama ongelma. Tajusin tuossa lopussa että jokaisella tiedostolla on käytössä joka ikinen tyylitiedosto, mitä määrittelimme koko projektissa.

Jatkokehitysaiheena sanoisin olevan projektin käyttöönoton pilvipalvelussa, jossa voidaan määritellä käyttäjien omien kuvien tallennus kirjojen ikoneiksi, käyttäjien omat lisäämät genret ja merkinnät kirjoihin, sekä kirjojen luetuksi merkintä. Voimme myös harkita käyttäjien välistä kommunikaatiota, esim. toisten kirjojen merkintöjen kommentien lisäämisellä.

---

## 📊 Työtuntien kirjanpito

📌[Linkki alkuperäiseen työtuntien tiedostoon](https://github.com/villerauta03/WebDevCourseProject/blob/main/Logbook.md#project-logbook)

| Pvm | Käytetyt tunnit | Aihe(et) | Tulokset |
|---|---|---|---|
| 16.03.2025 | 1 | Työympäristön alkuasetukset | Valmistelin GitHub repon tulevaa työkuormaa varten ja katsoin opettajan ohjeistusta ensimmäiselle vaiheelle Panoptosta | 
| 18.03.2025 | 3 | 1. Vaiheen alku - Kuvaus ja käyttäjäpersoonat | Päivitin ensimmäisen vaiheen tiedostoa, lisäsin kuvauksen suunnitellusta kirjahyllypalvelusta, lisäsin haluamat toiminnallisuuksien kuvaukset, sekä täytin 3 käyttäjäpersoonaa | 
| 19.03.2025 | 0.5 | 1. Vaiheen alku - Käyttötapaukset ja käyttötilanteet | Vähän päivitystä, suurimmaksi osaksi ideointia | 
| 20.03.2025 | 5 | 1. Vaihe - Käyttötapaukset ja käyttötilanteet, Käyttöliittymän Prototyypit | Kuvattiin jokainen käyttötapaus ja luotiin niille esimerkilliset käyttötapaudet. Sen jälkeen kuvailtiin sivuston prototyypin rakennetta, ja tehtiin Figman avulla prototyyppirakenne, joka on linkattu dokumentoinnissa. | 
| 21.03.2025 | 1.5 | 1. Vaihe - Tietoarkkitehtuuri ja tekninen suunnittelu | Kuvattiin ohjelmistoprojektin käyttöönottoon suunnitellut teknologiat, kielet ja kirjastot. | 
| 22.03.2025 | 2 | 1. Vaihe - Dokumentoinnin viimeistely | Kuvailtiin sovellukseen liittyvä käyttäjätestaus, projektinhallinta ja riskien hallinta. Täytettiin dokumentaatio loppuun asti. Lähetettiin Itsiin palautus. | 
| 31.03.2025 | 3 | UI-kehitys | Rakennettiin käyttöliittymää kirjautumis-sivulle sekä rekisteröinti-sivulle. Toiminnallisuuksia ei, pelkät sivut. | 
| 02.04.2025 | 2 | UI-kehitys ja virheet | Yritettiin lisätä TailwindCSS projektiin. Ei toiminut millään. | 
| 03.04.2025 | 4 | Tappelua PostgreSQL ja projektin käyttöliittymän kanssa | Ei saatu mitään toimimaan, virheitä täysin, heitettiin takaisin edelliseen versioon ennen muokkauksia |
| 05.04.2025 | 3 | Backend ja PostgreSQL | Luotiin PostgreSQL-tietokanta käyttäjätilitoiminnalle ja aloitettiin kasaamaan käyttäjän rekisteröinnin ja kirjautumisen toimintoja |
| 07.04.2025 | 5 | Käyttäjäkirjautumisen ja -rekisteröinnin toiminnallisuudet, sivujen navigoinnin setup | Loimme käyttäjätilille kirjautumisen ja rekisteröinnin toiminnallisuudet, lisäsimme sisäänkirjautumisen vahvistuksen suojatuille sivuille (esim. ellei ole kirjautunut, ei voi mennä `/settings`), index (`/`) ohjaa suoraan joko kirjautumiseen tai kotiruudulle riippuen onko käyttäjä kirjautunut sisään, lisäsimme React-komponentit ja Route-osiot tuleville sivuille jo valmiiksi. | 
| 08.04.2025 | 4 | Kotisivun Frontend | Luotiin kotisivun navigaatiot kunnolla, alettiin rakentamaan frontendia, kehitettiin alkutilanteeseen, voidaan simuloida esimerkki kirjaItemi näkymään testaamaan kirjahyllyn näkyvyyttä. |
| 10.04.2025 | 4 | Kotisivun ja Asetusten frontend | Luotiin kotisivu viimeistelyä päin, tarvitaan enään backend ja kirjainfot. Asetusten frontend myös suoritettu loppuun saakka, toiminnallisuukset täytyy vain lisätä. |
| 11.04.2025 | 8 | Asetusten FrontEnd, Kirjaluonnin FrontEnd kehitystä, salasanan vaihto, käyttäjätilin poisto, muu frontend | Teimme asetussivun ja kotisivun frontendiin muutoksia, nyt valmiina tuloksena. Asetukset sivulle myös lisättiin toiminnallisuus poistaa käyttäjä tai vaihtaa käyttäjän salasanaa. Uloskirjautuminen mahdollistettu applikaatiossa. Aloitettu kirjanluontia, ongelmia frontendissä ja backendin suunnittelussa. |
| 12.04.2025 | 12 | Kaikkien toiminnallisuuksien suoritus | Työstimme koko päivän loppuja toiminnallisuuksia valmiiksi asti. Eri juuri kirjojen luonnin front- ja backend, kirjojen lukeminen kotiruudussa olevaan harmaaseen boksiin, kotiruudun hakutoiminnallisuus, ja listaustoiminnallisuus, ja genrejen perusteinen filter, kirjaa painamalla avautuva inforuutu josta lukea tarkemmat tiedot, inforuudusta voi poistaa varmistuksella kirjan, kirjaa vi muokata inforuudun kautta, ja muutokset tallentuvat kun painaa ok, jokaiselle sivulle määritely navigaatioesto. | 
| 13.04.2025 | 8 | Kommenttien lisäys ja hitsaus, dokumentaation päivitys, loppumuokkaukset ja pienkorjaukset, ohjeistuksen tekeminen README.md kansioon | Tehtiin viime hetken korjauksia CSS ja tyyleihin, kirjoitettiin 2. vaiheen dokumentaatio alusta loppuun kattavasti ja luotiin applikaation käyttöönotto ohjeistukset README.md tiedostoon. Lisäsimme koodiimme myös kommentteja tarpeen mukaan, ja paransimme jo olemassaolevia kommentteja. |
| 25.04.2025 | 2 | Dokumentaation viimeistely 4. vaiheeseen, sekä projektin esittelyvideon tekeminen ja linkittäminen. | 


Yhteensä käytetyt tunnit: **68**

---

## 🪢 Esityksen linkki

_Lisää linkki videomuotoiseen esitykseen tai mainitse, jos se esitettiin livenä._
