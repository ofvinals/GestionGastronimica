/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import { UserReducer } from '../reducer/UserReducer';
const initialState = {
	users: [],
	loading: false,
	error: null,
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(UserReducer, initialState);

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			{children}
		</UserContext.Provider>
	);
};
