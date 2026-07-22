CONTENT INTEGRATION (STgeorge-main)

Purpose
- This file explains how to extract the content ZIPs that were added under STgeorge-main/assets/content_zips
  and how to integrate the resulting JSON into the app.

Quick extraction (recommended)
1) From repository root:
   chmod +x scripts/extract_and_stage.sh
   ./scripts/extract_and_stage.sh
   # This will extract archives into:
   #  - STgeorge-main/assets/data/agpeya
   #  - STgeorge-main/assets/data/bible
   #  - STgeorge-main/assets/data/commentary/new
   #  - STgeorge-main/assets/data/commentary/old
   # and will commit the extracted files to branch add-content-and-agpeya.

2) Push branch:
   git push origin add-content-and-agpeya

Integrating the JSON into the app
- Locate where your app currently loads content (search for existing 'assets' or 'data' patterns).
- Recommended approach for JS/React (example):
  - Add a content loader module (e.g., src/contentLoader.js) that reads from the extracted JSON files
    using fetch(...) or require(...) depending on platform.
  - Ensure RTL is enabled (for React Native, I18nManager.forceRTL(true); then reload).
  - Create screens:
    * Agpeya: eight buttons -> load proper JSON file(s) from STgeorge-main/assets/data/agpeya
    * Holy Bible: present Old/New testaments -> list books -> list chapters -> show chapter text
    * Commentaries: similar structure (old/new) -> chapter commentary text
    * About: add "Created by Mikhael Yasser"
    * Footer: show same text on main screen
- Styling: ensure text components use appropriate font that supports Arabic and set textAlign: 'right' / writingDirection: 'rtl'

Notes & tips
- If any ZIP is missing or named differently, rename or move it to:
  STgeorge-main/assets/content_zips/<the-zip-name>.zip
- If some files are large (>100MB) GitHub web upload may not work; use git push via terminal.
- After applying and extracting, run the app locally and check RTL layout and Arabic fonts.
