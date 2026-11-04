# Briarford RPG — v0.15

An **unofficial, independently written Black Clover fan RPG prototype** for personal offline-friendly iPhone play. Gameplay is in English. The original Briarford village and Sania are not canon.

**Play:** https://xavcikas-prog.github.io/briarford-rpg./

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
