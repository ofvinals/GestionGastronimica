import { MenuDashboard } from './MenuDashboard';
import { useState } from 'react';
import { CategoryProducts } from '../Categorys/CategoryDashboard';
import '../../../css/Custom.css';

export const Menu = () => {
	const [activeButton, setActiveButton] = useState('menu');
	const [showDataCategpry, setShowDataCategpry] = useState(false);
	const [showDataMenu, setShowDataMenu] = useState(true);

	// ABRE SUBMENU CATEGORIAS Y CIERRA MENU
	const handleCategory = () => {
		setShowDataCategpry(true);
		setShowDataMenu(false);
	};

	// ABRE SUBMENU MENU Y CIERRA CATEGORUAS
	const handleMenu = () => {
		setShowDataCategpry(false);
		setShowDataMenu(true);
	};

	return (
		<>
			<section>
				<div className='px-5 pt-3 shadowIndex rounded-t-md bg-slate-600 flex flex-wrap flex-row items-end justify-around'>
					<button
						onClick={() => {
							handleMenu();
							setActiveButton('menu');
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
							handleCategory();
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
				<div className='w-full'>
					{showDataMenu && <MenuDashboard />}
					{showDataCategpry && <CategoryProducts />}
				</div>
			</section>
		</>
	);
};
