/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useCategoryActions } from '../../../hooks/useCategoryActions.js';

export const CategorySelection = ({ categorys, onCategorySelect }) => {
	const { dataCategorys } = useCategoryActions();

	// CARGA DATOS DE CATEGORIAS
	useEffect(() => {
		dataCategorys();
	}, []);
	
	// ORDENA LAS CATEGORIAS POR NOMBRE
	const sortedCategories = categorys?.slice().sort((a, b) => {
		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;
		return 0;
	});

	return (
		<div className='border-1 border-slate-800 my-3 mx-3 bg-white'>
			<h2 className='text-center text-2xl font-semibold my-2 text-slate-700'>
				Categorias
			</h2>
			<div className='flex flex-row flex-wrap w-full items-center justify-around gap-3 p-3 '>
				<button
					onClick={() => onCategorySelect(null)}
					className='flex items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:from-slate-to-slate-800 text-white hover:text-white font-bold py-2 px-4 rounded'>
					Todas
				</button>
				{/* MAPEA SOBRE TODAS LAS CATEGORIAS Y GENERA UN BOTON POR CADA UNA  */}
				{sortedCategories &&
					sortedCategories.map((category, id) => (
						<button
							className='flex items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:from-slate-to-slate-800 text-white hover:text-white font-bold py-2 px-4 rounded'
							key={id}
							onClick={() => onCategorySelect(category.name)}
							value={category.name}>
							{category.name}
						</button>
					))}
			</div>
		</div>
	);
};
