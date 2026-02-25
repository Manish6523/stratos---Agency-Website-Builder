<p align="center">
  <h1 align="center">⚡ Stratos</h1>
  <p align="center">A multi-tenant SaaS platform for digital agencies to manage clients, teams, pipelines, funnels, and marketing automation — all under one roof.</p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-7.3-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.2.1%20Beta-blue?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/Status-Active%20Development-orange?style=flat-square" alt="Status" />
</p>

---

## 🎯 What is Stratos?

Stratos is a **full-stack agency management platform** built for teams that juggle multiple clients, projects, and marketing workflows. It provides:

- 🏢 **Multi-Tenant Workspaces** — Complete client isolation with independent resources per subaccount
- 📊 **Pipeline & Kanban CRM** — Drag-and-drop deal tracking with financial metrics per lane
- 🎨 **Funnel Builder** — Multi-page marketing funnels with custom subdomains and Stripe/Razorpay integration
- 👥 **Team Collaboration** — Role-based access control with 4 permission tiers and email invitations
- 📁 **Media Management** — Searchable media bucket with upload, copy-to-clipboard, and visual card UI
- 💳 **Open-Access Billing** — Frictionless onboarding with Razorpay subscription management
- 📈 **Agency Analytics** — Dashboard with revenue tracking, client metrics, and Tremor Charts visualization

---

## ✨ Features

### Fully Implemented ✅

| Category                | Features                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| **Authentication**      | Clerk OAuth & email/password, session management, middleware route protection              |
| **Agency Management**   | Create/update agencies, white-label branding, company settings, goal tracking              |
| **Subaccount System**   | Client isolation, auto-initialized pipelines & sidebar, dedicated dashboards               |
| **Team Management**     | TanStack Table for team listing, email invitations, permission management                  |
| **Pipeline & Kanban**   | Drag-and-drop lanes & tickets (react-beautiful-dnd), financial tracking, lane reordering   |
| **Ticket System**       | Customer assignment, team delegation, tag categorization, value tracking, debounced search |
| **Tag Management**      | 5-color tag system (Blue, Orange, Rose, Green, Purple), inline creation                    |
| **Contact Management**  | Customer table with total value tracking, status badges, activity logging                  |
| **Funnel Builder**      | Multi-page funnels, custom subdomains, favicon upload, Stripe/Razorpay product integration |
| **Media System**        | UploadThing integration, searchable bucket, card UI, copy-to-clipboard                     |
| **Analytics Dashboard** | Agency-level metrics with Tremor Charts, revenue visualization                             |
| **Billing**             | Open-access model with Razorpay, multi-currency (INR), subscription management             |
| **Notifications**       | Activity logging, audit trail, real-time notification center in InfoBar                    |
| **Dynamic Navigation**  | Context-aware section headers, dynamic sidebar per agency/subaccount                       |
| **Launchpad**           | Onboarding checklist for new subaccounts (PWA, Stripe, Business Details)                   |

### In Progress ⏳

| Feature              | Status                                                          |
| -------------------- | --------------------------------------------------------------- |
| Visual Page Editor   | JSON content structure ready, drag-and-drop builder planned     |
| Automation Engine    | Database models ready (Trigger, Action, Automation), UI planned |
| Advanced Analytics   | Per-pipeline and per-funnel analytics                           |
| Webhook Integrations | External API support                                            |

---

## 🛠️ Tech Stack

### Core

| Technology                               | Version | Purpose                                             |
| ---------------------------------------- | ------- | --------------------------------------------------- |
| [Next.js](https://nextjs.org)            | 16.1    | React framework with App Router & Server Components |
| [React](https://react.dev)               | 19.2    | UI library                                          |
| [TypeScript](https://typescriptlang.org) | 5.x     | Type-safe development                               |
| [Prisma](https://prisma.io)              | 7.3     | Type-safe ORM with MariaDB adapter                  |
| [Tailwind CSS](https://tailwindcss.com)  | 4.x     | Utility-first styling                               |

### UI & Data

| Technology                                                              | Purpose                                            |
| ----------------------------------------------------------------------- | -------------------------------------------------- |
| [Shadcn/UI](https://ui.shadcn.com)                                      | Accessible component library (Radix UI primitives) |
| [TanStack Table](https://tanstack.com/table)                            | Headless data tables                               |
| [Tremor Charts](https://tremor.so)                                      | Dashboard analytics visualization                  |
| [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) | Drag-and-drop for pipelines & funnels              |
| [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) | Form management & validation                       |
| [Lucide Icons](https://lucide.dev)                                      | Icon library                                       |
| [Sonner](https://sonner.emilkowal.dev)                                  | Toast notifications                                |

### Backend & Services

| Technology                             | Purpose                          |
| -------------------------------------- | -------------------------------- |
| [Clerk](https://clerk.com)             | Authentication & user management |
| [UploadThing](https://uploadthing.com) | File upload & storage            |
| [Razorpay](https://razorpay.com)       | Payment processing (primary)     |
| [Stripe](https://stripe.com)           | Payment processing (secondary)   |
| MariaDB / MySQL                        | Relational database              |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun** runtime
- **MariaDB 10.11+** or **MySQL 8.0+**
- [Clerk](https://clerk.com) account (free tier available)
- [UploadThing](https://uploadthing.com) account (free tier available)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Manish6523/stratos---Agency-Website-Builder.git
cd stratos---Agency-Website-Builder

# 2. Install dependencies
bun install    # or: npm install

# 3. Set up environment variables
cp .env.example .env
```

Configure your `.env` file:

```env
# Authentication (Clerk)
CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

# Database
DATABASE_URL=mysql://root:root@127.0.0.1:3306/stratos

# File Upload (UploadThing)
UPLOADTHING_TOKEN=sk_live_xxx

# Domain
NEXT_PUBLIC_DOMAIN=localhost:3000
NEXT_PUBLIC_SCHEME=http://

# Razorpay (optional)
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx
```

```bash
# 4. Set up database
npx prisma generate
npx prisma migrate dev

# 5. Start the dev server
bun run dev    # or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to get started.

---

## 🏗️ Architecture

### Multi-Tenancy Model

```
User (Clerk Auth)
  └── Agency (Tenant Root)
        ├── Team Members & Invitations
        ├── Billing & Subscription
        ├── White-label Settings
        └── SubAccounts (Client Isolation)
              ├── Pipelines → Lanes → Tickets
              ├── Contacts & Tags
              ├── Funnels → Pages
              ├── Media Assets
              └── Independent Permissions
```

### RBAC (4 Role Types)

| Role               | Scope          | Access Level                                      |
| ------------------ | -------------- | ------------------------------------------------- |
| `AGENCY_OWNER`     | Agency-wide    | Full control — billing, delete agency, manage all |
| `AGENCY_ADMIN`     | Agency-wide    | Manage team, create subaccounts, view all data    |
| `SUBACCOUNT_USER`  | Per-subaccount | Full access to assigned subaccounts               |
| `SUBACCOUNT_GUEST` | Per-subaccount | Read-only or restricted access                    |

### Key Architectural Patterns

1. **Server Actions First** — All DB operations centralized in `src/lib/queries.ts`
2. **Automatic Defaults** — New subaccounts get a default pipeline (5 lanes), sidebar, and creator permissions
3. **Activity Logging** — All important actions create audit trail notifications
4. **Type Safety** — Prisma types + Zod schemas + TypeScript strict mode end-to-end

---

## 📁 Project Structure

```
src/
├── app/                            # Next.js App Router
│   ├── (main)/                     # Authenticated routes
│   │   ├── agency/[agencyId]/      # Agency dashboard, settings, team, billing
│   │   └── subaccount/[subaccountId]/  # Pipelines, funnels, contacts, media
│   ├── site/                       # Public marketing site
│   ├── api/                        # API routes (Razorpay, UploadThing)
│   └── [domain]/                   # Dynamic subdomain routing
├── components/
│   ├── global/                     # InfoBar, CustomModal, FileUpload, Loading
│   ├── forms/                      # AgencyDetails, UserDetails, FunnelPageForm, etc.
│   ├── sidebar/                    # Dynamic navigation (agency/subaccount aware)
│   └── ui/                         # 50+ Shadcn/UI primitives
├── lib/
│   ├── queries.ts                  # ⭐ All server actions & business logic
│   ├── db.ts                       # Prisma client singleton
│   ├── types.ts                    # Extended TypeScript types
│   ├── razorpay/                   # Razorpay client & server actions
│   └── constants.ts                # Pricing plans, icon config
├── providers/
│   ├── ModalProvider.tsx           # Global modal state
│   └── ThemeProvider.tsx           # Dark/light mode
└── proxy.ts                        # ⭐ Auth & routing middleware
```

---

## 🗄️ Database Schema

**23 models** powering a fully relational multi-tenant system:

| Domain            | Models                                                                                              |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| **Auth & Access** | `User`, `Permissions`, `Invitation`                                                                 |
| **Core Business** | `Agency`, `SubAccount`                                                                              |
| **CRM**           | `Pipeline`, `Lane`, `Ticket`, `Contact`, `Tag`                                                      |
| **Marketing**     | `Funnel`, `FunnelPage`, `ClassName`                                                                 |
| **Automation**    | `Trigger`, `Automation`, `Action`, `AutomationInstance`                                             |
| **Platform**      | `Media`, `Notification`, `Subscription`, `AddOns`, `AgencySidebarOption`, `SubAccountSidebarOption` |

All relationships use **cascade deletes** — deleting an agency removes all subaccounts, pipelines, funnels, media, and related data safely.

📄 **Full schema:** [`prisma/schema.prisma`](./prisma/schema.prisma) | **Field-level docs:** [`project_docs/tables.md`](./project_docs/tables.md)

---

## ⚙️ Commands

```bash
# Development
bun run dev                          # Start dev server (localhost:3000)
bun run build                        # Production build
bun run start                        # Run production server
bun run lint                         # ESLint

# Database
npx prisma generate                  # Regenerate Prisma client
npx prisma migrate dev               # Create & apply migration
npx prisma migrate dev --name <name> # Named migration
npx prisma studio                    # Database GUI (localhost:5555)
npx prisma db push                   # Push schema without migration
```

---

## 🐛 Troubleshooting

<details>
<summary><b>Prisma Client Not Found</b></summary>

```bash
npx prisma generate
```

</details>

<details>
<summary><b>Database Connection Failed</b></summary>

- Verify `DATABASE_URL` in `.env` uses `127.0.0.1` (not `localhost` — avoids DNS latency)
- Ensure MySQL/MariaDB is running
- Check credentials
</details>

<details>
<summary><b>File Upload Not Working</b></summary>

- Verify `UPLOADTHING_TOKEN` is set
- Check image domains in `next.config.ts`
- Confirm UploadThing account is active
</details>

<details>
<summary><b>Authentication Issues</b></summary>

- Verify Clerk keys in `.env`
- Check Clerk dashboard configuration
- Clear browser cookies and retry
</details>

<details>
<summary><b>Build or Runtime Errors</b></summary>

```bash
rm -rf .next node_modules
bun install
bun run build
```

</details>

---

## 📚 Documentation

| Document                                            | Description                                   |
| --------------------------------------------------- | --------------------------------------------- |
| [documentation.md](./project_docs/documentation.md) | High-level project reference                  |
| [main-doc.md](./project_docs/main-doc.md)           | Comprehensive technical documentation         |
| [tables.md](./project_docs/tables.md)               | Database schema field-level breakdown         |
| [dayTitle.md](./project_docs/week-01/dayTitle.md)   | Development timeline index                    |
| [week-01/](./project_docs/week-01/)                 | Foundation, auth, agency, team (Days 1–8)     |
| [week-02/](./project_docs/week-02/)                 | CRM, pipelines, funnels, billing (Days 9–16)  |
| [week-03/](./project_docs/week-03/)                 | Infrastructure, DnD, refactoring (Days 17–19) |

---

## 🗺️ Roadmap

- [x] Multi-tenant agency & subaccount system
- [x] Team management with RBAC
- [x] Pipeline & Kanban CRM with drag-and-drop
- [x] Funnel builder with subdomain support
- [x] Media management system
- [x] Contact management with value tracking
- [x] Razorpay billing integration
- [x] Agency analytics dashboard
- [ ] Visual drag-and-drop page editor
- [ ] Automation engine UI (triggers, actions, workflows)
- [ ] Advanced per-funnel analytics
- [ ] Webhook & API integrations
- [ ] Custom domain support for subdomains

---

## 🤝 Contributing

Contributions are welcome!

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) — The React Framework
- [Clerk](https://clerk.com) — Authentication Platform
- [Prisma](https://prisma.io) — Type-safe Database Toolkit
- [Shadcn/UI](https://ui.shadcn.com) — Component Library
- [UploadThing](https://uploadthing.com) — File Uploads
- [Razorpay](https://razorpay.com) — Payment Processing
- [Tremor](https://tremor.so) — Dashboard Components

---

<div align="center">

### Built with ❤️ by [Manish](https://github.com/Manish6523)

⭐ Star this repo if you find it useful!

[⬆ Back to top](#-stratos)

</div>
