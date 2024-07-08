/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
export const OrderReducer = (state, action) => {
	switch (action.type) {
		case 'DATA_ORDERS_PENDING':
			return { ...state, loading: true, error: null };
		case 'ADD_ORDERS_PREV_SUCCESS':
			const existingOrderIndex = state.prevOrder.findIndex(
				(order) =>
					order.tableNum === action.payload.tableNum &&
					order.salonName === action.payload.salonName
			);
			let updatedPrevOrder;
			if (existingOrderIndex > -1) {
				updatedPrevOrder = state.prevOrder.map((order, index) => {
					if (index === existingOrderIndex) {
						const existingMenuItemIndex = order.items.findIndex(
							(item) => item.name === action.payload.item.name
						);
						if (existingMenuItemIndex > -1) {
							const updatedItems = order.items
								.map((item, idx) => {
									if (idx === existingMenuItemIndex) {
										const newQuantity =
											item.quantity + action.payload.item.quantity;
										if (newQuantity <= 0) {
											return null; // Eliminamos el ítem si la cantidad es cero o menos
										}
										return {
											...item,
											quantity: newQuantity,
											text: action.payload.item.text,
										};
									}
									return item;
								})
								.filter((item) => item !== null); // Eliminamos ítems nulos
							return {
								...order,
								diners: action.payload.diners,
								tableId: action.payload.tableId,
								orderOpen: action.payload.orderOpen,
								items: updatedItems,
							};
						} else {
							return {
								...order,
								diners: action.payload.diners,
								tableId: action.payload.tableId,
								orderOpen: action.payload.orderOpen,
								items: [...order.items, action.payload.item],
							};
						}
					}
					return order;
				});
			} else {
				updatedPrevOrder = [
					...state.prevOrder,
					{
						salonName: action.payload.salonName,
						tableNum: action.payload.tableNum,
						tableId: action.payload.tableId,
						diners: action.payload.diners,
						orderOpen: action.payload.orderOpen,
						items: [action.payload.item],
					},
				];
			}
			return {
				...state,
				prevOrder: updatedPrevOrder,
			};
		case 'DATA_ORDERS_SUCCESS':
			return {
				...state,
				loading: false,
				orders: action.payload,
				error: null,
			};
		case 'ADD_ORDERS_SUCCESS':
			return {
				...state,
				orders: [...state.orders, action.payload],
				loading: false,
				error: null,
			};

		case 'EDIT_ORDERS_SUCCESS':
			return {
				...state,
				orders: state.orders.map((order) =>
					order._id === action.payload._id ? action.payload : order
				),
				error: null,
			};
		case 'DELETE_PREV_ORDERS_SUCCESS':
			console.log(action.payload);
			return {
				...state,
				prevOrder: state.prevOrder.filter(
					(order) => order.tableId !== action.payload
				),
				error: null,
				loading: false,
			};
		case 'UPDATE_ORDER_PENDING_SUCCESS':
			return {
				...state,
				loading: false,
				orders: state.orders.map((order) => {
					if (order._id === action.payload.orderId) {
						return {
							...order,
							items: order.items.map((item) =>
								action.payload.itemIds.includes(item._id)
									? { ...item, pending: !item.pending }
									: item
							),
						};
					}
					return order;
				}),
			};
		case 'DELETE_ITEM_SUCCESS':
			return {
				...state,
				loading: false,
				orders: state.orders.map((order) => {
					if (order._id === action.payload.orderId) {
						return {
							...order,
							items: order.items.filter(
								(item) => item._id !== action.payload.itemId
							),
						};
					}
					return order;
				}),
			};
		case 'CASH_ORDER_SUCCESS':
			return {
				...state,
				orders: state.orders.map((order) =>
					order._id === action.payload
						? { ...order, isOpen: false }
						: order
				),
				loading: false,
				error: null,
			};
		case 'DATA_ORDERS_ERROR':
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};
