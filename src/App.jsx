import Cart from "components/Cart/Cart";
import Meals from "components/Meals/Meals";
import { useState } from "react";
import Header from "./components/Layout/Header";

function App() {
	const [cartShow, setCartShown] = useState(false);

	const showCartHandler = () => {
		setCartShown(true);
	};

	const hideCartHandler = () => {
		setCartShown(false);
	};

	return (
		<>
			{cartShow && <Cart onCartClose={hideCartHandler} />}
			<Header onCartOpen={showCartHandler} />
			<Meals />
		</>
	);
}

export default App;
