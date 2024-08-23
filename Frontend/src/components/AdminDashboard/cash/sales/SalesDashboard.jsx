/* eslint-disable react/prop-types */
import { useContext, useState, useMemo } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Table } from '../../../../utils/Table.jsx';
import Modals from '../../../../utils/Modals.jsx';
import { OrderContext } from '../../../../context/OrderContext.jsx';
import { useOrderActions } from '../../../../hooks/useOrderActions.js';
import Loader from '../../../../utils/Loader.jsx';
import CashForm from './CashForm.jsx';
import { DateTime } from 'luxon';
import useModal from '../../../../hooks/useModal.js';

export const SalesDashboard = ({ data, startDate, endDate }) => {
	const { state } = useContext(OrderContext);
	const { deleteOrderAction } = useOrderActions();
	const [rowId, setRowId] = useState(null);

	console.log(data);

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
				deleteOrderAction(row.original._id);
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
	const numberOfSales = data.length;
	const totalDiners = data?.reduce((acc, current) => acc + current.diners, 0);
	const totalFinalPrice = data?.reduce(
		(acc, current) => acc + current.finalPrice,
		0
	);
	const averageSalePerPerson = Math.floor(totalFinalPrice / totalDiners);
	const averageSale = Math.floor(totalFinalPrice / numberOfSales);

	return (
		<>
			<section>
				<div className=' border-2 border-slate-800 flex flex-wrap flex-row items-center justify-around m-3'>
					<div className='flex flex-wrap flex-col w-1/5 items-center justify-center text-center p-2 min-h-[160px]'>
						<p className='font-semibold my-2 min-h-[50px]'>
							Fecha/s Seleccionada/s
						</p>
						<p>
							Del <span>{formattedStartDate}</span> al{' '}
							<span className='min-h-[75px]'>{formattedEndDate}</span>
						</p>
					</div>
					<div className='flex flex-wrap flex-col w-1/5 items-center justify-center text-center min-h-[160px]'>
						<p className='font-semibold my-2 min-h-[50px] '>Personas</p>
						<span className='min-h-[75px]'>{totalDiners}</span>
					</div>
					<div className='flex flex-wrap flex-col w-1/5 items-center justify-center text-center min-h-[160px]'>
						<p className='font-semibold my-2 min-h-[50px]'>
							Promedio por persona
						</p>
						<span className='min-h-[75px]'>$ {averageSalePerPerson}</span>
					</div>
					<div className='flex flex-wrap flex-col w-1/5 items-center justify-center text-center min-h-[160px]'>
						<p className='font-semibold my-2 min-h-[50px]'>
							Promedio por venta
						</p>
						<span className='min-h-[75px]'>$ {averageSale}</span>
					</div>
					<div className='flex flex-wrap flex-col w-1/5 items-center justify-center text-center min-h-[160px]'>
						<p className='font-semibold my-2 min-h-[50px]'>Total</p>
						<span className='min-h-[75px]'>$ {totalFinalPrice}</span>
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
			</section>
		</>
	);
};
