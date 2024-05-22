import { Database } from "sqlite3";
import { open } from "sqlite";
import { response } from "@/consts/Websockets/response";

let db: any = null;
export async function GET(request: Request, res: Response) {
  if (!db) {
    db = await open({
      filename: "./database/sqlite/guardify.db",
      driver: Database,
    });
  }

  const items = await db.all("SELECT * FROM instances", (error: any) => {
    if (error) {
      return new Response(
        JSON.stringify({
          status: response.INTERNAL_SERVER_ERROR,
          message: "Error",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500,
        },
      );
    }
  });

  return new Response(JSON.stringify({ status: response.OK, items: items }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

export async function POST(request: Request, res: Response) {
  const req = await request.json();
  if (!db) {
    db = await open({
      filename: "./database/sqlite/guardify.db",
      driver: Database,
    });
  }

  const { name, address, psk } = req;
  await db.run(
    "INSERT INTO instances VALUES (null, ?, ?, ?)",
    [name, address, psk],
    (error: any) => {
      if (error) {
        return new Response(
          JSON.stringify({
            status: response.INTERNAL_SERVER_ERROR,
            message: "Error",
          }),
          {
            headers: { "Content-Type": "application/json" },
            status: 500,
          },
        );
      }
    },
  );

  return new Response(JSON.stringify({ message: response.OK }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
