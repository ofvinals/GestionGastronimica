/* eslint-disable react/prop-types */
// AuthProvider.jsx
import { useEffect, useReducer } from 'react';
import { AuthReducer } from '../reducer/AuthReducer';
import { createContext } from 'react';
import { apiURL } from '/api/apiURL';
import { useNavigate } from 'react-router-dom';

const initialState = {
	user: null,
	loading: true, 
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
					dispatch({
						type: 'LOGIN_SUCCESS',
						payload: response.data,
					});
				})
				.catch((error) => {
					console.error('Error al validar el token:', error);
					localStorage.removeItem('token');
					dispatch({ type: 'LOGOUT' });
					navigate('/home');
				});
		} else {
			dispatch({ type: 'LOGOUT' });
			navigate('/home');
		}
	}, [navigate]);

	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

