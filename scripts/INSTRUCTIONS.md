# Integration instructions — content extraction and next steps

I added a script `scripts/extract_content.js` on the branch `add-content-and-agpeya` that extracts the ZIP archives already present in the repository into the `STgeorge-main` application folder.

What I added in this branch
- scripts/extract_content.js — Node script that extracts the existing ZIPs into:
  - STgeorge-main/assets/data/agpeya/
  - STgeorge-main/assets/data/bible/
  - STgeorge-main/assets/data/commentary/old/
  - STgeorge-main/assets/data/commentary/new/

How to run locally
1. Clone the repository (or switch to branch `add-content-and-agpeya`).
2. From repository root install the small dependency:

   npm install adm-zip

3. Run the extraction script:

   node scripts/extract_content.js

This will extract the content of the five ZIP files (STgeorge-main.zip and the four content ZIPs) into the STgeorge-main folder inside the repo. The ZIP files will remain in the repo as you requested.

Next manual steps I will perform (or can perform if you want me to edit source files):
- Open and inspect the extracted project under `STgeorge-main/` and update App source to load the JSON content from `assets/data/...`.
- Implement the Agpeya screen with eight buttons, Bible viewer (Old / New testament), Old Testament commentary viewer and New Testament commentary viewer.
- Add About page and small footer on Home screen with the exact text: `Created by Mikhael Yasser`.
- Ensure RTL support and preserve theme/colors.
- Commit the code changes to the `add-content-and-agpeya` branch and open a Pull Request.

If you want me to continue and modify the app code directly in the repo, reply here and I will proceed to update the React/Expo project files inside `STgeorge-main/` on the same branch.

If you prefer to run the extraction locally, run the script and then tell me to proceed and I will update code in the repo after extraction.
