import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Return all meals
  const stmt = db.prepare("SELECT * FROM meals");
  return stmt.all();
}
