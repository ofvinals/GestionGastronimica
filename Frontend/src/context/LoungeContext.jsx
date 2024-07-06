/* eslint-disable react/prop-types */
// LoungeContext.js
import { createContext, useReducer } from 'react';
import { LoungeReducer } from '../reducer/LoungeReducer';

const initialState = {
	lounges: [],
	loading: false,
	error: null,
};

export const LoungeContext = createContext();

export const LoungeProvider = ({ children }) => {
	const [state, dispatch] = useReducer(LoungeReducer, initialState);

	return (
		<LoungeContext.Provider value={{ state, dispatch }}>
			{children}
		</LoungeContext.Provider>
	);
};
