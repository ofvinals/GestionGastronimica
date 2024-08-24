/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import '../../../../css/Custom.css';
import { useBillActions } from '../../../../hooks/useBillActions';
import { BillContext } from '../../../../context/BillContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BillDashboard } from './BillDashboard';

export const BillMenu = () => {
	const [activeButton, setActiveButton] = useState('dayBill');
	const [data, setData] = useState([]);
	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(null);
	const { dataBills } = useBillActions();
	const { state } = useContext(BillContext);

	useEffect(() => {
		dataBills();
		setData(state.bills);
	}, []);

	// ABRE DATEPICKER
	const handleDayFilter = () => {
		setOpenDatePicker((prev) => !prev);
	};

	// FILTRA SOLO LAS ORDENES QUE ESTEN CERRADAS Y LAS DEL DIA ACTUAL
	const handleDayBill = () => {
		const today = new Date().toISOString().split('T')[0];
		const filteredDayBill = state.bills.filter((bill) => {
			const billDate = bill.date.split('T')[0];
			return billDate === today;
		});
		setOpenDatePicker(false);
		setData(filteredDayBill);
	};

	const onChange = (dates) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
		if (start && end) {
			const filteredBill = state.bills.filter((bill) => {
				const billDate = new Date(bill.date.split('T')[0]);
				return billDate >= start && billDate <= end;
			});
			setData(filteredBill);
		}
	};

	return (
		<section>
			<div className='py-2 shadowIndex w-full rounded-t-md bg-slate-700 flex flex-wrap flex-row items-center justify-around drop-shadow-3xl'>
				<button
					onClick={() => {
						handleDayBill();
						setActiveButton('dayBill');
					}}
					className={`flex my-2 items-center text-sm font-bold py-2 px-4 rounded ${
						activeButton === 'dayBill'
							? 'border-slate-500 border-2 bg-slate-300  text-slate-600 font-bold'
							: 'border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white shadowIndex font-bold'
					}`}>
					Gastos del Dia
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
				<BillDashboard
					data={data}
					startDate={startDate}
					endDate={endDate}
				/>
			</div>
		</section>
	);
};
