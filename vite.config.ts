import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";

const ENTRY_DIRS = [
  "Components",
  "Constants.ts",
  "Mutations.ts",
  "Pages",
  "Hooks",
  "Queries.ts",
  "Services.ts",
  "Styles",
  "Types.ts",
  "Utils.ts",
];

const alias = ENTRY_DIRS.map((entry) => ({
  find: `@${entry.replace(".ts", "")}`,
  replacement: `/src/${entry.toLowerCase()}`,
}));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias,
  },
  server: {
    port: 7777,
    open: true,
  },
  preview: {
    port: 7373,
  },
});
