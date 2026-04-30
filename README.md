<p align="center">
  <img src="public/assets/stratos-logo.svg" alt="Stratos Logo" width="60" />
  <h1 align="center">Stratos</h1>
  <p align="center">
    <strong>AI-Powered Agency Website Builder & Management Platform</strong>
  </p>
  <p align="center">Build websites with AI. Manage clients. Track leads. Process payments. All in one dashboard.</p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-7.3-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Gemini_AI-Integrated-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square" alt="PRs Welcome" />
  <img src="https://img.shields.io/badge/Models-26-purple?style=flat-square" alt="Models" />
  <img src="https://img.shields.io/badge/Files-282+-blue?style=flat-square" alt="Files" />
</p>

<p align="center">
  <img src="public/assets/preview.png" alt="Stratos Dashboard Preview" width="800" />
</p>

---

## ⚡ What is Stratos?

Stratos is a **full-stack, multi-tenant SaaS platform** that gives digital agencies everything they need in a single dashboard — a visual drag-and-drop website builder with **AI-powered content generation**, a Kanban CRM for lead tracking, Razorpay payment processing in INR, team collaboration with email invitations, and live domain hosting with analytics.

### Why Stratos?

- 🇮🇳 **Built for Indian agencies** — INR pricing (₹999/₹2,999/mo) via Razorpay, not USD
- 🤖 **AI-first builder** — Google Gemini generates copy, layouts, and full page sections from text prompts
- 🎨 **7 built-in themes** — Cyberpunk 2077, Claude, Brutalist, Kodama Grove, and more
- 🏗️ **Self-hostable** — MIT licensed, run on your own infrastructure
- 🔒 **Enterprise-grade auth** — Clerk with 4-tier RBAC, email invitations, and permission provisioning

---

## ✨ Features

### 🏢 Multi-Tenant Agency System
- Agency & subaccount architecture with complete data isolation
- White-label branding with custom logos per agency
- Automated default setup (pipeline, sidebar, permissions) on subaccount creation
- 4-tier RBAC: Agency Owner → Agency Admin → Subaccount User → Guest

### 🎨 Visual Drag-and-Drop Page Builder
- Custom recursive rendering engine converting nested JSON to live React components
- Geometry-based positional reordering using `getBoundingClientRect`
- 15+ draggable components: Text, Container, Image, Video, Button, Link, 2-Column, Slider, Testimonial, Progress Bar, Icon Block, Contact Form, Custom Form, Checkout, Divider
- Dual-panel sidebar: element palette + deep style inspector (Webflow-style density)
- Device viewport simulation: Desktop, Tablet, Mobile
- Undo/Redo history stack via custom `useReducer` state machine
- Sidebar toggle for full-width canvas focus mode

### 🤖 AI-Powered Builder (Google Gemini)
- **Text Generator** — Context-aware copy generation based on element type (testimonials, CTAs, headings)
- **Layout Generator** — Natural language prompts → schema-compliant JSON page sections
- **Prompt Enhancer** — Transforms 1-line descriptions into detailed 3-paragraph atmospheric instructions
- **Example Library** — 7 pre-made prompts (Hero Section, Pricing Cards, Testimonials, Full Landing Page, etc.)
- Feature-gated behind paid subscription tiers

### 🎭 7-Theme Engine
- Portfolio, Cyberpunk 2077, Claude, Dark Matter, Kodama Grove, MX-Brutalist, Notebook
- Each theme has independent light/dark mode variants
- Flash-free restoration via inline `<script>` reading `localStorage` before first paint
- Custom fonts per theme (Inter, Chakra Petch, Outfit, Geist Mono, Merriweather, Montserrat, Architects Daughter)

### 📊 Kanban CRM Pipeline
- Drag-and-drop lanes & tickets with `react-beautiful-dnd`
- Financial value tracking per ticket with lane totals in INR
- Customer assignment with debounced search
- 5-color tag system with inline creation
- Contact management with total value tracking and status badges

### 💳 Razorpay Billing
- Three-tier plan system: Starter (Free) / Basic (₹999) / Unlimited (₹2,999)
- Dynamic checkout modal with HMAC-SHA256 webhook verification
- Payment history dashboard with color-coded status badges
- Subscription feature gating with upgrade overlays
- Funnel-level checkout component for one-time payments

### 👥 Team Collaboration
- Email invitations via Resend with styled HTML templates
- Token-based verification with automated Clerk auth redirect
- Subaccount-scoped role assignment during invitation
- Atomic permission provisioning via `db.$transaction`
- TanStack Table for team listing with inline actions

### 📄 Template Library
- 6+ full-page templates across 4 categories: Portfolio, E-commerce, Landing Page, Miscellaneous
- Graphical previews in editor sidebar via `next/image`
- One-click replace or append to existing page content
- Templates: Professional Portfolio, Creative Portfolio, Neo-Brutalism, Modern Commerce, Streetwear, Standard Landing Page

### 💻 Developer Tooling
- **Monaco Code Editor** — Raw JSON component editing with syntax highlighting
- **Live Preview** — Split-pane real-time visual rendering as you type
- **HTML Export** — One-click static HTML download via `/api/export-html`
- **Code Route** — Dedicated `/code/` sub-route in the funnel builder

### 🔄 Automations & Form Builder
- Dual-tab dashboard: Submissions tracking + Form Builder
- Live metrics: Total Submissions, Today's Count, Unique Contacts, Published Forms
- Dynamic form creation with drag-and-drop fields
- Publish/draft toggles, payload-to-label mapping
- `CustomFormComponent` bound to visual editor with real-time form selection

### 🌐 Live Domain Hosting
- Public funnel rendering on custom subdomains
- Automatic visitor tracking with `visits` increment
- SEO metadata: custom page titles, dynamic favicons
- High-performance server-side rendering
- Hydration-resilient against browser extension interference

### 📁 Media Management
- UploadThing-powered asset library with CDN delivery
- Searchable media bucket with card UI
- Hover effects with gradient overlays
- Copy-to-clipboard URL sharing
- Integrated into editor sidebar for in-context asset selection

---

## 🛠️ Tech Stack

### Core

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16 | App Router, Server Components, Server Actions |
| [React](https://react.dev) | 19 | UI rendering |
| [TypeScript](https://typescriptlang.org) | 5.x | End-to-end type safety |
| [Prisma](https://prisma.io) | 7.3 | ORM with 26 models, cascade deletes |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Utility-first styling with CSS-scoped themes |

### Services & Integrations

| Technology | Purpose |
|---|---|
| [Clerk](https://clerk.com) | Authentication, OAuth, RBAC, middleware |
| [Razorpay](https://razorpay.com) | INR payment processing, webhooks, subscriptions |
| [Google Gemini](https://ai.google.dev) | AI text generation & layout building |
| [UploadThing](https://uploadthing.com) | File upload & CDN storage |
| [Resend](https://resend.com) | Transactional email delivery |
| [Monaco Editor](https://microsoft.github.io/monaco-editor) | In-browser code editing |

### UI & State

| Technology | Purpose |
|---|---|
| [Shadcn/UI](https://ui.shadcn.com) | 50+ accessible component primitives |
| [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) | Kanban drag-and-drop |
| [Tremor](https://tremor.so) | Analytics chart components |
| [Lucide](https://lucide.dev) | Icon library |
| React Context + useReducer | Editor state machine with undo/redo |
| [Zod](https://zod.dev) + [React Hook Form](https://react-hook-form.com) | Validation & form management |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** or **Bun** runtime
- **MariaDB 10.11+** or **MySQL 8.0+**
- [Clerk](https://clerk.com) account
- [UploadThing](https://uploadthing.com) account

### Installation

```bash
# Clone
git clone https://github.com/Manish6523/stratos---Agency-Website-Builder.git
cd stratos---Agency-Website-Builder

# Install
bun install    # or: npm install

# Environment
cp .env.example .env
```

Configure `.env`:

```env
# Auth (Clerk)
CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

# Database
DATABASE_URL=mysql://root:root@127.0.0.1:3306/stratos

# File Upload
UPLOADTHING_TOKEN=sk_live_xxx

# Domain
NEXT_PUBLIC_DOMAIN=localhost:3000
NEXT_PUBLIC_SCHEME=http://

# AI (Google Gemini)
GEMINI_API_KEY=xxx

# Payments (Razorpay)
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx
RAZORPAY_WEBHOOK_SECRET=xxx
```

```bash
# Database setup
npx prisma generate
npx prisma db push

# Run
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) 🚀

---

## 🏗️ Architecture

### Multi-Tenancy Model

```
User (Clerk Auth)
  └── Agency (Tenant Root)
        ├── Team Members & Invitations (Resend Email)
        ├── Billing & Subscription (Razorpay)
        ├── White-label Settings
        ├── Analytics Dashboard (Tremor Charts)
        └── SubAccounts (Client Isolation)
              ├── Pipelines → Lanes → Tickets (Kanban CRM)
              ├── Contacts & Tags
              ├── Funnels → Pages → Visual Editor (AI Builder)
              ├── Media Assets (UploadThing)
              ├── Automations → Forms → Submissions
              └── Independent Permissions
```

### RBAC (4 Tiers)

| Role | Scope | Access |
|---|---|---|
| `AGENCY_OWNER` | Agency-wide | Full control — billing, delete, manage all |
| `AGENCY_ADMIN` | Agency-wide | Manage team, subaccounts, view all |
| `SUBACCOUNT_USER` | Per-subaccount | Full access to assigned subaccounts |
| `SUBACCOUNT_GUEST` | Per-subaccount | Read-only access |

### Editor State Machine

```
EditorProvider (Context + useReducer)
├── editor
│   ├── elements[]          ← Recursive element tree
│   ├── selectedElement     ← Currently selected
│   ├── device              ← Desktop / Mobile / Tablet
│   ├── previewMode / liveMode
│   ├── sidebarOpen
│   └── funnelPageId
└── history
    ├── history[]           ← Immutable state snapshots
    └── currentIndex        ← Pointer for undo/redo
```

**10 reducer actions:** `ADD_ELEMENT`, `UPDATE_ELEMENT`, `DELETE_ELEMENT`, `MOVE_ELEMENT`, `CHANGE_CLICKED_ELEMENT`, `CHANGE_DEVICE`, `TOGGLE_PREVIEW_MODE`, `TOGGLE_LIVE_MODE`, `UNDO`, `REDO`, `LOAD_DATA`, `TOGGLE_SIDEBAR`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (main)/
│   │   ├── agency/[agencyId]/         # Dashboard, settings, team, billing
│   │   └── subaccount/[subaccountId]/ # Pipelines, funnels, contacts, media, automations
│   ├── site/                          # Public marketing site + demo
│   │   └── demo/                      # Interactive builder sandbox
│   ├── api/
│   │   ├── generate-text/             # Gemini AI text generation
│   │   ├── generate-layout/           # Gemini AI layout generation
│   │   ├── export-html/               # Static HTML export
│   │   ├── update-page-content/       # Editor save endpoint
│   │   ├── razorpay/                  # Webhooks, checkout, verification
│   │   └── uploadthing/               # File upload routes
│   ├── [domain]/[path]/               # Live funnel rendering
│   └── verify/                        # Email invitation verification
├── components/
│   ├── forms/                         # 12+ form components
│   ├── global/                        # InfoBar, Modal, TagCreator, ThemePicker
│   ├── media/                         # Media bucket, cards, upload
│   ├── sidebar/                       # Dynamic agency/subaccount navigation
│   └── ui/                            # 50+ Shadcn/UI primitives
├── lib/
│   ├── queries.ts                     # 1400+ lines — all server actions
│   ├── db.ts                          # Prisma client singleton
│   ├── types.ts                       # Extended types + Zod schemas
│   ├── constants.ts                   # Pricing, icons, editor types
│   ├── razorpay/                      # Client, server actions, types
│   ├── send-email.ts                  # Resend email utility
│   └── templates/                     # Page templates (portfolio, ecommerce, landing)
├── providers/
│   ├── editor/                        # Editor state machine + actions
│   ├── ModalProvider.tsx              # Global modal context
│   └── ThemeProvider.tsx              # next-themes wrapper
└── proxy.ts                           # Auth middleware + subdomain routing
```

---

## 🗄️ Database

**26 models** across 6 domains:

| Domain | Models |
|---|---|
| **Auth** | User, Permissions, Invitation |
| **Core** | Agency, SubAccount |
| **CRM** | Pipeline, Lane, Ticket, Contact, Tag |
| **Marketing** | Funnel, FunnelPage, ClassName |
| **Automation** | Trigger, Automation, AutomationInstance, Action, Form, FormField, FormSubmission |
| **Platform** | Media, Notification, Subscription, AddOns, AgencySidebarOption, SubAccountSidebarOption |

All relationships enforce **cascade deletes** — deleting an agency cleanly removes everything underneath.

---

## ⚙️ Commands

```bash
bun run dev                   # Dev server (localhost:3000)
bun run build                 # Production build
bun run start                 # Production server
npx prisma generate           # Regenerate Prisma client
npx prisma db push            # Push schema to database
npx prisma studio             # Database GUI
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

Use `127.0.0.1` instead of `localhost` in `DATABASE_URL` to avoid DNS latency issues.
</details>

<details>
<summary><b>Theme Flash on Load</b></summary>

Ensure `className="theme-portfolio"` is set on the `<html>` tag in `layout.tsx`. The inline script in `<head>` reads `localStorage("theme-flavor")` before first paint.
</details>

<details>
<summary><b>AI Features Not Working</b></summary>

Verify `GEMINI_API_KEY` is set in `.env`. AI features require a Basic plan or above (subscription gated).
</details>

<details>
<summary><b>Razorpay Webhooks Failing</b></summary>

Ensure `RAZORPAY_WEBHOOK_SECRET` matches the secret configured in your Razorpay dashboard. Webhooks validate via HMAC-SHA256.
</details>

---

## 🗺️ Roadmap

- [x] Multi-tenant agency & subaccount system
- [x] Team management with 4-tier RBAC
- [x] Kanban CRM with drag-and-drop pipelines
- [x] Visual drag-and-drop page builder (15+ components)
- [x] AI content & layout generator (Gemini)
- [x] AI Prompt Enhancer with example library
- [x] 7-theme engine with dark/light modes
- [x] Razorpay billing with INR pricing
- [x] Email invitations via Resend
- [x] Template library (6+ templates, 4 categories)
- [x] Monaco code editor with live preview
- [x] Static HTML export
- [x] Live domain hosting with analytics
- [x] SEO metadata (custom titles, favicons)
- [x] Automations dashboard with form builder
- [x] Subscription feature gating
- [x] Media management system
- [x] Contact management with value tracking
- [ ] Webhook integrations for external APIs
- [ ] Advanced per-funnel analytics
- [ ] Custom domain SSL provisioning
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome!

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
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
- [Razorpay](https://razorpay.com) — Payment Processing
- [Google Gemini](https://ai.google.dev) — AI Platform
- [Shadcn/UI](https://ui.shadcn.com) — Component Library
- [UploadThing](https://uploadthing.com) — File Uploads
- [Resend](https://resend.com) — Email Infrastructure
- [Monaco Editor](https://microsoft.github.io/monaco-editor) — Code Editor
- [Tremor](https://tremor.so) — Dashboard Components

---

<div align="center">

**Built with ❤️ by [Manish Sharma](https://github.com/Manish6523)**

⭐ Star this repo if you find it useful!

[⬆ Back to top](#stratos)

</div>
