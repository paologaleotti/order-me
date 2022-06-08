import CartContext from "context/cart-context";
import { useContext } from "react";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

function MealItem({ meal: mealProp }) {
	const ctxCart = useContext(CartContext);
	const price = `${mealProp.price.toFixed(2)}€`;

	const addToCartHandler = (amount) => {
		ctxCart.addItem({
			id: mealProp.id,
			name: mealProp.name,
			amount: amount,
			price: Number(mealProp.price),
		});
	};

	return (
		<li className={styles.meal}>
			<div>
				<h3>{mealProp.name}</h3>
				<div className={styles.description}>{mealProp.description}</div>
				<div className={styles.price}>{price}</div>
			</div>
			<div>
				<MealItemForm id={mealProp.id} onAddToCart={addToCartHandler} />
			</div>
		</li>
	);
}

export default MealItem;
