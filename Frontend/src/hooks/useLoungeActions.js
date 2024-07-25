import { useContext } from 'react';
import { LoungeContext } from '../context/LoungeContext';
import { apiURL } from '/api/apiURL.js';
import { confirmAction, showAlert } from '../utils/showAlert';

export const useLoungeActions = () => {
	const { dispatch } = useContext(LoungeContext);

	const addSalonAction = async (newLoungeName) => {
		dispatch({ type: 'DATA_SALON_PENDING' });
		try {
			const token = localStorage.getItem('token');
			const lounge = await apiURL.post(
				'/api/lounges',
				{ newLoungeName },
				{
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				}
			);
			dispatch({
				type: 'ADD_SALON_SUCCESS',
				payload: lounge.data,
			});
			return lounge.data;
		} catch (error) {
			dispatch({
				type: 'DATA_SALON_ERROR',
				payload: error.message,
			});
			console.error('Error al registrar el salón:', error);
		}
	};

	const deleteSalonAction = async (
		activeSalonId,
		salonName,
		salonToDelete
	) => {
		if (
				salonToDelete.layouts &&
			salonToDelete.layouts.some((table) => table.isOpen)
		) {
			showAlert({
				icon: 'error',
				title: 'No se puede eliminar el salón porque contiene mesas abiertas',
			});
		} else {
			const isConfirmed = await confirmAction({
				title: `Confirmas la eliminacion definitiva del salon ${salonName}?`,
				icon: 'warning',
			});
			if (isConfirmed) {
				dispatch({
					type: 'DATA_SALON_PENDING',
				});
				try {
					const token = localStorage.getItem('token');
					const deletedSalon = await apiURL.delete(
						`/api/lounges/${activeSalonId}`,
						{
							withCredentials: true,
							headers: { authorization: `Bearer ${token}` },
						}
					);
					dispatch({
						type: 'DELETE_SALON_SUCCESS',
						payload: activeSalonId,
					});
					showAlert({
						icon: 'success',
						title: 'Salon eliminado correctamente',
					});
					return deletedSalon.data;
				} catch (error) {
					dispatch({ type: 'DATA_SALON_ERROR', payload: error.message });
					showAlert({
						icon: 'error',
						title: 'Error al eliminar el salon. Intente nuevamente!',
					});
				}
			}
		}
	};

	return {
		addSalonAction,
		deleteSalonAction,
	};
};
