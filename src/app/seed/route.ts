import postgres from "postgres";
import { fetchRaces } from "../../../lib/sheets";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedRaces() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
      CREATE TABLE IF NOT EXISTS races (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        character TINYTEXT NOT NULL,
        vehicle TINYTEXT NOT NULL,
        wheels TINYTEXT NOT NULL,
        glider TINYTEXT NOT NULL,
        racer TINYTEXT NOT NULL,
        controller_color TINYTEXT NOT NULL,
        map TINYTEXT NOT NULL,
        place: TINYINT NOT NULL,
        cc: TINYINT NOT NULL,
        com TEXT NOT NULL,
        date: DATE NOT NULL,
        racer_count: TINYINT NOT NULL,
        auto_steering BOOL NOT NULL,
        stick_steering: BOOL NOT NULL,
        auto_drive: BOOL NOT NULL,
        randomized: BOOL NOT NULL
      );
    `;

  const races = await fetchRaces();
  if (races != undefined) {
    const insertedRaces = await Promise.all(
      races.map(async (race) => {
        return sql`
          INSERT INTO users (id, ${Object(race).keys.join(", ")})
          VALUES (${Object(race).values.join(", ")})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );
    return insertedRaces;
  }
}

export async function GET() {
  try {
    return Response.json(await fetchRaces());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
