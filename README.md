# WoP Portalseiten-Style
Der Portalseiten-Style setzt auf einen Prozess bei dem die JS, CSS und Bild-Dateien aus den Quelldateien erzeugt werden. Wir verwenden dazu die Tools [node.js](https://nodejs.org/en/) und [Grunt](http://gruntjs.com/).

### Vorbereitung
1. Die node.js Laufzeitumgebung [herunterladen](https://nodejs.org/en/
) und installieren
2. Über die Kommandozeile Grunt installieren: `npm install -g grunt-cli`
3. Projekt-Abhängigkeiten installieren, dazu im Wurzel-Verzeichnis (Ordner mit der `packages.json`) des Projekts  `npm install` ausführen 

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
   |- applets (Applets für die Portalseite) 
   |- styles 
      |- fonts (Ordner für die Portalseiten-Fonts)
      |- wop (Der eigentliche Style-Ordner, enthält die FS-Templates und generierte Dateien)
         |- icons
         |- img (Bild-Dateien, enthält die erzeugten Spritemaps für Favicons und Schilde) 
         |- main.css (Die generierte CSS-Datei. NICHT manuell anpassen)
         |- main.js (Die generierte JS-Datei. NICHT manuell anpassen)
```

## Style ändern (Templates, CSS, JS, etc.)
Wenn Änderungen am Style notwendig sind, sollten dise *nicht* auf dem Server durchgeführt werden, sondern hier im Projekt und dann anschließend wieder auf GitHub geladen werden.

Alle Frogsystem-Templates befinden sich in `www\styles\wop` und können einfach angepasst werden.

CSS (bzw. Sass) und JS müssen in den jeweiligen Dateien im `assets`-Ordner geändert werden. Die optimierten Dateien (komprimiert, minifiziert) werden mit dem folgendem Kommando erzeugt:
```
grunt default
```
Es kopiert die erzeugten Dateien auch automatisch nach `www\styles\wop`, so dass der Ordner einfach nur hochgeladen werden muss.

## Schilde und Favicons
Die Quelldateien für die Schilde und Favicons sind in `assets\schilde` bzw. `assets\favicons`. Neue Bilder oder Änderungen einfach in diesen Ordnern platzieren. Die Dateinamen bilden später die Namen der CSS-Klassen.

Um aus den (geänderten) Originalen die optmierten Dateien zu erzeugen, kann das entsprechende Kommando genutzt werden:
```
grunt coat_of_arms
grunt favicons
grunt images
```
(Wobei `grunt images` nur eine Abkürzung für die ersten beiden ist.)

Dabei werden neue Bild- und CSS-Dateien erzeugt und nach `www\styles\wop` kopiert.

### Abmessungen und Dateinamen
* Favicons müssen `16x16px` groß sein, Dateiformat ist egal.
* Schilde können beliebig groß sein; sie werden im Prozess automatisch auf max. `80x100px` verkleinert (im Ordner `assets\schilde\small`).
* Schilde *müssen* als normale Version `SCHILDNAME.png` und als hover-Version `_SCHILDNAME.png` abgelegt werden.

### CSS-Klassen
Beide Bilder-Typen können über die Klassen `coat-of-arm-DATEINAME` bzw. `favicon-DATEINAME` im Style verwendet werden.

## Neue Netzwerkseite
Für eine neue Netzwerkseite ist daher das folgende nötig:

1. Bild-Dateien in `assets\schilde` und `assets\favicons` ablegen
2. Mit `grunt images` die aktualisierten Dateien generieren
3. Neue Seite ins Karussell einfügen: `www\styles\wop\network-carousel.nav` 
4. Neues Forum hinzufügen `www\styles\wop\forum.nav`
5. Den Ordner `www` auf den Server hochladen
6. Newskategorie einrichten (siehe unten)

## Newskategorie
Im Admin-CP unter `Inhalt > News > Kategorien` eine neue Kategorie hinzugefügen. Damit News auch in diese einsortiert werden, muss leider noch von Hand ein Eintrag in die Datenbank eingefügt werden. Und zwar in die Tabelle `wop_networkinfo`:

```
 | id                          | sanitized            | cat_name                 |
 | --------------------------- | -------------------- | -------------------------|
 | ID aus `wop_netzwerkseiten` | Dateiname/CSS-Klasse | Name der neuen Kategorie |
 | 1                           | gothic               | World of Gothic          |
```
 
## Newsslider und Newsletter
Für Newsslider und Newsletter muss das Schild noch in zwei weiteren Varianten hochgeladen werden. Die Dateinamen können im Webmaster-CP selbst gewählt werden. Beim Slider ist es der Wert `Slidericon` und die Datei muss unter `layouts/slider` auf dem Forenserver abgelegt sein; der Newsletter nutzt den Wert `Portalseitenicon` und den Ordner `www/ico` auf dem Webseiten-Server. Die Newsletter-Grafik muss leider noch manuell erstellt werden, man kann aber recht leicht einen Screenshot von der Portalseite dazu hernehmen.
