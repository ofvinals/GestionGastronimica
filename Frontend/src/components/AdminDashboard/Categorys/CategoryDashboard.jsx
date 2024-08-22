/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useMemo, useState } from 'react';
import { FaPause, FaPlay, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Table } from '../../../utils/Table.jsx';
import Modals from '../../../utils/Modals.jsx';
import { useCategoryActions } from '../../../hooks/useCategoryActions.js';
import CategoryForm from './CategoryForm';
import { MenuContext } from '../../../context/MenuContext';
import Loader from '../../../utils/Loader';
import useModal from '../../../hooks/useModal.js';

export const CategoryProducts = () => {
	const { state } = useContext(MenuContext);
	const [rowId, setRowId] = useState(null);
	const { deleteCategoryAction, disableCategoryAction, enableCategoryAction } =
		useCategoryActions();

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

	// ENVIA DATOS Y CONFIG DE COLUMNAS A TABLES
	const columns = useMemo(
		() => [
			{
				header: 'Nombre',
				accessorKey: 'name',
				enableColumnOrdering: true,
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

	// CONFIG LAS ACTIONS PARA LA TABLE
	const actions = [
		{
			text: 'Inhabilitar',
			icon: <FaPause />,
			onClick: (row) => {
				disableCategoryAction(row.original._id);
			},
		},
		{
			text: 'Habilitar',
			icon: <FaPlay />,
			onClick: (row) => {
				enableCategoryAction(row.original._id);
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
				deleteCategoryAction(row.original._id);
			},
		},
	];

	return (
		<>
			<div className='px-5 shadowIndex rounded-t-md bg-slate-700 flex flex-wrap flex-row items-center justify-around sm:justify-between'>
				<h3 className=' text-white text-xl font-semibold text-center '>
					Categorias
				</h3>
				<button
					onClick={openAddModal}
					className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white  font-bold py-2 px-4 rounded'>
					<i className='pe-2 fa-solid fa-plus'></i>
					Agregar Categorias
				</button>
			</div>
			{state.loading ? (
				<Loader />
			) : (
				<div className='table-responsive'>
					<Table
						columns={columns}
						data={state.categorys}
						actions={actions}
						initialSortColumn='name'
					/>
				</div>
			)}
			<Modals
				isOpen={isEditModalOpen}
				onClose={closeEditModal}
				title='Editar Categoria'>
				<CategoryForm
					rowId={rowId}
					onClose={closeEditModal}
					mode='edit'
				/>
			</Modals>
			<Modals
				isOpen={isAddModalOpen}
				onClose={closeAddModal}
				title='Agregar Nueva Categoria'>
				<CategoryForm onClose={closeAddModal} mode='create' />
			</Modals>
		</>
	);
};
