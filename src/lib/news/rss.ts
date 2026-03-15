import type { NewsItem } from "@/types/news";

const RSS_URL = "/api/news.xml";

function getText(parent: Element, tagName: string) {
  return parent.querySelector(tagName)?.textContent?.trim() || "";
}

export async function fetchNews(): Promise<NewsItem[]> {
  const response = await fetch(RSS_URL);

  if (!response.ok) {
    throw new Error(`News Feed konnte nicht geladen werden: ${response.status}`);
  }

  const xmlText = await response.text();

  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "application/xml");

  const parseError = xml.querySelector("parsererror");
  if (parseError) {
    throw new Error("RSS XML konnte nicht geparst werden");
  }

  const items = Array.from(xml.querySelectorAll("item")).slice(0, 8);

  return items.map((item) => ({
    title: getText(item, "title"),
    link: getText(item, "link"),
    pubDate: getText(item, "pubDate"),
  }));
}
