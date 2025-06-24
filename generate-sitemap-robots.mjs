import * as glob from "glob";
import fs from "fs-extra";
import { SitemapStream, streamToPromise } from "sitemap";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.join(__dirname, "app");
const PUBLIC_DIR = path.join(__dirname, "public");

const baseUrl = "https://www.rainmakerz.app";

async function getDynamicRoutes() {
  try {
    const response = await fetch(`${baseUrl}/api/blogs`);
    const text = await response.text();

    const data = JSON.parse(text);
    return data.routes || [];
  } catch (error) {
    console.error("Error fetching dynamic routes:", error);
    return [];
  }
}

function removeSegment(url) {
  return url.replace(/\/\((.*?)\)\//g, "/").replace(/\/\((.*?)\)$/, "");
}

async function generateSitemap() {
  const staticPages = glob.sync(`${PAGES_DIR}/**/page.tsx`).map((page) => {
    const relativePath = path.relative(PAGES_DIR, page);
    return (
      "/" +
      relativePath.replace(/\/page\.tsx$/, "").replace(/\[(.*?)\]/g, ":$1")
    );
  });

  const dynamicRoutes = await getDynamicRoutes();

  const allPages = [...staticPages, ...dynamicRoutes]
    .filter(
      (url) =>
        !url.includes(":slug") &&
        !url.startsWith("/(auth)") &&
        !url.startsWith("/portal") &&
        !url.startsWith("/api")
    )
    .map(removeSegment);

  const urls = allPages.map((url) => ({
    url,
    changefreq: url === "/blog" ? "daily" : "monthly",
    priority: 0.7,
  }));

  const sitemapStream = new SitemapStream({ hostname: baseUrl });
  const sitemapPromise = streamToPromise(sitemapStream);

  urls.forEach((url) => sitemapStream.write(url));
  sitemapStream.end();

  const sitemap = await sitemapPromise;
  await fs.ensureDir(PUBLIC_DIR);
  await fs.writeFile(path.join(PUBLIC_DIR, "sitemap.xml"), sitemap.toString());
}

async function generateRobotsTxt() {
  const robotsTxtContent = `
    User-agent: *
    Disallow: /admin/
    Disallow: /portal/
    Disallow: /api/
    Sitemap: ${baseUrl}/sitemap.xml
  `.trim();
  await fs.writeFile(path.join(PUBLIC_DIR, "robots.txt"), robotsTxtContent);
}

async function generateFiles() {
  await generateSitemap();
  await generateRobotsTxt();
}

generateFiles()
  .then(() => console.log("Sitemap and robots.txt generated successfully"))
  .catch((err) =>
    console.error("Error generating sitemap and robots.txt", err)
  );