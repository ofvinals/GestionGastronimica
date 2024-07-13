export const UnderConstruction = () => {
	return (
		<div className='relative w-full h-full '>
			<img src='/LOGO RESTOFLOW.png' alt='logo marca' className="min-h-[38vh] w-full" />
			<div className='absolute inset-0 flex items-center justify-center'>
				<p className='text-white bg-black bg-opacity-50 m-4 p-4 text-center text-4xl font-bold'>
					Modulo en construccion. Pronto estará disponible!
				</p>
			</div>
		</div>
	);
};
