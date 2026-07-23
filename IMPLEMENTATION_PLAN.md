# Implementation plan

## Phase 1 — Foundation

- Initialize Vite React TypeScript project.
- Add ESLint, Vitest and Playwright.
- Add global tokens.
- Add font loading.
- Implement page container and background.
- Implement Header.

Definition of done:
- Build passes.
- Header matches desktop and mobile reference.
- No horizontal scrolling.

## Phase 2 — Hero

- Implement hero typography.
- Add hero mascot asset.
- Add order status card.
- Add CTA scroll behavior.

Definition of done:
- Matches reference at 1440px.
- Mobile layout is recomposed, not scaled.
- CTA focuses configurator.

## Phase 3 — Configurator foundation

- Add state machine.
- Add step indicator.
- Add reusable SelectionCard.
- Add BottomSummary.
- Support forward and backward navigation.

## Phase 4 — Situation step

- Add six situation cards.
- Add selection state.
- Add accessible radio behavior.
- Update summary panel.

## Phase 5 — Effects step

- Allow 1–3 selections.
- Add disabled continuation when none selected.
- Update summary chips.

## Phase 6 — Bottle step

- Add S, M and L options.
- Use three horizontal cards on desktop.
- Recompose to horizontal scroll or stacked layout on mobile.

## Phase 7 — Delivery step

- Add Owl, Express and Teleport as horizontal rows.
- Show ETA, price and short benefit.
- Keep sticky order summary panel.
- Confirm order action.

## Phase 8 — Success and footer

- Replace configurator content with success state.
- Add compact progress tracker.
- Add safety + AI Worklog lower section.
- Add footer.

## Phase 9 — QA

- Keyboard navigation.
- Reduced motion.
- Responsive screenshots.
- Image optimization.
- Lighthouse review.
- Final content review.
