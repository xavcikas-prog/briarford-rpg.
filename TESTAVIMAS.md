# Briarford RPG v0.3 — Testing notes

Automated mobile-sized Chromium smoke tests:
- Character creation and two chosen skills
- Character, equipment and arcane tree panels
- Atlas with 36 locations and location filters
- Travel to Hage and Kikka, then back to Briarford
- Accept parcel quest from the board without parcel; collect parcel from Vessa
- Deliver parcel to Elna via explicit Turn in quest dialog; verify item removed, reward paid and status done
- Deliver blacksmith task using iron ore
- Equip Iron Sword; verify HUD and persistent slot
- Save and reload while in a region scene
- Test persistent local residents and region work
- Confirm canonical residents Asta/Yuno/Sister Lily/Father Orsi in Hage and Yami/Magna/Vanessa at hideout
- Zero page errors in tested flows

Known caveats: tests run in a Chromium mobile viewport, not on a physical iPhone. User-provided day-4 save JSON was not accessible for direct test, so the old-save upgrade path uses compatible v0.1 schema validation and migration helpers. Keep a backup before adopting a new version.

## v0.4 regression tests (Chromium mobile-size browser)
- Exactly one World Map button; no duplicate Atlas control
- Take Repair the Bridge from Haldric, verify notice board displays ACTIVE, turn in exactly once, and ensure no new offer
- Take Repair the Bridge from notice board first, verify Haldric does not offer a duplicate, turn in once
- Completed quest cannot award extra gold or consume extra wood through the board
- Bridge state becomes 100% and persists across a new day and save/reload
- The bridge event initially reaches the workers, then spreads to all nine Briarford NPCs over subsequent days
- Every informed village NPC responds consistently when asked about the repaired bridge
- Haldric's job dialogue no longer insists the bridge needs repairs
- Strength practice shows incremental progress and eventually increases STR, visible on character panel
- Yuno's magic lesson explicitly shows Magic Theory +1 and XP +2 (under caps)
- Prior save with an already-completed bridge quest and obsolete bridge condition migrates to repaired
- No browser JavaScript page errors in the tested flows

Physical iPhone Safari remains a user-side test. Some older Lithuanian event lines and historical saves are still untranslated.

## v0.5 smoke tests (mobile Chromium, 390x844)
- One World Map button and one distinct Local Map button
- Local Map graphically marks Briarford village, northern forest and abandoned watchtower
- Travel Village → Forest → Watchtower → Village; correct zone and walkable map
- Watchtower Activities menu, pathfinding to hall and collection of finite hall rewards
- Garrick local rumor no longer describes Garrick in third person; Haldric gossip mixes non-bridge topics
- Explicit village changes button replaces permanent repaired-bridge shortcut
- No page JavaScript exceptions in the tested flows
- Syntax check passed for compiled inline JavaScript

The physical iPhone Safari and older existing user save were not available in test runner. Back up your save before refreshing.

## v0.6 smoke tests (Chromium 390x844 mobile emulation)
- New game creation, world toolbar and People & Lore panel
- Garrick discussion offers missing iron investigation and individual social actions
- Missing iron: evidence from two NPCs, resolution through responsible NPC, unique reward and persistent outcome
- Haldric levy: books, Elna household concerns, three alternative policy outcomes and one-way completion
- Mira character dossier hides undiscovered fears and flaws
- Expanded 18-node Magic & Discipline tree, gated by theory and teacher requirements
- Grimoire observation changes state without revealing or automatically casting forbidden powers
- Regional travel to Hage and Yuno lessons
- Save/load returns the new quest outcome and flags
- 0 page JavaScript errors in tested flows
- JavaScript syntax parsed with Node 22

Caveats: tests use desktop Chromium mobile emulation. Physical iPhone Safari and the user's exact Day 5 save file were not accessible for direct testing.

## v0.7 interactive Skills UI (mobile Chromium)
- Existing toolbar Skills button opens exactly six discipline tiles, not the original 18-node wall of text
- Tap Perception to reveal a branching three-node graph with visible connectors
- Locked nodes remain clickable for readable prerequisites
- Learning Magical Observation deducts exactly one insight and returns to the branch with a green learned node
- Defense codex clarifies Mana Skin is theory only; existing combat abilities remain distinct from spells
- Unknown branch hides grimoire content and cannot be purchased
- Learned nodes survive save and reload unchanged
- 320/375/390/430px mobile viewport checks: no horizontal tree overflow
- JavaScript syntax checked with Node 22; no JS page errors in tested flows

Note: Chromium mobile emulation, not a physical iPhone Safari run.

## v0.8 manifestation regression checks
- Node 22 syntax validation: PASS
- Chromium 390×844 mobile viewport page errors: none
- Sealed grimoire Research Notes button reachable: PASS
- Research readiness: requires distinct study days, observations and independent learned knowledge
- Research-only route activates first limited power: PASS
- Optional Living Ward tactical battle initializes: PASS
- The pulse interrupts an enchanted shield and charging attack: PASS
- Casting deducts HP and 2 AP and respects a daily limit: PASS
- Manifestation state survives save / reload: PASS
- Unknown skill tree gains an Unsteady Pulse node but preserves the locked Sealed Page: PASS
- Three practice sessions on separate days yield better control: PASS
- Near-fatal danger prompt can be accepted or refused: PASS
- Refusing a fatal intervention leads to defeat rather than forced awakening: PASS

These checks were performed with Chromium mobile emulation and a deterministic synthetic save; physical iPhone Safari and the player's actual save still need user-side verification.

## v0.9 Yuno sprite integration tests (Chromium 390×844 mobile emulation)
- Optimized PNG atlas: 116 animation frames, 32×40 cell dimensions, 10 columns, transparency: PASS
- JavaScript syntax for the full game and animation patch: PASS
- New game start and World Map → Hage Village travel: PASS
- Actual Yuno sprite asset loading into canvas: PASS (test uses equivalent inline data URI)
- Yuno is present and moves on valid walkable Hage tiles: PASS
- NPC dialogue retains existing options and adds animation access: PASS
- Animation studio opens, action + 4-direction controls respond: PASS
- Running (left) and wind cast preview on a mobile screen: PASS
- No page JavaScript exceptions in tested flows: PASS
- Old save keys were not modified; new animation state remains ephemeral and isn't added to save data.

Caveat: Chrome mobile emulation is not physical iPhone Safari. Github-hosted cached version should be checked on the device after reload.

## v0.10–v0.13 incremental graphics releases
- v0.10 Yuno interpolation: float world position, anchored foot placement and run frame index driven by accumulated distance.
- v0.11 overworld and combat animation profile maps; player combat toolbar emits visual actions.
- v0.12 Sania uses its own recolored original 4-direction atlas, visual game loop and no premature magical effect.
- v0.13 20+ original/canon-inspired skin variants, all mapped onto the existing 116-frame rig; character gallery opens from Activities.
- Index HTML syntax parsed with JavaScript Function constructor after each code addition.
- GitHub savepoint branches hold previous versions for rollback. No save data migration needed.
- Physical iPhone rendering, body anchor quality and heavy per-device performance still require direct test; color variants are early prototype art, not approved final portraits.

## v0.14–v0.20 engineering checkpoint
- Each release updates GitHub main and creates independent `savepoints/v0.XX` rollback branch.
- Static JavaScript syntax validation in the GitHub update environment passed after every stage.
- 116-frame bespoke procedural rigs implemented for 5 heroes, 6 additional canonical actors, and 9 primary Briarford villagers.
- v0.17 stamina, ranged-reach combat and armory; v0.18 gated spell codex; v0.19 2 evidence-gated branching quests; v0.20 Hage/Kikka interiors.
- Save data remains in existing keys; new story flags stored under `state.flags.v19` / `state.flags.v20`.
- NOTE: Real iPhone Safari gameplay and performance regressions have not yet been tested; browser visual interaction remains a user-side regression test.

## v0.21 real Sania artwork integration
- Optimized original approved sprite sheet into exactly 80 visual frames arranged in 8 columns × 10 rows at 64×64 resolution.
- Image payload valid WebP RIFF and uploaded to GitHub Pages assets as base64 text (loaded as browser data-image).
- Playable drawPerson('Sania') now uses image atlas with existing interpolated world position and foot anchor.
- Idle/run/attack frames are chosen from actual game movement and action state.
- Unsteady Pulse cast sheet is gated by saved v0.8 manifestation state; preview hides it beforehand.
- Same save format and old artwork fallback retained.
- Entire game JavaScript passes syntax validation. Physical iPhone Safari has not yet been tested.
