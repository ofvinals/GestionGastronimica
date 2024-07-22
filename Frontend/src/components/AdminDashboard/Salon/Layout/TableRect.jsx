/* eslint-disable react/prop-types */
import { Rect, Text } from 'react-konva';

const CELL_SIZE = 41;

const TableRect = ({
	table,
	isSelected,
	onDragEnd,
	onClick,
	onContextMenu,
	draggable,
}) => {
	return (
		<>
			<Rect
				x={table.x}
				y={table.y}
				width={CELL_SIZE}
				height={CELL_SIZE}
				offsetX={-4}
				offsetY={-4}
				draggable={draggable}
				onDragEnd={draggable ? onDragEnd : null}
				onClick={onClick}
				onTap={onClick}
				onContextMenu={onContextMenu}
				fill={isSelected ? 'green' : 'grey'}
				stroke={isSelected ? 'black' : 'grey'}
				shadowBlur={isSelected ? 10 : 0}
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
