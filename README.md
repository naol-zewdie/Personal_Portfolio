# Naol Zewdie · Portfolio

Personal site: selected work, the six-month robotics and autonomy roadmap, a short Q&A and a contact form.

React 19 + Vite, Tailwind CSS 4, Framer Motion for entrance animations, Lucide icons. The pixel sky in the hero is a small canvas component with no dependencies.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Edit the content

Everything personal is data, not markup:

| What | Where |
|---|---|
| Name, email, links, Q&A, stack | `src/data/profile.js` |
| Projects (add one: screenshot in `src/assets/work/`, then an entry) | `src/data/projects.js` |
| Roadmap months and their status (`now` / `next` / `done`, optional `link`) | `src/data/roadmap.js` |

The contact form posts to FormSubmit using the email in `profile.js`.
