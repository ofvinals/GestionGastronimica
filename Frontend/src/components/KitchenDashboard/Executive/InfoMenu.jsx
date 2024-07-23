/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { MenuContext } from '../../../context/MenuContext';

/* eslint-disable react/prop-types */
export const InfoMenu = ({ itemName }) => {
	const [menu, setMenu] = useState(null);
	const { state } = useContext(MenuContext);
	
	useEffect(() => {
		if (state.menus) {
			const foundItem = state.menus.find((menu) => menu.name === itemName);
			setMenu(foundItem);
			console.log(foundItem)
		}
	}, [itemName, state.menus]);

	if (!menu) {
		return <div>Loading...</div>;
	}

	const { name, category, description, recipe, ingredients } = menu;

	return (
		<>
			<div className='flex flex-row flex-wrap items-center'>
				<h2 className='font-semibold text-xl m-2'>Nombre:</h2>
				<span>{name}</span>
			</div>
			<div className='flex flex-row flex-wrap items-center'>
				<h2 className='font-semibold text-xl m-2'>Categoria:</h2>
				<span>{category}</span>
			</div>
			<div className='flex flex-row flex-wrap items-center'>
				<h2 className='font-semibold text-xl m-2'>Descripcion:</h2>
				<span>{description}</span>
			</div>
			<div className='flex flex-col flex-wrap '>
				<h2 className='font-semibold text-xl m-2'>Ingredientes:</h2>
				<div>
					{ingredients && ingredients.map((ingredient, index) => (
						<li key={index} className='ml-5'>
							{ingredient.name}
						</li>
					))}
				</div>
			</div>
			<div className='flex flex-row flex-wrap items-center'>
				<h2 className='font-semibold text-xl m-2'>Receta:</h2>
				<span>{recipe}</span>
			</div>
		</>
	);
};
