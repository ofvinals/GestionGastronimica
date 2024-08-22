import { ProductDashboard } from '../Products/ProductDashboard';
import { useState } from 'react';
import { SupplierDashboard } from '../Products/Suppliers/SupplierDashboard';
import '../../../css/Custom.css';
import { UnderConstruction } from '../UnderConstruction';
import { PurchaseDashboard } from './Purchases/PurchaseDashboard';

export const ProductsMenu = () => {
	const [activeButton, setActiveButton] = useState('productos');
	const [activeComponent, setActiveComponent] = useState('productos');

	const renderComponent = () => {
		switch (activeComponent) {
			case 'proveedores':
				return <SupplierDashboard />;
			case 'controlStock':
				return <UnderConstruction />;
			case 'order':
				return <PurchaseDashboard />;
			case 'productos':
				return <ProductDashboard />;
			default:
				return null;
		}
	};

	return (
		<section>
			<div className='px-5 pt-3 shadowIndex bg-slate-600 flex flex-wrap flex-row items-center justify-around rounded-t-md'>
				<button
					onClick={() => {
						setActiveComponent('productos'), setActiveButton('productos');
					}}
					className={`mx-3 border-none text-white p-2   ${
						activeButton === 'productos'
							? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
							: 'bg-transparent text-white hover:font-bold'
					}`}>
					Productos
				</button>
				<button
					onClick={() => {
						setActiveComponent('proveedores'),
							setActiveButton('proveedores');
					}}
					className={`mx-3 border-none text-white p-2   ${
						activeButton === 'proveedores'
							? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
							: 'bg-transparent text-white hover:font-bold'
					}`}>
					Proveedores
				</button>
				<button
					onClick={() => {
						setActiveComponent('pedidos'), setActiveButton('pedidos');
					}}
					className={`mx-3 border-none text-white p-2  ${
						activeButton === 'pedidos'
							? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
							: 'bg-transparent text-white hover:font-bold'
					}`}>
					Pedidos a Proveedor
				</button>
				<button
					onClick={() => {
						setActiveComponent('controlStock'),
							setActiveButton('controlStock');
					}}
					className={`mx-3 border-none text-white p-2  ${
						activeButton === 'controlStock'
							? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
							: 'bg-transparent text-white hover:font-bold'
					}`}>
					Control de Stock
				</button>
			</div>
			<div className='w-full'>{renderComponent()}</div>
		</section>
	);
};
