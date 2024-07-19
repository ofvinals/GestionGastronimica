/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState, useMemo } from 'react';
import { FaPause, FaPlay, FaUserEdit, FaTrashAlt } from 'react-icons/fa';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Table } from '../../Table';
import Modals from '../../Modals';
import UserForm from './UserForm';
import { UserContext } from '../../../context/UserContext';
import { useUserActions } from '../../../hooks/useUserActions.js';
import '../../../css/Custom.css';
import Loader from '../../../helpers/Loader';

export const UserDashboard = () => {
	const { state, loading } = useContext(UserContext);
	const { dataUsers, disableUserAction, enableUserAction, deleteUserAction } =
		useUserActions();
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openAddModal, setOpenAddModal] = useState(false);
	const [rowId, setRowId] = useState(null);

		// CARGA DATOS DE USUARIOS
		useEffect(() => {
			dataUsers();
		}, []);

	// ABRE MODAL P AGERGAR Y ENVIA PROP ROWID
	const handleOpenAddModal = (rowId) => {
		setOpenAddModal(true);
		setRowId(rowId);
	};

	// ABRE MODAL P EDITAR Y ENVIA PROP ROWID
	const handleOpenEditModal = (rowId) => {
		setOpenEditModal(true);
		setRowId(rowId);
	};

	// CIERRA TODOS LOS MODALES
	const handleCloseModal = () => {
		setOpenEditModal(false);
		setOpenAddModal(false);
	};

	// CONFIGURA COLUMNS PARA LA TABLE
	const columns = useMemo(
		() => [
			{
				header: 'Nombre',
				accessorKey: 'name',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Apellido',
				accessorKey: 'subname',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Telefono',
				accessorKey: 'tel',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Rol',
				accessorKey: 'rol',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Estado',
				accessorKey: 'status',
				enableColumnOrdering: false,
				size: 50,
				Cell: ({ row }) => {
					return row.original.status === true
						? 'Habilitado'
						: 'Suspendido';
				},
			},
		],
		[]
	);

	// CONFIGURA ACTIONS PARA LA TABLE
	const actions = [
		{
			text: 'Inhabilitar',
			icon: <FaPause />,
			onClick: (row) => {
				disableUserAction(row.original._id);
			},
		},
		{
			text: 'Habilitar',
			icon: <FaPlay />,
			onClick: (row) => {
				enableUserAction(row.original._id);
			},
		},
		{
			text: 'Editar',
			icon: <FaUserEdit />,
			onClick: (row) => {
				handleOpenEditModal(row.original._id);
			},
		},
		{
			text: 'Eliminar',
			icon: <FaTrashAlt />,
			onClick: (row) => {
				deleteUserAction(row.original._id);
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
				<>
					<div className='px-5 bg-slate-600 shadowIndex flex flex-wrap flex-row items-center justify-around sm:justify-between rounded-t-md'>
						<h3 className=' text-white text-xl font-semibold '>
							Usuarios
						</h3>
						<button
							onClick={handleOpenAddModal}
							className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:from-slate-to-slate-800 text-white hover:text-white font-bold py-2 px-4 rounded'>
							<i className='pe-2 fa-solid fa-plus'></i>
							Agregar Usuarios
						</button>
					</div>
					<div className='table-responsive'>
						<ThemeProvider theme={darkTheme}>
							<CssBaseline />
							<Table
								columns={columns}
								data={state.users}
								actions={actions}
							/>
						</ThemeProvider>
					</div>
					<Modals
						isOpen={openEditModal}
						onClose={handleCloseModal}
						title='Editar Usuario'>
						<UserForm
							rowId={rowId}
							onClose={handleCloseModal}
							mode='edit'
						/>
					</Modals>
					<Modals
						isOpen={openAddModal}
						onClose={handleCloseModal}
						title='Agregar Nuevo Usuario'>
						<UserForm onClose={handleCloseModal} mode='create' />
					</Modals>
				</>
			)}
		</>
	);
};
