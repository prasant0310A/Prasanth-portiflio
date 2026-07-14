# Prasanth P — Portfolio

A cinematic, dark-themed personal portfolio built with **plain HTML, CSS, and JavaScript** — no frameworks, no build step. Ready to publish for free on **GitHub Pages**.

## 🚀 Live Structure

```
├── index.html          # Main page (all sections)
├── css/
│   └── style.css       # Cinematic dark theme, animations, responsive layout
├── js/
│   └── script.js        # Particle background, typing effect, scroll reveal, nav, form
├── assets/
│   ├── images/
│   │   └── profile.jpg  # Profile photo
│   └── Prasanth_P_Resume.doc
└── README.md
```

## 🖥️ Run Locally

Just open `index.html` in a browser, or serve it locally:

```powershell
# Option 1: VS Code Live Server extension
# Right-click index.html -> "Open with Live Server"

# Option 2: Python simple server
python -m http.server 5500
# then visit http://localhost:5500
```

## 📦 Publish to GitHub Pages

1. Create a new GitHub repository (e.g. `prasanth-portfolio`).
2. Push this folder's contents to the repository root:

   ```powershell
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

3. In GitHub: **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then **Save**.
6. Your site will be live at:

   ```
   https://<your-username>.github.io/<your-repo>/
   ```

   (GitHub Pages typically takes 1–2 minutes to publish/update.)

## ✏️ Customize

- **Photo**: replace `assets/images/profile.jpg`.
- **Resume**: replace `assets/Prasanth_P_Resume.doc` (update the `href` in `index.html` if you rename it, e.g. to a `.pdf`).
- **Content**: edit text directly in `index.html` (About, Skills, Experience, Projects, Certifications, Education, Contact).
- **Colors**: tweak CSS variables at the top of `css/style.css` (`--accent`, `--bg`, etc.).
- **Contact form**: currently opens the visitor's email client via a `mailto:` link (no backend needed). To collect submissions instead, wire it up to a service like [Formspree](https://formspree.io/) by setting the form's `action` attribute.

## 🧩 Features

- Cinematic dark theme with warm accent lighting
- Canvas-based floating particle background with mouse parallax
- Typing animation for role titles
- Scroll-reveal animations (IntersectionObserver, no libraries)
- Animated stat counters
- Fully responsive (mobile hamburger nav)
- Zero dependencies — pure HTML/CSS/JS, works great on GitHub Pages
