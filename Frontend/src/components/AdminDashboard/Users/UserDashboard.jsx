/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState, useMemo } from 'react';
import { FaPause, FaPlay, FaUserEdit, FaTrashAlt } from 'react-icons/fa';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Table } from '../../Table.jsx';
import Modals from '../../Modals.jsx';
import UserForm from './UserForm.jsx';
import { UserContext } from '../../../context/UserContext.jsx';
import { useUserActions } from '../../../hooks/useUserActions.jsx';
import '../../../css/Custom.css';

export const UserDashboard = () => {
	const { state } = useContext(UserContext);
	const { dataUsers, disableUserAction, enableUserAction, deleteUserAction } =
		useUserActions();
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openAddModal, setOpenAddModal] = useState(false);
	const [rowId, setRowId] = useState(null);

	const handleOpenAddModal = (rowId) => {
		setOpenAddModal(true);
		setRowId(rowId);
	};

	const handleOpenEditModal = (rowId) => {
		setOpenEditModal(true);
		setRowId(rowId);
	};

	const handleCloseModal = () => {
		setOpenEditModal(false);
		setOpenAddModal(false);
		dataUsers();
	};

	useEffect(() => {
		dataUsers();
	}, []);

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
			<div className='px-5 bg-slate-600 shadowIndex flex flex-wrap flex-row items-center justify-between rounded-t-md'>
				<h3 className=' text-white text-xl font-semibold '>Usuarios</h3>
				<button
					onClick={handleOpenAddModal}
					className='mx-3 my-3 border-1 border-white p-1 bg-slate-700 hover:text-slate-700 text-slate-50 hover:bg-white rounded-md'>
					<i className='pe-2 fa-solid fa-plus'></i>
					Agregar Usuarios
				</button>
			</div>
			<div className='table-responsive'>
				<ThemeProvider theme={darkTheme}>
					<CssBaseline />
					<Table columns={columns} data={state.users} actions={actions} />
				</ThemeProvider>
			</div>
			<Modals
				isOpen={openEditModal}
				onClose={handleCloseModal}
				title='Editar Usuario'>
				<UserForm rowId={rowId} onClose={handleCloseModal} mode='edit' />
			</Modals>
			<Modals
				isOpen={openAddModal}
				onClose={handleCloseModal}
				title='Agregar Nuevo Usuario'>
				<UserForm onClose={handleCloseModal} mode='create' />
			</Modals>
		</>
	);
};
