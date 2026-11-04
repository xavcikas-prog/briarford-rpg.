# BRIARFORD RPG — VIENINTELIS PAGRINDINIS DARBŲ SĄRAŠAS

**Paskutinė peržiūra:** 2026-11-04  
**Kodo atskaitos taškas:** `main`, **2D v0.21 + eksperimentinis 3D vaizdas v0.22** (GitHub)  
**Apimtis:** visi žinomi šio projekto susitarimai, žaidėjo testų pastabos ir versijų aprašai iki v0.22.  
**Tikslas:** *žaidžiamas*, nemokamas ir offline-capable, portretiniam iPhone skirtas originalaus Sania nuotykio 2D pixel-art RPG Black Clover pasaulyje. Ne AI Dungeon scenarijus. Ne vien paveikslėlių projektas.

> **SVARBIAUSIA:** „Yra kode“ ≠ „pilnai veikia“ ≠ „patikrinta telefone“. Nevadinti funkcijos užbaigta, kol žaidėjas negali jos patikimai naudoti žaidime.

## Būsenos, įrodymų taisyklės

- `[x] KODE` — aptiktas konkretus įgyvendinimas GitHub; nereiškia, kad jis be klaidų.
- `[~] DALINAI` — veikiantis pradas / ribotas prototipas, bet trūksta numatyto gylio.
- `[?] PATIKRINTI` — pataisa ar funkcija aprašyta / įdėta, tačiau po paskutinių atnaujinimų reikia realaus iPhone ir seno išsaugojimo testo.
- `[ ] NEPADARYTA` — nėra pilnos žaidžiamos sistemos arba ji kol kas tik koncepcija / paveikslėlis.
- `[!] BUG` — žinoma ar tikėtina regresija; tikrinama pirmiausia.

**Definition of done:** egzistuoja reali gameplay funkcija + turi pasekmes / atsikartoja tinkamai + išsaugoma / įkeliama + neprieštarauja kanonui ir žaidėjo agency + pakanka UI + patikrinta mobilioje naršyklėje + priimtas žaidėjo testas. Kiekvienas reikšmingas pakeitimas: **kodo commit → testai → atskira GitHub `savepoints/vX.Y` šaka → šio sąrašo atnaujinimas**. Nepainioti kodo savepointų su asmeniniais JSON save'ais.

## 0. Nekeičiami projekto sprendimai

- [x] `CORE-01` Sania, 15 m., savarankiškai augęs našlaitis; nuosavas mažas namelis Briarford pakraštyje, nežinoma tikroji kilmė.
- [x] `CORE-02` Laikotarpis: rytas po Asta ir Yuno grimoarų ceremonijos, prieš Magic Knights atranką; veikėjai ir pasaulio taisyklės iš Black Clover, tačiau siužetas nėra iš anksto primestas.
- [x] `CORE-03` 2D top-down / 3/4 pixel-art; jokių privalomų klasių, laisvas gyvenimo kelias; touch / tap-to-move; taktinis ėjimais paremtas pasaulis ir kova.
- [x] `CORE-04` iPhone portrait PWA, veikia be mokamų AI API; NPC „AI“ dabar yra taisyklėmis valdoma simuliacija, ne tikras LLM.
- [x] `CORE-05` Žaidimo UI ir nauji dialogai anglų kalba; mūsų projekto planavimas gali būti lietuvių. Kanoniniai personažai turi veikti pagal jiems žinomą informaciją ir savo laikotarpį.
- [x] `CORE-06` Sania turi užantspauduotą neįprastą grimoarą; galimi keliai per eksperimentus arba pavojų; jokio priverstinio sandorio su demonu, jokio automatiško full power. Antroji prieštaringa galia ir demono tapatybė yra **paslaptys žaidėjui**.
- [x] `CORE-07` Visi svarbūs NPC turi turėti individualų, o **ne perspalvinto Yuno** modelį; naujas Sania vizualinis etalonas: 64×64, trumpi netvarkingi tamsiai pelenų rudi plaukai, ilgesnis durklas, squad-stiliaus tamsi apranga, anomalinis neaiškių spalvų efektas.
- [x] `CORE-08` Pagrindinė darbo taisyklė: funkcionalus žaidimas > gražus izoliuotas asset. Naujų splash-art / sprite sheet gamyba savaime neužbaigia jokios gameplay užduoties.
- [x] `CORE-09` Skelbiant versiją skirti **programiškai patikrinta**, **iPhone patikrinta** ir **galutinai priimta**. Nieko nevadinti AAA ar „visu pasauliu“ vien dėl atlaso įrašų.

## 1. Iki šiol įkelti etapai (KODE; ne galutinė kokybė)

| Versija | Faktinis etapas | Būsena |
|---|---|---|
| v0.1–v0.2 | Ankstyvas žaidžiamas Briarford prototipas: pasaulis, kelionės, veiklos, NPC, užduotys, RPG progresas, išsaugojimai. Konkrečias seniausių etapų smulkmenas patikrinti atskirai. | DALINAI |
| v0.3 | ~36 vietovių scheminis World Map, Hage / kiti regionai, įranga, magijos tyrimai, Vessa siuntinio turn-in pataisa. | KODE |
| v0.4 | Vienkartinės tilto užduoties būsena, STR treniruočių progresas, aiškesnė Magic Theory nauda, gandų sklaida. | KODE + QA |
| v0.5 | Atskirti World Map ir Local Map, Briarford miškas ir bokšto tyrinėjimas, mažiau vienodų gandų. | KODE + QA |
| v0.6 | ~17 pagrindinių NPC profilių, santykiai ir socialiniai veiksmai, 4 tyrimų / pasirinkimų grandinės, 18 magijos disciplinų. | KODE / DALINAI |
| v0.7 | 6 paspaudžiamos įgūdžių šakos ir grafiniai progresavimo medžiai. | KODE |
| v0.8 | Pirmoji ribota Unsteady Pulse manifestacija tyrinėjant arba pavojingoje kovoje; Living Ward priešas. | KODE |
| v0.9 | Yuno 116 kadrų 4 krypčių animacijų atlasas / peržiūra Hage. | KODE |
| v0.10 | Yuno animacijos ir judėjimo sinchronizavimas, foot anchor. | KODE + QA |
| v0.11 | Atskiros overworld ir combat animacijų būsenos / bendras rendereris. | KODE |
| v0.12–v0.13 | Programiniai Sania ir NPC / kanoninių veikėjų variantai, galerija. | LAIKINI PLACEHOLDERIAI |
| v0.14–v0.16 | Programiškai nupiešti atskiri siluetai Sania, Asta, Yuno, Noelle, Yami, Magna, Vanessa, Luck, Lily, Orsi, Witch Queen, 9 Briarford gyventojams. | DALINAI (žaidėjo netenkina detalumas) |
| v0.17 | AP + stamina, light/heavy strike, reach, aim, armory ir įranga. | KODE + QA |
| v0.18 | Magijos atributų / burtų kodexas, Mana Read, Controlled Breathing, kanoninė era riboja pažangius burtus. | DALINAI (daugelis tik aprašymai) |
| v0.19 | Kintantys NPC rūpesčiai, The Bitter River ir The Missing Convoy, skirtingos pasekmės / žinių plitimas. | KODE + QA |
| v0.20 | Keturi Hage ir Kikka interjerai / vietinės veiklos, atskiri regionų NPC variantai. | KODE + QA |
| v0.21 | Patvirtinto Sania dizaino 80 kadrų 64×64 atlasas: idle / run / dagger attack / užrakintas anomaly cast; įjungtas realiame žemėlapyje. | KODE + **iPhone QA laukia** |

**GitHub atkūrimo šakos:** `savepoints/v0.9-original`, `v0.10`–`v0.21` (pagal `savepoints/` prefiksą), ir `savepoints/v0.20-before-art-integration`. Originalaus žaidėjo asmeninio save JSON atsarginė kopija atskira.

## 2. P0 — sekantys darbai, pirmiausia stabilumas ir tikras vizualinis rezultatas

- [ ] `P0-01` **iPhone smoke test v0.21:** atsidaryti žaidimą, išsaugotą Day 5+ progresą, World/Local Map, Briarford mišką/bokštą, Hage ir NPC, treniruotes, Skills, inventorių, 1 kovą, 1 turn-in; fiksuoti tikrus JS/UX gedimus. Reikia žaidėjo telefono patvirtinimo.
- [ ] `P0-02` **Sania 64px detalumas gyvame žemėlapyje:** teisingas mastelis 16px tile'ams, foot anchor, kamera, skirtingos 4 judėjimo kryptys, tikri idle/walk/run ir be trūkčiojimo; nepakanka animation studio.
- [ ] `P0-03` **Animacijos logikos testas:** smūgio / gard / hurt / dash rodymas tik pagal realų veiksmą; ne vien laikmačio demonstracija. Sukurti aiškią baigtinės būsenos mašiną su prioritetais ir nutraukimais.
- [ ] `P0-04` **Žaidėjo progresas ir JSON:** patikrinti v0.4→v0.21 migraciją su realiu senu save, 3 slotai, export/import, neribojamas progresas persijungiant teritorijoms, offline paleidimas, cache atnaujinimai.
- [ ] `P0-05` **Neleisti spoilerių:** bet koks Sania demon/hidden-power sprite, splash screen, skill icon, combat efektas rodomas tik po atitinkamo gameplay atradimo; netikros „Devil Union“ formos neduoti už dyką.
- [ ] `P0-06` **Atnaujinti regressions po kiekvieno build:** bridge/Haldric, Elna/Vessa parcel, skelbimų lenta, treniruotės STR, Magic Theory, vietiniai žemėlapiai, talk/rumor sistemų negrįžimas prie senų dialogų.
- [ ] `P0-07` **Nekaupti `index.html` override grandinės:** išskaidyti v0.3→v0.21 wrapper'ius, action registrą, world state, save schema, rendererį, NPC/quest/magic modulius į testuojamus JS failus be funkcinių regresijų.
- [ ] `P0-08` **QA kiekviename įrenginyje:** foninis/iPhone Safari ir Home Screen režimas, kraštinės/scroll, FPS/atmintis su 64px veikėjais, netinkami touch hitbox'ai; niekada nevadinti „testuota iPhone“, kol to nėra.
- [ ] `P0-09` **Atnaujinimų valdymas:** kiekvienam didesniam etapui GitHub branch + testų protokolas + statusų pakeitimai šiame faile, kad būtų paprasta grįžti atgal.

## 3. P1 — pilnas žaidėjo ir kovos pagrindas

- [~] `PLAYER-01` 6 D&D pobūdžio stats STR/DEX/CON/INT/WIS/CHA, XP/level, įgūdžiai gerėja naudojant, dalis mokymo užduočių. **TRŪKSTA:** balanso, ribojimų, mokytojų/gyvenimo rutinos poveikio, uždirbamų gebėjimų kokybės.
- [~] `PLAYER-02` Inventory, prekyba, 3 equipment slots, ginklų damage/armor ir v0.17 shop. **TRŪKSTA:** pilnas equip HUD, lyginimo tooltipai, nešamo svorio/dydžio pasirinkimas, daiktų kokybė, patvarumas, remontas ir receptai.
- [~] `COMBAT-01` Tactical turn-based AP/stamina, ginklų reach, guard/aim/quick/heavy ir unikalus Ward. **TRŪKSTA:** skirtingų priešų taktikos, atakų signalų/telegraph, cover/elevation, AoE, kompanionų ėjimų, sklandaus combat UI.
- [ ] `COMBAT-02` Fizinės žaizdos pagal kūno dalis, kraujavimas, status efektai, nuovargis, gydymas, randai; pasekmės po kovos ir savarankiškas atsitraukimas.
- [ ] `COMBAT-03` Stealth, parry, dodge, grapple, counter, išsisukinėjimas, non-lethal, surrender, disarm ir nusikaltimų kova.
- [ ] `COMBAT-04` Kiekvieno pagrindinio kanoninio veikėjo ir NPC **tikras skirtingas kovos AI**, special attacks, individualus judėjimas, range/stance/mana ir išmokstamos taktikos; specialūs burtai galimi tik kai dera su era.
- [ ] `COMBAT-05` Gyvi puolimai ant žemėlapio: animacija → fizinis hitboxas → damage → status → knockback → garsas/VFX, geras 60fps pacing.
- [ ] `COMBAT-06` Daugiau priešų: goblinai, laukiniai žvėrys, banditai, magiški priešai, grupių susidūrimai, bosai; teisingi lygiai ir loot, ne tik vilkas ir sargas.
- [ ] `PLAYER-03` Daugiau profesijų be klasių: kalvis, medžiotojas, žvejys, prekiautojas, vagis, gydytojas, samdinys; praktika, darbo užsakymai, ekonomika ir reputacija.
- [ ] `PLAYER-04` Tikras crafting (kalvystė, žolelės, receptai, aprūpinimas), medžioklė, žvejyba ir maisto ruošimas, dienos laikas, rizika ir išmokstami įgūdžiai.

## 4. P1 — magija, grimoaras ir Sania paslaptis

- [~] `MAG-01` Interaktyvios 6 skiltys / 18 tyrimų gebėjimų medis, Insight taškai, reikalavimai, sujungimai. **TRŪKSTA:** magijos šakų tikros specializacijos ir patikrinamų poveikių kiekvienam mazgui.
- [~] `MAG-02` Magic Codex su ~15 atributų / veikėjų įrašais. **TRŪKSTA:** pilna manos ekonomika, burtų tikri hitboxai, cast laikas, range, cooldown, koncentracija, counters, AoE, terrain, sąveikos, skirtingų burtų evoliucijos.
- [~] `MAG-03` Unsteady Pulse išgryninimas v0.8: tyrimo arba pavojaus kelias, ribotas veikimas prieš magišką užtvarą ir strain/HP kaina. **TRŪKSTA:** daugiau realių magiškų susidūrimų, aiški strain ir sutrikimo fizika.
- [ ] `MAG-04` Pilna NPC magijos sistema **pagal prigimtinį atributą**, mokytoją, ranką/grimoaro puslapius, patirtį, franšizės laikotarpį; veikėjai negali laisvai „pirkti“ kiekvieno elemento.
- [ ] `MAG-05` Sania antspaudo etapai, tyrimų šaltiniai keliuose regionuose, prieštaringi įrodymai, žaidėjo pasirinkimai pasitikėti / atsisakyti / derėtis / tirti; sutarties kaina ir poveikis pasauliui.
- [ ] `MAG-06` Tikras ribotas antrosios prieštaringos galios atradimas, suderinamas su Black Clover kanonu; **neskelbti demono vardo/klasės ar antros galios žaidėjui prieš atrakinimą**.
- [ ] `MAG-07` Daugiašakis „Unknown“ medis, atsidarantis tik pasiekus žaidimo momentus; tikrai skirtingi sprendimų keliai, rizika, aftermath, jokio iš anksto privalomo „chosen one“ siužeto.
- [ ] `MAG-08` Sutvarkyti, kad Mana Skin, Mana Method, runos, Ki, devils, spirits, curses ir anti-magic būtų atskiri kanoniniai mechanizmai, ne vien pavadinimai meniu.
- [ ] `MAG-09` Demono vizualios stadijos pagal atradimus, ne kaip išankstinis spoileris: unikalaus demon modelio, sąveikos, judėjimo, manifestacijos ir kovos kūrimas **kartu su gameplay**, ne atskirai.
- [ ] `MAG-10` Svarbių maginių gebėjimų telegraph, apsauga nuo piktnaudžiavimo poilsiu, riboti resursai, aplinkos ir NPC reakcijos.

## 5. P1 — menas / animacijos, susietos su žaidimu

- [x] `ART-01` Yuno 116 kadrų bandymas ir specialus Hage animacijų testas (v0.9). Vėliau judėjimas tvarkytas v0.10.
- [x] `ART-02` Sania patvirtintas aukštos kokybės dizainas ir 80 kadrų 64×64 atlasas **įkeltas į realų `drawPerson('Sania')`** (v0.21).
- [?] `ART-03` Priimti v0.21 Sania modelį realiame iPhone: mastelis, foot anchor, judėjimas, keturios kryptys ir battle action keitimas; jei kažkas negerai, fiksuoti video ir taisyti.
- [ ] `ART-04` Sania 64×64 **walk** (atskirti nuo run), interact, turn, guard, parry, dash, hurt, heavy attack, knockdown, recovery animacijos gyvame žaidime; ne vien iliustracijos.
- [ ] `ART-05` Sania tikras Unsteady Pulse cast/VFX pagal unlock, animacijų pertraukiamumas, hitbox ir tikros dūmų/energijos sąnaudos.
- [ ] `ART-06` Patikrintų **unikalių ir panašaus detalumo**, o ne programiškai nupieštų abstrakčių, Asta, Yuno, Yami, Noelle, Magna, Vanessa, Luck ir kt. canon sprites perėjimas į game engine.
- [ ] `ART-07` Briarford 9 NPC atskiri veikėjų sprite setai (atpažįstami siluetai + animacijos + profesijų veiksmai), ne tik „kitokia spalva“.
- [ ] `ART-08` Enemy/NPC unikalios kovos animacijos / ginklai / VFX, tikslūs 64×64 arba didesni kadrai pagal kamerą; realus asset loader ir frame metadata.
- [~] `ART-09` Sania extra splash art, awakening sprite sheet, demon manifestation art ir kovinių animacijų vaizdai **sugeneruoti pokalbyje**, bet dauguma nėra integruoti į žaidimą; naudoti tik tada, kai gameplay pasiekia susijusį etapą.
- [ ] `ART-10` Art direction guide: 64×64 cell, nuosekli 4 krypčių tvarka, pivot/foot anchor, animacijų fps, kadrų trukmė, atlases/padding, spalvų paletė, per-actor motion signatures, griežta export QA.
- [ ] `ART-11` Originali grafika / leidimai: asmeniniam fan žaidimui remtis kanonu, bet neplatinti kitų autorių sprite'ų kaip savo ir tikrinti teises prieš viešą platinimą.
- [ ] `ART-12` Splash art prikabinimas prie įvykių, meniu/užduočių, tik jei tai pagrįsta siužetu; patogus skip/replay, iPhone resursų kontrolė.

## 6. P1 — NPC, socialinė sistema ir gyvas pasaulis

- [~] `NPC-01` 17 pagrindinių profilių: 9 Briarford + 8 ankstyvo kanono. Individualūs voice, ambitions, fears, relationships ir spoiler gating. **TRŪKSTA:** gilesnės gyvenimo istorijos, reakcijų, neriboto šabloninių dialogų kartojimo mažinimo.
- [~] `NPC-02` Socialiniai veiksmai: kalbėti, klausti, dovanos, ginčai, santykiai, reputacija, pasitikėjimas / pagarba / įtarumas. **TRŪKSTA:** ilgalaikis asmeninis ryšys ir NPC santykiai tarpusavyje.
- [~] `NPC-03` Dienotvarkės ir agenda, rumor diffusion, įvykių atmintis. **TRŪKSTA:** pilnos simuliacijos už ekrano, darbo, kelionių, žinių sklaidos per tikrus susitikimus.
- [ ] `NPC-04` Kiekvienas svarbus NPC turi asmeninį questline, gyvenimą, norus, ribotas žinias, nuomonę apie Sania, kitus NPC ir frakcijas; santykiai gali kisti be žaidėjo.
- [ ] `NPC-05` Theft, witnesses, evidence, crimes, patrol / guards, consequences, fines/prison, propaganda/false rumors ir teisinga informacijos sklaida.
- [ ] `NPC-06` Companions / ally recruitment, mercenaries, pets, loyalty, savarankiškas elgesys, įranga, NPC mirtis/gelbėjimas.
- [ ] `NPC-07` Romantika, draugystės, šeima, vaikai, paveldėjimas, lėtas senėjimas (sprendimas dėl sistemų laiko turi būti grindžiamas gameplay, ne automatinis).
- [ ] `NPC-08` Kanoninių personažų rašymo patikra pagal oficialius šaltinius, fandom naudoti tik hipotezėms; vengti būsimo kanono žinojimo iš anksto.

## 7. P1 / P2 — questai, vietovės, frakcijos ir ekonomika

- [~] `QUEST-01` Ankstyvos Briarford užduotys (malkos, geležis, tiltas, žolės, pėdsakai, Vessa siuntinys); vienkartiniai atlygiai ir turn-in kodas. Senas day-5 save turi 6 pavyzdines completed užduotis; visas grandines patikrinti iš naujo.
- [~] `QUEST-02` Keturi branching v0.6 tyrimai: Missing Ore, Granary Levy, Northern Watch, Silent Tower. Įrodymai, pasirinkimai, keli NPC – reikia išbandyti visas alternatyvas su save/load.
- [~] `QUEST-03` Du v0.19 tyrimai: Bitter River ir Missing Convoy, lokalūs įrodymai ir keli sprendimai. Tikrinti, kad negalima spręsti iš bet kur / dubliuoti atlygio.
- [ ] `QUEST-04` Sudėtingesnės NPC storylines, timed quests, escort, skill challenges, failure, negrįžtami pasirinkimai ir ilgalaikės pasekmės.
- [ ] `QUEST-05` Atskira quest completion mygtuko/turn-in UX taisyklė *visiems* NPC ir board, jokių dvigubų užduočių ir telepatiško užbaigimo.
- [~] `MAP-01` Schematiškas 36 vietų World Atlas (Clover, Heart, Diamond, Spade ir kt.), pažymėta canon/original. **TRŪKSTA:** tikro mastelio ir kintamų maršrutų; ne visos 36 pilnai žaidžiamos.
- [~] `MAP-02` Briarford Local Map (kaimas, miškas, bokštas), kai kurie namai ir bokšto kambariai, Hage/Kikka 4 papildomi interjerai. **TRŪKSTA:** visų kaimo namų/veikiančių durų, unikalių žemėlapių ir interakcijų.
- [ ] `MAP-03` Briarford kaip ~140 gyventojų tikra gyvenvietė: šeši rajonai, atskiros gyvenamosios vietos, dirbtuvės, taverna, upė/malūnas, miškas/bokštas; veikiančios durys, leidimai, spynos, gyventojai.
- [ ] `MAP-04` Hage full local map, stovi namai, bažnyčia, našlaičių namai / aplinkinės dirvos; Kikka – atsiskiriantys rajonai, turgus, užeigos, keliai.
- [ ] `MAP-05` Clover sostinė, Magic Knights būstinės, Heart/Diamond/Spade unikalūs miestai / biomai / kelių pavojai; 36 vietų atlasas nėra tas pats, kas 36 miestų žaidimas.
- [ ] `MAP-06` Kelionės su pasirinkimais, laikais ir resursais: kelių saugumas, pasalos, oras, stovyklos, caravan, regionų ekonomika, gamtinės kliūtys.
- [ ] `FACTION-01` Magic Knights entrance **tikras optional timed event**, atrankos užduotys, kapitonai, rezultatų pasekmės, stojimas/atsisakymas, frakcijų vidinė politika. Dabartinis Kikka practice yra **ne oficialus egzaminas**.
- [ ] `FACTION-02` Laisvi karjeros keliai už Knights ribų: banditas / amatininkas / prekybininkas / karavanų sargas / miestelio lyderis ir t.t.
- [ ] `ECON-01` Vietinė ekonomika: prekės ir jų tiekimas, prekybininkai, turtas, kainos, infliacija, mokesčių sistemos bei jų įtaka žaidimui.
- [ ] `ECON-02` Būsto, įrangos, darbo vietų ir nuosavybės sistema, pasaulio būseną keičiančios investicijos, inventoriaus/sandėliavimo kokybė.

## 8. Lokalizacija, kokybė, testai ir valdymas

- [~] `UX-01` Nauji UI/dialogai English, bet senesni LT pranešimai ir vartotojo seno save įrašai gali likti — **pilnas suvienodinimas neatliktas**.
- [~] `UX-02` Skills 6 kategorijos su paspaudžiamais mazgais; reikia mobiliojo išdėstymo, aprašų, tikrų specializacijų ir daugiau abilities.
- [ ] `UX-03` World Map vs Local Map aiškus atskyrimas; Hage / kitos regionų vietovės turi savo Local Map ir rodyti duris, quest log.
- [ ] `UX-04` Inventoriaus ir equipment HUD su stats, reikalavimais, įrangos pasikeitimais realiame Sania sprite; tooltipai, filtras, kategorijos.
- [ ] `QA-01` Dokumentuoti automatinius regresinius testus (žemėlapiai, įrankiai, quests, combat, NPC, saves) su realiais assertions, ne vien JS syntax check ar README pažadu.
- [ ] `QA-02` Visų esamų v0.1-v0.21 save formatų suderinamumas, migration versijos, cache busting, backup / rollback ir iPhone low-memory testai.
- [ ] `QA-03` Patvirtinti **visus** ankstesnius žaidėjo reportus: Vessa parcel, Haldric tiltas, tas pats skelbimų lentos quest, Garrick gandas apie save, per daug tilto gandų, local forest/tower, strength + magic XP.
- [ ] `OPS-01` Prieš kiekvieną didelį atnaujinimą užregistruoti užduočių `TASK-ID` ir testų scenarijus; po atnaujinimo statusą ir GitHub commit / savepoint.
- [ ] `OPS-02` Atnaujinti `DESIGN_BIBLE.md`, dabar jis žymimas v0.6 ir nuo v0.8 tik papildytas; išlaikyti kanono laikotarpio, galių, geografinio pasaulio ir žaidėjo agentiškumo nuoseklumą.
- [ ] `OPS-03` Iki tol, kol nėra nuoseklaus iPhone testo, **neskelbti** „visos animacijos veikia“, „visas pasaulis padarytas“, „NPC tikras AI“, „visi burtai sukurti“.

## 9. Sekančio kūrimo ciklo siūloma tvarka

1. **v0.22 Stability & Sania**: `P0-01,02,03,04,05,06` — tikras Sania 64px testas, tinkami combat action frames, iPhone regresijos, išsaugojimai. *Nepridėti naujų izoliuotų paveikslėlių.*
2. **v0.23 Combat Integration**: `COMBAT-01–05` — animacija/hitbox/damage, hurt/guard/dash, AI, nauji priešai. Tikrinami valdymo veiksmai.
3. **v0.24 Magic Integration**: `MAG-02–04, MAG-08, ART-05` — realūs compatiblūs burtai, maną naudojantys NPC, aktyvus Sania ribotas impulso VFX, unlock gating.
4. **v0.25 Briarford Living Village**: `NPC-01–05, QUEST-04/05, MAP-03` — gyventojų darbotvarkės, namai, sutartys, daugiau gyvenimiškų veiklų ir reakcijų.
5. **v0.26 Character Art High Quality**: `ART-06–08,10` — didelio detalumo Asta, Yuno, Noelle, Yami, kiti. Kiekvieną integruoti su gameplay ir naudoti aiškų art QA.
6. **v0.27+ Canon World Expansion**: `MAP-04/05, FACTION-01, MAG-05–07` — tikri miestai, atskiros karjeros, Knights atranka ir ilgametė grimoaro istorija.

**Pastaba:** etapų numeriai yra planas, ne pažadas, kad visa išvardyta jau sukurta. P0 regresijos turi pirmenybę prieš naujus feature.


## 11. Atskirai patvirtintas 3D bandymas — nesupainioti su pagrindiniu 2D žaidimu

- [x] `3D-TEST-01` Sukurta atskira `?view=3d` peržiūra iš to paties žaidimo, numatytasis 2D režimas nepakeistas.
- [x] `3D-TEST-02` Tikras WebGL erdvinis rendereris: perspektyva, pasukama kamera, pastatai, medžiai, upė, keliai, low-poly veikėjai, 3D touch picking, perjungimas 2D, tie patys NPC/quests/world state.
- [x] `3D-TEST-03` Kodo atkūrimo taškai prieš eksperimentą ir po jo; asmeninių save slotų išankstinės kopijos į atskirus localStorage raktus; originalūs slotai atidarius 3D nėra perrašomi.
- [?] `3D-TEST-04` **Fizinio iPhone Safari** testas: kamera ir FPS, tap-to-move NPC, Briarford miškas/bokštas, Hage, namų interjerai, inventory, save/load, ar nepažeistas UI. Testavimo aplinka blokuoja realų WebGL, todėl neskubėti laikyti kokybės patvirtinta.
- [ ] `3D-TEST-05` Jei 3D tinka — tikri individualūs canon/Sania 3D modeliai su rigging/animacijomis, architektūra, biomai ir sąveikų vizualizacija; dabar tik stilizuoti 3D maketai. Nekeisti 2D bazės kol žaidėjas aiškiai nepatvirtina.
- [ ] `3D-TEST-06` Jei 3D netinka — tiesiog grįžti į `./` 2D URL; GitHub kodas ir atkūrimo šaka leidžia atšaukti eksperimentą be naujos žaidimo logikos.

**Atidaroma:** `https://xavcikas-prog.github.io/briarford-rpg./?view=3d` (3D) arba `https://xavcikas-prog.github.io/briarford-rpg./` (2D).

## 10. Nuolatinio sekimo protokolas

- Kiekvieno naujo vartotojo prašymo pradžioje atsidaryti **šią** bylą ir naujausią GitHub kodą.
- Kiekvienai vartotojo pastabai suteikti unikalų ID; neišmesti atvirų darbų pakeitus temą.
- Kiekvienas kodas/assetas žymimas tik **KODE/DALINAI**, kol praeina išmatuojamas funkcionalumo ir (kai svarbu) iPhone QA.
- Sekti `main` ir `savepoints/`, naudoti kodą kaip tiesos šaltinį. README aprašai ir sugeneruoti paveikslai nėra funkcionalumo įrodymas.
- Automatinėje periodinėje patikroje **nėra pakeitimų → nereikia pranešimo**. Netęsti žaidimo kūrimo autonomiškai be aiškaus prašymo. Statusą keisti tik remiantis iš tikrųjų įdiegtu kodu / atliktais testais.
- Susirašinėjimo kartų pabaigoje nurodyti: **kas pakeista, kas liko, kokie QA atviri, koks savepoint**. Periodinė užduotis gali patikrinti repozitorijos atnaujinimus, bet negali pakeisti realaus žaidėjo testavimo.

**Nuoroda:** žaidimas `https://xavcikas-prog.github.io/briarford-rpg./` · GitHub `https://github.com/xavcikas-prog/briarford-rpg.`

---
*Šis failas yra nuolatinis projekto backlog. Keičiantis žaidimui taisyti jį, ne kurti kas kartą naują prieštaraujantį planą.*
