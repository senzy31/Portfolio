# Sean Fuertes’ portfolio

A static, single-page portfolio for an Information Technology student at FAITH Colleges. It runs from HTML, CSS, and vanilla JavaScript. Fonts, icons, project illustrations, and the draft résumé are bundled locally.

## Run locally

Open this folder in VS Code. With the Live Server extension installed, right-click `index.html` and choose **Open with Live Server**. Changes appear when you save. There is no build step or backend.

With Python installed, you can also run `python -m http.server 8000 --bind 127.0.0.1` from this folder and open `http://127.0.0.1:8000/`.

## Files

| File or folder | Contents |
| --- | --- |
| `index.html` | Navigation, introduction, biography, timeline, security section, form, and footer |
| `css/style.css` | Design variables, typography, components, and animation |
| `css/responsive.css` | Responsive layouts, mobile menu, and reduced-motion styles |
| `js/script.js` | Editable profile, skills, and projects, plus navigation, terminal, form, and background drawing |
| `assets/images/` | Profile placeholder and three illustrative project previews |
| `assets/resume-draft.pdf` | One-page draft résumé based on the supplied education and project descriptions |
| `assets/icons/` | Local Lucide icon data, license, and favicon |
| `assets/fonts/` | Inter and JetBrains Mono variable fonts, each with its license |

## Personalize before sharing

1. **Contact details.** At the top of `js/script.js`, fill in `profile.github` and `profile.linkedin` with your full profile URLs. Set `profile.email` to your actual email address. These values update the hero, contact section, footer, and form. Empty social links explain that a destination is pending when selected.
2. **Résumé.** Add your final PDF under `assets/`. Point `profile.resume` to it and change `profile.resumeLabel` to “Download résumé (PDF)”. Update the fallback download path in `index.html` as well. Both download controls use the same configured file.
3. **Portrait.** Add a photo under `assets/images/`, update `profile.photo` and `profile.photoAlt`, and match the fallback image attributes in `index.html`. A landscape crop works best. The supplied SF monogram is labeled as a placeholder.
4. **Projects.** Edit the `projects` array. Each entry has a title, category, description, technologies, features, image path, alternative text, preview label, GitHub URL, and demo URL. The illustrations represent the project ideas. Replace them with your own screenshots and update the labels. Set `previewLabel` to an empty string to hide it. A blank repository URL shows a disabled GitHub control. A Live Demo link appears when you supply a valid HTTP or HTTPS demo URL.
5. **Skills and experience.** Edit the `skills` array for toolkit cards. Edit the timeline in `index.html` for experience and education. The SafeCare entry describes a concept, and the security topics describe current learning.
6. **Identity and theme.** Edit the title, meta description, hero introduction, and footer in `index.html`. Update the rotating roles and terminal responses in `js/script.js`. Main colors and spacing live in `css/style.css`.

## Contact form

The form validates its fields and constructs a `mailto:` draft with an encoded subject and body. It includes the visitor’s name and reply address. The visitor reviews and sends the draft in their email app. With an empty `profile.email`, the recipient is blank and the form explains that the visitor must supply Sean’s address. Configure this value before inviting inquiries.

A configured email handler is needed to open a draft. The form retains the typed message on the page and reports only that it requested a draft. The site has no server-side submission, message storage, or delivery confirmation.

## Interactive terminal

Choose **type help** or focus the prompt, type a command, and press Enter. Supported commands are `whoami`, `interests`, `status`, `projects`, `help`, and `clear`. Responses are local text. The separate security panel animates a list of learning topics.

The mobile menu supports keyboard navigation and Escape. Reduced-motion preferences disable typing, scanning, smooth scrolling, and reveal effects. Project feature lists use native disclosure controls.
