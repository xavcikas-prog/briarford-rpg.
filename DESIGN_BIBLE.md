# BRIARFORD RPG — SYSTEMS & CANON BIBLE (v0.6)

Status: independent, unofficial Black Clover fan RPG for personal testing. This is a *design and implementation reference*, not a representation of official canon. The player's story begins just after Asta and Yuno's grimoire ceremony, before the Magic Knights entrance examination. Later canon events are **not** assumed to have happened. The simulation can diverge from canon; spoiler-related historical reveals must be gated by events and character knowledge.

## Fundamental principles

1. **Freedom with causality:** do not automatically act for Sania, assign a destiny, hand out powers, choose factions or settle moral decisions. Quiet workdays count as gameplay.
2. **NPCs as people:** identity, voice, motives, fears, values, relationships, resources, location, agenda, knowledge and incomplete information are persistent. No omniscient gossip.
3. **The world persists:** a repaired bridge stays repaired, a delivered item stays delivered, and characters learn about events via witnessing or conversation rather than instant global knowledge. Every story should have consequences visible beyond an XP notification.
4. **Player discovery:** world lore should emerge through observation and dialogue, not an automatically exposed character spoiler sheet. Early access to famous canon characters is not automatically access to their equipment, allegiance or secrets.
5. **Realism within high fantasy:** magic consumes effort and resources, physical injuries matter, and an inexperienced villager cannot overpower a Magic Knight captain by repeating a training button.
6. **Canon with original space:** honor confirmed abilities and personality. Mark every original village, NPC and interpretation as an original addition, never an official Black Clover fact.
7. **Offline, personal, iPhone portrait:** no subscription or paid AI API. Rule-based dialogue/state-machine interaction is honest, not a simulated claim of unlimited AI.

## World geography and progression

- Canon kingdoms: Clover, Heart, Diamond, Spade, plus Witches' Forest, Undersea Temple and Land of the Sun, with schematic in-game route atlas.
- Original Briarford is a small Clover frontier settlement near the boundary of the Common and Forsaken Realms; it is not a canon location.
- Main local areas: cottage, village, forest, abandoned watchtower, enterable interiors.
- The atlas intentionally marks approximate relationships, not a precise travel-scale copy of a canon map. Fast travel is a prototype convenience; later builds should require actual routes, supplies, mounts and permissions.
- Some canonical locations, characters and factions are appropriate for the story's opening era, but characters should not act as if their future arcs already happened.

## NPC simulation model

Three layers, all persistent and upgradeable:

**Major named NPC**: full goal, voice, temperament, fears, flaws, role, magic, affiliations, possessions, job routine, relationships, memories, reputation, knowledge, agendas, quest and event reactions.

**Named secondary NPC**: distinct schedules, role-specific personality generated once from a stable seed, relationships and local quests. Add to the main layer as they become narratively important.

**Ambient population**: simulated households, ages, jobs, consumption and social ties, brought into detailed simulation near the player. Avoid pretending that 140 people individually run every AI routine when only a few do.

Current v0.6 detailed profiles (17):

- Original: Liora, Renn, Teren, Garrick, Mira, Haldric, Orven, Vessa, Elna.
- Canon: Asta, Yuno, Sister Lily, Father Orsi, Yami Sukehiro, Magna Swing, Vanessa Enoteca, Witch Queen.

Each major NPC has a defined style of speech, ambition, fear, weak point, values and shared history, along with relationship-dependent dialogue and social actions. The village's social network spreads news over time. The player's personal Knowledge screen should not reveal undiscovered private information.

### Social interaction pipeline

`Player action → witness / recipient → skill / history / motive check → immediate consequence → memory → reputation → possible rumor spread → changed future behavior`.

Support trust, respect and suspicion independently, not only a single relationship score. Gifts have individual preferences and daily limits; arguments can succeed or strain trust; favors must be earned. Theft and false accusation should matter later in the world. NPCs must not share information they could not know.

## Skill and magic architecture

**Do not offer unrestricted purchasable element classes.** In Black Clover, innate attributes are normally possessed from birth. Individual spells are acquired through training, growth and significant experiences; grimoires develop in response to the owner's maturation. Standard grimoire receipt is at age 15.

Spell taxonomy: natural attributes (fire, water, earth, wind); derived/rare attributes (such as lightning, ice, steel, light, spatial, dark, etc.); application methods (Creation, Reinforcement, Healing, Curse, Trap, Sealing); advanced control (Mana Skin, Mana Zone), Heart Kingdom arrays/Mana Method; exceptional Devil and Spirit related cases. For a person with an innate attribute, the attribute and learned spell catalog should persist, with casting gated by mana, technique, compatible grimoire, mentors and context. This is a proposed simulation taxonomy, not a statement that a single mage can access all these categories.

### v0.6 learnable discipline tree

- Perception: Magical Observation, Arcane Research, Mana Perception Theory.
- Discipline: Controlled Breathing, Combat Discipline, Ki Awareness (after meeting teacher), Measured Guard, Body Balance.
- Theory: Elemental Patterns, Spell Formation, Runic Geometry, Mana Method Research (requires Heart field knowledge).
- Defense: Mana Skin Theory, Warding Analysis, Concentration Under Pressure.
- History: Ancient Records, Unusual Grimoires.
- Unknown: unopened pages, **not purchasable**.

These are theories and physical disciplines, not an already implemented array of active spells. Some apply combat and research bonuses, others are progression prerequisites. Later implementation: mana resource economy; grimoire pages/spells; cast costs, cast times, miscasts, counters; positional AoE, allied risks; talent synergy and enemies using spells; temporary concentration and fatigue; attribute match-ups with material and terrain.

## Sania's sealed grimoire: spoiler-safe rules

- Sania is 15, independent, orphaned, and does not know his origin.
- He obtained a **sealed and anomalous grimoire** at the opening ceremony. Its deeper identity, the bound entity's motives, and the contradictory second power should remain discoveries, never prefilled as things Sania knows.
- Canon Asta obtains Anti Magic through Liebe. **Do not copy Asta's sword set or give Sania the same power for free.** Any parallel needs a unique origin, an actual price, a distinct mechanism and limits.
- Early gameplay focuses on observation, research, inner pressure and informed choices. Listening, resisting and stepping away are **player-chosen**; pressure never forces an arbitrary pact in a menu.
- Sania's seal should resist ordinary mana, show contradictory signatures only when justified, and have real consequences in future action resolution. The locked entity is not a constantly chatting sidekick or an instant transformation buff.
- Long-term narrative gates (future): evidence from several locations; conflicting witness accounts; discovery of a cost; moral disagreement with the entity; optional negotiation or rejection; distinct ways to contain/redirect energy; earned combat techniques; factions reacting to rumors rather than omniscience.
- Do not write a final name, class, rank, or exact nature into player-facing descriptions before the story establishes them. Any late-game identity has to fit the established era of Devil lore rather than contradict existing sources.

## Quest design — do not make quests one-button deliveries

Each quest uses `not started → active → clues / branches → choice → resolved (persistent outcome)` with evidence source locations, truthful NPC knowledge, unique turn-ins, and alternate consequences.

### v0.6 playable investigations

1. **The Missing Ore** — Garrick, Teren, Vessa, Orven; cargo records, witness accounts, a risky false accusation, negotiated replacement and reporting without blame.
2. **The Granary Levy** — Haldric, Elna, Vessa; audit, households and merchant costs; support the levy, delay it, or negotiate a non-household contribution.
3. **Northern Watch** — Orven and Renn; physical forest clues; strengthen patrols, scout personally or hide the danger.
4. **The Silent Tower** — Liora, watchtower masonry and records; preserve, destroy or privately copy strange signs. The grimoire mystery is not automatically resolved.

The earlier seven village jobs remain. Rewards must be idempotent (never two payments for the same outcome); completed tasks stay completed. Lore and NPC reactions depend on actual decisions, not only on quest ID.

## Desired next production milestones

**v0.7:** remove legacy Lithuanian UI and text entirely; stable single dialogue/state engine; inspectable world events; support more separate indoor locations and witnesses; NPCs exchange known facts in their scheduled meetings; improve map UI usability and search.

**v0.8:** better combat with several enemy archetypes and a proper usable spell library for compatible NPCs; injuries, positioning, armour, damage types, finite resources, nonlethal options; differentiation of magical resistance from Anti Magic.

**v0.9:** Magic Knights entrance exam as an optional, timed world event; factions and recruitment; a second genuine role path outside the Magic Knights; consequences of failure and repeated attempts.

**v1.0+ prototype milestone:** route-level world travel, multi-household economy and trade, major city districts, unique local monsters, multi-step investigations, party recruitment, companions and long-term social systems.

## Source anchors (not a license to reproduce art or script)

- Official Black Clover world: https://bclover.jp/world/
- Official Yuno profile: https://bclover.jp/en/character/yuno.php
- Official Asta profile: https://bclover.jp/en/character/asta.php
- Official Yami profile: https://bclover.jp/character/yami.php
- Canon grimoire reference: https://blackclover.fandom.com/wiki/Grimoire
- Canon mana / attributes: https://blackclover.fandom.com/wiki/Mana
- Rune arrays: https://blackclover.fandom.com/wiki/Rune_array
- Anti Magic and Liebe: https://blackclover.fandom.com/wiki/Anti_Magic and https://blackclover.fandom.com/wiki/Liebe
- Devils, contracts, risks: https://blackclover.fandom.com/wiki/Devil
- Community discussion of magical growth: https://www.reddit.com/r/BlackClover/comments/10owtk2
- Community discussion of magic limits and practice: https://www.reddit.com/r/BlackClover/comments/1m1v2u4
- Worldbuilding discussion: https://www.reddit.com/r/BlackClover/comments/1ijg6ae

All community commentary is inspiration, not automatically canon. Do not reproduce copyrighted dialogue, sprites, anime stills or manga pages in the playable build.
## v0.8 implemented: optional first manifestation (spoiler-safe)
- Research and peril are independent causal routes. Research: 8 observations, 3 separate study days, Magic Theory 30 and a real comparison; a cautious challenge can fail temporarily without forcing a discovery.
- Peril: only during serious injury following anomalous exposure; the player can choose to accept a tiny response or remain unaided.
- Initially observed effect is an original **Unsteady Pulse** that disrupts maintained magic, with concrete HP/AP/strain costs and a daily limit. It is **not** canon Anti Magic granted to Sania, not a free transformation and not a pact.
- The first manifestation does not settle whether the grimoire holds a devil or reveal that entity's name, motives, class or the contradictory second power. Player-facing prose keeps mystery intact.
- The watchtower Living Ward makes the pulse tactically testable; its physical body can still attack, and weapons can still defeat it. All roads remain optional.
- Known issue: only one added enchanted enemy archetype; a full resource-based spell system, extensive injury simulation, companions and complex magic duels are still future milestones.
