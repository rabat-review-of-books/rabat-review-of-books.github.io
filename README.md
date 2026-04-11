# Rabat Review of Books

A literary magazine built with [Quarto](https://quarto.org), inspired by *The New Yorker*, the *London Review of Books*, and the *Financial Times*. Essays, reviews, fiction, and poetry — from Rabat, for the world.

## Structure

```
rabat-review-of-books/
├── _quarto.yml           # Site configuration, navbar, fonts, includes
├── styles.scss           # Main SCSS — NY/LRB/FT-inspired design system
├── interactions.css      # Scroll reveal, reading counter, carousel, ticker
├── interactions.js       # JS for animations + FT-style reading time ring
├── custom.css            # Small overrides
├── index.qmd             # Homepage with masthead, hero, grids, carousel
├── essays.qmd            # Essays listing page
├── reviews.qmd           # Reviews listing page
├── fiction.qmd           # Fiction listing page
├── poetry.qmd            # Poetry listing page
├── archive.qmd           # Full archive (table view)
├── about.qmd             # About the Review
├── masthead.qmd          # Editors & contributors
├── subscribe.qmd         # Subscription tiers
├── posts/
│   ├── essays/           # 5 sample essays
│   ├── reviews/          # 5 sample reviews
│   ├── fiction/          # 3 sample fiction pieces
│   └── poetry/           # 4 sample poetry pieces
├── images/               # Logo, favicon, placeholder SVGs
└── .github/workflows/
    └── publish.yml       # Auto-publishes to GitHub Pages on push to main
```

## Design system

- **Display font:** Playfair Display (headlines, masthead)
- **Body font:** Source Serif 4 / EB Garamond (article text)
- **UI font:** Inter (navigation, metadata, small caps)
- **Palette:** black `#111`, paper `#fbfaf6`, LRB red `#a02024`, FT salmon `#fff1e5`

## Interactive widgets

- FT-inspired salmon top bar (issue info, date)
- Scrolling headline ticker
- Scroll-reveal animations
- Hover-lift cards with animated underlines
- Horizontal carousel for the archive
- Quote-of-the-week pullquote block
- Subscribe tiers
- Reading progress bar + **FT-style circular "min left" counter** on article pages
- LRB-style drop-cap on first paragraph
- Ornamental section breaks

## Running locally

```bash
# 1. Install Quarto from https://quarto.org/docs/get-started/
# 2. Preview the site (auto-reloads on changes)
quarto preview

# 3. Render to ./docs
quarto render
```

## Publishing to GitHub Pages

1. Create a new repository on GitHub named `rabat-review-of-books`.
2. From this folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Rabat Review of Books"
   git branch -M main
   git remote add origin git@github.com:<your-username>/rabat-review-of-books.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages** and set the source to the `gh-pages` branch.
4. The GitHub Action in `.github/workflows/publish.yml` will render and deploy on every push to `main`.

Your site will be available at:
`https://<your-username>.github.io/rabat-review-of-books/`

Edit the `site-url` in `_quarto.yml` to match.

## Writing a new article

Create a new folder under the relevant section and drop an `index.qmd` inside:

```
posts/essays/my-new-essay/index.qmd
```

Use this frontmatter:

```yaml
---
title: "Essay Title"
subtitle: "A one-line literary subtitle."
description: "A one-sentence dek for listing pages."
author: "Your Name"
date: "2026-04-11"
categories: [Essays, Literature]
image: ../../../images/essay-placeholder-1.svg
image-alt: "Placeholder"
---
```

The homepage, section page, and archive will pick it up automatically.

---

*Edited in the Kasbah des Oudayas.*
