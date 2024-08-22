/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useMemo, useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Table } from '../../../../utils/Table';
import Modals from '../../../../utils/Modals';
import { useOrderActions } from '../../../../hooks/useOrderActions.js';
import OrderForm from './OrderForm';
import { OrderContext } from '../../../../context/OrderContext';
import Loader from '../../../../utils/Loader';
import { DateTime } from 'luxon';
import useModal from '../../../../hooks/useModal.js';

export const OrderDashboard = () => {
	const { state } = useContext(OrderContext);
	const [rowId, setRowId] = useState(null);
	const { dataOrders, deleteOrderAction } = useOrderActions();

	// ACTUALIZA ORDERS
	useEffect(() => {
		dataOrders();
	}, []);

	// APERTURA Y CIERRE DE MODALES
	const {
		isOpen: isEditModalOpen,
		openModal: openEditModal,
		closeModal: closeEditModal,
	} = useModal();

	const {
		isOpen: isAddModalOpen,
		openModal: openAddModal,
		closeModal: closeAddModal,
	} = useModal();

	const {
		isOpen: isViewModalOpen,
		openModal: openViewModal,
		closeModal: closeViewModal,
	} = useModal();

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
				setRowId(row.original._id);
				openViewModal();
			},
		},
		{
			text: 'Editar',
			icon: <FaEdit />,
			onClick: (row) => {
				setRowId(row.original._id);
				openEditModal();
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

	return (
		<>
			<div className='py-2 px-5 shadowIndex rounded-t-md bg-slate-700 flex flex-wrap flex-row items-center justify-around md:justify-between'>
				<h3 className=' text-white text-xl font-semibold '>
					Ordenes de pedidos
				</h3>
				<button
					onClick={openAddModal}
					className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white  font-bold py-2 px-4 rounded'>
					<i className='pe-2 fa-solid fa-plus'></i>
					Agregar Orden de Pedido
				</button>
			</div>
			{state.loading ? (
				<Loader />
			) : (
				<div className='table-responsive'>
					<Table
						columns={columns}
						data={state.orders}
						actions={actions}
						initialSortColumn='openAt'
					/>
				</div>
			)}
			<Modals
				isOpen={isEditModalOpen}
				onClose={closeEditModal}
				title='Editar Pedido'>
				<OrderForm rowId={rowId} onClose={closeEditModal} mode='edit' />
			</Modals>
			<Modals
				isOpen={isAddModalOpen}
				onClose={closeAddModal}
				title='Agregar Nuevo Pedido'>
				<OrderForm onClose={closeAddModal} mode='create' />
			</Modals>
			<Modals
				isOpen={isViewModalOpen}
				onClose={closeViewModal}
				title='Ver Pedido'>
				<OrderForm onClose={closeViewModal} rowId={rowId} mode='view' />
			</Modals>
		</>
	);
};
