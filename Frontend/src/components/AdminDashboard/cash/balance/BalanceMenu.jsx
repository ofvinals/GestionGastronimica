/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import '../../../../css/Custom.css';
import { useBillActions } from '../../../../hooks/useBillActions';
import { BillContext } from '../../../../context/BillContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useOrderActions } from '../../../../hooks/useOrderActions';
import { OrderContext } from '../../../../context/OrderContext';
import { BalanceData } from './BalanceData';

export const BalanceMenu = () => {
	const [activeButton, setActiveButton] = useState('dayBalance');
	const [sales, setSales] = useState([]);
	const [bills, setBills] = useState([]);
	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(null);
	const { dataBills } = useBillActions();
	const { dataOrders } = useOrderActions();
	const { state: stateOrder } = useContext(OrderContext);
	const { state: stateBill } = useContext(BillContext);

	useEffect(() => {
		dataOrders();
		setSales(stateOrder.orders);
		dataBills();
		setBills(stateBill.bills);
		handleDayBalance()
	}, []);

	// ABRE DATEPICKER
	const handleDayFilter = () => {
		setOpenDatePicker((prev) => !prev);
	};

	// FILTRA SOLO LAS DEL DIA ACTUAL
	const handleDayBalance = () => {
		const today = new Date().toISOString().split('T')[0];
		const filteredDayBill = stateBill.bills.filter((bill) => {
			const billDate = bill.date.split('T')[0];
			return billDate === today;
		});
		const filteredDaySale = stateOrder.orders.filter((order) => {
			const saleDate = order.createdAt.split('T')[0];
			return !order.orderOpen && saleDate === today;
		 });
		setOpenDatePicker(false);
		setBills(filteredDayBill);
		setSales(filteredDaySale);
	};

	// si se selecciona fechas, filtra los gastos y ventas por esas fechas
	const onChange = (dates) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
		if (start && end) {
			const filteredBill = stateBill.bills.filter((bill) => {
				const billDate = new Date(bill.date.split('T')[0]);
				return billDate >= start && billDate <= end;
			});
			const filteredSale = stateOrder.orders.filter((order) => {
				const saleDate = new Date(order.createdAt.split('T')[0]);
				return (
					order.orderOpen === false && saleDate >= start && saleDate <= end
				);
			});
			setBills(filteredBill);
			setSales(filteredSale);
		}
	};

	// calcula el total de ventas
	const totalSales = sales?.reduce((acc, sale) => {
		const price = parseFloat(sale.finalPrice);
		return acc + (isNaN(price) ? 0 : price);
	}, 0);

	// calcula el total de gastos
	const totalBills = bills?.reduce((acc, bill) => {
		const price = parseFloat(bill.price);
		return acc + (isNaN(price) ? 0 : price);
	}, 0);

	return (
		<section>
			<div className='py-2 shadowIndex w-full rounded-t-md bg-slate-700 flex flex-wrap flex-row items-center justify-around drop-shadow-3xl'>
				<button
					onClick={() => {
						handleDayBalance();
						setActiveButton('dayBalance');
					}}
					className={`flex my-2 items-center text-sm font-bold py-2 px-4 rounded ${
						activeButton === 'dayBalance'
							? 'border-slate-500 border-2 bg-slate-300  text-slate-600 font-bold'
							: 'border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white shadowIndex font-bold'
					}`}>
					Balance del Dia
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
			<div>
				<BalanceData
					totalSales={totalSales}
					totalBills={totalBills}
					startDate={startDate}
					endDate={endDate}
					sales={sales}
					bills={bills}
				/>
			</div>
		</section>
	);
};
