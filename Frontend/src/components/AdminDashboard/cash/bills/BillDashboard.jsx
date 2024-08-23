/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useState, useMemo, useEffect } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Table } from '../../../../utils/Table.jsx';
import Modals from '../../../../utils/Modals.jsx';
import { BillContext } from '../../../../context/BillContext.jsx';
import { useBillActions } from '../../../../hooks/useBillActions.js';
import Loader from '../../../../utils/Loader.jsx';
import CashForm from './CashForm.jsx';
import { DateTime } from 'luxon';
import useModal from '../../../../hooks/useModal.js';
import { Button } from 'react-bootstrap';

export const BillDashboard = () => {
	const { state } = useContext(BillContext);
	const { dataBills, deleteBillAction } = useBillActions();
	const [rowId, setRowId] = useState(null);

	// CARGA LOS DATOS DE PROVEEDORES
	useEffect(() => {
		dataBills();
	}, []);

	// APERTURA Y CIERRE DE MODALES
	const {
		isOpen: isEditModalOpen,
		openModal: openEditModal,
		closeModal: closeEditModal,
	} = useModal();

	const {
		isOpen: isViewModalOpen,
		openModal: openViewModal,
		closeModal: closeViewModal,
	} = useModal();

	const {
		isOpen: isAddModalOpen,
		openModal: openAddModal,
		closeModal: closeAddModal,
	} = useModal();

	// CONFIGURA COLUMNAS PARA LA TABLA
	const columns = useMemo(
		() => [
			{
				header: 'Fecha',
				accessorKey: 'createdAt',
				enableColumnOrdering: false,
				size: 10,
				Cell: ({ row }) => {
					const createdAt = DateTime.fromISO(row.original.createdAt, {
						zone: 'utc',
					})
						.setZone('America/Argentina/Buenos_Aires')
						.toLocaleString(DateTime.DATETIME_SHORT);
					return createdAt;
				},
			},
			{
				header: 'Mesa',
				accessorKey: 'tableNum',
				enableColumnOrdering: false,
				size: 5,
			},
			{
				header: 'Server',
				accessorKey: 'server',
				enableColumnOrdering: false,
				size: 10,
			},
			{
				header: 'Monto Total',
				accessorKey: 'finalPrice',
				enableColumnOrdering: false,
				size: 10,
			},
			{
				header: 'Forma de Pago',
				accessorKey: 'orderCash',
				enableColumnOrdering: false,
				size: 10,
			},
			{
				header: 'Tipo de Factura',
				accessorKey: 'receipt',
				enableColumnOrdering: false,
				size: 10,
			},
		],
		[]
	);

	// CONFIGURA ACCIONES PARA LA TABLA
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
				deleteBillAction(row.original._id);
			},
		},
	];

	return (
		<>
			<section>
				<div className=' border-2 border-slate-800 flex flex-wrap flex-row items-center justify-around m-3'>
					<Button
						onClick={openAddModal}
						className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white  font-bold py-2 px-4 rounded'>
						<i className='pe-2 fa-solid fa-plus hover:text-slate-600'></i>
						Nuevo Gasto
					</Button>
				</div>
				{state.loading ? (
					<Loader />
				) : (
					<div className='table-responsive'>
						<Table
							columns={columns}
							data={state.bills}
							actions={actions}
							initialSortColumn='tableNum'
						/>
					</div>
				)}
				<Modals
					isOpen={isEditModalOpen}
					onClose={closeEditModal}
					title='Editar Caja'>
					<CashForm rowId={rowId} onClose={closeEditModal} mode='edit' />
				</Modals>
				<Modals
					isOpen={isViewModalOpen}
					onClose={closeViewModal}
					title='Ver Caja'>
					<CashForm onClose={closeViewModal} rowId={rowId} mode='view' />
				</Modals>
				<Modals
					isOpen={isAddModalOpen}
					onClose={closeAddModal}
					title='Ver Caja'>
					<CashForm onClose={closeAddModal} rowId={rowId} mode='view' />
				</Modals>
			</section>
		</>
	);
};
