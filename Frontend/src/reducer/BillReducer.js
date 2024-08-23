/* eslint-disable react/prop-types */

export const BillReducer = (state, action) => {
	switch (action.type) {
		case 'DATA_BILLS_PENDING':
			return { ...state, loading: true, error: null };
		case 'DATA_BILLS_SUCCESS':
			return {
				...state,
				loading: false,
				bills: action.payload,
				error: null,
			};
		case 'ADD_BILL_SUCCESS':
			return {
				...state,
				bills: [...state.bills, action.payload],
				loading: false,
				error: null,
			};
		case 'DISABLE_BILL_SUCCESS':
			return {
				...state,
				bills: state.bills.map((bill) =>
					bill._id === action.payload
						? { ...bill, status: false }
						: bill
				),
				loading: false,
				error: null,
			};
		case 'ENABLE_BILL_SUCCESS':
			return {
				...state,
				bills: state.bills.map((bill) =>
					bill._id === action.payload
						? { ...bill, status: true }
						: bill
				),
				loading: false,
				error: null,
			};
		case 'EDIT_BILL_SUCCESS':
			return {
				...state,
				bills: state.bills.map((bill) =>
					bill._id === action.payload._id ? action.payload : bill
				),
				loading: false,
				error: null,
			};
		case 'DELETE_BILL_SUCCESS':
			return {
				...state,
				bills: state.bills.filter(
					(bill) => bill._id !== action.payload
				),
				loading: false,
				error: null,
			};
		case 'DATA_BILLS_ERROR':
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};
