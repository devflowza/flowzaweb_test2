import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Incremental cache is unnecessary for a fully static marketing site;
  // enable R2 incremental cache here if ISR is ever introduced.
});
