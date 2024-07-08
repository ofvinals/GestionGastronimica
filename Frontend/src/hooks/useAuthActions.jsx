import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { apiURL } from '/api/apiURL.js';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../helpers/showAlert';

export const useAuthActions = () => {
	const { dispatch } = useContext(AuthContext);
	const navigate = useNavigate();

	const login = async (values) => {
		dispatch({
			type: 'LOGIN_PENDING',
		});
		try {
			const user = await apiURL.post('/api/login', values, {
				credentials: 'include',
			});
			localStorage.setItem('token', user.data.accessToken);
			dispatch({
				type: 'LOGIN_SUCCESS',
				payload: user.data,
			});
			showAlert({
				icon: 'success',
				title: 'Inicio de sesión exitoso!',
			});
			return user.data;
		} catch (error) {
			console.error('Error al iniciar sesion:', error);
			dispatch({
				type: 'LOGIN_ERROR',
				payload: error.message,
			});
			showAlert({
				icon: 'error',
				title: 'El usuario y/o contraseña no son correctos. Intente nuevamente!',
			});
		}
	};

	const logout = () => {
		dispatch({
			type: 'LOGOUT',
		});
		localStorage.removeItem('token');
		navigate('/home');
		showAlert({
			icon: 'success',
			title: 'Su sesion ha sido cerrada!',
		});
	};

	return { login, logout };
};
