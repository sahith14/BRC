// Throwaway connectivity check. Run: node scripts/check-mongo.mjs
import fs from "node:fs";
import { MongoClient } from "mongodb";

// Tiny .env.local loader (avoid dotenv dependency).
const env = Object.fromEntries(
  fs
    .readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const uri = env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not set in .env.local");
  process.exit(2);
}

const t0 = Date.now();
const client = new MongoClient(uri);
try {
  await client.connect();
  const db = client.db("brc_platform");
  const col = db.collection("app_state");
  const doc = await col.findOne({ _id: "master_db" }, { projection: { _id: 1, updatedAt: 1 } });
  console.log("connected in", Date.now() - t0, "ms");
  console.log("master_db doc:", doc ? `present, updatedAt=${doc.updatedAt}` : "missing (will be seeded on first request)");
} catch (err) {
  console.error("MONGO FAIL:", err.message);
  process.exit(1);
} finally {
  await client.close();
}
