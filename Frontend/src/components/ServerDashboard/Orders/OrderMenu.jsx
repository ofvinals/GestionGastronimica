/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useMemo, useState } from 'react';
import { useMenuActions } from '../../../hooks/useMenuActions.jsx';
import { MenuContext } from '../../../context/MenuContext.jsx';
import { OrderCard } from './OrderCard.jsx';
import { useOrderActions } from '../../../hooks/useOrderActions.jsx';

// RECIBE DATOS DE ORDERFORM
export const OrderMenu = ({
	selectedCategory,
	tableNum,
	tableId,
	salonName,
	diners,
}) => {
	const { state: menuState } = useContext(MenuContext);
	const { dataMenus } = useMenuActions();
	const { addOrderPrevAction } = useOrderActions();

	const [currentDiners, setCurrentDiners] = useState(diners);

	useEffect(() => {
		dataMenus();
	}, []);

	useEffect(() => {
		setCurrentDiners(diners);
	}, [diners]);

	// FUNCION PARA GUARDAR ORDEN EN REDUCER Y BACKEND CON TODOS LOS DATOS DE LA ORDEN
	const updateOrder = (menu, quantity, text) => {
		const values = {
			salonName: salonName,
			tableNum: tableNum,
			tableId: tableId,
			orderOpen: true,
			diners: currentDiners,
			item: {
				category: menu.category,
				name: menu.name,
				price: menu.price,
				quantity: quantity,
				text: text,
			},
		};
		addOrderPrevAction(values);
	};

	// FILTRA MENUS POR CATEGORIA SELECCIONADA EN CATEGORYSELECTION
	const filteredMenus = useMemo(() => {
		if (selectedCategory) {
			return menuState.menus.filter(
				(menu) => menu.category === selectedCategory
			);
		}
		return menuState.menus;
	}, [menuState.menus, selectedCategory]);

	return (
		<div className='flex flex-row flex-wrap items-center justify-around gap-4'>
			{filteredMenus &&
				filteredMenus.map((menu, id) => (
					<OrderCard key={id} menu={menu} updateOrder={updateOrder} />
				))}
		</div>
	);
};
