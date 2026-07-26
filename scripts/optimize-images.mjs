/**
 * One-off asset pipeline: pulls source imagery from ../website-content and emits
 * optimized WebP into public/images. Run: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve(import.meta.dirname, "../../website-content");
const OUT = path.resolve(import.meta.dirname, "../public/images");

/** [source, output, maxWidth] */
const JOBS = [
  // Product hero imagery
  ["public/product-finance.webp", "products/finance.webp", 1600],
  ["public/logispro-hero.png", "products/logispro.webp", 1600],
  ["public/SpaMaster.png", "products/spamaster.webp", 1600],
  ["public/POS_image.png", "products/pos.webp", 1600],
  ["public/Fleetza.png", "products/fleetza.webp", 1600],
  ["public/product-qrforge.webp", "products/qrforge.webp", 1600],
  // Brand
  ["public/Logo_Final_-_Focused.jpeg", "brand/logo.webp", 512],
  // Finance flagship screenshots
  ["src/assets/01_Dashboard.png", "finance/dashboard.webp", 1800],
  ["src/assets/04_p&l.png", "finance/pnl.webp", 1800],
  ["src/assets/03_Items.png", "finance/items.webp", 1800],
  ["src/assets/02_Dashboard.png", "finance/invoices-expenses.webp", 1800],
  [
    "src/assets/files_8036418-2026-03-19T09-46-40-522Z-15_Purchase_Orders.webp",
    "finance/purchase-orders.webp",
    1800,
  ],
  [
    "src/assets/files_8036418-2026-03-19T09-45-44-330Z-06_Project_Management.png",
    "finance/projects.webp",
    1800,
  ],
  ["src/assets/07_Quotes.png", "finance/quotes.webp", 1800],
  [
    "src/assets/files_8036418-2026-03-19T09-44-19-018Z-09_Invoices_Management.webp",
    "finance/invoices.webp",
    1800,
  ],
  [
    "src/assets/files_8036418-2026-03-19T09-42-49-663Z-10_Invoice_Workflow.png",
    "finance/invoice-workflow.webp",
    1800,
  ],
  ["src/assets/11_VAT_Compliance.png", "finance/vat-compliance.webp", 1800],
];

for (const [src, out, width] of JOBS) {
  const dest = path.join(OUT, out);
  await mkdir(path.dirname(dest), { recursive: true });
  const img = sharp(path.join(SRC, src));
  const meta = await img.metadata();
  const info = await img
    .resize({ width: Math.min(width, meta.width ?? width), withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(dest);
  console.log(`${out} — ${meta.width}px → ${info.width}px, ${(info.size / 1024).toFixed(0)} KB`);
}
