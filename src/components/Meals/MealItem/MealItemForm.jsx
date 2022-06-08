import Input from "components/UI/Input";
import { useRef, useState } from "react";
import styles from "./MealItemForm.module.css";

function MealItemForm(props) {
	const amountInputRef = useRef();
	const [amountValid, setAmountValid] = useState(true);

	const submitHandler = (event) => {
		event.preventDefault();
		const inputAmount = Number(amountInputRef.current.value);

		if (inputAmount < -1 || inputAmount > 5) {
			setAmountValid(false);
			return;
		}

		props.onAddToCart(inputAmount);
	};

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<Input
				ref={amountInputRef}
				label="Amount:"
				input={{
					type: "number",
					id: "amount_" + props.id,
					min: "1",
					max: "5",
					step: "1",
					defaultValue: "1",
				}}
			/>
			<button>+ Add</button>
			{!amountValid && <p>Enter a valid amount! (1-5)</p>}
		</form>
	);
}

export default MealItemForm;
