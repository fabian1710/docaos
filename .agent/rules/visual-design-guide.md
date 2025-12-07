---
trigger: always_on
---

# Visual Style Guide: The Analogue Librarian

> [!NOTE]
> This guide serves as the source of truth for the "Analogue Librarian" aesthetic. All UI decisions must align with the principles of 1970s–80s archival systems, tactile interactions, and "digital tools with an analogue soul."

## 1. Core Philosophy
**"Aesthetically 1975, Behaviorally 2025."**
The interface should feel like a well-organized oak desk. It is patient, orderly, and precise. It avoids modern corporate blandness in favor of warmth, texture, and character.

## 2. Color Palette (1970s Office)

### Surfaces (The Desk & Paper)
- **Manila Beige**: `#F0E6D2` (Main background/Folder color)
- **Paper White**: `#F9F7F1` (Document surfaces, never pure white)
- **Archival Grey**: `#E2E2DC` (Secondary backgrounds, dividers)
- **Tobacco Brown**: `#5D4037` (Dark mode alternative / Deep accents)

### Ink & Text
- **Typewriter Black**: `#2C2C2C` (Primary text, soft black)
- **Faded Stamp**: `#5A5A5A` (Secondary text)
- **Carbon Blue**: `#374151` (Accents, links)

### Functional Accents (The Office Supplies)
- **Olive Green**: `#556B2F` (Success, active states, "Approved")
- **Mustard Yellow**: `#D4A017` (Warnings, highlights, sticky notes)
- **Alert Red**: `#B22222` (Errors, "Rejected", red pen marks)
- **Folder Blue**: `#779ECB` (Tabs, organization)
- **Folder Pink**: `#F49AC2` (Tabs, organization)

## 3. Typography

### Primary (Headings & Labels)
**Font**: *Courier Prime*, *Special Elite*, or *IBM Plex Mono* (Typewriter style)
- Used for: Document titles, folder tabs, stamps, headers.
- Vibe: Mechanical, precise, "struck onto paper".

### Secondary (Body & UI)
**Font**: *Inter* or *Public Sans* (Clean, readable, but utilitarian) OR *Newsreader* (Serif for long reading).
- *Constraint*: If using Sans, keep it neutral to let the Typewriter font carry the personality.
- *Alternative*: A condensed sans like *Oswald* or *Roboto Condensed* for "Library Labels".

## 4. Textures & Materials
The app is not flat. It has "grain".
- **Paper Grain**: Subtle noise overlay on all paper surfaces.
- **Shadows**: Soft, diffuse shadows (ambient occlusion) to show depth of stacked papers.
- **Borders**: 1px solid lines, often doubled or slightly imperfect to mimic printed forms.

## 5. Layout Principles (The Desk Metaphor)

### Navigation: The Folder Stack (Left)
- **No Sidebars**: Navigation is a vertical stack of "Folder Tabs" on the left.
- **Active State**: The active folder "slides out" or is visually on top.
- **Inactive State**: Tucked away, only tab visible.

### Workspace: The Desk Surface (Center)
- The main view is a "sheet of paper" or "index card" resting on the desk.
- **Margins**: Generous, breathing room.
- **Depth**: The document sits *on top* of the desk background.

### Tools: The Analogue Toolbar (Top/Right)
- Icons look like physical objects: Pencil (Edit), Magnifying Glass (Search), Paperclip (Attach).
- Actions feel like using a tool, not clicking a button.

## 6. Component Styles

### Buttons
- **Primary**: Looks like a stamped label or a tactile physical button (slight bevel).
- **Secondary**: Simple text with a pencil underline or a "ghost" stamp.
- **Destructive**: A red "X" or "Void" stamp style.

### Inputs
- Look like form fields on a government document.
- Underlined or boxed with a slightly yellow/off-white background.
- Focus state: A "hand-drawn" highlight or darker ink border.

### Dialogs
- **The Envelope/Card**: Appears as a physical card placed on top of the work.
- **Backdrop**: Darkened desk, slightly blurred.

### Chips/Tags
- Look like "Label Maker" tape (embossed text on colored plastic) or sticky tabs.

## 7. Motion & Interaction
- **Sliding**: Folders and papers slide, they don't fade.
- **Snapping**: Things click into place with a satisfying "thud" (visual/audio).
- **Instant**: No artificial loading spinners if possible. If needed, use a "stamping" animation.
