# Projektin 1. vaihe - Määrittely ja Suunnittelu
Projektin aiheena on käyttäjän hallitsema kirjahylly. Käyttäjä saa lisättyä omaan personalliseen valikoimaansa omalla tilillään kirjoja, luokitella ne eri genreihin, sekä merkata kirjat luetuksi.
Kirjan lisäämiseen kirjahyllyyn kuuluu kirjan nimen, kuvauksen, kansikuvan, julkaisupäivän, hyllyynlisäyspäivän, kirjaajan/kirjaajien nimi/nimet täyttäminen, sekä kirjalle saa valittua esitäytetyistä sovelluksessa olevista kategorioista valita kirjalle genre (yksi tai useampi).

### Eli siis sovelluksen toiminnallisuudet tulevat olemaan:

**Käyttäjien hallinta:**
  - Verkkosivuston käyttäjä rekisteröi verkkosivuille oman tilinsä, jonka avulla hän voi sitten kirjautua sisään ja käyttää sovellusta.
  - Käyttäjätilin voi poistaa käyttäjän omista asetuksista.
  - Käyttäjän asetuksissa olla myös mahdollisuus käyttäjälle vaihtaa salasanaa.

**Kirjahyllyn hallinta:**
  - Käyttäjä voi lisätä kirjan virtuaaliseen kirjahyllyynsä, joka tallennetaan käyttäjän omalle käyttäjätilille.
  - Käyttäjällä myös mahdollisuus muokata näitä kirjoja kirjahyllyssänsä, tai poistaa kirjoja kirjahyllystään.
  - Käyttäjä voi merkitä lisäämänsä kirjat luetuksi.
    
**Kirjan lisääminen:**
  - Kirjan lisääminen kirjahyllyyn tapahtuu lomakkeen kautta.
  - Lomakkeessa kirjalle täytetään kirjan nimi, kuvaus, julkaisupäivämäärä, hyllyynlisäyspäivämäärä, kirjailijan/kirjailijoiden nimet, kirjan kansikuva (jonka käyttäjä itse lähettää tiedostona), sekä kirjan genre(t).
  - Kirjan genre(t) tullaan valitsemaan listasta, jossa on lueteltu käyttäjän tilille kaikki tallennetut genret. Käyttäjä voi tästä listasta valita kirjalle yhden tai useamman genren.

## 1. Käyttäjäpersoonat 
Käyttäjäpersoonat kuvaavat kuvitteellisen sovelluksen käyttäjän, ja miten tämä kyseinen käyttäjä käyttää sovellusta. Käyttäjäpersoonien avulla voimme esitellä sovelluksen keskeisten toimintojen käyttötapauksia, sekä antaa esimerkkejä siitä, millä tavalla sovellusta voitaisiin mahdollisesti käyttää. 

### 1.1 - Anneli Aktiivi
- **Kuvaus:** Anneli on 28-vuotias ammattikorkeakouluopiskelija, joka on pitänyt kirjojen lukemista harrastuksenaan pienestä asti. Hän ei yleensä itse osta kirjoja kotiinsa, vaan lainaa ja lukee kirjoja kirjastosta, josta hän lainaa monipuolisia genrejä.
- **Tavoitteet ja tarpeet:** Anneli haluaa pitää digitaalista muistia lukemistaan kirjoista. Annelin mielestä sovelluksen mukana ei tarvitsisi olla liikaa lisätoiminnallisuuksia, kunhan perustoiminnallisuudet onnistuvat haluamallaan tavalla. Hän haluaisi mahdollisuuden selata ja hakea luettuja kirjojaan kirjahyllystä.  
- **Haasteet ja esteet:** Anneli on kokeillut samankaltaisia sivustoja ennen, mutta nämä sivustot olivat hänen mielestään liian monimutkaisia haluamaansa tarkoitukseen. Hän ei halua kirjasuosituksia tai ostoksia tai mainoksia, vaan pelkästään pitää omaa muistia lukemistaan kirjoistaan. Anneli on myös käyttänyt aiemmin omalla koneellaan muistiinpanoja, mutta haluaisi että hän voisi katsoa kirjamuistiansa eri laitteilta. 
- **Tyypillinen käyttötapaus:**
    1. Anneli lainaa kirjastosta kirjan luettavaksi. Hän kirjautuu sisään tililleen ja lisää kirjan heti kirjahyllyynsä sovelluksessa.
    2. Anneli lukee kirjansa loppuun. Hän palauttaa kirjan kirjastoon, ja merkitsee kirjan luetuksi palvelussa.
    3. Anneli katsoo luettujaan kirjojaan, ja niiden perusteella päättää mitä lukea seuraavaksi. Hän lainaa uuden kirjan ja lisää sen lukulistalleen. 

### 1.2 - Leevi Lajittelija
- **Kuvaus:** Leevi on 35-vuotias kirjallisuuden harrastaja ja suomenkielen intoilija. Hän lukee paljon tietokirjoja ja klassikoita, ja hän tykkää lajitella kirjojaan niiden luokitusten mukaan.
- **Tavoitteet ja tarpeet:** Leevi haluaa tallentaa lukemiaan kirjojaan johonkin helppokäyttöiseen palveluun, joka antaa hänelle mahdollisuuden lajitella ja hakea kirjojaan. Koska hän lukee monia tietokirjoja, hän haluaa helpon tavan hakea kirjoja nimellä. 
- **Haasteet ja esteet:** Leevi haluaisi löytää helpommin tietokirjoja ja vanhoja kirjoja. Hän on lukenut niin monta, että hänellä on hankaluuksia lajitella listaa kirjoista, joita hän on jo lukenut. Kaikki mainonnat toisilta sivustoilta kuitenkin antavat hänelle vain mainoksia kirjoista, joita hän on jo lukenut, tai jotka eivät sovi hänen kirjakokoelmaansa.
- **Tyypillinen käyttötapaus:**
    1. Leevi hankkii uuden kirjan, ja alkaa täyttämään kirjan tietoja lomakkeeseen.
    2. Leevi lisää kirjalle genren, ja antaa kirjan nimessä sille erityisen merkin, jonka avulla hän voi myöhemmin hakemalla sen löytää.
    3. Kirjan lisättyä kirjahyllyynsä, hän lukee sen läpi ja merkkaa sen luetuksi.
    4. Leevi etsii uuden kirjan ja toistaa käyttötapauksen.

### 1.3 - Päivi Perheäiti
- **Kuvaus:** Päivi on 42-vuotias perheen äiti, jolla on kaksi pientä lasta. Hän yleensä lukee lapsillensa kirjoja iltaisin auttamaan heitä uneen. Päiville on tärkeää muistaa, mitkä kirjoista olivat lasten suosikkeja.
- **Tavoitteet ja tarpeet:** Päivi haluaa tallentaa kirjoja listaan, josta hän voi sitten myöhemmin muistella mitkä kirjat sopivat parhaiten iltasatuina. Päiville on myös plussaa, jos kirjat saisi lajitella helposti niiden julkaisupäivämäärän mukaan. 
- **Haasteet ja esteet:** Päivi lukee monia kirjoja lapsilleen, mutta hänellä ei ole tapa pitää muistissa mitä hän on jo lukenut, ja usein unohtaa ennen kuin lapset valittavat asiasta. Päivi on myös kiireinen päivisin, joten hänellä ei ole aikaa oppia käyttämään monimutkaista sivustoa tähän tarkoitukseen.
- **Tyypillinen käyttötapaus:**
    1. Päivi lisää kirjahyllyynsä kirjan ja täyttää sen tiedot ennen kuin lukee sen lapsilleen.
    2. Kun lapset nukahtavat, Päivi avaa sivuston uudelleen ja päivittää kirjan kuvausta sen perusteella kuinka hyvin se sopi iltasatuna.
    3. Kirjan vaikutuksen perusteella hän päättää huomiselle, lukeeko lapsille saman kaltaisen kirjan vai koittaako erilaista kirjaa.

### 1.4 - Teemu Tavoitteellinen
- **Kuvaus:** Teemu on 25-vuotias opiskelija ja itsensä kehittämisestä kiinnostunut lukija. Hän lukee pääasiassa itsensä kehittämiseen liittyviä kirjoja, kuten bisneskirjallisuutta, psykologiaa ja elämäntaito-oppaita. Hän asettaa itselleen tavoitteita luettujen kirjojen määrässä ja haluaa seurata edistymistään.
- **Tavoitteet ja tarpeet:** Teemu haluaa pitää kirjaa lukemistaan kirjoista ja asettaa lukutavoitteita itselleen. Hän haluaisi seurata edistymisestään visuaalisesti, kuten kuinka monta kirjaa hän on lukenut. Hänelle olisi tärkeää, että sovelluksesta löytyisi selkeä tapa nähdä kuinka monta kirjaa hän on lukenut yhteensä.
- **Esteet ja haasteet:** Teemu haluaisi lajitella kirjansa sen mukaan, milloin hän on lukenut sen.
- **Tyypillinen käyttötapaus:**
    1. Teemu lisää uuden kirjansa kirjahyllyynsä, ja merkitsee kirjan hyllyynlisäämispäivämäärän itselleen muistiin.
    2. Teemu lukee kirjan läpi, ja merkitsee sen luetuksi. 
    3. Teemu löytää uuden kirjan ja toistaa käyttötapauden.

## 2. Käyttötapaukset ja käyttötilanteet
Tässä osiossa käymme läpi eri ohjelmistoprojektin toiminnallisuuksien osuuksia, ja miten ohjelmistoa on mahdollista käyttää.  


### 2.1 - Käyttäjän rekisteröityminen ja kirjautuminen
Käyttäjän kirjautumiseen ja rekisteröitymiseen liittyy kaksi mahdollista tapahtumaa:
  - Käyttäjä voi rekisteröidä uuden käyttäjätilin syöttämällä sähköpostiosoitteen ja salasanan.
  - Käyttäjä voi kirjautua tililleen sähköpostisosoitteen ja salasanan avulla.
    
**Tyypillinen käyttötapaus:**
  - Käyttäjä täyttää sähköpostiosoitteensa sekä valitsemansa salasanan rekisteröintiruutuun, jolloinka rekisteröinti onnistuu ellei samalla sähköpostiosoitteella ole olemassa jo tiliä. (Tässä tapauksessa käyttäjä saa virheilmoituksen)
  - Jo rekisteröidyllä tilillä käyttäjä pystyy kirjautumaan sisään sovellukseen kirjautumisruudun kautta.


### 2.2 - Kirjan lisääminen kirjahyllyyn 
Käyttäjillä on mahdollisuus lisätä kirjojen tietoja omaan virtuaaliseen kirjahyllyynsä palvelussa, sen jälkeen kun on kirjautunut sisään.
  - Kirjan tiedot täytetään lomakkeen avulla (Nimi, Kuvaus, Julkaisupäivämäärä, Hyllyynlisäyspäivämäärä, Kirjailija(t), Kansikuva, Genre)
  - Genre valitaan sovelluksen sisäisestä listasta, jossa on tallennettu lukuinen määrä genrejä. 
  - Lisätyt kirjat ja niiden tiedot tallennetaan käyttäjän tietokantaan.
    
**Tyypillinen käyttötapaus:**
  - "Lisää kirja"-painiketta painimalla käyttäjälle avautuu lomake, jonka täyttämällä hän voi lisätä kirjansa tiedot näkyville palvelun sisäiseen listaan (jota kutsutaan kirjahyllyksi).
  - Kun lomake on täytetty, painamalla "Lähetä"-painiketta lomakkeen sisällä lisää täytetyn kirjan tiedot tietokantaan.  

### 2.3 - Kirjan merkitseminen luetuksi ja arvioiminen
Kun kirja on lisätty kirjahyllyyn, se voidaan merkitä luetuksi valintapainikkeen avulla. Kun kirja on merkitty luetuksi, ilmestyy kirjan tietoihin 
  - Kun kirjan tiedot on täytetty, ja se löytyy kirjahyllystä, voi sen merkitä luetuksi kirjahyllyssä valintapainikkeen avulla.
  - Valintapainikkeen voi painaa myös pois.

**Tyypillinen käyttötapaus:**
  - Kun käyttäjä on lisännyt kirjansa sovelluksen sisäiseen listaan, ja hän on lukenut kyseisen kirjan läpi, hän avaa kirjan tiedot painamalla kirjan ikonia, ja kirjan tietojen sivulta löytymää valintapainiketta painamalla merkitsee kirjan luetuksi.
  - Käyttäjällä myös mahdollisuus painaa uudestaan valintapainiketta merkatakseen kirjan luettomaksi.

### 2.4 - Kirjahyllyn selaaminen ja kirjojen hakeminen
Kun kirjan tiedot on täytetty lomakkeeseen ja lähetetty, se tallentuu sovellukseen käyttäjäkohtaiseen tietokantaan. Tätä tietokantaa haetaan täyttämään sovelluksen sisällä olevaa listaa käyttäjän lisäämillä kirjoilla.
  - Käyttäjä voi selata sovelluksen sisäisestä listasta (kirjahyllystä) hänen lisäämiään kirjojaan
  - Käyttäjä voi suodattaa kirjahyllyä kirjan nimen, kirjailijan nimen, julkaisupäivämäärän, hyllyynlisäämispäivämäärän, tai kirjan genren mukaan.
  - Käyttäjä voi myös hakea kirjoja sen nimen tai kirjailijan nimen mukaan.  

**Tyypillinen käyttötapaus:**
  - Kun käyttäjä on lisännyt merkitsevän määrän kirjoja kirjahyllyynsä, hän lajittelee ne julkaisupäivämäärän mukaan löytääkseen kirjastokokoelmansa vanhimmat kirjat.
  - Käyttäjä myös hakee kirjahyllystänsä erään kyseisen kirjailijan kirjoja kirjailijan nimen mukaan.

### 2.5 - Kirjan tietojen muokkaaminen tai sen poistaminen
Kirjahyllyyn lisättyjen kirjojen tietoja on myös mahdollista poistaa, tai kirja jopa kokonaan poistaa kirjahyllystä käyttäjän halun mukaan.
  - Kun kirjahyllystä painetaan kirjan ikonia, se avautuu uudelle sivulle, josta kirjan tarkemmat tiedot voidaan nähdä.
  - Kirjan tietojen sivulla on nappi "Muokkaa", jonka avulla kaikki kirjan tiedot avautuvat lomakkeelle, jota käyttäjä voi muokata haluamansa mukaan.
  - Kirjan tietojen sivulla on nappi "Poista", jota painamalla avautuu varmistusruutu, joka kysyy käyttäjältä hänen varmuuttaan. Jos käyttäjä painaa tasta ruudusta "Kyllä", kirja poistetaan käyttäjän tietokannasta.

**Tyypillinen käyttötapaus:**
  - Käyttäjä huomaa lisänneensä väärän genren kirjaansa. Hän avaa kirjan tietojen sivu, painaa "Muokkaa"-painiketta, ja vaihtaa kirjan genret sopivaksi.
  - Käyttäjä on lisännyt kirjahyllyynsä kirjan, jota häntä ei enää kiinnosta. Hän avaa kirjan tietojen sivun, painaa "Poista"-painiketta, varmistaa valintansa, ja poistaa kirjan tietokannastaan.


## 3. Käyttöliittymän prototyypit
Sovelluksen käyttöliittymän prototyypeillä viitataan käyttöliittymän näyttämiseen tai kuvaamiseen sillä tavalla, että ohjelmointiprosessia aloittaessa projektia työstävä tiimi ymmärtää, minkälaista käyttöliittymää tullaan rakentamaan. Käyttöliittymän prototyypeillä myös näytetään vähän miltä projekti tulisi näyttämään eri laitteilla responsiivisuuden vuoksi.
Tässä suunnitelmassa tulemme aluksi kuvaamaan tekstin avulla miten eri sivut tullaan laatimaan ja miten niiden väliset siirtymiset tulevat toimimaan. Tulemme myös tekemään prototyyppejä Figman avulla.


### 3.1 - Kuvaukset käyttöliittymän näkymistä
  - **Kirjautumisruutu:** Tämä on ensimmäinen ruutu joko avautuu sovelluksessa. Näytöllä ilmestyy sisäänkirjautumistekstiruudut, johon käyttäjä täyttää salasanan ja sähköpostiosoitteen. Näiden tekstiruutujen alla on nappi "Kirjaudu", jota painamalla käyttäjä pääsee kirjautumaan sisään, jos hän on asettanut oikeat tiedot tekstiruutuihin.  
Sivulla on myös nappi, jossa lukee "Rekisteröidy". Tätä nappia painamalla avautuu lomake/sivu, johon käyttäjä täyttää sähköpostiosoitteen ja salasanan tililleen, ja painamalla "OK" näppäintä käyttäjä luo tilinsä, ja hänet siirretään takaisin tavalliselle kirjautumisruudulle.
      - "Rekisteröidy"-nappi siirtää käyttäjän rekisteröintilomakkeeseen.
      - Jos tiedot oikein, "Kirjaudu"-nappi siirtää käyttäjän sovelluksen päänäkymään.  

    
  - **Päänäkymä:** Tämä on sivu, jonka käyttäjä näkee kun hän on kirjautunut sisään. Siihen sisältyy kirjahylly (vie suurimman osan sivusta keskellä), hakupalkki (kirjahyllyn päällä), "Luo"-nappi kirjalle (hakupalkkia toisella puolella sivua, kirjahyllyn päällä), eri kirjojen ikonien painauksilla avautuvat kirjatietosivut (kirjan kansi, kirjahyllyn sisällä), lajitteluvalikko (hakupalkin vieressä), sekä käyttäjätilien oikeassa ylänurkassa istuva "Asetukset"-nappi.  
Hakupalkilla kirjan etsiminen tulisi muokkaamaan kirjahyllynäkymää antamaan hyllylle vain ne kirjat, joiden nimet tai kirjailijoiden nimet vastaavat palkkiin annettua tekstiä.  
Lajitteluvalikoiman avulla kirjahyllyn tulisi lajittelemaan kirjat valikoiman perusteella (eli järjestellä esimerkiksi A-Z aakkosjärjestyksellä jos lajitelmavalikointi on "kirjan nimi" tai "kirjailijan nimi") 
      - "Luo"-nappi avaa käyttäjälle kirjan luonnin lomakeruudun, johon käyttäjä täyttää kirjan tiedot.
      - Kirjan ikonia painamalla käyttäjälle avautuu kirjatietoruutu, jossa käyttäjä voi nähdä kirjan tarkemmat tiedot.
      - "Asetukset"-nappia painamalla käyttäjälle avautuu käyttäjän asetukset ruutu, jossa käyttäjä voi muokata tietojaan tai poistaa tilinsä.  

        
  - **Kirjan luontilomake:** Sivulla on lomake, johon on käyttäjän tarkoitus täyttää kirjan tiedot. Sivulla on eri tekstipalkkeja, johon täytetään kirjan nimi, kirjan kuvaus, kirjailijoiden nimet, sekä kirjan julkaisupäivämäärä. Kirjan hyllyynlisäämispäivämäärä tultaisiin automaattisesti hakemaan koneesta. Kirjan täyttölomakkeen alapuolella oikealla sivulla on kaksi nappia: "Lähetä"-nappi, joka täyttää annetut tiedot tietokantaan, sekä "Peru"-nappi.
      - "Peru"-nappia painamalla, käyttäjä siirretään takaisin päänäkymään ilman lisäämättä kirjaa kirjahyllyyn.
      - "Lähetä"-nappia painamalla, kirja lisätään käyttäjän tietokantaa, ja käyttäjä siirretään päänäkymään.


  - **Kirjatietoruutu:** Sivulla on tarkempaa tietoa kyseisestä kirjasta, kuin mitä kirjahyllynäkymästä saa selville. Sivulla on keskeinen näkymä, missä näkyy kirjan kansilehti, nimi, kuvaus, kirjailijoiden nimet, julkaisupäivämäärä, hyllyynlisäyspäivämäärä, ja kirjan genret. Eli kaikki ne tiedot, mitä käyttäjä lisäsi kirjan lisäyslomakkeessa. Tietojen yläpuolella on kolme nappia. Vasemmalla puolella on "Takaisin"-nappi, oikealla puolella kaksi nappia: "Muokkaa"-nappi, sekä "Poista"-nappi.
      - "Takaisin"-nappi vie käyttäjän takaisin päänäkymään.
      - "Muokkaa"-nappi antaa käyttäjän muokata kirjan tietoja.
      - "Poista"-nappi avaa käyttäjälle varoitusikkunan samalle sivulle, jossa kaksi nappia. "OK"-nappi varoitusruudussa viimeistelee kirjan poiston, ja vie käyttäjän takaisin päänäkymään. "Peru"-nappi peruu kirjan poistamisen, ja sulkee varoitusruudun.


  - **Asetukset:** Sivulla on kaksi tekstikenttää. Ylemmän vieressä lukee teskti "Sähköpostiosoite", ja sen vieressä lukee käyttäjän sähköpostiosoite, jota ei voi vaihtaa. Alemman tekstiruudun vieressä lukee teksti "Salasana", ja tekstikentän avulla voi halutessaan vaihtaa tilin salasanaa. Tekstikenttien alapuolella on nappi "OK", joka tallentaa salasanan muutoksen. Vasemassa ylänurkassa on "Takaisin"-nappi.
      - "Takaisin"-nappi vie käyttäjän takaisin päänäkymään.

## 4. Tietoarkkitehtuuri ja tekninen suunnittelu

## 5. Projektinhallinta ja käyttäjätestaus
