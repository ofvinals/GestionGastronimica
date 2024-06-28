import { ProductDashboard } from './ProductDashboard';
import { useState } from 'react';

export const ProductsMenu = () => {
	const [activeButton, setActiveButton] = useState('productos');
	const [showDataProducts, setShowDataProducts] = useState(true);

	const handleProduct = () => {
		setShowDataProducts(true);
		// setShowDataTable(false);
	};

	return (
		<>
			<section>
				<div className='px-5 pt-2 bg-slate-600 flex flex-wrap flex-row items-center justify-around'>
					<button
						onClick={() => {
							handleProduct();
							setActiveButton('productos');
						}}
						className={`mx-3 border-none text-white p-2   ${
							activeButton === 'productos'
								? 'bg-slate-700 text-white rounded-t-lg'
								: 'bg-transparent text-white '
						}`}>
						Productos
					</button>
					<button
						onClick={() => {
							handleProduct();
							setActiveButton('proveedores');
						}}
						className={`mx-3 border-none text-white p-2   ${
							activeButton === 'proveedores'
								? 'bg-slate-700 text-white rounded-t-lg'
								: 'bg-transparent text-white '
						}`}>
						Proveedores
					</button>
					<button
						onClick={() => {
							handleProduct();
							setActiveButton('controlStock');
						}}
						className={`mx-3 border-none text-white p-2  ${
							activeButton === 'controlStock'
								? 'bg-slate-700 text-white rounded-t-lg'
								: 'bg-transparent text-white '
						}`}>
						Control de Stock
					</button>
				</div>
				<div className='w-full'>
					{showDataProducts && <ProductDashboard />}
				</div>
			</section>
		</>
	);
};
