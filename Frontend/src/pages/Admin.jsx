import { useState } from 'react';
import { Menu } from '../components/AdminDashboard/Menu/Menu';
import { PanelDashboard } from '../components/AdminDashboard/PanelDashboard';
import { SalonMenu } from '../components/AdminDashboard/Salon/SalonMenu';
import { UserDashboard } from '../components/AdminDashboard/Users/UserDashboard';
import { ProductsMenu } from '../components/AdminDashboard/Products/ProductsMenu';
import { UnderConstruction } from '../components/AdminDashboard/UnderConstruction';
import { OrdersMenu } from '../components/AdminDashboard/Kitchen/OrdersMenu';

export const Admin = () => {
	const [showDataUsers, setShowDataUsers] = useState(false);
	const [showDataProducts, setShowDataProducts] = useState(false);
	const [showDataTable, setShowDataTable] = useState(false);
	const [showDataReports, setShowDataReports] = useState(false);
	const [showDataCash, setShowDataCash] = useState(false);
	const [showDataMenu, setShowDataMenu] = useState(false);
	const [showDataKitchen, setShowKitchen] = useState(false);

	const handleUser = () => {
		setShowDataUsers(true);
		setShowDataProducts(false);
		setShowDataTable(false);
		setShowDataMenu(false);
		setShowDataReports(false);
		setShowKitchen(false);
	};

	const handleProduct = () => {
		setShowDataUsers(false);
		setShowDataProducts(true);
		setShowDataTable(false);
		setShowDataMenu(false);
		setShowDataReports(false);
		setShowDataCash(false);
		setShowKitchen(false);
	};

	const handleSalon = () => {
		setShowDataUsers(false);
		setShowDataProducts(false);
		setShowDataTable(true);
		setShowDataMenu(false);
		setShowDataReports(false);
		setShowDataCash(false);
		setShowKitchen(false);
	};

	const handleMenu = () => {
		setShowDataUsers(false);
		setShowDataProducts(false);
		setShowDataTable(false);
		setShowDataMenu(true);
		setShowDataReports(false);
		setShowDataCash(false);
		setShowKitchen(false);
	};

	const handleReports = () => {
		setShowDataUsers(false);
		setShowDataProducts(false);
		setShowDataTable(false);
		setShowDataMenu(false);
		setShowDataReports(true);
		setShowDataCash(false);
		setShowKitchen(false);
	};

	const handleCash = () => {
		setShowDataUsers(false);
		setShowDataProducts(false);
		setShowDataTable(false);
		setShowDataMenu(false);
		setShowDataReports(false);
		setShowDataCash(true);
		setShowKitchen(false);
	};

	const handleKitchen = () => {
		setShowDataUsers(false);
		setShowDataProducts(false);
		setShowDataTable(false);
		setShowDataMenu(false);
		setShowDataReports(false);
		setShowDataCash(false);
		setShowKitchen(true);
	};

	return (
		<div className='min-h-[60vh] md:min-h-[77vh] bg-[#DBD7CF]'>
			<h1 className='text-center text-4xl font-bold py-10 text-slate-700'>
				Administración
			</h1>
			<div className='flex w-full h-full flex-col flex-wrap'>
				<div className='w-full bg-slate-500 rounded-t-3xl'>
					<PanelDashboard
						handleUser={handleUser}
						handleProduct={handleProduct}
						handleSalon={handleSalon}
						handleMenu={handleMenu}
						handleKitchen={handleKitchen}
						handleReports={handleReports}
						handleCash={handleCash}
					/>
				</div>
				<div className='w-full'>
					{showDataMenu && <Menu />}
					{showDataUsers && <UserDashboard />}
					{showDataProducts && <ProductsMenu />}
					{showDataTable && <SalonMenu />}
					{showDataKitchen && <OrdersMenu />}
					{showDataReports && <UnderConstruction />}
					{showDataCash && <UnderConstruction />}
				</div>
			</div>
		</div>
	);
};
