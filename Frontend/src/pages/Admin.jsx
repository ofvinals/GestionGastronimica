import { useState } from 'react';
import { Menu } from '../components/AdminDashboard/Menu/Menu';
import { PanelDashboard } from '../components/AdminDashboard/PanelDashboard';
import { SalonMenu } from '../components/AdminDashboard/Salon/SalonMenu'
import { UserDashboard } from '../components/AdminDashboard/Users/UserDashboard';
import { ProductsMenu } from '../components/AdminDashboard/Products/ProductsMenu';

export const Admin = () => {
	const [showDataUsers, setShowDataUsers] = useState(false);
	const [showDataProducts, setShowDataProducts] = useState(false);
	const [showDataTable, setShowDataTable] = useState(false);
	const [showDataMenu, setShowDataMenu] = useState(false);

	const handleUser = () => {
		setShowDataUsers(true);
		setShowDataProducts(false);
		setShowDataTable(false);
		setShowDataMenu(false);
	};
	const handleProduct = () => {
		setShowDataUsers(false);
		setShowDataProducts(true);
		setShowDataTable(false);
		setShowDataMenu(false);
	};
	const handleSalon = () => {
		setShowDataUsers(false);
		setShowDataProducts(false);
		setShowDataTable(true);
		setShowDataMenu(false);
	};
	const handleMenu = () => {
		setShowDataUsers(false);
		setShowDataProducts(false);
		setShowDataTable(false);
		setShowDataMenu(true);
	};

	return (
		<div>
			<h1 className='text-center text-4xl font-bold my-10 text-slate-700'>
				Administración
			</h1>
			<div className='flex w-full h-full flex-col flex-wrap'>
				<div className='w-full bg-slate-500'>
					<PanelDashboard
						handleUser={handleUser}
						handleProduct={handleProduct}
						handleSalon={handleSalon}
						handleMenu={handleMenu}
					/>
				</div>
				<div className='w-full'>
					{showDataMenu && <Menu />}
					{showDataProducts && <ProductsMenu />}
					{showDataTable && <SalonMenu />}
					{showDataUsers && <UserDashboard />}
				</div>
			</div>
		</div>
	);
};
