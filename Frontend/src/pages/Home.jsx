import { LoginForm } from '../components/Home/LoginForm';

export const Home = () => {
	return (
		<div className=''>
			<div className='relative w-full h-full'>
				<img
					src='/LOGO RESTOFLOW.png'
					alt='logo marca'
					className='h-[550px] opacity-50'
				/>
				<div className='absolute inset-0 items-center justify-center flex flex-col'>
					<h1 className='text-[50px] font-bold text-center  text-black'>
						Bienvenido a RestóFLOW
					</h1>
					<LoginForm />
				</div>
			</div>
		</div>
	);
};
