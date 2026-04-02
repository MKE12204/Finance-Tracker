# 📊 Finance Tracker 

A professional, lightweight personal finance management tool built with a focus on **clean architecture** and **user experience**. This application allows users to track incomes, expenses, and visualize their financial data in real-time.

---

## 🌟 Key Features

* **Multilingual Interface (i18n):** Native support for **English**, **Polish**, and **Russian**.
* **Dynamic Data Visualization:** Interactive spending breakdown using **Chart.js**.
* **Persistent Storage:** All data is saved locally via `localStorage` (data persists after page refresh).
* **Dark Mode Support:** Smooth theme switching for comfortable use at any time.
* **Advanced Filtering & Search:** Filter by transaction type or search by description "on the fly".
* **PDF Reports:** Professional export functionality to generate financial statements.
* **UX-Focused Modals:** Custom confirmation system for deleting records to prevent accidental data loss.

---

## 🏗️ Project Architecture

The project follows a **modular approach**, separating concerns into dedicated files. This ensures high maintainability and scalability.

### 📁 Directory Structure
```text
.
├── img/                  # Application icons and assets
├── src/
│   ├── css/
│   │   ├── base.css          # Global variables & layout
│   │   ├── components.css    # UI elements (buttons, inputs)
│   │   ├── transactions.css  # History & Balance cards
│   │   └── utils.css         # Modals & Footer styles
│   └── js/
│       ├── translations.js   # Dictionary for localization
│       ├── state.js          # App state & LocalStorage logic
│       ├── ui.js             # DOM manipulation & Chart logic
│       └── main.js           # Event listeners & Entry point
├── index.html            # Main application entry
└── README.md             # Project documentation