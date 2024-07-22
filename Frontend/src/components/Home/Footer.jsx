import { Link } from 'react-router-dom';

export const Footer = () => {
	return (
		<footer className='bg-slate-700  flex flex-col md:flex-row justify-around items-center flex-wrap rounded-t-3xl'>
			<img
				src='/LOGO RESTOFLOW.png'
				alt='logomarca'
				width={150}
				className='rounded-xl mt-4 sm:mb-4'
			/>
			<div className='flex flex-col '>
				<Link
					to='/'
					className='md:text-end text-end p-6 text-white text-4xl font-bold w-fit '>
					RestóFLOW
				</Link>
				<p className='text-white text-[10px] text-center'>
					@2024. All rights reserved.-
				</p>
			</div>
			<div className='flex flex-col '>
				<p className='text-white text-center underline'>Desarrollo:</p>
				<a
					className='hover:text-slate-400 font-semibold text-3xl'
					href='https://ofvdev.netlify.app/'
					target='_blank'>
					<img src='/logolinked.png' alt='logodev' width={100} />
					<p className='text-white'>OFVDev</p>
				</a>
			</div>
		</footer>
	);
};
