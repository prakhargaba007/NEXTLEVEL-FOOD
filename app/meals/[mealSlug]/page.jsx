import Link from "next/link";
import classes from "./page.module.css";
import Image from "next/image";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  // const meals = getMeal(params.mealSlug);

  // if (!meals) {
  //   notFound();
  // }

  // console.log(params);

  const meals = await fetch(`https://nextlevel-food-backend.onrender.com/meals/` + params);

  return {
    title: meals.title,
    description: meals.summary,
  };
}

async function MealDetailsPage({ params }) {
  // console.log(params.mealSlug);

  const response = await fetch(
    "https://nextlevel-food-backend.onrender.com/meals/getPost/" + params.mealSlug
  );

  const resData = await response.json();
  // console.log(resData);
  const meals = resData.meal[0];
  // console.log("meals", meals);

  meals.instructions = meals.instructions.replace(/\n/g, "<br />");
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meals.image} alt={meals.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meals.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meals.creator_emails}`}>{meals.creator}</a>
          </p>
          <p className={classes.summary}>{meals.summary}</p>
        </div>
      </header>
      <main className={classes.instructions1}>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meals.instructions,
          }}
        ></p>
      </main>
    </>
  );
}

export default MealDetailsPage;
