import { responseStatus } from "@/consts/Websockets/responseStatus";
import { open } from "sqlite";
import { Database } from "sqlite3";

let db: any = null;
export async function GET(_: Request, route: { params: { id: string } }) {
  const id: number = Number(route.params.id);
  if (!db) {
    db = await open({
      filename: "./database/sqlite/guardify.db",
      driver: Database,
    });
  }

  const items = await db.all(
    `SELECT id, name, address FROM instances WHERE id = ${id}`,
    (error: any) => {
      if (error) {
        return new Response(
          JSON.stringify({
            status: responseStatus.INTERNAL_SERVER_ERROR,
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

  return new Response(
    JSON.stringify({ status: responseStatus.OK, items: items }),
    {
      headers: { "Content-Type": "application/json" },
      status: 200,
    },
  );
}
