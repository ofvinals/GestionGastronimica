/* eslint-disable react/prop-types */
import { useOrderManagement } from './useOrderManagement';
import { TableDetails } from './TableDetails';
import { OrderItems } from './OrderItems';
import { ActionButtons } from './ActionButtons';
import Modals from '../../../../utils/Modals';
import { CashOrder } from '../CashOrder/CashOrder';
import { useState } from 'react';
import { useOrderActions } from '../../../../hooks/useOrderActions.js';
import { showAlert, confirmAction } from '../../../../utils/showAlert';

// RECIBE PROPS DE SERVERLAYOUT
export const OrderCheck = ({
	onClose,
	tableId,
	onConfirm,
	currentLayout,
	salonId,
	salonName,
	tableNum,
}) => {
	const {
		orders,
		modifiedItems,
		hasModifiedItems,
		handleCheckboxChange,
		handleDeleteItem,
	} = useOrderManagement(tableId);
	const { updateItemsPending } = useOrderActions();
	const [cashOrder, setCashOrder] = useState(false);

	// ACTUALIZA EL ESTADO PENDIENTE DEL ITEM SELECCIONADO
	const handlePending = async () => {
		const itemIds = modifiedItems.map((item) => item._id);
		try {
			await updateItemsPending(itemIds);
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
				setCashOrder(true);
			}
		} else {
			showAlert({
				icon: 'error',
				title: 'Tienes ítems pendientes en la orden. No puedes cerrar la mesa.',
			});
		}
	};

	const handleReopenOrder = () => {
		const openedOrder = orders.length > 0 ? orders : null;
		onConfirm(openedOrder);
	};

	if (orders.length === 0) return null;
	const { diners, server, openAt } = orders[0];

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
				orders={orders}
				handleCheckboxChange={handleCheckboxChange}
				handleDeleteItem={handleDeleteItem}
				modifiedItems={modifiedItems}
			/>
			<ActionButtons
				onConfirm={handleReopenOrder}
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
						order={orders}
						salonId={salonId}
						/>
				</Modals>
			)}
		</div>
	);
};

export default OrderCheck;
