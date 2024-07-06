/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState, useMemo } from 'react';
import { FaPause, FaPlay, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Table } from '../../../Table.jsx';
import Modals from '../../../Modals.jsx';
import ProductForm from './SupplierForm.jsx';
import { ProductContext } from '../../../../context/ProductContext.jsx';
import { Button } from 'react-bootstrap';
import { useSupplierActions } from '../../../../hooks/useSupplierActions.jsx';

export const SupplierDashboard = () => {
	const { state } = useContext(ProductContext);
	const {
		dataSuppliers,
		disableSupplierAction,
		enableSupplierAction,
		deleteSupplierAction,
	} = useSupplierActions();
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
		dataSuppliers();
	};

	useEffect(() => {
		dataSuppliers();
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
				header: 'Email',
				accessorKey: 'email',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Telefono',
				accessorKey: 'tel',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Direccion',
				accessorKey: 'address',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'CUIT',
				accessorKey: 'cuit',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Comentarios',
				accessorKey: 'comment',
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
				disableSupplierAction(row.original._id);
			},
		},
		{
			text: 'Habilitar',
			icon: <FaPlay />,
			onClick: (row) => {
				enableSupplierAction(row.original._id);
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
				deleteSupplierAction(row.original._id);
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
			<div className='px-5 shadowIndex rounded-t-md bg-slate-700 flex flex-wrap flex-row items-center justify-between'>
				<h3 className=' text-white text-xl font-semibold'>Proveedores</h3>{' '}
				<Button
					onClick={handleOpenAddModal}
					className='mx-3 my-3 border-1 border-white p-1 bg-slate-600 hover:text-slate-600 text-slate-50 hover:bg-white rounded-md'>
					<i className='pe-2 fa-solid fa-plus hover:text-slate-600'></i>
					Agregar Proveedor
				</Button>
			</div>
			<div className='table-responsive'>
				<ThemeProvider theme={darkTheme}>
					<CssBaseline />
					<Table
						columns={columns}
						data={state.suppliers}
						actions={actions}
					/>
				</ThemeProvider>
			</div>
			<Modals
				isOpen={openEditModal}
				onClose={handleCloseModal}
				title='Editar Proveedor'>
				<ProductForm rowId={rowId} onClose={handleCloseModal} mode='edit' />
			</Modals>
			<Modals
				isOpen={openAddModal}
				onClose={handleCloseModal}
				title='Agregar Nuevo Proveedor'>
				<ProductForm onClose={handleCloseModal} mode='create' />
			</Modals>
		</>
	);
};
