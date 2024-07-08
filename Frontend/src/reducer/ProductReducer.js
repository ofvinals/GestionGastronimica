/* eslint-disable react/prop-types */

export const ProductReducer = (state, action) => {
	switch (action.type) {
		case 'DATA_PRODUCTS_PENDING':
			return { ...state, loading: true, error: null };
		case 'DATA_PRODUCTS_SUCCESS':
			return {
				...state,
				loading: false,
				products: action.payload,
				error: null,
			};
		case 'ADD_PRODUCT_SUCCESS':
			return {
				...state,
				products: [...state.products, action.payload],
				loading: false,
				error: null,
			};
		case 'DISABLE_PRODUCT_SUCCESS':
			return {
				...state,
				products: state.products.map((product) =>
					product._id === action.payload
						? { ...product, status: false }
						: product
				),
				loading: false,
				error: null,
			};
		case 'ENABLE_PRODUCT_SUCCESS':
			return {
				...state,
				products: state.products.map((product) =>
					product._id === action.payload
						? { ...product, status: true }
						: product
				),
				loading: false,
				error: null,
			};
		case 'EDIT_PRODUCT_SUCCESS':
			return {
				...state,
				products: state.products.map((product) =>
					product._id === action.payload._id ? action.payload : product
				),
				loading: false,
				error: null,
			};
		case 'DELETE_PRODUCT_SUCCESS':
			return {
				...state,
				products: state.products.filter(
					(product) => product._id !== action.payload
				),
				loading: false,
				error: null,
			};
		case 'DATA_PRODUCTS_ERROR':
			return { ...state, loading: false, error: action.payload };

		case 'DATA_SUPPLIERS_PENDING':
			return { ...state, loading: true, error: null };
		case 'DATA_SUPPLIERS_SUCCESS':
			return {
				...state,
				loading: false,
				suppliers: action.payload,
				error: null,
			};
		case 'ADD_SUPPLIER_SUCCESS':
			return {
				...state,
				suppliers: [...state.suppliers, action.payload],
				error: null,
				loading: false,
			};
		case 'DISABLE_SUPPLIER_SUCCESS':
			return {
				...state,
				suppliers: state.suppliers.map((supplier) =>
					supplier._id === action.payload
						? { ...supplier, status: false }
						: supplier
				),
				loading: false,
				error: null,
			};
		case 'ENABLE_SUPPLIER_SUCCESS':
			return {
				...state,
				suppliers: state.suppliers.map((supplier) =>
					supplier._id === action.payload
						? { ...supplier, status: true }
						: supplier
				),
				loading: false,
				error: null,
			};
		case 'EDIT_SUPPLIER_SUCCESS':
			return {
				...state,
				suppliers: state.suppliers.map((supplier) =>
					supplier._id === action.payload._id ? action.payload : supplier
				),
				loading: false,
				error: null,
			};
		case 'DELETE_SUPPLIER_SUCCESS':
			return {
				...state,
				suppliers: state.suppliers.filter(
					(supplier) => supplier._id !== action.payload
				),
				loading: false,
				error: null,
			};
		case 'DATA_SUPPLIERS_ERROR':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};
