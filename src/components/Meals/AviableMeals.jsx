import Card from "components/UI/Card";
import { useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

function AviableMeals() {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsloading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMeals = () => {
		setIsloading(true);
		fetch(
			"https://react-http-6862f-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
		)
			.then((res) => {
				if (!res.ok)
					throw new Error(`Could not fetch meals! (${res.status})`);
				return res.json();
			})
			.then((data) => {
				let loadedMeals = [];
				for (const [key, meal] of Object.entries(data)) {
					loadedMeals.push({
						id: key,
						name: meal.name,
						description: meal.description,
						price: meal.price,
					});
				}
				setMeals(loadedMeals);
				setIsloading(false);
			})
			.catch((error) => setError(error.message));
	};

	useEffect(() => {
		fetchMeals();
	}, []);

	const mealsList = meals.map((meal) => (
		<MealItem key={meal.id} meal={meal} />
	));

	return (
		<section className={styles.meals}>
			<Card>
				{!isLoading && !error && <ul>{mealsList}</ul>}
				{isLoading && !error && <p>Loading..</p>}
				{error && <p>{error}</p>}
			</Card>
		</section>
	);
}

export default AviableMeals;
