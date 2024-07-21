import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { apiURL } from '/api/apiURL.js';
import { showAlert, confirmAction } from '../helpers/showAlert';

export const usePurchaseActions = () => {
	const { dispatch } = useContext(ProductContext);

	const dataPurchases = async () => {
		dispatch({
			type: 'DATA_PURCHASES_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const purchase = await apiURL.get('/api/purchase', {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({
				type: 'DATA_PURCHASE_SUCCESS',
				payload: purchase.data,
			});
			return purchase.data;
		} catch (error) {
			dispatch({
				type: 'DATA_PURCHASES_ERROR',
				payload: error.message,
			});
			console.error('Error al buscar el pedido:', error);
			showAlert({
				icon: 'error',
				title: 'Error al buscar el pedido. Intente nuevamente!',
			});
		}
	};

	const addPurchaseAction = async (values) => {
		dispatch({
			type: 'DATA_PURCHASES_PENDING',
		});

		try {
			const token = localStorage.getItem('token');
			const purchase = await apiURL.post('/api/purchase', values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({
				type: 'ADD_PURCHASE_SUCCESS',
				payload: purchase.data,
			});
			showAlert({
				icon: 'success',
				title: 'Pedido registrado correctamente',
			});
			return purchase.data;
		} catch (error) {
			dispatch({
				type: 'DATA_PURCHASES_ERROR',
				payload: error.message,
			});
			console.error('Error al registrar el pedido:', error);
			showAlert({
				icon: 'error',
				title: 'Error al registrar el pedido. Intente nuevamente!',
			});
		}
	};

	const editPurchaseAction = async (id, values) => {
		dispatch({
			type: 'DATA_PURCHASES_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const updatedPurchase = await apiURL.put(
				`/api/purchase/${id}`,
				values,
				{
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				}
			);
			dispatch({
				type: 'EDIT_PURCHASE_SUCCESS',
				payload: updatedPurchase.data,
			});
			showAlert({
				icon: 'success',
				title: 'Pedido editado correctamente',
			});
			return updatedPurchase.data;
		} catch (error) {
			dispatch({
				type: 'DATA_PURCHASES_ERROR',
				payload: error.message,
			});
			console.error('Error al editar el pedido:', error);
			showAlert({
				icon: 'error',
				title: 'Error al editar el pedido. Intente nuevamente!',
			});
		}
	};

	const deletePurchaseAction = async (id) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la eliminacion definitiva del pedido?',
			icon: 'warning',
		});
		if (isConfirmed) {
			dispatch({
				type: 'DATA_PURCHASES_PENDING',
			});
			try {
				const token = localStorage.getItem('token');
				const deletedPurchase = await apiURL.delete(
					`/api/purchase/${id}`,
					{
						withCredentials: true,
						headers: { authorization: `Bearer ${token}` },
					}
				);
				dispatch({
					type: 'DELETE_PURCHASE_SUCCESS',
					payload: id,
				});
				showAlert({
					icon: 'success',
					title: 'Pedido eliminado correctamente',
				});
				return deletedPurchase.data;
			} catch (error) {
				dispatch({
					type: 'DATA_PURCHASES_ERROR',
					payload: error.message,
				});
				showAlert({
					icon: 'error',
					title: 'Error al eliminar el pedido. Intente nuevamente!',
				});
			}
		}
	};

	return {
		dataPurchases,
		addPurchaseAction,
		editPurchaseAction,
		deletePurchaseAction,
	};
};
