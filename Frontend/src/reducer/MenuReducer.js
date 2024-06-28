/* eslint-disable react/prop-types */

export const MenuReducer = (state, action) => {
	switch (action.type) {
		case 'DATA_MENUS_REQUEST':
			return { ...state, loading: true, error: null };
		case 'DATA_MENUS':
			return { ...state, loading: false, menus: action.payload };
		case 'ADD_MENU':
			return { ...state, menus: [...state.menus, action.payload] };
		case 'DISABLE_MENU':
			return {
				...state,
				menus: state.menus.map((menu) =>
					menu.id === action.payload ? { ...menu, status: false } : menu
				),
			};
		case 'ENABLE_MENU':
			return {
				...state,
				menus: state.menus.map((menu) =>
					menu.id === action.payload ? { ...menu, status: true } : menu
				),
			};
		case 'EDIT_MENU':
			return {
				...state,
				menus: state.menus.map((menu) =>
					menu.id === action.payload.id ? action.payload : menu
				),
			};
		default:
			return state;
	}
};
