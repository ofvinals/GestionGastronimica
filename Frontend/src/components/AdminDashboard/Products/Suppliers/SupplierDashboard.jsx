/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState, useMemo } from 'react';
import { FaPause, FaPlay, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Table } from '../../../Table';
import Modals from '../../../Modals';
import ProductForm from './SupplierForm';
import { ProductContext } from '../../../../context/ProductContext';
import { Button } from 'react-bootstrap';
import { useSupplierActions } from '../../../../hooks/useSupplierActions.js';
import Loader from '../../../../helpers/Loader';

export const SupplierDashboard = () => {
	const { state, loading } = useContext(ProductContext);
	const {
		dataSuppliers,
		disableSupplierAction,
		enableSupplierAction,
		deleteSupplierAction,
	} = useSupplierActions();
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openAddModal, setOpenAddModal] = useState(false);
	const [rowId, setRowId] = useState(null);

	// CARGA LOS DATOS DE PROVEEDORES
	useEffect(() => {
		dataSuppliers();
	}, []);

	// ABRE MODAL P AGREGAR
	const handleOpenAddModal = (rowId) => {
		setOpenAddModal(true);
		setRowId(rowId);
	};

	// ABRE MODAL P EDITAR
	const handleOpenEditModal = (rowId) => {
		setOpenEditModal(true);
		setRowId(rowId);
	};

	// CIERRA MODALES
	const handleCloseModal = () => {
		setOpenEditModal(false);
		setOpenAddModal(false);
		dataSuppliers();
	};

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

	// CONFIGURA ACTIONS PARA LA TABLE
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
			{loading ? (
				<Loader />
			) : (
				<>
					<div className='px-5 shadowIndex rounded-t-md bg-slate-700 flex flex-wrap flex-row items-center justify-around sm:justify-between'>
						<h3 className=' text-white text-xl font-semibold'>
							Proveedores
						</h3>{' '}
						<Button
							onClick={handleOpenAddModal}
							className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:from-slate-to-slate-800 text-white hover:text-white font-bold py-2 px-4 rounded'>
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
								initialSortColumn='name'
							/>
						</ThemeProvider>
					</div>
					<Modals
						isOpen={openEditModal}
						onClose={handleCloseModal}
						title='Editar Proveedor'>
						<ProductForm
							rowId={rowId}
							onClose={handleCloseModal}
							mode='edit'
						/>
					</Modals>
					<Modals
						isOpen={openAddModal}
						onClose={handleCloseModal}
						title='Agregar Nuevo Proveedor'>
						<ProductForm onClose={handleCloseModal} mode='create' />
					</Modals>
				</>
			)}
		</>
	);
};
