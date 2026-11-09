# Playwright SauceDemo Automation

An automated End-to-End (E2E) testing framework built using **Playwright** and **JavaScript/TypeScript**, designed to test the [SauceDemo](https://www.saucedemo.com/) e-commerce platform. 

This repository serves as a portfolio project demonstrating modern automated testing practices, including the Page Object Model (POM) design pattern and cross-browser testing.

---

## Tech Stack

* **Test Runner:** [Playwright](https://playwright.dev/)
* **Language:** JavaScript / TypeScript
* **Design Pattern:** Page Object Model (POM)
* **Reporting:** Playwright HTML Reporter

---

## Project Structure

```text
playwright-saucedemo-automation/
│
├── tests/              # Test specification files (e.g., login.spec.js, checkout.spec.js)
├── pages/              # Page Object Model classes (e.g., login.page.js, inventory.page.js)
├── playwright.config.js# Playwright configuration file
├── package.json        # Project dependencies and custom scripts
└── .gitignore          # Files and folders to exclude from version control