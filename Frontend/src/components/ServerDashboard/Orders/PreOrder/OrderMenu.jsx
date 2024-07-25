/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useMemo, useState } from 'react';
import { useMenuActions } from '../../../../hooks/useMenuActions';
import { MenuContext } from '../../../../context/MenuContext';
import { OrderCard } from './OrderCard.jsx';
import { useOrderActions } from '../../../../hooks/useOrderActions.js';
import { Pagination } from '../../../../utils/Pagination.jsx';

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
	const [resetCount, setResetCount] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	// CARGA TODOS LOS MENUS DE LA CARTA
	useEffect(() => {
		dataMenus();
	}, []);

	// ACTUALIZA DINERS SI SE MODIFICA
	useEffect(() => {
		setCurrentDiners(diners);
	}, [diners]);

	useEffect(() => {
		setResetCount((prev) => !prev);
	}, [selectedCategory]);

	const cardPerPage = 10;

	// FILTRA MENUS POR CATEGORIA SELECCIONADA EN CATEGORYSELECTION
	const filteredMenus = useMemo(() => {
		if (selectedCategory) {
			return (
				menuState.menus
					// FILTRA POR ESTADO HABILITADO DE CADA MENU
					.filter((menu) => menu.status === true)
					// FILTRA POR CATEGORIA DE MENU
					.filter((menu) => menu.category === selectedCategory)
			);
		}
		return menuState.menus;
	}, [menuState.menus, selectedCategory]);

	// CÁLCULA EL ÍNDICE DE LOS ELEMENTOS EN LA PÁGINA ACTUAL
	const indexOfLastMenu = currentPage * cardPerPage;
	const indexOfFirstMenu = indexOfLastMenu - cardPerPage;
	const currentMenus = filteredMenus.slice(indexOfFirstMenu, indexOfLastMenu);

	const totalPages = Math.ceil(filteredMenus.length / cardPerPage);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
		setResetCount((prev) => !prev);
	};
	
	// PREPARA TODOS LOS DATOS DE LA ORDEN Y CADA ITEM SELECCIONADO P ENVIAR A REDUCER Y BACKEND
	const updateOrder = (menu, quantity, text, pending) => {
		const values = {
			salonName: salonName,
			tableNum: tableNum,
			tableId: tableId,
			orderOpen: true,
			openAt: new Date().toString(),
			server: server,
			diners: currentDiners,
			item: {
				category: menu.category,
				name: menu.name,
				price: menu.price,
				quantity: quantity,
				text: text,
				pending: pending,
			},
		};

		// REGISTRA NUEVA ORDER
		addOrderPrevAction(values);
	};

	return (
		<>
			<div className='flex flex-row flex-wrap items-center justify-around gap-4'>
				{currentMenus &&
					currentMenus.map((menu, id) => (
						// ENVIA DATOS DEL MENU. RECIBE ACTUALIZACION DE LA ORDER DESDE ORDERCARD
						<OrderCard
							key={id}
							menu={menu}
							updateOrder={updateOrder}
							resetCount={resetCount}
						/>
					))}
			</div>

			<Pagination
				totalPages={totalPages}
				currentPage={currentPage}
				paginate={paginate}
			/>
		</>
	);
};
