import { useState } from 'react';
import { OrderDashboard } from '../Kitchen/Orders/OrderDashboard';
import '../../../css/Custom.css';
import { MenuKitchen } from '../../KitchenDashboard/Executive/MenuKitchen';

export const OrdersMenu = () => {
	const [activeButton, setActiveButton] = useState('ejecucion');
	const [showDataExecutive, setShowDataExecutive] = useState(true);
	const [showDataOrders, setShowDataOrders] = useState(false);

	// ABRE SECCION EJECUCION COCINA Y CIERRA OTROS MODALES
	const handleExecutive = () => {
		setShowDataExecutive(true);
		setShowDataOrders(false);
	};

	// ABRE SECCION ORDENES Y CIERRA OTROS MODALES
	const handleOrder = () => {
		setShowDataExecutive(false);
		setShowDataOrders(true);
	};

	return (
		<>
			<section>
				<div className='px-5 pt-3 shadowIndex bg-slate-600 flex flex-wrap flex-row items-center justify-around rounded-t-md'>
					<button
						onClick={() => {
							handleExecutive();
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
							handleOrder();
							setActiveButton('ordenes');
						}}
						className={`mx-3 border-none text-white p-2   ${
							activeButton === 'ordenes'
								? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
								: 'bg-transparent text-white hover:font-bold'
						}`}>
						Ordenes de Pedidos
					</button>
				</div>
				<div className='w-full'>
					{showDataExecutive && <MenuKitchen />}
					{showDataOrders && <OrderDashboard />}
				</div>
			</section>
		</>
	);
};
