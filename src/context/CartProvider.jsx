import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
	if (action.type === "ITEM_ADDED") {
		const updatedTotal =
			state.totalAmount + action.newItem.price * action.newItem.amount;

		const existingItemIndex = state.items.findIndex(
			(item) => item.id === action.newItem.id
		);

		const existingItem = state.items[existingItemIndex];

		let updatedItems;
		if (existingItem) {
			const updatedItem = {
				...existingItem,
				amount: existingItem.amount + 1,
			};
			updatedItems = [...state.items];
			updatedItems[existingItemIndex] = updatedItem;
		} else {
			updatedItems = [...state.items, action.newItem];
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotal,
		};
	}

	if (action.type === "ITEM_REMOVED") {
		const existingItemIndex = state.items.findIndex(
			(item) => item.id === action.idToDelete
		);

		const existingItem = state.items[existingItemIndex];
		const updatedTotal = state.totalAmount - existingItem.price;

		let updatedItems;

		if (existingItem.amount === 1) {
			updatedItems = state.items.filter(
				(item) => item.id !== action.idToDelete
			);
		} else {
			const updatedItem = {
				...existingItem,
				amount: existingItem.amount - 1,
			};
			updatedItems = [...state.items];
			updatedItems[existingItemIndex] = updatedItem;
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotal,
		};
	}

	return defaultCartState;
};

function CartProvider(props) {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: "ITEM_ADDED", newItem: item });
	};
	const removeItemToCartHandler = (id) => {
		dispatchCartAction({ type: "ITEM_REMOVED", idToDelete: id });
	};

	return (
		<CartContext.Provider
			value={{
				items: cartState.items,
				totalAmount: cartState.totalAmount,
				addItem: addItemToCartHandler,
				removeItem: removeItemToCartHandler,
			}}
		>
			{props.children}
		</CartContext.Provider>
	);
}

export default CartProvider;
