import { useContext } from 'react';
import { BillContext } from '../context/BillContext';
import { apiURL } from '/api/apiURL.js';
import { showAlert, confirmAction } from '../utils/showAlert';

export const useBillActions = () => {
	const { dispatch } = useContext(BillContext);

	// DEVUELVE BILLS GUARDADOS EN BACKEND
	const dataBills = async () => {
		dispatch({
			type: 'DATA_BILLS_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const bills = await apiURL.get('/api/bills', {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({
				type: 'DATA_BILLS_SUCCESS',
				payload: bills.data,
			});
			return bills.data;
		} catch (error) {
			dispatch({
				type: 'DATA_BILLS_ERROR',
				payload: error.message,
			});
			console.error('Error al buscar el gasto:', error);
			showAlert({
				icon: 'error',
				title: 'Error al buscar el gasto. Intente nuevamente!',
			});
		}
	};

	// AGREGA NUEVOS BILLOS
	const addBillAction = async (values) => {
		dispatch({
			type: 'DATA_BILLS_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const bill = await apiURL.post('/api/bills', values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({
				type: 'ADD_BILL_SUCCESS',
				payload: bill.data,
			});
			showAlert({
				icon: 'success',
				title: 'Gasto registrado correctamente',
			});
			return bill.data;
		} catch (error) {
			dispatch({
				type: 'DATA_BILLS_ERROR',
				payload: error.message,
			});
			console.error('Error al registra el gasto:', error);
			showAlert({
				icon: 'error',
				title: 'Error al registrar el gasto. Intente nuevamente!',
			});
		}
	};

	// INHABILITA BILLO
	const disableBillAction = async (id) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la suspension del gasto?',
			icon: 'warning',
		});
		if (isConfirmed) {
			dispatch({
				type: 'DATA_BILLS_PENDING',
			});
			try {
				const updatedValues = { status: false };
				const token = localStorage.getItem('token');
				const updatedBill = await apiURL.put(
					`/api/bills/${id}`,
					updatedValues,
					{
						withCredentials: true,
						headers: { authorization: `Bearer ${token}` },
					}
				);
				dispatch({
					type: 'DISABLE_BILL_SUCCESS',
					payload: id,
				});
				showAlert({
					icon: 'success',
					title: 'Gasto suspendido correctamente',
				});
				return updatedBill.data;
			} catch (error) {
				dispatch({
					type: 'DATA_BILLS_ERROR',
					payload: error.message,
				});
				console.error('Error al suspender el gasto:', error);
				showAlert({
					icon: 'error',
					title: 'Error al suspender el gasto. Intente nuevamente!',
				});
			}
		}
	};

	// HABILITA BILLO
	const enableBillAction = async (id) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la habilitación del gasto?',
			icon: 'warning',
			confirmButtonColor: '#085718',
		});
		if (isConfirmed) {
			dispatch({
				type: 'DATA_BILLS_PENDING',
			});
			try {
				const updatedValues = { status: true };
				const token = localStorage.getItem('token');
				const updatedBill = await apiURL.put(
					`/api/bills/${id}`,
					updatedValues,
					{
						withCredentials: true,
						headers: { authorization: `Bearer ${token}` },
					}
				);
				dispatch({
					type: 'ENABLE_BILL_SUCCESS',
					payload: id,
				});
				showAlert({
					icon: 'success',
					title: 'Gasto habilitado correctamente',
				});
				return updatedBill.data;
			} catch (error) {
				dispatch({
					type: 'DATA_BILLS_ERROR',
					payload: error.message,
				});
				console.error('Error al habilitar el gasto:', error);
				showAlert({
					icon: 'error',
					title: 'Error al habilitar el gasto. Intente nuevamente!',
				});
			}
		}
	};

	// EDITA BILLO
	const editBillAction = async (id, values) => {
		dispatch({
			type: 'DATA_BILLS_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const updatedBill = await apiURL.put(
				`/api/bills/${id}`,
				values,
				{
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				}
			);
			dispatch({
				type: 'EDIT_BILL_SUCCESS',
				payload: updatedBill.data,
			});
			showAlert({
				icon: 'success',
				title: 'Gasto editado correctamente',
			});
			return updatedBill.data;
		} catch (error) {
			dispatch({
				type: 'DATA_BILLS_ERROR',
				payload: error.message,
			});
			console.error('Error al editar el gasto:', error);
			showAlert({
				icon: 'error',
				title: 'Error al editar el gasto. Intente nuevamente!',
			});
		}
	};

	// BORRA BILLO CON MENSAJE DE CONFIRMACION
	const deleteBillAction = async (id) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la eliminacion definitiva del gasto?',
			icon: 'warning',
		});
		if (isConfirmed) {
			dispatch({
				type: 'DATA_BILLS_PENDING',
			});
			try {
				const token = localStorage.getItem('token');
				const deletedBill = await apiURL.delete(`/api/bills/${id}`, {
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				});
				dispatch({
					type: 'DELETE_BILL_SUCCESS',
					payload: id,
				});
				showAlert({
					icon: 'success',
					title: 'Gasto eliminado correctamente',
				});
				return deletedBill.data;
			} catch (error) {
				dispatch({
					type: 'DATA_BILLS_ERROR',
					payload: error.message,
				});
				showAlert({
					icon: 'error',
					title: 'Error al eliminar el gasto. Intente nuevamente!',
				});
			}
		}
	};

	return {
		dataBills,
		addBillAction,
		disableBillAction,
		enableBillAction,
		editBillAction,
		deleteBillAction,
	};
};
