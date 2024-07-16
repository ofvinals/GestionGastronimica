/* eslint-disable no-case-declarations */
/* eslint-disable no-mixed-spaces-and-tabs */
export const LoungeReducer = (state, action) => {
	console.log(state, action)
	switch (action.type) {
		case 'DATA_TABLE_PENDING':
		case 'DATA_SALON_PENDING':
			return { ...state, loading: true, error: null };
		case 'DATA_SALONID_SUCCESS':
			return {
				...state,
				lounges: action.payload,
			};
		case 'DATA_SALONS_SUCCESS':
			return {
				...state,
				lounges: action.payload,
			};
		case 'ADD_SALON_SUCCESS':
			return {
				...state,
				lounges: [...state.lounges, action.payload],
			};

		case 'UPDATE_LAYOUTS_SUCCESS':
			const { salonId, layouts } = action.payload;
			return {
				...state,
				lounges: state.lounges.map((salon) =>
					salon._id === salonId ? { ...salon, layouts } : salon
				),
			};

		case 'ADD_TABLE_SUCCESS': {
			const { salonId, table } = action.payload;
			return {
				...state,
				lounges: state.lounges.map((salon) =>
					salon._id === salonId
						? { ...salon, layouts: [...salon.layouts, table] }
						: salon
				),
			};
		}
		case 'UPDATE_TABLE_POSITION_SUCCESS': {
			const { salonId, tableId, newX, newY } = action.payload;
			return {
				...state,
				lounges: state.lounges.map((salon) =>
					salon._id === salonId
						? {
								...salon,
								layouts: salon.layouts.map((table) =>
									table.id === tableId
										? { ...table, x: newX, y: newY }
										: table
								),
						  }
						: salon
				),
			};
		}
		case 'REMOVE_TABLE_SUCCESS': {
			const { salonId, tableId } = action.payload;
			return {
				...state,
				lounges: state.lounges.map((salon) =>
					salon._id === salonId
						? {
								...salon,
								layouts: salon.layouts.filter(
									(table) => table.id !== tableId
								),
						  }
						: salon
				),
			};
		}
		case 'UPDATE_TABLE_DETAILS_SUCCESS': {
			const { salonId, id, waiter } = action.payload;
			return {
				...state,
				lounges: state.lounges.map((salon) =>
					salon._id === salonId
						? {
								...salon,
								layouts: salon.layouts.map((table) =>
									table.id === id ? { ...table, waiter } : table
								),
						  }
						: salon
				),
			};
		}
		case 'OPEN_TABLE_SUCCESS':
		const { salon_Id, tableId, isOpen, closeTime } = action.payload;
			return {
				...state,
				lounges: state.lounges.map((salon) =>
					salon._id === salon_Id
						? {
								...salon,
								layouts: salon.layouts.map((table) =>
									table.id === tableId ? { ...table, isOpen, closeTime } : table
								),
						  }
						: salon
				),
			};
		case 'DATA_TABLE_ERROR':
		case 'DATA_SALON_ERROR':
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};
