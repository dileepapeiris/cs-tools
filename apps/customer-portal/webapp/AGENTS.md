# Project Instructions

## Overview

This is the Customer Portal webapp built with React 19, TypeScript, and Oxygen UI. Follow these instructions for all development work.

## Workflow

- Read `agent-docs/MEMORIES.md` at conversation start (and `agent-docs/OXYGENUI-INFO.md` for UI work)
- Follow plan-driven development workflow: Analysis → Planning → Implementation → Finalization
- Update `agent-docs/MEMORIES.md` and `PROGRESS.md` after each completed task
- See `.cursor/rules/workflow.mdc` for detailed workflow steps

## Code Style

- Every file: WSO2 Apache 2.0 license header (see `src/layouts/AppLayout.tsx` lines 1–15), one blank line after header, trailing newline at EOF
- Components: JSDoc with description and `@returns {JSX.Element}`
- Functions/hooks: JSDoc with `@param` and `@returns` where useful
- Use path aliases: `@components/`, `@api/`, `@pages/`, `@layouts/`, `@config/`, `@constants/`, `@context/`, `@hooks/`, `@models/`, `@utils/`, `@providers/`, `@assets/`
- Pages only compose components from `src/components/`; no inline component implementations
- Define types/interfaces for all props, APIs, and request/response shapes
- Add test files for every created component (colocated in `__tests__/`; use Vitest and @testing-library/react)

## Naming

- React components: PascalCase (e.g. `AuthGuard.tsx`)
- Hooks: camelCase with `use` prefix (e.g. `useGetProjects.ts`)
- Utils/config/constants: camelCase (e.g. `casesTable.ts`)
- Folders: kebab-case (e.g. `case-creation-layout`)
- Constants: UPPER_SNAKE, Types: PascalCase

## Oxygen UI & Styling

- Theme: Acrylic Orange only. Use `OxygenUIThemeProvider` with `AcrylicOrangeTheme`
- No border radius (exception: `borderRadius: "50%"` for circular avatars/icons only)
- Colors: Use theme semantic tokens (`palette.primary`, etc.) or `colors` namespace from `@wso2/oxygen-ui`
- Import UI from `@wso2/oxygen-ui` and icons from `@wso2/oxygen-ui-icons-react` (not lucide-react directly)
- Spacing: Use theme units (p: 3, mb: 3, spacing={2}, gap: 2/3) consistently
- See `agent-docs/OXYGENUI-INFO.md` for complete component reference

## Architecture

- Pages (`src/pages/*`): Route-level components that compose components from `src/components/`
- Components (`src/components/*`): Reusable UI components. Business logic stays in pages or hooks
- Types: Define in `src/models/` for API/domain types; component props in same file or sibling type file
- Tests: Colocated in `__tests__/` next to components

## Reference Files

- `agent-docs/MEMORIES.md` - Stack info, patterns, conventions
- `agent-docs/OXYGENUI-INFO.md` - Complete Oxygen UI reference
- `agent-docs/cursorrules.md` - Detailed workflow and file format rules
- `.cursor/rules/` - Structured Cursor rules (workflow, code-style, oxygen-ui, project-structure)
