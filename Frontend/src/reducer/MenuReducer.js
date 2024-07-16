/* eslint-disable react/prop-types */

export const MenuReducer = (state, action) => {
	console.log(state, action)
	switch (action.type) {
		case 'DATA_MENUS_PENDING':
			return { ...state, loading: true, error: null };
		case 'DATA_MENUS_SUCCESS':
			return {
				...state,
				loading: false,
				menus: action.payload,
				error: null,
			};
		case 'ADD_MENU_SUCCESS':
			return {
				...state,
				menus: [...state.menus, action.payload],
				error: null,
				loading: false,
			};
		case 'DISABLE_MENU_SUCCESS':
			return {
				...state,
				menus: state.menus.map((menu) =>
					menu._id === action.payload ? { ...menu, status: false } : menu
				),
				loading: false,
				error: null,
			};
		case 'ENABLE_MENU_SUCCESS':
			return {
				...state,
				menus: state.menus.map((menu) =>
					menu._id === action.payload ? { ...menu, status: true } : menu
				),
				loading: false,
				error: null,
			};
		case 'EDIT_MENU_SUCCESS':
			return {
				...state,
				menus: state.menus.map((menu) =>
					menu._id === action.payload._id ? action.payload : menu
				),
				loading: false,
				error: null,
			};
		case 'DELETE_MENU_SUCCESS':
			return {
				...state,
				menus: state.menus.filter((menu) => menu._id !== action.payload),
				loading: false,
				error: null,
			};
		case 'DATA_MENUS_ERROR':
			return { ...state, loading: false, error: action.payload };

		case 'DATA_CATEGORYS_PENDING':
			return { ...state, loading: true, error: null };
		case 'DATA_CATEGORYS_SUCCESS':
			return {
				...state,
				loading: false,
				categorys: action.payload,
				error: null,
			};
		case 'ADD_CATEGORY_SUCCESS':
			return {
				...state,
				categorys: [...state.categorys, action.payload],
				loading: false,
				error: null,
			};
		case 'DISABLE_CATEGORY_SUCCESS':
			return {
				...state,
				categorys: state.categorys.map((category) =>
					category._id === action.payload
						? { ...category, status: false }
						: category
				),
				loading: false,
				error: null,
			};
		case 'ENABLE_CATEGORY_SUCCESS':
			return {
				...state,
				categorys: state.categorys.map((category) =>
					category._id === action.payload
						? { ...category, status: true }
						: category
				),
				loading: false,
				error: null,
			};
		case 'EDIT_CATEGORY_SUCCESS':
			return {
				...state,
				categorys: state.categorys.map((category) =>
					category._id === action.payload._id ? action.payload : category
				),
				loading: false,
				error: null,
			};
		case 'DELETE_CATEGORY_SUCCESS':
			return {
				...state,
				categorys: state.categorys.filter(
					(category) => category._id !== action.payload
				),
				loading: false,
				error: null,
			};
		case 'DATA_CATEGORYS_ERROR':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};
