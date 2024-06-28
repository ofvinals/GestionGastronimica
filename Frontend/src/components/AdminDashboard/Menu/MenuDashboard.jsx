/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState, useMemo } from 'react';
import { FaUserAltSlash, FaUserCheck, FaUserEdit } from 'react-icons/fa';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Table } from '../../Table.jsx';
import Modals from '../../Modals.jsx';
import MenuForm from '../CategoryMenu/MenuForm.jsx';
import { MenuContext } from '../../../context/MenuContext.jsx';
import { useMenuActions } from '../../../hooks/useMenuActions.jsx';
import { Button } from 'react-bootstrap';

export const MenuDashboard = () => {
	const { state } = useContext(MenuContext);
	const { dataMenus, disableMenuAction, enableMenuAction } = useMenuActions();
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openAddModal, setOpenAddModal] = useState(false);
	const [rowId, setRowId] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);

	const handleOpenAddModal = () => {
		setOpenAddModal(true);
		setRowId(null);
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
		dataMenus();
	}, []);
	
	const filteredMenus = useMemo(() => {
		if (selectedCategory) {
			return state.menus.filter(
				(menu) => menu.category === selectedCategory
			);
		}

		return state.menus;
	}, [state.menus, selectedCategory]);

	const columns = useMemo(
		() => [
			{
				header: 'Categoria',
				accessorKey: 'category',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Titulo',
				accessorKey: 'name',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Descripcion',
				accessorKey: 'description',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Precio',
				accessorKey: 'price',
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
				disableMenuAction(row.original.id);
			},
		},
		{
			text: 'Habilitar',
			icon: <FaUserCheck />,
			onClick: (row) => {
				enableMenuAction(row.original.id);
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
		<section>
			<div className='px-5 bg-slate-700 flex flex-wrap flex-row items-center justify-between'>
				<h3 className=' text-white text-xl font-semibold'>Carta Menu</h3>{' '}
				<Button
					onClick={handleOpenAddModal}
					className='mx-3 my-3 bg-slate-600 border-1 border-white rounded-md text-white p-2  hover:text-slate-600 hover:bg-white'>
					<i className='pe-2 fa-solid fa-circle-plus hover:text-slate-600'></i>
					Agregar Menu
				</Button>
			</div>
			<div className='table-responsive'>
				<ThemeProvider theme={darkTheme}>
					<CssBaseline />
					<Table
						columns={columns}
						data={filteredMenus}
						actions={actions}
					/>
				</ThemeProvider>
			</div>
			<Modals
				isOpen={openEditModal}
				onClose={handleCloseModal}
				title='Editar Menú'>
				<MenuForm rowId={rowId} onClose={handleCloseModal} mode='edit' />
			</Modals>
			<Modals
				isOpen={openAddModal}
				onClose={handleCloseModal}
				title='Agregar Nuevo Menú'>
				<MenuForm onClose={handleCloseModal} mode='create' />
			</Modals>
		</section>
	);
};
