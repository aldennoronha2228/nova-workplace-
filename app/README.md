CircuitEngine is a Next.js App Router frontend for a hardware engineering IDE experience.

## Getting Started

Run the development server:

```bash
npm run dev
```

Then visit `http://localhost:3000/workspace`.

## Workspace Highlights

- IDE-style layout with top navigation, explorer, and workspace canvas.
- Monaco editor for firmware files and React Flow for circuit diagrams.
- AI assistant panel with streaming mock responses.
- Terminal tabs for build, serial, debug, and AI logs.

## Routes

- `/workspace`
- `/workspace/[projectId]`
- `/workspace/[projectId]/code`
- `/workspace/[projectId]/diagram`
- `/workspace/[projectId]/components`
- `/workspace/[projectId]/simulation`
- `/workspace/[projectId]/assembly`
- `/workspace/[projectId]/settings`
