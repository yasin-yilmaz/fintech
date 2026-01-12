# Fintech Dashboard – Case Study

**Repository:** https://github.com/yasin-yilmaz/fintech

This project is a **frontend-focused case study** built with **Next.js** to demonstrate modern dashboard architecture, performance-conscious design, and scalable UI patterns for fintech-style applications.

> ⚠️ **Important:**  
> This is **not a production-ready product**.  
> It is a **demo / case study application** created to showcase architecture, code quality, and UI/UX decisions.

---

## ✨ Overview

Fintech is a demo dashboard application that simulates a modern financial platform experience, including:

- Authentication flows (Sign In / Sign Up)
- Dashboard layout with charts and statistics
- Wallet and transaction views
- Responsive and mobile-first design
- Accessible modals and UI primitives
- Clean separation of server and client components

The project focuses on:

- **Performance**
- **Maintainability**
- **Scalable component design**
- **Real-world frontend patterns**

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone git@github.com:yasin-yilmaz/fintech.git
cd fintech
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

The app will be available at: `http://localhost:3000`

### Build the production app

```bash
npm run build
```

### Start the production server

```bash
npm run start
```

---

## 🔐 Environment Variables

This project requires environment configuration.

You **must create the following files** based on `.env.sample`:

- `.env.local`
- `.env.development`
- `.env.production`

### Example `.env.sample`

```env
NEXT_PUBLIC_API_BASE_URL="https://api.example.com"
```

> `NEXT_PUBLIC_API_BASE_URL`
> Base URL of the backend API used by the demo application.

---

## 🧱 Tech Stack

Core technologies and tools used in this case study:

- **Next.js 16 (App Router)**
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Zustand** – global UI state
- **React Hook Form** – form managment
- **Zod** – schema validation
- **Framer Motion** – animations
- **Recharts** – data visualization
- **date-fns** – date utilities
- **ESLint + TypeScript strict mode**
- **Server & Client Components separation**

---

## 🧠 Architecture Notes

- **Server Components** are used for data fetching where possible
- **Client Components** handle interactivity and UI state
- Global UI concerns (sidebar, modals) are managed via **Zustand**
- Reusable primitives (Modal, ConfirmModal, Portal, Buttons) are isolated
- Layout-level concerns are handled in `layout.tsx` and `template.tsx`
- Metadata is centralized via `appMetadata` and `pageMetadata`

---

## 🎨 UI & UX Principles

- Mobile-first responsive layout
- Keyboard and screen-reader friendly modals
- Minimal but expressive motion
- Predictable spacing and typography scale
- Clear visual hierarchy for dashboards

---

## 📦 Scripts

```bash
npm run dev       # Development server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Lint check
npm run lint:strict # Lint + TypeScript check
```

---

## 🧪 Status

- ✅ UI complete
- ✅ Architecture stabilized
- ⚠️ Mock / demo data only

---

## 👤 Author

**Yasin Yılmaz**
Senior Frontend Developer

- GitHub: [https://github.com/yasin-yilmaz](https://github.com/yasin-yilmaz)

---

## 🔗 Links

- Repository: [https://github.com/yasin-yilmaz/fintech](https://github.com/yasin-yilmaz/fintech)
- GitHub Profile: [https://github.com/yasin-yilmaz](https://github.com/yasin-yilmaz)

---

## 📄 License

This project is shared for **educational and portfolio purposes** only.
