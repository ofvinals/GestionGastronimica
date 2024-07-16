/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { KitchenReducer, initialState } from '../../../reducer/KitchenReducer';
import { useKitchenActions } from '../../../hooks/useKitchenActions';
import { formatElapsedTime } from '../../../helpers/ElapsedTime';
import Loader from '../../../helpers/Loader';

export const ExecutingItems = ({ executingItems }) => {
	const [state, dispatch] = useReducer(KitchenReducer, initialState);
	const { startTimer, stopTimer } = useKitchenActions(dispatch);

	// FILTRA POR ITEMS QUE NO HAYAN SIDO ENVIADOS A KITCHEN
	const filteredItems = executingItems.filter(
		(filteredItem) => filteredItem.item.cookedAt === undefined
	);

	// ASIGNA UN CRONOMETRO A CADA ITEM INDIVIDUALMENTE ITERANDO EN CADA UNO
	useEffect(() => {
		filteredItems.forEach(({ order, item }) => {
			if (
				order &&
				order.openAt &&
				!state.intervals[`${order._id}-${item._id}`]
			) {
				startTimer(order._id, item._id, order.openAt);
			}
		});
		return () => {
			Object.values(state.intervals).forEach(clearInterval);
		};
	}, [filteredItems]);

	// MANEJA EL BACKGROUND DE CADA ITEM SEGUN EL TIEMPO TRANSCURRIDO. SI SUPERA 40 MINS CAMBIA A AMARILLO. SI SUPERA 50 MIN CAMBIA A ROJO
	const getBackground = (milliseconds) => {
		const minutes = Math.floor(milliseconds / (1000 * 60));
		if (minutes > 50) {
			return 'bg-red-200';
		} else if (minutes > 40) {
			return 'bg-yellow-200';
		} else {
			return 'bg-white';
		}
	};

	return (
		<>
			{initialState.loading ? (
				<Loader />
			) : (
				<div className='md:w-3/4 border-l-2 border-slate-700'>
					<div className=''>
						<div className='flex items-center justify-center h-[64px] bg-slate-700 text-white'>
							<h2 className='font-bold text-3xl'>
								Pedidos en Ejecución
							</h2>
						</div>
						<div className='flex flex-row flex-wrap items-center justify-around'>
							{filteredItems && filteredItems.length > 0 ? (
								filteredItems.map(({ order, item }, index) => (
									<div key={index} className='m-2'>
										<Card
											className={`w-[200px] h-auto rounded-xl border-2 border-slate-700 flex flex-col justify-between ${getBackground(
												state.timers[`${order._id}-${item._id}`] ||
													0
											)}`}>
											<div className='flex-grow flex flex-col justify-between w-full h-full'>
												<div className='flex flex-row items-center justify-center font-semibold text-xs w-full'>
													<p className='w-1/2 text-center'>
														{order.salonName}
													</p>
													<p className='w-1/2 text-center'>
														Mesa {order.tableNum}
													</p>
												</div>
												<div className='flex flex-row items-center justify-center mt-1 flex-wrap w-full text-xs'>
													<p className='text-center'>
														Server: {order.server}
													</p>
												</div>
												<div className='flex my-3 flex-col flex-wrap text-2xl items-center justify-center'>
													<p className=' font-bold'>
														{item.quantity}
													</p>
													<p className='text-center'>
														{item.name}
													</p>
												</div>
											</div>
											<div className='flex flex-row flex-wrap items-center justify-center'>
												<Button
													className='text-green-800'
													tooltip='Confirmar produccion'
													tooltipOptions={{ position: 'top' }}
													onClick={() =>
														stopTimer(order._id, item._id, state)
													}>
													<i className='text-center text-[70px] mb-2 fa-solid fa-square-check text-green-800 hover:text-green-500'></i>
												</Button>
											</div>
											<div className='w-full text-center'>
												<p className='w-full text-sm'>
													Tiempo en preparación:{' '}
													{formatElapsedTime(
														state.timers[
															`${order._id}-${item._id}`
														] || 0
													)}
												</p>
											</div>
										</Card>
									</div>
								))
							) : (
								<div className=''>
									<h1 className='text-slate-800 text-center my-10 text-2xl font-semibold'>
										No existen órdenes en ejecución
									</h1>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};
