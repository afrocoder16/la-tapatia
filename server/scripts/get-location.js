/* Lists the Square locations for the configured access token.
   Run once (`npm run location`) and copy the ID into SQUARE_LOCATION_ID. */
import "dotenv/config";
import { SquareClient, SquareEnvironment } from "square";

const token = process.env.SQUARE_ACCESS_TOKEN;
if (!token) {
  console.error("Missing SQUARE_ACCESS_TOKEN in .env");
  process.exit(1);
}

const client = new SquareClient({
  token,
  environment:
    process.env.SQUARE_ENVIRONMENT === "production"
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

try {
  const res = await client.locations.list();
  const locations = res.locations || [];
  if (!locations.length) {
    console.log("No locations found for this token.");
    process.exit(0);
  }
  console.log("Locations for this token:\n");
  for (const loc of locations) {
    console.log(`  ID:       ${loc.id}`);
    console.log(`  Name:     ${loc.name}`);
    console.log(`  Status:   ${loc.status}`);
    console.log(`  Currency: ${loc.currency}`);
    console.log("");
  }
  console.log("Copy the ID you want into SQUARE_LOCATION_ID in server/.env");
} catch (err) {
  console.error("Failed to list locations:", err?.message || err);
  if (err?.errors) console.error(JSON.stringify(err.errors, null, 2));
  process.exit(1);
}
