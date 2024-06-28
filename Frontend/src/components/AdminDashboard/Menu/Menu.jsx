import { MenuDashboard } from './MenuDashboard';
import { useState } from 'react';
import { CategoryProducts } from './CategoryProducts';

export const Menu = () => {
	const [activeButton, setActiveButton] = useState('menu');
	const [showDataCategpry, setShowDataCategpry] = useState(false);
	const [showDataMenu, setShowDataMenu] = useState(true);

	const handleCategory = () => {
		setShowDataCategpry(true);
		setShowDataMenu(false);
		// setShowDataTable(false);
	};
	const handleMenu = () => {
		setShowDataCategpry(false);
		setShowDataMenu(true);
		// setShowDataTable(false);
	};
	return (
		<>
			<section>
				<div className='px-5 pt-2 bg-slate-600 flex flex-wrap flex-row items-end justify-around'>
					<button
						onClick={() => {
							handleMenu();
							setActiveButton('menu');
						}}
						className={`mx-3 border-none text-white p-2   ${
							activeButton === 'menu'
								? 'bg-slate-700 text-white rounded-t-lg'
								: 'bg-transparent text-white '
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
								? 'bg-slate-700 text-white rounded-t-lg'
								: 'bg-transparent text-white '
						}`}>
						Categorias
					</button>
				</div>
				<div className='w-full'>
					{showDataMenu && <MenuDashboard />}
					{showDataCategpry && <CategoryProducts />}
					{/* {showDataTable && <TableDashboard />}
				{showDataUsers && <UserDashboard />} */}
				</div>
			</section>
		</>
	);
};
