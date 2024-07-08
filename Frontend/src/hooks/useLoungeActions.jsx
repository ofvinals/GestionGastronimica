import { useContext } from 'react';
import { LoungeContext } from '../context/LoungeContext';
import { apiURL } from '/api/apiURL.js';

export const useLoungeActions = () => {
	const { dispatch } = useContext(LoungeContext);

	const dataSalons = async () => {
		dispatch({ type: 'DATA_SALON_PENDING' });
		try {
			const token = localStorage.getItem('token');
			const lounges = await apiURL.get('/api/lounges', {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			if (lounges.data.length === 0) {
				const name = 'Salón Principal';
				addSalonAction(name);
				return;
			}
			dispatch({
				type: 'DATA_SALONS_SUCCESS',
				payload: lounges.data,
			});
			return lounges.data;
		} catch (error) {
			dispatch({
				type: 'DATA_SALON_ERROR',
				payload: error.message,
			});
			console.error('Error al buscar el salon:', error);
		}
	};

	const addSalonAction = async (name) => {
		dispatch({ type: 'DATA_SALON_PENDING' });
		try {
			const newSalon = { name, layouts: [] };
			const token = localStorage.getItem('token');
			const lounge = await apiURL.post('/api/lounges', newSalon, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({
				type: 'ADD_SALON_SUCCESS',
				payload: name,
			});
			return lounge.data;
		} catch (error) {
			dispatch({
				type: 'DATA_SALON_ERROR',
				payload: error.message,
			});
			console.error('Error al registra el salon:', error);
		}
	};

	return {
		dataSalons,
		addSalonAction,
	};
};
