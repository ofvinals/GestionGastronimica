/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useContext, useEffect, useMemo, useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Table } from '../../../Table';
import Modals from '../../../Modals';
import { useOrderActions } from '../../../../hooks/useOrderActions.js';
import OrderForm from './OrderForm';
import { OrderContext } from '../../../../context/OrderContext';
import Loader from '../../../../helpers/Loader';
import { DateTime } from 'luxon';

export const OrderDashboard = () => {
	const { state } = useContext(OrderContext);
	const [openAddModal, setOpenAddModal] = useState(false);
	const [rowId, setRowId] = useState(null);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openViewModal, setOpenViewModal] = useState(false);
	const { dataOrders, deleteOrderAction } = useOrderActions();

	// ACTUALIZA ORDERS
	useEffect(() => {
		dataOrders();
	}, []);

	// ABRE MODAL P AGREGAR ORDEN Y ENVIA PROPS ROWID
	const handleOpenAddModal = (rowId) => {
		setOpenAddModal(true);
		setRowId(rowId);
	};

	// ABRE MODAL P VER ORDEN Y ENVIA PROPS ROWID
	const handleOpenViewModal = (rowId) => {
		setOpenViewModal(true);
		setRowId(rowId);
	};

	// ABRE MODAL P VER ORDEN Y ENVIA PROPS ROWID
	const handleOpenEditModal = (rowId) => {
		setOpenEditModal(true);
		setRowId(rowId);
	};

	// CIERRA TODOS LOS MODALES Y ACTUALIZA ORDERS
	const handleCloseModal = () => {
		setOpenEditModal(false);
		setOpenAddModal(false);
		setOpenViewModal(false);
	};

	// ENVIA DATOS Y CONFIG DE COLUMNAS A TABLES
	const columns = useMemo(
		() => [
			{
				header: 'Mesa',
				accessorKey: 'tableNum',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Estado',
				accessorKey: 'status',
				enableColumnOrdering: false,
				size: 50,
				Cell: ({ row }) => {
					return row.original.orderOpen === true ? 'Abierta' : 'Cerrada';
				},
			},
			{
				header: 'Hora Apertura',
				accessorKey: 'openAt',
				enableColumnOrdering: false,
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
				header: 'Hora Cierre',
				accessorKey: 'closeTime',
				enableColumnOrdering: false,
				size: 50,
				Cell: ({ row }) => {
					if (row.original.closeTime) {
						const closeAt = DateTime.fromISO(row.original.closeTime, {
							zone: 'utc',
						})
							.setZone('America/Argentina/Buenos_Aires')
							.toLocaleString(DateTime.DATETIME_SHORT);
						return closeAt;
					} else {
						return 'Orden abierta';
					}
				},
			},
		],
		[]
	);

	// CONFIG LAS ACTIONS PARA LA TABLE
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
				deleteOrderAction(row.original._id);
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
			<div className='py-2 px-5 shadowIndex rounded-t-md bg-slate-700 flex flex-wrap flex-row items-center justify-around md:justify-between'>
				<h3 className=' text-white text-xl font-semibold '>
					Ordenes de pedidos
				</h3>
				<button
					onClick={handleOpenAddModal}
					className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white  font-bold py-2 px-4 rounded'>
					<i className='pe-2 fa-solid fa-plus'></i>
					Agregar Orden de Pedido
				</button>
			</div>
			<div className='table-responsive'>
				<ThemeProvider theme={darkTheme}>
					<CssBaseline />
					<Table
						columns={columns}
						data={state.orders}
						actions={actions}
						initialSortColumn='openAt'
					/>
				</ThemeProvider>
			</div>
			<Modals
				isOpen={openEditModal}
				onClose={handleCloseModal}
				title='Editar Pedido'>
				<OrderForm rowId={rowId} onClose={handleCloseModal} mode='edit' />
			</Modals>
			<Modals
				isOpen={openAddModal}
				onClose={handleCloseModal}
				title='Agregar Nuevo Pedido'>
				<OrderForm onClose={handleCloseModal} mode='create' />
			</Modals>
			<Modals
				isOpen={openViewModal}
				onClose={handleCloseModal}
				title='Ver Pedido'>
				<OrderForm onClose={handleCloseModal} rowId={rowId} mode='view' />
			</Modals>
		</>
	);
};
