import { ProductDashboard } from '../Products/ProductDashboard';
import { useState } from 'react';
import { SupplierDashboard } from '../Products/Suppliers/SupplierDashboard';
import '../../../css/Custom.css';
import { UnderConstruction } from '../UnderConstruction';

export const ProductsMenu = () => {
	const [activeButton, setActiveButton] = useState('productos');
	const [showDataProducts, setShowDataProducts] = useState(true);
	const [showDataSuppliers, setShowDataSuppliers] = useState(false);
	const [showDataStocks, setShowDataStocks] = useState(false);

	// ABRE SECCION PRODUCTOS Y CIERRA OTROS MODALES
	const handleProduct = () => {
		setShowDataProducts(true);
		setShowDataSuppliers(false);
		setShowDataStocks(false);
	};

	// ABRE SECCION PROVEEDORES Y CIERRA OTROS MODALES
	const handleSupplier = () => {
		setShowDataProducts(false);
		setShowDataSuppliers(true);
		setShowDataStocks(false);
	};

	// ABRE SECCION STOCK Y CIERRA OTROS MODALES
	const handleStock = () => {
		setShowDataProducts(false);
		setShowDataSuppliers(false);
		setShowDataStocks(true);
	};

	return (
		<>
			<section>
				<div className='px-5 pt-3 shadowIndex bg-slate-600 flex flex-wrap flex-row items-center justify-around rounded-t-md'>
					<button
						onClick={() => {
							handleProduct();
							setActiveButton('productos');
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
							handleSupplier();
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
							handleStock();
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
				<div className='w-full'>
					{showDataProducts && <ProductDashboard />}
					{showDataSuppliers && <SupplierDashboard />}
					{showDataStocks && <UnderConstruction />}
				</div>
			</section>
		</>
	);
};
