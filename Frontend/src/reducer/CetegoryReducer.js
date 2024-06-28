/* eslint-disable react/prop-types */

export const CategoryReducer = (state, action) => {
	switch (action.type) {
		case 'DATA_CATEGORYS_REQUEST':
			return { ...state, loading: true, error: null };
		case 'DATA_CATEGORYS':
			return { ...state, loading: false, categorys: action.payload };
		case 'ADD_CATEGORY':
			return { ...state, categorys: [...state.categorys, action.payload] };
		case 'DISABLE_CATEGORY':
			return {
				...state,
				categorys: state.categorys.map((category) =>
					category.id === action.payload
						? { ...category, status: false }
						: category
				),
			};
		case 'ENABLE_CATEGORY':
			return {
				...state,
				categorys: state.categorys.map((category) =>
					category.id === action.payload
						? { ...category, status: true }
						: category
				),
			};
		case 'EDIT_CATEGORY':
			return {
				...state,
				categorys: state.categorys.map((category) =>
					category.id === action.payload.id ? action.payload : category
				),
			};
		default:
			return state;
	}
};
