/* eslint-disable react/prop-types */
export const InfoMenu = ({ menu }) => {
	const { name, category, description, price, ingredients } = menu;

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
				<h2 className='font-semibold text-xl m-2'>Precio:</h2>
				<span>$ {price}</span>
			</div>
			<div className='flex flex-row flex-wrap items-center'>
				<h2 className='font-semibold text-xl m-2'>Descripcion:</h2>
				<span>{description}</span>
			</div>
			<div className='flex flex-col flex-wrap '>
				<h2 className='font-semibold text-xl m-2'>Ingredientes:</h2>
				<div>
					{ingredients.map((ingredient, index) => (
						<li key={index} className='ml-5'>
							{ingredient.name}
						</li>
					))}
				</div>
			</div>
		</>
	);
};
