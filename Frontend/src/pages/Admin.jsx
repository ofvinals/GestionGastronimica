/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado
import { Menu } from '../components/AdminDashboard/Menu/Menu';
import { PanelDashboard } from '../components/AdminDashboard/PanelDashboard';
import { SalonMenu } from '../components/AdminDashboard/Salon/SalonMenu';
import { UserDashboard } from '../components/AdminDashboard/Users/UserDashboard';
import { ProductsMenu } from '../components/AdminDashboard/Products/ProductsMenu';
import { UnderConstruction } from '../components/AdminDashboard/UnderConstruction';
import { OrdersMenu } from '../components/AdminDashboard/Kitchen/OrdersMenu';
import { AuthContext } from '../context/AuthContext';
import Loader from '../utils/Loader';
import { useAuthActions } from '../hooks/useAuthActions';
import { CashMenu } from '../components/AdminDashboard/cash/CashMenu';

export const Admin = () => {
	const { state: authState } = useContext(AuthContext);
	const { logout } = useAuthActions();
	const navigate = useNavigate();
	const [activeComponent, setActiveComponent] = useState('tables');

	useEffect(() => {
		if (authState.user.rol !== 'admin') {
			logout();
			navigate('/login');
		}
	}, [authState, navigate]);

	const handleUser = () => setActiveComponent('usuarios');
	const handleProduct = () => setActiveComponent('productos');
	const handleMenu = () => setActiveComponent('cartaMenu');
	const handleSalon = () => setActiveComponent('salon');
	const handleKitchen = () => setActiveComponent('monitorCocina');
	const handleCash = () => setActiveComponent('caja');
	const handleReports = () => setActiveComponent('reportes');

	const renderComponent = () => {
		switch (activeComponent) {
			case 'usuarios':
				return <UserDashboard />;
			case 'productos':
				return <ProductsMenu />;
			case 'cartaMenu':
				return <Menu />;
			case 'salon':
				return <SalonMenu />;
			case 'monitorCocina':
				return <OrdersMenu />;
			case 'caja':
				return <CashMenu />;
			case 'reportes':
				return <UnderConstruction />;
			default:
				return null;
		}
	};

	return (
		<>
			{authState.loading ? (
				<Loader />
			) : (
				<div className='min-h-[60vh] md:min-h-[77vh] bg-[#DBD7CF]'>
					<h1 className='text-center text-wrap text-4xl font-bold py-10 text-slate-700'>
						Administración
					</h1>
					<div className='flex w-full h-full flex-col flex-wrap'>
						<div className='w-full bg-slate-500 rounded-t-3xl'>
							<PanelDashboard
								handleUser={handleUser}
								handleProduct={handleProduct}
								handleMenu={handleMenu}
								handleSalon={handleSalon}
								handleKitchen={handleKitchen}
								handleReports={handleReports}
								handleCash={handleCash}
							/>
						</div>
						<div className='w-full'>{renderComponent()}</div>
					</div>
				</div>
			)}
		</>
	);
};
