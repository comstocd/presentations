# 📋 Morning Report — Case Repository

**Internal Medicine · Guthrie Lourdes Hospital · David Comstock, MD**

A curated repository of teaching cases from morning report and educational procedural topics, enhanced with evidence-based analysis, guideline references (UpToDate, NEJM, IDSA, ACC/AHA, GOLD, Endocrine Society), and clinical pearls. Each case is formatted for self-study, teaching, and point-of-care review.

🔗 **Live site:** [https://comstocd.github.io/presentations/](https://comstocd.github.io/presentations/)

---

## Repository Contents

| # | Items | Type |
|---|---|---|
| 14 | Clinical case presentations | Morning report cases |
| 4 | Educational / procedural topics | Systematic reviews |
| **18** | **Total** | |

---

## Clinical Case Presentations

| # | Title | Patient | Specialties |
|---|---|---|---|
| 01 | [Pedal Edema & Hypoalbuminemia](cases/01-pedal-edema-hypoalbuminemia.html) | 56F · Chronic pancreatitis, EtOH abuse, anasarca, BNP 182 | GI / Nutrition · Cardiology · Nephrology |
| 02 | [Adrenal Incidentaloma & COPD Screening](cases/02-adrenal-incidentaloma.html) | 63M · PCP visit; adrenal mass on CT, 24 pack-year smoking hx | Endocrinology · Pulmonology |
| 03 | [EtOH Withdrawal & Severe Hypercalcemia](cases/03-etoh-withdrawal-hypercalcemia.html) | 56M · Ca 16.7 mg/dL, CIWA escalation, delirium tremens | Critical Care · Toxicology · Endocrinology |
| 04 | [Syncope vs. Seizure](cases/04-syncope-seizure.html) | 44M · LOC at work, 3-year hx, known bradycardia | Cardiology · Neurology |
| 05 | [Acute Adrenal Insufficiency](cases/05-acute-adrenal-insufficiency.html) | Stress dosing, crisis recognition, secondary AI | Endocrinology · Critical Care |
| 06 | [AKI & Hepatorenal Syndrome](cases/06-hepatorenal-syndrome.html) | Cirrhosis physiology, HRS-AKI diagnosis and treatment | Hepatology · Nephrology · Critical Care |
| 07 | [Necrotizing Fasciitis](cases/07-necrotizing-fasciitis.html) | EMT with ingrown hair → sepsis, NF Type I, LRINEC score | Surgical Emergency · Infectious Disease |
| 08 | [Renal Subcapsular Hematoma](cases/08-renal-subcapsular-hematoma.html) | 35M · Post-lithotripsy retroperitoneal hemorrhage, IR management | Urology · Interventional Radiology |
| 09 | [Palliative Care & End-of-Life](cases/09-palliative-care-downs.html) | 74M · Down syndrome, ESRD, aspiration pneumonia, MOLST/NYS law | Palliative Care · Nephrology · Ethics |
| 10 | [Anastomotic Leak & Septic Shock](cases/10-anastomotic-leak-sepsis.html) | 58F · Post-LAR fecal peritonitis, multiorgan failure | Critical Care · Infectious Disease · Surgery |
| 11 | [Post-Op Shoulder Infection](cases/11-shoulder-infection.html) | 65M · Deep SSI after rotator cuff repair, hardware removal | Infectious Disease · Orthopedics |
| 12 | [Vestibular Migraine](cases/12-vestibular-migraine.html) | Dizziness, ataxia, nystagmus -- rule out posterior stroke | Neurology · Emergency Medicine |
| 16 | [Acute Gastroenteritis](cases/16-acute-gastroenteritis.html) | 64M · >20 watery stools/day, NAGMA, negative GI PCR x2, specimen transport failure | Infectious Disease · Stewardship · Patient Safety |
| 17 | ["Ownership": Radiation Colitis & SBO](cases/17-ownership-radiation-colitis.html) | 84M · Pelvic radiation, ureteral stent, missed diagnosis, multi-consultant fragmentation, loop colostomy, PE | Surgery / GI · Patient Safety · Systems Medicine |

---

## Educational / Procedural Topics

| # | Title | Focus | Specialties |
|---|---|---|---|
| 13 | [Acute Exacerbation of COPD (AECOPD)](cases/13-aecopd.html) | GOLD 2024 guidelines · bronchodilators, steroids, antibiotics, NIV | Pulmonology · GOLD 2024 |
| 14 | [Sub-Acute Pain Management](cases/14-pain-management.html) | CDC 2022 guidelines · multimodal analgesia · opioid risk stratification | Pain Medicine · CDC 2022 |
| 15 | [Thoracentesis](cases/15-thoracentesis.html) | Indications, technique, Light's criteria, ultrasound guidance, complications | Procedures · Pulmonology |
| 18 | [Intrathymic Thymopoiesis and T Cell Development](cases/18-thymopoiesis.html) | Progenitor migration, beta-selection, V(D)J recombination, positive/negative selection, AIRE, lineage commitment, thymic involution | Immunology · Hematology |

---

## Topic 18 — What's New

**Intrathymic Thymopoiesis and T Cell Development** is the most recently added educational topic. It covers:

- Progenitor migration and Notch-driven T lineage commitment
- Double negative (DN1-DN4) developmental stages with surface markers
- Beta-selection checkpoint and pre-TCR assembly
- V(D)J recombination mechanisms and CDR3 junctional diversity
- Positive selection by cortical thymic epithelial cells (cTECs) and MHC restriction
- Negative selection, AIRE, and central tolerance
- CD4/CD8 lineage commitment and the kinetic signaling model
- Repertoire outcomes including regulatory T cell agonist selection
- Thymic involution, aging, and connection to inflammaging and clonal hematopoiesis (CHIP)
- Clinical correlates: DiGeorge syndrome, SCID variants, APECED, thymoma, HIV/AIDS

---

## Structure

```
presentations/
├── index.html              # Repository landing page
├── README.md               # This file
└── cases/
    ├── 01-pedal-edema-hypoalbuminemia.html
    ├── 02-adrenal-incidentaloma.html
    ├── 03-etoh-withdrawal-hypercalcemia.html
    ├── 04-syncope-seizure.html
    ├── 05-acute-adrenal-insufficiency.html
    ├── 06-hepatorenal-syndrome.html
    ├── 07-necrotizing-fasciitis.html
    ├── 08-renal-subcapsular-hematoma.html
    ├── 09-palliative-care-downs.html
    ├── 10-anastomotic-leak-sepsis.html
    ├── 11-shoulder-infection.html
    ├── 12-vestibular-migraine.html
    ├── 13-aecopd.html
    ├── 14-pain-management.html
    ├── 15-thoracentesis.html
    ├── 16-acute-gastroenteritis.html
    ├── 17-ownership-radiation-colitis.html
    └── 18-thymopoiesis.html
```

---

## Design

Each page uses a consistent single-file HTML format with embedded CSS:

- **Sticky navigation** with breadcrumb back to index
- **Hero section** with topic number, specialty tags, and description
- **Sidebar table of contents** with anchor navigation (desktop)
- **Evidence-based content** with guideline citations and clinical pearls
- **Responsive layout** for mobile and desktop
- **Print-friendly** formatting
- No external JavaScript dependencies; no build step required

---

## Disclaimer

These case presentations are for **educational purposes only**. Clinical decision-making should be guided by current guidelines, patient-specific factors, and institutional protocols. Content references evidence current as of 2024-2025.

---

*Morning Report Case Repository · Internal Medicine · Built for GitHub Pages · David Comstock, MD · Guthrie Lourdes Hospital*
