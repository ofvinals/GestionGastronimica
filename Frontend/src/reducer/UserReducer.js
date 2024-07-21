export const UserReducer = (state, action) => {
	switch (action.type) {
		case 'DATA_USERS_PENDING':
			return { ...state, loading: true, error: null };
		case 'DATA_USERS_SUCCESS':
			return {
				...state,
				loading: false,
				users: action.payload,
				error: null,
			};
		case 'ADD_USER_SUCCESS':
			return {
				...state,
				loading: false,
				users: [...state.users, action.payload],
				error: null,
			};
		case 'DISABLE_USER_SUCCESS':
			return {
				...state,
				loading: false,
				users: state.users.map((user) =>
					user._id === action.payload ? { ...user, status: false } : user
				),
				error: null,
			};
		case 'ENABLE_USER_SUCCESS':
			return {
				...state,
				loading: false,
				users: state.users.map((user) =>
					user._id === action.payload ? { ...user, status: true } : user
				),
				error: null,
			};
		case 'EDIT_USER_SUCCESS':
			return {
				...state,
				loading: false,
				users: state.users.map((user) =>
					user._id === action.payload._id ? action.payload : user
				),
				error: null,
			};
		case 'DELETE_USER_SUCCESS':
			return {
				...state,
				loading: false,
				users: state.users.filter((user) => user._id !== action.payload),
				error: null,
			};
		case 'DATA_USERS_ERROR':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};
