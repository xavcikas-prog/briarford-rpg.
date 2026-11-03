# Briarford RPG — v0.7

An **unofficial, independently written Black Clover fan RPG prototype** for personal offline-friendly iPhone play. Gameplay is in English. The original Briarford village and Sania are not canon.

**Play:** https://xavcikas-prog.github.io/briarford-rpg./

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
