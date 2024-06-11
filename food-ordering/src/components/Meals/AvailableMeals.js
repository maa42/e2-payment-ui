import React, { useEffect, useState } from "react";
import Constants from "../Constants/constants";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import axios from "axios";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const getMeals = async () => {
      try {
        const response = await axios.get("/api/meals");
        if (response.status !== 200) {
          throw new Error("Something went wrong");
        }
        setMeals(response.data);
      } catch (err) {
        throw new Error("Something went wrong");
      }
    };
    getMeals()
      .then(() => setIsLoading(false))
      .catch((err) => {
        setIsLoading(false);
        setHttpError(err.message);
      });
  }, []);

  if (isLoading)
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );

  if (httpError)
    return (
      <section className={classes.mealsLoading}>
        <p>{httpError}</p>
      </section>
    );

  const mealsList = meals.map((meal) => <MealItem key={meal.id} item={meal} />);
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
