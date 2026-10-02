# Full-Stack E-commerce Store (Vite + React + Node.js)

An electronics e-commerce web app (phones, laptops, tablets) with a Vite/React storefront and admin panel backed by an Express, Sequelize and MySQL REST API.

## Features

**Customer storefront**
- Home page with product sliders and hot-sale sections, plus category pages for phones (`/dien-thoai`), laptops and iPads
- Product detail pages by slug with configuration options (color, capacity, RAM) and a specifications section
- Product search in the header and paginated product lists
- Register / login with email and password, or sign in with Google (OAuth)
- Shopping cart, checkout with cash on delivery or PayPal, and an order history page
- Order confirmation emails sent through Nodemailer

**Admin panel (`/admin`)**
- Separate admin login, including Google sign-in
- Management screens for accounts, positions, roles and position-role assignments
- Product management (create, update, toggle status, delete) with categories and product attributes (colors, capacities, RAM)
- Role-based access control: every admin API route checks a JWT plus a per-feature permission

**Backend**
- REST API split into `/api` (public/customer) and `/api/admin` (protected) routes
- Sequelize models, migrations and seeders for users, products, versions, configs, images, brands, categories, carts, orders, order lines, addresses and assessments
- Image uploads to Cloudinary

## Tech stack

- **Frontend:** React 18, Vite 5, React Router 6, MUI, Bootstrap 5, Sass, Axios, Framer Motion, React Toastify, `@react-oauth/google`, `@paypal/react-paypal-js`
- **Backend:** Node.js, Express 4, Sequelize 6, MySQL (`mysql2`), JSON Web Tokens, bcryptjs, Nodemailer, Cloudinary, Babel
- **Infrastructure:** Docker, Docker Compose (MySQL 8.0, client and server containers)

## Project structure

```
.
├── client/               # Vite + React app
│   └── src/
│       ├── frontend/     # Customer storefront: pages, layouts, routes, services
│       ├── admin/        # Admin panel: pages, layouts, routes, services
│       └── main/         # Shared auth context, global styles, route aggregation
├── server/               # Express REST API
│   └── src/
│       ├── config/       # Sequelize config and DB connection
│       ├── controllers/  # Request handlers (products, carts, orders, auth, ...)
│       ├── middleware/   # JWT and permission checks (customer and admin)
│       ├── migrations/   # Sequelize migrations
│       ├── models/       # Sequelize models
│       ├── routes/       # userApi.js (/api) and adminApi.js (/api/admin)
│       ├── seeders/      # Seed data (roles, positions, smartphone catalog, ...)
│       └── utility/      # Mail sending and Cloudinary upload helpers
├── docker-compose.yml    # MySQL + client + server stack
└── setup.sh              # Helper script: rebuild containers, pull code, migrate and seed
```

## Getting started

### Prerequisites

- Node.js 20+ and npm
- MySQL 8 (or Docker and Docker Compose)

### Environment variables

`server/.env.example` and `client/.env.example` are provided as templates. Copy them to `.env` and fill in the values the code reads:

- **server/.env:** `PORT`, `REACT_URL` (allowed CORS origin), `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE_NAME`, `DB_HOST`, `DB_PORT`, `DB_DIALECT` (`mysql`), `JWT_SECRET`, `JWT_EXPIRES_IN`, `NODE_SECURE`, and `CLIENT_ID` / `CLIENT_SECRET` for Google OAuth
- **client/.env:** `VITE_API_API_URL` (API base URL, e.g. `http://localhost:8000`) and `VITE_API_GOOGLE_CLIENT_ID`

### Run locally

```bash
# Backend
cd server
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm start                 # nodemon + babel-node src/server.js

# Frontend (in a second terminal)
cd client
npm install
npm run dev               # Vite dev server on http://localhost:5173
```

Other scripts: `npm run build-src` / `npm run build` in `server/` (compile with Babel to `build/` and run it), and `npm run build`, `npm run preview`, `npm run lint` in `client/`.

### Run with Docker

```bash
docker compose up --build -d
docker compose exec server npx sequelize-cli db:migrate
docker compose exec server npx sequelize-cli db:seed:all
```

This starts MySQL 8.0 (host port `3303`), the API (`8000`) and the client (`5173`). Replace the `change-me` placeholders in `docker-compose.yml` before use.

## Author

**Hoang Pham** — [Portfolio](https://hoangpham2263.github.io) · [GitHub](https://github.com/hoangpham2263)
