import { useState } from 'react';
import MenuLayout from '../Salon/Layout/MenuLayout';
import { SalesDashboard } from './Sales/SalesDashboard';
import { MonitorDashboard } from './Monitor/MonitorDashboard';
import { TableDashboard } from './TableDashboard';

export const SalonMenu = () => {
	const [activeButton, setActiveButton] = useState('tables');
	const [showDataTable, setShowDataTable] = useState(true);
	const [showDataLayout, setShowDataLayout] = useState(false);
	const [showDataSales, setShowDataSales] = useState(false);
	const [showDataMonitor, setShowDataMonitor] = useState(false);

	const handleTable = () => {
		setShowDataTable(true);
		setShowDataLayout(false);
		setShowDataSales(false);
		setShowDataMonitor(false);
	};

	const handleLayout = () => {
		setShowDataTable(false);
		setShowDataLayout(true);
		setShowDataSales(false);
		setShowDataMonitor(false);
	};

	const handleSales = () => {
		setShowDataTable(false);
		setShowDataLayout(false);
		setShowDataSales(true);
		setShowDataMonitor(false);
	};

	const handleMonitor = () => {
		setShowDataTable(false);
		setShowDataLayout(false);
		setShowDataSales(false);
		setShowDataMonitor(true);
	};

	return (
		<section>
			<div className='px-5 pt-3 shadowIndex rounded-t-md bg-slate-600 flex flex-wrap flex-row items-center justify-around'>
				<button
					onClick={() => {
						handleMonitor();
						setActiveButton('monitor');
					}}
					className={`mx-3 border-none text-white p-2 ${
						activeButton === 'monitor'
							? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
							: 'bg-transparent text-white hover:font-bold'
					}`}>
					Estado de Mesas
				</button>
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
					Monitor de Salon
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
			</div>
			<div className='w-full'>
				{showDataTable && <TableDashboard />}
				{showDataLayout && <MenuLayout />}
				{showDataSales && <SalesDashboard />}
				{showDataMonitor && <MonitorDashboard />}
			</div>
		</section>
	);
};

export default SalonMenu;
