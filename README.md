QuintBoard - Team Workflow Application

A robust, accessible React application for managing team tasks, built with a custom component system and persistent local storage.

🚀 How to Run

Install Dependencies

npm install


Start the Development Server

npm start


The application will launch at http://localhost:3000.

Run Tests

npm test


This launches the Jest test runner in watch mode.

🏗 Architecture Overview

Project Structure

I organized the codebase to strictly separate the presentational UI from the business logic and data persistence.

src/
├── components/     # UI Layer (Atomic components like Button, Input, Modal)
├── hooks/          # Logic Layer (Data persistence, Filter state, Toast context)
├── Utils/          # Helpers (Date formatters, Constants)
├── App.jsx         # Composition Root
└── App.test.jsx    # Integration Tests

Key Architectural Decisions
1. State Management (Hooks vs. Redux)

Decision: I chose native React useState combined with custom hooks (useTaskStorage) instead of a library like Redux.

Rationale: For an application of this specific scope, external state libraries introduce unnecessary boilerplate and bundle size. Custom hooks provided a clean abstraction for data manipulation without the overhead.

Context: I restricted the use of the Context API to global UI states (like the ToastProvider) to avoid prop-drilling notification methods, keeping the data flow for tasks explicit and traceable.

2. Component Design (Composition)

Decision: The design system components (Modal, Card, Button) rely on the Composition pattern (passing children) rather than complex configuration objects.

Rationale: This makes the components highly reusable and easier to maintain. For example, the Modal doesn't know about "Tasks"—it just renders whatever content is passed to it, allowing it to be used for other features later.

3. Data Layer (Schema Migration Strategy)

Decision: I implemented a "Schema Migration" system within the useTaskStorage hook.

Rationale: Since we are using localStorage (which persists across deployments), a code update that changes the data shape (e.g., adding a tags array) would crash the app for existing users.

Implementation: On app load, the system checks the stored version. If it is lower than the current SCHEMA_VERSION, it runs a migration function to backfill missing fields (e.g., initializing tags: []) before the UI renders.

⚠️ Known Limitations & Trade-offs
Drag & Drop (HTML5 API):

Trade-off: I used the native HTML5 Drag and Drop API to keep the project lightweight and dependency-free.

Limitation: Native DnD has poor support on mobile/touch devices. If this were a production mobile app, I would refactor to use dnd-kit.

Rendering Performance:

Trade-off: The entire board re-renders when task state changes.

Limitation: This is performant for <500 tasks. For a larger dataset, I would implement list virtualization (using react-window) and React.memo for individual cards to prevent UI lag.

Browser Storage:

Limitation: localStorage is synchronous and limited to ~5MB. IndexedDB would be the scalable choice for a production app requiring rich text or image attachments.

AI Assistance Disclosure
Per the assignment requirements, I utilized AI tools (Gemini 2.5) to accelerate development in the following areas:

1. Boilerplate & Configuration:

Usage: Generated the initial Tailwind CSS class structures and the Jest/Babel configuration files.

Modification: I had to manually debug and adjust the Babel config to support the automatic JSX runtime ("runtime": "automatic") to fix test environment errors.

2. Test Scaffolding:

Usage: Generated the skeleton for the integration tests (App.test.jsx).

Modification: The initial AI test mocks for localStorage were incomplete. I rewrote the mock implementation to properly simulate storage events and added the specific logic to test the "Search Filter" behavior.

3. Accessibility (A11y):

Usage: Consulted AI for a checklist of necessary ARIA attributes.

Modification: The AI suggestion was generic. I manually implemented the useId logic in my Input components to ensure unique label-to-input associations and added the keydown event listeners to the Modal for Escape-key closure.