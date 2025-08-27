import { Suspense } from "react";
import { getMealbySlug } from "@/lib/meals";
import Image from "next/image";
import classes from "./page.module.css";
import { notFound } from "next/navigation";

// This tells Next.js to cache the page and revalidate it at most every hour.
// This will prevent re-fetching data on every visit for a pre-visited meal.
// export const revalidate = 3600; // 1 hour

async function FetchMealData({ slug }) {
  const mealData = await getMealbySlug(slug);
  if (!mealData) {
    return notFound();
  }

  mealData.instructions = mealData.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={mealData.image} alt={mealData.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{mealData.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${mealData.creator_email}`}>{mealData.creator}</a>{" "}
          </p>
          <p className={classes.summary}>{mealData.summary}</p>
        </div>
      </header>
      <main className={classes.main}>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: mealData.instructions }}
        ></p>
      </main>
    </>
  );
}

export default async function MealDetailsPage({ params }) {
  const param = await params;

  return (
    <Suspense fallback={<p className={classes.loading}>Loading...</p>}>
      <FetchMealData slug={param.mealSlug} />
    </Suspense>
  );
}
