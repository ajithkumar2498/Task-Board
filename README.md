AK Task Board

A React-based task management board built to demonstrate clean architecture, reusable component design, and client-side persistence.

Quick Start

Install & Run:

npm install && npm start


Runs at Your local Driver.

Test:

npm test


Launches the test runner in watch mode.

🏗 Architecture
---------------

I organized the codebase to strictly separate the UI components from the business logic.

src/
├── components/     # UI Layer (Atomic components & Layouts)
├── hooks/          # Logic Layer (Persistence, Filter state, Toasts)
├── Utils/          # Helpers & Constants
├── App.jsx         # Composition Root
└── App.test.jsx    # Integration Tests


Key Decisions
-------------

State Management: I stuck with native React state (useState + Custom Hooks) instead of Redux. For an app of this size, external libraries add complexity without much benefit. I did use Context, but only for the ToastProvider to prevent prop-drilling notification methods.

Persistence & Migrations: Since we're using localStorage without a backend, I wrote a useTaskStorage hook that handles data fetching. I also added a version check on load—if the stored data is from an older schema version, it automatically "migrates" it (e.g., adds missing fields) before the app renders to prevent crashes.

Component Composition: The UI components (like Modal and Card) use a composition pattern (children props) rather than config objects. This makes them much easier to extend or restyle later.

Technical Notes
---------------

Storage Migration Strategy

To support future features without breaking existing users, the storage logic tracks a SCHEMA_VERSION.

Check: On load, the app compares the stored data version against the code's version.

Migrate: If the stored data is older (e.g., missing the new tags array), it passes the data through a migration function to backfill defaults.

Save: The updated data is saved back to storage immediately.

Refactoring Story: The "Uncontrolled Input" Bug

During the build, I hit the classic React warning: "A component is changing an uncontrolled input to be controlled."

It turned out my TaskForm state was initializing fields like description to undefined if they weren't passed in the props. This made the inputs uncontrolled on mount, but controlled as soon as I typed.

The Fix: I refactored the useState initialization to explicitly merge the incoming props with a default object (e.g., { description: '' }). This ensures every input always has a defined string value from the very first render, effectively solving the stability issue.

Current Limitations
-------------------

Drag & Drop: I used the native HTML5 API for performance and zero dependencies. However, this doesn't support touch devices well; for a production mobile app, I'd swap this for dnd-kit.

Rendering: The board re-renders fully on updates. This is fine for hundreds of tasks, but for thousands, I'd optimize using react-window virtualization.