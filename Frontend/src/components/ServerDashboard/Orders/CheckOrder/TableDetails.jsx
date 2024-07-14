/* eslint-disable react/prop-types */
import { DateTime } from 'luxon';

export const TableDetails = ({
	salonName,
	tableNum,
	server,
	diners,
	openAt,
}) => {
	const fechaUTC = DateTime.fromISO(openAt, { zone: 'utc' });
	const fechaBuenosAires = fechaUTC.setZone('America/Argentina/Buenos_Aires');
	const fechaFormateada = fechaBuenosAires.toFormat('dd/MM/yyyy - HH:mm:ss');

	return (
		<div className='border-b-2 border-gray-300 pb-2 mb-2'>
			<p className='text-lg font-semibold mb-1 '>
				{salonName} - Mesa {tableNum}
			</p>
			<p className='mt-3'>
				<span className='font-semibold'>Server:</span> {server}
			</p>
			<p className='mb-3'>
				<span className='font-semibold'>Comensales:</span> {diners}
			</p>
			<p className='mb-3'>
				<span className='font-semibold'>Hora Apertura:</span>{' '}
				{fechaFormateada}
			</p>
		</div>
	);
};
export default TableDetails;
