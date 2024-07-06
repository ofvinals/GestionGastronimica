export const AuthReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN_PENDING':
			return { ...state, loading: true, error: null };
		case 'LOGIN_SUCCESS':
			return {
				...state,
				user: action.payload,
			};
		case 'LOGIN_ERROR':
			return { ...state, loading: false, error: action.payload };

		case 'LOGOUT':
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
};
