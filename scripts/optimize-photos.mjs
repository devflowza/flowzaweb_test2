/**
 * Photography pipeline: converts the branded shots in ../images to WebP.
 *
 * One asset per photograph at its native 3:2 — every crop (1:1 card, 4:5 hero,
 * 16:7 banner) is done in CSS via object-fit/object-position, so changing a
 * ratio later costs nothing and no photo is stored twice.
 *
 * Run: npm run optimize:photos
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve(import.meta.dirname, "../../images");
const SRC_V2 = path.resolve(SRC, "v2");
const SRC_LOCATIONS = path.resolve(import.meta.dirname, "../Photos/Locations");
const OUT = path.resolve(import.meta.dirname, "../public/images/photos");

/** [source file, output name] — Finance2.png is deliberately excluded: it is a
 *  marketing poster with a baked-in headline, unusable as a section image. */
const PHOTOS = [
  ["finance.png", "finance.webp"],
  ["logispro.png", "logispro.webp"],
  ["spamaster.png", "spamaster.webp"],
  ["fleetza.png", "fleetza.webp"],
  ["QR1.png", "qrforge.webp"],
  ["pos.png", "pos-cafe.webp"],
  ["POS+.png", "pos-retail.webp"],
  ["Club.png", "club.webp"],
  ["Qr2.png", "brand-expo.webp"],
];

/** RentFlow and PMS renders (AI-generated product mockups, prompted to match
 *  the shoot's lighting/style and the site's teal accent) — sourced from
 *  ../../images/v2, same treatment otherwise. Card and banner are deliberately
 *  different source photos, not two crops of one shot — matching the POS
 *  precedent above (pos-cafe.webp / pos-retail.webp). */
const PHOTOS_V2 = [
  ["RentFlow propertyrental applications.png", "rentflow.webp"],
  ["Optional second angle.png", "rentflow-review.webp"],
  ["FlowZa PMS.png", "pms.webp"],
  ["angle2.png", "pms-verify.webp"],
];

/** Office-city photography for the location picker and /locations —
 *  sources live in-repo under Photos/Locations (user-supplied). */
const PHOTOS_LOCATIONS = [
  ["Bangalore.png", "location-bengaluru.webp"],
  ["Oman.png", "location-muscat.webp"],
  ["Dubai.png", "location-dubai.webp"],
];

/** About-page section backgrounds — sources in-repo under Photos/About Page. */
const SRC_ABOUT = path.resolve(import.meta.dirname, "../Photos/About Page");
const PHOTOS_ABOUT = [
  ["About Landing Background Image.png", "about-hero-bg.webp"],
  ["Our Mission Section Background.png", "about-mission-bg.webp"],
  ["What we stand for background.png", "about-values-bg.webp"],
];

await mkdir(OUT, { recursive: true });

for (const [srcDir, list] of [
  [SRC, PHOTOS],
  [SRC_V2, PHOTOS_V2],
  [SRC_LOCATIONS, PHOTOS_LOCATIONS],
  [SRC_ABOUT, PHOTOS_ABOUT],
]) {
  for (const [src, out] of list) {
    const dest = path.join(OUT, out);
    const info = await sharp(path.join(srcDir, src))
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(dest);
    console.log(
      `${out.padEnd(20)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`,
    );
  }
}
