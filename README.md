# Stratos - Agency SaaS Platform

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=flat-square&logo=tailwindcss)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange?style=flat-square&logo=mysql)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Alpha%20v0.5-yellow?style=flat-square)

A powerful, full-stack SaaS platform for digital agencies to manage clients, teams, and marketing automation. Built with modern web technologies and enterprise-grade architecture.

---

## 🎯 Overview

Stratos helps digital agencies:
- **Manage Multiple Clients** with isolated subaccounts
- **Collaborate with Teams** using role-based permissions
- **Build Marketing Funnels** with visual editor
- **Automate Workflows** with trigger-based automation
- **Track Deals & Contacts** with built-in CRM
- **White-label for Brands** with custom domains

---

## ✨ Key Features

### 🏢 Agency Management
- ✅ Multi-tenant architecture with client isolation
- ✅ Team invitations and role-based access control
- ✅ White-label customization (logos, colors, domains)
- ✅ Activity audit trail and notifications
- ✅ Billing and subscription management

### 👥 Team Collaboration
- ✅ 4 role types (Owner, Admin, User, Guest)
- ✅ Email-based team invitations
- ✅ Permission management per subaccount
- ✅ Real-time notification center
- ✅ Team member activity tracking

### 💼 Client Management
- ✅ Independent subaccount creation
- ✅ Auto-initialized pipelines and resources
- ✅ Custom sidebar navigation
- ✅ Media management (logos, assets)
- ✅ Contact and communication history

### 🔄 Workflow Automation
- ✅ Database models ready (Trigger, Automation, Action)
- ✅ Webhook-based triggers
- ✅ Action chaining and sequences
- ✅ Automation instance tracking
- ⏳ UI builder (planned)

### 📊 CRM Features
- ✅ Pipeline and lane management
- ✅ Kanban-style ticket tracking
- ✅ Contact database
- ✅ Tag-based organization
- ⏳ Drag-and-drop UI (planned)

### 📄 Funnel Builder
- ✅ Multi-page funnel creation
- ✅ Landing page templates
- ✅ CSS class management
- ⏳ Visual editor (planned)
- ⏳ Analytics dashboard (planned)

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework with Server Components |
| **React 19** | UI library with latest hooks |
| **TypeScript 5** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **Shadcn/UI** | Accessible component library |
| **React Hook Form** | Efficient form management |
| **Zod** | Runtime schema validation |
| **TanStack Table** | Headless table component |
| **Recharts** | React charting library |

### Backend & Data
| Technology | Purpose |
|---|---|
| **Prisma 7** | Type-safe ORM |
| **MySQL 8 / MariaDB** | Relational database |
| **Clerk** | Authentication & user management |
| **UploadThing** | File upload & storage |

### Tools & Services
| Technology | Purpose |
|---|---|
| **Sonner** | Toast notifications |
| **Lucide Icons** | Icon library |
| **next-themes** | Dark/light mode |
| **Stripe** | Payment processing (ready) |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ (LTS recommended)
- **npm** or yarn
- **MySQL 8.0+** or **MariaDB 10.11+**
- **Clerk Account** (free at [clerk.com](https://clerk.com))
- **UploadThing Account** (free at [uploadthing.com](https://uploadthing.com))

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/Manish6523/stratos---Agency-Website-Builder.git
cd stratos
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Environment**
```bash
cp .env.example .env.local
```

Update `.env.local`:
```env
# Authentication (from Clerk dashboard)
CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

# Database
DATABASE_URL=mysql://user:password@localhost:3306/stratos

# File Upload (from UploadThing)
UPLOADTHING_TOKEN=sk_live_xxx

# Domain
NEXT_PUBLIC_DOMAIN=localhost:3000
```

4. **Setup Database**
```bash
npx prisma generate
npx prisma migrate dev
```

5. **Start Development Server**
```bash
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)**

---

## 📁 Project Structure

```
stratos/
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (main)/               # Protected routes
│   │   │   ├── agency/           # Agency dashboard
│   │   │   │   └── [agencyId]/
│   │   │   │       ├── settings/
│   │   │   │       ├── team/
│   │   │   │       └── all-subaccounts/
│   │   │   └── subaccount/       # Client dashboards
│   │   │       └── [subaccountId]/
│   │   ├── site/                 # Public marketing site
│   │   └── api/                  # API routes
│   ├── components/
│   │   ├── global/               # App-wide components
│   │   ├── forms/                # Form components (Agency, User, etc.)
│   │   ├── sidebar/              # Navigation components
│   │   └── ui/                   # Shadcn/UI components
│   ├── lib/
│   │   ├── queries.ts            # ⭐ All server actions (646 lines)
│   │   ├── db.ts                 # Prisma client singleton
│   │   ├── types.ts              # Extended TypeScript types
│   │   ├── utils.ts              # Helper functions
│   │   ├── constants.ts          # App constants
│   │   └── uploadthing.ts        # File upload config
│   ├── providers/                # React Context
│   │   ├── ModalProvider.tsx     # Global modal state
│   │   └── ThemeProvider.tsx     # Dark/light mode
│   └── proxy.ts                  # Auth middleware
├── prisma/
│   ├── schema.prisma             # Database schema (23 models)
│   └── migrations/               # Migration history
├── public/                       # Static assets
└── project_docs/                 # Documentation

⭐ = Critical files to understand the system
```

---

## 🎯 Core Concepts

### Multi-Tenant Architecture
```
Agency (Root Tenant)
├── Team Members & Invitations
├── Billing & Subscription
└── SubAccounts (Client Isolation)
    ├── SubAccount A
    │   ├── Pipelines → Lanes → Tickets
    │   ├── Contacts
    │   ├── Funnels → Pages
    │   └── Media
    └── SubAccount B
        ├── Pipelines
        ├── Contacts
        └── Funnels
```

### Role-Based Access Control
```
AGENCY_OWNER    → Full agency control
    ↓
AGENCY_ADMIN    → Manage team & subaccounts
    ↓
SUBACCOUNT_USER → Full subaccount access
    ↓
SUBACCOUNT_GUEST → Read-only access
```

### Server Actions Pattern
All backend operations centralized in `/src/lib/queries.ts`:

```typescript
// Direct import and usage in client components
import { upsertAgency, getAuthUserDetails } from '@/lib/queries'

const user = await getAuthUserDetails()
const agency = await upsertAgency(formData)
```

---

## 💻 Usage Examples

### Get Current User
```typescript
import { getAuthUserDetails } from '@/lib/queries'

const authUser = await getAuthUserDetails()
// Returns: User with Agency, Permissions, Notifications
```

### Create Agency
```typescript
import { upsertAgency } from '@/lib/queries'

const agency = await upsertAgency({
  name: 'My Digital Agency',
  email: 'hello@agency.com',
  phone: '+1-234-567-8900',
  companyEmail: 'company@agency.com',
  address: '123 Business St',
  city: 'San Francisco',
  state: 'CA',
  zipCode: '94105',
  country: 'USA',
  agencyLogo: 'https://url.com/logo.png',
  whiteLabel: true,
  goal: 1000 // monthly revenue goal
})
```

### Create Subaccount (Auto-initializes)
```typescript
import { upsertSubAccount } from '@/lib/queries'

const subaccount = await upsertSubAccount({
  agencyId: 'agency-uuid',
  name: 'Client Company',
  companyEmail: 'contact@client.com',
  subAccountLogo: 'https://url.com/logo.png',
  address: '456 Client Ave',
  // Automatically creates:
  // - Default pipeline with 5 lanes
  // - Creator gets SUBACCOUNT_USER permission
  // - Activity notification
})
```

### Send Team Invitation
```typescript
import { sendInvitation } from '@/lib/queries'

const invitation = await sendInvitation({
  email: 'teammate@example.com',
  agencyId: 'agency-uuid',
  role: 'AGENCY_ADMIN'
  // Auto-sends email with acceptance link
})
```

### Log Activity
```typescript
import { saveActivityLogsNotification } from '@/lib/queries'

await saveActivityLogsNotification({
  agencyId: 'agency-uuid',
  subaccountId: 'subaccount-uuid', // optional
  description: 'User created new funnel | Sales Funnel v2'
})
```

### Upload Media
```typescript
import { createMedia } from '@/lib/queries'

const media = await createMedia({
  name: 'Company Logo',
  link: 'https://uploadthing.com/file.png',
  type: 'image',
  subAccountId: 'subaccount-uuid'
})
```

---

## 🗄️ Database Schema

**23 Models** organized by domain:

### Authentication & Authorization
- `User` - User accounts (synced from Clerk)
- `Permissions` - User-SubAccount access matrix
- `Invitation` - Team invite tracking (PENDING, ACCEPTED, REVOKED)

### Core Business
- `Agency` - Tenant root (owner, settings, branding)
- `SubAccount` - Client isolation (1:Many with Agency)

### CRM System
- `Pipeline` - Deal tracking stages
- `Lane` - Pipeline sections (Lead, Contacted, etc.)
- `Ticket` - Individual deals/tasks
- `Contact` - CRM contacts
- `Tag` - Custom categorization

### Marketing Automation
- `Funnel` - Landing page sequences
- `FunnelPage` - Individual funnel pages
- `Automation` - Workflow definitions
- `Trigger` - Workflow triggers (form submission, etc.)
- `Action` - Automation actions (create contact, etc.)
- `AutomationInstance` - Automation execution records

### Supporting Models
- `Media` - File storage records
- `Notification` - Activity logs
- `Subscription` - Billing (ready for Stripe)
- `AddOns` - Subscription add-ons
- `AgencySidebarOption` - Navigation items
- `SubAccountSidebarOption` - Navigation items
- `ClassName` - CSS class storage (for pages)

**View full schema:** [prisma/schema.prisma](./prisma/schema.prisma)

---

## ⚙️ Available Commands

```bash
# Development & Building
npm run dev              # Start development server
npm run build            # Create production build
npm run start            # Run production server
npm run lint             # Run ESLint

# Database Management
npx prisma generate              # Regenerate Prisma client
npx prisma migrate dev            # Create and apply migration
npx prisma migrate dev --name xyz # Named migration
npx prisma studio                 # Open database GUI (localhost:5555)
npx prisma db push                # Push schema to DB (dev only)
npx prisma db seed                # Run seed script
npx prisma migrate reset           # Reset database (DESTRUCTIVE!)
```

---

## 🔐 Security Features

✅ **Authentication**
- Clerk OAuth & email/password authentication
- Session management with Clerk middleware
- Automatic user sync to database

✅ **Authorization**
- Role-based access control (4 roles)
- Route protection via middleware
- Data-level permission checks
- Subaccount access verification

✅ **Data Validation**
- Zod schema validation on all forms
- Type-safe database queries with Prisma
- Server-side validation
- Input sanitization

✅ **Audit Trail**
- Activity notifications for important actions
- User attribution on all changes
- Timestamps on all records
- Complete notification history

---

## 📱 Responsive Design

Built with **Tailwind CSS** for optimal experience on:
- 📱 Mobile (320px - 767px)
- 📱 Tablet (768px - 1024px)  
- 🖥️ Desktop (1025px+)

Features:
- Dark/light mode toggle
- Mobile-optimized navigation
- Touch-friendly interfaces
- Fast, optimized loading

---

## 📚 Key Files

| File | Lines | Purpose |
|------|-------|---------|
| **src/lib/queries.ts** | 646 | All server actions & business logic |
| **prisma/schema.prisma** | 500+ | Complete database schema |
| **src/proxy.ts** | 150 | Authentication & routing middleware |
| **src/providers/ModalProvider.tsx** | 80 | Global modal state management |
| **src/components/sidebar/index.tsx** | 200 | Dynamic navigation component |
| **src/components/global/InfoBar.tsx** | 150 | Notification center component |

---

## 🗺️ Roadmap

### Phase 2 - CRM Implementation ⏳
- [ ] Kanban board with drag-and-drop (dnd-kit)
- [ ] Contact management UI
- [ ] Pipeline analytics
- [ ] Ticket assignment system

### Phase 3 - Funnel Builder ⏳
- [ ] Visual page editor (GrapesJS)
- [ ] Component library
- [ ] Template gallery
- [ ] Preview & publishing
- [ ] Form analytics

### Phase 4 - Automation Engine ⏳
- [ ] Workflow builder UI
- [ ] Trigger configuration
- [ ] Action chaining
- [ ] Email sequences
- [ ] Webhook integration

### Phase 5 - Advanced Features ⏳
- [ ] Stripe billing integration
- [ ] Advanced analytics dashboard
- [ ] API for external tools
- [ ] Subdomain white-labeling
- [ ] Custom domain support

---

## 🤝 Contributing

Contributions are welcome! Please:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 🐛 Troubleshooting

### Prisma Client Error
```bash
npx prisma generate
```

### Database Connection Failed
- Check `DATABASE_URL` in `.env.local`
- Ensure MySQL/MariaDB is running
- Verify credentials are correct

### File Upload Not Working
- Verify `UPLOADTHING_TOKEN` is set
- Check image domains in `next.config.ts`
- Confirm UploadThing account is active

### Authentication Issues
- Verify Clerk keys in `.env.local`
- Check Clerk dashboard for configuration
- Clear browser cookies and retry

### Build Errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

---

## 📖 Documentation

- **[Full Documentation](./project_docs/documentation.md)** - Comprehensive guide
- **[Database Schema](./project_docs/tables.md)** - Detailed table definitions
- **[Development Timeline](./project_docs/dayTitle.md)** - Progress tracking
- **[Daily Logs](./project_docs/day/)** - Detailed implementation notes

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Clerk](https://clerk.com) - Excellent authentication platform
- [UploadThing](https://uploadthing.com) - Simple file uploads
- [Shadcn/UI](https://ui.shadcn.com) - Beautiful component library
- [Prisma](https://prisma.io) - Type-safe database toolkit
- [Next.js](https://nextjs.org) - The React framework

---

## 📞 Support & Contact

- 📧 Email: [GitHub Issues](https://github.com/Manish6523/stratos---Agency-Website-Builder/issues)
- 📚 Docs: See documentation folder
- 🐛 Bug Reports: [Create an issue](https://github.com/Manish6523/stratos---Agency-Website-Builder/issues/new)

---

<div align="center">

### Made with ❤️ by [Manish](https://github.com/Manish6523)

⭐ Star us on GitHub — it helps!

[⬆ Back to top](#stratos---agency-saas-platform)

</div>