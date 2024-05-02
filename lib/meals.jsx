import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay
  //   throw new Error("Error getting meals");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructionss = xss(meal.instructions);

  const extention = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extention}`;

  const bufferImage = await meal.image.arrayBuffer();

  fs.createWriteStream(`public/images/${fileName}`).write(
    Buffer.from(bufferImage),
    (err) => {
      if (err) {
        throw new Error("Failed to upload image.");
      }
    }
  );

  meal.image = `/images/${fileName}`;
  console.log(meal);

  const response = await fetch(`${process.env.URL}/meals/share`, {
    method: "POST",
    body: JSON.stringify(meal),
    headers: { "Content-Type": "application/json" },
  });

  console.log(response);

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const data = await response.json();

  console.log(data);

  // db.prepare(
  //   `
  //   INSERT INTO meals
  //     (title, summary, instructions, creator, creator_email, image, slug)
  //   VALUES (
  //     @title,
  //     @summary,
  //     @instructions,
  //     @creator,
  //     @creator_email,
  //     @image,
  //     @slug
  //   )
  // `
  // ).run(meal);
}
