/* eslint-disable react/prop-types */
import {
	MaterialReactTable,
	useMaterialReactTable,
} from 'material-react-table';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Button } from 'primereact/button';

// RECIBE COLUMNS, DATA Y ACTIONS DE CADA COMPONENTE GESTION
export const Table = ({ columns, data, actions, initialSortColumn  }) => {
	const table = useMaterialReactTable({
		columns,
		data: data || [],
		initialState: {
			showGlobalFilter: true,
			sorting: initialSortColumn
				? [{ id: initialSortColumn, desc: false }]
				: [], // Ordena por la columna especificada
		},
		positionGlobalFilter: 'left',
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
								<Button
									key={index}
									tooltip='Inhabilitar'
									tooltipOptions={{ position: 'top' }}
									className='noborder flex  items-center justify-center border-none'
									onClick={() => action.onClick(row)}
									data-tip='Inhabilitar'>
									<span className='bg-yellow-600  text-center text-white rounded-xl border-2 p-2 hover:opacity-50'>
										{action.icon}
									</span>
								</Button>
							);
						}
					} else {
						if (action.text === 'Habilitar') {
							return (
								<Button
									key={index}
									tooltip='Habilitar'
									tooltipOptions={{ position: 'top' }}
									className='noborder flex items-center justify-center'
									onClick={() => action.onClick(row)}>
									<span className='bg-green-700 text-center text-white rounded-xl border-2 p-2 hover:opacity-50'>
										{action.icon}
									</span>
								</Button>
							);
						}
					}
					if (action.text === 'Editar') {
						return (
							<Button
								key={index}
								tooltip='Editar'
								tooltipOptions={{ position: 'top' }}
								className='noborder flex items-center justify-center focus:border-none'
								onClick={() => action.onClick(row)}>
								<span className='bg-blue-700  text-center text-white rounded-xl border-2 p-2 hover:opacity-50'>
									{action.icon}
								</span>
							</Button>
						);
					}
					if (action.text === 'Eliminar') {
						return (
							<Button
								key={index}
								tooltip='Eliminar'
								tooltipOptions={{ position: 'top' }}
								className='noborder flex items-center justify-center'
								onClick={() => action.onClick(row)}>
								<span className='bg-red-700  text-center text-white rounded-xl border-2 p-2 hover:opacity-50'>
									{action.icon}
								</span>
							</Button>
						);
					}
					if (action.text === 'Ver') {
						return (
							<Button
								key={index}
								tooltip='Ver'
								tooltipOptions={{ position: 'top' }}
								className='noborder flex items-center justify-center'
								onClick={() => action.onClick(row)}>
								<span className='bg-yellow-700  text-center text-white rounded-xl border-2 p-2 hover:opacity-50'>
									{action.icon}
								</span>
							</Button>
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
