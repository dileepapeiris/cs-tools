This document defines the behavior, coding principles, and workflow rules for the development agent. These rules are strict and must always be followed.

## Project context (Customer Portal webapp)

- **Memory and UI reference:** At conversation start, read `agent-docs/MEMORIES.md` (tech stack, folder structure, naming, commenting, Oxygen UI, spacing) and `agent-docs/OXYGENUI-INFO.md` (Acrylic Orange theme, colors, components). Keep MEMORIES.md updated when new patterns or stack details are discovered.
- **Theme:** Acrylic Orange only. No border radius (exception: `borderRadius: "50%"` for circular avatars/icons only). Custom colors via theme palette or `colors` from `@wso2/oxygen-ui`.
- **File format:** Every file: WSO2 Apache 2.0 license header (same as `src/layouts/AppLayout.tsx` lines 1–15), one blank line after the header, then imports/code; one trailing newline at end of file.
- **Comments:** Components: JSDoc with description and `@returns {JSX.Element}`. Functions/hooks: JSDoc with `@param` and `@returns` where useful. Use `//` for other clarification as needed.
- **Pages:** Page files only compose components from `src/components/`; they must not contain inline component implementations.
- **Types:** Define types/interfaces for all props, APIs, and request/response shapes.
- **Tests:** Add test files for every created component (colocated in `__tests__/`; use Vitest and @testing-library/react).
- **Path aliases:** Use `@components/`, `@api/`, `@pages/`, `@layouts/`, `@config/`, `@constants/`, `@context/`, `@hooks/`, `@models/`, `@utils/`, `@providers/`, `@assets/` for imports.

## File Handling

1. Only create `.md` files when explicitly requested, with the exception of `PLAN.md` as part of the task workflow.
2. Always maintain and update two root-level files:

- `PROGRESS.md`: A compressed changelog of completed tasks. Updated after each task is finalized. Serves as a high-level project evolution log.
- `MEMORIES.md`: The agent's long-term memory. Contains stack info, user preferences, project patterns, and domain context. Updated after a task is successfully completed or when new context is discovered. **In this workspace,** MEMORIES.md lives at `agent-docs/MEMORIES.md`; use that path for reading and updating.

3. Keep `PROGRESS.md` and `agent-docs/MEMORIES.md` dense and structured. MEMORIES.md uses clear sections and bullet points; separate sections with empty lines.
4. Always read `PROGRESS.md` and `agent-docs/MEMORIES.md` (and `agent-docs/OXYGENUI-INFO.md` for UI work) at the start of every new conversation (if they don't exist, bootstrap them after analyzing the codebase).
5. The `PLAN.md` file is temporary and must be removed upon successful completion of the task.

---

## Task Workflow: Plan-Driven Development

This workflow is mandatory for every new feature, bug fix, or significant code modification.

### Phase 1: Analysis & Planning

1. **Read Memory**: Check `agent-docs/MEMORIES.md` for existing stack info, preferences, and patterns. If stack information is missing, detect it by scanning for common configuration files and append to `agent-docs/MEMORIES.md`. For UI work, also read `agent-docs/OXYGENUI-INFO.md`.

2. **Scope Definition**: When a task is given, ask clarifying questions to ensure requirements are fully understood. Do not proceed with ambiguous instructions.

3. **Codebase Scan**: Perform a thorough scan of all related files to understand context, architecture, and potential impact. Update `agent-docs/MEMORIES.md` with any architectural findings, patterns discovered, or context that future agents should know to avoid repeating this work.

4. **Create `PLAN.md`**: Create a temporary `PLAN.md` file in the root directory:

```
  # PLAN: [Brief Description of Task]


  Overall Goal: [Clear statement of what success looks like]


  ---


  ### Step 1: [Goal]
  - Goal: [What this step achieves]
  - Files: [Files to create/update]
  - Verify: [How to confirm completion—typically a unit test or compiler check]


  ### Step 2: [Goal]
  - Goal: [What this step achieves]
  - Files: [Files to create/update]
  - Verify: [How to confirm completion]


  ...


  ### Final Step: Cleanup & Validation
  - Goal: Run formatters and linters.
  - Verify: [Stack-specific commands] run without errors or warnings.
```

5. **Seek Approval**: After creating `PLAN.md`, stop and wait for explicit user approval before proceeding.

### Phase 2: Implementation & Verification

1. **Execute Step-by-Step**: Implement precisely as described, one step at a time.
2. **Verify Each Step**: Perform the verification action before moving to the next step.
3. **Surgical Precision**: Make extremely targeted changes. Do not touch, refactor, or update any code not directly relevant to the current task.

### Phase 3: Finalization

1. **Get Final Approval**: Present the completed result and request a final "green light."
2. **Update `agent-docs/MEMORIES.md`**: Record any new learnings, preferences, or patterns discovered.
3. **Update `PROGRESS.md`**: Add task entry with file changes and any flags.
4. **Cleanup**: Delete `PLAN.md`.
5. **Suggest Commit**: Provide a single-line git commit message in imperative mood. Do not run the commit.

When applying project-specific rules (license header, Oxygen UI, no border radius, commenting, types, pages as composition only), follow `agent-docs/MEMORIES.md` and `agent-docs/OXYGENUI-INFO.md`.

## PROGRESS.md Format

Purpose: High-level project evolution log. One entry per completed task. Enables any reader to understand what changed and why over time.

```
Implemented account deletion endpoint DELETE /v2/account with R2 cleanup.
- Added `delete_all_user_files` to `src/services/storage.rs` for batch R2 deletion using ListObjectsV2/DeleteObjects.
- Database CASCADE deletes all related data (content, blobs, tags, content_tags, generated_content, user_traits).
- Added unit tests for deletion service in `src/services/storage_test.rs`.


Reworked POST /v2/contents endpoint to accept multipart/form-data with images.
- Modified `src/handlers/contents.rs` to parse multipart form data.
- Added `ImageProcessor` trait in `src/services/images.rs` for testable image handling.
- TODO: Add image size validation → implement when requirements clarified.
- TRADEOFF: Chose synchronous processing over queue → acceptable for MVP, revisit at scale.


Fixed race condition in session refresh logic.
- Added mutex lock in `src/auth/session.rs` around token refresh.
- WORKAROUND: Using coarse-grained lock → replace with per-session lock when performance requires.
- DEPRECATED: `refresh_token_v1` function → remove after v2.1 release.
```

Rules:

- Single sentence task summary in imperative mood, include endpoint/feature name
- Bullet points for file changes: `path/to/file.ext` with brief description of change
- Flags (TODO/ISSUE/WORKAROUND/TRADEOFF/DEPRECATED) only when applicable, always include resolution path
- Separate entries with empty line
- No headers, no dates

## MEMORIES.md Format

Purpose: Long-term memory for stack info, user preferences, project patterns, and domain context. Survives across all sessions.

```
Tooling
- Stack: TypeScript, Express, Jest, ESLint, Prettier
- Package manager: bun
- Test command: bun test
- Lint command: bun lint
- Format command: bun format
- Tunneling tool: cloudflared


Preferences
- Prefer early returns over nested conditionals
- Max line length 100 characters
- Use Result pattern for error handling, not exceptions
- snake_case for files, PascalCase for types, camelCase for functions
- Unit tests only, mock all external dependencies
- One assertion per test when possible
- Use `rg` as grep alternative and `bun` as node package manager


Coding Patterns
- Repository pattern for data access (see src/repositories/)
- Dependency injection via constructor, no service locators
- Request validation in middleware, not handlers
- All IDs are branded types (see src/types/branded.ts)
- Avoid: god objects, circular imports, string typing for IDs


Business Context
- Domain: e-commerce platform with multi-warehouse fulfillment
- Orders can have multiple shipments from different warehouses
- Inventory is eventually consistent, check availability at checkout
- Payment provider: Stripe, webhook timeout 30s, retry 3x


Miscellaneous
- Database: Postgres 18+, with sqlc
- Cache: In-memory cache, with expiration
- File storage: R2, with uuid-based keys grouped by user
- Auth: JWT with 15min access / 7day refresh tokens
```

Rules:

- No headers, group related items with empty lines
- Bullet points or single lines only, no prose
- Update incrementally, do not rewrite entire file
- Remove outdated entries when they no longer apply
- Stack info at top, preferences next, patterns, then domain context

## Execution & Commands

DO NOT RUN, any commands which would do irreversible changes to the host system like,

- Install/Updating/Uninstalling system level packages
- Changing system level configurations
  You are encouraged, use tools (kubectl, git, gh, curl, ls, docker, etc.) as much as needed in READ ONLY to gather information.

## Summary

| Phase        | Actions                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| **Plan**     | Read `agent-docs/MEMORIES.md` (and OXYGENUI-INFO.md for UI) → Detect stack if needed → Understand task → Scan codebase → Update memory → Create `PLAN.md` → Get approval |
| **Execute**  | Implement step-by-step → Verify each step → Keep changes surgical                                                        |
| **Code**     | Testable → Idiomatic → Good taste → Small functions → Explicit                                                           |
| **Test**     | Unit tests only → Mock dependencies → Test behavior not implementation                                                   |
| **Finalize** | Get approval → Update `agent-docs/MEMORIES.md` → Update `PROGRESS.md` → Delete `PLAN.md` → Suggest commit message        |
