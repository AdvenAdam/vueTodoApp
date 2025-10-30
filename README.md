# Vue 3 Task Manager / Kanban Board

---

## Features

- **Kanban Board**: Drag-and-drop tasks between statuses.
- **Table View**: Inline editable task table with sorting.
- **Filtering**: Search tasks by title, status, type, priority, and developer.
- **Task Stats**: Visual progress bars by status, priority, and type.
- **Responsive Design**: Works on desktop and mobile.
- **Custom Components**: Reusable badge, checkbox, multiselect, and toolbar components.

---

## Tech Stack

- [Vue 3](https://v3.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/) — State management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [VueDraggable](https://github.com/SortableJS/vue.draggable.next) — Drag-and-drop
- [Lucide Icons](https://lucide.dev/) — Icons
- [Vue Date Picker](https://vuepic.github.io/vue-datepicker/) — Date selection
- [Vite](https://vitejs.dev/) — Build tool

---

## Project Structure

```text
src/
├─ components/        # Vue components (Badge, Checkbox, Toolbar, etc.)
├─ pages/             # Page components
├─ store/             # Pinia stores (taskStore, selectionStore)
├─ types/             # TypeScript interfaces
├─ App.vue            # Root component
├─ main.ts            # App entry point
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
```

### 2. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view in your browser.

### 3. Build for production

```bash
npm run build
# or
yarn build
```

### 4. Preview production build

```bash
npm run preview
# or
yarn preview
```

---

## Usage

- **Add a Task**: Click "Add Task" to create a new task.
- **Edit Task**: Click on a field in the table to edit inline.
- **Drag & Drop**: Move tasks between Kanban columns to update status.
- **Filter Tasks**: Use search bars to filter by title or developer.
- **Multi-select**: Select multiple tasks in the table to export, archive, or delete.

---
