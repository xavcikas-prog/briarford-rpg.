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
