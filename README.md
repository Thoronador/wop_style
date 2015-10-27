# WoP Portalseiten-Style
Der Portalseiten-Style setzt auf einen Prozess bei dem die JS, CSS und Bild-Dateien aus den Quelldateien erzeugt werden. Wir verwenden dazu die Tools [node.js](https://nodejs.org/en/) und [Grunt](http://gruntjs.com/).

### Vorbereitung
1. Die node.js Laufzeitumgebung [herunterladen](https://nodejs.org/en/
) und installieren
2. �ber die Kommandozeile Grunt installieren: `npm install -g grunt-cli`
3. Projekt-Abh�ngigkeiten installieren, dazu im Wurzel-Verzeichnis (Ordner mit der `packages.json`) des Projekts  `npm install` ausf�hren 

### Struktur
```
\
|- assets
   |- css (Die CSS bzw. Sass Quelldateien)
   |- favicons (Die original favicons)
   |- js (JavaScript Quelldateien)
   |- schilde (Die Schild-Quelldateien in normal und hover)
      |- small (Automatisch generierte kleine Versionen der Schilde)
|- www (Dieser Ordner kann so direkt auf den Server geladen werden)
   |- applets (Applets f�r die Portalseite) 
   |- styles 
      |- fonts (Ordner f�r die Portalseiten-Fonts)
      |- wop (Der eigentliche Style-Ordner, enth�lt die FS-Templates und generierte Dateien)
         |- icons
         |- img (Bild-Dateien, enth�lt die erzeugten Spritemaps f�r Favicons und Schilde) 
         |- main.css (Die generierte CSS-Datei. NICHT manuell anpassen)
         |- main.js (Die generierte JS-Datei. NICHT manuell anpassen)
```

## Style �ndern (Templates, CSS, JS, etc.)
Wenn �nderungen am Style notwendig sind, sollten dise *nicht* auf dem Server durchgef�hrt werden, sondern hier im Projekt und dann anschlie�end wieder auf GitHub geladen werden.
Alle Frogsystem-Templates befinden sich in `www\styles\wop` und k�nnen einfach angepasst werden.
CSS (bzw. Sass) und JS m�ssen in den jeweiligen Dateien im `assets`-Ordner ge�ndert werden. Die optimierten Dateien (komprimiert, minifiziert) werden mit dem folgendem Kommando erzeugt:
```
grunt default
```
Es kopiert die erzeugten Dateien auch automatisch nach `www\styles\wop`, so dass der Ordner einfach nur hochgeladen werden muss.

## Schilde und Favicons
Die Quelldateien f�r die Schilde und Favicons sind in `assets\schilde` bzw. `assets\favicons`. Neue Bilder oder �nderungen einfach in diesen Ordnern platzieren. Die Dateinamen bilden sp�ter die Namen der CSS-Klassen.
Um aus den (ge�nderten) Originalen die optmierten Dateien zu erzeugen, kann das entsprechende Kommando genutzt werden:
```
grunt coat_of_arms
grunt favicons
grunt images
```
(Wobei `grunt images` nur eine Abk�rzung f�r die ersten beiden ist.)

Dabei werden neue Bild- und CSS-Dateien erzeugt und nach `www\styles\wop` kopiert.

### Abmessungen und Dateinamen
* Favicons m�ssen `16x16px` gro� sein, Dateiformat ist egal.
* Schilde k�nnen beliebig gro� sein; sie werden im Prozess automatisch auf max. `80x100px` verkleinert (im Ordner `assets\schilde\small`).
* Schilde *m�ssen* als normale Version `SCHILDNAME.png` und als hover-Version `_SCHILDNAME.png` abgelegt werden.

### CSS-Klassen
Beide Bilder-Typen k�nnen �ber die Klassen `coat-of-arm-DATEINAME` bzw. `favicon-DATEINAME` im Style verwendet werden.

## Neue Netzwerkseite
F�r eine neue Netzwerkseite ist daher das folgende n�tig:
1. Bild-Dateien in `assets\schilde` und `assets\favicons` ablegen
2. Mit `grunt images` die aktualisierten Dateien generieren
3. Neue Seite ins Karussell einf�gen: `www\styles\wop\network-carousel.nav` 
4. Neues Forum hinzuf�gen `www\styles\wop\forum.nav`
5. Den Ordner `www` auf den Server hochladen
