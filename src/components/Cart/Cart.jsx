import Modal from "components/UI/Modal";
import CartContext from "context/cart-context";
import { useContext, useState } from "react";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
	const ctxCart = useContext(CartContext);

	const [inCheckout, setInCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState(null);

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

	const orderHandler = () => {
		setInCheckout(true);
	};

	const finalOrderHandler = (data) => {
		setIsSubmitting(true);
		const order = { ...data, orderedItems: ctxCart.items };

		fetch(
			"https://react-http-6862f-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
			{ method: "POST", body: JSON.stringify(order) }
		)
			.then((res) => {
				if (!res.ok)
					throw new Error("Could not submit order: " + res.status);

				setIsSubmitting(false);
				setSubmitMessage("Order submitted!😀");
				ctxCart.clearCart();
			})
			.catch((err) => setSubmitMessage(err.message));
	};

	const modalActions = (
		<div className={styles.actions}>
			<button
				className={styles["button--alt"]}
				onClick={props.onCartClose}
			>
				Close
			</button>
			{ctxCart.items.length > 0 && (
				<button className={styles.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const modalContent = (
		<>
			<ul className={styles["cart-items"]}>{cartItems}</ul>
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{inCheckout && (
				<Checkout
					onConfirm={finalOrderHandler}
					onCancel={props.onCartClose}
				/>
			)}
			{!inCheckout && modalActions}
		</>
	);

	return (
		<Modal onClose={props.onCartClose}>
			{!isSubmitting && !submitMessage && modalContent}
			{isSubmitting && !submitMessage && <p>Sending order...</p>}
			{submitMessage && <p>{submitMessage}</p>}
		</Modal>
	);
}

export default Cart;
