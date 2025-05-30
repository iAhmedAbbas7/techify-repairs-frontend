import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
// Defining __filename & __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    fs: {
      allow: [
        path.resolve(__dirname),
        path.resolve(__dirname, "../TechNotes-Backend-Ex/uploads"),
      ],
    },
  },
});
