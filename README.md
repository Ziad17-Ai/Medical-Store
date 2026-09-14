# 🏥 MediCare Store — Medical Equipment & Supplies Platform

MediCare Store is a comprehensive, multi-role e-commerce and store management web platform built specifically for medical equipment, supplies, diagnostic tools, and pharmaceuticals. It handles user authentication, prescription verification workflows, interactive shopping cart operations, and a dedicated administrator dashboard.

---

## 🌟 Interactive Features & Demos

You can interact directly with the provided files using the dropdowns and collapsible sections below to explore how the system works!

<details>
<summary><b>🔍 Click to Expand: Core User Roles & Credentials</b></summary>

<br>

| Role | Access Level | Demo Credentials | Key Capabilities |
| :--- | :--- | :--- | :--- |
| **System Administrator** | Full Control | Navigate to `admin.html` | Manage inventory, approve prescriptions, view sales charts, process orders |
| **Medical Professional** | Professional Portal | `demo@medicalstore.com` / `demo123` | Special purchasing terms, license verification submission |
| **Customer / Individual** | Storefront | Self-register on `register.html` | Shop products, manage cart, upload prescriptions, checkout |

</details>

<details>
<summary><b>🛒 Click to Expand: Dynamic Interactive Logic (`app.js` & `cart.js`)</b></summary>

<br>

* **Local Storage Synchronization:** Cart state is saved to `localStorage` and automatically syncs items and totals across multiple browser tabs.
* **Prescription Gating:** Items requiring a prescription display a medical icon prompt requiring image/PDF uploads before checkout.
* **Promo Code Calculator:** Try applying coupon codes on the cart page:
  * `MEDICAL10` — Discount of EGP 1,000
  * `HEALTH15` — Discount of EGP 1,500
  * `SAVE20` — Discount of EGP 2,000

</details>

<details>
<summary><b>📊 Click to Expand: Interactive Admin Panel Features (`admin.js`)</b></summary>

<br>

* **Dynamic Navigation:** Multi-section view control (`#dashboard`, `#products`, `#orders`, `#customers`, `#prescriptions`).
* **Interactive Modals:** Add new medical items dynamically with real-time field validation, JSON specifications support, and file attachment handling.
* **Live Notifications:** Custom overlay notification engine supporting success, error, and info popups with auto-dismissal.

</details>

---

## 📂 Project Structure

* `admin.html` — Admin Panel dashboard interface with metrics & charts
* `admin.js` — Navigation, product creation modal, dynamic tables, & notification system
* `app.js` — Main e-commerce engine, mobile navigation, global cart state, prescription modals
* `auth.js` — Password visibility toggles, strength checking, dynamic license inputs, mock authentication
* `cart.html` — Shopping cart view, summary layout, prescription modal structure
* `cart.js` — Cart table rendering, quantity controls, promo codes, local storage actions
* `checkout.html` — Step-by-step multi-stage order placement and checkout workflow

---

## 🚀 Quick Start Guide

1. **Clone or Download** the repository files to your local system.
2. Open **`index.html`** or **`cart.html`** in any web browser to access the storefront.
3. Open **`admin.html`** in your browser to access the Admin Control Center.
4. Try clicking **"Add Product"** in the admin dashboard or adding products to the cart in `cart.html` to test interactive state changes!

---

## 💻 Tech Stack

* **Frontend Markup:** HTML5 (Semantic elements, accessible form controls)
* **Styling Framework:** Custom CSS3 with FontAwesome 6 icons & Google Fonts (Poppins & Roboto)
* **Client Scripting:** JavaScript ES6+ (DOM manipulation, event delegation, LocalStorage management)
