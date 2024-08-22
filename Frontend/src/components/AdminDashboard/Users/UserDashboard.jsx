/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useMemo, useState } from 'react';
import { FaPause, FaPlay, FaUserEdit, FaTrashAlt } from 'react-icons/fa';
import { Table } from '../../../utils/Table';
import Modals from '../../../utils/Modals';
import UserForm from './UserForm';
import { UserContext } from '../../../context/UserContext';
import { useUserActions } from '../../../hooks/useUserActions.js';
import useModal from '../../../hooks/useModal';
import '../../../css/Custom.css';
import Loader from '../../../utils/Loader';

export const UserDashboard = () => {
	const { state } = useContext(UserContext);
	const { dataUsers, disableUserAction, enableUserAction, deleteUserAction } =
		useUserActions();
	const [rowId, setRowId] = useState(null);

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

	// CARGA DATOS DE USUARIOS
	useEffect(() => {
		dataUsers();
	}, []);

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
				setRowId(row.original._id);
				openEditModal();
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

	return (
		<>
			<div className='px-5 bg-slate-600 shadowIndex flex flex-wrap flex-row items-center justify-around sm:justify-between rounded-t-md'>
				<h3 className=' text-white text-xl font-semibold '>Usuarios</h3>
				<button
					onClick={openAddModal}
					className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white  font-bold py-2 px-4 rounded'>
					<i className='pe-2 fa-solid fa-plus'></i>
					Agregar Usuarios
				</button>
			</div>
			{state.loading ? (
				<Loader />
			) : (
				<div className='table-responsive'>
					<Table
						columns={columns}
						data={state.users}
						actions={actions}
						initialSortColumn='name'
					/>
				</div>
			)}
			<Modals
				isOpen={isEditModalOpen}
				onClose={closeEditModal}
				title='Editar Usuario'>
				<UserForm rowId={rowId} onClose={closeEditModal} mode='edit' />
			</Modals>
			<Modals
				isOpen={isAddModalOpen}
				onClose={closeAddModal}
				title='Agregar Nuevo Usuario'>
				<UserForm onClose={closeAddModal} mode='create' />
			</Modals>
		</>
	);
};
