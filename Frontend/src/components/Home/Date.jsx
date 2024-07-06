import { useState, useEffect } from 'react';

// Componente que se encarga de mostrar la fecha y hora
export const DateTime = () => {
	const [dateTime, setDateTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setDateTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return <div>{dateTime.toLocaleString()}</div>;
};
