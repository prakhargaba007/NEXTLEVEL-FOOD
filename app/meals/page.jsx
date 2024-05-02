"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";

async function fetchMeals() {
  try {
    const response = await fetch(`https://nextlevel-food-backend.onrender.com/meals/`);
    if (!response.ok) {
      throw new Error("Failed to fetch meals.");
    }
    const resData = await response.json();
    return resData.posts;
  } catch (error) {
    console.error("Error fetching meals:", error);
    return [];
  }
}

function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function loadMeals() {
      const mealsData = await fetchMeals();
      setMeals(mealsData);
    }
    loadMeals();
  }, []);
  console.log(meals);

  return <MealsGrid meals={meals} />;
}

export default async function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipes and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={
            <div className={classes["lds-ring"]}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          }
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
