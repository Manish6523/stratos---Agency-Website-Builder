# STRATOS - Comprehensive Project Documentation

**Version:** 1.2.0 (Beta)
**Last Updated:** 2026-02-24
**Purpose:** Primary reference for Claude Code - AI-optimized project documentation

---

## Table of Contents

1. [Project Overview & Purpose](#1-project-overview--purpose)
2. [Quick Start Guide](#2-quick-start-guide)
3. [Technology Stack](#3-technology-stack)
4. [Architecture Overview](#4-architecture-overview)
5. [Project Structure](#5-project-structure)
6. [Core Systems & Features](#6-core-systems--features)
7. [Database Schema & Relationships](#7-database-schema--relationships)
8. [Development Progress Timeline](#8-development-progress-timeline)
9. [Key Components & Utilities](#9-key-components--utilities)
10. [Development Patterns & Conventions](#10-development-patterns--conventions)
11. [Configuration & Environment](#11-configuration--environment)
12. [Common Tasks & Critical Paths](#12-common-tasks--critical-paths)
13. [Future Features & Roadmap](#13-future-features--roadmap)
14. [References](#14-references)

---

## 1. Project Overview & Purpose

**Stratos** is a multi-tenant SaaS platform designed for digital agencies to manage clients, projects, and marketing automation workflows. It provides white-labeling capabilities, team collaboration features, and comprehensive CRM functionality.

### Core Purpose
- **Agency Management:** Create and manage digital agencies with team members and permissions.
- **Client Isolation:** Separate subaccounts for each client with independent resources.
- **CRM & Pipeline Management:** Drag-and-drop Kanban boards for sales and project tracking.
- **Marketing Automation:** Build funnels, landing pages, and automated workflows.
- **Billing & Subscriptions:** Razorpay-powered subscription management with an open-access model.

### Key Capabilities (Current - Version 1.2.0)
✅ User authentication and authorization (Clerk)
✅ Multi-tenant agency and subaccount management
✅ Role-based access control (RBAC) with granular permissions
✅ Team invitation system with email flows
✅ Media management system (UploadThing) with searchable grid UI
✅ Agency Analytics Dashboard (Tremor Charts)
✅ Pipeline & Kanban Board (react-beautiful-dnd)
✅ Ticket & Tag Management with customer assignment
✅ Contact Management System with total value tracking
✅ Funnel Builder foundation with custom subdomains
✅ Razorpay Payment Integration (INR support)
✅ Open-Access Billing pivot for frictionless onboarding
✅ Dynamic Navigation Headers in global InfoBar
✅ Modern Theme System (Hydration-safe ModeToggle)

---

## 2. Quick Start Guide

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm, yarn, or bun package manager
- MariaDB 10.11+ (Optimized for 127.0.0.1 connectivity)
- Clerk account (Authentication)
- UploadThing account (File storage)
- Razorpay account (Payment processing)

### Installation Steps

```bash
# 1. Clone repository
cd /home/manish/codes/work/stratos

# 2. Install dependencies
bun install # or npm install

# 3. Set up environment variables (copy from .env.example)

# 4. Set up database
npx prisma generate
npx prisma migrate dev

# 5. Start development server
npm run dev
```

---

## 3. Technology Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15+ | React framework with App Router |
| React | 19 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Utility-first styling |
| Shadcn/UI | Latest | Component library |
| TanStack Table | 8.x | Data tables |
| react-beautiful-dnd | 13.x | Drag & drop Kanban |
| Tremor Charts | 3.x | Data visualization |

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Prisma | 7.x | ORM (Modular client structure) |
| MariaDB | 10.11+ | Relational database |
| Clerk | 6.x | Authentication |
| UploadThing | 7.x | File storage |
| Razorpay | 2.x | Payment gateway (INR Support) |

---

## 4. Architecture Overview

### Core Architectural Patterns

**1. Multi-Tenancy & Routing**
- **Middleware (`src/proxy.ts`):** Handles subdomain rewriting (`agency.app.com` -> `/[domain]`) and route protection.
- **RBAC:** Roles enforced via `getAuthUserDetails` and middleware metadata checks.

**2. Server Actions & Data Fetching**
- **Modular Queries:** Centralized in `src/lib/queries.ts`.
- **Serialization Fixes:** Critical conversion of Prisma `Decimal` to `number` in server actions to prevent Next.js serialization errors.

**3. Open-Access Billing Architecture**
- Shifted from "Subscription Required" to "Open-Access Platform" to reduce friction.
- Agency data defaults to `COMMUNITY_USER` for unified access.

---

## 6. Core Systems & Features

### 6.1 Pipeline & Kanban System
- **Drag-and-Drop:** Powered by `react-beautiful-dnd`.
- **Lanes & Tickets:** Dynamic ordering with batch updates via Prisma transactions.
- **Financial Tracking:** Real-time lane value calculation based on ticket "Value" field.

### 6.2 Ticket & Tag Management
- **Tag Creator:** Inline creation with 5-color categorization (BLUE, ORANGE, ROSE, GREEN, PURPLE).
- **Customer Assignment:** Searchable contact dropdown with debounced autocomplete.
- **Team Delegation:** Assign tickets to specific subaccount members.

### 6.3 Funnel Management
- **Subdomain Routing:** Custom subdomains for marketing funnels.
- **Editor Routing:** Nested structure: `/funnels/[funnelId]/editor/[funnelPageId]`.
- **Content Storage:** JSON-based structure in `FunnelPage.content` prepared for drag-and-drop builder.

### 6.4 Payment Infrastructure (Razorpay)
- **INR Support:** Optimized for Indian markets (₹19,900/month Unlimited SaaS).
- **Localized Pricing:** Semantic plan IDs (`plan_unlimited_saas`, `plan_basic`) mapped to Razorpay orders.

---

## 8. Development Progress Timeline

| Day | Date | Focus Area | Key Achievements |
|-----|------|------------|------------------|
| **Day 1-8** | Jan-Feb | Foundation | Auth, Agency/Subaccount CRUD, Team Management, Media system. |
| **Day 9** | Feb 14 | Analytics | Agency Analytics Dashboard, complete Media CRUD, Launchpad. |
| **Day 10** | Feb 15 | Kanban | Pipeline & Kanban board with drag-and-drop. |
| **Day 11** | Feb 16 | Tickets | Ticket & Tag management, debounced contact search. |
| **Day 12** | Feb 17 | Funnels | Funnel system, favicon upload, code quality polish. |
| **Day 13** | Feb 18 | Serialization | Subaccount settings, Prisma Decimal serialization fix. |
| **Day 14** | Feb 19 | Contacts | Contact Management System with total value tracking. |
| **Day 15** | Feb 22 | Razorpay | Razorpay integration, INR pricing support, SDK setup. |
| **Day 16** | Feb 23 | Billing | Open-Access Billing pivot, Dynamic navigation UI. |
| **Day 17** | Feb 23 | Infrastructure| Prisma modular client fixes, simplified agency onboarding. |
| **Day 18** | Feb 24 | Funnel Editor | Funnel list view, Editor routing, hydration-safe theme switcher. |

---

## 9. Key Components & Utilities

### 9.1 Critical Server Actions (`src/lib/queries.ts`)
- `upsertTicket()`: Converts Decimal to Number for serialization.
- `upsertFunnel()`: Centralized metadata management.
- `getAgencySubscription()`: Fetches Razorpay metadata.
- `getFunnels()`: Includes nested pages for the editor.

### 9.2 Custom Utilities (`src/lib/types.ts`)
- **`PromiseReturnType<T>`**: Custom generic to infer return types from server actions.
- **`FunnelDetailsValidator`**: Zod schema shared between frontend and backend.

### 9.3 UI Refinements
- **`ModeToggle`**: Hydration-safe icon button using a `mounted` state check.
- **`InfoBar`**: Dynamic headers using `usePathname` to improve user orientation.

---

**Last Major Update:** Day 18 - Funnel Management Expansion Complete

---

**End of Documentation**
