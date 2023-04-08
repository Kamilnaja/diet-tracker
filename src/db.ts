const sqlite3 = require("sqlite3").verbose();

export let db = new sqlite3.Database("test.db", (err: any) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the test database.");
});
