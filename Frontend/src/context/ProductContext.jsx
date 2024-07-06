/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import { ProductReducer } from '../reducer/ProductReducer';

const initialState = {
	products: [],
	suppliers: [],
	loading: false,
	error: null,
};

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
	const [state, dispatch] = useReducer(ProductReducer, initialState);

	return (
		<ProductContext.Provider value={{ state, dispatch }}>
			{children}
		</ProductContext.Provider>
	);
};
