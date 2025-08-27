import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Return all meals
  const stmt = db.prepare("SELECT * FROM meals");
  return stmt.all();
}

export async function getMealbySlug(slug) {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // const stmt = db.prepare("SELECT 8 FROM meals WHERE slug = @slug");
  // return stmt.get({ slug });

  const stmt = db.prepare("SELECT * FROM meals WHERE slug = ?");
  return stmt.get(slug);
}
