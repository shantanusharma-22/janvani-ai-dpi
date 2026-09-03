# JanVani AI (जनवाणी AI) 🇮🇳
### National Citizen Demand Aggregation & Infrastructure Prioritization Engine
**A Recognized Digital Public Good (DPG) atop India's Digital Public Infrastructure (DPI) Stack**

[![Digital Public Good](https://img.shields.io/badge/DPG-Alliance_Compliant-06b6d4?style=flat-square)](https://digitalpublicgoods.net/)
[![Bhashini AI](https://img.shields.io/badge/Speech_AI-Bhashini_22_Langs-8b5cf6?style=flat-square)](https://bhashini.gov.in/)
[![PM Gati Shakti](https://img.shields.io/badge/Spatial_GIS-PM_Gati_Shakti-10b981?style=flat-square)](https://gatishakti.gov.in/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg?style=flat-square)](LICENSE)

---

## 📌 The Problem
Governments across India struggle to consolidate citizen feedback and align it with national infrastructure priorities. Development requests live in fragmented departmental grievance portals, paper applications, and uncoordinated regional systems. This leads to:
- **Misaligned Public Capital Spending:** Budgets allocated to low-impact works while acute gaps remain unfunded.
- **Unaddressed Infrastructure Gaps:** Critical bridges, potable water grids, and maternal health centers in remote tribal & aspirational districts are overlooked.
- **Zero Closed-Loop DPI Measurement:** No empirical mechanism to track whether multi-crore public capital investments effectively resolve bottom-up citizen distress.

---

## 🚀 The Solution: JanVani AI
**JanVani AI** is an open-source **Digital Public Good (DPG)** that aggregates citizen development requests across **voice, text, and messaging apps** in 22 Scheduled Indian languages, fuses them with national demographics, infrastructure indices, and public investment plans, and recommends high-priority infrastructure projects directly to national and state policymakers.

### 🌟 Core Architectural Features

1. **Omnichannel Multilingual Citizen Ingestion:**
   - **Bhashini Speech-to-Intent AI:** Native voice note and IVR recognition across Hindi (Bundeli), Tamil, Bengali, Marathi, Odia, Telugu, and 16+ more dialects.
   - **WhatsApp / SMS Simulated Bot:** Citizen-friendly messaging bot with automatic Local Government Directory (LGD) village geotagging.
   - **Zero-Shot NLP Entity Extraction:** Identifies domain (Roads, Water, Health, Power), severity, beneficiary scale, and issues a cryptographic DPG Token (`#JV-2026-MP-49218`).

2. **Triple-Layer Data Fusion Engine:**
   - **Layer 1:** Bottom-up citizen voices & sentiment clusters.
   - **Layer 2:** National Demographics (Census, Socio-Economic Caste Census, NITI Aayog Multidimensional Poverty Index - MPI).
   - **Layer 3:** Physical Infrastructure Deficits (Jal Jeevan Mission tap coverage, PMGSY road connectivity, PHC bed ratios).
   - **Layer 4:** Public Investment Plans (PM Gati Shakti 44 GIS data layers, National Infrastructure Pipeline, State DMF reserves).

3. **National Demand Hotspots & Interactive GIS Explorer:**
   - Vector geospatial cockpit highlighting critical Aspirational Districts (Malkangiri, Nandurbar, Bastar, Nuh/Mewat, Bahraich, Purulia, Kalahandi, etc.).
   - Multi-layer diagnostic cards surfacing local demographic vulnerability vs unspent public funds.

4. **Public Value Index (PVI) Prioritization Cockpit:**
   - Algorithmic project ranking formula:
     $$\text{PVI} = (0.30 \times \text{Demand}) + (0.25 \times \text{Vulnerability}) + (0.25 \times \text{Deficit}) + (0.20 \times \text{Multiplier}) - \text{Friction}$$
   - Pre-computed project dossiers for Union and State Ministers across MoRTH, Jal Shakti, MoHFW, Power, and Education.

5. **Knapsack Capital Outlay & Budget Optimizer:**
   - Dynamic simulation tool calculating Pareto-optimal infrastructure project portfolios for any given capital pool (₹200 Cr – ₹5,000 Cr).

6. **Closed-Loop Impact Measurement & Public Ledger:**
   - Verifiable outcome metrics (commute time reduction, waterborne illness drop) and transparent public audit trail hashes.

---

## 🛠️ Technology Stack
- **Frontend:** Semantic HTML5, Vanilla CSS3 (Frosted Glassmorphism, Deep Aurora theme), Vanilla ES6+ Javascript.
- **Audio & Speech:** Web Audio API Frequency Synthesizer + Web Speech API Recognition.
- **Standards:** Digital Public Goods Alliance (DPGA) open standards, Beckn Protocol v2, DEPA Consent Architecture.

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/shantanusharma-22/janvani-ai-dpi.git
cd janvani-ai-dpi

# Start a local static server (Node.js)
npx -y serve -p 3000
# or with Python
python -m http.server 3000
```

Open `http://localhost:3000` in your web browser.

---

## 🌐 Deployment
This repository is pre-configured with a **GitHub Actions workflow** (`.github/workflows/deploy.yml`) to automatically deploy to **GitHub Pages** on push to `main`.

Once pushed, enable GitHub Pages:
1. Go to repository **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Your platform will be live at:
   `https://shantanusharma-22.github.io/janvani-ai-dpi/`

---

## 📜 License
Released under the **MIT Open Infrastructure License**. Free and open for sovereign governments, research institutions, and digital public goods developers.
