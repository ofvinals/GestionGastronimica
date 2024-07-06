/* eslint-disable react/prop-types */

export const ProductReducer = (state, action) => {
	switch (action.type) {
		case 'DATA_PRODUCTS_PENDING':
		case 'ADD_PRODUCT_PENDING':
		case 'DISABLE_PRODUCT_PENDING':
		case 'ENABLE_PRODUCT_PENDING':
		case 'EDIT_PRODUCT_PENDING':
		case 'DELETE_PRODUCT_PENDING':
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
				error: null,
			};
		case 'EDIT_PRODUCT_SUCCESS':
			return {
				...state,
				products: state.products.map((product) =>
					product._id === action.payload._id ? action.payload : product
				),
				error: null,
			};
		case 'DELETE_PRODUCT_SUCCESS':
			console.log(action.payload);
			return {
				...state,
				products: state.products.filter(
					(product) => product._id !== action.payload
				),
				error: null,
			};
		case 'DATA_PRODUCTS_ERROR':
		case 'ADD_PRODUCT_ERROR':
		case 'DISABLE_PRODUCT_ERROR':
		case 'ENABLE_PRODUCT_ERROR':
		case 'EDIT_PRODUCT_ERROR':
		case 'DELETE_PRODUCT_ERROR':
			return { ...state, loading: false, error: action.payload };

		case 'DATA_SUPPLIERS_PENDING':
		case 'ADD_SUPPLIER_PENDING':
		case 'DISABLE_SUPPLIER_PENDING':
		case 'ENABLE_SUPPLIER_PENDING':
		case 'EDIT_SUPPLIER_PENDING':
		case 'DELETE_SUPPLIER_PENDING':
			return { ...state, loading: true, error: null };
		case 'DATA_SUPPLIERS':
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
			};
		case 'DISABLE_SUPPLIER_SUCCESS':
			return {
				...state,
				suppliers: state.suppliers.map((supplier) =>
					supplier._id === action.payload
						? { ...supplier, status: false }
						: supplier
				),
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
				error: null,
			};
		case 'EDIT_SUPPLIER_SUCCESS':
			return {
				...state,
				suppliers: state.suppliers.map((supplier) =>
					supplier._id === action.payload._id ? action.payload : supplier
				),
				error: null,
			};
		case 'DELETE_SUPPLIER_SUCCESS':
			return {
				...state,
				suppliers: state.suppliers.filter(
					(supplier) => supplier._id !== action.payload
				),
				error: null,
			};
		case 'DATA_SUPPLIERS_ERROR':
		case 'ADD_SUPPLIER_ERROR':
		case 'DISABLE_SUPPLIER_ERROR':
		case 'ENABLE_SUPPLIER_ERROR':
		case 'EDIT_SUPPLIER_ERROR':
		case 'DELETE_SUPPLIER_ERROR':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};
