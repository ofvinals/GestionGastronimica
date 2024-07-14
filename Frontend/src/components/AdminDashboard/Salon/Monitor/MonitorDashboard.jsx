/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState, useMemo } from 'react';
import { FaEye } from 'react-icons/fa';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Table } from '../../../Table.jsx';
import Modals from '../../../Modals.jsx';
import { OrderContext } from '../../../../context/OrderContext.jsx';
import { LoungeContext } from '../../../../context/LoungeContext';
import { useOrderActions } from '../../../../hooks/useOrderActions.jsx';
import Loader from '../../../../helpers/Loader.jsx';
import MonitorForm from './MonitorForm.jsx';
import { DateTime } from 'luxon';
import { useLayoutActions } from '../../../../hooks/useLayoutActions.jsx';

export const MonitorDashboard = () => {
	const { state, loading } = useContext(OrderContext);
	const { state: stateLayouts } = useContext(LoungeContext);
	const { dataOrders } = useOrderActions();
	const { loadAllLayoutAction } = useLayoutActions();
	const [openViewModal, setOpenViewModal] = useState(false);
	const [rowId, setRowId] = useState(null);

	// CARGA LOS DATOS DE LA ORDEN y LAYOUTS EN EL STATE
	useEffect(() => {
		dataOrders();
		loadAllLayoutAction();
	}, []);

	const filteredOrders = state.orders.filter(
		(order) => order.orderOpen === true
	);

	// ITERA SOBRE LAYOUTS PARA CALCULAR EL TOTAL DE MESAS HABILITADAS Y MESAS OCUPADAS
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
	const tableCounts = countAllLayouts(stateLayouts.lounges);

	// ABRE MODAL P VER ORDEN Y ENVIA PROPS ROWID
	const handleOpenViewModal = (rowId) => {
		setOpenViewModal(true);
		setRowId(rowId);
	};

	// CIERRA TODOS LOS MODALES. RECARGA MENUS
	const handleCloseModal = () => {
		setOpenViewModal(false);
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
				handleOpenViewModal(row.original._id);
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
					<div className='table-responsive'>
						<ThemeProvider theme={darkTheme}>
							<CssBaseline />
							<Table
								columns={columns}
								data={filteredOrders}
								actions={actions}
							/>
						</ThemeProvider>
					</div>
					<Modals
						isOpen={openViewModal}
						onClose={handleCloseModal}
						title='Ver Venta'>
						<MonitorForm
							onClose={handleCloseModal}
							rowId={rowId}
							mode='view'
						/>
					</Modals>
				</section>
			)}
		</>
	);
};
