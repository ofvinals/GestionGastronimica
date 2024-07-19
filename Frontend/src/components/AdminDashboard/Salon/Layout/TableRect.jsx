/* eslint-disable react/prop-types */
import { Rect, Text } from 'react-konva';

const CELL_SIZE = 42;

const TableRect = ({
	table,
	isSelected,
	onDragEnd,
	onClick,
	onContextMenu,
}) => {
	return (
		<>
			<Rect
				x={table.x}
				y={table.y}
				width={CELL_SIZE}
				height={CELL_SIZE}
				offsetX={-4} // Ajusta el centro
				offsetY={-4}
				draggable
				onDragEnd={onDragEnd}
				onClick={onClick}
				onContextMenu={onContextMenu}
				fill={isSelected ? 'green' : 'grey'}
				stroke={isSelected ? 'black' : 'grey'}
				shadowBlur={isSelected ? 10 : 0} // Sombra solo cuando está seleccionado
			/>
			<Text
				x={table.x + 4}
				y={table.y + 4}
				text={String(table.id)}
				fontSize={15}
				fill='white'
				width={CELL_SIZE}
				align='center'
				verticalAlign='middle'
			/>
		</>
	);
};

export default TableRect;
