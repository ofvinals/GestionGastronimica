import { useState } from 'react';
import { OrderDashboard } from '../Kitchen/Orders/OrderDashboard';
import '../../../css/Custom.css';
import { MenuKitchen } from '../../KitchenDashboard/Executive/MenuKitchen';

export const OrdersMenu = () => {
	const [activeButton, setActiveButton] = useState('ejecucion');
	const [activeComponent, setActiveComponent] = useState('ejecucion');

	const renderComponent = () => {
		switch (activeComponent) {
			case 'ordenes':
				return <OrderDashboard />;
			case 'ejecucion':
				return <MenuKitchen />;
			default:
				return null;
		}
	};

	return (
		<>
			<section>
				<div className='px-5 pt-3 shadowIndex bg-slate-600 flex flex-wrap flex-row items-center justify-around rounded-t-md'>
					<button
						onClick={() => {
							setActiveComponent('ejecucion'),
								setActiveButton('ejecucion');
						}}
						className={`mx-3 border-none text-white p-2   ${
							activeButton === 'ejecucion'
								? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
								: 'bg-transparent text-white hover:font-bold'
						}`}>
						Monitor de Cocina
					</button>
					<button
						onClick={() => {
							setActiveComponent('ordenes'), setActiveButton('ordenes');
						}}
						className={`mx-3 border-none text-white p-2   ${
							activeButton === 'ordenes'
								? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
								: 'bg-transparent text-white hover:font-bold'
						}`}>
						Ordenes de Pedidos
					</button>
				</div>
				<div className='w-full'>{renderComponent()}</div>
			</section>
		</>
	);
};
