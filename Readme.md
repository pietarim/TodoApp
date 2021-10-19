# Ohjeet

## Localhostilla suoritus

Avaa sijainti /server

Lisää env. tiedosto sijaintiin /server ja täydennä muuttujiin käyttämäsi arvot:

```
SALAUS= esimerkiksiTamaTeksti
DBURL = mongo_db_url
PORT = backendin_kayttama_portti
```

Kaynnista backend:

`npm start`

Avaa sijainti /client

Lisää config.js sijaintiin client/src/config

Kirjoita config.js sisään:

```
export const url = "http://localhost:*backendin_kayttama_portti*"
```

avaa sijainti client

käynnistä sovellus:

`npm start`

# Virtuaaliserveri Ubuntu Linux (esim Digitalocean)

## Nginx asennus ja palomuurin konfigurointi

`sudo apt update`

`sudo apt install nginx`

`sudo systemctl start nginx`

`systemctl status nginx`

`sudo ufw allow 'Nginx HTTP'`

`sudo mkdir -p /var/www/sinun_domain/html`

`ln -s /etc/nginx/sites-available/sinun_domain /etc/nginx/sites-enabled/`

`nano /etc/nginx/nginx.conf`

Muokkaa ngingx config server_names_hash_bucket_size kohta seuraavaksi:

```
 /etc/nginx/nginx.conf

...
  http {
    ...
      server_names_hash_bucket_size 64;
    ...
  }
...
```

## PM2 asennus

`npm install pm2 -g`

`pm2 startup systemd`

## Front toimintakuntoon

Lisää config.js sijaintiin client/src/config

Kirjoita config.js sisään:

```
export const url = "https://sinun_domain"
```

Avaa sijainti /client

suorita build:

`npm build`

## Siirto ja käynnistys serverillä

Siirrä /build sisällä olevat tiedostot ubuntu serverille sijaintiin:

`var/www/sinun_domain/html`

Siirrä /tehtavaLista ubuntu serverille sijaintiin:

`ubuntu_kayttajanimi/tehtavaLista`

Lisää env. tiedosto /tehtavaLista juureen ja täydennä muuttujiin käyttämäsi arvot:

```
SALAUS= *esimerkiksiTamaTeksti*
DBURL = *mongo_db_url*
PORT = *backendin_kayttama_portti*
```

Luo sinun_domain:

`cd /etc/nginx/sites-available`

`sudo nano sinun_domain`

kirjoita seuraava tiedostoon:

```
server {

  root /var/www/sinun_domain
  index index.html index.htm index.nginx-debian.html

  listen       80;
  server_name  localhost;

  location / {
    proxy_pass http://localhost:sinun_port;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

lisää sites-available tiedosto sites-enabled listaan:

`sudo ln -s /etc/nginx/sites-available/your_domain /etc/nginx/sites-enabled/`

tarkista että kaikki toimii:

`sudo nano /etc/nginx/nginx.conf`

uudelleenkäynnistä Nginx:

`sudo systemctl restart nginx`

Käynnistä sovelluksen back end PM2:lla:

`cd /ubuntu_kayttajanimi/tehtavaLista`

`sudo pm2 start index.js`

Voit vierailla sivulla www.sinun_domain!

## SSL sertifikaatin asetus

`sudo apt install certbot python3-certbot-nginx`

`sudo certbot --nginx -d example.com -d www.example.com`

Valitse mieleisesi vaihtoehto esitetyistä vaihtoehdoista.

Voit ottaa automaattisen uusimisen käyttöön:

`sudo systemctl status certbot.timer`

Suoritetaan vielä testaus:

`sudo certbot renew --dry-run`
