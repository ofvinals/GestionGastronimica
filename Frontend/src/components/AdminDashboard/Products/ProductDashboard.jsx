/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState, useMemo } from 'react';
import { FaPause, FaPlay, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Table } from '../../Table';
import Modals from '../../Modals';
import ProductForm from './ProductForm';
import { ProductContext } from '../../../context/ProductContext';
import { useProductActions } from '../../../hooks/useProductActions.js';
import '../../../css/Custom.css';
import Loader from '../../../helpers/Loader';

export const ProductDashboard = () => {
	const { state } = useContext(ProductContext);
	const {
		dataProducts,
		disableProductAction,
		enableProductAction,
		deleteProductAction,
	} = useProductActions();
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openAddModal, setOpenAddModal] = useState(false);
	const [rowId, setRowId] = useState(null);

	// ABRE MODAL PARA AGREGAR
	const handleOpenAddModal = (rowId) => {
		setOpenAddModal(true);
		setRowId(rowId);
	};

	// ABRE MODAL PARA EDITAR
	const handleOpenEditModal = (rowId) => {
		setOpenEditModal(true);
		setRowId(rowId);
	};

	// CIERRA MODALES
	const handleCloseModal = () => {
		setOpenEditModal(false);
		setOpenAddModal(false);
	};

	// CARGA DATOS DE PRODUCTOS
	useEffect(() => {
		dataProducts();
	}, []);

	// CONFIGURA COLUMNS PARA LA TABLE
	const columns = useMemo(
		() => [
			{
				header: 'Nombre',
				accessorKey: 'name',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Cantidad',
				accessorKey: 'cant',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Unidad',
				accessorKey: 'unit',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Costo',
				accessorKey: 'cost',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Proveedor',
				accessorKey: 'supplier',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Estado',
				accessorKey: 'status',
				enableColumnOrdering: false,
				size: 50,
				Cell: ({ row }) => {
					return row.original.status === true
						? 'Habilitado'
						: 'Suspendido';
				},
			},
		],
		[]
	);

	// CONFIGURA ACTIONS PARA LA TABLE
	const actions = [
		{
			text: 'Inhabilitar',
			icon: <FaPause />,
			onClick: (row) => {
				disableProductAction(row.original._id);
			},
		},
		{
			text: 'Habilitar',
			icon: <FaPlay />,
			onClick: (row) => {
				enableProductAction(row.original._id);
			},
		},
		{
			text: 'Editar',
			icon: <FaEdit />,
			onClick: (row) => {
				handleOpenEditModal(row.original._id);
			},
		},
		{
			text: 'Eliminar',
			icon: <FaTrashAlt />,
			onClick: (row) => {
				deleteProductAction(row.original._id);
			},
		},
	];

	const darkTheme = createTheme({
		palette: {
			mode: 'light',
		},
	});

	if (state.loading) {
		return <Loader />;
	}

	return (
		<>
			<div className='px-5 bg-slate-700 shadowIndex flex flex-wrap flex-row items-center justify-around sm:justify-between rounded-t-md'>
				<h3 className=' text-white text-xl font-semibold'>Productos</h3>{' '}
				<button
					onClick={handleOpenAddModal}
					className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white  font-bold py-2 px-4 rounded'>
					<i className='pe-2 fa-solid fa-plus hover:text-slate-600'></i>
					Agregar Productos
				</button>
			</div>
			<div className='table-responsive'>
				<ThemeProvider theme={darkTheme}>
					<CssBaseline />
					<Table
						columns={columns}
						data={state.products}
						actions={actions}
						initialSortColumn='name'
					/>
				</ThemeProvider>
			</div>
			<Modals
				isOpen={openEditModal}
				onClose={handleCloseModal}
				title='Editar Producto'>
				<ProductForm rowId={rowId} onClose={handleCloseModal} mode='edit' />
			</Modals>
			<Modals
				isOpen={openAddModal}
				onClose={handleCloseModal}
				title='Agregar Nuevo Producto'>
				<ProductForm onClose={handleCloseModal} mode='create' />
			</Modals>
		</>
	);
};
