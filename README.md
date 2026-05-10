# Morning Report — Case Repository

A curated collection of enhanced internal medicine morning report presentations, formatted for GitHub Pages.

## Contents

- **12 clinical cases** with evidence-based analysis, differential diagnoses, pathophysiology, and management algorithms
- **3 educational topics** (AECOPD, Pain Management, Thoracentesis)
- All cases reference current guidelines: GOLD 2024, IDSA, ACC/AHA, Endocrine Society, Surviving Sepsis 2021, CDC 2022, and more

## Setup: GitHub Pages

### Option 1 — Deploy from `main` branch

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch** → `main` / `root`
4. Click **Save**
5. Your site will be live at `https://<username>.github.io/<repository-name>/`

### Option 2 — Deploy from `/docs` folder

If you prefer to keep the site files in a `docs/` subdirectory:

1. Move all files into a `docs/` folder
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch** → `main` / `docs`
4. Click **Save**

## File Structure

```
/
├── index.html          ← Main landing page
├── assets/
│   └── style.css       ← Shared stylesheet
├── cases/
│   ├── 01-pedal-edema-hypoalbuminemia.html
│   ├── 02-adrenal-incidentaloma.html
│   ├── 03-etoh-withdrawal-hypercalcemia.html
│   ├── 04-syncope-seizure.html
│   ├── 05-acute-adrenal-insufficiency.html
│   ├── 06-hepatorenal-syndrome.html
│   ├── 07-necrotizing-fasciitis.html
│   ├── 08-renal-subcapsular-hematoma.html
│   ├── 09-palliative-care-downs.html
│   ├── 10-anastomotic-leak-sepsis.html
│   ├── 11-shoulder-infection.html
│   ├── 12-vestibular-migraine.html
│   ├── 13-aecopd.html
│   ├── 14-pain-management.html
│   └── 15-thoracentesis.html
├── README.md
└── _config.yml         ← Jekyll config for GitHub Pages
```

## Design

- Academic / minimal theme: white background, neutral palette, print-friendly
- Responsive layout (mobile-friendly)
- Each case: TOC, key labs (with reference ranges), differential table, evidence-based management, clinical pearls, references
- Print CSS included — each case prints cleanly as a PDF

## Disclaimer

These materials are for **educational purposes only**. Clinical decision-making should be based on current guidelines, institutional protocols, and patient-specific factors. Content reflects evidence available as of 2024–2025.
