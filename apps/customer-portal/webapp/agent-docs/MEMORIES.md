# MEMORIES.md – Customer Portal Webapp

Long-term memory for stack, structure, conventions, and patterns. Update when new context is discovered.

---

## Tech stack

- **Runtime:** React 19, TypeScript 5.9 (strict), ESNext modules
- **Build:** Vite 7, @vitejs/plugin-react (with babel-plugin-react-compiler)
- **UI:** @wso2/oxygen-ui, @wso2/oxygen-ui-icons-react (Lucide wrapper), @wso2/oxygen-ui-charts-react
- **Theme:** Acrylic Orange only (light/dark via `data-color-scheme`). See `agent-docs/OXYGENUI-INFO.md`
- **Auth:** @asgardeo/react
- **Data:** @tanstack/react-query, Zod for validation
- **Routing:** react-router 7
- **Package manager:** pnpm
- **Lint:** ESLint 9 (typescript-eslint, react-hooks, react-refresh)
- **Tests:** Vitest, @testing-library/react; add a test file for every new component (colocated in `__tests__/`)

---

## Folder structure

```
src/
├── api/              # Data-fetching hooks (useGetX, useGetY)
├── assets/           # Static assets (images, SVGs)
├── components/       # UI components only (no page logic)
│   ├── common/       # Shared: header, footer, side-nav-bar, filter-panel, tab-bar, error-indicator, notification-banner
│   ├── dashboard/    # Dashboard: stats, charts, cases-table
│   ├── login-page/   # Login: LoginBox, LoginBackground, LoginSlogan, LoginFooter, ParticleBackground
│   ├── project-details/  # Project details views
│   ├── project-hub/  # Project hub / project cards
│   └── support/      # Support: case-creation-layout, cases-overview-stats, novera-ai-assistant, service-requests-cards, support-overview-cards
├── config/           # apiConfig, authConfig, themeConfig, loggerConfig, notificationBannerConfig
├── constants/        # Domain constants (dashboard, appLayout, support, api, etc.)
├── context/          # React context (LoaderContext, LoggerContext, etc.)
├── hooks/            # Shared hooks (useLogger, etc.)
├── layouts/          # AppLayout (shell: Header, Sidebar, Main, Footer)
├── models/           # Types and request/response shapes (requests.ts, responses.ts, mockData)
├── pages/            # Route-level components; only compose components from components/
├── providers/        # MockConfigProvider, etc.
└── utils/             # Pure helpers (logger, casesTable, projectCard, projectStats, apiUtils)
```

- **Path aliases:** `@/` → src, `@api/`, `@assets/`, `@components/`, `@config/`, `@constants/`, `@context/`, `@hooks/`, `@layouts/`, `@models/`, `@pages/`, `@providers/`, `@utils/`
- **Tests:** Colocated in `__tests__/` (e.g. `components/common/header/__tests__/Header.test.tsx`). Add a test file for every created component.

---

## Naming conventions

- **Files exporting React components:** PascalCase (e.g. `AuthGuard.tsx`, `StatCard.tsx`, `AppLayout.tsx`)
- **Hooks:** camelCase with `use` prefix (e.g. `useGetProjects.ts`, `useLogger.ts`)
- **Utils / config / constants:** camelCase (e.g. `casesTable.ts`, `themeConfig.ts`, `dashboardConstants.ts`)
- **Folders:** kebab-case (e.g. `case-creation-layout`, `novera-ai-assistant`, `side-nav-bar`)
- **Constants and types:** UPPER_SNAKE for exported constants, PascalCase for types/interfaces

---

## License header and file format

- **Every source file** must start with the WSO2 Apache 2.0 license block (15 lines), same as `src/layouts/AppLayout.tsx` (lines 1–15).
- **One blank line** between the license block and the first import or code.
- **One trailing newline** at the end of each file.

Example:

```ts
// Copyright (c) 2026 WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// ...
// under the License.

import { ... } from "...";
```

---

## Commenting patterns

- **Components (and page components):** JSDoc block directly above the component declaration.
  - Include brief description and `@returns {JSX.Element}`.
  - Example (AuthGuard): `/** * AuthGuard component to protect routes. * @returns {JSX.Element} The protected route outlet or redirect. */`
- **Functions / hooks:** JSDoc with `@param` and `@returns` where useful (e.g. `@param label - Status label`, `@returns Color string`). Example: `src/utils/casesTable.ts` (getPriorityColor, getStatusColor).
- **Other logic:** Use `//` comments when it helps clarity; not on every line.
- **Inline JSX:** Optional `{/* Section description */}` for large blocks.

---

## Oxygen UI and styling

- **Theme:** Acrylic Orange only. Use `OxygenUIThemeProvider` with `AcrylicOrangeTheme` (or `themeConfig` from `@config/themeConfig`).
- **No border radius:** Do not add `borderRadius` in `sx` or styles. Exception: circular avatars/icons may use `borderRadius: "50%"` where the design requires a circle; do not add rounded corners to cards, buttons, or panels.
- **Custom colors:** Use theme semantic tokens (`palette.primary`, `palette.text.primary`, etc.) or the `colors` namespace from `@wso2/oxygen-ui` (e.g. `colors.blue[500]`, `colors.orange[500]`) for charts and non-semantic UI. See `agent-docs/OXYGENUI-INFO.md` for palette and `colors` usage.
- **Components and icons:** Import UI from `@wso2/oxygen-ui` and icons from `@wso2/oxygen-ui-icons-react` (not lucide-react directly).
- **Typography / layout:** Prefer Oxygen and MUI re-exports (Box, Grid, Stack, Typography, Card, etc.) and theme spacing.

---

## Padding and margin (standardized spacing)

- **Main content area:** `p: 3` on the scrollable content container (see AppLayout `AppShell.Main` inner Box).
- **Between major sections on a page:** `mb: 3` or `mt: 3` (theme units).
- **Grid between items:** `spacing={2}` on Grid container; use `size={{ xs: 12, sm: 6, md: 3 }}` or similar for responsive columns.
- **Cards / stat blocks:** Internal padding e.g. `p: 2.5`, `gap: 3` for vertical rhythm.
- **Buttons / inline groups:** `gap: 2` or `gap: 1` in Stack/Box; button padding e.g. `px: 2`.
- Use theme spacing scale (1, 2, 3, 4) consistently; avoid arbitrary pixel values except where design explicitly requires (e.g. login layout padding).

---

## Pages vs components

- **Pages** (`src/pages/*`): Route-level components only. They must **compose** components from `src/components/` and use hooks from `@api/`, `@hooks/`, `@context/`. They must **not** contain inline component implementations (no large JSX blocks that belong in a reusable component).
- **Components** (`src/components/*`): Reusable UI and feature components. Business logic and data fetching stay in pages or in hooks (api/).

---

## Types

- **Define types for all** public APIs, props, and response/request shapes.
- **Types live in:** `src/models/` (responses.ts, requests.ts) for API and domain types; component props can be defined in the same file as the component or in a sibling type file.
- **Prefer interfaces** for object shapes; use `type` for unions and derived types.
- **Exports:** Export interfaces and types that are used across modules.

---

## Test cases

- **Add test files for every created component.** Place tests in a `__tests__` folder next to the component (e.g. `components/common/header/__tests__/Header.test.tsx`). Use Vitest and @testing-library/react. Existing patterns in the codebase show component tests colocated with their components.

---

## Summary checklist for new code

- License header + blank line + imports; trailing newline at EOF
- Component JSDoc with `@returns {JSX.Element}`; function/hook JSDoc with `@param` / `@returns` where helpful
- Types/interfaces for all props and public APIs
- No `borderRadius` except `"50%"` for circles where needed
- Acrylic Orange theme; colors from theme or `colors` namespace
- Spacing: theme units (p: 3, mb: 3, spacing={2}, gap: 2/3) consistent with existing pages
- Pages only compose components; no inline component definitions in page files
- Path aliases (`@components/`, `@api/`, etc.) for imports
- Test file for every created component (in `__tests__/` next to the component)
