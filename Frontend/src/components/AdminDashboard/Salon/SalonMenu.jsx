import { useState } from 'react';
import MenuLayout from '../Salon/Layout/MenuLayout';
import { SalesDashboard } from './Sales/SalesDashboard';
import { MonitorDashboard } from './Monitor/MonitorDashboard';
import { TableDashboard } from './TableDashboard';
import { UnderConstruction } from '../UnderConstruction';

export const SalonMenu = () => {
	const [activeComponent, setActiveComponent] = useState('tables');

	const renderComponent = () => {
		switch (activeComponent) {
			case 'tables':
				return <TableDashboard />;
			case 'layout':
				return <MenuLayout />;
			case 'sales':
				return <SalesDashboard />;
			case 'monitor':
				return <MonitorDashboard />;
			case 'reserv':
				return <UnderConstruction />;
			default:
				return null;
		}
	};

	return (
		<section>
			<div className='px-5 pt-3 shadowIndex rounded-t-md bg-slate-600 flex flex-wrap flex-row items-center justify-around'>
				<button
					onClick={() => setActiveComponent('monitor')}
					className={`mx-3 border-none text-white p-2 ${
						activeComponent === 'monitor'
							? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
							: 'bg-transparent text-white hover:font-bold'
					}`}>
					Estado de Mesas
				</button>
				<button
					onClick={() => setActiveComponent('tables')}
					className={`mx-3 border-none text-white p-2 ${
						activeComponent === 'tables'
							? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
							: 'bg-transparent text-white hover:font-bold'
					}`}>
					Monitor de Salon
				</button>
				<button
					onClick={() => setActiveComponent('sales')}
					className={`mx-3 border-none text-white p-2 ${
						activeComponent === 'sales'
							? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
							: 'bg-transparent text-white hover:font-bold'
					}`}>
					Ventas
				</button>
				<button
					onClick={() => setActiveComponent('layout')}
					className={`mx-3 border-none text-white p-2 ${
						activeComponent === 'layout'
							? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
							: 'bg-transparent text-white hover:font-bold'
					}`}>
					Layout de Salon
				</button>
				<button
					onClick={() => setActiveComponent('reserv')}
					className={`mx-3 border-none text-white p-2 ${
						activeComponent === 'reserv'
							? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
							: 'bg-transparent text-white hover:font-bold'
					}`}>
					Reserva de Mesas
				</button>
			</div>
			<div className='w-full'>{renderComponent()}</div>
		</section>
	);
};

export default SalonMenu;
