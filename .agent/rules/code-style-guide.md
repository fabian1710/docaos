---
trigger: always_on
---

# React + Vite Coding Style Rules

## 1. File & Folder Structure
- One component per file.
- `.view.tsx` = UI entry point for a section.
- `.context.ts` = state + business logic.
- `.types.ts` = shared section types.
- `components/` contains generic reusable components.
- Keep folder structure shallow and easy to navigate.
- Use absolute imports (`@/`).

## 2. Components
- Must follow the **single-purpose principle**.
- Must **not** contain complex logic.
- Must **not** fetch data.
- May contain only trivial UI state (local toggles, UI-only behavior).
- Must be the **default export** of their file.
- Prefer generic components when possible (e.g., `Button`, `Input`, `Card`).

## 3. Styling
- Inline styling is preferred.
- Shared inline style objects may be used for reusability.
- Global CSS is minimal: resets and variables only.

## 4. State Management
- Complex state lives in `<section>.context.ts`.
- Each context file must provide:
  - Types
  - Context creation
  - Provider component
  - Encapsulated logic (fetch, update, transforms)
  - A custom hook for access (`useDocuments`, `useFolders`, etc.)
- Components never directly manipulate complex state.

## 5. Views (`.view.tsx`)
- Consume context values.
- Contain no data fetching or business logic.
- Only combine components and pass props.

## 6. Naming Conventions
- Components: PascalCase (`DocumentCard.tsx`).
- Context files: camelCase + `.context.ts` (`documents.context.ts`).
- Hooks: `useSomething.ts`.
- Types: PascalCase (`Document`, `Folder`).

## 7. Imports & Exports
- Components use **default exports**.
- Hooks, types, and utilities use **named exports**.
- Prefer absolute imports from `@/`.

## 8. Data Fetching
- Never fetch inside React components.
- Fetch logic must exist inside context files or `services/`.
- Supabase operations must be isolated into:
  - Section context files, or  
  - `services/supabase.ts`

## 9. Testing
- Use Vitest.
- Test reducers, logic, and helpers.
- Snapshot-test simple components.
- Avoid unnecessary tests during MVP phase.

## 10. Component Philosophy Summary
A component:
- Renders UI  
- Accepts props  
- May have trivial state  
- Does not fetch data  
- Does not contain business logic  
- Does not mutate global state  

## 11. Context Philosophy Summary
A context:
- Owns and transforms business state  
- Fetches and writes data  
- Exposes a custom hook  
- Provides state to views  
- Does not render UI  