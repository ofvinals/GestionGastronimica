/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useMemo, useState } from 'react';
import { FaSlash, FaCheck, FaEdit } from 'react-icons/fa';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Table } from '../../Table.jsx';
import Modals from '../../Modals.jsx';
import { useCategoryActions } from '../../../hooks/useCategoryActions.jsx';
import CategoryForm from './CategoryForm.jsx';

export const CategoryProducts = () => {
	const [openAddModal, setOpenAddModal] = useState(false);
	const [rowId, setRowId] = useState(null);
	const [openEditModal, setOpenEditModal] = useState(false);
	const { state, dataCategorys, disableCategoryAction, enableCategoryAction } =
		useCategoryActions();

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
		dataCategorys();
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
			icon: <FaSlash />,
			onClick: (row) => {
				disableCategoryAction(row.original.id);
			},
		},
		{
			text: 'Habilitar',
			icon: <FaCheck />,
			onClick: (row) => {
				enableCategoryAction(row.original.id);
			},
		},
		{
			text: 'Editar',
			icon: <FaEdit />,
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
			<div className='px-5 bg-slate-700 flex flex-wrap flex-row items-center justify-between'>
				<h3 className=' text-white text-xl font-semibold '>Categorias</h3>
				<button
					onClick={handleOpenAddModal}
					className='mx-3 my-3 bg-slate-600 border-1 border-white rounded-md text-white p-2  hover:text-slate-600 hover:bg-white'>
					<i className='pe-2 fa-solid fa-circle-plus'></i>
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
