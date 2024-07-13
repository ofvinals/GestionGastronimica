/* eslint-disable react/prop-types */
import {
	MaterialReactTable,
	useMaterialReactTable,
} from 'material-react-table';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MRT_Localization_ES } from 'material-react-table/locales/es';

// RECIBE COLUMNS, DATA Y ACTIONS DE CADA COMPONENTE
export const Table = ({ columns, data, actions }) => {
	const table = useMaterialReactTable({
		columns,
		data: data || [],
		enableColumnFilterModes: true,
		enableColumnOrdering: true,
		enableGlobalFilterModes: true,
		enableColumnPinning: true,
		enableRowActions: true,
		enableGrouping: true,
		paginationDisplayMode: 'pages',
		positionToolbarAlertBanner: 'bottom',
		localization: MRT_Localization_ES,
		muiSearchTextFieldProps: {
			size: 'medium',
			variant: 'outlined',
		},
		muiPaginationProps: {
			color: 'primary',
			rowsPerPageOptions: [5, 10, 20, 30],
			shape: 'rounded',
			variant: 'outlined',
		},
		// RENDERIZA LOS BOTONES DE ACCIONES
		renderRowActions: ({ row }) => (
			<Box sx={{ display: 'flex', gap: '5px' }}>
				{actions.map((action, index) => {
					if (row.original.rol === 'superAdmin') {
						return null;
					}
					if (row.original.status === true) {
						if (action.text === 'Inhabilitar') {
							return (
								<button
									key={index}
									className='flex  items-center justify-center'
									onClick={() => action.onClick(row)}
									data-tip='Inhabilitar'>
									<span className='bg-yellow-600 text-center text-white rounded-xl border-2 p-2 hover:opacity-50'>
										{action.icon}
									</span>
								</button>
							);
						}
					} else {
						if (action.text === 'Habilitar') {
							return (
								<button
									key={index}
									className='flex items-center justify-center'
									onClick={() => action.onClick(row)}>
									<span className='bg-green-700 text-center text-white rounded-xl border-2 p-2 hover:opacity-50'>
										{action.icon}
									</span>
								</button>
							);
						}
					}
					if (action.text === 'Editar') {
						return (
							<button
								key={index}
								className='flex items-center justify-center'
								onClick={() => action.onClick(row)}>
								<span className='bg-blue-700  text-center text-white rounded-xl border-2 p-2 hover:opacity-50'>
									{action.icon}
								</span>
							</button>
						);
					}
					if (action.text === 'Eliminar') {
						return (
							<button
								key={index}
								className='flex items-center justify-center'
								onClick={() => action.onClick(row)}>
								<span className='bg-red-700  text-center text-white rounded-xl border-2 p-2 hover:opacity-50'>
									{action.icon}
								</span>
							</button>
						);
					}
					if (action.text === 'Ver') {
						return (
							<button
								key={index}
								className='flex items-center justify-center'
								onClick={() => action.onClick(row)}>
								<span className='bg-yellow-700  text-center text-white rounded-xl border-2 p-2 hover:opacity-50'>
									{action.icon}
								</span>
							</button>
						);
					}
					return null;
				})}
			</Box>
		),
	});

	// RENDERIZA EL TEMA DE LA TABLE
	const darkTheme = createTheme({
		palette: {
			mode: 'light',
		},
	});

	return (
		<div>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<MaterialReactTable table={table} />
			</ThemeProvider>
		</div>
	);
};
