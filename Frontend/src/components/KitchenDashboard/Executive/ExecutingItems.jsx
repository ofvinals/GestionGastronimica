/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { DateTime } from 'luxon';
import { useOrderActions } from '../../../hooks/useOrderActions';
import { Button } from 'primereact/button';

export const ExecutingItems = ({ executingItems }) => {
	const [timers, setTimers] = useState({});
	const [intervals, setIntervals] = useState({});
	const { updateOrderCooked } = useOrderActions();

	// FILTRA POR ITEMS QUE NO HAYAN SIDO ENVIADOS A KITCHEN
	const filteredItems = executingItems.filter(
		(filteredItem) => filteredItem.item.cookedAt === undefined
	);

	// CONVIERTE LA OPENAT A ZONA ARGENTINA Y CONFIGURA EL CRONOMETRO
	const startTimerFromOpenAt = (orderId, itemId, openAt) => {
		const startTime = DateTime.fromISO(openAt, { zone: 'utc' }).setZone(
			'America/Argentina/Buenos_Aires'
		);
		const intervalId = setInterval(() => {
			setTimers((prevTimers) => ({
				...prevTimers,
				[`${orderId}-${itemId}`]: Date.now() - startTime.toMillis(),
			}));
		}, 1000);
		setIntervals((prevIntervals) => ({
			...prevIntervals,
			[`${orderId}-${itemId}`]: intervalId,
		}));
	};

	// ASIGNA UN CRONOMETRO A CADA ITEM INDIVIDUALMENTE ITERANDO EN CADA UNO
	useEffect(() => {
		filteredItems.forEach(({ order, item }) => {
			if (order && order.openAt && !timers[`${order._id}-${item._id}`]) {
				startTimerFromOpenAt(order._id, item._id, order.openAt);
			}
		});
		return () => {
			Object.values(intervals).forEach(clearInterval);
		};
	}, []);

	// FORMATEA LA HORA
	const formatElapsedTime = (milliseconds) => {
		const hours = Math.floor(milliseconds / (1000 * 60 * 60));
		const minutes = Math.floor(
			(milliseconds % (1000 * 60 * 60)) / (1000 * 60)
		);
		const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
		return `${hours}h ${minutes}m ${seconds}s`;
	};

	// FUNCION PARA PARAR EL CRONOMETRO Y GUARDAR EL TIEMPO TRANSCURRIDO EN KITCHEN CUANDO EL PEDIDO ESTA LISTO
	const stopTimer = (orderId, itemId) => {
		clearInterval(intervals[`${orderId}-${itemId}`]);
		setIntervals((prevIntervals) => {
			const { [`${orderId}-${itemId}`]: _, ...rest } = prevIntervals;
			return rest;
		});
		const elapsed = timers[`${orderId}-${itemId}`] || 0;
		// ACTUALIZA EL ESTADO DE COOKEDAT CON LA FECHA DE FINALIZACION
		updateOrderCooked(orderId, itemId, elapsed);
	};

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
		<div className='md:w-3/4 border-l-2 border-slate-700'>
			<div className=''>
				<div className='flex items-center justify-center h-[64px] bg-slate-700 text-white'>
					<h2 className='font-bold text-3xl'>Pedidos en Ejecución</h2>
				</div>
				<div className='flex flex-row flex-wrap items-center justify-around'>
					{filteredItems && filteredItems.length > 0 ? (
						filteredItems.map(({ order, item }, index) => (
							<div key={index} className='m-2'>
								<Card
									className={`w-[200px] h-auto rounded-xl border-2 border-slate-700 flex flex-col justify-between ${getBackground(
										timers[`${order._id}-${item._id}`] || 0
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
											<p className=' font-bold'>{item.quantity}</p>
											<p className='text-center'>{item.name}</p>
										</div>
									</div>
									<div className='flex flex-row flex-wrap items-center justify-center'>
										<Button
											className='text-green-800'
											tooltip='Confirmar produccion'
											tooltipOptions={{ position: 'top' }}
											onClick={() => stopTimer(order._id, item._id)}>
											<i className='text-center text-[70px] mb-2 fa-solid fa-square-check text-green-800 hover:text-green-500'></i>
										</Button>
									</div>
									<div className='w-full text-center'>
										<p className='w-full text-sm'>
											Tiempo en preparación:{' '}
											{formatElapsedTime(
												timers[`${order._id}-${item._id}`] || 0
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
	);
};
