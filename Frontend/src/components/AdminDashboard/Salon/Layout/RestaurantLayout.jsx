/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import { useLayoutActions } from '../../../../hooks/useLayoutActions.js';
import GridLines from './GridLines';
import TableRect from './TableRect';
import EditTableDetails from './EditTableDetails';
import LoungeForm from './LoungeForm';
import { useLoungeActions } from '../../../../hooks/useLoungeActions.js';
const GRID_SIZE = 10;
const CELL_SIZE = 50;

const RestaurantLayout = ({ salonId, showLoungeForm, onCloseForm }) => {
	const [selectedTable, setSelectedTable] = useState(null);
	const [currentLayout, setCurrentLayout] = useState([]);
	const [showEditTableDetails, setShowEditTableDetails] = useState(false);
	const { addSalonAction, dataSalons } = useLoungeActions();
	const [isRound, setIsRound] = useState(true); // Estado para la forma de la mesa

	// const firstLoad = useRef(true);
	const { loadLayoutAction, addTableAction } = useLayoutActions();

	const getLayout = async () => {
		try {
			const layout = await loadLayoutAction(salonId);
			setCurrentLayout(layout?.layouts || []);
		} catch (error) {
			console.error('Error fetching layout:', error);
		}
	};

	useEffect(() => {
		getLayout();
	}, [salonId]);

	// useEffect(() => {
	// 	if (!firstLoad.current) {
	// 		addTableAction(salonId, currentLayout);
	// 	} else {
	// 		firstLoad.current = false;
	// 	}
	// }, [currentLayout]);

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
			const values = currentLayout.map((table) =>
				table.id === id ? { ...table, x: gridX, y: gridY } : table
			);
			console.log(values);
			setCurrentLayout(values);
			addTableAction(salonId, values);
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
			addTableAction(salonId, currentLayout);
		}
	};

	const handleAddSalon = (newLoungeName) => {
		console.log(newLoungeName);
		addSalonAction(newLoungeName).then(() => {
			dataSalons();
		});
	};

	const handleCloseForm = () => {
		setShowEditTableDetails(false);
		onCloseForm();
	};

	const toggleShape = () => {
		setIsRound((prev) => !prev); // Alterna entre redondo y cuadrado
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
									onContextMenu={(e) => handleRightClick(e, table.id)}
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
						isRound={isRound} // Pasar el estado actual de la forma
						toggleShape={toggleShape} // P
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
