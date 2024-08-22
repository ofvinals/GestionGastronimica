/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useMemo, useEffect } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Table } from '../../../../utils/Table';
import Modals from '../../../../utils/Modals';
import { OrderContext } from '../../../../context/OrderContext';
import { useOrderActions } from '../../../../hooks/useOrderActions.js';
import Loader from '../../../../utils/Loader';
import SalesForm from './SalesForm';
import useModal from '../../../../hooks/useModal.js';

export const SalesDashboard = () => {
	const { state } = useContext(OrderContext);
	const { dataOrders, deleteOrderAction } = useOrderActions();

	const [rowId, setRowId] = useState(null);

	useEffect(() => {
		dataOrders();
	}, []);

	// FILTRA SOLO LAS ORDENES QUE ESTEN CERRADAS
	const filteredPayOrder = state.orders.filter(
		(order) => order.orderOpen === false
	);

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

	// FUNCION PARA CALCULAR EL TIEMPO DE OCUPACION DE LA MESA
	const formatElapsedDuration = (elapsedDuration) => {
		if (!elapsedDuration || !Array.isArray(elapsedDuration)) return '';
		return elapsedDuration
			.map(({ hours, minutes }) => {
				const h = hours || 0;
				const m = minutes || 0;
				return `${h}h ${m}m`;
			})
			.join(', ');
	};

	// CONFIGURA COLUMNAS PARA LA TABLE
	const columns = useMemo(
		() => [
			{
				header: 'Mesa',
				accessorKey: 'tableNum',
				enableColumnOrdering: false,
				size: 10,
			},
			{
				header: 'Server',
				accessorKey: 'server',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Personas',
				accessorKey: 'diners',
				enableColumnOrdering: false,
				size: 10,
			},
			{
				header: 'Precio',
				accessorKey: 'finalPrice',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Forma de Pago',
				accessorKey: 'orderCash',
				enableColumnOrdering: false,
				size: 10,
			},
			{
				header: 'Tiempo',
				accessorKey: 'elapsedDuration',
				enableColumnOrdering: false,
				size: 50,
				Cell: ({ cell }) => {
					return formatElapsedDuration(cell.getValue());
				},
			},
		],
		[]
	);

	//  CONFIGURA ACTIONS PARA LA TABLE
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
				<div className='px-5 shadowIndex rounded-t-md bg-slate-700 flex flex-wrap flex-row items-center justify-around sm:justify-between drop-shadow-3xl'>
					<h3 className=' text-white  text-xl my-3 font-semibold'>
						Ventas
					</h3>
				</div>
				{state.loading ? (
					<Loader />
				) : (
					<div className='table-responsive'>
						<Table
							columns={columns}
							data={filteredPayOrder}
							actions={actions}
							initialSortColumn='tableNum'
						/>
					</div>
				)}
				<Modals
					isOpen={isEditModalOpen}
					onClose={closeEditModal}
					title='Editar Venta'>
					<SalesForm rowId={rowId} onClose={closeEditModal} mode='edit' />
				</Modals>
				<Modals
					isOpen={isAddModalOpen}
					onClose={closeAddModal}
					title='Agregar Nueva Venta'>
					<SalesForm onClose={closeAddModal} mode='create' />
				</Modals>
				<Modals
					isOpen={isViewModalOpen}
					onClose={closeViewModal}
					title='Ver Venta'>
					<SalesForm onClose={closeViewModal} rowId={rowId} mode='view' />
				</Modals>
			</section>
		</>
	);
};
