/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useContext, useReducer, useState } from 'react';
import { AuthReducer } from '../reducer/AuthReducer';
import { apiURL } from '/api/apiURL.js';
import { createContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const initialState = {
	user: null,
};

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, initialState);
	const [errors, setErrors] = useState([]);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const login = async (values) => {
		try {
			setIsLoading(true);
			const user = await apiURL.post('/api/login', values, {
				credentials: 'include',
			});
			localStorage.setItem('token', user.data.accessToken);
			setIsAuthenticated(true);
			dispatch({ type: 'LOGIN', payload: user.data });
			setIsLoading(false);
			return user.data;
		} catch (error) {
			console.error('Login Error:', error);
			setErrors(error.response.data);
			setIsLoading(false);
			throw error;
		}
	};

	const logout = () => {
		dispatch({ type: 'LOGOUT' });
		localStorage.removeItem('token');
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider
			value={{
				state,
				login,
				errors,
				isAuthenticated,
				isLoading,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
