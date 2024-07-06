import { useState } from 'react';
import { MenuServer } from '../components/ServerDashboard/MenuServer';

export const Server = () => {
	const [reload, setReload] = useState(false);

	const handleReload = () => {
		setReload((prev) => !prev);
	};

	return (
		<div>
			<h1 className='text-center text-4xl font-bold my-5'>Server</h1>
			<MenuServer reload={reload} onReload={handleReload} />;
		</div>
	);
};
