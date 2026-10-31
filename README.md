# Dok's Off Sales Website

## Project Overview

The **Dok's Off Sales Website** is a responsive small business website developed using **HTML5**, **CSS3**, and **JavaScript**. The website was created as part of a web development assignment to demonstrate front-end web design skills while promoting a local liquor store located in Khayelitsha, Cape Town.

The website provides customers with information about the business, its products, contact details, and an enquiry form. It is designed to be user-friendly, responsive, and accessible on desktop, tablet, and mobile devices.

## Project Objectives

- Promote Dok's Off Sales online.
- Display available products and services.
- Provide business contact information.
- Allow customers to submit enquiries.
- Demonstrate responsive web design techniques.
- Practice HTML, CSS, and JavaScript development.

## Website Pages

- **Home** (`index.html`)
  - Welcome section
  - Featured products
  - Business information

- **About Us** (`about.html`)
  - Company overview
  - Mission
  - Vision
  - Store gallery

- **Products** (`products.html`)
  - Beer & Cider
  - Whisky
  - Cognac
  - Vodka & Tequila
  - Brandy
  - Energy Drinks

- **Enquiry** (`enquiry.html`)
  - Customer enquiry form

- **Contact** (`contact.html`)
  - Contact information
  - Google Map
  - Contact form

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Visual Studio Code

##  Project Structure

```
doks-off-sales-website/
│
├── index.html
├── about.html
├── products.html
├── enquiry.html
├── contact.html
├── README.md
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
└── images/
    ├── shop1.jpg
    ├── shop2.jpg
    └── shop3.jpg
```

## Features

- Responsive layout
- Sticky navigation bar
- Hero image banners
- Product catalogue
- Customer enquiry form
- Contact form
- Google Maps integration
- Image gallery
- Scroll-to-top button
- Form validation using JavaScript
- Fade-in animations
- Mobile-friendly design

## Business Information

**Business Name:** Dok's Off Sales

**Address:**  
13 Ntsikizi Street  
Khayelitsha  
Western Cape  
7784  
South Africa

**Phone:** +27 79 796 7634

**Email:** doksalesstore@gmail.com

### Business Hours

| Day | Opening Hours |
|------|---------------|
| Monday – Saturday | 09:00 – 20:00 |
| Sunday | 10:00 – 18:00 |

## Part 2 – Designing the Visuals

### CSS Styling
The website was styled using an external CSS stylesheet. A consistent
green and gold colour scheme was used to match the Dok's Off Sales
branding. Typography, spacing, buttons, navigation, product cards,
forms and other website elements were also styled.

### Responsive Design
The website was tested on desktop, tablet and mobile screen sizes.
CSS media queries, flexible layouts and responsive images were used
to ensure that the website adapts to different devices.

### Responsive Testing

#### Desktop
![Desktop Home](screenshots/desktop-homepage.png)

![Desktop Products](screenshots/desktop-productpage.png)

#### Tablet
![Tablet Home](screenshots\tablet-homepage.png)

#### Mobile
![Mobile Home](screenshots/mobile-homepage.png)

![Mobile Products](screenshots/mobile-productpage.png)

![Mobile Contact](screenshots/mobile-contactpage.png)

## Part 3 – Enhancing Functionality and SEO

### JavaScript functionality
- Added live product searching that works with the existing product category filters.
- Added a keyboard-accessible image lightbox to the store gallery. Images can be opened, closed with the close button, by clicking outside the image, or with Escape.
- Improved client-side form validation with required-field checks, email validation, phone-number format guidance, and visible feedback messages.
- Added accessible status messages for product search and form feedback.

### Form submission limitation
This is a static HTML/CSS/JavaScript website. The forms validate the visitor's input and prepare a pre-filled email in the visitor's email application addressed to `doksalesstore@gmail.com`. The visitor must review and press Send in their email application. A static website alone cannot guarantee email delivery or provide server-side storage. For direct submission without opening an email application, connect a form backend/service and test it before publishing.

### On-page SEO
- Added descriptive page titles and meta descriptions.
- Added relevant keywords and basic Open Graph metadata.
- Retained semantic headings, internal navigation, responsive images and descriptive image alternative text where present.
- Added a `robots.txt` file and `sitemap.xml` template.

### Deployment checklist
Before publishing, replace `YOUR-GITHUB-USERNAME` and `YOUR-REPOSITORY` in `robots.txt` and `sitemap.xml` with the real GitHub Pages address. The sitemap must use the final public URLs. Test every page after deployment and submit the public repository and website links.

### Part 3 changelog
- Added a product search field and live result count; search works alongside category filters.
- Added an accessible lightbox for images in the About page store gallery.
- Improved form validation and error/status feedback. Valid form submissions open a pre-filled email draft; the website does not claim an email has been sent automatically.
- Added SEO metadata to all five HTML pages.
- Added `robots.txt` and `sitemap.xml` templates for deployment.
- Updated screenshot references to use forward slashes so they render correctly on GitHub.

### SEO and web standards references
- Google Search Central. (n.d.). *SEO Starter Guide*. https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central. (n.d.). *Build and submit a sitemap*. https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- MDN Web Docs. (n.d.). *Constraint validation*. https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation
- MDN Web Docs. (n.d.). *Using the Fetch API* (for future server-backed form integration). https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- W3C. (n.d.). *Web Content Accessibility Guidelines (WCAG) 2.2*. https://www.w3.org/TR/WCAG22/


## Part 3 – Functionality and SEO

### JavaScript functionality
- Product search works together with the category filters and updates a result count.
- The store gallery supports an accessible lightbox that opens by click/keyboard and closes with the close button, backdrop click, or Escape.
- The navigation menu supports mouse and keyboard interaction on small screens.
- Forms validate required fields and supported email/phone formats before preparing a message in the visitor's email application. A static HTML site cannot send email directly; the visitor must press Send in their email application.

### SEO improvements
- Page-specific titles and meta descriptions are included.
- Pages use semantic headings and image alt text.
- Internal navigation links connect the five pages.
- `robots.txt` and `sitemap.xml` are included as templates. Replace `YOUR-GITHUB-USERNAME` and `YOUR-REPOSITORY` in both files with the actual GitHub Pages username/repository after publishing.
- Test the final published site and verify the sitemap URL before submission.

### Part 3 bug fix
- Fixed the gallery lightbox so its hidden state cannot be overridden by `display:flex`. This prevents a transparent/dark overlay from covering the Home and About pages and blocking navigation or buttons.
- Reduced the decorative hero overlay darkness and prevented the decorative overlay from intercepting clicks.

## Project Documentation

- [Changelog](CHANGELOG.md) — records project improvements and corrections.
- [References](REFERENCES.md) — lists the resources consulted during development.

## Live Website

Visit the published website:

https://rodri1101.github.io/Dok-Off-Sales-Website-part-3/
