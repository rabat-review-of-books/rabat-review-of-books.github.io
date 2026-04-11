# Rabat Review of Books

A literary magazine built with [Quarto](https://quarto.org). Essays, reviews, fiction, and poetry — from Rabat, for the world.

## Structure

```
rabat-review-of-books/
├── _quarto.yml           # Site configuration, navbar, fonts, includes
├── styles.scss           # Main SCSS design system
├── interactions.css      # Scroll reveal, reading counter, carousel, ticker
├── interactions.js       # Animations + reading time ring
├── custom.css            # Small overrides
├── index.qmd             # Homepage with masthead, hero, grids, carousel
├── essays.qmd            # Essays listing page
├── reviews.qmd           # Reviews listing page
├── fiction.qmd           # Fiction listing page
├── poetry.qmd            # Poetry listing page
├── archive.qmd           # Full archive (table view)
├── about.qmd             # About the Review
├── masthead.qmd          # Editor & writer
├── subscribe.qmd         # Subscription tiers
├── posts/
│   ├── essays/
│   ├── reviews/
│   ├── fiction/
│   └── poetry/
├── images/               # Logo, favicon, placeholder SVGs
└── .github/workflows/
    └── publish.yml       # Auto-publishes to GitHub Pages on push to main
```

## Design system

- **Display font:** Cormorant Garamond (headlines, masthead)
- **Body font:** Spectral (article text)
- **UI font:** Inter (navigation, metadata, small caps)
- **Arabic:** Amiri
- **Palette:** Asilah blanc-cassé `#f6ecd5`, deep navy `#0a2540`, sand gold `#c69a3a`

## Running locally

```bash
# 1. Install Quarto from https://quarto.org/docs/get-started/
# 2. Preview the site (auto-reloads on changes)
quarto preview

# 3. Render to ./docs
quarto render
```

## Publishing

The GitHub Action in `.github/workflows/publish.yml` renders and deploys on every push to `main`. The built site is served from the `gh-pages` branch at:

`https://rabat-review-of-books.github.io/`

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
author: "Mehdi Khribch"
date: "2026-04-11"
categories: [Essays, Literature]
image: ../../../images/essay-placeholder-1.svg
image-alt: "Placeholder"
---
```

The homepage, section page, and archive pick it up automatically.

---

*Edited in the Kasbah des Oudayas.*
