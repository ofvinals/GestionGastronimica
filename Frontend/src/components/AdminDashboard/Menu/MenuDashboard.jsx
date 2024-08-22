/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState, useMemo } from 'react';
import { FaPause, FaPlay, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Table } from '../../../utils/Table';
import Modals from '../../../utils/Modals';
import MenuForm from '../Menu/MenuForm';
import { MenuContext } from '../../../context/MenuContext';
import { useMenuActions } from '../../../hooks/useMenuActions.js';
import { Button } from 'react-bootstrap';
import { CategorySelection } from '../Categorys/CategorySelection';
import Loader from '../../../utils/Loader';
import useModal from '../../../hooks/useModal.js';

export const MenuDashboard = () => {
	const { state } = useContext(MenuContext);
	const { dataMenus, disableMenuAction, enableMenuAction, deleteMenuAction } =
		useMenuActions();
	const [rowId, setRowId] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);

	// CARGA LOS DATOS DEL MENU EN EL STATE
	useEffect(() => {
		dataMenus();
	}, []);

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
				setRowId(row.original._id);
				openEditModal();
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

	return (
		<section>
			<div className='px-5 shadowIndex rounded-t-md bg-slate-700 flex flex-wrap flex-row items-center justify-around sm:justify-between drop-shadow-3xl'>
				<h3 className=' text-white text-xl font-semibold'>Carta Menu</h3>{' '}
				<Button
					onClick={openAddModal}
					className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white  font-bold py-2 px-4 rounded'>
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
			{state.loading ? (
				<Loader />
			) : (
				<div className='table-responsive'>
					<Table
						columns={columns}
						data={filteredMenus}
						actions={actions}
						initialSortColumn='category'
					/>
				</div>
			)}
			<Modals
				isOpen={isEditModalOpen}
				onClose={closeEditModal}
				title='Editar Menú'>
				<MenuForm rowId={rowId} onClose={closeEditModal} mode='edit' />
			</Modals>
			<Modals
				isOpen={isAddModalOpen}
				onClose={closeAddModal}
				title='Agregar Nuevo Menú'>
				<MenuForm onClose={closeAddModal} mode='create' />
			</Modals>
		</section>
	);
};
