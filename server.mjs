import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 4173);

const CALENDAR_ICS_URL = process.env.CALENDAR_ICS_URL;
const NEWS_RSS_URL =
  process.env.NEWS_RSS_URL || "https://www.srf.ch/news/bnf/rss/1646";
const HUE_BRIDGE_IP = process.env.HUE_BRIDGE_IP;
const HUE_USERNAME = process.env.HUE_USERNAME;

if (!CALENDAR_ICS_URL) {
  console.error("Missing CALENDAR_ICS_URL in environment");
  process.exit(1);
}

if (!HUE_BRIDGE_IP || !HUE_USERNAME) {
  console.error("Missing HUE_BRIDGE_IP or HUE_USERNAME in environment");
  process.exit(1);
}

app.disable("x-powered-by");
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use(
  "/api/calendar.ics",
  createProxyMiddleware({
    target: CALENDAR_ICS_URL,
    changeOrigin: true,
    secure: true,
    pathRewrite: () => "",
  })
);

app.use(
  "/api/news.xml",
  createProxyMiddleware({
    target: NEWS_RSS_URL,
    changeOrigin: true,
    secure: true,
    pathRewrite: () => "",
  })
);

app.use(
  "/api/hue",
  createProxyMiddleware({
    target: `http://${HUE_BRIDGE_IP}/api/${HUE_USERNAME}`,
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      "^/api/hue": "",
    },
  })
);

app.use(
  express.static(path.join(__dirname, "dist"), {
    index: "index.html",
  })
);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`family-glow-display running on http://localhost:${PORT}`);
});
