import { useContext } from 'react';
import { LoungeContext } from '../context/LoungeContext';
import { apiURL } from '/api/apiURL.js';

export const useLayoutActions = () => {
	const { dispatch } = useContext(LoungeContext);

	const loadAllLayoutAction = async () => {
		dispatch({ type: 'DATA_TABLE_PENDING' });
		try {
			const token = localStorage.getItem('token');
			const response = await apiURL.get('/api/lounges/', {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({ type: 'DATA_SALONS_SUCCESS', payload: response.data });
			return response.data;
		} catch (error) {
			dispatch({ type: 'DATA_TABLE_ERROR', payload: error.message });
			console.error('Error al cargar el layout:', error);
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
			dispatch({ type: 'DATA_SALONID_SUCCESS', payload: response.data });
			return response.data;
		} catch (error) {
			dispatch({ type: 'DATA_TABLE_ERROR', payload: error.message });
			console.error('Error al cargar el layout:', error);
		}
	};

	const editLayoutAction = async (salonId, layouts) => {
		dispatch({ type: 'DATA_TABLE_PENDING' });
		try {
			const token = localStorage.getItem('token');
			const updatedLayout = await apiURL.put(
				`/api/lounges/${salonId}/layout`,
				{ layouts },
				{
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				}
			);
			dispatch({
				type: 'UPDATE_LAYOUTS_SUCCESS',
				payload: { salonId, layouts },
			});
			return updatedLayout.data;
		} catch (error) {
			dispatch({ type: 'DATA_TABLE_ERROR', payload: error.message });
			console.error('Error al editar el layout:', error);
		}
	};

	const addTableAction = async (id, values) => {
		dispatch({ type: 'DATA_TABLE_PENDING' });
		try {
			const token = localStorage.getItem('token');
			const table = await apiURL.post(`/api/lounges/${id}`, values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({ type: 'ADD_TABLE_SUCCESS', payload: table.data, id });
			return table.data;
		} catch (error) {
			dispatch({ type: 'DATA_TABLE_ERROR', payload: error.message });
			console.error('Error al agregar la mesa:', error);
		}
	};

	const editTablePositionAction = async (id, values) => {
		dispatch({ type: 'DATA_TABLE_PENDING' });
		try {
			const token = localStorage.getItem('token');
			const updatedLayout = await apiURL.put(`/api/lounges/${id}`, values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({
				type: 'UPDATE_TABLE_POSITION_SUCCESS',
				payload: updatedLayout.data,
			});
			return updatedLayout.data;
		} catch (error) {
			dispatch({ type: 'DATA_TABLE_ERROR', payload: error.message });
			console.error('Error al editar la mesa:', error);
		}
	};

	const editTableDetailsAction = async (id, values) => {
		dispatch({ type: 'DATA_TABLE_PENDING' });
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
			dispatch({ type: 'DATA_TABLE_ERROR', payload: error.message });
			console.error('Error al editar la mesa:', error);
		}
	};

	const updateTableIsOpenAction = async (salon_Id, tableId, isOpen, index) => {
		console.log(salon_Id, tableId, isOpen, index);
		dispatch({ type: 'DATA_TABLE_PENDING' });
		try {
			const token = localStorage.getItem('token');
			const updatedTable = await apiURL.put(
				`/api/lounges/${salon_Id}/${index}`,
				{ isOpen, layoutId: tableId },
				{
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				}
			);
			console.log(updatedTable.data)
			dispatch({
				type: 'OPEN_TABLE_SUCCESS',
				payload: { salon_Id, tableId, isOpen, index },
			});
			return updatedTable.data;
		} catch (error) {
			dispatch({ type: 'DATA_TABLE_ERROR', payload: error.message });
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
			console.log(response);
			dispatch({ type: 'DATA_TABLE_SUCCESS', payload: response.data });
			return response.data;
		} catch (error) {
			dispatch({ type: 'DATA_TABLE_ERROR', payload: error.message });
			console.error('Error al cargar el layout:', error);
			throw error;
		}
	};
	return {
		loadLayoutAction,
		updateTableIsOpenAction,
		editLayoutAction,
		addTableAction,
		editTablePositionAction,
		editTableDetailsAction,
		loadTableAction,
		loadAllLayoutAction,
	};
};
