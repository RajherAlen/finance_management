# 💰 finance_management — Claude Reference

> A full-stack personal finance tracker built with Next.js, TypeScript, and Prisma.

---

## 🗂️ Project Overview

**finance_management** is a server-rendered web application that lets users track income, expenses, and financial data through a modern interface.

- **Architecture:** Next.js App Router (server-first)
- **Database layer:** Prisma ORM
- **Language:** TypeScript (strict mode)

---

## 🛠️ Tech Stack

| Category       | Tool / Library        |
|----------------|-----------------------|
| Framework      | Next.js (App Router)  |
| Language       | TypeScript (strict)   |
| Runtime        | Node.js v18+          |
| ORM            | Prisma                |
| Database       | See `prisma/schema.prisma` |
| Styling        | Tailwind CSS          |
| Linting        | ESLint                |
| Formatting     | Prettier              |
| Package Mgr    | npm                   |

---

## 📁 Project Structure

```
finance_management/
│
├── app/                # App Router pages & layouts
├── components/         # Reusable UI components
├── prisma/             # Schema & migrations
├── public/             # Static assets
├── styles/             # Global styles
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

### Key Directories

| Directory      | Purpose                                     |
|----------------|---------------------------------------------|
| `app/`         | Route segments, layouts, server components  |
| `components/`  | Shared UI components                        |
| `prisma/`      | Database schema and migrations              |
| `public/`      | Static files (images, icons)                |

---

## ✍️ Code Style

### General Principles

- Use TypeScript strictly — **avoid `any`**
- Prefer **server components** unless client-side interaction is required
- Keep **business logic out of UI components**
- Use **reusable components** instead of duplicating JSX

### Naming Conventions

| Item                 | Convention        | Example               |
|----------------------|-------------------|-----------------------|
| React Components     | `PascalCase`      | `ExpenseCard.tsx`     |
| Variables            | `camelCase`       | `totalIncome`         |
| Functions            | `camelCase`       | `calculateBalance()`  |
| Types / Interfaces   | `PascalCase`      | `User`, `Expense`     |
| Constants            | `UPPER_SNAKE_CASE`| `MAX_LIMIT`           |

### File Organization

- One main component per file
- Group related components in folders
- Keep Prisma queries in **server files only**
- Avoid deeply nested folder structures

### Styling

- Use Tailwind utility classes
- Avoid inline styles
- Extract repeated styles into reusable components
- Keep layout styles in layout files

---

## ⚠️ Gotchas & Common Mistakes

### 1. Never Commit `.env`

Never commit sensitive credentials. Ensure `.env` is in `.gitignore`.

---

### 2. Never Use Prisma in Client Components

Prisma must only run **on the server**.

```tsx
// ❌ Wrong
"use client"
import { prisma } from "@/lib/prisma"

// ✅ Correct — use a server component or API route
```

---

### 3. Regenerate Prisma Client After Schema Changes

```bash
npx prisma generate
```

Run this every time you edit `schema.prisma`.

---

### 4. Avoid `any`

If you must use it temporarily, add a comment explaining why. Prefer proper type definitions in all cases.

---

### 5. Keep Business Logic Out of UI Components

```tsx
// ❌ Bad — logic inside component
const total = expenses.reduce(...)

// ✅ Better — move to a utility, server layer, or service file
```

---

### 6. Tailwind Class Overload

If a component has too many utility classes, either extract it into smaller sub-components or create a reusable styled wrapper.

---

## 🚀 Deployment

**Recommended platform:** [Vercel](https://vercel.com)

### Pre-deploy Checklist

- [ ] Set `DATABASE_URL` environment variable
- [ ] Run Prisma migrations
- [ ] Verify build succeeds locally (`npm run build`)
- [ ] Confirm all env vars are set in the hosting dashboard

---

## 📌 Summary

**finance_management** is a modern TypeScript finance tracker built with Next.js, Prisma, Tailwind, and ESLint.

Follow **server-first principles**, maintain **strict typing**, and keep all **database logic on the backend**.
