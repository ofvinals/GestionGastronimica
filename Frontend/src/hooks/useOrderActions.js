import { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import { apiURL } from '/api/apiURL';
import { showAlert, confirmAction } from '../utils/showAlert';
import moment from 'moment';

export const useOrderActions = () => {
	const { dispatch } = useContext(OrderContext);

	// AGREGA SOLO A REDUCER LA PREVORDER
	const addOrderPrevAction = async (values) => {
		dispatch({
			type: 'ADD_ORDERS_PREV_SUCCESS',
			payload: values,
		});
	};

	// BORRA LA PREVORDER DE REDUCER
	const deleteOrderPrevAction = (id) => {
		dispatch({
			type: 'DELETE_PREV_ORDERS_SUCCESS',
			payload: id,
		});
	};

	// DEVUELVE TODAS LAS ORDENES GUARDADAS
	const dataOrders = async () => {
		dispatch({
			type: 'DATA_ORDERS_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const orders = await apiURL.get('/api/orders', {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({
				type: 'DATA_ORDERS_SUCCESS',
				payload: orders.data,
			});
			return orders.data;
		} catch (error) {
			dispatch({
				type: 'DATA_ORDERS_ERROR',
				payload: error.message,
			});
			console.error('Error al buscar ordens:', error);
			showAlert({
				icon: 'error',
				title: 'Error al buscar ordens. Intente nuevamente!',
			});
		}
	};

	// GUARDA LA ORDEN
	const addOrderAction = async (values) => {
		dispatch({
			type: 'DATA_ORDERS_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const order = await apiURL.post('/api/orders', values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({
				type: 'ADD_ORDERS_SUCCESS',
				payload: order.data,
			});
			showAlert({
				icon: 'success',
				title: 'Orden enviada correctamente',
			});
			return order.data;
		} catch (error) {
			dispatch({
				type: 'DATA_ORDERS_ERROR',
				payload: error.message,
			});
			console.error('Error al registrar la orden:', error);
			showAlert({
				icon: 'error',
				title: 'Error al registrar la orden. Intente nuevamente!',
			});
		}
	};

	const updateOrderAction = async (orderId, values) => {
		dispatch({
			type: 'DATA_ORDERS_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const updatedOrder = await apiURL.put(
				`/api/orders/${orderId}`,
				values,
				{
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				}
			);
			dispatch({
				type: 'UPDATE_ORDER_SUCCESS',
				payload: updatedOrder.data,
			});
			showAlert({
				icon: 'success',
				title: 'Orden actualizada correctamente',
			});
			return updatedOrder.data;
		} catch (error) {
			dispatch({ type: 'DATA_ORDERS_ERROR', payload: error.message });
			console.error('Error al actualizar la orden:', error);
			showAlert({
				icon: 'error',
				title: 'Error al actualizar la orden. Intente nuevamente!',
			});
		}
	};

	// ACTUALIZA EL ESTADO PENDIENTE A FALSE DEL ITEM SELECCIONADO.
	const updateItemsPending = async (itemIds) => {
		dispatch({
			type: 'DATA_ORDERS_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const updatedOrder = await apiURL.put(
				`/api/orders/update-pending`,
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

	// ACTUALIZA EL VALOR DE COOKEDAT DE CADA ITEM TERMINADO DE PRODUCIR
	const updateOrderCooked = async (orderId, itemId, cookedAt) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la elaboracion del pedido?',
			icon: 'warning',
			confirmButtonColor: '#085718',
		});
		if (isConfirmed) {
			dispatch({
				type: 'DATA_ORDERS_PENDING',
			});
			try {
				const token = localStorage.getItem('token');
				const updatedOrder = await apiURL.put(
					`/api/orders/${orderId}/items/${itemId}`,
					{ cookedAt },
					{
						withCredentials: true,
						headers: { authorization: `Bearer ${token}` },
					}
				);
				dispatch({
					type: 'UPDATE_ITEM_COOKED',
					payload: { orderId, itemId, cookedAt },
				});
				return updatedOrder.data;
			} catch (error) {
				dispatch({ type: 'DATA_ORDERS_ERROR', payload: error.message });
				console.error('Error al editar la orden:', error);
				showAlert({
					icon: 'error',
					title: 'Error al editar la orden. Intente nuevamente!',
				});
			}
		}
	};

	const deleteItemOrder = async (orderId, itemId) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la eliminación del item pendiente?',
			icon: 'warning',
		});
		if (isConfirmed) {
			dispatch({
				type: 'DATA_ORDERS_PENDING',
			});
			try {
				const token = localStorage.getItem('token');
				const response = await apiURL.delete(
					`/api/orders/${orderId}/items/${itemId}`,
					{
						withCredentials: true,
						headers: { authorization: `Bearer ${token}` },
					}
				);
				dispatch({
					type: 'DELETE_ITEM_SUCCESS',
					payload: response.data,
				});
				showAlert({
					icon: 'success',
					title: 'Item pendiente eliminado correctamente',
				});
				return response.data;
			} catch (error) {
				dispatch({
					type: 'DATA_ORDERS_ERROR',
					payload: error.message,
				});
				console.error('Error al eliminar el item pendiente:', error);
				showAlert({
					icon: 'error',
					title: 'Error al eliminar el item pendiente. Intente nuevamente!',
				});
			}
		}
	};

	const orderCashAction = async (orderId, values) => {
		dispatch({
			type: 'DATA_ORDERS_PENDING',
		});

		try {
			const token = localStorage.getItem('token');
			// CALCULA EL TIEMPO DE USO ENTRE CLOSE Y OPEN
			const duration = moment.duration(
				moment(values.closeTime).diff(moment(values.openAt))
			);
			// EXTRAE HORA Y MINUTO DE LA DURACION
			const elapsedHours = Math.floor(duration.asHours());
			const elapsedMinutes = duration.minutes();
			const elapsedDuration = {
				hours: elapsedHours,
				minutes: elapsedMinutes,
			};
			// Calcular elapsedTime
			const closedOrders = await apiURL.put(
				`/api/orders/${orderId}/cash`,
				{
					...values,
					elapsedDuration,
				},
				{
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				}
			);

			dispatch({
				type: 'CASH_ORDER_SUCCESS',
				payload: closedOrders.data,
			});
			showAlert({
				icon: 'success',
				title: 'Mesa cerrada correctamente!',
			});
			return closedOrders.data;
		} catch (error) {
			dispatch({
				type: 'DATA_ORDERS_ERROR',
				payload: error.message,
			});
			console.error('Error al cerrar la mesa:', error);
			showAlert({
				icon: 'error',
				title: 'Error al cerrar la mesa. Intente nuevamente!',
			});
		}
	};

	const deleteOrderAction = async (id) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la eliminacion definitiva de la venta?',
			icon: 'warning',
		});
		if (isConfirmed) {
			dispatch({
				type: 'DATA_ORDERS_PENDING',
			});
			try {
				const token = localStorage.getItem('token');
				const deletedSale = await apiURL.delete(`/api/orders/${id}`, {
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				});
				dispatch({
					type: 'DELETE_ORDER_SUCCESS',
					payload: id,
				});
				showAlert({
					icon: 'success',
					title: 'Venta eliminada correctamente',
				});
				return deletedSale.data;
			} catch (error) {
				dispatch({
					type: 'DATA_ORDERS_ERROR',
					payload: error.message,
				});
				showAlert({
					icon: 'error',
					title: 'Error al eliminar la venta. Intente nuevamente!',
				});
			}
		}
	};

	return {
		dataOrders,
		addOrderPrevAction,
		deleteOrderPrevAction,
		addOrderAction,
		updateOrderCooked,
		updateOrderAction,
		deleteItemOrder,
		updateItemsPending,
		orderCashAction,
		deleteOrderAction
	};
};
