/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import { OrderReducer } from '../reducer/OrderReducer';
const initialState = {
	orders: [],
	prevOrder: [],
	pendingItems: [],
	executingItems: [],
	loading: false,
	error: null,
};

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
	const [state, dispatch] = useReducer(OrderReducer, initialState);

	return (
		<OrderContext.Provider value={{ state, dispatch }}>
			{children}
		</OrderContext.Provider>
	);
};
