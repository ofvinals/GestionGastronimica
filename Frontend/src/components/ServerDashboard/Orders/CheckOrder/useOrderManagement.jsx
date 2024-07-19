/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import { OrderContext } from '../../../../context/OrderContext';
import { useOrderActions } from '../../../../hooks/useOrderActions.js';

const originalState = {
	1: { pending: false },
	2: { pending: true },
};

export const useOrderManagement = (tableId) => {
	const { state: stateOrders } = useContext(OrderContext);
	const { dataOrders, deleteItemOrder } = useOrderActions();
	const [orders, setOrders] = useState([]);
	const [modifiedItems, setModifiedItems] = useState([]);
	const [hasModifiedItems, setHasModifiedItems] = useState(false);

	useEffect(() => {
		dataOrders();
	}, []);

	useEffect(() => {
		if (stateOrders && tableId) {
			const filteredOrders = stateOrders.orders
				.filter((order) => order.tableId === tableId)
				.filter((order) => order.orderOpen === true);
			setOrders(filteredOrders);
		}
	}, [stateOrders, tableId]);
	
	useEffect(() => {
		if (modifiedItems.length > 0) {
			const hasChanges = modifiedItems.some(
				(item) => item.pending !== originalState[item._id]?.pending
			);
			setHasModifiedItems(hasChanges);
		} else {
			setHasModifiedItems(false);
		}
	}, [modifiedItems]);

	const handleCheckboxChange = (orderId, itemId) => {
		const updatedOrders = orders.map((order) => {
			if (order._id === orderId) {
				const updatedItems = order.items.map((item) => {
					if (item._id === itemId) {
						const updatedItem = { ...item, pending: !item.pending };
						const modifiedItem = updatedItem;
						if (
							!modifiedItems.some((mi) => mi._id === modifiedItem._id)
						) {
							setModifiedItems((prev) => [...prev, modifiedItem]);
						} else {
							setModifiedItems((prev) =>
								prev.map((mi) =>
									mi._id === modifiedItem._id ? modifiedItem : mi
								)
							);
						}
						return updatedItem;
					}
					return item;
				});
				return { ...order, items: updatedItems };
			}
			return order;
		});
		setOrders(updatedOrders);
	};

	const handleDeleteItem = async (orderId, itemId) => {
		await deleteItemOrder(orderId, itemId);
		dataOrders();
	};

	return {
		orders,
		modifiedItems,
		hasModifiedItems,
		handleCheckboxChange,
		handleDeleteItem,
	};
};
