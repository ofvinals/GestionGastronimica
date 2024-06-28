/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState, useMemo } from 'react';
import { FaUserAltSlash, FaUserCheck, FaUserEdit } from 'react-icons/fa';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Table } from '../../Table.jsx';
import Modals from '../../Modals.jsx';
import UserForm from './UserForm.jsx';
import { UserContext } from '../../../context/UserContext.jsx';
import { useUserActions } from '../../../hooks/useUserActions.jsx';

export const UserDashboard = () => {
	const { state } = useContext(UserContext);
	const { dataUsers, disableUserAction, enableUserAction } = useUserActions();
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
					return row.original.status ? 'Habilitado' : 'Suspendido';
				},
			},
		],
		[]
	);

	const actions = [
		{
			text: 'Inhabilitar',
			icon: <FaUserAltSlash />,
			onClick: (row) => {
				disableUserAction(row.original.id);
			},
		},
		{
			text: 'Habilitar',
			icon: <FaUserCheck />,
			onClick: (row) => {
				enableUserAction(row.original.id);
			},
		},
		{
			text: 'Editar',
			icon: <FaUserEdit />,
			onClick: (row) => {
				handleOpenEditModal(row.original.id);
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
			<div className='px-5 bg-slate-600 flex flex-wrap flex-row items-center justify-between'>
				<h3 className=' text-white text-xl font-semibold '>Usuarios</h3>
				<button
					onClick={handleOpenAddModal}
					className='mx-3 my-3 border-1 border-white p-1 text-white hover:bg-white rounded-md hover:text-slate-600 '>
					<i className='pe-2 fa-solid fa-user-plus'></i>
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
