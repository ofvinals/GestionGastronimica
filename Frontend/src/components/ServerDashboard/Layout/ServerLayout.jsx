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
import { useLoungeActions } from '../../../hooks/useLoungeActions.js';

const CELL_SIZE = 50;
const GRID_SIZE = 10;

// RECIBE PROPS DE MENUSERVER
export const ServerLayout = ({ salonId, onReload }) => {
	const { state, loading } = useContext(LoungeContext);
	const { dataSalons } = useLoungeActions();
	const { updateTableIsOpenAction } = useLayoutActions();
	const [currentLayout, setCurrentLayout] = useState([]);
	const [confirmTable, setConfirmTable] = useState(null);
	const [currentSalon, setCurrentSalon] = useState([]);
	const [openConfirm, setOpenConfirm] = useState(null);
	const [openOrder, setOpenOrder] = useState(false);
	const [openLayout, setOpenLayout] = useState(true);
	const [openOrderCheck, setOpenOrderCheck] = useState(false);
	const [openedOrder, setOpenedOrder] = useState([]);

	// CARGA TODAS LAS MESAS DEL SALON
	useEffect(() => {
		dataSalons(salonId);
		if (state.lounges) {
			const layout = state.lounges.find((layout) => layout._id === salonId);
			if (layout && layout.layouts) {
				setCurrentLayout(layout.layouts);
				setCurrentSalon(layout);
			} else {
				setCurrentLayout([]);
			}
		}
	}, [salonId]);

	// ACCION AL HACER CLICK EN UNA MESA
	const handleTableClick = (table) => {
		setConfirmTable(table);
		if (table.isOpen) {
			// SI ESTA ABIERTA ABRE LA ORDEN (ORDERCHECK)
			setOpenOrderCheck(true);
		} else {
			// SINO ABRE MODAL P CONFIRMAR
			setOpenConfirm(true);
		}
	};
	// AL CONFIRMAR ACTUALIZA LOS DATOS DE LA MESA Y ABRE LA ORDEN (ORDERFORM)
	const handleConfirm = (openedOrder) => {
		if (!openedOrder) {
			// CIERRA MODALES. Y PREPARA DATOS P ENVIAR A REDUCER Y BACKEND
			setOpenConfirm(false);
			setOpenOrderCheck(false);
			setOpenLayout(false);
			const tableId = confirmTable._id;
			const isOpen = true;
			const closeTime = '';
			const openAt = moment().tz('America/Argentina/Buenos_Aires');
			const salon_Id = salonId;
			const index = currentLayout.findIndex(
				(table) => table._id === tableId
			);
			// ABRE EL MODAL DE LA ORDER P HACER EL PEDIDO
			setOpenOrder(true);
			// ACTUALIZA EL ESTADO DE LA MESA
			updateTableIsOpenAction(
				closeTime,
				salon_Id,
				tableId,
				isOpen,
				index,
				openAt
			);
		} else {
			setOpenedOrder(openedOrder);
			setOpenOrderCheck(false);
			setOpenLayout(false);
			setOpenLayout(false);
			setOpenOrder(true);
		}
	};

	// CIERRA TODOS LOS MODALES
	const handleCloseModal = () => {
		setConfirmTable(false);
		setOpenOrderCheck(false);
		setOpenConfirm(false);
		dataSalons(salonId);
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			{openLayout ? (
				<div className='w-full'>
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
								/>
							))}
						</Layer>
					</Stage>
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
					/>{' '}
				</Modals>
			)}
		</>
	);
};

export default ServerLayout;
