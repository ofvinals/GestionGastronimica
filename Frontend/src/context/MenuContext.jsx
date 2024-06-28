/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import { MenuReducer } from '../reducer/MenuReducer';
const initialState = {
	menus: [],
	loading: false,
	error: null,
};

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
	const [state, dispatch] = useReducer(MenuReducer, initialState);

	return (
		<MenuContext.Provider value={{ state, dispatch }}>
			{children}
		</MenuContext.Provider>
	);
};
