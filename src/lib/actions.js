"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function validateFormData(data) {
  const errors = [];

  if (
    !data.title ||
    !data.summary ||
    !data.instructions ||
    !data.creator ||
    !data.creator_email ||
    !data.image
  ) {
    errors.push("All fields are required");
  }
  if (data.title.length < 5) {
    errors.push("Title must be at least 5 characters long");
  }
  if (data.summary.length < 10) {
    errors.push("Summary must be at least 10 characters long");
  }
  if (data.instructions.length < 10) {
    errors.push("Instructions must be at least 10 characters long");
  }
  if (data.creator.length < 2) {
    errors.push("Name must be at least 2 characters long");
  }
  if (data.creator_email.length < 5) {
    errors.push("Invalid email");
  }
  if (!data.creator_email.includes("@")) {
    errors.push("Invalid email");
  }
  if (data.image.size === 0) {
    errors.push("Image is required");
  }

  return errors;
}

export async function shareMealAction(preState, formData) {
  const { name, email, title, summary, instructions, image } = Object.fromEntries(formData);
  const meal = { title, summary, instructions, image, creator: name, creator_email: email };

  const errors = validateFormData(meal);

  if (errors.length > 0) {
    return { data: Object.fromEntries(formData), errors };
  }

  revalidatePath("/meals", "layout");
  await saveMeal(meal);
  redirect("/meals");
}
