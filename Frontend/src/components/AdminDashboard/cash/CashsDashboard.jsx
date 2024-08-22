import { useContext, useState, useMemo } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Table } from '../../../utils/Table';
import Modals from '../../../utils/Modals';
import { OrderContext } from '../../../context/OrderContext';
import { useOrderActions } from '../../../hooks/useOrderActions.js';
import Loader from '../../../utils/Loader';
import CashForm from './CashForm';
import { DateTime } from 'luxon';
import useModal from '../../../hooks/useModal.js';

export const CashsDashboard = ({ data }) => {
	const { state } = useContext(OrderContext);
	const { deleteOrderAction } = useOrderActions();
	const [activeButton, setActiveButton] = useState('');
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

	return (
		<>
			<section>
				<div className='flex flex-wrap flex-row items-center justify-around m-3'>
					<button
						onClick={() => {
							setActiveButton('typeFilter');
						}}
						className={`flex my-2 items-center text-sm font-bold py-2 px-4 rounded ${
							activeButton === 'typeFilter'
								? 'border-slate-500 border-2 bg-slate-300  text-slate-600 font-bold'
								: 'border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white shadowIndex font-bold'
						}`}>
						Flitrar por Tipo
					</button>
					<button
						onClick={() => {
							setActiveButton('chargeFilter');
						}}
						className={`flex my-2 items-center text-sm font-bold py-2 px-4 rounded ${
							activeButton === 'chargeFilter'
								? 'border-slate-500 border-2 bg-slate-300  text-slate-600 font-bold'
								: 'border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white shadowIndex font-bold'
						}`}>
						Flitrar por Cargos Adicionales
					</button>
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
