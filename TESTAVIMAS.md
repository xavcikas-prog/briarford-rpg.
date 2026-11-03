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
