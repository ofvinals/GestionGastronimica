/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useEffect, useReducer } from 'react';
import { AuthReducer } from '../reducer/AuthReducer';
import { createContext } from 'react';
import { apiURL } from '/api/apiURL.js';
import { useNavigate } from 'react-router-dom';

const initialState = {
	user: null,
	loading: false,
	error: null,
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, initialState);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			apiURL
				.get('/api/verify', {
					withCredentials: true,
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((response) => {
					console.log(response.data);
					dispatch({
						type: 'LOGIN_SUCCESS',
						payload: response.data,
					});
				})
				.catch((error) => {
					console.error('Error al validar el token:', error);
					localStorage.removeItem('token');
					navigate('/home');
				});
		} else {
			navigate('/home');
		}
	}, [navigate]);

	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
