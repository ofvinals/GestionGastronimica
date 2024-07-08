/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useMemo, useState } from 'react';
import { useMenuActions } from '../../../hooks/useMenuActions.jsx';
import { MenuContext } from '../../../context/MenuContext.jsx';
import { OrderCard } from './OrderCard.jsx';
import { useOrderActions } from '../../../hooks/useOrderActions.jsx';
import moment from 'moment-timezone';

// RECIBE PROPS DE ORDERFORM
export const OrderMenu = ({
	selectedCategory,
	tableNum,
	tableId,
	server,
	salonName,
	diners,
}) => {
	const { state: menuState } = useContext(MenuContext);
	const { dataMenus } = useMenuActions();
	const { addOrderPrevAction } = useOrderActions();
	const [currentDiners, setCurrentDiners] = useState(diners);

	// DEVUELVE TODOS LOS MENUS DE LA CARTA
	useEffect(() => {
		dataMenus();
	}, []);

	// ACTUALIZA DINERS SI SE MODIFICA
	useEffect(() => {
		setCurrentDiners(diners);
	}, [diners]);

	// FUNCION PARA GUARDAR ORDEN EN REDUCER Y BACKEND CON TODOS LOS DATOS DE LA ORDEN
	const updateOrder = (menu, quantity, text) => {
		const openAt = moment().tz('America/Argentina/Buenos_Aires').toDate();
		const values = {
			salonName: salonName,
			tableNum: tableNum,
			tableId: tableId,
			orderOpen: true,
			openAt: openAt,
			server: server,
			diners: currentDiners,
			item: {
				category: menu.category,
				name: menu.name,
				price: menu.price,
				quantity: quantity,
				text: text,
			},
		};
		console.log(values);
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
