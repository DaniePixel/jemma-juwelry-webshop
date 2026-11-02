# Jemma Juwelry - Webshop

Een front-end webshop voor sieraden, gebouwd met vanilla JavaScript.
Bevat een productpagina met filtering, winkelwagenfunctionaliteit en een admin-paneel voor product en order beheer.

   🔗 **Live demo:** [webshop-jemma.netlify.app](https://webshop-jemma.netlify.app)

## Features

**Voor bezoekers:**

- Bekijken van het aanbod sieraden met behulp van productkaartjes. Hierop is een afbeelding van het sieraad zichtbaar, de titel, de prijs en of het product op voorraad is. Er is een aantal in te voeren om vervolgens te bestellen.
- Op productcategorie filteren (ringen, halskettingen, armbanden, oorbellen).
- Het winkelmandje toont het aantal producten, subtotaal per item en de totaalprijs. Producten zijn per item te verwijderen.

**Voor de admin:**

- Een admindashboard met 2 tabbladen: producten en orders.
- In het productenpaneel is een invoerveld voor het toevoegen en bewerken van producten.
- Er wordt een productenlijst getoond met de mogelijkheid producten te verwijderen of te bewerken.
- In het orderpaneel zijn orders zichtbaar: de datum waarop de order is geplaatst, het id en de titel van elk besteld product, en het aantal.

### Technologieën

- HTML5
- CSS3
  - Custom font (`@font-face`) — Athena
- JavaScript (ES6+) — vanilla JS, geen framework
  - Modules (`import`/`export`)
  - Classes
  - Async/await
- JSON — voor de initiële productdata (`data/products.json`)
- Web Storage API (`localStorage`) voor data-opslag

## Projectstructuur

- `product.js` — bevat de `Product`-class: de blauwdruk voor een sieraad (id, titel, prijs, categorie, afbeelding, voorraad).
  - `fromObject()`: zet platte data (bijvoorbeeld uit localStorage of een JSON-bestand) om in een echte `Product`-instantie
  - `inStock`: geeft terug of product nog op voorraad is (true/false)
  - `formattedPrice()`: geeft de prijs geformatteerd terug (bijv. €25.00)
  - `verlaagVoorraad()` / `verhoogVoorraad()`: passen de voorraad aan bij het toevoegen/verwijderen uit de winkelwagen.

- `cartItem.js` — bevat de `CartItem`-class: de blauwdruk voor een in winkelmand geplaatst sieraad (id, titel, prijs en aantal).
  - `fromObject()`: zet platte data om in een echte `CartItem`- instantie
  - `subtotaal`: geeft een subtotaal terug bij aankoop van meerdere hoeveelheden van één sieraad.
  - `formattedPrijs`: geeft de prijs geformateerd terug. Tot 2 decimalen achter de comma.
  - `formattedSubtotaal`: geeft de prijs van subtotaal geformateerd terug. Tot twee decimalen achter de comma.

- `cart.js` — bevat de `Cart`-class: de blauwdruk van het de hele winkelwagen. De producten, prijs en aantal.
  - `fromArray()`: zet platte data om in een echte `Cart`-instantie.
  - `totaalAantal`: geeft het totaal aantal terug van de hele winkelmand.
  - `totaalPrijs`: geeft de totaalprijs terug van de hele winkelmand.
  - `isLeeg`: geeft terug of winkelmand leeg is(true/false).
  - `formattedTotaal`: geeft de totaalprijs geformateerd terug tot 2 decimalen achter de comma.
  - `voegToe`: zoekt of product al aanwezig is in de winkelwagen. Verhoogt het aantal als het al bestaat, of maakt een nieuwe `CartItem`-instantie aan als het nog niet in de winkelwagen zit op.
  - `verwijder`: verwijdert product uit winkelwagen op basis van een product-id.
- `order.js` : bevat de `Order`-class: de blauwdruk van een order (ordernummer, datum, en de bestelde items).
  - `fromObject()`: zet platte data om in een echte `Order`-instantie. Behoudt daarbij de oorspronkelijke besteldatum (in plaats van de datum van het moment van inladen), omdat de constructor anders steeds een nieuwe datum zou instellen.
- `storage.js` — bevat verschillende functies voor het ophalen, opslaan en verwijderen van data in localStorage.
  - `getData()`: haalt data op uit localStorage.
  - `setData()`: slaat data op in localStorage.
  - `clearData()`: verwijdert data uit localStorage.
  - `getProducts()`: haalt ruwe productdata `Products` op en geeft ze terug als `Product` instanties.
  - `loadProducts()`: checkt of er al producten in localStorage staan, zo niet, haalt deze op uit `products.json` en slaat ze op. Geeft in beide gevallen een array van `Product`-instanties terug.
  - `resetProducts()`: wist de opgeslagen producten uit localStorage en laadt ze opnieuw in vanuit `products.json` (via `loadProducts()`).
- `main.js` — Gekoppeld aan index.html. Hier worden alle producten(sieraden) gerenderd en voor iedere sieraad een productkaart gemaakt en getoond. Iedere productkaart is voorzien van een afbeelding van het product, een titel, de prijs, de status van de voorraad van het sieraad, de mogelijkheid om een aantal te bestellen met een bestelknop. Er is een categoriefilter op de soorten sieraden.
- `admin.js` — Gekoppeld aan admin.html. Hier zijn 2 overzichten te zien met productlijst en orders. De productlijst is per product te verwijderen of bij te werken. Denk aan voorraad, afbeelding, prijs, categorie en titel. Ook is er de mogelijkheid om producten toe te voegen die gelijk worden toegevoegd in het productoverzicht van de admin maar ook de productenpagina voor de bezoeker.
- `basket.js` — Gekoppeld aan winkelwagen.html. Hier wordt de hele winkelwagen getoond. Een lijst met alle producten die in de winkelwagen zitten worden getoond. Per item de titel, prijs en aantal met een subtotaal. Ook wordt de totaalprijs weergegeven. Er is ee verwijderknop op ieder item en een bestelknop.
- `ui.js` — Bevat UI functies die op elke pagina worden toegepast.
  - `updateCartCount()` : update van het aantal producten in winkelwagen.
  - `mobileNavToggle()` : toggle voor hamburgermenu bij mobiele versie.

## Installatie

1. Clone of download deze repository naar je eigen computer.
2. Open de projectmap in een code-editor, bijvoorbeeld [VS Code](https://code.visualstudio.com/).
3. Start een lokale server, dit project gebruikt `fetch()` om productdata in te laden, wat niet werkt als je het HTML-bestand direct opent in de browser.
   - **Met VS Code**: installeer de extensie [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), klik met de rechtermuisknop op `index.html` en kies "Open with Live Server".
   - **Zonder VS Code**: gebruik een andere lokale server naar keuze, bijvoorbeeld via `npx serve` (Node.js vereist).
4. De website opent automatisch in je browser op poort `http://127.0.0.1:3000`.

Er zijn geen dependencies of installatiestappen nodig — dit project gebruikt pure HTML, CSS en JavaScript (vanilla JS, geen framework).

## Toekomstige features

- een inlog voor de admin
- favorieten producten opslaan in de vorm van een hartje
- een korte blik op het winkelmandje bij bestellen een soort pop up/modal.

### Checkout-proces

- Verzendgegevens invullen: naam, adres (nu bestel je zonder gegevens)
- Betaalmethode (gesimuleerd)
- Orderbevestiging per mail (gesimuleerd)

### Zoeken & filteren

- Zoekbalk: op titel zoeken (je hebt nu alleen categoriefilter)
- Sorteren: op prijs (laag-hoog), nieuwste producten, populariteit
