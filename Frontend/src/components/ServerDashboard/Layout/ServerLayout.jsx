/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import TableRect from '../../AdminDashboard/Salon/Layout/TableRect';
import GridLines from '../../AdminDashboard/Salon/Layout/GridLines';
import { useLayoutActions } from '../../../hooks/useLayoutActions.js';
import Loader from '../../../helpers/Loader';
import { LoungeContext } from '../../../context/LoungeContext';
import Modals from '../../Modals';
import { TableOpenForm } from './TableOpenForm';
import { OrderForm } from '../Orders/PreOrder/OrderForm';
import { OrderCheck } from '../Orders/CheckOrder/OrderCheck';
import moment from 'moment-timezone';
import { showAlert } from '../../../helpers/showAlert';

const CELL_SIZE = 50;
const GRID_SIZE = 10;

export const ServerLayout = ({ salonId, onReload }) => {
	const { loading } = useContext(LoungeContext);
	const { updateTableIsOpenAction, loadLayoutAction } = useLayoutActions();
	const [currentLayout, setCurrentLayout] = useState([]);
	const [confirmTable, setConfirmTable] = useState(null);
	const [currentSalon, setCurrentSalon] = useState([]);
	const [openConfirm, setOpenConfirm] = useState(null);
	const [openOrder, setOpenOrder] = useState(false);
	const [openLayout, setOpenLayout] = useState(true);
	const [openOrderCheck, setOpenOrderCheck] = useState(false);
	const [openedOrder, setOpenedOrder] = useState([]);

	const getLayout = async () => {
		try {
			const layout = await loadLayoutAction(salonId);
			setCurrentLayout(layout?.layouts || []);
			setCurrentSalon(layout);
		} catch (error) {
			console.error('Error al buscar el layout:', error);
		}
	};

	useEffect(() => {
		getLayout();
	}, [salonId, openLayout]);

	// VERIFICA SI LA MESA ESTA ABIERTA
	const handleTableClick = (table) => {
		setConfirmTable(table);
		if (table.isOpen) {
			// SI ESTA ABIERTA. ABRE LA ORDER DE LA MESA
			setOpenOrderCheck(true);
		} else {
			// SINO. VERIFICA SI LA MESA ESTA ASIGNADA A UN SERVER ESPECIFICO
			if (table.waiter) {
				showAlert({
					icon: 'error',
					title: 'No puedes abrir la mesa. Esta asignada a otro server',
				});
				return;
			} else {
				// SINO ABRE EL MODAL P CONFIRMAR LA APERTURA DE LA MESA
				setOpenConfirm(true);
			}
		}
	};
	// EN CASO DE CONFIRMAR. VERIFICA SI EXISTE ORDEN DE LA MESA YA ABIERTA
	const handleConfirm = (openedOrder) => {
		// SI NO HAY ORDEN ABIERTA
		if (!openedOrder) {
			// CIERRA MODALES
			setOpenConfirm(false);
			setOpenOrderCheck(false);
			setOpenLayout(false);
			// PREPARA DATOS P ENVIAR A UPDATETABLEISOPEN
			const tableId = confirmTable._id;
			const isOpen = true;
			const closeTime = '';
			const openAt = moment().tz('America/Argentina/Buenos_Aires');
			const salon_Id = salonId;
			const index = currentLayout.findIndex(
				(table) => table._id === tableId
			);
			// ABRE LA ORDEN DE MEDIDO Y ACTUALIZA EL ESTADO DE LA MESA A ABIERTO CON LOS DATOS ANTERIORES
			setOpenOrder(true);
			updateTableIsOpenAction(
				closeTime,
				salon_Id,
				tableId,
				isOpen,
				index,
				openAt
			);
		} else {
			// CIERRA MODALES. Y ABRE MENU P INGRESAR EL PEDIDO
			setOpenedOrder(openedOrder);
			setOpenOrderCheck(false);
			setOpenLayout(false);
			setOpenLayout(false);
			setOpenOrder(true);
		}
	};

	// CIERRA MODALES
	const handleCloseModal = () => {
		setConfirmTable(false);
		setOpenOrderCheck(false);
		setOpenConfirm(false);
		getLayout();
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			{openLayout ? (
				<div className='scroll-container'>
					<div className='stage-container'>
						<Stage
							width={GRID_SIZE * CELL_SIZE}
							height={GRID_SIZE * CELL_SIZE}>
							<Layer>
								<GridLines />
								{currentLayout.map((table) => (
									<TableRect
										key={table._id}
										table={table}
										isSelected={table.isOpen}
										onClick={() => handleTableClick(table)}
										onTouchStart={() => handleTableClick(table)}
									/>
								))}
							</Layer>
						</Stage>
					</div>
				</div>
			) : null}
			{openConfirm && (
				<Modals
					isOpen={true}
					onClose={handleCloseModal}
					title='Abrir Nueva Mesa'>
					<TableOpenForm
						onConfirm={handleConfirm}
						onClose={handleCloseModal}
						table={confirmTable}
					/>
				</Modals>
			)}
			{openOrder && (
				<OrderForm
					onReload={onReload}
					salonName={currentSalon.name}
					salonId={salonId}
					tableNum={confirmTable.id}
					tableId={confirmTable._id}
					currentLayout={currentLayout}
					setOpenLayout={setOpenLayout}
					setOrderForm={setOpenOrder}
					openedOrder={openedOrder}
				/>
			)}
			{openOrderCheck && (
				<Modals
					isOpen={true}
					onClose={handleCloseModal}
					title={`Orden de mesa ${confirmTable.id}`}>
					<OrderCheck
						onConfirm={handleConfirm}
						onClose={handleCloseModal}
						onReload={onReload}
						salonName={currentSalon.name}
						tableNum={confirmTable.id}
						tableId={confirmTable._id}
						currentLayout={currentLayout}
						salonId={salonId}
					/>
				</Modals>
			)}
		</>
	);
};

export default ServerLayout;
