# LK FITNESS website

A static website built with HTML, CSS, and vanilla JavaScript. It does not require Node.js, npm, a server, or a build command.

## Publish on GitHub Pages

1. Create a GitHub repository (for example, `lk-fitness-website`).
2. Extract this ZIP on your computer.
3. Upload the **contents** of the extracted folder to the repository's top level. The repository root must contain `index.html`, `style.css`, `script.js`, `.nojekyll`, and the `images/` folder. Do not upload the ZIP as one file and do not leave these files inside an extra nested folder.
4. Commit the files to the `main` branch.
5. Open **Settings → Pages** in the repository.
6. Under **Build and deployment**, choose **Deploy from a branch**, select branch `main` and folder `/(root)`, then click **Save**.
7. Open the URL GitHub Pages displays on that screen. The first deployment may take a few minutes.

## Troubleshooting

- If the page shows a 404, confirm `index.html` is in the repository root and that Pages is set to `main` / `/(root)`.
- If Settings → Pages shows a deployment failure, open the failed run under the repository's **Actions** tab and read its first error. This site does not need a custom build command.
- If HTML loads but images or styles are missing, keep the names and case of `style.css`, `script.js`, and every file in `images/` exactly as provided.
- The enquiry form opens WhatsApp with a pre-filled message. It does not store or send enquiries on its own; the visitor must press **Send** in WhatsApp.

## Included files

- `index.html` — website content and metadata
- `style.css` — responsive layout and styling
- `script.js` — mobile navigation, gallery lightbox, and WhatsApp enquiry form
- `images/` — gym photos
- `.nojekyll` — tells GitHub Pages to serve the static files without Jekyll processing
