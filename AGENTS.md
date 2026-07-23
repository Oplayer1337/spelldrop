# SPELLDROP project instructions

## Project goal

Build a polished one-page interactive landing page for a fictional spell delivery service.

The page must feel playful, clean and product-oriented. It should combine a modern digital product UI with magical material-style illustrations.

This is not a medieval fantasy website, an RPG interface or a generic SaaS template.

## Source of truth

Use the following sources in this priority order:

1. Figma design tokens and measurements.
2. Written reference notes in `/references/*.md`.
3. Approved screenshots in `/references/*.png`.
4. Existing implemented components.

Do not invent visual styles when the source material is ambiguous. Preserve consistency with already implemented sections.

## Visual direction

- Dark background with a subtle gradient from deep purple to warm dark brown.
- Clean background. Do not add shelves, books, plants, castles, clouds or decorative scenery unless explicitly shown in an approved reference.
- Use one geometric sans-serif typeface throughout the interface.
- Never introduce serif, fantasy, gothic or handwritten fonts.
- Illustrations use playful material-style forms with soft volume.
- Avoid excessive neon, bloom, glassmorphism, particles and glow.
- Use bright color primarily inside illustrations and selected states.
- UI surfaces remain restrained and readable.
- Selected options use a lime outline and a white circular checkmark.
- Keep generous negative space.

## Layout

- Maximum desktop content width: 1280px.
- Desktop side padding: 48px.
- Tablet side padding: 32px.
- Mobile side padding: 20px.
- Target breakpoints: 390px, 768px, 1024px, 1440px.
- Avoid horizontal scrolling at every supported width.
- Preserve visual hierarchy and breathing room.
- Do not compress desktop layouts by only scaling them down. Recompose them for mobile.

## Typography

Use the font configured in `src/styles/tokens.css`.

Do not replace or add fonts.

Typography hierarchy:

- Hero heading: large, bold, geometric.
- Section heading: bold and compact.
- Card titles: bold.
- Supporting text: regular and muted.
- Buttons: semibold.

Do not generate text as part of image assets.

## Architecture

- React + TypeScript + Vite.
- CSS Modules for component styling.
- Framer Motion only for subtle interaction feedback.
- Keep content data in `src/data`.
- Keep shared types in `src/types`.
- Keep reusable UI primitives in `src/ui`.
- Do not add a backend, authentication, database or API.
- Do not add dependencies unless necessary.

## Configurator behavior

The configurator is one section with multiple internal states:

1. Situation
2. Additional effects
3. Bottle size
4. Delivery method
5. Success state

Do not render these as separate pages.

Persist current choices while moving between steps.

Users must be able to return to previous steps without losing later-compatible selections.

The bottom summary panel must update after each selection.

## Interaction rules

Every interactive element must include:

- default
- hover
- focus-visible
- selected
- disabled states where relevant

Keyboard navigation must work.

Use semantic buttons for selectable options.

Use `aria-pressed` or appropriate radio/checkbox semantics.

Respect `prefers-reduced-motion`.

## Motion

Motion must be subtle and purposeful.

Allowed examples:

- 2–4px card lift on hover
- soft image movement
- selected checkmark entrance
- step transition fade/slide
- mascot reaction

Do not add continuous particle systems, parallax or large looping animations.

## Assets

Use only approved assets from `/public/assets`.

Do not embed full reference screenshots in the production UI.

Do not crop UI pieces from screenshots.

All interface elements must be implemented with HTML and CSS.

Image assets must have meaningful alt text unless decorative.

## Quality requirements

Before completing any task, run:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

When visual changes are made, also run Playwright screenshots at:

- 390x844
- 768x1024
- 1024x768
- 1440x1000

Compare the result against approved references.

## Restrictions

Do not:

- redesign unrelated sections
- change approved copy without request
- change colors outside design tokens
- introduce new radiuses or shadows without updating tokens
- use random emoji as production icons
- add decorative background objects
- use serif fonts
- overuse gradients or glow
- replace custom assets with generic icon libraries

## Working method

For tasks larger than one component:

1. Inspect relevant references.
2. Write a short implementation plan.
3. Implement the smallest complete slice.
4. Run validation.
5. Report changed files, validation results and remaining deviations.

When a reference cannot be reproduced exactly, explain the limitation instead of inventing a replacement.
