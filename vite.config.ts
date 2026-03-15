import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/api/calendar.ics": {
        target:
          "https://outlook.live.com/owa/calendar/f3f5efd3-6d6a-454a-abf8-b5289bd03ff1/a568adde-03aa-4bed-a595-58cdf59a3c18/cid-A91A68FA44BC2B3F/calendar.ics",
        changeOrigin: true,
        secure: true,
        rewrite: () => "",
      },
      "/api/news.xml": {
        target: "https://www.srf.ch/news/bnf/rss/1646",
        changeOrigin: true,
        secure: true,
        rewrite: () => "",
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
