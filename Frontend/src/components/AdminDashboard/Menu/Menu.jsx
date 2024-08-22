import { MenuDashboard } from './MenuDashboard';
import { useState } from 'react';
import { CategoryProducts } from '../Categorys/CategoryDashboard';
import '../../../css/Custom.css';

export const Menu = () => {
	const [activeComponent, setActiveComponent] = useState('menu');
	const [activeButton, setActiveButton] = useState('menu');

	const renderComponent = () => {
		switch (activeComponent) {
			case 'menu':
				return <MenuDashboard />;
			case 'category':
				return <CategoryProducts />;
			default:
				return null;
		}
	};

	return (
		<section>
			<div className='px-5 pt-3 shadowIndex rounded-t-md bg-slate-600 flex flex-wrap flex-row items-end justify-around'>
				<button
					onClick={() => {
						setActiveComponent('menu'), setActiveButton('menu');
					}}
					className={`mx-3 border-none text-white p-2   ${
						activeButton === 'menu'
							? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
							: 'bg-transparent text-white hover:font-bold'
					}`}>
					Carta Menu
				</button>
				<button
					onClick={() => {
						setActiveComponent('categorias'),
							setActiveButton('categorias');
					}}
					className={`mx-3  border-none text-white p-2  ${
						activeButton === 'categorias'
							? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
							: 'bg-transparent text-white hover:font-bold'
					}`}>
					Categorias
				</button>
			</div>
			<div className='w-full'>{renderComponent()}</div>
		</section>
	);
};
