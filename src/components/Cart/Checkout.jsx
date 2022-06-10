import { useRef, useState } from "react";
import styles from "./Checkout.module.css";

const isEmpty = (value) => value.trim().length === 0;
const isPostalCode = (code) => code.trim().length === 5;

function Checkout(props) {
	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalInputRef = useRef();
	const cityInputRef = useRef();

	const [formValidity, setFormValidity] = useState({
		name: true,
		street: true,
		postal: true,
		city: true,
	});

	const confirmHandler = (event) => {
		event.preventDefault();

		const name = nameInputRef.current.value;
		const street = streetInputRef.current.value;
		const postal = postalInputRef.current.value;
		const city = cityInputRef.current.value;

		const isNameValid = !isEmpty(name);
		const isStreetValid = !isEmpty(street);
		const isPostalValid = isPostalCode(postal);
		const isCityValid = !isEmpty(city);

		setFormValidity({
			name: isNameValid,
			street: isStreetValid,
			postal: isPostalValid,
			city: isCityValid,
		});

		const formIsValid =
			isNameValid && isStreetValid && isPostalValid && isCityValid;

		if (!formIsValid) return;

		props.onConfirm({
			name,
			street,
			postal,
			city,
		});
	};

	return (
		<form onSubmit={confirmHandler}>
			<div
				className={`${styles.control} ${
					!formValidity.name && styles.invalid
				}`}
			>
				<label htmlFor="name">Your Name</label>
				<input ref={nameInputRef} type="text" id="name" />
			</div>
			<div
				className={`${styles.control} ${
					!formValidity.street && styles.invalid
				}`}
			>
				<label htmlFor="name">Street</label>
				<input ref={streetInputRef} type="text" id="name" />
			</div>
			<div
				className={`${styles.control} ${
					!formValidity.postal && styles.invalid
				}`}
			>
				<label htmlFor="name">Postal Code</label>
				<input ref={postalInputRef} type="text" id="name" />
			</div>
			<div
				className={`${styles.control} ${
					!formValidity.city && styles.invalid
				}`}
			>
				<label htmlFor="name">City</label>
				<input ref={cityInputRef} type="text" id="name" />
			</div>
			<div className={styles.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={styles.submit}>Confirm</button>
			</div>
		</form>
	);
}

export default Checkout;
