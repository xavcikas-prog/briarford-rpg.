# Briarford RPG — v0.5
An unofficial, independent **Black Clover** pixel-art RPG fan prototype, designed for a portrait-mode iPhone browser. Original code and graphics; no copyrighted anime art is included.

**Play:** https://xavcikas-prog.github.io/briarford-rpg./

## What's new in v0.5
- Restored two **different** navigation buttons:
  - **World Map**: full Black Clover kingdoms atlas for long-distance travel.
  - **Local Map**: clickable nearby map of **Briarford Village**, **Northern Forest**, and **Abandoned Watchtower**.
- Watchtower is now a real walkable tile map, accessible from Local Map, with a collapsed gate, hall, ruined archive, and rain cistern. Searching the hall and archive earns finite discoveries, items or XP; the cistern provides limited water.
- Forest travel restored, including herbs, tracks, iron and wolf encounters already present in the game.
- NPC rumors have a larger person-specific set of non-quest topics. Completed job news appears only occasionally, not as the default for almost every rumor.
- Garrick and other quest participants now speak in first person about their **own** completed jobs, rather than gossiping about themselves as if absent.
- Haldric now discusses taxes, village stores, guards, and local issues after the bridge is repaired, while the repaired-bridge topic is still accessible under **Ask about village changes**.
- v0.4 saves remain compatible; progress in tower discoveries is saved in the existing slots.

## What's new in v0.4
- Removed redundant Atlas button: World Map opens the same canonical atlas.
- Strength training now gives 1–2 guaranteed practice points per drill, +2 XP (subject to the daily XP limit), and STR +1 on reaching its displayed threshold. The character panel explains exact progress; older saved training progress is carried over.
- Yuno, Sister Lily, and Witch Queen magic lessons explicitly award **Magic Theory +1 and XP +2** when daily progression caps allow; the result message always reports the actual gains.
- Bridge quest can be accepted once (Haldric or notice board), completed once, and rewarded once. The notice board shows ACTIVE or COMPLETED; no more repeat timber donations after completion.
- Bridge repair makes the crossing fully repaired (100%) and maintains this state on later days. Existing completed bridge quests in older saves migrate to the repaired state.
- Village event journal remembers completed work. Witnesses know immediately; other villagers gradually hear through gossip, or can learn directly when the player tells them. Quest givers stop repeating outdated job requests.
- Journal shows persistent village changes and how many Briarford villagers have learned about them.
- Existing saves remain in their original 3 local slots; export a JSON backup before major updates.

## What's new in v0.3
- English-first gameplay and NPC dialogue. Some legacy v0.2 event messages and journal history may still be in Lithuanian.
- Quest delivery fixed: quests accepted from the notice board can be fulfilled; Vessa now hands over her parcel, and Elna has a visible **Turn in quest** option.
- 36-location world atlas: Clover (Forsaken/Common/Noble), Heart, Diamond, Spade, neutral territories, and the overseas Land of the Sun; each location explicitly marked canon or original.
- Travel to world locations, procedurally drawn regional scenes, local residents (merchant, guard, craftsperson) with persistent relationships, local work, trading and gathering.
- Early-era canon interactions in Hage (Asta, Yuno, Sister Lily, Father Orsi), Black Bulls hideout (Yami, Magna, Vanessa), and Witches' Forest (Witch Queen); independently written fan dialogue.
- Equipment slots (weapon, body armor, accessory), buyable equipment and tangible combat effects.
- Arcane Studies skill tree, progressive research and sealed grimoire mysteries. Advanced magic casting is not implemented yet.
- Existing local save slot keys from v0.1/v0.2 preserved; new world states and equipment save/load correctly.
- Slower daily skill and XP gains to reduce rapid early leveling.

## How to hand in Vessa's parcel
1. If your journal has Vessa's Delivery but your inventory has no parcel, **speak to Vessa** and choose **Collect / check parcel**.
2. Go to **Elna**; in her NPC conversation choose **Turn in quest: Vessa's Delivery**.
3. At night, her cottage door also offers **Deliver Vessa's sealed parcel to Elna**, even if the door would otherwise be closed.

## iPhone controls
Tap the map to walk. Use **Activities** for jobs, fishing and village resources; **World map / Atlas** to travel and explore. **Equipment** is directly below health. **Skills** opens the arcane skill tree. Use **Save** to export a JSON backup before major updates. Reload Safari when a newer version is published. Do not delete Safari or home-screen app data without backing up your save.

## Canon research
- Official anime world descriptions: https://www.bclover.jp/world/
- Black Clover Wiki: https://blackclover.fandom.com/wiki/Clover_Kingdom
- Canon Hage details: https://blackclover.fandom.com/wiki/Hage
- Kikka location: https://blackclover.fandom.com/wiki/Kikka
- Grimoire mechanics: https://blackclover.fandom.com/wiki/Grimoire
- Mana Skin: https://blackclover.fandom.com/wiki/Mana_Skin
- Community discussion about map orientation: https://www.reddit.com/r/BlackClover/comments/iqyf8k

The atlas is deliberately **schematic**, not a geographically exact scale map. In-world availability and identity are based on the beginning-of-story era; later plot events are not preset as accomplished. Some original locations fill the gaps between canon landmarks.

## Known prototype limitations
This is **not yet a fully simulated continent**: travel scenes outside Briarford currently share a tile-based regional template and have small groups of simulated NPCs. They do not yet contain every building, all canon characters, animated cutscenes or unlimited dialogue. It is a scripted, deterministic/seeded game; it does not call paid AI services. Dynamic event content, faction systems, deep tactical magic, character aging and multi-city simulation are future milestones.
