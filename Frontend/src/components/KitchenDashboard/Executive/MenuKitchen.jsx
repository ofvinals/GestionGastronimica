/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { OrderContext } from '../../../context/OrderContext';
import { useOrderActions } from '../../../hooks/useOrderActions.js';
import { PendingItems } from './PendingItems';
import { ExecutingItems } from './ExecutingItems';
import Loader from '../../../utils/Loader';
import { useMenuActions } from '../../../hooks/useMenuActions.js';

export const MenuKitchen = () => {
	const { state: orderState } = useContext(OrderContext);
	const { dataMenus } = useMenuActions();
	const { dataOrders } = useOrderActions();

	// CARGA TODAS LAS ORDENES Y MENUS
	useEffect(() => {
		dataOrders();
		dataMenus();
	}, []);

	// FILTRA ORDENES POR AQUELLAS QUE ESTEN ABIERTAS
	const FilterByOrderOpen = orderState.orders.filter(
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

	if (orderState.loading) {
		return <Loader />;
	}

	return (
		<section>
			<div className='flex flex-row flex-wrap items-center justify-around my-2'>
				<p className='font-semibold text-lg'>
					<i className='fa-solid fa-circle mr-2 text-white'></i>En Tiempo
					(- 40 min)
				</p>
				<p className='font-semibold text-lg'>
					<i className='fa-solid fa-circle mr-2 text-yellow-300'></i>
					Demorado (40-50 min)
				</p>
				<p className='font-semibold text-lg'>
					<i className='fa-solid fa-circle mr-2 text-red-400'></i>Muy
					demorado (+ 50 min)
				</p>
			</div>

			<section className='flex flex-col flex-wrap md:flex-row'>
				<ExecutingItems executingItems={executingItems} />
				<PendingItems pendingItems={pendingItems} />
			</section>
		</section>
	);
};
