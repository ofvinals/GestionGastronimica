/* eslint-disable react/prop-types */
import { useState } from 'react';

export const PanelDashboard = ({
	handleUser,
	handleProduct,
	handleMenu,
	handleSalon,
}) => {
	const [activeButton, setActiveButton] = useState('usuarios');
	return (
		<section>
			<div className='flex flex-row justify-center items-end h-[70px]'>
				<button
					onClick={() => {
						handleUser();
						setActiveButton('usuarios');
					}}
					className={`mx-3 border-none  p-2 ${
						activeButton === 'usuarios'
							? 'bg-slate-600 text-white rounded-t-lg'
							: 'bg-transparent text-white hover:text-black'
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
							? 'bg-slate-600 text-white rounded-t-lg'
							: 'bg-transparent text-white hover:text-black'
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
							? 'bg-slate-600 text-white rounded-t-lg'
							: 'bg-transparent text-white hover:text-black'
					}`}>
					Carta Menu
				</button>
				<button
					onClick={() => {
						handleMenu();
						setActiveButton('monitorCocina');
					}}
					className={`mx-3 border-none p-2   ${
						activeButton === 'monitorCocina'
							? 'bg-slate-600 text-white rounded-t-lg'
							: 'bg-transparent text-white hover:text-black'
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
							? 'bg-slate-600 text-white rounded-t-lg'
							: 'bg-transparent text-white hover:text-black'
					}`}>
					Salon
				</button>
				<button
					onClick={() => {
						handleMenu();
						setActiveButton('reportes');
					}}
					className={`mx-3 border-none p-2   ${
						activeButton === 'reportes'
							? 'bg-slate-600 text-white rounded-t-lg'
							: 'bg-transparent text-white hover:text-black'
					}`}>
					Reportes
				</button>
				<button
					onClick={() => {
						handleMenu();
						setActiveButton('caja');
					}}
					className={`mx-3 border-none p-2   ${
						activeButton === 'caja'
							? 'bg-slate-600 text-white rounded-t-lg'
							: 'bg-transparent text-white hover:text-black'
					}`}>
					Caja
				</button>
			</div>
		</section>
	);
};
