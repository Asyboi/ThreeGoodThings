# Page Design Spec — Modern UI Refresh (Desktop-first)

## Global Styles (Design System)

### Design tokens (keep existing palette)

* Background: `#242424` (keep)

* Surface-1 (cards/menus): `#1a1a1a`

* Surface-2 (inputs on dark pages): `#2a2a2a`

* Text primary on dark: `rgba(255,255,255,0.87)` (keep)

* Text muted on dark: `rgba(255,255,255,0.68)`

* Accent (primary): `#4f63f7` (keep)

* Accent hover: `#3b4cc0` (keep)

* Link: `#646cff` (keep)

* Border on dark: `rgba(255,255,255,0.10)`

* Focus ring: `0 0 0 3px rgba(79,99,247,0.45)`

### Typography

* Continue Inter/system stack.

* Prefer a consistent scale: H1 32–40, H2 24–28, body 16–18.

* Default body alignment: left for long text blocks; keep centered text only for hero/error screens.

### Spacing & layout

* Use an 8px grid: 8/16/24/32/48.

* Content width: `max-width: 960px` for page content; `max-width: 420px` for auth cards.

* Reduce duplicated page-level CSS by standardizing reusable patterns: `page`, `page__content`, `card`, `stack`, `cluster`.

### Components (global behavior)

* Buttons: remove global `button { width: 100%; max-width: 300px; }` coupling; instead introduce explicit variants:

  * Primary: accent background

  * Secondary: surface + border

  * Destructive: red background (logout)

  * Disabled: lower opacity + `cursor: not-allowed`

* Inputs/Textareas:

  * Always show focus ring

  * Use consistent border radius (12px) and padding (12–14px)

  * Placeholder color muted

* Motion: subtle 150–200ms transitions (color, shadow, transform on hover).

***

## Page: Navigation (Header)

### Layout

* Keep current top header and right-aligned settings.

* Use Flexbox: left cluster (brand + nav links), right cluster (settings).

### Meta information

* Title: follows current route (e.g., “Home • Three Good Things”).

* Description: short app tagline.

### Sections & components

1. Brand area (left)

   * Text logo “Three Good Things” (same color scheme).

   * Click navigates to Home when logged in.
2. Primary nav links

   * Keep “Home” and “About” visibility rules.

   * Add active state: underline or accent pill background.
3. Settings button + dropdown

   * Increase click target to 40x40.

   * Dropdown uses Surface-1 background, border, and 8px radius.

   * Menu items styled as buttons with hover + focus states.

Component-level changes

* Add keyboard support: ESC closes menu; focus moves into menu on open.

* Ensure nav remains readable on desktop (avoid stacking unless narrow screens).

***

## Page: Login

### Layout

* Centered card on dark background (keep).

* Card uses white background as today, but unify radius/shadow with system tokens.

### Sections & components

1. Card header

   * Title + short subtitle (optional, same copy theme).
2. Form

   * Labeled inputs (keep placeholders, add labels visually).

   * Primary CTA button.
3. Footer link

   * Link styling consistent with global tokens.

Component-level changes

* Support “Enter to submit”.

* Add loading/disabled state on submit (visual only).

* Replace `alert()` styling with inline error message area (same content).

***

## Page: Create Account

### Layout

* Match Login page layout and card styling exactly.

### Sections & components

* Same as Login, with 3 inputs.

Component-level changes

* Inline error message region instead of `alert()`.

* Clarify link casing consistency (“/login” not “/Login”).

***

## Page: Home

### Layout

* Keep centered hero layout.

* Use a constrained content width and clear button hierarchy.

### Sections & components

1. Hero

   * Title + short description.
2. Primary actions

   * Two primary buttons (equal weight) in a responsive row on desktop.
3. Secondary/destructive action

   * Logout visually separated below (destructive style always, not only on hover).

Component-level changes

* Standardize button sizing: same height, same radius, consistent hover.

* Add subtle surface container behind content (optional) for depth without changing layout.

***

## Page: Log Entry

### Layout

* Keep 3 textarea cards.

* Desktop: 3-column row when space allows; wraps gracefully.

### Sections & components

1. Page title
2. Entry grid

   * Each entry shows a small label/number above textarea.

   * Textarea uses consistent surface + focus ring.
3. Save action

   * Primary button; shows success state (e.g., temporary “Saved”).

Component-level changes

* Improve textarea contrast: avoid very light textarea against dark page unless intentionally “paper-like”; if kept, soften border and add subtle shadow.

* Ensure the Save button is aligned and not overly wide.

***

## Page: Past Logs

### Layout

* Keep MM/DD/YYYY input cluster.

* Desktop: inputs in one row, equal width, aligned baselines.

### Sections & components

1. Title + helper note
2. Date inputs
3. Find button
4. Results panel

   * Use a bordered card/surface with clearer typography and spacing.

Component-level changes

* Add empty state copy when no results are shown yet.

* Improve result hierarchy: date as heading, entries as a list with consistent spacing.

***

## Page: About

### Layout

* Keep stacked text layout.

* Switch paragraph alignment to left on desktop within a constrained column for readability.

### Sections & components

* Title

* Content block (Surface-1 card optional) with 60–75 character line length.

***

## Page: Not Found

### Layout

* Keep centered message.

### Sections & components

* Message text

* Recovery CTA: “Go Home” button (only if logged in), preserving overall layout.

