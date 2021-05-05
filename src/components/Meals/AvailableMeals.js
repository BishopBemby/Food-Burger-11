import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import { useState, useEffect } from "react";

const AvailableMeals = () => {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const data = await fetch(
        "https://reacthttp-f4741-default-rtdb.firebaseio.com/meals.json"
      );
      if (!data.ok) {
        throw new Error("Something went wrong");
      }
      const resData = await data.json();
      const loadedMeals = [];
      for (let key in resData) {
        loadedMeals.push({
          id: key,
          name: resData[key].name,
          price: resData[key].price,
          description: resData[key].description,
        });
      }

      setAvailableMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });

    //we cant use try catch coz fetchMeals will return promie whic means we have to await and turn useEffct to again async which is not allowed. so we can either move try v=catch to naotehr function so we have 2 functions inside useeffect, one for http requests and one for error handling//// or we can directly use catch() for the error for that promise as done above.

    // try{
    //   fetchMeals();
    // }catch(error){
    //   setIsLoading(false);
    //   setError(error.message);
    // }
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsIsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = availableMeals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
