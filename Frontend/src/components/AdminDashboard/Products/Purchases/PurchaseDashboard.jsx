/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState, useMemo } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';

import { Table } from '../../../../utils/Table.jsx';
import Modals from '../../../../utils/Modals.jsx';
import { ProductContext } from '../../../../context/ProductContext.jsx';
import { Button } from 'react-bootstrap';
import { usePurchaseActions } from '../../../../hooks/usePurchaseActions.js';
import Loader from '../../../../utils/Loader.jsx';
import PurchaseForm from './PurchaseForm.jsx';
import { DateTime } from 'luxon';
import useModal from '../../../../hooks/useModal.js';

export const PurchaseDashboard = () => {
	const { state } = useContext(ProductContext);
	const { dataPurchases, deletePurchaseAction } = usePurchaseActions();
	const [rowId, setRowId] = useState(null);

	// CARGA LOS DATOS DE PROVEEDORES
	useEffect(() => {
		dataPurchases();
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
				deletePurchaseAction(row.original._id);
			},
		},
	];

	return (
		<>
			<div className='px-5 shadowIndex rounded-t-md bg-slate-700 flex flex-wrap flex-row items-center justify-around sm:justify-between'>
				<h3 className=' text-white text-xl font-semibold'>
					Pedidos a Proveedores
				</h3>{' '}
				<Button
					onClick={openAddModal}
					className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white  font-bold py-2 px-4 rounded'>
					<i className='pe-2 fa-solid fa-plus hover:text-slate-600'></i>
					Agregar Pedido
				</Button>
			</div>
			{state.loading ? (
				<Loader />
			) : (
				<div className='table-responsive'>
					<Table
						columns={columns}
						data={state.purchases}
						actions={actions}
						initialSortColumn='name'
					/>
				</div>
			)}
			<Modals
				isOpen={isEditModalOpen}
				onClose={closeEditModal}
				title='Editar Pedido'>
				<PurchaseForm rowId={rowId} onClose={closeEditModal} mode='edit' />
			</Modals>
			<Modals
				isOpen={isAddModalOpen}
				onClose={closeAddModal}
				title='Agregar Nuevo Pedido'>
				<PurchaseForm onClose={closeAddModal} mode='create' />
			</Modals>
			<Modals
				isOpen={isViewModalOpen}
				onClose={closeViewModal}
				title='Ver Pedido'>
				<PurchaseForm onClose={closeViewModal} rowId={rowId} mode='view' />
			</Modals>
		</>
	);
};
