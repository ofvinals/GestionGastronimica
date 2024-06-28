// src/RestaurantLayout.js
import React, { useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

const GRID_SIZE = 10;
const CELL_SIZE = 50;

const RestaurantLayout = () => {
	const [tables, setTables] = useState([]);
	const [selectedTable, setSelectedTable] = useState(null);
	const [tableNumberInput, setTableNumberInput] = useState('');

	const addTable = (x, y) => {
		const gridX = Math.floor(x / CELL_SIZE) * CELL_SIZE;
		const gridY = Math.floor(y / CELL_SIZE) * CELL_SIZE;

		// Check if the coordinates are within the grid bounds
		if (
			gridX >= 0 &&
			gridX < GRID_SIZE * CELL_SIZE &&
			gridY >= 0 &&
			gridY < GRID_SIZE * CELL_SIZE
		) {
			// Check if there is already a table at this position
			const existingTable = tables.find(
				(table) => table.x === gridX && table.y === gridY
			);
			if (!existingTable) {
				const newTable = { x: gridX, y: gridY, id: tables.length + 1 };
				setTables([...tables, newTable]);
				setSelectedTable(newTable);
			}
		}
	};

	const handleDragEnd = (e, id) => {
		const gridX = Math.floor(e.target.x() / CELL_SIZE) * CELL_SIZE;
		const gridY = Math.floor(e.target.y() / CELL_SIZE) * CELL_SIZE;

		// Check if the coordinates are within the grid bounds
		if (
			gridX >= 0 &&
			gridX < GRID_SIZE * CELL_SIZE &&
			gridY >= 0 &&
			gridY < GRID_SIZE * CELL_SIZE
		) {
			// Check if there is already a table at this position
			const existingTable = tables.find(
				(table) => table.x === gridX && table.y === gridY
			);
			if (!existingTable) {
				const newTables = tables.map((table) => {
					if (table.id === id) {
						return { ...table, x: gridX, y: gridY };
					}
					return table;
				});
				setTables(newTables);
				setSelectedTable(newTables.find((table) => table.id === id));
			}
		}
	};

	const handleRightClick = (e, id) => {
		e.evt.preventDefault();
		setTables(tables.filter((table) => table.id !== id));
		setSelectedTable(null); // Clear selected table info
	};

	const handleTableClick = (table) => {
		setSelectedTable(table);
		setTableNumberInput(String(table.id));
	};

	const handleTableNumberChange = (e) => {
		setTableNumberInput(e.target.value);
	};

	const handleTableNumberBlur = () => {
		const newTables = tables.map((table) => {
			if (table.id === selectedTable.id) {
				return { ...table, id: parseInt(tableNumberInput) };
			}
			return table;
		});
		setTables(newTables);
	};

	const gridLines = [];
	for (let i = 0; i <= GRID_SIZE; i++) {
		gridLines.push(
			<Rect
				key={`v${i}`}
				x={i * CELL_SIZE}
				y={0}
				width={1}
				height={GRID_SIZE * CELL_SIZE}
				fill='black'
			/>
		);
		gridLines.push(
			<Rect
				key={`h${i}`}
				x={0}
				y={i * CELL_SIZE}
				width={GRID_SIZE * CELL_SIZE}
				height={1}
				fill='black'
			/>
		);
	}

	return (
		<div className='flex flex-row'>
			<div className='layout-container'>
				<Stage
					width={GRID_SIZE * CELL_SIZE}
					height={GRID_SIZE * CELL_SIZE}
					onClick={(e) => {
						const { x, y } = e.target.getStage().getPointerPosition();
						addTable(x, y);
					}}
					onContextMenu={(e) => e.evt.preventDefault()}>
					<Layer>
						{gridLines}
						{tables.map((table) => (
							<React.Fragment key={table.id}>
								<Rect
									x={table.x}
									y={table.y}
									width={CELL_SIZE}
									height={CELL_SIZE}
									fill={
										selectedTable && selectedTable.id === table.id
											? 'red'
											: 'blue'
									}
									draggable
									onClick={() => handleTableClick(table)}
									onDragEnd={(e) => handleDragEnd(e, table.id)}
									onContextMenu={(e) => handleRightClick(e, table.id)}
								/>
								<Text
									x={table.x + CELL_SIZE / 2 - 10}
									y={table.y + CELL_SIZE / 2 - 10}
									text={String(table.id)}
									fontSize={20}
									fill='white'
								/>
							</React.Fragment>
						))}
					</Layer>
				</Stage>
			</div>
			<div className='w-full info-panel'>
				{selectedTable && (
					<div className='flex flex-col items-center justify-center'>
						<h3 className='text-center w-full h-[40px] font-semibold bg-slate-700 text-white items-center'>Editar Mesa {selectedTable.id}</h3>
						<p>Salón: Salón principal</p>{' '}
						{/* Puedes modificar esto según tus salones */}
						<label>Número de Mesa:</label>
						<input
							type='text'
							value={tableNumberInput}
							onChange={handleTableNumberChange}
							onBlur={handleTableNumberBlur}
						/>
						<label>Mozo asignado:</label>
						<input
							type='text'
							onChange={handleTableNumberChange}
							onBlur={handleTableNumberBlur}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default RestaurantLayout;
