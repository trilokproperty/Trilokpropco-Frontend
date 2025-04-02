import fetch from "node-fetch";
import fs from "fs";
import { endPoint } from "./src/Component/ForAll/ForAll.js";
import https from "https";

const PAGES = ["/", "properties", "services", "blog", "about", "contact"];

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

async function fetchSEOData() {
  try {
    for (const page of PAGES) {
      const url = `${endPoint}/meta/slug/${page === "/" ? "home" : page}`;

      const response = await fetch(url, { agent: httpsAgent });
      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("❌ API did not return JSON. Possible error page:", text);
        continue;
      }

      const filename = page === "/" ? "home" : page.replace(/\//g, "_");
      fs.writeFileSync(`./public/seo${filename}.json`, JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("❌ Error fetching SEO data:", error);
  }
}

fetchSEOData();
