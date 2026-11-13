Fitness Programme Manager Rebuilt V2

Upload the CONTENTS of this ZIP to the root of a NEW GitHub repository, enable GitHub Pages (Settings > Pages > Deploy from branch > main / root). Visit the Pages URL.

This is a separate rebuilt app with its own IndexedDB. It does not automatically import data from v63. Keep your old repository and make an old-app backup before switching. The new Data & Backup screen backs up and restores only this rebuilt app.

Features: client centre with health/lifestyle questionnaire (no PAR-Q), exercise/equipment library, programme creator, approved named/dated programmes, edit/print, workout logging, templates, calculators, challenges, mini-app export, local IndexedDB and JSON backups.

Limitations: generated mini-app is a standalone HTML file with programme selection and workout recording on that device; it does not sync records to the instructor app. Automated generator is a basic starter draft, not a medical or personalised prescription. Legacy backup migration and full end-to-end Android testing are not yet complete.

V2: A4 professional print/PDF layout, resistance weights and cardio metrics in programme creator, per-set/round workout recording in main app and mini-app, demo links throughout. Existing rebuilt V1 IndexedDB is retained. Mini-app records stay on client device and can be exported as JSON.

V3 restored 475 distinct curated/expanded legacy exercises from old v63 source, with descriptions and equipment. Existing rebuilt user exercises remain untouched. Demo links can be added/edited; 'Find demonstration' opens search results rather than falsely claiming a verified demo. New inline add/edit form. Equipment management retained.

V4: 893 total expanded catalogue entries, with tailored technique explanations. Collapsible exercise cards with inline edit forms, demonstration links and search. Existing user-added exercise data preserved; default generic explanations improved on import.

V5: 22 cardio machines, 34 cardio workout methods each (748 machine-method entries); 39 programme structures; 26 day styles; reorder days and exercises; filter add-exercise by equipment and muscle. Existing local data remains.

V6: Exercise Database filters by muscle/body part, equipment, and cardio/resistance/core/mobility category. Programme Creator exercises are collapsible and expand to reveal prescription, demonstration, technique and reordering. Swap exercise opens an in-page searchable/filterable panel with equipment, muscle, category and text filters, instead of prompt boxes. No database schema changes; existing saved data retained.

V7: Programme structure now generates a fresh exercise-filled draft rather than retaining old exercises. Seniors/Active Ageing prioritises supported, balance, mobility and lower-impact choices. Regenerate respects per-day styles. Confirm before replacing nonempty drafts; previous draft autosaved, named approved programmes never modified.

V8 Programme Creator redesign:
- Load any saved named programme for editing from Programme Creator.
- Generate fresh drafts from workout type, 1-7 days, exercise count, session time, sets, rest, cardio inclusion and cardio method.
- Each day has its own training style. Apply style to this day regenerates only that day's exercises.
- Save as new creates a separate programme. Save changes updates only the explicitly loaded programme.
- Existing exercise database, workout tracking, mini-app, and printouts remain.
- Existing V7 data stays in the same IndexedDB store. Back up before updating.

V9: sets/reps/rest/time dropdowns with range prescriptions, saved and printed across approved programmes, Workout Mode and newly exported mini-app. Ranges use the upper bound to generate recordable individual sets. Editing a saved programme and saving changes returns to Edit & Print with the updated approved version. Re-export client mini-app to receive changes.

V10: Client measurements prefill calculators, manual overrides; Karvonen and percentage-max five heart-rate zones; BMR and estimated maintenance, BMI, 1RM loading table, training loads, waist-height ratio, pace/speed. Add zones and optional calculator summaries to approved programme; show on print, workout and newly exported mini-app. Mini-app offers demo search for exercises without saved link. Client medical details never exported.

V11: Equipment aliases and duplicate cleanup with preservation of exercise links and saved programme references. One-click merge and prevention of newly added duplicates. Expanded library with additional genuine movements. Offline intelligent rules-based programme generation using goals, experience, preferences and available days/equipment. This is NOT a cloud LLM. Back up before updating.

V12: Exercises per day now automatically chosen from workout type/day style and session length (no manual count). Generated appropriate resistance exercises default to an optional 1 light warm-up set of 16–20 reps; edit warm-up toggle, number of sets, rep range and load per exercise. Warm-up instructions travel with saved programmes, printouts, workout mode and newly exported mini-apps. Existing saved programmes retain their prescriptions.

V13: Every exercise shown in programme creator, exercise database, swap results, workout mode, training record, print and newly exported mini-app offers a demonstration link and technique/execution guide. Existing custom descriptions are preserved; missing descriptions receive movement-family instructions. Search-result demo links are searches, not verified exercise-specific videos. Internet needed for external videos.
