import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

function MealItem({ meal: mealProp }) {
	const price = `${mealProp.price.toFixed(2)}€`;

	return (
		<li className={styles.meal}>
			<div>
				<h3>{mealProp.name}</h3>
				<div className={styles.description}>{mealProp.description}</div>
				<div className={styles.price}>{price}</div>
			</div>
			<div>
				<MealItemForm id={mealProp.id} />
			</div>
		</li>
	);
}

export default MealItem;
