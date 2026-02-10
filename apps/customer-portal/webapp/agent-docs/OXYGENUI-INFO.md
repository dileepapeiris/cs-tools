# Oxygen UI – Reference for Cursor Agents

This document is the single source of truth for writing code with **Oxygen UI** (`@wso2/oxygen-ui`). Use it when generating components, pages, or layouts. **Theme scope: Acrylic Orange only (light and dark mode).** Charts and ESLint packages are out of scope.

---

## 1. Package and entry point

- **Main library:** `@wso2/oxygen-ui`
- **Icons (Lucide wrapper):** `@wso2/oxygen-ui-icons-react` — use this for icons in Oxygen UI apps; do not import directly from `lucide-react`. Full Lucide set: [lucide.dev/icons](https://lucide.dev/icons/).
- **Charts:** Not part of this reference. Charting in the repo is a separate wrapper around Recharts; ignore charts when using this doc.

```tsx
import { Button, Typography, OxygenUIThemeProvider, AcrylicOrangeTheme } from '@wso2/oxygen-ui';
import { Home, Settings, ChevronDown } from '@wso2/oxygen-ui-icons-react';
```

---

## 2. Theme: Acrylic Orange only

Use **Acrylic Orange** as the only theme, with light and dark color schemes.

### 2.1 Setup

```tsx
import { OxygenUIThemeProvider, AcrylicOrangeTheme } from '@wso2/oxygen-ui';

function App() {
  return (
    <OxygenUIThemeProvider theme={AcrylicOrangeTheme}>
      <YourApp />
    </OxygenUIThemeProvider>
  );
}
```

- Color scheme is controlled via `data-color-scheme` on `<html>` (e.g. `light` or `dark`). The provider works with MUI’s theme and CSS variables (`--oxygen-*`).
- **Do not** use other themes (Acrylic Purple, Choreo, Classic, High Contrast, Pale, etc.) when following this doc.

### 2.2 Acrylic Orange – Light mode palette

| Token | Value |
|--------|--------|
| `palette.primary.main` | `#fa7b3f` |
| `palette.primary.contrastText` | `#ffffff` |
| `palette.secondary.main` | `#e8e8e8` |
| `palette.background.default` | `#f5f5f5` |
| `palette.background.paper` | `#ffffffe1` |
| `palette.background.acrylic` | `#ffffff78` |
| `palette.text.primary` | `#40404B` |
| `palette.text.secondary` | `#40404B` |
| `palette.divider` | `#00000012` |

### 2.3 Acrylic Orange – Dark mode palette

| Token | Value |
|--------|--------|
| `palette.primary.main` | `#F87643` |
| `palette.primary.contrastText` | `#ffffff` |
| `palette.secondary.main` | `#3c3c3c` |
| `palette.background.default` | `#000000` |
| `palette.background.paper` | `#000000b8` |
| `palette.background.acrylic` | `#00000045` |
| `palette.text.primary` | `#efefef` |
| `palette.text.secondary` | `#D0D3E2` |
| `palette.divider` | `#ffffff16` |

### 2.4 Custom theme tokens (Acrylic base)

Available on the theme object (and `theme.vars` when using CSS vars):

- **Blur:** `theme.blur.light` (`blur(3px)`), `theme.blur.medium` (`blur(10px)`), `theme.blur.heavy` (`blur(20px)`).
- **Border:** `theme.border.width` (`1px`), `theme.border.style` (`solid`).
- **Gradient:** `theme.gradient.primary` (`linear-gradient(90deg, #F47B20 0%, #EF4223 100%)`).
- **Syntax (code blocks):** `theme.syntax.light` / `theme.syntax.dark` with `background`, `text`, `comment`, `keyword`, `string`, `function`, `number`, `operator`.

### 2.5 Shape

- `theme.shape.borderRadius`: `12` (used by Paper, Card, etc.). Buttons use `borderRadius: 20` in overrides.

---

## 3. Typography (Acrylic Orange)

- **Font family:** `'Inter Variable', sans-serif`
- **Base font size:** `14px`
- **Font weight (regular):** `400`

### 3.1 Variants and sizes (px → rem base 14)

| Variant    | Font size (rem) | Font weight |
|-----------|------------------|-------------|
| `h1`      | 36px → 2.571rem  | 400         |
| `h2`      | 30px → 2.143rem  | 400         |
| `h3`      | 24px → 1.714rem  | 400         |
| `h4`      | 18px → 1.286rem  | 400         |
| `h5`      | 16px → 1.143rem  | 400         |
| `h6`      | 14px → 1rem      | 500         |
| `subtitle1` | 18px → 1.286rem | (default)   |
| `subtitle2` | 14px → 1rem     | 400         |
| `body1`   | 14px → 1rem      | (default)   |
| `body2`   | 12px → 0.857rem  | 400         |
| `button`  | (theme default)  | (default)   |
| `caption` | 11px → 0.786rem  | 400         |
| `overline`| (theme default)  | (default)   |

### 3.2 Typography component (MUI)

Use the `Typography` component from `@wso2/oxygen-ui` with the variants above. It supports `color` (e.g. `primary`, `secondary`, `text.primary`, `text.secondary`, `text.disabled`, `error`, `success`, `warning`, `info`), `align`, `gutterBottom`, `noWrap`, etc.

```tsx
import { Typography } from '@wso2/oxygen-ui';

<Typography variant="h1">Heading</Typography>
<Typography variant="body2" color="text.secondary">Secondary text</Typography>
```

---

## 4. Colors module (MUI Material Design palette)

Oxygen UI re-exports MUI colors as a **namespace** `colors`. Use it for custom styling (backgrounds, text, borders) while keeping Acrylic Orange as the main theme for semantic tokens.

```tsx
import { colors } from '@wso2/oxygen-ui';

// Usage
sx={{ bgcolor: colors.blue[500], color: 'white' }}
sx={{ color: colors.grey[700] }}
sx={{ borderColor: colors.orange[200] }}
```

### 4.1 Available color palettes

- red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan  
- teal, green, lightGreen, lime, yellow, amber, **orange**, **deepOrange**  
- brown, grey, blueGrey  

### 4.2 Shade keys

- **50–900:** 50 lightest, 500 main, 900 darkest.
- **A100, A200, A400, A700:** accent shades (where defined).

Example: `colors.orange[500]`, `colors.deepOrange[700]`, `colors.grey[100]`.

---

## 5. All components

### 5.1 Oxygen custom components (from `@wso2/oxygen-ui`)

Import these by name from `@wso2/oxygen-ui`.

| Component | Description |
|-----------|-------------|
| **AppShell** | App shell with Header, Sidebar, main area, optional notification panel. Use with `Header`, `Sidebar`, `NotificationPanel`, `Footer`, etc. |
| **Header** | Top app bar. Subcomponents: `Header.Brand`, `Header.Brand.Logo`, `Header.Brand.Title`, `Header.Toggle`, `Header.Switchers`, `Header.Actions`, `Header.Spacer`. |
| **Sidebar** | Side navigation. Subcomponents: `Sidebar.Nav`, `Sidebar.Category`, `Sidebar.Category.Label`, `Sidebar.Item`, `Sidebar.Item.Icon`, `Sidebar.Item.Label`, `Sidebar.Item.Badge`, `Sidebar.Footer`, `Sidebar.User`, `Sidebar.User.Avatar`, `Sidebar.User.Name`, `Sidebar.User.Email`. |
| **Footer** | Page footer. Subcomponents: `Footer.Copyright`, `Footer.Divider`, `Footer.Link`, `Footer.Version`. |
| **NotificationPanel** | Notification drawer/panel. Subcomponents: `NotificationPanel.Header`, `NotificationPanel.Header.Icon`, `NotificationPanel.Header.Title`, `NotificationPanel.Header.Badge`, `NotificationPanel.Header.Close`, `NotificationPanel.Tabs`, `NotificationPanel.Actions`, `NotificationPanel.List`, `NotificationPanel.Item`, `NotificationPanel.Item.Avatar`, `NotificationPanel.Item.Title`, `NotificationPanel.Item.Message`, `NotificationPanel.Item.Timestamp`, `NotificationPanel.Item.Action`, `NotificationPanel.EmptyState`. |
| **NotificationBanner** | Inline notification banner. |
| **UserMenu** | User avatar + dropdown menu. Subcomponents: `UserMenu.Trigger`, `UserMenu.Header`, `UserMenu.Divider`, `UserMenu.Item`, `UserMenu.Logout`. |
| **PageTitle** | Page heading with optional avatar, back button, link, subheader. Subcomponents: `PageTitle.Avatar`, `PageTitle.Header`, `PageTitle.SubHeader`, `PageTitle.Link`, etc. |
| **PageContent** | Wrapper for main page content. |
| **StatCard** | Card for a single stat/metric. |
| **CodeBlock** | Code block with syntax highlighting (Prism). |
| **ColorSchemeToggle** | Toggle for light/dark. |
| **ColorSchemeImage** | Image that switches by color scheme. |
| **ThemeSwitcher** | Theme selector (when using multiple themes). `ThemeSelect` is the select control. |
| **ComplexSelect** | Select with sections/avatars. Subcomponents: `ComplexSelect.Divider`, `ComplexSelect.ListHeader`, `ComplexSelect.MenuItem`, `ComplexSelect.MenuItem.Avatar`, `ComplexSelect.MenuItem.Icon`, `ComplexSelect.MenuItem.Text`. |
| **SearchBar** | Search input. |
| **SearchBarWithAdvancedFilter** | Search + advanced filter UI. |
| **ListingTable** | Table with toolbar, density, sort, empty state. Subcomponents: `ListingTable.Container`, `ListingTable.Head`, `ListingTable.Body`, `ListingTable.Footer`, `ListingTable.Row`, `ListingTable.Cell`, `ListingTable.Toolbar`, `ListingTable.EmptyState`, `ListingTable.DensityControl`, `ListingTable.SortLabel`, `ListingTable.RowActions`, `ListingTable.Cell.Icon`. Hooks: `useListingTable`, `useListingTableRequired`. Context: `ListingTableProvider`, `ListingTableContext`. |
| **Form** | Compound form helpers. Subcomponents: `Form.CardButton`, `Form.DisappearingCardButtonContent`, `Form.CardHeader`, `Form.CardContent`, `Form.CardActions`, `Form.CardMedia`, `Form.Stack`, `Form.Header`, `Form.Subheader`, `Form.Body`, `Form.Section`, `Form.Wizard`, `Form.ElementWrapper`. |
| **ParticleBackground** | Animated particle background. |

### 5.2 Layout (compound)

| Export | Usage |
|--------|--------|
| **Layout** | Root layout (flex row). Use as `<Layout>`. |
| **Layout.Sidebar** | Sidebar column. |
| **Layout.Navbar** | Navbar row. |
| **Layout.Header** | Content header. |
| **Layout.Content** | Main content area. |

```tsx
import Layout from '@wso2/oxygen-ui';

<Layout>
  <Layout.Sidebar>...</Layout.Sidebar>
  <Layout.Content>...</Layout.Content>
</Layout>
```

### 5.3 MUI re-exports (use from `@wso2/oxygen-ui`)

Use these as you would in MUI; they are themed by Acrylic Orange.

**Layout:** `Box`, `Container`, `Stack`, `Grid`, `ImageList`, `ImageListItem`, `ImageListItemBar`.

**Inputs:** `Button`, `IconButton`, `Fab`, `ButtonGroup`, `TextField`, `Select`, `MenuItem`, `FormControl`, `InputLabel`, `FormHelperText`, `Input`, `InputAdornment`, `InputBase`, `Checkbox`, `FormControlLabel`, `FormGroup`, `Radio`, `RadioGroup`, `Switch`, `Slider`, `Rating`, `Autocomplete`, `ToggleButton`, `ToggleButtonGroup`, `NativeSelect`, `TransferList` (List + Checkbox + Button patterns).

**Data display:** `Typography`, `Avatar`, `AvatarGroup`, `Badge`, `Chip`, `Divider`, `List`, `ListItem`, `ListItemButton`, `ListItemIcon`, `ListItemText`, `ListItemAvatar`, `ListItemSecondaryAction`, `Table`, `TableBody`, `TableCell`, `TableContainer`, `TableHead`, `TableRow`, `TablePagination`, `TableSortLabel`, `Tooltip`.

**Surfaces:** `Paper`, `Card`, `CardContent`, `CardActions`, `CardHeader`, `CardMedia`, `Accordion`, `AccordionSummary`, `AccordionDetails`, `AppBar`, `Toolbar`.

**Feedback:** `Alert`, `AlertTitle`, `Backdrop`, `Dialog`, `DialogTitle`, `DialogContent`, `DialogContentText`, `DialogActions`, `CircularProgress`, `LinearProgress`, `Skeleton`, `Snackbar`.

**Navigation:** `Link`, `Breadcrumbs`, `Menu`, `MenuList`, `MenuItem`, `ListItemIcon`, `ListItemText`, `Drawer`, `Pagination`, `BottomNavigation`, `BottomNavigationAction`, `SpeedDial`, `SpeedDialAction`, `SpeedDialIcon`, `Stepper`, `Step`, `StepLabel`, `StepContent`, `StepButton`, `Tabs`, `Tab`, `TabScrollButton`.

**Utils / behavior:** `Modal`, `Popover`, `Popper`, `ClickAwayListener`, `Collapse`, `Fade`, `Grow`, `Slide`, `Zoom`, `CssBaseline`, `NoSsr`, `Portal`.

**Styled / theme:** `styled`, `ThemeProvider` (prefer `OxygenUIThemeProvider`), theme types. `extendTheme` from MUI is available for extending; use only `AcrylicOrangeTheme` per this doc.

**Hooks (MUI):** `useTheme`, `useMediaQuery`, `useScrollTrigger`, etc. (all MUI hooks re-exported).

**Note:** `DataGrid`, date pickers, and tree view are not direct components; they are namespaced (see §5.4).

### 5.4 Namespace imports (avoid name clashes)

- **DataGrid (MUI X):**  
  `import { DataGrid } from '@wso2/oxygen-ui';` → use `DataGrid.DataGrid` (and other exports from `@mui/x-data-grid`).

- **Date pickers (MUI X):**  
  `import { DatePickers, AdapterDateFns } from '@wso2/oxygen-ui';`  
  Use `DatePickers.LocalizationProvider`, `DatePickers.DatePicker`, `DatePickers.TimePicker`, `DatePickers.DateTimePicker`. Wrap with `LocalizationProvider` and `dateAdapter={AdapterDateFns}`.

- **TreeView (MUI X):**  
  `import { TreeView } from '@wso2/oxygen-ui';`  
  Use `TreeView.SimpleTreeView`, `TreeView.TreeItem` (and other exports from `@mui/x-tree-view`).

- **colors:**  
  `import { colors } from '@wso2/oxygen-ui';`  
  Use as `colors.orange[500]`, etc. (see §4).

---

## 6. Icons (Lucide wrapper)

- **Package:** `@wso2/oxygen-ui-icons-react`  
- **Nature:** Wrapper around **Lucide React**; same icon set and API.  
- **Usage:** Prefer importing icons from `@wso2/oxygen-ui-icons-react` in Oxygen UI apps (so one icon dependency and consistent tree-shaking).  
- **Full list:** [lucide.dev/icons](https://lucide.dev/icons/).

```tsx
import { Home, Settings, ChevronDown, X } from '@wso2/oxygen-ui-icons-react';

<Home size={24} />
<Settings size={32} strokeWidth={2} color="currentColor" />
```

Common props: `size`, `color`, `strokeWidth`. Icons are tree-shakeable.

---

## 7. Contexts and hooks

### 7.1 Theme

- **OxygenUIThemeProvider** – Wraps the app; pass `theme={AcrylicOrangeTheme}`.
- **useThemeSwitcher** – Only when using `themes` prop (multiple themes). Returns `{ theme, currentTheme, themes, setTheme, isActive }`. `themes` is an array of `ThemeOption`: `{ key: string, label: string, theme: Theme }`. For Acrylic Orange only, use a single `theme` and optionally switch `data-color-scheme` for light/dark.
- **useTheme** – MUI hook; returns current theme (e.g. for `sx` or `theme.palette`).

### 7.2 App shell and notifications

- **useAppShell** – State for app shell (e.g. sidebar open/closed). Use with `AppShell`.
- **useNotifications** – For notification list/panel state. Use with `NotificationPanel` / `NotificationBanner`.

### 7.3 Theme content (e.g. code blocks)

- **useThemeContent** – Access current color scheme / theme for content (e.g. syntax theme in CodeBlock).

---

## 8. Utils

From `@wso2/oxygen-ui`:

- **pxToRem(size: number): string** – Converts px to rem (base 14).
- **formatRelativeTime(date: Date): string** – Returns strings like "5 minutes ago", "2 hours ago", or a locale date.

---

## 9. Animations

- **ParticleBackground** – Full component for particle effect background. Import from `@wso2/oxygen-ui`.

---

## 10. Summary for agents

- **Theme:** Use only **Acrylic Orange** (`AcrylicOrangeTheme`) with `OxygenUIThemeProvider`. Colors and typography in this doc are for that theme (light + dark).
- **Typography:** `'Inter Variable'`, 14px base; use the variant table for `Typography` (h1–h6, subtitle1/2, body1/2, caption, button, overline).
- **Colors:** Semantic colors from theme (`palette.primary`, `palette.text.primary`, etc.). Raw palettes via `colors` namespace (e.g. `colors.orange[500]`).
- **Components:** Prefer Oxygen custom components (AppShell, Header, Sidebar, PageTitle, ListingTable, Form.*, etc.) where they fit; otherwise use MUI components from `@wso2/oxygen-ui`. Use **DataGrid**, **DatePickers**, **TreeView** as namespaces.
- **Icons:** Import from `@wso2/oxygen-ui-icons-react` (Lucide wrapper). Do not use charts or eslint packages in this reference.
- **No charts:** Chart components are out of scope; do not document or rely on them here.
