# Briarford RPG — 2D v0.23 (wolf visibility patch; iPhone QA pending) + optional 3D experiment v0.22

**Project planning source of truth:** [PROJECT_TASKS.md](./PROJECT_TASKS.md) — maintained backlog of implemented code, partial prototypes, missing mechanics, known regressions and next priorities. Never equate generated graphics with working gameplay.

An **unofficial, independently written Black Clover fan RPG prototype** for personal offline-friendly iPhone play. Gameplay is in English. The original Briarford village and Sania are not canon.

**Play:** https://xavcikas-prog.github.io/briarford-rpg./

## v0.23 step 1 — IPH-BUG-01 wolf visibility (code complete; user acceptance pending)
- The forest wolf is now a readable, high-contrast pixel model overlaid at its real combat tile (no changes to combat rules or saves).
- A square target highlight turns green when your current weapon can reach the wolf, amber when it cannot. Bow and spear range are honored.
- During combat, the wolf has a readable **WOLF** label and live HP bar; if it moves beyond the viewport, an edge indicator remains.
- The wolf disappears after being defeated; the magical Living Ward and other zone scenes keep their own appearance.
- Regression harness: `node tests/wolf-visibility.test.cjs` (12/12 verified in an isolated JavaScript runtime; the full page script also parsed).
- **Not yet physically accepted** on iPhone Safari. This task remains pending mobile review; the next combat HUD redesign will not start until this step is accepted.
- Restore code from `savepoints/v0.22-pre-combat-ux` or `savepoints/iph-bug-01-wolf-visibility`.

## Optional 3D TEST (v0.22; separate from normal 2D)

- **2D original remains default:** https://xavcikas-prog.github.io/briarford-rpg./
- **Optional 3D prototype:** https://xavcikas-prog.github.io/briarford-rpg./?view=3d
- This is the SAME RPG state and menus, not a second game. World Map, Local Map, NPC conversations, combat, quests, inventory, skills and saved slots still use the original 2D rules.
- The 3D canvas uses custom lightweight WebGL (no external CDN or paid APIs), with perspective terrain, low-poly buildings, paths, water, forests, stylized 3D characters and a follow/orbit camera. Drag to rotate, tap to walk/interact, +/− to zoom, 2D to return.
- Visuals are **prototype 3D geometry**, not full-detail anime character models. This is a renderer test to decide if the gameplay should ultimately transition to 3D.
- Entering 3D copies any existing slot to separate `briarford_pre3d_slot_{1..3}` local backup keys once. Original slots are not overwritten merely by opening 3D, **but saving inside 3D uses normal save slots**. Export JSON backups before testing to prevent any accidental overwrite.
- 2D main remains unchanged except for an optional `Try 3D` shortcut; dropping `?view=3d` immediately restores normal 2D. Code rollback checkpoints: `savepoints/v0.21-pre-3d` and `savepoints/v0.22-3d-test`.
- Important: WebGL runtime and actual 3D presentation have NOT yet been verified on a physical iPhone. Chromium sandbox here disallows real WebGL contexts; JS parser and simulated GPU flow pass, but mobile screenshots/interaction still need user testing.
- Not a complete 3D remake of every city or character. Lore/story/progression are inherited, while 3D level art is an early general-purpose procedural renderer.

## New in v0.21 — integrated actual Sania pixel art
- Replaces Sania's geometry-built placeholder **in the playable game** with an original approved high-detail 64×64 frame atlas.
- 80 distinct cells: 4-direction idle (4 frames), run (8 frames), dagger attack (4 frames), and unstable casting (4 frames).
- Existing world navigation and combat logic now directly select animation frames; built-in **Activities → Preview Sania 64px animations** gives a test surface.
- Anomaly casting is deliberately unavailable in the preview until the first manifestation is obtained through real gameplay. No forced demon appearance or spoiler.
- The optimized source artwork is stored as a WebP payload (`assets/sania-64-atlas.b64`) and loaded/cached as an image. Fallback to previous models if decoding fails.
- Savepoint `savepoints/v0.21` retains this version; pre-change code is `savepoints/v0.20-before-art-integration`.
- This is a real game-integrated animation update, **not** a claim that all generated demon/combat splash art has been wired. Additional long-form combat and demon visuals remain assets for later mechanical integration.

## New in v0.20 — Contextual buildings and local-world exploration
- **Hage Village**: enter a custom chapel and village storehouse, walk within each distinct map, investigate furnishings and leave through the entrance.
- **Kikka**: enter the Magic Knights examination registry and a roadside inn. Register only a non-binding interest, take aptitude *practice* (not the full entrance exam), rent a room, hear traveler rumors.
- Church records and daily assistance are optional; no arbitrary chosen-one plot or automatic demon revelation.
- New interiors use `site:chapel`, `site:guild`, `site:exam`, `site:inn`, with location-aware menus and remembered flags.
- Buildings can be reached via Activities → Local venues or mapped settlement points. Other cities currently retain the original regional templates.
- Restore checkpoint: `savepoints/v0.20`. All previous branches v0.13–v0.19 retained.
## New in v0.19 — Life beyond static quests
- Daily NPC agendas determined by local supply/food, public concerns and road/river conditions. They can change without Sania accepting a mission.
- Village events spread from witnesses through NPC knowledge networks on later days; no universal instant knowledge.
- **The Bitter River**: investigate Mira, Liora and an actual river sample; resolve by field-made filters (materials), a publicly funded fix (tax implications) or public warning. Each choice changes the world.
- **The Missing Convoy**: collect Vessa manifest, Orven guard report and forest tracks; escort with supplies, hire scouts or warn travelers. Outcomes affect road security and relationships.
- Quests persist in `state.flags.v19` and can be resolved only once. Major resolutions require physically reaching the relevant location/person.
- Activities → Village Developments offers an overview and optional entry point; important NPCs offer the same story context.
- Savepoint: `savepoints/v0.19`.
## New in v0.18 — Attribute-bound magic
- 15 listed magic attributes and a starter set of documented character spells (Wind, Water, Fire, Lightning, Dark, Thread, Anti-Magic, Unknown), each with range/AP/mana and grounded owner.
- Future-era canon spells stay locked; no instant arbitrary Fire/Water/Dark spells for Sania.
- Tactical **Mana Read** (requires Mana Perception) and **Controlled Breathing** (requires discipline) now change combat guard/stamina/strain.
- Sania's first known pulse remains an anomaly, not a licensed copy of Asta's devil power.
- Activities → Magical Traditions gives a compact, categorized canon-aware spell codex.
- Restore branch: `savepoints/v0.18`.
## New in v0.17 — Real equipment & tactical options
- Tactical stamina pool: 8 points, recovering each turn; attacks must pay AP and stamina.
- Light, standard and heavy strikes with different hit chances, damage and potential stagger.
- Weapon reach matters: bows can attack at range, spears from two tiles, blades within one tile.
- Aim grants accuracy at a bonus-action cost.
- Armor remains part of combat defense; new weapon/armor choices in the Armory while in settlements.
- Existing wolf/ward encounters still work, including the sealed grimoire pulse and player defeat.
- Rollback checkpoint: `savepoints/v0.17`.
## New in v0.16
- Every existing **named Briarford villager** now has an original sprite geometry rig: Liora, Renn, Teren, Garrick, Mira, Haldric, Orven, Vessa and Elna.
- Distinct village roles and silhouettes: hunter's bow and equipment, smith's apron and hammer, water healer's robe, watch captain's spear and shoulder plates, trader's bags, elderly staff and practical apprentice clothing.
- Generic town trader/guard/smith also use distinct custom base shapes; these are no longer recolored Yuno silhouettes.
- Characters retain separate palettes, movement speed and animations. Further bespoke art cleanup and signature combat AI remain upcoming.
- Rollback checkpoint: `savepoints/v0.16`.
## New in v0.15
- Additional hand-structured pixel silhouettes for Magna, Vanessa, Luck, Sister Lily, Father Orsi and Witch Queen.
- Fire, thread, lightning, water, staff and blood-colored spell preview VFX are distinct, rather than repainted Yuno wind effects. Future-arc techniques are NOT automatically granted at start.
- Characters still need deeper hand-authored combat AI and regional appearances; these models are original test assets, not exact anime screenshots.
- GitHub rollback: `savepoints/v0.15`.
## New in v0.14 — individually drawn pixel silhouettes
- Bespoke geometry-based pixel character rigs, **not recolors** of Yuno frames, for Sania, Asta, Yuno, Noelle and Yami.
- Distinct proportions, boots anchors, hairstyles, wardrobe and physical combat gestures per role.
- Asta has compact broad shoulders and blade-heavy animation; Yami is taller; Noelle has long silver hair and a different casting silhouette; Yuno has a lean wind caster stance; Sania has practical clothing and a short sword.
- All are drawn into 116 individually animated 32×40 pixel cells at runtime without extra paid assets.
- Noelle's art is preview-only in the opening-era world; no canon time skip is forced.
- Savepoint: `savepoints/v0.14`.
## New in v0.13 — Shared NPC art standard
- Reused a single **116-frame 4-direction pixel rig** to generate distinct, original in-browser skins for existing village residents, regional merchants/guards/craftspeople and the visible early-story canon cast.
- Canon-inspired looks: Asta (pale spiky hair/headband), Yami (tall dark silhouette), Magna (orange hair/goggles), Vanessa (rose hair/hat), Sister Lily (pale veil), Father Orsi (clerical robe), Witch Queen (crown/cloak). Noelle and Luck are available for art preview but **not spawned into the wrong story era**.
- Briarford's nine named NPCs have individual hair/clothing palettes and selected profession accessories.
- **Activities → Character art preview** opens an animated character gallery with four directions and idle, run, attack, defend, hurt, dash test actions.
- Asset generation happens locally, gradually and offline-friendly; sprite artwork remains a **prototype interpretation**, not exact official studio artwork or final licensed character art.
- Four GitHub checkpoints: `savepoints/v0.10`, `savepoints/v0.11`, `savepoints/v0.12`, `savepoints/v0.13`. Original v0.9 checkpoint also preserved.
- Existing saves and combat stats unchanged.
## New in v0.12 — Playable Sania sprite
- Sania now renders through the same 4-direction pixel actor pipeline as Yuno, with a **distinct original charcoal-green coat, chestnut hair and warm-gold accents**, not Yuno's character palette.
- The atlas is recolored in the browser from the existing edited 116-frame source: no extra network request is required.
- Sania has idle, directional run, and visually distinct combat attack, hurt, defense and dash actions.
- Research/casting visuals are restricted until the sealed grimoire has manifested; these are animations, not extra learned spells.
- Town NPC and player animations update independently of game time, without affecting movement, quests, items or saves.
- Restore checkpoint: `savepoints/v0.12` branch.
## New in v0.11 — Shared animation pipeline
- Separate state maps for **overworld** (idle, walk, run, interact, light cast) and **combat** (attack, cast, defend, hurt, dash, knockdown, special).
- Unified animated actor registry with distinct skins, speeds, directional actions and visual pose lifetimes.
- Player combat toolbar now publishes visual actions without changing damage or XP mechanics.
- Yuno overworld motion interpolation and all previously unlocked skills remain intact.
- Restore checkpoint: `savepoints/v0.11` branch.
## New in v0.10 — Overworld motion correction
- Yuno moves smoothly between tile centers; animation frames advance by distance traveled, not an independent clock.
- Foot-anchor normalization prevents vertical sprite jitter across animation frames.
- The previous 760ms instant tile-teleport loop has been disabled and replaced with a lightweight requestAnimationFrame renderer.
- Four-direction idle/walk/run rendering, pausing movement for dialogue and saving existing progress.
- This is a savepoint: `savepoints/v0.10` branch.
## New in v0.9 — animated Yuno visual test
- Integrated a **116-frame top-down pixel art sprite atlas** at `assets/yuno-animated-atlas.png`, rebuilt using an image supplied as a visual reference by the player.
- Yuno in **Hage Village** now uses original 4-direction animated idle and run frames on the actual overworld canvas instead of the simple placeholder character.
- He walks a short path during local life, while remaining interactable through the existing NPC conversation system.
- Speak to Yuno and select **Preview all 9 animations** to view idle, running, attack, wind cast, defend, hurt, dash, knockdown and wind bird; choose one of four directions where supported.
- Hage's **Activities → Open animation studio** provides a shortcut. Yuno's dialogue also includes **Watch wind magic in the village** and **Watch Yuno sprint**.
- The combat and wind spell animations in this version are **visual demonstrations only**, not a new tactical duel or newly unlocked canon spells. They do not change Sania's progress.
- Existing save slots are retained. This sprite pack is a fan-art test, not a licensed asset pack; get permission or replace with fully independent art before broader public distribution.

## New in v0.8
- Organic first grimoire manifestation with **two independent paths**: (1) deliberate research and (2) a real near-fatal danger moment. Neither forces the player to accept an unknown power or makes a devil pact.
- The research path requires eight binding observations, three different in-world study days, at least Magic Theory 30 and an independent comparison (learn Observation or study the watchtower evidence). The attempt uses an INT check; failed attempts cause minor harm and leave evidence, with a guaranteed discovery after enough careful attempts.
- Danger path may be prompted during life-threatening combat after exposure to genuine anomalous evidence. Player may accept a brief release or refuse; refusal can mean defeat. This cannot be farmed every round and does not grant immunity to injuries.
- The **Unsteady Pulse** disrupts an active magical ward (shield and charging attack for two turns), but **does not negate physical attacks**. It costs 2 AP and HP, raises strain, and is limited to one use per game day initially.
- New optional **Living Ward** encounter in Briarford's abandoned watchtower. The animated-looking pixel glyph is a real rendered, damageable tactical opponent with shield, charging magic, collision and counterplay. It can also be beaten with weapons or escaped; grimoire research is never compulsory.
- Multiple careful uses across distinct days make the first pulse more controllable (two uses per day, lower cost). This is **not** a full devil form, Anti Magic arsenal, or a second power reveal.
- The **Unknown** discipline now displays an actual green, connected Unsteady Pulse node only after in-world manifestation. Details and strain are visible on demand; unrevealed pages stay hidden.
- Existing v0.1–v0.7 save slots stay compatible. New progress persists solely under `state.flags.v08`. Export your current save as JSON before updating.

## New in v0.7
- Rebuilt the Skills / Magic & Discipline screen for iPhone: a grid of **six tappable discipline cards** (Perception, Discipline, Theory, Defense, History, Unknown) instead of a tall list of all 18 nodes.
- Every discipline opens a compact **visual progression tree** with connected nodes and learned / available / locked states. Tap any node for its full description, requirements, cost, teacher/region prerequisites and a safe Learn button.
- A separate **Techniques & spell notes** section shows short tappable entries and longer explanations only on demand. Clearly distinguishes passive effects, research/theory and spells that Sania cannot cast.
- Persistent insight costs, skills, existing unlocks and previous save slots are unchanged. The undiscovered grimoire remains unrevealed.
- Tested at mobile viewport widths 320px, 375px, 390px and 430px with horizontal overflow checks.

## New in v0.6
- 17 major named NPCs with distinct goals, fears, flaws, values, voice styles, magic/lore boundaries, individual relationships, dialogue and remembered interactions.
- Canon profiles for Asta, Yuno, Sister Lily, Father Orsi, Yami Sukehiro, Magna Swing, Vanessa Enoteca, and the Witch Queen grounded in the official anime and reference materials. NPCs cannot casually disclose their future storylines or give away their canonical powers.
- New **People & Lore** panel and individual profiles. Sensitive goals/fears/weaknesses become visible through conversation and trust; no automatic spoilers.
- Social actions: questions about ambitions/concerns/history, role-specific rumors, gifts with individual preferences, arguments, personal favors, respect/trust/suspicion.
- Four **branching investigations**: The Missing Ore (Garrick, Teren, Vessa and Orven), The Granary Levy (tax choices), Northern Watch (forest danger) and The Silent Tower (sealed historical marks). Evidence must be found by meeting the right NPC or visiting the right zone, not through remote collection buttons.
- Branch outcomes change village supply, levy tension, guard standing, trade relationships or road danger; village news spreads to NPCs over time.
- 18-entry **Magic & Discipline** research tree: perception, discipline, theory, defense, history and sealed mystery. Includes canon-consistent Rune Geometry / Mana Method *theory* and Ki Awareness requiring experience with Yami.
- Sania grimoire research: observe, copy signs, resist or listen to pressure, ask a question without making a pledge, and explicitly stop. No automatic pact or invincible Anti Magic form.
- Retains Local Map, World Map, village interiors, tower, NPCs, equipment, old seven jobs and save slots from v0.5.

## Gameplay paths
Talk to **Garrick** about *The Missing Ore*, **Haldric** about *The Granary Levy*, **Orven** about *Northern Watch* or **Liora** about *The Silent Tower*. Or find these leads in **Activities → Investigations**. Visit the relevant NPCs and areas to gather evidence, and speak with the responsible person to resolve the matter.

Tap **People & Lore** to inspect your known relationships and the world's magic traditions. Tap **Skills** for the expanded discipline tree. Use **Activities → Study the sealed grimoire** to investigate privately without triggering a forced plot.

## Save safety
Existing save slots and the world-state format remain compatible. These quests and relationships are added under `state.flags.v06`, avoiding a save reset. **Export a JSON save backup first** using the existing Save interface, especially before long testing. Safari and installed web app storage can behave differently; keep your backup.

## Important limitations
This is **not** the fully simulated multi-kingdom AAA-style RPG yet. The 17 named NPCs have manually authored character profiles; secondary town residents still use simpler role-based dialogue, and most buildings/regions still need unique maps. The 18-node tree contains research and physical disciplines—not a completed spell-casting system. Many older legacy event strings can still appear in Lithuanian. Player choice matters in the new investigations, but wider economy, factions, real multi-enemy magic combat, companions, family systems and the main multi-arc demon storyline remain future work.

Read **DESIGN_BIBLE.md** for canon/source boundaries and the evolving architecture.

## Canon and community sources
- Official anime: https://bclover.jp/world/ ; https://bclover.jp/en/character/asta.php ; https://bclover.jp/en/character/yuno.php ; https://bclover.jp/character/yami.php
- Fan reference: https://blackclover.fandom.com/wiki/Mana ; https://blackclover.fandom.com/wiki/Grimoire ; https://blackclover.fandom.com/wiki/Devil ; https://blackclover.fandom.com/wiki/Liebe
- Community discussion: https://www.reddit.com/r/BlackClover/comments/10owtk2 ; https://www.reddit.com/r/BlackClover/comments/1m1v2u4

No copyrighted anime screenshots, art or manga dialogue is included in the game itself.
