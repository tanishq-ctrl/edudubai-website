# Partner Logos

This directory contains logo images for the financial institutions displayed in the "Trusted by AML & Compliance Professionals Worldwide" banner on the homepage.

## Required Logo Images

Please add the following logo images to this directory:

1. **hsbc.png** - HSBC logo
2. **credit-suisse.png** - Credit Suisse logo
3. **adcb.png** - ADCB (Abu Dhabi Commercial Bank) logo
4. **mufg.png** - MUFG logo
5. **mizuho.png** - Mizuho logo
6. **societe-generale.png** - Société Générale logo
7. **commonwealth-bank.png** - Commonwealth Bank logo
8. **credit-agricole.png** - Crédit Agricole logo
9. **icbc.png** - ICBC (Industrial and Commercial Bank of China) logo
10. **abc.png** - Agricultural Bank of China logo
11. **bank-of-america.png** - Bank of America logo
12. **barclays.png** - Barclays logo
13. **gci-australia.png** - GCI Australia logo
14. **hock-international.png** - Hock International logo

### Additional Partners (20 more)

**Global Banks:**
15. **jpmorgan-chase.png** - JPMorgan Chase logo
16. **standard-chartered.png** - Standard Chartered logo
17. **deutsche-bank.png** - Deutsche Bank logo
18. **bnp-paribas.png** - BNP Paribas logo
19. **citibank.png** - Citibank / Citi logo
20. **ubs.png** - UBS logo

**Middle East & Gulf Region Banks:**
21. **emirates-nbd.png** - Emirates NBD logo
22. **fab.png** - First Abu Dhabi Bank (FAB) logo
23. **dib.png** - Dubai Islamic Bank (DIB) logo
24. **qnb.png** - Qatar National Bank (QNB) logo
25. **mashreq.png** - Mashreq Bank logo

**Compliance & Professional Organizations:**
26. **acams.png** - ACAMS (Association of Certified Anti-Money Laundering Specialists) logo
27. **ica.png** - ICA (International Compliance Association) logo

**Technology & Compliance Software:**
28. **refinitiv.png** - Refinitiv (formerly Thomson Reuters) logo
29. **lexisnexis.png** - LexisNexis Risk Solutions logo

**Exchange Houses & FinTech:**
30. **al-ansari.png** - Al Ansari Exchange logo
31. **uae-exchange.png** - UAE Exchange logo

## Image Specifications

### Perfect Dimensions

**Recommended Size:**
- **Width**: 150-200px (optimal: 180px)
- **Height**: 64px (maximum)
- **Aspect Ratio**: Maintain original logo proportions (will auto-scale to fit)

**Technical Details:**
- **Container Height**: 64px (fixed)
- **Container Min Width**: 120px
- **Image Display**: `object-contain` - maintains aspect ratio, scales to fit within 64px height
- **Format**: PNG with transparent background (preferred) or white background
- **File Size**: Optimize images to keep file sizes small (< 50KB each recommended)

### Examples by Logo Type:

**Wide/Horizontal Logos** (e.g., "Bank of America", "Credit Suisse"):
- Dimensions: **180px × 64px** or **200px × 64px**
- These will display at full width within the 64px height constraint

**Square Logos** (e.g., "MUFG", "ICBC"):
- Dimensions: **64px × 64px** (1:1 ratio)
- Will display at full size

**Tall/Vertical Logos**:
- Dimensions: **120px × 64px** or maintain original ratio
- Will be scaled down to fit 64px height, width auto-adjusts

### Best Practice:
Create logos at **180px width × 64px height** (or maintain original aspect ratio if logo is square/tall). The component will automatically scale them to fit perfectly while maintaining aspect ratio.

## Fallback Behavior

If a logo image is missing or fails to load, the component will automatically fallback to displaying the institution name as text.

## Usage

The logos are automatically displayed in a smooth, infinite scrolling banner on the homepage. The animation:
- Scrolls continuously from right to left
- Pauses on hover for better user experience
- Loops seamlessly for infinite scrolling effect

