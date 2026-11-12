# 🎬 Course: Bouw je eigen Netflix-dashboard met SvelteKit

In deze course bouw je stap voor stap een Netflix-achtig dashboard met films en series van [TMDB](https://www.themoviedb.org).
Je schrijft **alle code zelf**. Bij elke stap krijg je een opdracht en hints, maar nooit de oplossing.

**Je project:** SvelteKit 3 · Svelte 5 (runes) · TypeScript · Tailwind CSS 4 · pnpm

---

## Zo werk je met deze course

1. Lees eerst het **Doel** en de **Opdracht**.
2. Probeer het eerst zelf. Fouten maken hoort erbij, en de foutmelding is vaak je beste hint.
3. Kom je er niet uit? Klap dan pas de **💡 Hint** open.
4. Vink bij **Klaar als…** alles af voordat je doorgaat naar de volgende stap.
5. Nog steeds vast? Vraag Claude bijvoorbeeld:
   - _"Geef me een extra hint voor stap 9"_
   - _"Review mijn code van stap 14"_
   - _"Leg uit wat deze foutmelding betekent"_

   Je krijgt dan uitleg en feedback, maar geen oplossing.

**Handige bronnen**

- Svelte-tutorial (interactief, echt een aanrader): https://svelte.dev/tutorial
- Svelte-docs: https://svelte.dev/docs/svelte
- SvelteKit-docs: https://svelte.dev/docs/kit
- TMDB API-docs: https://developer.themoviedb.org/reference
- Tailwind-docs: https://tailwindcss.com/docs

> 💡 **Tip:** Maak een git-commit na elke afgeronde stap (`git init` doe je één keer). Gaat er iets mis, dan kun je altijd terug.

---

## Module 0: Voorbereiding

### Stap 1: Leer je project kennen

**Doel:** Begrijpen hoe een SvelteKit-project in elkaar zit.

**Opdracht:**

- Start de development server en open de site in je browser.
- Bekijk de mappen `src/routes` en `src/lib`. Wat staat waar?
- Verander de tekst op de homepage in "Mijn Netflix" en kijk wat er in de browser gebeurt.

<details>
<summary>💡 Hint</summary>

- Kijk in `package.json` bij `"scripts"`: daar staat welk commando de dev server start. Je voert het uit met `pnpm <scriptnaam>`.
- In SvelteKit wordt elke map in `src/routes` een URL. Het bestand `+page.svelte` is de pagina zelf.
- `+layout.svelte` is de "omlijsting" om alle pagina's heen. Zie je waar de pagina erin wordt geplaatst?
- Docs: https://svelte.dev/docs/kit/project-structure

</details>

**Klaar als…**

- [x] De site draait op `localhost`
- [x] Je ziet "Mijn Netflix" zonder dat je de pagina handmatig ververst
- [x] Je kunt in eigen woorden uitleggen wat `+page.svelte` en `+layout.svelte` doen

---

### Stap 2: Een TMDB-account en API-token

**Doel:** Toegang krijgen tot de filmdata.

**Opdracht:**

- Maak een (gratis) account aan op themoviedb.org.
- Vraag een API-key aan in je accountinstellingen.
- Zoek het **API Read Access Token** op (een lange tekst die begint met `eyJ…`).

<details>
<summary>💡 Hint</summary>

- Je vindt het onder _Settings → API_.
- Je krijgt twee dingen: een korte "API Key" en een lange "Read Access Token". In deze course gebruik je het **token**.
- Het token is geheim, net als een wachtwoord. Deel het nooit en zet het nooit direct in je code.

</details>

**Klaar als…**

- [x] Je hebt het Read Access Token ergens veilig bewaard (bijvoorbeeld in een wachtwoordmanager)

---

### Stap 3: Test de API buiten Svelte

**Doel:** Oefenen met `fetch`, `async`/`await` en JSON, voordat er Svelte bij komt.

**Opdracht:**

- Maak in de root van je project een bestand `.env` en zet je token erin onder de naam `TMDB_TOKEN`.
- Maak een los bestand `test-api.js` (buiten `src`).
- Schrijf daarin code die de **populaire films** ophaalt bij TMDB en de titels van alle films in de terminal print.
- Voer het bestand uit met Node.

<details>
<summary>💡 Hint 1: het verzoek</summary>

- De basis-URL van de API is `https://api.themoviedb.org/3`.
- Zoek in de TMDB-docs het endpoint voor "popular movies".
- Je token stuur je mee in een **header**: `Authorization` met de waarde `Bearer <jouw token>`. Zoek op MDN hoe je headers meegeeft aan `fetch`.

</details>

<details>
<summary>💡 Hint 2: Node en .env</summary>

- Node kan zelf een `.env`-bestand inlezen. Zoek op naar de optie `--env-file`.
- In Node lees je een environment variable uit via `process.env`.
- Kijk ook in `.gitignore`: staat `.env` erin? Waarom is dat belangrijk?

</details>

<details>
<summary>💡 Hint 3: de data</summary>

- `fetch` geeft een _response_ terug, niet meteen de data. Je hebt nog een extra stap nodig om de JSON eruit te halen.
- Log eerst het hele object en bekijk de vorm: waar zit de lijst met films?
- Om over een array te lopen kun je bijvoorbeeld `forEach` of `map` gebruiken.
- MDN over fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

</details>

**Klaar als…**

- [x] Je ziet een lijst met filmtitels in je terminal
- [x] Je weet hoe één film-object eruitziet: welke velden heeft het (`title`, `poster_path`, …)?
- [x] Bonus: de titels zijn in het Nederlands (zoek naar de `language`-parameter)

---

## Module 1: Svelte-basics (met nepdata)

> Je gebruikt in deze module bewust **nepdata**. Zo leer je eerst Svelte zelf, zonder dat er API-problemen tussen zitten.

### Stap 4: Je eerste component

**Doel:** Een component maken die data ontvangt via props.

**Opdracht:**

- Maak `src/lib/components/MovieCard.svelte`.
- De component krijgt een `title` en een `rating` binnen en toont die.
- Gebruik de component op je homepage met een verzonnen film.

<details>
<summary>💡 Hint</summary>

- In Svelte 5 ontvang je props met de rune `$props()`.
- Met TypeScript kun je aangeven welke props er zijn en wat hun type is.
- Kijk naar `+layout.svelte`: daar wordt `$props()` al gebruikt.
- In `package.json` staat een alias `#lib`, en die wordt al gebruikt in `+layout.svelte`. Gebruik hem om je component te importeren.
- Docs: https://svelte.dev/docs/svelte/$props

</details>

**Klaar als…**

- [x] Je kaartje staat op de homepage
- [x] Je kunt de component twee keer gebruiken met verschillende films

---

### Stap 5: Een lijst tonen

**Doel:** Over een array lopen in je template.

**Opdracht:**

- Maak op de homepage een array met 3 nepfilms (objecten met `id`, `title` en `rating`).
- Toon voor elke film een `MovieCard`.

<details>
<summary>💡 Hint</summary>

- Svelte heeft hiervoor een _each block_.
- Geef elk item een **key**. Waarom is dat handig? Lees het na in de docs.
- Docs: https://svelte.dev/docs/svelte/each

</details>

**Klaar als…**

- [x] Je ziet 3 kaartjes
- [x] Voeg je een 4e film toe aan de array, dan verschijnt er automatisch een 4e kaartje

---

### Stap 6: Interactie met state

**Doel:** Begrijpen wat reactieve state is.

**Opdracht:**

- Geef `MovieCard` een knop "Meer info".
- Klik je erop, dan verschijnt er een korte beschrijving. Klik je nog een keer, dan verdwijnt die weer.

<details>
<summary>💡 Hint</summary>

- Je hebt een variabele nodig die Svelte "in de gaten houdt": de rune `$state`.
- Een klik vang je op met het attribuut `onclick`.
- Iets tonen of verbergen doe je met een _if block_.
- Docs: https://svelte.dev/docs/svelte/$state en https://svelte.dev/docs/svelte/if

</details>

**Klaar als…**

- [x] De beschrijving klapt open en dicht
- [x] Elk kaartje werkt los van de andere (open je er één, dan blijven de andere dicht)

---

### Stap 7: Afgeleide waarden

**Doel:** Waarden berekenen uit andere waarden.

**Opdracht:**

- Toon de score in een kleur: groen bij 7 of hoger, oranje bij 5 tot 7, en rood bij lager dan 5.
- Toon de score afgerond op één decimaal.

<details>
<summary>💡 Hint</summary>

- Een waarde die automatisch meeverandert met een andere waarde maak je met `$derived`.
- Tailwind-kleuren zijn gewoon classes, bijvoorbeeld `text-green-500`. Je kunt een class ook dynamisch maken.
- Afronden: zoek op `toFixed` (MDN).
- Docs: https://svelte.dev/docs/svelte/$derived

</details>

**Klaar als…**

- [ ] Elke score heeft de juiste kleur
- [ ] Verander je een score in je nepdata, dan verandert de kleur mee

---

## Module 2: Echte data ophalen

### Stap 8: Je token veilig gebruiken in SvelteKit

**Doel:** Begrijpen waarom geheimen alleen op de server mogen staan.

**Opdracht:**

- Zorg dat SvelteKit je `TMDB_TOKEN` uit `.env` kent als **private** variabele.

<details>
<summary>💡 Hint</summary>

- In **SvelteKit 3** declareer je environment variables in het bestand `src/env.ts` met de functie `defineEnvVars` uit `@sveltejs/kit/env`.
- Private variabelen importeer je daarna uit `$app/env/private`. Die module werkt **alleen op de server**. Wat zou er gebeuren als je je token in de browser-code gebruikt?
- Let op: veel tutorials online gebruiken nog `$env/static/private`. Dat is de oude manier van SvelteKit 2.
- Docs: https://svelte.dev/docs/kit/environment-variables

</details>

**Klaar als…**

- [ ] `pnpm check` geeft geen fouten
- [ ] Je kunt uitleggen waarom je het token niet in een `.svelte`-bestand gebruikt

---

### Stap 9: Je eerste load-functie

**Doel:** Data ophalen op de server en doorgeven aan je pagina.

**Opdracht:**

- Maak naast je homepage een bestand `+page.server.ts`.
- Haal daarin de populaire films op (zoals in stap 3).
- Vervang je nepdata op de homepage door de echte films.

<details>
<summary>💡 Hint</summary>

- Exporteer een functie met de naam `load`. Wat je daaruit teruggeeft, komt in je pagina binnen als de prop `data`.
- Gebruik voor typesafety de types uit `./$types`: `PageServerLoad` voor de load-functie en `PageProps` in je pagina.
- Je oude test-code uit stap 3 lijkt hier veel op.
- Docs: https://svelte.dev/docs/kit/load

</details>

**Klaar als…**

- [ ] Je homepage toont echte populaire films
- [ ] In het Network-tabblad van je browser zie je **geen** verzoek naar `api.themoviedb.org`. Waarom niet?

---

### Stap 10: Een herbruikbare API-helper

**Doel:** Code niet herhalen (het "DRY"-principe).

**Opdracht:**

- Maak `src/lib/server/tmdb.ts`.
- Schrijf daarin een functie die een TMDB-pad krijgt (bijvoorbeeld `/movie/popular`) en de JSON teruggeeft.
- De functie regelt zelf de basis-URL, de header met het token en `language=nl-NL`.
- Gebruik deze functie in je load-functie.

<details>
<summary>💡 Hint</summary>

- Alles in een map met de naam `server` binnen `src/lib` mag alleen op de server worden gebruikt. SvelteKit bewaakt dat voor je.
- Wat moet er gebeuren als TMDB een fout teruggeeft? Kijk naar `response.ok`.
- Extra query-parameters kun je netjes toevoegen met `URL` en `searchParams` (MDN).
- Docs: https://svelte.dev/docs/kit/server-only-modules

</details>

**Klaar als…**

- [ ] Je load-functie is nu een paar regels korter
- [ ] Het token staat nog maar op één plek in je code

---

### Stap 11: TypeScript-types

**Doel:** Je editor laten helpen met autocomplete en foutmeldingen.

**Opdracht:**

- Maak een type `Movie` met alleen de velden die je gebruikt.
- Gebruik dat type in je helper, je load-functie en `MovieCard`.

<details>
<summary>💡 Hint</summary>

- Een goede plek is `src/lib/types.ts`.
- Kijk naar je console-log uit stap 3 om te zien welke velden er zijn.
- Velden die leeg kunnen zijn (zoals `poster_path`) kunnen `null` zijn. Hoe schrijf je dat in TypeScript?
- TMDB stuurt lijsten in een "verpakking" (met `page`, `results`, …). Kun je daar ook een type voor maken? Zoek op _generics_ als je nieuwsgierig bent.

</details>

**Klaar als…**

- [ ] Als je `movie.` typt, stelt VS Code de juiste velden voor
- [ ] `pnpm check` geeft geen fouten

---

### Stap 12: Posters tonen

**Doel:** Werken met afbeeldingen van een externe bron.

**Opdracht:**

- Toon de poster van elke film op de `MovieCard`.
- Zorg dat er iets nettes verschijnt als een film geen poster heeft.

<details>
<summary>💡 Hint</summary>

- `poster_path` is alleen het laatste stukje van de URL. Zoek in de TMDB-docs op "Image Basics" hoe je de volledige URL opbouwt.
- Er zijn verschillende maten (`w200`, `w500`, `original`, …). Welke past bij een klein kaartje?
- Vergeet de `alt`-tekst niet.
- Kun je de URL-logica in een kleine helperfunctie stoppen, zodat je hem ook voor backdrops kunt gebruiken?
- Docs: https://developer.themoviedb.org/docs/image-basics

</details>

**Klaar als…**

- [ ] Elke kaart toont een poster of een nette placeholder
- [ ] Elke afbeelding heeft een zinvolle `alt`-tekst

---

## Module 3: De homepage

### Stap 13: Meerdere rijen laden

**Doel:** Meerdere API-verzoeken tegelijk doen.

**Opdracht:**

- Laad op de homepage drie lijsten: **Trending deze week**, **Populair** en **Best beoordeeld**.

<details>
<summary>💡 Hint</summary>

- Zoek de juiste endpoints in de TMDB-docs.
- Drie keer `await` achter elkaar werkt, maar dan wacht elk verzoek op het vorige. Zoek op `Promise.all` om ze tegelijk uit te voeren.
- Meet het verschil eens met het Network-tabblad of met `console.time`.

</details>

**Klaar als…**

- [ ] Je load-functie geeft drie lijsten terug
- [ ] De verzoeken worden tegelijk uitgevoerd

---

### Stap 14: Een rij-component

**Doel:** Componenten samenstellen uit andere componenten.

**Opdracht:**

- Maak `MovieRow.svelte` met een titel en een lijst films.
- De rij scrollt horizontaal, net als bij Netflix.
- Gebruik de component drie keer op de homepage.

<details>
<summary>💡 Hint</summary>

- Je gebruikt `MovieCard` gewoon binnen `MovieRow`.
- Tailwind: zoek op `flex`, `overflow-x-auto` en `shrink-0`. Wat gebeurt er als je `shrink-0` weglaat?
- Bonus: zoek op CSS `scroll-snap` voor mooier scrollen.

</details>

**Klaar als…**

- [ ] Drie rijen onder elkaar, die elk horizontaal scrollen
- [ ] Alle kaarten zijn even breed

---

### Stap 15: De hero-banner

**Doel:** Een opvallende header bouwen met een achtergrondafbeelding.

**Opdracht:**

- Bovenaan de homepage staat een grote banner met de backdrop van één film (bijvoorbeeld de eerste trending film), plus de titel, de beschrijving en een knop "Meer info".

<details>
<summary>💡 Hint</summary>

- Gebruik `backdrop_path` in plaats van `poster_path`, met een grotere maat.
- Tekst leesbaar maken op een foto: zoek op Tailwind _gradient_ (`bg-linear-to-t` en verder).
- Lange beschrijvingen inkorten: zoek op Tailwind `line-clamp`.
- Bonus: kies elke keer een willekeurige film (`Math.random`). Doe je dat op de server of in de browser, en maakt dat verschil?

</details>

**Klaar als…**

- [ ] De banner vult de breedte van het scherm
- [ ] De tekst is goed leesbaar

---

### Stap 16: Netflix-stijl

**Doel:** Oefenen met Tailwind.

**Opdracht:**

- Geef de hele site een donker thema.
- Laat kaarten iets groter worden als je er met de muis overheen gaat.

<details>
<summary>💡 Hint</summary>

- Een achtergrondkleur voor de hele site zet je in `+layout.svelte` of in `layout.css`.
- Zoek op Tailwind `hover:`, `scale-…` en `transition`.
- Netflix-rood ligt rond `#E50914`. In Tailwind 4 kun je eigen kleuren toevoegen met `@theme` in je CSS.
- Docs: https://tailwindcss.com/docs/theme

</details>

**Klaar als…**

- [ ] Het voelt als een streamingdienst 😎

---

## Module 4: De detailpagina

### Stap 17: Een dynamische route

**Doel:** Eén pagina gebruiken voor alle films.

**Opdracht:**

- Maak een route waarbij `/movie/550` de pagina van de film met id 550 toont.
- Toon voorlopig alleen het id op de pagina.

<details>
<summary>💡 Hint</summary>

- Een stuk van de URL dat varieert, maak je met een map met **vierkante haken** in de naam.
- In je load-functie vind je de waarde in `params`.
- Docs: https://svelte.dev/docs/kit/routing

</details>

**Klaar als…**

- [ ] `/movie/550` en `/movie/27205` tonen elk hun eigen id

---

### Stap 18: Filmdetails tonen

**Doel:** Een volledige detailpagina bouwen.

**Opdracht:**

- Haal de details van de film op en toon: backdrop, poster, titel, jaar, speelduur, genres, score en beschrijving.

<details>
<summary>💡 Hint</summary>

- Het detail-endpoint geeft meer velden terug dan de lijst-endpoints. Heb je een nieuw type nodig, of kun je `Movie` uitbreiden? Zoek op TypeScript `extends`.
- Speelduur komt in minuten. Kun je er "2u 19m" van maken? (Tip: `Math.floor` en `%`)
- Alleen het jaar uit een datum halen: denk aan `slice`, of aan het `Date`-object.
- `genres` is een array met objecten. Hoe toon je die als labels naast elkaar?

</details>

**Klaar als…**

- [ ] Alle gevraagde info staat op de pagina
- [ ] De pagina past qua stijl bij je homepage

---

### Stap 19: Cast en trailer

**Doel:** Extra data ophalen en iets van buiten embedden.

**Opdracht:**

- Toon de eerste 10 acteurs (met foto, naam en rol).
- Toon de YouTube-trailer als die er is.

<details>
<summary>💡 Hint</summary>

- Je kunt dit met losse verzoeken doen, maar TMDB heeft een handige query-parameter: `append_to_response`. Daarmee haal je alles in één verzoek op.
- `slice` helpt om alleen de eerste 10 te pakken.
- In de video-lijst zitten ook teasers en clips. Gebruik `find` om een video te zoeken met `site` = YouTube en `type` = Trailer.
- Een YouTube-video embed je met een `<iframe>`. Zoek op het "embed"-URL-formaat van YouTube.
- Nederlandse taal: soms zijn er geen Nederlandse trailers. Zoek in de docs op `include_video_language`.

</details>

**Klaar als…**

- [ ] Je ziet een rij met acteurs
- [ ] De trailer speelt af, en zonder trailer gaat er niets kapot

---

### Stap 20: Foutafhandeling

**Doel:** Netjes omgaan met dingen die misgaan.

**Opdracht:**

- Ga naar `/movie/999999999` of `/movie/hallo`. Wat gebeurt er?
- Zorg dat de gebruiker een nette 404-pagina ziet, in jouw stijl.

<details>
<summary>💡 Hint</summary>

- SvelteKit heeft een `error`-functie die je kunt gooien vanuit je load-functie.
- Je eigen foutpagina maak je met een bestand `+error.svelte`. In welke map zet je dat?
- In `+error.svelte` vind je de foutinfo via `page` uit `$app/state`.
- Docs: https://svelte.dev/docs/kit/errors

</details>

**Klaar als…**

- [ ] Een niet-bestaande film toont jouw 404-pagina
- [ ] Er staat een link "Terug naar home" op

---

### Stap 21: Linken vanaf de homepage

**Doel:** Pagina's met elkaar verbinden.

**Opdracht:**

- Maak elke `MovieCard` klikbaar zodat je naar de detailpagina gaat.
- Laat de knop "Meer info" in de hero-banner ook naar de detailpagina gaan.

<details>
<summary>💡 Hint</summary>

- In SvelteKit gebruik je gewoon een `<a href="…">`. SvelteKit regelt zelf de snelle navigatie.
- Wat doe je nu met je "Meer info"-toggle uit stap 6? Mag die weg?
- Bonus: zoek op `data-sveltekit-preload-data`. Wat doet het als je over een link hovert?
- Docs: https://svelte.dev/docs/kit/link-options

</details>

**Klaar als…**

- [ ] Je kunt van home naar een film klikken en met de terugknop weer terug

---

## Module 5: Layout en navigatie

### Stap 22: Een navigatiebalk

**Doel:** Iets op elke pagina tonen.

**Opdracht:**

- Maak een navbar met je logo/naam en de links Home, Films, Series en Mijn lijst. (Die pagina's bouw je later; een 404 is voorlopig prima.)
- De navbar staat op elke pagina.
- De link van de pagina waar je bent, valt op.

<details>
<summary>💡 Hint</summary>

- Welk bestand staat om alle pagina's heen?
- De huidige URL vind je in `page.url.pathname` (uit `$app/state`).
- Bonus: laat de navbar bovenaan blijven staan bij scrollen (zoek op Tailwind `sticky` of `fixed`). Wat gebeurt er dan met je hero-banner?

</details>

**Klaar als…**

- [ ] De navbar staat op elke pagina, ook op de detailpagina en de 404-pagina
- [ ] De actieve link is zichtbaar anders

---

### Stap 23: Een laadindicator

**Doel:** De gebruiker feedback geven tijdens het laden.

**Opdracht:**

- Toon een balkje of spinner zolang er een nieuwe pagina laadt.

<details>
<summary>💡 Hint</summary>

- Kijk wat `navigating` uit `$app/state` je vertelt.
- Je ziet het niet goed op een snelle verbinding? Zet in Chrome DevTools de _Network throttling_ op "Slow 4G".
- Docs: https://svelte.dev/docs/kit/$app-state#navigating

</details>

**Klaar als…**

- [ ] Met een trage verbinding zie je de indicator verschijnen en verdwijnen

---

## Module 6: Series

### Stap 24: Een detailpagina voor series

**Doel:** Ontdekken hoe verschillende data toch op elkaar lijkt.

**Opdracht:**

- Maak een detailpagina `/tv/[id]` voor series.
- Toon minimaal: titel, jaar van de eerste aflevering, aantal seizoenen, genres en beschrijving.

<details>
<summary>💡 Hint</summary>

- Haal eerst één serie op en log de data. Vergelijk die met een film: welke velden heten anders? (Kijk bijvoorbeeld naar de titel en de datum.)
- Hoeveel code kun je hergebruiken van je film-detailpagina?

</details>

**Klaar als…**

- [ ] `/tv/1399` toont een serie
- [ ] Je hebt een lijstje met de verschillen tussen film- en seriedata

---

### Stap 25: Herbruikbare componenten

**Doel:** Eén component laten werken voor meerdere soorten data.

**Opdracht:**

- Zorg dat `MovieCard` en `MovieRow` werken voor films **en** series, en naar de juiste detailpagina linken.

<details>
<summary>💡 Hint</summary>

Er zijn meerdere oplossingen. Denk na over de voor- en nadelen:

- **Optie A:** Geef een extra prop mee, zoals `mediaType`.
- **Optie B:** Zet de TMDB-data in je helper om naar één eigen type (bijvoorbeeld `MediaItem` met altijd een `title` en een `type`). Je componenten hoeven dan het verschil niet te kennen.

Misschien wil je je componenten ook een nieuwe naam geven (`MediaCard`?). Met de rename-functie van VS Code (F2) gaat dat snel.
</details>

**Klaar als…**

- [ ] Eén kaart-component toont zowel films als series
- [ ] Klikken brengt je naar de juiste detailpagina

---

### Stap 26: Pagina's voor films en series

**Doel:** Je kennis toepassen op nieuwe pagina's.

**Opdracht:**

- Voeg op de homepage een rij "Populaire series" toe.
- Maak de pagina's `/movies` en `/series` met elk een paar rijen. Een idee is per genre.

<details>
<summary>💡 Hint</summary>

- Kijk in de TMDB-docs naar het `discover`-endpoint en de parameter `with_genres`.
- De lijst met genres heeft ook een eigen endpoint.
- Zie je veel herhaling in je pagina's? Zou je de genre-rij-logica in je helper kunnen stoppen?

</details>

**Klaar als…**

- [ ] Alle links in je navbar (behalve Mijn lijst) werken

---

## Module 7: Zoeken

### Stap 27: Een zoekpagina

**Doel:** Werken met formulieren en query-parameters in de URL.

**Opdracht:**

- Maak een zoekveld in de navbar.
- Als je zoekt, kom je op `/search?q=batman`.

<details>
<summary>💡 Hint</summary>

- Een gewoon HTML-`<form>` met `method="GET"` en een `action` zet de invoer automatisch in de URL. Je hebt hiervoor dus geen JavaScript nodig.
- Het `name`-attribuut van je `<input>` bepaalt de naam in de URL.
- In de load-functie van `/search` vind je de zoekterm via `url.searchParams`.

</details>

**Klaar als…**

- [ ] Zoeken brengt je naar `/search?q=…`
- [ ] De zoekpagina toont de zoekterm ("Resultaten voor …")

---

### Stap 28: Zoekresultaten

**Doel:** Gemengde data tonen en lege toestanden afhandelen.

**Opdracht:**

- Toon de resultaten in een grid, met films en series door elkaar.
- Toon een vriendelijke melding als er niets is gevonden, en ook als er geen zoekterm is.

<details>
<summary>💡 Hint</summary>

- Zoek in de docs op het endpoint `search/multi`.
- Dat endpoint geeft ook **personen** terug. Hoe filter je die eruit? (Kijk naar het veld `media_type`.)
- Een grid maak je met Tailwind `grid` en `grid-cols-…`. Kijk ook naar responsive varianten zoals `md:`.
- Een _if block_ heeft ook een `{:else}`.

</details>

**Klaar als…**

- [ ] Zoeken op "batman" geeft films en series
- [ ] Zoeken op "xqzwv" geeft een nette melding
- [ ] Je kunt de URL van een zoekopdracht delen en die werkt meteen

---

### Stap 29 (bonus): Live zoeken

**Doel:** Reageren op typen, zonder de API te overspoelen.

**Opdracht:**

- De resultaten verschijnen al tijdens het typen, zonder dat je op Enter drukt.

<details>
<summary>💡 Hint</summary>

- Kijk naar `goto` uit `$app/navigation`, en vooral naar de optie `keepFocus`.
- Bij elke toets een verzoek sturen is veel te veel. Zoek op **debounce**: wacht tot de gebruiker even stopt met typen (`setTimeout` en `clearTimeout`).
- Docs: https://svelte.dev/docs/kit/$app-navigation#goto

</details>

**Klaar als…**

- [ ] Resultaten verschijnen terwijl je typt
- [ ] In het Network-tabblad zie je niet bij elke letter een nieuw verzoek

---

## Module 8: Mijn lijst

### Stap 30: Gedeelde state

**Doel:** State delen tussen componenten en pagina's.

**Opdracht:**

- Maak een bestand `src/lib/myList.svelte.ts` dat een lijst met opgeslagen items beheert.
- Het bestand heeft functies om iets toe te voegen, te verwijderen en te controleren of iets al in de lijst staat.

<details>
<summary>💡 Hint</summary>

- Runes (`$state`) werken ook in bestanden die eindigen op `.svelte.ts`.
- Je kunt een `$state`-variabele niet zomaar exporteren en opnieuw toewijzen. Lees in de docs hoe je state deelt tussen modules (bijvoorbeeld met een object of een class).
- Sla niet de hele film op, maar alleen wat je nodig hebt voor een kaartje (id, type, titel, poster).
- Docs: https://svelte.dev/docs/svelte/$state#Passing-state-across-modules

</details>

**Klaar als…**

- [ ] Je kunt het bestand importeren in een component zonder fouten

---

### Stap 31: De knop "+ Mijn lijst"

**Doel:** Gedeelde state gebruiken vanuit meerdere plekken.

**Opdracht:**

- Voeg een knop toe op de detailpagina (en eventueel op de kaart) die een item toevoegt of verwijdert.
- De knop toont "+ Mijn lijst" of "✓ In mijn lijst".

<details>
<summary>💡 Hint</summary>

- De tekst van de knop hangt af van je gedeelde state. Welke rune past daarbij?
- Staat de knop op een kaart die een link is? Zoek op `event.preventDefault()`. Is het netter om de knop buiten de link te plaatsen?

</details>

**Klaar als…**

- [ ] De knop wisselt goed
- [ ] Voeg je iets toe op de detailpagina, dan ziet de kaart op de homepage het ook

---

### Stap 32: Bewaren in de browser

**Doel:** Data bewaren na een refresh, en leren wat SSR betekent.

**Opdracht:**

- Zorg dat je lijst bewaard blijft als je de pagina ververst.

<details>
<summary>💡 Hint</summary>

- Gebruik `localStorage` (MDN). Je kunt daar alleen tekst in opslaan, dus zoek op `JSON.stringify` en `JSON.parse`.
- ⚠️ SvelteKit draait je code eerst op de **server**, en daar bestaat `localStorage` niet. Wat zegt de foutmelding?
- Met `browser` uit `$app/env` kun je controleren waar je code draait.
- Om automatisch op te slaan zodra de lijst verandert, kun je `$effect` gebruiken. Lees in de docs wanneer je `$effect` juist **niet** moet gebruiken.
- Docs: https://svelte.dev/docs/svelte/$effect

</details>

**Klaar als…**

- [ ] Na een refresh staat alles nog in je lijst
- [ ] Er staan geen fouten in de terminal of de browserconsole

---

### Stap 33: De pagina Mijn lijst

**Doel:** Alles samenbrengen.

**Opdracht:**

- Maak `/my-list` met al je opgeslagen films en series in een grid.
- Toon een melding als de lijst leeg is.

<details>
<summary>💡 Hint</summary>

- Heeft deze pagina een load-functie nodig, of komt alle data uit je gedeelde state?
- Kun je de grid uit je zoekpagina hergebruiken? Misschien is het tijd voor een `MediaGrid`-component.

</details>

**Klaar als…**

- [ ] Mijn lijst toont je opgeslagen items
- [ ] Verwijder je een item, dan verdwijnt het meteen

---

## Module 9: Afronden

### Stap 34: Responsive

**Doel:** Je site goed laten werken op mobiel.

**Opdracht:**

- Test je site op mobiel formaat en los alles op wat er lelijk of kapot uitziet.

<details>
<summary>💡 Hint</summary>

- Gebruik de _device toolbar_ in Chrome DevTools.
- Tailwind werkt **mobile-first**: classes zonder prefix gelden voor kleine schermen, en `md:` en `lg:` voor grotere.
- Waar loop je meestal tegenaan? De navbar, de hero-tekst en de detailpagina.

</details>

**Klaar als…**

- [ ] Alles werkt op een schermbreedte van 375px

---

### Stap 35: Toegankelijkheid

**Doel:** Je site bruikbaar maken voor iedereen.

**Opdracht:**

- Navigeer door je hele site met alleen het toetsenbord (Tab, Enter).
- Draai een Lighthouse-test (tabblad Lighthouse in Chrome DevTools) en verbeter je Accessibility-score.

<details>
<summary>💡 Hint</summary>

- Svelte geeft al waarschuwingen over toegankelijkheid in je editor en terminal. Lees ze!
- Zie je waar de focus is? Zoek op Tailwind `focus-visible:`.
- Knoppen met alleen een icoon hebben een `aria-label` nodig.

</details>

**Klaar als…**

- [ ] Je Lighthouse Accessibility-score is 90 of hoger

---

### Stap 36: Controleren en bouwen

**Doel:** Je app klaarmaken voor productie.

**Opdracht:**

- Zorg dat `pnpm check`, `pnpm lint` en `pnpm build` zonder fouten draaien.
- Bekijk de gebouwde versie met `pnpm preview`.

<details>
<summary>💡 Hint</summary>

- `pnpm format` lost de meeste lint-problemen automatisch op.
- Lees foutmeldingen van onder naar boven. Vaak staat de echte oorzaak onderaan.
- Ruim `test-api.js` uit stap 3 op als je hem niet meer nodig hebt.

</details>

**Klaar als…**

- [ ] Alle drie de commando's slagen
- [ ] De preview werkt net als in development

---

### Stap 37 (bonus): Online zetten

**Doel:** Je werk laten zien aan de wereld.

**Opdracht:**

- Zet je project op GitHub en deploy het naar Vercel of Netlify.

<details>
<summary>💡 Hint</summary>

- Je project gebruikt `adapter-auto`. Lees wat die doet.
- Je `.env` staat (terecht) niet op GitHub. Waar stel je `TMDB_TOKEN` dan in bij je hostingprovider?
- Docs: https://svelte.dev/docs/kit/adapters

</details>

**Klaar als…**

- [ ] Je hebt een live URL die je kunt delen 🎉

---

## 🏁 Klaar!

Gefeliciteerd! Je hebt een complete SvelteKit-app gebouwd. Zin in meer? Probeer dan eens:

- Filteren en sorteren op genre of jaar
- "Infinite scroll" of een knop "Meer laden" (TMDB-lijsten hebben een `page`-parameter)
- Een pagina per acteur (`/person/[id]`)
- Seizoenen en afleveringen van een serie
- Animaties met Svelte's `transition:` (https://svelte.dev/docs/svelte/transition)
