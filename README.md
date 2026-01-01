> AkBoard - Team Workflow Application 📋

A robust, accessible React application for managing team tasks, built with a custom component system and persistent local storage.

**🚀 Installation & Setup Guide**

Follow these steps to set up the project environment from scratch.

**1. Install Core Dependencies**

Install React and the utility libraries used for icons and data handling.

`npm install react react-dom lucide-react`


**2. Setup Tailwind CSS**

We follow the standard Tailwind CSS installation guide.

A. Install dev dependencies:

`npm install -D tailwindcss postcss autoprefixer`


B. Initialize configuration:

`npx tailwindcss init -p`


C. Configure tailwind.config.js:
Update the content array to scan your source files for classes.

/** @type {import('tailwindcss').Config} */

```
`module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
```


D. Add directives to your CSS:
Add these lines to the top of your src/index.css file:

`@tailwind base;`
`@tailwind components;`
`@tailwind utilities;`


**3. Install Testing Environment**

Install Jest and React Testing Library dependencies.

`npm install -D jest babel-jest @babel/preset-env @babel/preset-react @testing-library/react @testing-library/jest-dom`


**4. Run the Application**

Start the development server.

`npm run dev`


The application will launch at (http://localhost:3000) (or the port shown in your terminal).

**🏗 Architecture**

The codebase strictly separates UI from business logic:

src/components/: Reusable UI elements (Modal, Card) using the Composition pattern.

src/hooks/: Business logic (useTaskStorage) and persistence.

src/App.jsx: Application composition root.

🧠 **Key Decisions**

State Management: Uses native useState and custom hooks instead of Redux to minimize boilerplate. Context is reserved for global UI states (e.g., Toasts).

Data Consistency: Implements a Schema Migration system in useTaskStorage. On load, it checks data versions and backfills missing fields to prevent crashes from stale localStorage data.

Component Design: Components rely on passing children (composition) rather than config objects for maximum flexibility.

⚠️ **Trade-offs**

| Feature      |   Limitation                                                         |
| --------     |----------------------------------------------------------------------|
| Drag & Drop  | Native HTML5 API used (lightweight but poor mobile support).         |
| Storage      | localStorage is synchronous and limited to ~5MB.                     |
| Performance  | Optimized for <500 tasks. Larger lists would require virtualization. |



🤖 **AI Assistance Disclosure**

AI tools (Gemini 2.5) were used for:

Setup: generating initial Tailwind/Jest configurations (manually debugged Babel).

Testing: scaffolding integration tests (manually rewrote storage mocks).

A11y: identifying ARIA requirements (manually implemented logic like useId).
