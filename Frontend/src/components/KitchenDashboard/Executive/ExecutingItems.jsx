/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useReducer, useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { KitchenReducer, initialState } from '../../../reducer/KitchenReducer';
import { useKitchenActions } from '../../../hooks/useKitchenActions.js';
import { formatElapsedTime } from '../../../helpers/ElapsedTime';
import Loader from '../../../helpers/Loader';
import { Pagination } from '../../../helpers/Pagination.jsx';
import Modals from '../../Modals.jsx';
import { InfoMenu } from './InfoMenu.jsx';

export const ExecutingItems = ({ executingItems }) => {
	const [state, dispatch] = useReducer(KitchenReducer, initialState);
	const [currentPage, setCurrentPage] = useState(1);
	const [info, setInfo] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const { startTimer, stopTimer } = useKitchenActions(dispatch);

	// Filtra por ítems que no hayan sido enviados a kitchen
	const filteredItems = executingItems.filter(
		(filteredItem) => filteredItem.item.cookedAt === undefined
	);

	// Asigna un cronómetro a cada ítem individualmente iterando en cada uno
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

	// ABRE MODAL DE INFO DEL MENU
	const handleInfo = (item) => {
		setSelectedItem(item);
		setInfo(true);
	};

	// CIERRA MODAL DE INFO DEL MENU
	const handleCloseModal = () => {
		setInfo(false);
		setSelectedItem(null);
	};

	// Maneja el background de cada ítem según el tiempo transcurrido. Si supera 40 mins cambia a amarillo. Si supera 50 min cambia a rojo
	const getBackground = (milliseconds) => {
		const minutes = Math.floor(milliseconds / (1000 * 60));
		if (minutes > 50) {
			return 'bg-red-300';
		} else if (minutes > 40) {
			return 'bg-yellow-300';
		} else {
			return 'bg-white';
		}
	};

	// CALCULA LA CANTIDAD DE ITEMS EN CADA PAGINA
	const cardPerPage = 10;
	const indexOfLastItem = currentPage * cardPerPage;
	const indexOfFirstItem = indexOfLastItem - cardPerPage;
	const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(filteredItems.length / cardPerPage);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	if (state.loading) {
		return <Loader />;
	}

	return (
		<section className='md:w-3/4 border-r-2 border-slate-700'>
			<div className=''>
				<div className='flex items-center justify-center h-[64px] bg-slate-700 text-white'>
					<h2 className='font-bold text-3xl'>Pedidos en Ejecución</h2>
				</div>
				<div className='flex flex-row flex-wrap items-center justify-around'>
					{currentItems && currentItems.length > 0 ? (
						currentItems.map(({ order, item }, index) => (
							<div key={index} className='m-2'>
								<Card
									className={`w-[200px] h-auto rounded-xl border-2 border-slate-700 flex flex-col justify-between ${getBackground(
										state.timers[`${order._id}-${item._id}`] || 0
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
											<p className='text-center'>
												{item.name}

												<Button
													onClick={() => handleInfo(item)}
													tooltip='Informacion del menu'
													className='noborder'>
													<i className='ml-1 text-center text-xl mb-2 fa-solid fa-circle-info text-blue-800 hover:text-blue-500'></i>
												</Button>
											</p>{' '}
											<p className=' font-bold'>x {item.quantity}</p>
										</div>
									</div>
									<div className='flex flex-row flex-wrap items-center justify-center'>
										<Button
											className='text-green-800 noborder'
											tooltip='Confirmar producción'
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
												state.timers[`${order._id}-${item._id}`] ||
													0
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
			<Pagination
				totalPages={totalPages}
				currentPage={currentPage}
				paginate={paginate}
			/>
			{info && selectedItem && (
				<Modals
					isOpen={true}
					onClose={handleCloseModal}
					title='Informacion del menu'>
					<InfoMenu itemName={selectedItem.name} />
				</Modals>
			)}
		</section>
	);
};
