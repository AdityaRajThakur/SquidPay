# Payment Platform Monorepo

A scalable payment platform built using Turborepo, containing multiple applications and shared packages for code reuse, centralized state management, and database access.
Using CI/CD workflow
---

# Monorepo Structure

```bash
.
├── apps
│   ├── merchant-app
│   ├── user-app
│   └── web-hook
│
├── packages
│   ├── db
│   ├── store
│   └── ui
│
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

---

# Apps

## merchant-app

Merchant dashboard application used by merchants to:

- Manage payments
- View transactions
- Monitor business activity
- Handle merchant operations

---

## user-app

User-facing application where customers can:

- Make payments
- Manage accounts
- View transaction history
- Interact with the platform

---

## web-hook

Webhook service responsible for:

- Handling payment gateway callbacks
- Processing asynchronous events
- Managing background workflows
- Verifying payment status updates

---

# Packages

## @repo/db

Shared database package containing:

- Prisma schema
- Prisma client
- Database utilities
- Shared database configuration

---

## @repo/ui

Reusable React component library shared across:

- merchant-app
- user-app

Includes:

- Buttons
- Inputs
- Modals
- Layouts
- Shared UI components

---

## @repo/store

Shared Recoil state management package containing:

- Recoil atoms
- Selectors
- Shared global state

Used across:

- merchant-app
- user-app

---

# Tech Stack

- Turborepo
- Next.js
- TypeScript
- Prisma
- Recoil
- pnpm
- ESLint
- Prettier

---

# Utilities

This monorepo includes the following tooling:

- TypeScript for static type checking
- ESLint for linting
- Prettier for formatting
- Turborepo for monorepo build orchestration
- Prisma ORM for database management

---

# Installation

Clone the repository:

```bash
git clone https://github.com/AdityaRajThakur/SquidPay.git
```

Move into the project directory:

```bash
cd SquidPay
```

Install dependencies:

```bash
pnpm install
```

---

# Development

Run all applications in development mode:

```bash
pnpm dev
```

---

# Build

Build all apps and packages:

```bash
pnpm build
```

---

# Running Individual Apps

## Run merchant-app

```bash
pnpm --filter merchant-app dev
```

## Run user-app

```bash
pnpm --filter user-app dev
```

## Run web-hook

```bash
pnpm --filter web-hook dev
```

---

# Remote Caching

Turborepo supports Remote Caching for faster builds across teams and CI/CD pipelines.

Login to Turborepo:

```bash
npx turbo login
```

Link the repository:

```bash
npx turbo link
```

Learn more:

- https://turbo.build/repo/docs/core-concepts/remote-caching

---

# Useful Links

## Turborepo

https://turbo.build/repo/docs

## Prisma

https://www.prisma.io/docs

## Next.js

https://nextjs.org/docs

## TypeScript

https://www.typescriptlang.org/docs

## pnpm

https://pnpm.io
