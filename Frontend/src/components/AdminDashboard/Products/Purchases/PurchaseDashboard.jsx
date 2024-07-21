/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState, useMemo } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Table } from '../../../Table.jsx';
import Modals from '../../../Modals.jsx';
import { ProductContext } from '../../../../context/ProductContext.jsx';
import { Button } from 'react-bootstrap';
import { usePurchaseActions } from '../../../../hooks/usePurchaseActions.js';
import Loader from '../../../../helpers/Loader.jsx';
import PurchaseForm from './PurchaseForm.jsx';
import { DateTime } from 'luxon';

export const PurchaseDashboard = () => {
	const { state, loading } = useContext(ProductContext);
	const { dataPurchases, deletePurchaseAction } = usePurchaseActions();
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openAddModal, setOpenAddModal] = useState(false);
	const [rowId, setRowId] = useState(null);
	const [openViewModal, setOpenViewModal] = useState(false);

	// CARGA LOS DATOS DE PROVEEDORES
	useEffect(() => {
		dataPurchases();
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

	// ABRE MODAL P VER ORDEN Y ENVIA PROPS ROWID
	const handleOpenViewModal = (rowId) => {
		setOpenViewModal(true);
		setRowId(rowId);
	};

	// CIERRA MODALES
	const handleCloseModal = () => {
		setOpenEditModal(false);
		setOpenAddModal(false);
		setOpenViewModal(false);
		dataPurchases();
	};

	// CONFIGURA COLUMNS PARA LA TABLE
	const columns = useMemo(
		() => [
			{
				header: 'Proveedor',
				accessorKey: 'name',
				enableColumnPurchaseing: false,
				size: 50,
			},
			{
				header: 'Fecha Pedido',
				accessorKey: 'openAt',
				enableColumnPurchaseing: false,
				size: 50,
				Cell: ({ row }) => {
					const openAt = DateTime.fromISO(row.original.openAt, {
						zone: 'utc',
					})
						.setZone('America/Argentina/Buenos_Aires')
						.toLocaleString(DateTime.DATETIME_SHORT);
					return openAt;
				},
			},
			{
				header: 'Monto del Pedido',
				accessorKey: 'price',
				enableColumnPurchaseing: false,
				size: 50,
			},
			{
				header: 'Estado',
				accessorKey: 'status',
				enableColumnPurchaseing: false,
				size: 50,
				Cell: ({ row }) => {
					return row.original.status === true ? 'Entregado' : 'Pendiente';
				},
			},
		],
		[]
	);

	// CONFIGURA ACTIONS PARA LA TABLE
	const actions = [
		{
			text: 'Ver',
			icon: <FaEye />,
			onClick: (row) => {
				handleOpenViewModal(row.original._id);
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
				deletePurchaseAction(row.original._id);
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
							Pedidos a Proveedores
						</h3>{' '}
						<Button
							onClick={handleOpenAddModal}
							className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:from-slate-to-slate-800 text-white hover:text-white font-bold py-2 px-4 rounded'>
							<i className='pe-2 fa-solid fa-plus hover:text-slate-600'></i>
							Agregar Pedido
						</Button>
					</div>
					<div className='table-responsive'>
						<ThemeProvider theme={darkTheme}>
							<CssBaseline />
							<Table
								columns={columns}
								data={state.purchases}
								actions={actions}
								initialSortColumn='name'
							/>
						</ThemeProvider>
					</div>
					<Modals
						isOpen={openEditModal}
						onClose={handleCloseModal}
						title='Editar Pedido'>
						<PurchaseForm
							rowId={rowId}
							onClose={handleCloseModal}
							mode='edit'
						/>
					</Modals>
					<Modals
						isOpen={openAddModal}
						onClose={handleCloseModal}
						title='Agregar Nuevo Pedido'>
						<PurchaseForm onClose={handleCloseModal} mode='create' />
					</Modals>
					<Modals
						isOpen={openViewModal}
						onClose={handleCloseModal}
						title='Ver Pedido'>
						<PurchaseForm
							onClose={handleCloseModal}
							rowId={rowId}
							mode='view'
						/>
					</Modals>
				</>
			)}
		</>
	);
};
