/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { useCategoryActions } from '../../../hooks/useCategoryActions';
import { MenuContext } from '../../../context/MenuContext';

export const CategorySelection = ({ onCategorySelect }) => {
	const { dataCategorys } = useCategoryActions();
	const { state } = useContext(MenuContext);
	useEffect(() => {
		dataCategorys();
	}, []);

	const categorys = state.categorys;
	
	return (
		<div className='flex flex-row flex-wrap w-full items-center justify-around my-5 '>
			<button
				onClick={() => onCategorySelect(null)}
				className='mx-1 my-3 border-1 border-white p-2 bg-slate-700 hover:text-slate-600 text-slate-50 hover:bg-white rounded-md'>
				Todos
			</button>
			{categorys &&
				categorys.map((category, id) => (
					<button
						className={`border-1 rounded-md border-white text-white p-2 ${
							onCategorySelect === category.name
								? 'bg-green-700  rounded-t-lg shadowIndex'
								: 'bg-slate-700 hover:font-bold'
						}`}
						key={id}
						onClick={() => onCategorySelect(category.name)}
						value={category.name}>
						{category.name}
					</button>
				))}
		</div>
	);
};
