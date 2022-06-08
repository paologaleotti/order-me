import Modal from "components/UI/Modal";
import styles from "./Cart.module.css";

function Cart(props) {
	const cartItems = [
		{ id: "c1", name: "sushi", amount: 2, price: 12.99 },
	].map((item) => <li>{item.name}</li>);

	return (
		<Modal>
			<ul className={styles["cart-items"]}>{cartItems}</ul>
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>35.62</span>
			</div>
			<div className={styles.actions}>
				<button className={styles["button--alt"]}>Close</button>
				<button className={styles.button}>Order</button>
			</div>
		</Modal>
	);
}

export default Cart;
