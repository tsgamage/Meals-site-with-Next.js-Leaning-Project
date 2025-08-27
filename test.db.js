import sql from "better-sqlite3";

const db = sql("meals.db");

console.log(db);

const stmt = db.prepare("SELECT * FROM meals");

console.log(stmt.all());
