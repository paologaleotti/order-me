import Modal from "components/UI/Modal";
import CartContext from "context/cart-context";
import { useContext } from "react";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";

function Cart(props) {
	const ctxCart = useContext(CartContext);

	const totalAmount = `${ctxCart.totalAmount.toFixed(2)}€`;

	const cartItemRemoveHandler = (id) => {
		ctxCart.removeItem(id);
	};
	const cartItemAddHandler = (item) => {
		ctxCart.addItem(item);
	};

	const cartItems = ctxCart.items.map((item) => (
		<CartItem
			key={item.id}
			name={item.name}
			amount={item.amount}
			price={item.price}
			onRemove={cartItemRemoveHandler.bind(null, item.id)}
			onAdd={cartItemAddHandler.bind(null, item)}
		/>
	));

	return (
		<Modal onClose={props.onCartClose}>
			<ul className={styles["cart-items"]}>{cartItems}</ul>
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>

			<div className={styles.actions}>
				<button
					className={styles["button--alt"]}
					onClick={props.onCartClose}
				>
					Close
				</button>
				{ctxCart.items.length > 0 && (
					<button className={styles.button}>Order</button>
				)}
			</div>
		</Modal>
	);
}

export default Cart;
