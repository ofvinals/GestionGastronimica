/* eslint-disable react/prop-types */
import { Rect, Text } from 'react-konva';

const CELL_SIZE = 50;

const TableRect = ({ table, isSelected, onDragEnd, onClick, onContextMenu }) => {
  return (
    <>
      <Rect
        x={table.x}
        y={table.y}
        width={CELL_SIZE}
        height={CELL_SIZE}
        fill={isSelected ? 'green' : 'grey'}
        draggable
        onDragEnd={onDragEnd}
        onClick={onClick}
        onContextMenu={onContextMenu}
      />
      <Text
        x={table.x}
        y={table.y}
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
