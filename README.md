# Kalo & Crumb — Specialty Coffee Roastery & Provisions

A bespoke studio-crafted web application for an independent specialty coffee roastery and brewing gear brand. Built with **React 19**, **Vite 6**, **Tailwind CSS v4**, and **Lucide Icons**.

---

## ☕ Brand Design System & Aesthetic Foundation

In strict adherence to the anti-AI-cliché principles, this application avoids generic neon/purple gradients, generic glassmorphism blobs, and cookie-cutter grids. Instead, it embodies a warm, tactile, editorial studio identity:

- **Tactile Color Palette**:
  - Background: Warm Parchment / Unbleached Linen (`#F7F4EE`)
  - Elevated Card Tone: Soft Paper Surface (`#FAF7F2`)
  - Charcoal Espresso Ink: Deep Organic Contrast (`#1A1715`)
  - Roasted Terracotta / Rust: Maillard Accent (`#B85021`)
  - Amber / Toasted Caramel: Sweetness & Accents (`#C88A36`)
  - Botanical Sage: Farm-Gate / Direct-Trade Wash (`#3D5948`)
  - Hairline Borders: 1px Muted Neutral (`#DED8CE`)
- **Typography Hierarchy**:
  - Headings & Editorial Display: **Fraunces** (Google Fonts variable optical sizing with warm, humanist serifs)
  - Body & UI Controls: **Plus Jakarta Sans** (crisp geometric sans)
  - Data, Weights, and Extraction Ratios: **JetBrains Mono** with `font-variant-numeric: tabular-nums`
- **Authentic Specialty Coffee Copywriting**:
  - Real tasting notes (e.g. *Bergamot tea, candied peach, jasmine blossom, wild honey*)
  - True terroir attributes (elevation in *m.a.s.l.*, indigenous varietals like *Dega, Wolisho, SL28, Pink Bourbon*)
  - Technical processing transparency (*Thermal Shock, 24-day raised African bed natural, Mountain Water Process*)
  - SCA cupping notes and Agtron roast meter index (*74/88 Nordic Light*)
  - Zero "Lorem ipsum" and zero corporate clichés.

---

## 🛠️ Core Features & Interactive Capabilities

1. **Top Announcement Bar**:
   - Current drum batch notification (*Batch Lot #042: Guji Uraga Natural*)
   - Dispatch schedule and carbon-neutral shipping threshold ($55+)
   - Welcome discount code reminder (`FIRSTPOUR` for 10% off)

2. **Sticky Editorial Navigation**:
   - Wordmark with roastery moniker (*Est. 2021*)
   - Clean category shortcuts (Shop All, Single Origins, Espresso Blends, Brew Calculator, Roast Craft, Origin Atlas, Reviews)
   - Quick search trigger
   - Live Shopping Bag drawer trigger with item badge and dynamic subtotal
   - Fully responsive mobile menu drawer

3. **Editorial Hero Section**:
   - Asymmetric split layout with high-impact Fraunces typography
   - Proof point strip: *100% Direct-Trade*, *Loring S15 Clean Convection*, *Agtron Nordic Calibration*
   - Interactive "Currently on the Drum" card with lot specifications and instant Add-to-Bag

4. **Product Catalog & Dynamic Filter Suite**:
   - Multi-category filtering (*All Provisions*, *Single Origin*, *Espresso Blends*, *Decaf & Low-Caf*, *Brewing Gear & Ceramics*)
   - Instant search input matching name, tasting notes, origin, or varietal
   - Roast level filter chips (*Nordic Light*, *Light-Medium*, *Medium*)
   - Sorting by *Featured Harvests*, *Price: Low to High*, *Price: High to Low*, and *Highest Elevation*
   - Interactive Bag Size selector (250g, 500g, 1kg) with live cup count estimates and price calculation
   - Interactive Grind Selector (Whole Bean, Pour-Over/Filter, Espresso, AeroPress, French Press)
   - One-click "Quick View" modal trigger and "Add to Bag" action

5. **Quick-View Modal ("Lot Dossier")**:
   - High-resolution photography
   - Comprehensive technical dossier (Elevation, Varietal, Farm / Smallholder collective, Processing, Harvest cycle, Agtron score)
   - Sensory balance breakdown bars (Acidity, Sweetness, Body)
   - Roaster's sensory cupping notes
   - Bag size and grind selector with quantity stepper

6. **Interactive Brew Ratio & Recipe Calculator**:
   - Supports 5 manual brew methods: *Hario V60 02*, *AeroPress Inverted*, *Chemex 6-Cup*, *Modern Espresso*, *Classic French Press*
   - Interactive Dose Slider (e.g. 12g to 50g)
   - Live calculates target water mass in grams, water temperature, grind micron range, and drawdown time
   - Recalculates exact grams for every step in the pouring schedule
   - Built-in live Brewing Stopwatch with Start, Pause, and Reset
   - "Copy Recipe to Clipboard" utility

7. **The Roastery Discipline (Craft & Roasting Philosophy)**:
   - 4-stage storytelling:
     1. Direct-Trade Farm Gate Pricing (65–120% above C-market)
     2. Single-Pass Clean Convection Roasting (Loring S15 Kestrel)
     3. Tri-Stage Cupping & Agtron Indexing (Q-Grader sensory protocol)
     4. Nitrogen-Purged Barrier Packaging (<0.5% residual oxygen)

8. **Origin Atlas & Terroir Explorer**:
   - Interactive exploration of partner growing regions: *Ethiopia (Uraga)*, *Colombia (Huila)*, *Kenya (Nyeri)*, *Costa Rica (Tarrazú)*
   - Terroir metadata: Elevation, soil composition, micro-climate, harvest windows, and active roasting lots

9. **Continuous Review Marquee**:
   - Smooth, infinite horizontal marquee of realistic reviews from coffee nerds and home baristas
   - Displays reviewer name, city, verified brew equipment used (*Fellow Ode Gen 2, V60, La Marzocco Micra*), coffee purchased, and rating
   - Smooth pause-on-hover; fully accessible with `prefers-reduced-motion` support

10. **Slide-Over Shopping Bag Drawer**:
    - Animated slide-over drawer with backdrop blur
    - Free shipping progress bar ($55 threshold with dynamic amount countdown)
    - Full item list with size, grind style, quantity steppers, and delete
    - Working Promo Code engine:
      - `FIRSTPOUR` / `WELCOME10`: 10% off
      - `FREESHIP`: Complimentary shipping unlocked
      - `HARVEST15`: 15% harvest discount
    - Subtotal, discount deduction, shipping, and grand total

11. **Simulated Roastery Checkout Flow**:
    - Step 1: Shipping and Contact dossier (Name, Email, Address, Courier Speed selection)
    - Step 2: Encrypted payment simulation with card details
    - Step 3: Order Confirmation state with simulated Order ID (e.g. `#KC-84192`), estimated drum roasting date, print receipt trigger, and cart reset

12. **The Roaster's Dispatch (Newsletter) & Studio Footer**:
    - Email subscription form with instant feedback state and welcome code unlock (`FIRSTPOUR`)
    - Rich studio footer with physical cupping room address, tasting hours, roast cycles, dispatch guarantees, and SCA member accreditation

13. **Toast Notification System**:
    - Non-intrusive floating toasts for bag additions, recipe copies, and promo updates.

---

## 🚀 Running the Project Locally

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

The production output is generated in `./dist` and configured with relative assets (`./assets/...`) so it can be previewed or served statically anywhere.
