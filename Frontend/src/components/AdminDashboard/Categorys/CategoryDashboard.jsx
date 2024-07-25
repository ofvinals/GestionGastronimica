/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useMemo, useState } from 'react';
import { FaPause, FaPlay, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Table } from '../../../utils/Table.jsx';
import Modals from '../../../utils/Modals.jsx';
import { useCategoryActions } from '../../../hooks/useCategoryActions.js';
import CategoryForm from './CategoryForm';
import { MenuContext } from '../../../context/MenuContext';
import Loader from '../../../utils/Loader';

export const CategoryProducts = () => {
	const { state } = useContext(MenuContext);
	const [openAddModal, setOpenAddModal] = useState(false);
	const [rowId, setRowId] = useState(null);
	const [openEditModal, setOpenEditModal] = useState(false);
	const { deleteCategoryAction, disableCategoryAction, enableCategoryAction } =
		useCategoryActions();

	// ABRE MODAL P AGREGAR USUARIO Y ENVIA PROPS ROWID
	const handleOpenAddModal = (rowId) => {
		setOpenAddModal(true);
		setRowId(rowId);
	};

	// ABRE MODAL P EDITARR USUARIO Y ENVIA PROPS ROWID
	const handleOpenEditModal = (rowId) => {
		setOpenEditModal(true);
		setRowId(rowId);
	};

	// CIERRA TODOS LOS MODALES Y ACTUALIZA CATEGORIAS
	const handleCloseModal = () => {
		setOpenEditModal(false);
		setOpenAddModal(false);
	};

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
				handleOpenEditModal(row.original._id);
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

	const darkTheme = createTheme({
		palette: {
			mode: 'light',
		},
	});

	if (state.loading) {
		return <Loader />;
	}
	return (
		<>
			<div className='px-5 shadowIndex rounded-t-md bg-slate-700 flex flex-wrap flex-row items-center justify-around sm:justify-between'>
				<h3 className=' text-white text-xl font-semibold text-center '>
					Categorias
				</h3>
				<button
					onClick={handleOpenAddModal}
					className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white  font-bold py-2 px-4 rounded'>
					<i className='pe-2 fa-solid fa-plus'></i>
					Agregar Categorias
				</button>
			</div>
			<div className='table-responsive'>
				<ThemeProvider theme={darkTheme}>
					<CssBaseline />
					<Table
						columns={columns}
						data={state.categorys}
						actions={actions}
						initialSortColumn='name'
					/>
				</ThemeProvider>
			</div>
			<Modals
				isOpen={openEditModal}
				onClose={handleCloseModal}
				title='Editar Categoria'>
				<CategoryForm
					rowId={rowId}
					onClose={handleCloseModal}
					mode='edit'
				/>
			</Modals>
			<Modals
				isOpen={openAddModal}
				onClose={handleCloseModal}
				title='Agregar Nueva Categoria'>
				<CategoryForm onClose={handleCloseModal} mode='create' />
			</Modals>
		</>
	);
};
