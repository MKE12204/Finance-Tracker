# 📊 Finance Tracker Pro

A modern, modular web application for personal finance management. Track your income and expenses with real-time data visualization and multi-language support.

---

## 🌟 Key Features

* **Multi-language Support (i18n):** Full localization for **English, Polish, and Russian**.
* **Dynamic Charts:** Visual expense analysis powered by **Chart.js**.
* **Data Persistence:** Uses `localStorage` to keep your data safe between browser sessions.
* **Responsive Design:** Optimized for both desktop and mobile devices.
* **Export to PDF:** Generate and download financial reports instantly.
* **Dark Mode:** Built-in theme switcher for comfortable night use.

---

## 🏗️ Project Structure

The project is organized into logical modules for better maintainability:

```text
.
├── src/
│   ├── css/
│   │   ├── base.css          # Global variables & layout
│   │   ├── components.css    # UI elements (buttons, inputs)
│   │   ├── transactions.css  # History & Balance cards
│   │   └── utils.css         # Modals & Helper styles
│   ├── js/
│   │   ├── translations.js   # Localization dictionaries
│   │   ├── state.js          # Logic for data & storage
│   │   ├── ui.js             # DOM manipulation & Charts
│   │   └── main.js           # Event listeners & App entry
│   └── img/
│       └── favicon_count.svg # Application assets
├── index.html            # Main entry point
└── README.md             # Documentation
