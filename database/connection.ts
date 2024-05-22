const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./sqlite/guardify.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (error: any) => {
    if (error) {
      return console.error(error.message);
    }
    console.log("Connected to the SQlite database.");
  },
);

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS instances (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, address TEXT, psk TEXT)",
    (error: any) => {
      if (error) {
        return console.error(error.message);
      }
      console.log("Created instances table.");
    },
  );
});

db.close((error: any) => {
  if (error) {
    return console.error(error.message);
  }
  console.log("Closed the database connection.");
});
