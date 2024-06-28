import LoginForm  from '../components/LoginForm';

export const Home = () => {
	return (
		<div className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad]'>
			<h1 className='text-4xl font-bold text-center py-10 text-white'>Bienvenido a Master Comanda</h1>
			<LoginForm />
		</div>
	);
};
