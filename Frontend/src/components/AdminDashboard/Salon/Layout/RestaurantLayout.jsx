/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import { useLayoutActions } from '../../../../hooks/useLayoutActions.js';
import GridLines from './GridLines';
import TableRect from './TableRect';
import EditTableDetails from './EditTableDetails';
import LoungeForm from './LoungeForm';
import { useLoungeActions } from '../../../../hooks/useLoungeActions.js';
import Loader from '../../../../helpers/Loader';
import { LoungeContext } from '../../../../context/LoungeContext';
const GRID_SIZE = 9;
const CELL_SIZE = 50.5;

const RestaurantLayout = ({ salonId, showLoungeForm, onCloseForm }) => {
	const { state } = useContext(LoungeContext);
	const { addSalonAction, dataSalons } = useLoungeActions();
	const { loadLayoutAction, addTableAction } = useLayoutActions();
	const [showEditTableDetails, setShowEditTableDetails] = useState(false);
	const [currentLayout, setCurrentLayout] = useState([]);
	const [selectedTable, setSelectedTable] = useState(null);

	const [isRound, setIsRound] = useState(true);

	const getLayout = async () => {
		try {
			const layout = await loadLayoutAction(salonId);
			setCurrentLayout(layout?.layouts || []);
		} catch (error) {
			console.error('Error al buscar el layout:', error);
		}
	};

	useEffect(() => {
		getLayout();
	}, [salonId]);

	const addTable = (x, y) => {
		const gridX = Math.floor(x / CELL_SIZE) * CELL_SIZE;
		const gridY = Math.floor(y / CELL_SIZE) * CELL_SIZE;
		if (
			gridX >= 0 &&
			gridX < GRID_SIZE * CELL_SIZE &&
			gridY >= 0 &&
			gridY < GRID_SIZE * CELL_SIZE
		) {
			const existingTable = currentLayout.find(
				(table) => table.x === gridX && table.y === gridY
			);
			if (!existingTable) {
				const newId = currentLayout.length + 1;
				const newTable = {
					x: gridX,
					y: gridY,
					id: newId,
					waiter: '',
					isOpen: false,
					closeTime: null,
					openAt: null,
					salonId,
				};
				const newLayout = [...currentLayout, newTable];
				setCurrentLayout(newLayout);
				addTableAction(salonId, newLayout);
			}
		}
	};

	const handleDragEnd = (e, id) => {
		const gridX = Math.floor(e.target.x() / CELL_SIZE) * CELL_SIZE;
		const gridY = Math.floor(e.target.y() / CELL_SIZE) * CELL_SIZE;
		if (
			gridX >= 0 &&
			gridX < GRID_SIZE * CELL_SIZE &&
			gridY >= 0 &&
			gridY < GRID_SIZE * CELL_SIZE
		) {
			const updatedLayout = currentLayout.map((table) =>
				table.id === id ? { ...table, x: gridX, y: gridY } : table
			);
			setCurrentLayout(updatedLayout);
			addTableAction(salonId, updatedLayout);
		}
	};

	const handleRightClick = (e, id) => {
		e.evt.preventDefault();
		const updatedLayout = currentLayout.filter((table) => table.id !== id);
		setCurrentLayout(updatedLayout);
		addTableAction(salonId, updatedLayout);
	};

	const handleTableClick = (table) => {
		setSelectedTable(table);
		setShowEditTableDetails(true);
		onCloseForm();
	};

	const handleTableNumberChange = (e) => {
		const newTableNumber = parseInt(e.target.value);
		if (!isNaN(newTableNumber)) {
			setSelectedTable((prevTable) => ({
				...prevTable,
				id: newTableNumber,
			}));
		}
	};

	const handleWaiterChange = (e) => {
		const newWaiter = e.target.value;
		setSelectedTable((prevTable) => ({
			...prevTable,
			waiter: newWaiter,
		}));
	};

	const handleTableBlur = () => {
		if (selectedTable) {
			const updatedLayout = currentLayout.map((table) =>
				table.id === selectedTable.id ? selectedTable : table
			);
			setCurrentLayout(updatedLayout);
			addTableAction(salonId, updatedLayout);
		}
	};

	const handleAddSalon = (newLoungeName) => {
		addSalonAction(newLoungeName).then(() => {
			dataSalons();
		});
	};

	const handleCloseForm = () => {
		setShowEditTableDetails(false);
		onCloseForm();
	};

	const toggleShape = () => {
		setIsRound((prev) => !prev);
	};

	const stageWidth = window.innerWidth * 0.6;
	const stageHeight = window.innerHeight * 0.6;

	if (state.loading) {
		return <Loader />;
	}

	return (
		<>
			<div className='flex flex-row w-full '>
				<div className='w-4/6 border-2 border-black flex flex-row justify-center'>
					<Stage
						width={stageWidth}
						height={stageHeight}
						className='p-2 overflow-x-auto'
						onDblClick={(e) => {
							const { x, y } = e.target.getStage().getPointerPosition();
							addTable(x, y);
						}}
						onContextMenu={(e) => e.evt.preventDefault()}>
						<Layer>
							<GridLines
								stageWidth={stageWidth}
								stageHeight={stageHeight}
							/>
							{currentLayout &&
								currentLayout.map((table) => (
									<TableRect
										key={table.id}
										table={table}
										isSelected={
											selectedTable && selectedTable.id === table.id
										}
										onDragEnd={(e) => handleDragEnd(e, table.id)}
										onClick={() => handleTableClick(table)}
										onTap={() => handleTableClick(table)}
										onContextMenu={(e) =>
											handleRightClick(e, table.id)
										}
										draggable={true}
									/>
								))}
						</Layer>
					</Stage>
				</div>
				<div className='w-2/6 pr-1'>
					{showEditTableDetails && (
						<EditTableDetails
							salonName={currentLayout.name}
							selectedTable={selectedTable}
							onTableNumberChange={handleTableNumberChange}
							onWaiterChange={handleWaiterChange}
							onTableBlur={handleTableBlur}
							onClose={handleCloseForm}
							isRound={isRound}
							toggleShape={toggleShape}
						/>
					)}
					{showLoungeForm && (
						<LoungeForm
							onAddSalon={handleAddSalon}
							onClose={handleCloseForm}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default RestaurantLayout;
