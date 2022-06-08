import { useContext, useEffect, useState } from "react";
import CartContext from "context/cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

function HeaderCartButton(props) {
	const [btnIsAnimated, setBtnIsAnimated] = useState(false);

	const ctxCart = useContext(CartContext);

	const numberOfCartItems = ctxCart.items.reduce(
		(acc, item) => acc + item.amount,
		0
	);

	const btnStyles = `${styles.button} ${btnIsAnimated && styles.bump}`;

	useEffect(() => {
		if (ctxCart.items.length === 0) return;
		setBtnIsAnimated(true);

		const animTimer = setTimeout(() => {
			setBtnIsAnimated(false);
		}, 300);

		return () => {
			clearTimeout(animTimer);
		};
	}, [ctxCart.items]);

	return (
		<button className={btnStyles} onClick={props.onClick}>
			<span className={styles.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={styles.badge}>{numberOfCartItems}</span>
		</button>
	);
}

export default HeaderCartButton;
