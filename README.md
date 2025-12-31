AkBoard - Team Workflow Application 📋

A robust, accessible React application for managing team tasks, built with a custom component system and persistent local storage.

🚀 Quick Start

npm install   # 1. Install dependencies
npm start     # 2. Launch at http://localhost:3000
npm test      # 3. Run Jest tests


🏗 Architecture

The codebase strictly separates UI from business logic:

src/components/: Reusable UI elements (Modal, Card) using the Composition pattern.

src/hooks/: Business logic (useTaskStorage) and persistence.

src/App.jsx: Application composition root.

🧠 Key Decisions

State Management: Uses native useState and custom hooks instead of Redux to minimize boilerplate. Context is reserved for global UI states (e.g., Toasts).

Data Consistency: Implements a Schema Migration system in useTaskStorage. On load, it checks data versions and backfills missing fields to prevent crashes from stale localStorage data.

Component Design: Components rely on passing children (composition) rather than config objects for maximum flexibility.

⚠️ Trade-offs

Feature

Limitation

Drag & Drop

Native HTML5 API used (lightweight but poor mobile support).

Storage

localStorage is synchronous and limited to ~5MB.

Performance

Optimized for <500 tasks. Larger lists would require virtualization.

🤖 AI Assistance Disclosure

AI tools (Gemini 2.5) were used for:

1.Setup: generating initial Tailwind/Jest configurations (manually debugged Babel).
2.Testing: scaffolding integration tests (manually rewrote storage mocks).
3.A11y: identifying ARIA requirements (manually implemented logic like useId).