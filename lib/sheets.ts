import { google, sheets_v4 } from "googleapis";
import { Race_Entry } from "./definition";

var sheets: sheets_v4.Sheets;

async function initSheets() {
  let keys = JSON.parse(process.env.SHEETS_SECRET!);
  const auth = await google.auth.getClient({
    projectId: keys.project_id,
    credentials: {
      type: "service_account",
      private_key: keys.private_key,
      client_email: keys.client_email,
      client_id: keys.client_id,
      token_url: keys.token_uri,
      universe_domain: "googleapis.com",
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  sheets = google.sheets({ version: "v4", auth });
}

export async function fetchRaces() {
  if (!sheets) {
    await initSheets();
  }
  try {
    // copy your spreadshset id here
    // and update the range based on the sheet name and colums used
    const data = await sheets.spreadsheets.values.get({
      spreadsheetId: "1_wTvmPVDOWBvTV3idi_Fl-mZ8AtT-xffsqA1OhtnLe4",
      range: "Nick & Co.!A:P",
    });

    const results = data.data.values?.map((row) => {
      return {
        character: row[0],
        vehicle: row[1],
        wheels: row[2],
        glider: row[3],
        racer: row[4],
        controller_color: row[5],
        map: row[6],
        place: row[7],
        cc: row[8],
        com: row[9],
        date: row[10],
        racer_count: row[11],
        auto_steering: row[12],
        stick_steering: row[13],
        auto_drive: row[14],
        randomized: row[15],
      } as Race_Entry;
    });

    console.log(results?.slice(1));
    return results?.slice(1);
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch sheets.`);
  }
}
