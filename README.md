# 3D Real Estate Viewer

A portfolio-grade real estate experience for browsing apartments and inspecting their spatial layout through an interactive 3D viewer. The project is deliberately backend-free and uses a typed mock data layer, so it can run immediately while keeping clear seams for a future REST API and production GLB assets.

## Overview

**3D Real Estate Viewer** demonstrates the frontend architecture and interaction patterns expected from a commercial property product: property discovery, route-based detail pages, interactive room selection, synchronized sidebar state, floor context, view switching and a responsive premium UI.

The default apartment is generated procedurally with Three.js primitives. No remote model, image CDN or third-party content endpoint is required for the application to start.

## Features

- Property catalogue with typed mock inventory
- Route-based property viewer (`/properties/:id`)
- Interactive React Three Fiber scene
- Orbit, pan and zoom controls with damping
- Camera reset action
- Procedural apartment with separate selectable room meshes
- Hover and selected-room visual feedback
- Bi-directional room selection: 3D ↔ sidebar and floor plan ↔ sidebar
- Room metadata: area, floor, ceiling height, orientation and type
- Floor selector with state prepared for future per-floor assets
- Three view modes: **3D**, **Floor plan**, **Photos**
- Local photo placeholders; no fragile external image URLs
- Responsive desktop/tablet/mobile layout
- Loading, empty, not-found and viewer error states
- Strict TypeScript, ESLint and Prettier setup
- Feature-Sliced Design-inspired project organization
- GLB-ready model component using `useGLTF`

## Tech Stack

- React 18
- TypeScript (strict mode)
- Vite
- Three.js
- React Three Fiber
- `@react-three/drei`
- Zustand
- React Router
- MUI + Emotion
- ESLint
- Prettier

## Architecture

The project follows **Feature-Sliced Design** principles: business entities are separated from interaction features, composite widgets and route pages. Mock data lives in the entity model layer rather than UI components.

State ownership is intentionally split:

- Zustand stores cross-widget viewer state: selected property, room, floor and view mode.
- Ephemeral interaction state such as room hover stays local to the corresponding 3D component.
- Camera controls are held by the scene because they do not need application-wide persistence.

## Project Structure

```text
src/
├── app/
│   ├── providers/
│   ├── router/
│   ├── store/
│   └── styles/
├── pages/
│   ├── not-found/
│   ├── properties/
│   └── property-viewer/
├── widgets/
│   ├── floor-selector/
│   ├── property-info/
│   ├── property-list/
│   └── property-viewer/
│       └── ui/
│           ├── floor-plan/
│           ├── photos/
│           └── scene/
├── features/
│   ├── camera-controls/
│   ├── change-view/
│   └── select-room/
├── entities/
│   ├── floor/
│   ├── property/
│   └── room/
└── shared/
    ├── config/
    ├── lib/
    └── ui/

public/
├── models/
├── photos/
└── previews/
```

## Getting Started

Requirements:

- Node.js 20+ recommended
- npm 10+ recommended

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Available Scripts

```bash
npm run dev          # Start Vite development server
npm run build        # TypeScript project check + production build
npm run preview      # Preview the production build
npm run typecheck    # Run TypeScript without emitting files
npm run lint         # Run ESLint with zero warnings allowed
npm run format       # Format the repository with Prettier
npm run format:check # Check formatting without changing files
```

## 3D Model

The default implementation is `ProceduralApartment.tsx`. It uses native Three.js geometry through React Three Fiber and contains:

- four separately interactive room floor meshes;
- apartment perimeter and internal walls;
- lightweight furniture primitives;
- lighting, shadows and environment lighting;
- pointer interactions for hover and selection.

This keeps the repository fully runnable without shipping a large binary model.

## How to add a GLB model

### How to replace the procedural apartment with a GLB model

1. Place your file in `public/models`, for example:

   ```text
   public/models/apartment-7b.glb
   ```

2. Update the relevant property in `src/entities/property/model/mockProperties.ts`:

   ```ts
   modelSource: {
     type: 'glb',
     path: '/models/apartment-7b.glb',
     scale: 1,
   },
   ```

3. The viewer will render `GlbApartmentModel.tsx`, which loads the asset with `useGLTF`.

4. For production-grade room interaction, name room meshes consistently in Blender (for example `living-room`, `bedroom`, `kitchen`, `bathroom`) and map those mesh names to your typed room IDs. Keep selection state in Zustand and attach the same pointer handlers used by the procedural `RoomMesh` component.

5. If the GLB uses Draco or Meshopt compression, configure the corresponding loader support in the GLB component rather than moving loading logic into the page.

The repository intentionally does not preload a missing GLB path, so the default project never fails because an external model is absent.

## Environment Variables

No environment variables are required in the current mock-data version. `.env.example` documents the intended pattern for a future API base URL.

When a backend is added, expose only browser-safe variables with Vite's `VITE_` prefix.

## Future Improvements

- REST/GraphQL property repository with React Query
- Authenticated saved properties and comparison lists
- Real per-floor model variants and building stack navigation
- Mesh-name-to-room metadata mapping for production GLB files
- Camera presets and animated room focus transitions
- Measurement tool and dimension overlays
- WebXR / AR preview mode
- Photo lightbox and real media pipeline
- Search, filters, sorting and map-based inventory browsing
- Unit/integration tests with Vitest + React Testing Library
- End-to-end tests with Playwright
- Performance telemetry, model LODs and asset compression
- Accessibility audit for all non-canvas controls

## License

This repository is intended as a portfolio project. Add your preferred open-source license before publishing if you want others to reuse it.
