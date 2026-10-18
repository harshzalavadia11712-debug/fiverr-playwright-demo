# 🎭 Fiverr Playwright Automation Demo

A professional end-to-end web automation framework built with
**Playwright + TypeScript**.

This project demonstrates a scalable automation architecture suitable
for modern web applications, including UI testing, API validation,
Page Object Model, test data management, reporting, cross-browser
testing, and CI/CD execution.

---

## 🚀 Tech Stack

- Playwright
- TypeScript
- Node.js
- Playwright Test Runner
- Page Object Model (POM)
- API Testing
- GitHub Actions
- Cross-Browser Testing
- HTML Reports

---

## 🧪 Test Coverage

The framework currently includes automated tests for:

- 🔐 Login & Authentication
- 🛍️ Product Listing
- 🛒 Shopping Cart
- 💳 Checkout
- 🔌 API Validation
- 📊 Product Sorting
- 🧾 Test Data Management
- 🌐 Cross-Browser Execution

**Current Test Suite:** 13 automated tests

---

## 🏗️ Project Structure

```text
fiverr-playwright-demo/
│
├── pages/
│   └── ProductsPage.ts
│
├── tests/
│   ├── login.spec.ts
│   ├── products.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   └── api.spec.ts
│
├── test-data/
│   └── loginData.ts
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── .gitignore
└── README.md