import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

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

export async function saveMeal(meal) {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  meal.slug = slugify(meal.title, { lower: true });
  meal.summary = xss(meal.summary);
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const filename = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${filename}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Error while saving the image");
    }
  });

  meal.image = `/images/${filename}`;

  const stmt = db.prepare(
    `INSERT INTO meals (slug, title, image, summary, instructions, creator, creator_email)
    VALUES (@slug, @title, @image, @summary, @instructions, @creator, @creator_email)`
  );

  stmt.run(meal);
}
