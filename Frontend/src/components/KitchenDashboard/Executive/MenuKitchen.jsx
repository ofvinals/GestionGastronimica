/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { OrderContext } from '../../../context/OrderContext';
import { useOrderActions } from '../../../hooks/useOrderActions.js';
import { PendingItems } from './PendingItems';
import { ExecutingItems } from './ExecutingItems';
import Loader from '../../../helpers/Loader';

export const MenuKitchen = () => {
	const { state, loading } = useContext(OrderContext);
	const { dataOrders } = useOrderActions();

	// CARGA TODAS LAS ORDENES
	useEffect(() => {
		dataOrders();
	}, []);

	// FILTRA ORDENES POR AQUELLAS QUE ESTEN ABIERTAS
	const FilterByOrderOpen = state.orders.filter(
		(order) => order.orderOpen === true
	);

	// ITERA SOBRE LOS ITEMS Y SEPARA EN VARIABLES LOS PENDIENTES Y EN EJECUCION. GUARDA EN VARIABLES
	const pendingItems = [];
	const executingItems = [];
	FilterByOrderOpen.forEach((order) => {
		order.items.forEach((item) => {
			if (item.pending) {
				pendingItems.push({ order, item });
			} else {
				executingItems.push({ order, item });
			}
		});
	});

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className='flex flex-col flex-wrap md:flex-row'>
					<PendingItems pendingItems={pendingItems} />
					<ExecutingItems executingItems={executingItems} />
				</div>
			)}
		</>
	);
};
