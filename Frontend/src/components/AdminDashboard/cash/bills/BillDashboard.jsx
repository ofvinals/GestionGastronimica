/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useState, useMemo } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Table } from '../../../../utils/Table.jsx';
import Modals from '../../../../utils/Modals.jsx';
import { BillContext } from '../../../../context/BillContext.jsx';
import { useBillActions } from '../../../../hooks/useBillActions.js';
import Loader from '../../../../utils/Loader.jsx';
import BillForm from './BillForm.jsx';
import { DateTime } from 'luxon';
import useModal from '../../../../hooks/useModal.js';
import { Button } from 'react-bootstrap';

export const BillDashboard = ({ data, startDate, endDate }) => {
	const { state } = useContext(BillContext);
	const { deleteBillAction } = useBillActions();
	const [rowId, setRowId] = useState(null);

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
				accessorKey: 'date',
				enableColumnOrdering: false,
				size: 10,
				Cell: ({ row }) => {
					const date = DateTime.fromISO(row.original.date, {
						zone: 'utc',
					})
						.setZone('America/Argentina/Buenos_Aires')
						.toLocaleString(DateTime.DATE_SHORT);
					return date;
				},
			},
			{
				header: 'Proveedor',
				accessorKey: 'supplier',
				enableColumnOrdering: false,
				size: 5,
			},
			{
				header: 'Monto',
				accessorKey: 'price',
				enableColumnOrdering: false,
				size: 10,
			},
			{
				header: 'Comprobante Tipo',
				accessorKey: 'receiptType',
				enableColumnOrdering: false,
				size: 10,
			},
			{
				header: 'Comprobante Nº',
				accessorKey: 'receiptNum',
				enableColumnOrdering: false,
				size: 10,
			},
			{
				header: 'Forma de Pago',
				accessorKey: 'formPay',
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

	const formattedStartDate = startDate
		? startDate.toLocaleDateString('es-AR', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
		  })
		: '';

	const formattedEndDate = endDate
		? endDate.toLocaleDateString('es-AR', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
		  })
		: '';

	const numberOfBills = data?.length;
	const totalPrice = data?.reduce(
		(acc, current) => acc + current.price,
		0
	);

	return (
		<>
			<section>
				<div className='flex flex-wrap flex-row items-center justify-around m-3'>
					<Button
						onClick={openAddModal}
						className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white  font-bold py-2 px-4 rounded'>
						<i className='pe-2 pi pi-plus hover:text-slate-600'></i>
						Nuevo Gasto
					</Button>
				</div>
				<div className=' border-2 border-slate-800 flex flex-wrap flex-row items-center justify-around m-3'>
					<div className='flex flex-wrap flex-col w-1/5 items-center justify-center text-center p-2 min-h-[160px]'>
						<p className='flex items-center my-2 min-h-[50px]'>
							Fecha/s Seleccionada/s
						</p>
						<p className='flex items-center font-semibold min-h-[75px]'>
							<span>{formattedStartDate}</span> -{' '}
							<span>{formattedEndDate}</span>
						</p>
					</div>
					<div className='flex flex-wrap flex-col w-1/5 items-center justify-center text-center min-h-[160px]'>
						<p className='flex items-center my-2 min-h-[50px] '>
							Cantidad de Comprobantes
						</p>
						<span className='flex items-center font-semibold min-h-[75px]'>
							{numberOfBills}
						</span>
					</div>

					<div className='flex flex-wrap flex-col w-1/5 items-center justify-center text-center min-h-[160px]'>
						<p className='flex items-center my-2 min-h-[50px]'>
							Total de Gastos
						</p>
						<span className='flex items-center font-semibold min-h-[75px]'>
							$ {totalPrice}
						</span>
					</div>
				</div>

				{state.loading ? (
					<Loader />
				) : (
					<div className='table-responsive'>
						<Table
							columns={columns}
							data={data}
							actions={actions}
							initialSortColumn='date'
						/>
					</div>
				)}
				<Modals
					isOpen={isEditModalOpen}
					onClose={closeEditModal}
					title='Editar Gasto'>
					<BillForm rowId={rowId} onClose={closeEditModal} mode='edit' />
				</Modals>
				<Modals
					isOpen={isViewModalOpen}
					onClose={closeViewModal}
					title='Ver Gasto'>
					<BillForm onClose={closeViewModal} rowId={rowId} mode='view' />
				</Modals>
				<Modals
					isOpen={isAddModalOpen}
					onClose={closeAddModal}
					title='Nuevo Gasto'>
					<BillForm onClose={closeAddModal} rowId={rowId} mode='create' />
				</Modals>
			</section>
		</>
	);
};
