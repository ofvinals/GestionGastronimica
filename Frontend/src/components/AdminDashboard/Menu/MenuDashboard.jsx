/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState, useMemo } from 'react';
import { FaPause, FaPlay, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Table } from '../../Table.jsx';
import Modals from '../../Modals.jsx';
import MenuForm from '../Menu/MenuForm.jsx';
import { MenuContext } from '../../../context/MenuContext.jsx';
import { useMenuActions } from '../../../hooks/useMenuActions.jsx';
import { Button } from 'react-bootstrap';
import { CategorySelection } from '../Categorys/CategorySelection.jsx';
import Loader from '../../../helpers/Loader.jsx';

export const MenuDashboard = () => {
	const { state, loading } = useContext(MenuContext);
	const { dataMenus, disableMenuAction, enableMenuAction, deleteMenuAction } =
		useMenuActions();
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openAddModal, setOpenAddModal] = useState(false);
	const [rowId, setRowId] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);

	// CARGA LOS DATOS DEL MENU EN EL STATE
	useEffect(() => {
		dataMenus();
	}, []);

	// ABRE MODAL P AGREGAR MENU
	const handleOpenAddModal = () => {
		setOpenAddModal(true);
	};

	// ABRE MODAL P EDITAR MENU
	const handleOpenEditModal = (rowId) => {
		setOpenEditModal(true);
		setRowId(rowId);
	};

	// CIERRA TODOS LOS MODALES. RECARGA MENUS
	const handleCloseModal = () => {
		setOpenEditModal(false);
		setOpenAddModal(false);
		dataMenus();
	};
	// AGARRA LA SELECCION DE CATEGORIA DEL COMPONENTE CATEGORY SELECTION Y LA CARGA EN SETSELECTEDCATEGORY P USAR EL FILTRO
	const handleCategorySelect = (category) => {
		setSelectedCategory(category);
	};

	// FILTRA LOS MENUS DE ACUERDO A LA CATEGORIA SELECCIONADA
	const filteredMenus = useMemo(() => {
		if (selectedCategory) {
			return state.menus.filter(
				(menu) => menu.category === selectedCategory
			);
		}
		return state.menus;
	}, [state.menus, selectedCategory]);

	// CONFIGURA COLUMNAS PARA LA TABLE
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
					return row.original.status === true
						? 'Habilitado'
						: 'Suspendido';
				},
			},
		],
		[]
	);

	//  CONFIGURA ACTIONS PARA LA TABLE
	const actions = [
		{
			text: 'Inhabilitar',
			icon: <FaPause />,
			onClick: (row) => {
				disableMenuAction(row.original._id);
			},
		},
		{
			text: 'Habilitar',
			icon: <FaPlay />,
			onClick: (row) => {
				enableMenuAction(row.original._id);
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
						<h3 className=' text-white text-xl font-semibold'>
							Carta Menu
						</h3>{' '}
						<Button
							onClick={handleOpenAddModal}
							className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:from-slate-to-slate-800 text-white hover:text-white font-bold py-2 px-4 rounded'>
							<i className='pe-2 fa-solid fa-plus hover:text-slate-600'></i>
							Agregar Menu
						</Button>
					</div>
					<div>
						<CategorySelection
							categorys={state.categorys}
							onCategorySelect={handleCategorySelect}
						/>
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
						<MenuForm
							rowId={rowId}
							onClose={handleCloseModal}
							mode='edit'
						/>
					</Modals>
					<Modals
						isOpen={openAddModal}
						onClose={handleCloseModal}
						title='Agregar Nuevo Menú'>
						<MenuForm onClose={handleCloseModal} mode='create' />
					</Modals>
				</section>
			)}
		</>
	);
};
