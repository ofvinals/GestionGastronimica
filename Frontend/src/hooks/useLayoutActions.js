import { useContext } from 'react';
import { LoungeContext } from '../context/LoungeContext';
import { apiURL } from '/api/apiURL.js';

export const useLayoutActions = () => {
	const { dispatch } = useContext(LoungeContext);

	const loadAllLayoutAction = async () => {
		dispatch({
			type: 'DATA_TABLE_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const response = await apiURL.get('/api/lounges/', {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			console.log(response.data);
			dispatch({
				type: 'DATA_SALONS_SUCCESS',
				payload: response.data,
			});
			return response.data;
		} catch (error) {
			console.error('Error al cargar el layout:', error);
			dispatch({
				type: 'DATA_TABLE_ERROR',
				payload: error.message,
			});
		}
	};

	const loadLayoutAction = async (salonId) => {
		dispatch({ type: 'DATA_TABLE_PENDING' });
		try {
			const token = localStorage.getItem('token');
			const response = await apiURL.get(`/api/lounges/${salonId}`, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			console.log(response.data);
			dispatch({
				type: 'DATA_SALONID_SUCCESS',
				payload: response.data,
			});
			return response.data;
		} catch (error) {
			dispatch({
				type: 'DATA_TABLE_ERROR',
				payload: error.message,
			});
			console.error('Error al cargar el layout:', error);
		}
	};

	const addTableAction = async (id, values) => {
		console.log(id, values);
		dispatch({ type: 'DATA_TABLE_PENDING' });
		try {
			const token = localStorage.getItem('token');
			const response = await apiURL.put(
				`/api/lounges/${id}`,
				{ layouts: values },
				{
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				}
			);
			console.log(response.data);
			dispatch({
				type: 'ADD_TABLE_SUCCESS',
				payload: response.data,
				id,
			});
			return response.data;
		} catch (error) {
			dispatch({
				type: 'DATA_TABLE_ERROR',
				payload: error.message,
			});
			console.error('Error al agregar la mesa:', error);
		}
	};

	// const editTablePositionAction = async (id, values) => {
	// 	dispatch({
	// 		type: 'DATA_TABLE_PENDING',
	// 	});
	// 	try {
	// 		const token = localStorage.getItem('token');
	// 		const updatedLayout = await apiURL.put(`/api/lounges/${id}`, values, {
	// 			withCredentials: true,
	// 			headers: { authorization: `Bearer ${token}` },
	// 		});
	// 		dispatch({
	// 			type: 'UPDATE_TABLE_POSITION_SUCCESS',
	// 			payload: updatedLayout.data,
	// 		});
	// 		return updatedLayout.data;
	// 	} catch (error) {
	// 		dispatch({
	// 			type: 'DATA_TABLE_ERROR',
	// 			payload: error.message,
	// 		});
	// 		console.error('Error al editar la mesa:', error);
	// 	}
	// };

	const editTableDetailsAction = async (id, values) => {
		dispatch({
			type: 'DATA_TABLE_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const updatedLayout = await apiURL.put(`/api/lounges/${id}`, values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({
				type: 'UPDATE_TABLE_DETAILS_SUCCESS',
				payload: updatedLayout.data,
			});
			return updatedLayout.data;
		} catch (error) {
			dispatch({
				type: 'DATA_TABLE_ERROR',
				payload: error.message,
			});
			console.error('Error al editar la mesa:', error);
		}
	};

	const updateTableIsOpenAction = async (
		closeTime,
		salon_Id,
		tableId,
		isOpen,
		index,
		openAt
	) => {
		dispatch({
			type: 'DATA_TABLE_PENDING',
		});
		console.log(closeTime, salon_Id, tableId, isOpen, index, openAt);
		try {
			const token = localStorage.getItem('token');
			const updatedTable = await apiURL.put(
				`/api/lounges/${salon_Id}/${index}`,
				{ closeTime, salon_Id, layoutId: tableId, isOpen, openAt },
				{
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				}
			);
			dispatch({
				type: 'OPEN_TABLE_SUCCESS',
				payload: { closeTime, salon_Id, tableId, isOpen, index, openAt },
			});
			return updatedTable.data;
		} catch (error) {
			dispatch({
				type: 'DATA_TABLE_ERROR',
				payload: error.message,
			});
			console.error('Error al abrir la mesa:', error);
		}
	};

	const loadTableAction = async (salonId) => {
		dispatch({ type: 'DATA_TABLE_PENDING' });
		try {
			const token = localStorage.getItem('token');
			const response = await apiURL.get(`/api/lounges/${salonId}`, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({
				type: 'DATA_TABLE_SUCCESS',
				payload: response.data,
			});
			return response.data;
		} catch (error) {
			dispatch({
				type: 'DATA_TABLE_ERROR',
				payload: error.message,
			});
			console.error('Error al cargar el layout:', error);
		}
	};
	return {
		loadLayoutAction,
		updateTableIsOpenAction,
		// editLayoutAction,
		addTableAction,
		// editTablePositionAction,
		editTableDetailsAction,
		loadTableAction,
		loadAllLayoutAction,
	};
};
