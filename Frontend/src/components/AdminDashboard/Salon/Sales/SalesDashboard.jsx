/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useMemo } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Table } from '../../../Table';
import Modals from '../../../Modals';
import { OrderContext } from '../../../../context/OrderContext';
import { useOrderActions } from '../../../../hooks/useOrderActions.js';
import { Button } from 'react-bootstrap';
import Loader from '../../../../helpers/Loader';
import SalesForm from './SalesForm';

export const SalesDashboard = () => {
	const { state, loading } = useContext(OrderContext);
	const { deleteMenuAction } = useOrderActions();
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openAddModal, setOpenAddModal] = useState(false);
	const [openViewModal, setOpenViewModal] = useState(false);
	const [rowId, setRowId] = useState(null);

	const filteredPayOrder = state.orders.filter((order) => order.orderOpen === false);
	// ABRE MODAL P AGREGAR VENTA
	const handleOpenAddModal = () => {
		setOpenAddModal(true);
	};

	// ABRE MODAL P EDITAR VENTA
	const handleOpenEditModal = (rowId) => {
		setOpenEditModal(true);
		setRowId(rowId);
	};

	// ABRE MODAL P VER ORDEN Y ENVIA PROPS ROWID
	const handleOpenViewModal = (rowId) => {
		setOpenViewModal(true);
		setRowId(rowId);
	};

	// CIERRA TODOS LOS MODALES. RECARGA MENUS
	const handleCloseModal = () => {
		setOpenEditModal(false);
		setOpenAddModal(false);
		setOpenViewModal(false);
	};

	// Función para formatear elapsedDuration
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
				deleteMenuAction(row.original._id);
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
						<h3 className=' text-white text-xl font-semibold'>Ventas</h3>{' '}
						<Button
							onClick={handleOpenAddModal}
							className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:from-slate-to-slate-800 text-white hover:text-white font-bold py-2 px-4 rounded'>
							<i className='pe-2 fa-solid fa-plus hover:text-slate-600'></i>
							Agregar Venta
						</Button>
					</div>
					<div className='table-responsive'>
						<ThemeProvider theme={darkTheme}>
							<CssBaseline />
							<Table
								columns={columns}
								data={filteredPayOrder}
								actions={actions}
							/>
						</ThemeProvider>
					</div>
					<Modals
						isOpen={openEditModal}
						onClose={handleCloseModal}
						title='Editar Venta'>
						<SalesForm
							rowId={rowId}
							onClose={handleCloseModal}
							mode='edit'
						/>
					</Modals>
					<Modals
						isOpen={openAddModal}
						onClose={handleCloseModal}
						title='Agregar Nueva Venta'>
						<SalesForm onClose={handleCloseModal} mode='create' />
					</Modals>
					<Modals
						isOpen={openViewModal}
						onClose={handleCloseModal}
						title='Ver Venta'>
						<SalesForm
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
