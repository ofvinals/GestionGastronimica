import { useContext, useEffect, useState } from 'react';
import '../../../css/Custom.css';
import { useOrderActions } from '../../../hooks/useOrderActions';
import { CashsDashboard } from './CashsDashboard';
import { OrderContext } from '../../../context/OrderContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const CashMenu = () => {
	const [activeButton, setActiveButton] = useState('');
	const [data, setData] = useState([]);
	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(null);
	const { dataOrders } = useOrderActions();
	const { state } = useContext(OrderContext);

	useEffect(() => {
		dataOrders();
		setData(state.orders);
	}, []);

	// ABRE DATEPICKER
	const handleDayFilter = () => {
		setOpenDatePicker((prev) => !prev);
	};

	// FILTRA SOLO LAS ORDENES QUE ESTEN CERRADAS Y LAS DEL DIA ACTUAL
	const handleDayCash = () => {
		const today = new Date().toISOString().split('T')[0];
		const filteredDayCash = state.orders.filter((order) => {
			const orderDate = order.createdAt.split('T')[0];
			return order.orderOpen === false && orderDate === today;
		});
		setOpenDatePicker(false);
		setData(filteredDayCash);
	};

	const onChange = (dates) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
		if (start && end) {
			const filteredCash = state.orders.filter((order) => {
				const orderDate = new Date(order.createdAt.split('T')[0]);
				return (
					order.orderOpen === false &&
					orderDate >= start &&
					orderDate <= end
				);
			});
			setData(filteredCash);
		}
	};

	return (
		<section>
			<div className='px-5 shadowIndex w-full rounded-t-md bg-slate-700 flex flex-wrap flex-row items-center justify-around sm:justify-between drop-shadow-3xl'>
				<div className='w-fit my-3 '>
					<h3 className=' text-white text-xl font-semibold'>
						Estado de Caja
					</h3>
				</div>

				<div className='flex flex-wrap w-2/3 flex-row items-center justify-around m-3'>
					<button
						onClick={() => {
							handleDayCash();
							setActiveButton('dayCash');
						}}
						className={`flex my-2 items-center text-sm font-bold py-2 px-4 rounded ${
							activeButton === 'dayCash'
								? 'border-slate-500 border-2 bg-slate-300  text-slate-600 font-bold'
								: 'border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white shadowIndex font-bold'
						}`}>
						Caja del Dia
					</button>
					<button
						onClick={() => {
							handleDayFilter();
							setActiveButton('dayFilter');
						}}
						className={`flex my-2 items-center text-sm font-bold py-2 px-4 rounded ${
							activeButton === 'dayFilter'
								? 'border-slate-200 border-2 bg-slate-300  text-slate-600 font-bold'
								: 'border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white shadowIndex font-bold'
						}`}>
						Filtrar por Fechas
					</button>
				</div>
			</div>
			<div className='flex flex-wrap w-full flex-col items-center my-2 justify-center'>
				{openDatePicker && (
					<>
						<h3 className='text-sm my-1 font-semibold'>
							Seleccioná un rango de fechas
						</h3>
						<DatePicker
							selected={startDate}
							onChange={onChange}
							startDate={startDate}
							endDate={endDate}
							selectsRange
							changeYear
							inline
						/>
					</>
				)}
			</div>
			<div className='w-full'>
				<CashsDashboard data={data} />
			</div>
		</section>
	);
};
