/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import { BillReducer } from '../reducer/BillReducer';

const initialState = {
	bills: [],
	bill: null,
	loading: false,
	error: null,
};

export const BillContext = createContext();

export const BillProvider = ({ children }) => {
	const [state, dispatch] = useReducer(BillReducer, initialState);

	return (
		<BillContext.Provider value={{ state, dispatch }}>
			{children}
		</BillContext.Provider>
	);
};
