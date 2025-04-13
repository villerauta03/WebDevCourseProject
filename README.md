# WebDevCourseProject
Centria-ammattikorkeakoulun "IT00AK35-3003 Web-kehittämisen jatkokurssi - Päivätoteutus"-kurssin loppuprojektin määrittely ja suoritus kasataan tähän Git-repoon

## Asennusohjeet sovelluksen käyttöönottoon paikallisesti omalla koneella
Sovellukseni on luotu toimimaan ensisijaisesti localhostin avulla käyttäjän omalla tietokoneella. Suorittaakseen ohjelmistoa, sen ladanneella käyttäjällä on oltava muutama asia, mitä ei voida suoraan GitHub reposta saada.

### 1. Asenna PostgreSQL
Jos et ole jo asentanut PostgreSQL, sen voi asentaa pg Admin 4 yhteydessä sivulta https://www.pgadmin.org/download/pgadmin-4-windows/ .  
Kun olet asentanut pg Admin 4, sinun täytyy lisätä asennettu psql tiedosto järjestelmäsi PATH:iin, jos järjestelmäsi ei ole jo automaattisesti tehnyt niin. 

Windows-ympäristössä psql-tiedostosi yleensä tallennetaan sijaintiin `C:\Program Files\PostgreSQL\{versio}\bin` 'psql.exe'-nimisenä tiedostona.  Kopioi tämän tiedoston tiedostopolku (Esim. tiedostopolku: `"C:\Program Files\PostgreSQL\17\bin\psql.exe"`), ja avaa ympäristömuuttujat (Hae palkista ymäpäristömuuttujat), avaa se ja tuplaklikkaa "PATH". Sieltä, voit lisätä tiedostosijainnin nyt järjestelmäsi PATH:iin.

Linuxilla tämän saman voi tehdä avaamalla käyttähäkohtaisen konfiguraatiotiedoston, esim. `nano ~/.bashrc`, lisämällä tiedoston loppuun uuden polkusi seuraavalla syntaksilla: `export PATH="$PATH:/uusi/polku"`, ja tallentamalla tiedoston. Ota muutos käyttöön lataamalla tiedosto: `source ~/.bashrc`.

### 2. Tietokannan luominen
Nyt kun olet asentanut PostgreSQL:än, voi olla että sinun täytyy pistää se päälle. Windows-ympäristössä avaa "Services" ("Palvelut"), ja etsi psql versiosi listasta (esim. postgresql-x64-17), klikkaa oikealla hiirennäppäimellä ja paina "Start" (tai "Aloita").  
Parin sekunin päästä sen pitäisi olla päällä, ja voimme aloittaa luomaan tietokantaa. 

Kirjaudu sisään komennolla `psql` komentokehotteessa ja anna asettamasi salasana kun se kysyy. (Vaihtoehtoisesti voit käyttää `psql -U postgres` käyttääksesi oletustiliä)  

Luo uusi tietokanta PostgreSQL-käyttäen komennolla: `CREATE DATABASE your_database_name;`  
Tämän jälkeen yhdistä kyseiseen tietokantaan: `\c your_database_name`  

### 3. Tietokannan pöydät ja käyttöoikeudet
Kun olet yhdistänyt tietokantaasi, voidaan luoda tietokantaan vaadittavat pöydät että ohjelmistomme toimii.

Aluksi, luo `users`-pöytä: `CREATE TABLE users (id SERIAL PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL);`  
Sitten, anna oikeudet sinun psql käyttäjällesi (jonka määrittelit pg Admin 4 asennusprosessissa): `GRANT ALL PRIVILEGES ON DATABASE your_database_name TO your_user_name;`  
Anna myös käyttäjällesi oikeudet pöydän käytölle: `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_user_name;`  
Tee myös tämä kans: `GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_user_name;`
Sitten viimeiseksi anna käyttäjällesi kaikki oikeudet tulevien pöytien ja 'sequence'ille: 
