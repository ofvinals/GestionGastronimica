/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useMemo, useState } from 'react';
import { OrderContext } from '../../../context/OrderContext';
import { useOrderActions } from '../../../hooks/useOrderActions';
import { CashOrder } from './CashOrder';
import { useLayoutActions } from '../../../hooks/useLayoutActions';
import { showAlert, confirmAction } from '../../../helpers/showAlert';
import moment from 'moment-timezone';
import Modals from '../../Modals';

const originalState = {
	1: { pending: false },
	2: { pending: true },
};

// RECIBE PROPS DE RESTAURANTLAYOUT SI TABLE IS OPEN
export const OrderCheck = ({
	onClose,
	tableId,
	onConfirm,
	currentLayout,
	salonId,
}) => {
	const { state: stateOrders } = useContext(OrderContext);
	const { dataOrders, updateOrderPending, deleteItemOrder, orderCashAction } =
		useOrderActions();
	const { updateTableIsOpenAction } = useLayoutActions();
	const [orders, setOrders] = useState([]);
	const [cashOrder, setCashOrder] = useState(false);
	const [modifiedItems, setModifiedItems] = useState([]);
	const [hasModifiedItems, setHasModifiedItems] = useState(false);

	// DEVUELVE TODAS LAS ORDENES GUARDADAS
	useEffect(() => {
		dataOrders();
	}, []);

	// Actualiza el estado de orders con las órdenes filtradas al cargarse los datos
	useEffect(() => {
		if (stateOrders && tableId) {
			const filteredOrders = stateOrders.orders.filter(
				(order) => order.tableId === tableId
			);
			setOrders(filteredOrders);
		}
	}, [stateOrders, tableId]);

	// VERIFICA SI SE MODIFICA MODIFIEDITEMS PARA ACTIVAR EL BOTON VERDE DE CONFIRMACION
	useEffect(() => {
		if (modifiedItems && modifiedItems.length > 0) {
			// Comprueba si alguno de los ítems tiene cambios
			const hasChanges = modifiedItems.some(
				(item) => item.pending !== originalState[item.id]?.pending
			);
			setHasModifiedItems(hasChanges);
		} else {
			setHasModifiedItems(false);
		}
	}, [modifiedItems]);

	// FILTRA LAS ORDENES PENDIENTES DE LA MESA SELECCIONADA
	const filteredOrder = useMemo(() => {
		if (stateOrders) {
			return stateOrders.orders.filter(
				(order) => order.tableId === tableId && order.orderOpen === true
			);
		}
		return [];
	}, [stateOrders, tableId]);

	const salonName = filteredOrder[0]?.salonName;
	const tableNum = filteredOrder[0]?.tableNum;
	const diners = filteredOrder[0]?.diners;
	const server = filteredOrder[0]?.server;

	// MANEJA EL ESTADO DE PENDING DE CADA ITEM
	const handleCheckboxChange = (orderId, itemId) => {
		const updatedOrders = orders.map((order) => {
			if (order._id === orderId) {
				const updatedItems = order.items.map((item) => {
					if (item._id === itemId) {
						item.pending = !item.pending;
						const modifiedItem = item;
						if (!modifiedItems.includes(modifiedItem)) {
							setModifiedItems([...modifiedItems, modifiedItem]);
						}
					}
					return item;
				});
				return { ...order, items: updatedItems };
			}
			return order;
		});
		setOrders(updatedOrders);
	};

	// FUNCION PARA ELIMINAR ITEMS PENDIENTES
	const handleDeleteItem = async (orderId, itemId) => {
		await deleteItemOrder(orderId, itemId);
		dataOrders();
	};

	// FILTRA ITEMS CON PENDING TRUE Y ENVIA NUEVA PREVORDER
	const handlePending = async () => {
		const itemIds = modifiedItems.map((item) => item._id);
		console.log(itemIds)
		try {
			// ACTUALIZA PENDING DE LOS ITEMS MODIFICADOS EN REDUCER Y BACKEND
			await updateOrderPending(itemIds);
			onClose();
		} catch (error) {
			console.error('Error al actualizar el item:', error);
		}
	};

	// FUNCIÓN PARA VERIFICAR SI TODOS LOS ÍTEMS ESTÁN PENDING FALSE
	const allItemsConfirmed = () => {
		return orders.every((order) =>
			order.items.every((item) => !item.pending)
		);
	};

	// FUNCIÓN PARA MANEJAR EL CIERRE DE LA MESA Y COBRO DE LA ORDEN
	const handleCash = async () => {
		if (allItemsConfirmed()) {
			const isConfirmed = await confirmAction({
				title: 'Confirmas el cierre de la mesa?',
				icon: 'warning',
			});
			if (isConfirmed) {
				const closeTime = moment().tz('America/Argentina/Buenos_Aires').toDate();
				const isOpen = false;
				const orderOpen = false;
				const index = currentLayout.findIndex(
					(table) => table._id === tableId
				);
				updateTableIsOpenAction(closeTime, salonId, tableId, isOpen, index);
				orderCashAction(closeTime, orderOpen, filteredOrder);
				setCashOrder(true);
			}
		} else {
			// SI HAY ITEMS PENDIENTES
			showAlert({
				icon: 'error',
				title: 'Tienes items aún están pendientes en la comanda. No puedes cerrar la mesa',
			});
		}
	};

	return (
		<div className=''>
			<>
				{filteredOrder.length > 0 && (
					<>
						<div className='border-b-2 border-gray-300 pb-2 mb-2'>
							<p className='text-lg font-semibold mb-1 '>
								{salonName} - Mesa {tableNum}
							</p>
							<p className='mt-3'>
								<span className='font-semibold'>Server:</span> {server}
							</p>
							<p className='mb-3'>
								<span className='font-semibold'>Comensales:</span>{' '}
								{diners}
							</p>
							{filteredOrder.map((order) => (
								<div key={order._id}>
									{order.items.map((item) => (
										<div
											key={item._id}
											className={
												item.pending
													? ' mx-2 border-t-2 border-slate-400'
													: ' mx-2 bg-slate-300 border-t-2 border-slate-400'
											}>
											<p className='font-semibold border-t-2 border-slate-300'>
												{item.name}
											</p>
											<p className='text-gray-700'>
												Cantidad: {item.quantity}
											</p>
											<p className='text-gray-600'>
												Observaciones: {item.text}
											</p>
											{item.pending ? (
												<div className='flex flex-row flex-wrap items-center justify-around'>
													<div className='ml-4 mt-2'>
														<label className='inline-flex items-center'>
															<input
																type='checkbox'
																className=' h-5 w-5 text-green-600 bg-green-500'
																checked={item.pending}
																onChange={() =>
																	handleCheckboxChange(
																		order._id,
																		item._id
																	)
																}
															/>
															<span className='ml-2 text-gray-700 font-semibold'>
																Pendiente
															</span>
														</label>
													</div>
													<button
														onClick={() =>
															handleDeleteItem(
																order._id,
																item._id
															)
														}>
														<i className='fa-solid fa-trash-can rounded-full p-2 border-2 mb-1 border-red-700 text-red-700 hover:bg-red-700 hover:text-red-100'></i>
													</button>
												</div>
											) : (
												<span className='ml-2 text-gray-900 font-bold'>
													Confirmado
												</span>
											)}
										</div>
									))}
								</div>
							))}
						</div>
					</>
				)}

				<div className='flex flex-wrap items-center justify-around mt-3'>
					<button
						onClick={onConfirm}
						className='text-white p-2 rounded-full hover:bg-blue-800 hover:text-blue-800'>
						<i className='fa-solid fa-circle-plus text-[40px] text-blue-800 hover:text-white'></i>
					</button>
					{hasModifiedItems ? (
						<button
							onClick={handlePending}
							className='text-white p-2 rounded-full hover:bg-green-800 hover:text-green-800'>
							<i className='fa-solid fa-circle-check text-[40px] text-green-800 hover:text-white'></i>
						</button>
					) : null}
					<button
						type='button'
						className='text-white p-2 rounded-full hover:bg-red-800 hover:text-red-800'
						onClick={onClose}>
						<i className='fa-solid fa-circle-xmark text-[40px] text-red-800 hover:text-white'></i>
					</button>
					<button
						type='button'
						className='text-white p-2 rounded-full hover:bg-slate-800 hover:text-slate-800'
						onClick={handleCash}>
						<i className='fa-solid fa-cash-register text-[40px] text-slate-800 hover:text-white'></i>
					</button>
				</div>
			</>
			{cashOrder && (
				<Modals
					isOpen={true}
					onClose={onClose}
					title='Cobrar Mesa'>
					<CashOrder
						order={filteredOrder}
						salonName={salonName}
						diners={diners}
						server={server}
						tableNum={tableNum}
						onClose={onClose}
					/>
				</Modals>
			)}
		</div>
	);
};
