/* eslint-disable react/prop-types */

import BalanceChart from './BalanceChart';

export const BalanceData = ({
	totalSales,
	totalBills,
	startDate,
	endDate,
	sales,
	bills,
}) => {
	// Calcula el balance
	const balance = totalSales - totalBills;

	// Formatea el balance con punto de miles y sin decimales
	const formattedBalance = balance.toLocaleString('es-AR', {
		style: 'currency',
		currency: 'ARS',
		maximumFractionDigits: 0,
	});

	// formatea la fecha con mes en letras
	const formattedStartDate = startDate
		? startDate.toLocaleDateString('es-AR', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
		  })
		: '';
	const formattedEndDate = endDate
		? endDate.toLocaleDateString('es-AR', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
		  })
		: '';

	const salesMap = {};
	sales.forEach((sale) => {
		const date = new Date(sale.createdAt).toLocaleDateString('es-AR');
		salesMap[date] = (salesMap[date] || 0) + sale.finalPrice;
	});

	const billsMap = {};
	bills.forEach((bill) => {
		const date = new Date(bill.date).toLocaleDateString('es-AR');
		billsMap[date] = (billsMap[date] || 0) + bill.price;
	});

	// Combina todas las fechas de ventas y gastos, elimina duplicados y ordénalas
	const labels = Array.from(
		new Set([...Object.keys(salesMap), ...Object.keys(billsMap)])
	).sort(
		(a, b) =>
			new Date(a.split('/').reverse().join('/')) -
			new Date(b.split('/').reverse().join('/'))
	);
	console.log(labels);
	console.log(billsMap);
	console.log(salesMap);

	const salesDataAligned = labels.map((label) => salesMap[label] || 0);
	const billsDataAligned = labels.map((label) => billsMap[label] || 0);

	return (
		<div className='flex flex-wrap flex-col items-center text-center justify-center'>
			<h2 className='text-xl font-semibold'>Balance Contable de Caja</h2>
			<div className='flex flex-wrap flex-row items-center  w-full justify-between'>
				<div className='flex flex-wrap flex-col w-1/5 items-center justify-center  p-2 min-h-[160px]'>
					<p className='my-1 min-h-[50px]'>Fecha/s Seleccionada/s</p>
					<p className='flex items-center min-h-[75px]'>
						<span className='font-semibold'>{formattedStartDate}</span> -{' '}
						<span className='font-semibold'>{formattedEndDate}</span>
					</p>
				</div>
				<div className='flex flex-wrap flex-col w-1/5 items-center justify-around'>
					<p className='flex items-center my-1 min-h-[50px] '>
						Total de Ventas{' '}
					</p>
					<span className='flex items-center font-semibold min-h-[75px]'>
						{' '}
						{totalSales.toLocaleString('es-AR', {
							style: 'currency',
							currency: 'ARS',
							maximumFractionDigits: 0,
						})}
					</span>
				</div>
				<div className='flex flex-wrap flex-col w-1/5 items-center justify-around'>
					<p className='flex items-center my-1 min-h-[50px] '>
						Total de Gastos{' '}
					</p>
					<span className='flex items-center font-semibold min-h-[75px]'>
						{totalBills.toLocaleString('es-AR', {
							style: 'currency',
							currency: 'ARS',
							maximumFractionDigits: 0,
						})}
					</span>
				</div>
				<div className='flex flex-wrap flex-col w-1/5 items-center justify-around text-2xl font-bold'>
					<p className='flex items-center my-1 min-h-[50px] '>Balance</p>
					<span
						className={`flex items-center min-h-[75px] ${
							balance < 0 ? 'text-red-600' : 'text-green-600'
						}`}>
						{formattedBalance}
					</span>
				</div>
			</div>
			<div className='w-full p-5'>
				<BalanceChart
					salesData={salesDataAligned}
					billsData={billsDataAligned}
					labels={labels}
				/>
			</div>
		</div>
	);
};
