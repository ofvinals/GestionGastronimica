/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState, useMemo } from 'react';
import { FaPause, FaPlay, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Table } from '../../../utils/Table';
import Modals from '../../../utils/Modals';
import ProductForm from './ProductForm';
import { ProductContext } from '../../../context/ProductContext';
import { useProductActions } from '../../../hooks/useProductActions.js';
import '../../../css/Custom.css';
import Loader from '../../../utils/Loader';
import useModal from '../../../hooks/useModal.js';

export const ProductDashboard = () => {
	const { state } = useContext(ProductContext);
	const {
		dataProducts,
		disableProductAction,
		enableProductAction,
		deleteProductAction,
	} = useProductActions();
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

	// CARGA DATOS DE PRODUCTOS
	useEffect(() => {
		dataProducts();
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
				header: 'Cantidad',
				accessorKey: 'cant',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Unidad',
				accessorKey: 'unit',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Costo',
				accessorKey: 'cost',
				enableColumnOrdering: false,
				size: 50,
			},
			{
				header: 'Proveedor',
				accessorKey: 'supplier',
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
				disableProductAction(row.original._id);
			},
		},
		{
			text: 'Habilitar',
			icon: <FaPlay />,
			onClick: (row) => {
				enableProductAction(row.original._id);
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
				deleteProductAction(row.original._id);
			},
		},
	];

	return (
		<>
			<div className='px-5 bg-slate-700 shadowIndex flex flex-wrap flex-row items-center justify-around sm:justify-between rounded-t-md'>
				<h3 className=' text-white text-xl font-semibold'>Productos</h3>{' '}
				<button
					onClick={openAddModal}
					className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white  font-bold py-2 px-4 rounded'>
					<i className='pe-2 fa-solid fa-plus hover:text-slate-600'></i>
					Agregar Productos
				</button>
			</div>
			{state.loading ? (
				<Loader />
			) : (
				<div className='table-responsive'>
					<Table
						columns={columns}
						data={state.products}
						actions={actions}
						initialSortColumn='name'
					/>
				</div>
			)}
			<Modals
				isOpen={isEditModalOpen}
				onClose={closeEditModal}
				title='Editar Producto'>
				<ProductForm rowId={rowId} onClose={closeEditModal} mode='edit' />
			</Modals>
			<Modals
				isOpen={isAddModalOpen}
				onClose={closeAddModal}
				title='Agregar Nuevo Producto'>
				<ProductForm onClose={closeAddModal} mode='create' />
			</Modals>
		</>
	);
};
