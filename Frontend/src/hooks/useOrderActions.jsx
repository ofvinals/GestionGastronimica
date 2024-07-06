import { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import { apiURL } from '/api/apiURL.js';
import { showAlert, confirmAction } from '../helpers/showAlert';

export const useOrderActions = () => {
	const { dispatch } = useContext(OrderContext);

	const dataOrders = async () => {
		dispatch({ type: 'DATA_ORDERS_PENDING' });
		try {
			const token = localStorage.getItem('token');
			const orders = await apiURL.get('/api/orders', {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			console.log(orders);
			dispatch({ type: 'DATA_ORDERS_SUCCESS', payload: orders.data });
			return orders.data;
		} catch (error) {
			dispatch({ type: 'DATA_ORDERS_ERROR', payload: error.message });
			console.error('Error al buscar la comanda:', error);
			showAlert({
				icon: 'error',
				title: 'Error al buscar la comanda. Intente nuevamente!',
			});
		}
	};

	const addOrderPrevAction = async (values) => {
		console.log(values);
		dispatch({
			type: 'ADD_ORDERS_PREV_SUCCESS',
			payload: values,
		});
	};

	const addOrderAction = async (values) => {
		dispatch({ type: 'DATA_ORDERS_PENDING' });
		try {
			console.log(values);
			const token = localStorage.getItem('token');
			const order = await apiURL.post('/api/orders', values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			console.log(order.data);
			dispatch({ type: 'ADD_ORDERS_SUCCESS', payload: order.data });
			showAlert({
				icon: 'success',
				title: 'Comanda enviada correctamente',
			});
			return order.data;
		} catch (error) {
			dispatch({ type: 'DATA_ORDERS_ERROR', payload: error.message });
			console.error('Error al registrar la comanda:', error);
			showAlert({
				icon: 'error',
				title: 'Error al enviar la comanda. Intente nuevamente!',
			});
		}
	};

	const updateOrderPending = async (itemIds) => {
		dispatch({ type: 'DATA_ORDERS_PENDING' });

		try {
			const token = localStorage.getItem('token');
			const updatedOrder = await apiURL.put(
				`/api/orders/`, 
				{ itemIds },
				{
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				}
			);
			dispatch({
				type: 'UPDATE_ORDER_PENDING_SUCCESS',
				payload: updatedOrder.data, 
			});

			showAlert({
				icon: 'success',
				title: 'Items pendientes enviados correctamente',
			});

			return updatedOrder.data;
		} catch (error) {
			dispatch({
				type: 'UPDATE_ORDER_PENDING_ERROR',
				payload: error.message,
			});
			console.error('Error al actualizar el estado de los ítems:', error);
			showAlert({
				icon: 'error',
				title: 'Error al actualizar el estado de los ítems. Intente nuevamente!',
			});
		}
	};

	const editOrderAction = async (id, values) => {
		dispatch({ type: 'DATA_ORDERS_PENDING' });
		try {
			const token = localStorage.getItem('token');
			const updatedOrder = await apiURL.put(`/api/orders/${id}`, values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({
				type: 'EDIT_ORDERS_SUCCESS',
				payload: updatedOrder.data,
			});
			showAlert({
				icon: 'success',
				title: 'Comanda editado correctamente',
			});
			return updatedOrder.data;
		} catch (error) {
			dispatch({ type: 'DATA_ORDERS_ERROR', payload: error.message });
			console.error('Error al editar la comanda:', error);
			showAlert({
				icon: 'error',
				title: 'Error al editar la comanda. Intente nuevamente!',
			});
		}
	};

	const orderCashAction = async (id) => {
		// const isConfirmed = await confirmAction({
		// 	title: 'Confirmas el cierre de la mesa?',
		// 	icon: 'warning',
		// });
		// if (isConfirmed) {
			dispatch({ type: 'DATA_ORDERS_PENDING' });
			try {
				const updatedValues = { status: false };
				const token = localStorage.getItem('token');
				const orderCash = await apiURL.put(
					`/api/orders/${id}`,
					updatedValues,
					{
						withCredentials: true,
						headers: { authorization: `Bearer ${token}` },
					}
				);
				dispatch({ type: 'CASH_ORDER_SUCCESS', payload: id });
				showAlert({
					icon: 'success',
					title: 'Mesa cerrada correctamente. A continuacion ingrese el metodo de pago',
				});
				return orderCash.data;
			} catch (error) {
				dispatch({ type: 'DATA_ORDERS_ERROR', payload: error.message });
				console.error('Error al cerrar la mesa:', error);
				showAlert({
					icon: 'error',
					title: 'Error al cerrar la mesa. Intente nuevamente!',
				});
			}
		
		return;
	};

	const deleteOrderPrevAction = async (id) => {
		console.log(id);
		try {
			dispatch({ type: 'DELETE_PREV_ORDERS_SUCCESS', payload: id });
		} catch (error) {
			dispatch({ type: 'DATA_ORDERS_ERROR', payload: error.message });
			console.log(error);
		}
	};

	return {
		dataOrders,
		addOrderPrevAction,
		addOrderAction,
		updateOrderPending,
		editOrderAction,
		orderCashAction,
		deleteOrderPrevAction,
	};
};
