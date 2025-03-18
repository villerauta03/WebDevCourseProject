# Projektin 1. vaihe - Määrittely ja Suunnittelu
Projektin aiheena on käyttäjän hallitsema kirjahylly. Käyttäjä saa lisättyä omaan personalliseen valikoimaansa omalla tilillään kirjoja, luokitella ne eri genreihin, merkata kirjat luetuksi, ja jättää 1-5 arvion kirjasta, jos se on merkitty luetuksi, sekä lisätä arvion mukaan pienen muistiinpanon.  
Kirjan lisäämiseen kirjahyllyyn kuuluu kirjan nimen, kuvauksen, kansikuvan, julkaisupäivän, kirjaajan/kirjaajien nimi/nimet täyttäminen, sekä kirjalle saa valittua esitäytetyistä sovelluksessa olevista kategorioista valita kirjalle genre (yksi tai useampi). Käyttäjällä on myös mahdollisuus lisätä sovellukseen omat genret olemassaolevaan listaan. Käyttäjä saa poistaa omia lisäämiä genrejään, mutta ei sovelluksessa jo olemassaolevia genrejä. 

### Eli siis sovelluksen toiminnallisuudet tulevat olemaan:

**Käyttäjien hallinta:**
  - Verkkosivuston käyttäjä rekisteröi verkkosivuille oman tilinsä, jonka avulla hän voi sitten kirjautua sisään ja käyttää sovellusta.
  - Käyttäjätilin voi poistaa käyttäjän omista asetuksista.
  - Käyttäjän asetuksissa olla myös mahdollisuus käyttäjälle vaihtaa nimeä tai salasanaa.

**Kirjahyllyn hallinta:**
  - Käyttäjä voi lisätä kirjan virtuaaliseen kirjahyllyynsä, joka tallennetaan käyttäjän omalle käyttäjätilille.
  - Käyttäjällä myös mahdollisuus muokata näitä kirjoja kirjahyllyssänsä, tai poistaa kirjoja kirjahyllystään.
  - Käyttäjä voi merkitä lisäämänsä kirjat luetuksi. Jos kirja on merkattu luetuksi, käyttäjä voi jättää arvioinnin asteikosta 1-5 kirjalle, joka tallennetaan kirjan tietoihin.
      - **Huom:** Käyttäjä voi lisätä vain yhden arvioinnin yhdelle kirjalle. Käyttäjä voi kuitenkin muokata omaa arviointiaan kirjasta.
    
**Kirjan lisääminen:**
  - Kirjan lisääminen kirjahyllyyn tapahtuu lomakkeen kautta.
  - Lomakkeessa kirjalle täytetään kirjan nimi, kuvaus, julkaisupäivämäärä, kirjailijan/kirjailijoiden nimet, kirjan kansikuva (jonka käyttäjä itse lähettää tiedostona), sekä kirjan genre(t).
  - Kirjan genre(t) tullaan valitsemaan listasta, jossa on lueteltu käyttäjän tilille kaikki tallennetut genret. Käyttäjä voi tästä listasta valita kirjalle yhden tai useamman genren.

 **Genrejen hallinta:**
   - Käyttäjän tilille on tallennettu lista genreistä, johon käyttäjällä on mahdollisuus käydä luomassa omia uusia genrejä listaan.
   - Jokaisella käyttäjällä on sovelluksesa oletuslista genreistä, ja näihin oletusgenreihin käyttäjä ei voi vaikuttaa.
   - Käyttäjä voi poistaa tai mukauttaa omia genrejään halutessaan.  

## 1. Käyttäjäpersoonat 
Käyttäjäpersoonat kuvaavat kuvitteellisen sovelluksen käyttäjän, ja miten tämä kyseinen käyttäjä käyttää sovellusta. Käyttäjäpersoonien avulla voimme esitellä sovelluksen keskeisten toimintojen käyttötapauksia, sekä antaa esimerkkejä siitä, millä tavalla sovellusta voitaisiin mahdollisesti käyttää. 

### 1. Anneli Aktiivi
- **Kuvaus:** Anneli on 28-vuotias ammattikorkeakouluopiskelija, joka on pitänyt kirjojen lukemista harrastuksenaan pienestä asti. Hän ei yleensä itse osta kirjoja kotiinsa, vaan lainaa ja lukee kirjoja kirjastosta, josta hän lainaa monipuolisia genrejä.
- **Tavoitteet ja tarpeet:** Anneli haluaa pitää digitaalista muistia lukemistaan kirjoista. Annelin mielestä sovelluksen mukana ei tarvitsisi olla liikaa lisätoiminnallisuuksia, kunhan perustoiminnallisuudet onnistuvat haluamallaan tavalla. Hän haluaisi mahdollisuuden selata ja hakea luettuja kirjojaan kirjahyllystä.  
- **Haasteet ja esteet:** Anneli on kokeillut samankaltaisia sivustoja ennen, mutta nämä sivustot olivat hänen mielestään liian monimutkaisia haluamaansa tarkoitukseen. Hän ei halua kirjasuosituksia tai ostoksia tai mainoksia, vaan pelkästään pitää omaa muistia lukemistaan kirjoistaan. Anneli on myös käyttänyt aiemmin omalla koneellaan muistiinpanoja, mutta haluaisi että hän voisi katsoa kirjamuistiansa eri laitteilta. 
- **Tyypillinen käyttötapaus:**
    1. Anneli lainaa kirjastosta kirjan luettavaksi. Hän kirjautuu sisään tililleen ja lisää kirjan heti kirjahyllyynsä sovelluksessa.
    2. Anneli lukee kirjansa loppuun. Hän palauttaa kirjan kirjastoon, ja merkitsee kirjan luetuksi palvelussa.
    3. Anneli katsoo luettujaan kirjojaan, ja niiden perusteella päättää mitä lukea seuraavaksi. Hän lainaa uuden kirjan ja lisää sen lukulistalleen. 

### 2. Leevi Lajittelija
- **Kuvaus:** Leevi on 35-vuotias kirjallisuuden harrastaja ja suomenkielen intoilija. Hän lukee paljon tietokirjoja ja klassikoita, ja hän tykkää lajitella kirjojaan omien luokitustensa mukaan.
- **Tavoitteet ja tarpeet:** Leevi haluaa tallentaa lukemiaan kirjojaan johonkin helppokäyttöiseen palveluun, joka antaa hänelle mahdollisuuden lisätä omia luokituksiansa kirjoille ja lajitella niitä näiden luokitusten mukaan. Koska hän lukee monia tietokirjoja, hän haluaa antaa jokaiselle lukemalle kirjalleen oman lajituksensa kirjan aiheen perusteella.
- **Haasteet ja esteet:** Leevi haluaisi löytää helpommin tietokirjoja ja vanhoja kirjoja. Hän on lukenut niin monta, että hänellä on hankaluuksia lajitella listaa kirjoista, joita hän on jo lukenut. Kaikki mainonnat toisilta sivustoilta kuitenkin antavat hänelle vain mainoksia kirjoista, joita hän on jo lukenut, tai jotka eivät sovi hänen kirjakokoelmaansa.
- **Tyypillinen käyttötapaus:**
    1. Leevi hankkii uuden kirjan, ja alkaa täyttämään kirjan tietoja lomakkeeseen.
    2. Leevi lisää oman lajituksensa kirjalle (itseluoman genren), tai tarpeen mukaan luo uuden genren kirjalle, jos hän ei ole aiemmin lukenut kyseisestä aiheesta.
    3. Kirjan lisättyä kirjahyllyynsä, hän lukee sen läpi ja merkkaa sen luetuksi.
    4. Leevi etsii uuden kirjan ja toistaa käyttötapauksen.

### 3. Päivi Perheäiti
- **Kuvaus:** Päivi on 42-vuotias perheen äiti, jolla on kaksi pientä lasta. Hän yleensä lukee lapsillensa kirjoja iltaisin auttamaan heitä uneen. Päiville on tärkeää muistaa, mitkä kirjoista auttoi häntä parhaiten saada lapset uneen.
- **Tavoitteet ja tarpeet:** Päivi haluaa tallentaa kirjoja listaan, josta hän voi sitten arvioida niitä sen perusteella kuinka hyviä tarinat olivat iltasatuina. Hän haluaisi mahdollisuuden järjestellä kirjahyllyn hänen arviointinsa perusteella. Päiville on myös plussaa, jos kirjat saisi lajitella eri luokkiin sen perusteella kumpi lapsista piti kirjasta enemmän.
- **Haasteet ja esteet:** Päivi lukee monia kirjoja lapsilleen, mutta hänellä ei ole tapa pitää muistissa mitä hän on jo lukenut, ja usein unohtaa ennen kuin lapset valittavat asiasta. Päivi on myös kiireinen päivisin, joten hänellä ei ole aikaa oppia käyttämään monimutkaista sivustoa tähän tarkoitukseen.
- **Tyypillinen käyttötapaus:**
    1. Päivi lisää kirjahyllyynsä kirjan ja täyttää sen tiedot ennen kuin lukee sen lapsilleen.
    2. Kun lapset nukahtavat, Päivi avaa sivuston uudelleen ja antaa sille arvion asteikolla 1-5 sen perusteella kuinka nopeasti lapset nukahtivat.
    3. Jos jompikumpi lapsi vaikutti pitävän kirjasta enemmän, hän muokkaa kirjan tietoja ja lisää itsetekemän genren kirjan tietoihin. (Esim. "Lapsi 1 piti", "Lapsi 2 piti")
    4. Kirjan arvion perusteella hän päättää huomiselle, lukeeko lapsille saman kaltaisen kirjan vai koittaako erilaista kirjaa.

### 4. Teemu Tavoitteellinen
- **Kuvaus:** Teemu on 25-vuotias opiskelija ja itsensä kehittämisestä kiinnostunut lukija. Hän lukee pääasiassa itsensä kehittämiseen liittyviä kirjoja, kuten bisneskirjallisuutta, psykologiaa ja elämäntaito-oppaita. Hän asettaa itselleen tavoitteita luettujen kirjojen määrässä ja haluaa seurata edistymistään.
- **Tavoitteet ja tarpeet:** Teemu haluaa pitää kirjaa lukemistaan kirjoista ja asettaa lukutavoitteita itselleen. Hän haluaisi seurata edistymisestään visuaalisesti, kuten kuinka monta kirjaa hän on lukenut. Hänelle olisi tärkeää, että sovelluksesta löytyisi selkeä tapa nähdä kuinka monta kirjaa hän on lukenut yhteensä.
- **Esteet ja haasteet:** Teemu haluaisi lajitella kirjansa sen mukaan, milloin hän on lukenut sen, tai milloin hän haluaisi, että kirja on luettuna. Hän on kokeillut monia eri lukulistasovelluksia ja muistiinpanosovelluksia, mutta hän ei ole löytänyt mitä etsii.
- **Tyypillinen käyttötapaus:**
    1. Teemu lisää uuden kirjansa kirjahyllyynsä, sekä luo sille oman genren, jonka nimeksi hän asettaa kuukauden nimen, milloin haluaa että kirja on luettuna
    2. Teemu lukee kirjan läpi, ja merkitsee sen luetuksi. Teemu muokkaa kirjan genreä tarvittaessa, jos hän sai kirjan luettuna kuukausi ennen tai jos kirjan lukeminen viivähtyi ensi kuulle.
    3. Teemu löytää uuden kirjan ja toistaa käyttötapauden.

## 2. Käyttötapaukset ja käyttötilanteet

## 3. Käyttöliittymän prototyypit

## 4. Tietoarkkitehtuuri ja tekninen suunnittelu

## 5. Projektinhallinta ja käyttäjätestaus
