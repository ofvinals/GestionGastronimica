/* eslint-disable react/prop-types */

export const MenuReducer = (state, action) => {
	switch (action.type) {
		case 'DATA_MENUS_PENDING':
		case 'ADD_MENU_PENDING':
		case 'DISABLE_MENU_PENDING':
		case 'ENABLE_MENU_PENDING':
		case 'EDIT_MENU_PENDING':
		case 'DELETE_MENU_PENDING':
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
			};
		case 'DISABLE_MENU_SUCCESS':
			return {
				...state,
				menus: state.menus.map((menu) =>
					menu._id === action.payload ? { ...menu, status: false } : menu
				),
				error: null,
			};
		case 'ENABLE_MENU_SUCCESS':
			return {
				...state,
				menus: state.menus.map((menu) =>
					menu._id === action.payload ? { ...menu, status: true } : menu
				),
				error: null,
			};
		case 'EDIT_MENU_SUCCESS':
			console.log(state, action);
			return {
				...state,
				menus: state.menus.map((menu) =>
					menu._id === action.payload.id ? action.payload : menu
				),
				error: null,
			};
		case 'DELETE_MENU_SUCCESS':
			return {
				...state,
				menus: state.menus.filter((menu) => menu._id !== action.payload),
				error: null,
			};
		case 'DATA_MENUS_ERROR':
		case 'ADD_MENU_ERROR':
		case 'DISABLE_MENU_ERROR':
		case 'ENABLE_MENU_ERROR':
		case 'EDIT_MENU_ERROR':
		case 'DELETE_MENU_ERROR':
			return { ...state, loading: false, error: action.payload };

		case 'DATA_CATEGORYS_PENDING':
		case 'ADD_CATEGORY_PENDING':
		case 'DISABLE_CATEGORY_PENDING':
		case 'ENABLE_CATEGORY_PENDING':
		case 'EDIT_CATEGORY_PENDING':
		case 'DELETE_CATEGORY_PENDING':
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
				error: null,
			};
		case 'EDIT_CATEGORY_SUCCESS':
			return {
				...state,
				categorys: state.categorys.map((category) =>
					category._id === action.payload._id ? action.payload : category
				),
				error: null,
			};
		case 'DELETE_CATEGORY_SUCCESS':
			return {
				...state,
				categorys: state.categorys.filter(
					(category) => category._id !== action.payload
				),
				error: null,
			};
		case 'DATA_CATEGORYS_ERROR':
		case 'ADD_CATEGORY_ERROR':
		case 'DISABLE_CATEGORY_ERROR':
		case 'ENABLE_CATEGORY_ERROR':
		case 'EDIT_CATEGORY_ERROR':
		case 'DELETE_CATEGORY_ERROR':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};
