/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState, useMemo } from 'react';
import { FaEye } from 'react-icons/fa';
import { Table } from '../../../../utils/Table';
import Modals from '../../../../utils/Modals';
import { OrderContext } from '../../../../context/OrderContext';
import { LoungeContext } from '../../../../context/LoungeContext';
import { useOrderActions } from '../../../../hooks/useOrderActions.js';
import Loader from '../../../../utils/Loader';
import MonitorForm from './MonitorForm';
import { DateTime } from 'luxon';
import { useLayoutActions } from '../../../../hooks/useLayoutActions.js';
import useModal from '../../../../hooks/useModal.js';

export const MonitorDashboard = () => {
	const { state } = useContext(OrderContext);
	const { state: stateLayouts } = useContext(LoungeContext);
	const { dataOrders } = useOrderActions();
	const { loadAllLayoutAction } = useLayoutActions();
	const [rowId, setRowId] = useState(null);

	// CARGA LOS DATOS DE LA ORDEN y LAYOUTS EN EL STATE
	useEffect(() => {
		dataOrders();
		loadAllLayoutAction();
	}, []);

	// FILTRA SOLO LAS ORDENES QUE ESTEN ABIERTAS
	const filteredOrders = state.orders.filter(
		(order) => order.orderOpen === true
	);

	// ITERA SOBRE LAYOUTS PARA CALCULAR LA CANTIDAD DE MESAS OCUPADAS
	const countAllLayouts = (lounges) => {
		let openTables = 0;
		let totalTables = 0;
		lounges.forEach((lounge) => {
			totalTables += lounge.layouts.length;
			openTables += lounge.layouts.filter(
				(layout) => layout.isOpen === true
			).length;
		});
		return {
			openTables,
			totalTables,
		};
	};
	// CALCULA EL TOTAL DE MESAS
	const tableCounts = countAllLayouts(stateLayouts.lounges);

	// ABRE MODAL P VER ORDEN Y ENVIA PROPS ROWID
	const {
		isOpen: isViewModalOpen,
		openModal: openViewModal,
		closeModal: closeViewModal,
	} = useModal();

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
	];

	return (
		<section>
			<div className='px-5 shadowIndex rounded-t-md bg-slate-700 flex flex-wrap flex-row items-center justify-around sm:justify-between drop-shadow-3xl'>
				<h3 className=' text-white text-xl mt-3 font-semibold h-[50px]'>
					Estado de mesas
				</h3>{' '}
				<div className='text-white'>
					Mesas ocupadas: {tableCounts.openTables} / Total Mesas:{' '}
					{tableCounts.totalTables}
				</div>
			</div>
			{state.loading ? (
				<Loader />
			) : (
				<div className='table-responsive'>
					<Table
						columns={columns}
						data={filteredOrders}
						actions={actions}
					/>
				</div>
			)}
			<Modals
				isOpen={isViewModalOpen}
				onClose={closeViewModal}
				title='Ver Venta'>
				<MonitorForm onClose={closeViewModal} rowId={rowId} mode='view' />
			</Modals>
		</section>
	);
};
