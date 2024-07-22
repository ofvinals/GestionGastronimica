/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useCategoryActions } from '../../../../hooks/useCategoryActions.js';
import { MenuContext } from '../../../../context/MenuContext';

export const CategorySelection = ({ onCategorySelect }) => {
	const { dataCategorys } = useCategoryActions();
	const { state } = useContext(MenuContext);
	const [selectedCategory, setSelectedCategory] = useState(null);

	// CARGA LAS CATEGORIAS
	useEffect(() => {
		dataCategorys();
	}, []);

	const handleCategorySelect = (categoryName) => {
		setSelectedCategory(categoryName);
		onCategorySelect(categoryName);
	};

	const categorys = state.categorys.filter(
		(category) => category.status === true
	);

	const sortedCategories = categorys?.slice().sort((a, b) => {
		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;
		return 0;
	});
	
	return (
		<div className='gap-3 flex flex-row flex-wrap w-full items-center justify-around my-5 h-[150px] overflow-y-scroll'>
			<button
				onClick={() => onCategorySelect(null)}
				className='flex items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:from-slate-to-slate-800 text-white hover:text-white font-bold py-2 px-4 rounded'>
				Todos
			</button>
			{sortedCategories &&
				sortedCategories.map((category, id) => (
					<button
						className={`noborder flex items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:from-slate-to-slate-800 text-white hover:text-white font-bold py-2 px-4 rounded ${
							selectedCategory === category.name
								? 'bg-gradient-to-b from-green-600 to-green-900 rounded-t-lg font-semibold'
								: ''
						}`}
						key={id}
						onClick={() => handleCategorySelect(category.name)}
						value={category.name}>
						{category.name}
					</button>
				))}
		</div>
	);
};
