/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState, useMemo } from 'react';
import { FaPause, FaPlay, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Table } from '../../Table.jsx';
import Modals from '../../Modals.jsx';
import ProductForm from './ProductForm.jsx';
import { ProductContext } from '../../../context/ProductContext.jsx';
import { useProductActions } from '../../../hooks/useProductActions.jsx';
import '../../../css/Custom.css';

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

	const handleOpenAddModal = (rowId) => {
		setOpenAddModal(true);
		setRowId(rowId);
	};

	const handleOpenEditModal = (rowId) => {
		setOpenEditModal(true);
		setRowId(rowId);
	};
	const handleCloseModal = () => {
		setOpenEditModal(false);
		setOpenAddModal(false);
		dataProducts();
	};

	useEffect(() => {
		dataProducts();
	}, []);

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

	return (
		<>
			<div className='px-5 bg-slate-700 shadowIndex flex flex-wrap flex-row items-center justify-between rounded-t-md'>
				<h3 className=' text-white text-xl font-semibold'>Productos</h3>{' '}
				<button
					onClick={handleOpenAddModal}
					className='mx-3 my-3 border-1 border-white p-1 bg-slate-600 hover:text-slate-600 text-slate-50 hover:bg-white rounded-md'>
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
