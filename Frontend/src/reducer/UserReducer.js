/* eslint-disable react/prop-types */

export const UserReducer = (state, action) => {
	switch (action.type) {
		case 'DATA_USERS_REQUEST':
			return { ...state, loading: true, error: null };
		case 'DATA_USERS':
			return { ...state, loading: false, users: action.payload };
		case 'ADD_USER':
			return { ...state, users: [...state.users, action.payload] };
		case 'DISABLE_USER':
			return {
				...state,
				users: state.users.map((user) =>
					user.id === action.payload ? { ...user, status: false } : user
				),
			};
		case 'ENABLE_USER':
			return {
				...state,
				users: state.users.map((user) =>
					user.id === action.payload ? { ...user, status: true } : user
				),
			};
		case 'EDIT_USER':
			return {
				...state,
				users: state.users.map((user) =>
					user.id === action.payload.id ? action.payload : user
				),
			};
		default:
			return state;
	}
};
