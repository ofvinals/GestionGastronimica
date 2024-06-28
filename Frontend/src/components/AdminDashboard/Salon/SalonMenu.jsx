import RestaurantLayout from './RestaurantLayout';
import { TableDashboard } from './TableDashboard';
import { useState } from 'react';

export const SalonMenu = () => {
	const [activeButton, setActiveButton] = useState('tables');
	const [showDataTable, setShowDataTable] = useState(true);
	const [showDataLayout, setShowDataLayout] = useState(false);

	// const [showDataSales, setShowDataSales] = useState(false);

	const handleTable = () => {
		setShowDataTable(true);
		// setShowDataSales(false);
		setShowDataLayout(false);
	};

	const handleSales = () => {
		setShowDataTable(false);
		// setShowDataSales(true);
		setShowDataLayout(false);
	};
	const handleLayout = () => {
		setShowDataTable(false);
		// setShowDataSales(true);
		setShowDataLayout(true);
	};

	return (
		<>
			<section>
				<div className='px-5 pt-2 bg-slate-600 flex flex-wrap flex-row items-center justify-around'>
					<button
						onClick={() => {
							handleTable();
							setActiveButton('tables');
						}}
						className={`mx-3 border-none text-white p-2   ${
							activeButton === 'tables'
								? 'bg-slate-700 text-white rounded-t-lg'
								: 'bg-transparent text-white '
						}`}>
						Mesas
					</button>
					<button
						onClick={() => {
							handleLayout();
							setActiveButton('layout');
						}}
						className={`mx-3 border-none text-white p-2   ${
							activeButton === 'layout'
								? 'bg-slate-700 text-white rounded-t-lg'
								: 'bg-transparent text-white '
						}`}>
						Layout de Salon
					</button>
					<button
						onClick={() => {
							handleSales();
							setActiveButton('sales');
						}}
						className={`mx-3 border-none text-white p-2  ${
							activeButton === 'sales'
								? 'bg-slate-700 text-white rounded-t-lg'
								: 'bg-transparent text-white '
						}`}>
						Ventas
					</button>
				</div>
				<div className='w-full'>
					{showDataTable && <TableDashboard />}
					{/* {showDataSales && <SalesDashboard />} */}
					{showDataLayout && <RestaurantLayout />}
				</div>
			</section>
		</>
	);
};
