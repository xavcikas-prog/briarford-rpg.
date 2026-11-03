# Briarford v0.1 — mobilus Black Clover fanų RPG prototipas

Tai **neoficialus, asmeninis fanų projektas**, ne susijęs su „Black Clover“ teisių savininkais. Visa grafika piešiama programiškai naršyklėje: nėra importuotų anime paveikslėlių, muzikos ar mokamo AI API.

## Kas jau veikia

- 2D pixel art žemėlapis (viršaus perspektyva), vertikalus telefono ekranas.
- Sania, 15 m., su mažu nameliu Briarford pakraštyje.
- Veikėjo kūrimas: **pasirinkti 2 įgūdžius, 1 atributo bonusą ir 1 daiktą**.
- Ėjimas bakstelėjus su automatiniu maršruto radimu; žaidimo laikas slenka su judėjimu.
- 9 vardiniai NPC su paprastomis dienotvarkėmis, asmenybės rodikliais, santykiais ir trumpa atmintimi.
- Kontekstiniai pokalbiai, gandai, prekyba, dvi paprastos užduotys.
- Inventorius, patirtis, lygiai, atributai, naudojant augantys įgūdžiai.
- Šiaurinis miškas ir pagrindinė taktinė kova su vilku (AP ir papildomas veiksmas).
- Trys išsaugojimo vietos naršyklės `localStorage`, galimybė išsaugoti ir kovos metu, rankinis JSON eksportas/importas.
- PWA manifestas ir lokalaus veikimo talpykla (kai svetainė įkelta per HTTPS).

## Žaisti kompiuteryje

Aplanką galima paleisti tiesiog atidarius `index.html` Chrome ar kitoje šiuolaikinėje naršyklėje. Geresnis būdas paleisti vietinį serverį: `python -m http.server 8000`, tuomet naršyklėje atverti `http://localhost:8000`.

## Žaisti iPhone be mokamo hostingo

1. Susikurk **viešą GitHub saugyklą** (jei dar neturi GitHub, užsiregistruoti galima nemokamai).
2. Į saugyklos pagrindinį aplanką įkelk **visus** šio aplanko failus (ne vien ZIP).
3. GitHub saugykloje atsidaryk **Settings → Pages** ir pasirink publikavimą iš `main` šakos, katalogo `/ (root)`.
4. Atverk GitHub Pages nuorodą per iPhone **Safari**.
5. Safari bendrinimo meniu pasirink **Add to Home Screen / Pridėti prie pradžios ekrano**. Pirmam įkėlimui reikia interneto; po jo PWA gali veikti ir be interneto.

GitHub sąsajos žingsniai gali keistis. Viešos saugyklos turinys bus viešas. Asmeniniai išsaugojimai lieka įrenginyje, jie į GitHub nekeliami.

**Svarbu:** atidarius `index.html` iš iPhone „Files“ programos, JavaScript veikimas gali būti apribotas. Patikimiausia naudoti HTTPS prieigą per GitHub Pages. Taip pat iOS gali išvalyti svetainės saugojimo duomenis, todėl naudok JSON eksportą kaip atsarginę kopiją.

## Dabartinės ribos

Tai **ankstyvas prototipas, ne visas žaidimas**. ~140 Briarford gyventojų kol kas yra projekto vizija, o detaliai sukurti devyni aktyvūs NPC. Atskiri jų gebėjimų atributai ir pilnas ekonomikos, nusikaltimų, dinastijų, galingos magijos ir kanoninių anime veikėjų pasaulio simuliacijos kodas dar nesukurtas. Grimoaras sąmoningai lieka užantspauduotas. Miško kova skirta ėjimų logikos bandymui.

V1 valdikliai: bakstelėk laisvą žemėlapio langelį – Sania ten eis; bakstelėk NPC – prieis ir pradės pokalbį; atsidaryk „Žemėlapis“ – keliauk į mišką; miške bakstelėk vilką – prasidės kova.
