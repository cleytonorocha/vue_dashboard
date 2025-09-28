# vue_dashboard_front

Product dashboard front-end built with Vue — lightweight, responsive and chart-driven.

<img src="./gif.gif"></img>


> Quick, ready-to-use dashboard UI (ApexCharts) with KPIs, charts and a simple product list. Add your API URL in the `.env` files and you're ready to go.

---

## Features

- KPI cards (Total Products, Active / Pending counts, Total Stock)
- 4 main charts (Products by Category, Product Status, Average Price by Category, Stock by Product) using **ApexCharts**
- Selection control to change how many products are loaded (10 / 50 / 100 / 500)
- Responsive layout using Bootstrap utilities
- Environment-specific `.env` files included (`.env.development`, `.env.production`)
- Minimal, easy-to-extend structure to plug real API endpoints

---

## Tech stack (inferred)

- Vue (Vue CLI / Vue 3 assumed)
- ApexCharts (`vue3-apexcharts`)
- Bootstrap classes for layout
- Element UI / Element Plus used for select (`el-select` seen in code)
- Axios or a service file for API calls (e.g. `@/service/ProductService`)

> If your `package.json` uses different exact packages or script names, update the commands below accordingly. See repo listing for files. :contentReference[oaicite:1]{index=1}

---

## Getting started (local)

1. Clone the repo
```bash
git clone https://github.com/cleytonorocha/vue_dashboard_front.git
cd vue_dashboard_front
 
Execute env

- dashboard_dev
- dashboard_prod