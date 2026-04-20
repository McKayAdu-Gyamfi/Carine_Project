# Carine Project (Campus Nest Backend)

Welcome to the **Carine Project** repository. This project is a robust, production-ready backend API designed to power a comprehensive **Hostel Booking and Management System** (often referred to as Campus Nest). It connects Students, Hostel Managers, and Administrators, streamlining the process of finding, booking, and managing student accommodation.

---

## 📖 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Documentation & Resources](#documentation--resources)
- [License](#license)

---

## 🎯 Overview

The Carine Project backend acts as the central hub for managing hostels, rooms, bookings, student profiles, complaints, and reviews. It uses comprehensive Role-Based Access Control (RBAC) supporting three primary user roles:
- **STUDENT**: Can browse hostels, book rooms, lodge complaints, write reviews, and track personal bookings.
- **HOSTEL_MANAGER**: Can create and manage hostels, rooms, amenities, view total bookings, and resolve complaints.
- **ADMIN**: Has complete oversight into user management, system metrics, and cross-hostel administration.

---

## ✨ Key Features

- **Advanced Authentication**: Handled seamlessly by [Better-Auth](https://better-auth.com/), offering secure Email/Password pathways and automatic session management. 
- **Role-Based Access Control (RBAC)**: Secure routes utilizing scalable middleware to verify `STUDENT`, `HOSTEL_MANAGER`, and `ADMIN` permissions before proceeding.
- **Database Architecture**: Implemented with PostgreSQL (hosted via Supabase), leveraging `pg` for raw, highly optimized queries.
- **Media Uploads & Storage**: Upload and manage maximum 10 high-resolution images (up to 5MB each) per room/hostel directly to Supabase Storage Containers. 
- **Interactive Room Tours**: Integrated 360° Room Tours architecture utilizing an external API for panoramic processing. It is built using the open-source Pannellum software via the [Pano-Processing API Microservice](https://github.com/SMarco2310/pano-processing-api.git) to link and render multi-scene panoramas.
- **Security Best Practices**: Enhanced hardening using `helmet`, standard `cors` integrations, and robust `zod` input data validation.
- **Automated Testing Suite**: Full endpoint coverage via `Vitest` and `Supertest`, verifying public usability and strict authentication constraints.

---

## 🛠️ Tech Stack

- **Runtime Environment**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/) (v5.2.1)
- **Database**: PostgreSQL (via raw `pg` package integration) & [Supabase](https://supabase.com/)
- **Authentication**: `better-auth`
- **Testing framework**: `vitest` + `supertest`
- **Validation**: `zod`
- **File Uploads**: `multer`
- **Room Tours / Panoramas**: [Pano-Processing API Microservice (Pannellum Open Source)](https://github.com/SMarco2310/pano-processing-api.git)
- **Security**: `helmet`, `bcryptjs`, `cors`

---

## 📁 Project Architecture

```text
Carine_Project/
└── server/
    ├── src/                 # Application source code
    │   ├── config/          # Database, Authentication, and Environment Configs
    │   ├── middlewares/     # Auth checks, error handling, file upload limits
    │   ├── modules/         # Domain-driven architecture (auth, bookings, hostels, etc)
    │   ├── routes/          # Top-level API routing wrappers
    │   ├── services/        # Third-party integrations (e.g., Supabase storage)
    │   ├── app.js           # Express app instance and middleware bindings
    │   └── server.js        # Node.js cluster entry point
    ├── tests/               # Intgration test suites using Vitest & Supertest
    ├── API_ENDPOINTS.md     # Granular mapping of all available REST endpoints
    ├── TEST.md              # Postman Payload Templates for QA
    ├── test-results.md      # Auto-generated Test Pipeline Results
    └── package.json         # Node dependencies and project scripts
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed locally:
- [Node.js](https://nodejs.org/) (v18.0 or higher recommended)
- [Git](https://git-scm.com/)
- A [Supabase](https://supabase.com/) project (for PostgreSQL DB & Storage).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/McKayAdu-Gyamfi/Carine_Project.git
   cd Carine_Project/server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Environment Configuration

The application requires a `.env` file within the `/server` directory to operate. Create a `.env` file and insert the following base variables:

```env
# Application Server Port
PORT=3000

# Better-Auth Configuration
BETTER_AUTH_SECRET=your_super_secret_auth_key
BETTER_AUTH_URL=http://localhost:3000

# PostgreSQL Connection (Supabase Pooling Connection String)
DATABASE_URL=postgres://[db-user]:[db-password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true

# Supabase Client Configuration (Used for Storage & Media Uploads)
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_KEY=your_supabase_service_role_key

# Frontend Client URL (For CORS policies)
CLIENT_URL=http://localhost:3000
```
> **Note:** Never commit production `.env` variables to version control!

---

## 📜 Available Scripts

From the `/server` directory, run the following scripts using `npm run <script>`:

| Script | Command | Description |
|---|---|---|
| `start` | `node src/server.js` | Starts the production-ready Node.js server. |
| `dev` | `nodemon src/server.js` | Starts the server in development mode with active hot-reloading. |
| `test` | `vitest` | Runs the integration test suite in watch mode. |
| `test:run` | `vitest run` | Runs the integration test suite once (CI/CD ready). |
| `test:ui` | `vitest --ui` | Runs the testing framework via an interactive browser UI. |

---

## 🌐 API Endpoints

The API is highly structured using intuitive RESTful routing.
For an exhaustive, exhaustive documentation of all routes, parameters, and payloads, reference the [API_ENDPOINTS.md](./server/API_ENDPOINTS.md) file.

**Primary Route Categories:**
- 🔐 **Authentication:** `POST /api/auth/sign-in`, `POST /api/auth/sign-up`
- 🏢 **Hostels:** `/api/hostels` (CRUD operations for managers/admins, Public View for Students)
- 🛏️ **Rooms:** `/api/rooms` (Adding rooms, linking Panoramas, Amenities tracking)
- 📅 **Bookings:** `/api/bookings` (Student reservations, Manager checkout approvals)
- 💬 **Complaints:** `/api/complaints`
- ⭐ **Reviews:** `/api/reviews`
- 👤 **Users:** `/api/users/*` (Student Profile Onboarding, System Admin Management)

---

## 🧪 Testing

The codebase relies on **Vitest** combined with **Supertest** to execute full-scale integration tests simulating robust HTTP procedures.

To trigger the test suite, run:
```bash
cd server
npm run test:run
```
These tests simulate routing interactions, verifying that private/managerial API clusters correctly bounce unauthenticated external access with the appropriate `401 Unauthorized` or `403 Forbidden` statuses. You can find the test files isolated inside the `/tests` boundary.

---

## 📚 Documentation & Resources

If you are a frontend developer attempting to connect to this API, rely on the following supplemental markdown files embedded in the `/server` folder:

1. **`API_ENDPOINTS.md`**: Outlines all the system endpoints and expected request requirements per user RBAC role.
2. **`TEST.md`**: Contains curated Postman Payloads and Raw JSON snippets that you can plug into Insomnia/Postman directly for rapid interface testing.

---

## 📄 License

This application is built for academic software engineering specifications under the scope of Ashesi's capstone infrastructure guidelines.
All rights reserved © 2026.
