# AssetFlow — Enterprise Asset & Resource Management

> **Odoo Hackathon 2026** · Solo build · Mohit

AssetFlow is a full-stack enterprise asset management system built for the Odoo Hackathon 2026. It tracks the complete lifecycle of physical assets — from registration through allocation, transfer, booking, maintenance, and audit — with role-based access control enforced at every layer.

---

## 🚀 Live Demo

You can test the application live here:  
👉 **[Live Demo on Vercel](https://odoo-asset-flow-roan.vercel.app/login)**

**How to test:**
- Click the **"Try Demo as Guest"** button on the login screen for instant, one-click access.
- You will be logged in as a Guest User with an `EMPLOYEE` role. 
- You can explore the dashboard, view assets, and make test bookings, but administrative features (like deleting assets or org setup) are securely locked down.

---

## 💡 Problem Statement

Organisations lose significant productivity because physical assets (laptops, projectors, lab equipment, vehicles) are tracked in spreadsheets or not tracked at all. The result: double-allocations, ghost assets, no accountability, and reactive (rather than scheduled) maintenance.

AssetFlow solves this with a structured, auditable asset lifecycle:

```text
Register → Allocate → Transfer → Return → Maintain → Retire
```

---

## ✨ Features

| Feature                            | Details                                                                                                                                                                                         |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Role-Based Access Control**      | 4 roles: `ADMIN`, `ASSET_MANAGER`, `DEPARTMENT_HEAD`, `EMPLOYEE`. Enforced in middleware, API routes, and UI.                                                                                   |
| **Enterprise Security**            | Passwords hashed via `bcrypt`, secure JWT sessions, HTTP-only cookies, Edge middleware route protection, and disabled public sign-ups.                                                          |
| **Org Setup**                      | Department CRUD, Asset Category CRUD, Employee directory with role promotion — Admin only.                                                                                                      |
| **Asset Registry**                 | Create assets with auto-generated tags (`AF-0001`), filter by category / status / search.                                                                                                       |
| **Allocation with Conflict Guard** | Once an asset is allocated, direct re-allocation is blocked by design — the UI replaces the allocate action with "Return" and "Request Transfer" instead, preventing double-allocation entirely. |
| **Transfer Requests**              | Any user can request a transfer; `ASSET_MANAGER`/`ADMIN` approve or reject; approval closes the old allocation and opens a new one in a single DB transaction.                                  |
| **Resource Booking**               | Time-based reservations with strict server-side overlap validation — a conflicting request is rejected with the exact holder and time window of the clash.                                      |
| **Maintenance Workflow**           | Priority-based issue reporting. Approvals automatically flip the asset status to `UNDER_MAINTENANCE`.                                                                                           |
| **Dashboard KPIs & Feed**          | Real-time asset counts by status, dynamic overdue allocation alerts, and a live activity feed tracking lifecycle events.                                                                        |
| **Asset Audits**                   | Structured audit cycles with assigned auditors; closing a cycle flags missing items and updates asset status automatically.                                                                     |

---

## 🛠️ Tech Stack

| Layer             | Choice                               |
| ----------------- | ------------------------------------ |
| **Framework**     | Next.js 16 (App Router)              |
| **Styling**       | Tailwind CSS v4                      |
| **Auth**          | NextAuth v5 (Auth.js) — JWT strategy |
| **Database**      | PostgreSQL (Neon Serverless)         |
| **ORM**           | Prisma 7 with `@prisma/adapter-pg`   |
| **Forms**         | React Hook Form + Zod                |
| **Data fetching** | TanStack Query v5                    |
| **Deployment**    | Vercel Edge Network                  |

---

## 🏗️ Local Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database (Local or Neon)

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Create a `.env` file at the root of the project:
```env
DATABASE_URL="postgresql://<user>:<password>@<host>/<db>?sslmode=require"
AUTH_SECRET="<your-random-32-character-secret>"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Run migrations and seed data
Push the Prisma schema to your database and generate the client:
```bash
npx prisma db push
npx prisma generate
```
Seed the database with initial categories, departments, and demo users:
```bash
npx prisma db seed
```

### 4. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Authentication & Roles
If running locally, the `seed.js` script creates the following demo accounts (all passwords: `password123`):

| Role            | Email                    |
| --------------- | ------------------------ |
| Admin           | `admin@assetflow.com`    |
| Asset Manager   | `manager@assetflow.com`  |
| Department Head | `depthead@assetflow.com` |
| Employee        | `priya@assetflow.com`    |
| Guest User      | `guest@assetflow.com`    |

> **Note**: Public sign-up is disabled for enterprise security. New users must be created by an Administrator via the Org Setup panel.

---

## 👨‍💻 Author
**Mohit** — Solo participant (Odoo Hackathon 2026)
