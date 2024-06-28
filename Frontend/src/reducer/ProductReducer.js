/* eslint-disable react/prop-types */

export const ProductReducer = (state, action) => {
	switch (action.type) {
		case 'DATA_PRODUCTS_REQUEST':
			return { ...state, loading: true, error: null };
		case 'DATA_PRODUCTS':
			return { ...state, loading: false, products: action.payload };
		case 'ADD_PRODUCT':
			return { ...state, products: [...state.products, action.payload] };
		case 'DISABLE_PRODUCT':
			return {
				...state,
				products: state.products.map((product) =>
					product.id === action.payload
						? { ...product, status: false }
						: product
				),
			};
		case 'ENABLE_PRODUCT':
			return {
				...state,
				products: state.products.map((product) =>
					product.id === action.payload
						? { ...product, status: true }
						: product
				),
			};
		case 'EDIT_PRODUCT':
			return {
				...state,
				products: state.users.map((product) =>
					product.id === action.payload.id ? action.payload : product
				),
			};
		default:
			return state;
	}
};
