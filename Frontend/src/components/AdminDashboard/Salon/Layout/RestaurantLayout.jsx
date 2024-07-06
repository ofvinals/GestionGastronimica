/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import { useLayoutActions } from '../../../../hooks/useLayoutActions.jsx';
import GridLines from './GridLines';
import TableRect from './TableRect';
import EditTableDetails from './EditTableDetails';
import LoungeForm from './LoungeForm';

const GRID_SIZE = 10;
const CELL_SIZE = 50;

const RestaurantLayout = ({
	salonName,
	salonId,
	showLoungeForm,
	onCloseForm,
}) => {
	const [selectedTable, setSelectedTable] = useState(null);
	const [currentLayout, setCurrentLayout] = useState([]);
	const [showEditTableDetails, setShowEditTableDetails] = useState(false);
	const firstLoad = useRef(true); 

	const { editLayoutAction, loadLayoutAction, addSalonAction } =
		useLayoutActions();

	useEffect(() => {
		const fetchLayout = async () => {
			const layout = await loadLayoutAction(salonId);
			setCurrentLayout(layout);
		};
		fetchLayout();
	}, [salonId]);

	useEffect(() => {
		if (firstLoad.current) {
			firstLoad.current = false; 
		} else {
			editLayoutAction(salonId, currentLayout);
		}
	}, [currentLayout]);

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
					salonId,
				};
				setCurrentLayout([...currentLayout, newTable]);
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
			setCurrentLayout((prevLayout) =>
				prevLayout.map((table) =>
					table.id === id ? { ...table, x: gridX, y: gridY } : table
				)
			);
		}
	};

	const handleRightClick = (e, id) => {
		e.evt.preventDefault();
		setCurrentLayout((prevLayout) =>
			prevLayout.filter((table) => table.id !== id)
		);
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
			setCurrentLayout((prevLayout) =>
				prevLayout.map((table) =>
					table.id === selectedTable.id ? selectedTable : table
				)
			);
		}
	};

	const handleAddSalon = (newLoungeName) => {
		const newSalon = { newLoungeName, layouts: [] };
		addSalonAction(newSalon);
	};

	const handleCloseForm = () => {
		setShowEditTableDetails(false);
	};

	return (
		<div className='flex flex-row w-full'>
			<div className='w-4/6 m-2 border-2 border-black'>
				<Stage
					width={GRID_SIZE * CELL_SIZE}
					height={GRID_SIZE * CELL_SIZE}
					onDblClick={(e) => {
						const { x, y } = e.target.getStage().getPointerPosition();
						addTable(x, y);
					}}
					onContextMenu={(e) => e.evt.preventDefault()}>
					<Layer>
						<GridLines />
						{currentLayout.map((table) => (
							<TableRect
								key={table.id}
								table={table}
								isSelected={
									selectedTable && selectedTable.id === table.id
								}
								onDragEnd={(e) => handleDragEnd(e, table.id)}
								onClick={() => handleTableClick(table)}
								onContextMenu={(e) => handleRightClick(e, table.id)}
							/>
						))}
					</Layer>
				</Stage>
			</div>
			<div className='w-2/6 pr-1'>
				{/* Mostrar EditTableDetails o LoungeForm según el estado */}
				{showEditTableDetails && (
					<EditTableDetails
						salonName={salonName}
						selectedTable={selectedTable}
						onTableNumberChange={handleTableNumberChange}
						onWaiterChange={handleWaiterChange}
						onTableBlur={handleTableBlur}
						onClose={handleCloseForm}
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
	);
};

export default RestaurantLayout;
