/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useCategoryActions } from '../../../hooks/useCategoryActions';

export const CategorySelection = ({ categorys, onCategorySelect }) => {
	const { dataCategorys } = useCategoryActions();

	useEffect(() => {
		dataCategorys();
	}, []);

	return (
		<div className='flex flex-row flex-wrap w-full items-center justify-around my-5 border-1 border-slate-800'>
			<button
				onClick={() => onCategorySelect(null)}
				className='mx-1 my-3 border-1 border-white p-2 bg-slate-600 hover:text-slate-600 text-slate-50 hover:bg-white rounded-md'>
				Todos
			</button>
			{categorys &&
				categorys.map((category, id) => (
					<button
						className='mx-1 my-3 border-1 border-slate-600 p-2 bg-slate-600 hover:text-slate-600 text-slate-50 hover:border-slate-600 hover:bg-white rounded-md'
						key={id}
						onClick={() => onCategorySelect(category.name)}
						value={category.name}>
						{category.name}
					</button>
				))}
		</div>
	);
};
