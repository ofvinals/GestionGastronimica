import { Rect } from 'react-konva';

const GRID_SIZE = 10;
const CELL_SIZE = 50;

const GridLines = () => {
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
	return <>{gridLines}</>;
};

export default GridLines;
