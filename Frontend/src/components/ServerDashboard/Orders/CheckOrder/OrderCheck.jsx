/* eslint-disable react/prop-types */
import { useOrderManagement } from './useOrderManagement';
import { TableDetails } from './TableDetails';
import { OrderItems } from './OrderItems';
import { ActionButtons } from './ActionButtons';
import Modals from '../../../Modals';
import { CashOrder } from '../CashOrder/CashOrder';
import { useState, useMemo } from 'react';
import { useOrderActions } from '../../../../hooks/useOrderActions';
import moment from 'moment-timezone';
import { useLayoutActions } from '../../../../hooks/useLayoutActions';
import { showAlert, confirmAction } from '../../../../helpers/showAlert';

export const OrderCheck = ({
	onClose,
	tableId,
	onConfirm,
	currentLayout,
	salonId,
}) => {
	const {
		orders,
		modifiedItems,
		hasModifiedItems,
		handleCheckboxChange,
		handleDeleteItem,
	} = useOrderManagement(tableId);
	const { updateOrderPending, orderCashAction } = useOrderActions();
	const { updateTableIsOpenAction } = useLayoutActions();
	const [cashOrder, setCashOrder] = useState(false);
	const [elapsedDuration, setElapsedDuration] = useState({
		hours: 0,
		minutes: 0,
	});

	// FILTRA ORDENES QUE ESTEN ABIERTAS
	const filteredOrder = useMemo(() => {
		return orders.filter((order) => order.orderOpen === true);
	}, [orders]);

	// ACTUALIZA EL ESTADO PENDIENTE DEL ITEM SELECCIONADO
	const handlePending = async () => {
		const itemIds = modifiedItems.map((item) => item._id);
		try {
			await updateOrderPending(itemIds);
			onClose();
		} catch (error) {
			console.error('Error al actualizar el item:', error);
		}
	};

	// FUNCIÓN PARA VERIFICAR SI TODOS LOS ÍTEMS ESTÁN ENTREGADOS (PENDING FALSE)
	const allItemsConfirmed = () => {
		return orders.every((order) =>
			order.items.every((item) => !item.pending)
		);
	};

	// FUNCION PARA MANEJAR CIERRE Y COBRO DE LA ORDEN
	const handleCash = async () => {
		if (allItemsConfirmed()) {
			const isConfirmed = await confirmAction({
				title: '¿Confirmas el cierre de la mesa?',
				icon: 'warning',
			});
			if (isConfirmed) {
				const closeTime = new Date().toString();
				const isOpen = false;
				const orderOpen = false;
				const index = currentLayout.findIndex(
					(table) => table._id === tableId
				);
				// ACTUALIZA EL ESTADO DE LA MESA
				updateTableIsOpenAction(closeTime, salonId, tableId, isOpen, index);
				// CALCULA EL TIEMPO DE USO ENTRE CLOSE Y OPEN
				const duration = moment.duration(
					moment(closeTime).diff(moment(openAt))
				);
				// EXTRAE HORA Y MINUTO DE LA DURACION
				const elapsedHours = Math.floor(duration.asHours());
				const elapsedMinutes = duration.minutes();
				const elapsedDuration = {
					hours: elapsedHours,
					minutes: elapsedMinutes,
				};
				setElapsedDuration(elapsedDuration);
				// EJECUTA ACCION P COBRAR. ENVIA DATOS A REDUCER Y BACKEND
				orderCashAction(
					closeTime,
					orderOpen,
					filteredOrder,
					elapsedDuration
				);
				// ABRE MODAL DE COBRO
				setCashOrder(true);
			}
		} else {
			showAlert({
				icon: 'error',
				title: 'Tienes ítems pendientes en la comanda. No puedes cerrar la mesa.',
			});
		}
	};

	if (filteredOrder.length === 0) return null;

	const { salonName, tableNum, diners, server, openAt } = filteredOrder[0];

	return (
		<div>
			<TableDetails
				salonName={salonName}
				tableNum={tableNum}
				server={server}
				diners={diners}
				openAt={openAt}
			/>
			<OrderItems
				orders={filteredOrder}
				handleCheckboxChange={handleCheckboxChange}
				handleDeleteItem={handleDeleteItem}
				modifiedItems={modifiedItems}
			/>
			<ActionButtons
				onConfirm={onConfirm}
				onClose={onClose}
				handlePending={handlePending}
				handleCash={handleCash}
				hasModifiedItems={hasModifiedItems}
			/>
			{cashOrder && (
				<Modals
					title='Orden de mesa cerrada'
					isOpen={cashOrder}
					onClose={onClose}>
					<CashOrder
						tableNum={tableNum}
						salonName={salonName}
						currentLayout={currentLayout}
						tableId={tableId}
						onClose={onClose}
						diners={diners}
						order={filteredOrder}
						elapsedDuration={elapsedDuration}
						salonId={salonId}
					/>
				</Modals>
			)}
		</div>
	);
};
export default OrderCheck;
