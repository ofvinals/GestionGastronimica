/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import '../../css/Custom.css';

export const PanelDashboard = ({
	handleUser,
	handleProduct,
	handleMenu,
	handleSalon,
	handleKitchen,
	handleReports,
	handleCash,
}) => {
	const [activeButton, setActiveButton] = useState('usuarios');

	useEffect(() => {
		handleUser();
	}, []);

	return (
		<section>
			<div className='flex flex-row flex-wrap justify-around items-end h-[70px]'>
				<button
					onClick={() => {
						handleUser();
						setActiveButton('usuarios');
					}}
					className={`mx-3 border-none  p-2  ${
						activeButton === 'usuarios'
							? 'bg-slate-600 text-white rounded-t-lg shadowIndex font-bold'
							: 'bg-transparent text-white hover:text-black hover:font-bold'
					}`}>
					Usuarios
				</button>
				<button
					onClick={() => {
						handleProduct();
						setActiveButton('productos');
					}}
					className={`mx-3 border-none p-2  ${
						activeButton === 'productos'
							? 'bg-slate-600 text-white rounded-t-lg shadowIndex font-bold'
							: 'bg-transparent text-white hover:text-black hover:font-bold'
					}`}>
					Productos
				</button>
				<button
					onClick={() => {
						handleMenu();
						setActiveButton('cartaMenu');
					}}
					className={`mx-3 border-none p-2   ${
						activeButton === 'cartaMenu'
							? 'bg-slate-600 text-white rounded-t-lg shadowIndex font-bold'
							: 'bg-transparent text-white hover:text-black hover:font-bold'
					}`}>
					Carta
				</button>
				<button
					onClick={() => {
						handleKitchen();
						setActiveButton('monitorCocina');
					}}
					className={`mx-3 border-none p-2   ${
						activeButton === 'monitorCocina'
							? 'bg-slate-600 text-white rounded-t-lg shadowIndex font-bold'
							: 'bg-transparent text-white hover:text-black hover:font-bold'
					}`}>
					Cocina
				</button>
				<button
					onClick={() => {
						handleSalon();
						setActiveButton('salon');
					}}
					className={`mx-3 border-none p-2   ${
						activeButton === 'salon'
							? 'bg-slate-600 text-white rounded-t-lg shadowIndex font-bold'
							: 'bg-transparent text-white hover:text-black hover:font-bold'
					}`}>
					Salon
				</button>
				<button
					onClick={() => {
						handleReports();
						setActiveButton('reportes');
					}}
					className={`mx-3 border-none p-2   ${
						activeButton === 'reportes'
							? 'bg-slate-600 text-white rounded-t-lg shadowIndex font-bold'
							: 'bg-transparent text-white hover:text-black hover:font-bold'
					}`}>
					Reportes
				</button>
				<button
					onClick={() => {
						handleCash();
						setActiveButton('caja');
					}}
					className={`mx-3 border-none p-2   ${
						activeButton === 'caja'
							? 'bg-slate-600 text-white rounded-t-lg shadowIndex font-bold'
							: 'bg-transparent text-white hover:text-black hover:font-bold'
					}`}>
					Caja
				</button>
			</div>
		</section>
	);
};
