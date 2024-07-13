import { useState } from 'react';
import MenuLayout from '../Salon/Layout/MenuLayout';
import { TableDashboard } from './TableDashboard';
import { UnderConstruction } from '../UnderConstruction';

export const SalonMenu = () => {
	const [activeButton, setActiveButton] = useState('tables');
	const [showDataTable, setShowDataTable] = useState(true);
	const [showDataLayout, setShowDataLayout] = useState(false);
	const [showDataSales, setShowDataSales] = useState(false);

	const handleTable = () => {
		setShowDataTable(true);
		setShowDataLayout(false);
	};

	const handleLayout = () => {
		setShowDataTable(false);
		setShowDataLayout(true);
	};

	const handleSales = () => {
		setShowDataTable(false);
		setShowDataLayout(false);
		setShowDataSales(true)
	};

	return (
		<>
			<section>
				<div className='px-5 pt-3 shadowIndex rounded-t-md bg-slate-600 flex flex-wrap flex-row items-center justify-around'>
					<button
						onClick={() => {
							handleTable();
							setActiveButton('tables');
						}}
						className={`mx-3 border-none text-white p-2 ${
							activeButton === 'tables'
								? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
								: 'bg-transparent text-white hover:font-bold'
						}`}>
						Mesas
					</button>
					<button
						onClick={() => {
							handleLayout();
							setActiveButton('layout');
						}}
						className={`mx-3 border-none text-white p-2 ${
							activeButton === 'layout'
								? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
								: 'bg-transparent text-white hover:font-bold'
						}`}>
						Layout de Salon
					</button>
					<button
						onClick={() => {
							handleSales();
							setActiveButton('sales');
						}}
						className={`mx-3 border-none text-white p-2 ${
							activeButton === 'sales'
								? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
								: 'bg-transparent text-white hover:font-bold'
						}`}>
						Ventas
					</button>
				</div>
				<div className='w-full'>
					{showDataTable && <TableDashboard />}
					{showDataLayout && <MenuLayout />}
					{showDataSales && <UnderConstruction />}
				</div>
			</section>
		</>
	);
};

export default SalonMenu;
