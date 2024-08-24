/* eslint-disable react/prop-types */
import { Accordion, AccordionTab } from 'primereact/accordion';
import '../../../../css/Custom.css';

export default function InfoSales({ data }) {
	// calcula el total por propinas
	const totalTips = data?.reduce((acc, current) => {
		const price = parseFloat(current.additionalCharges.tips);
		return acc + (isNaN(price) ? 0 : price);
	}, 0);

	// calcula el total por serivcios de mesa
	const totalTableService = data?.reduce((acc, current) => {
		const price = parseFloat(current.additionalCharges.tableService);
		return acc + (isNaN(price) ? 0 : price);
	}, 0);

	// calcula el total por productos solamente (resta propinas y servicios de mesa)
	const totalItems = data?.reduce((acc, current) => {
		const price =
			parseFloat(current.finalPrice) - totalTips - totalTableService;
		return acc + (isNaN(price) ? 0 : price);
	}, 0);

	// calcula el total de descuentos
	const totalDiscount = data?.reduce((acc, current) => {
		const price = parseFloat(current.additionalCharges.discount);
		return acc + (isNaN(price) ? 0 : price);
	}, 0);

	return (
		<div>
			<Accordion activeIndex={1}>
				<AccordionTab header='Mas Info' className='text-white'>
					<div className='flex flex-row flex-wrap items-center justify-around text-center'>
						<div className='flex flex-col flex-wrap items-center min-h-[50px]'>
							<p className='m-0'>Total Propinas:</p>
							<span className='font-bold'>$ {totalTips}</span>
						</div>
						<div className='flex flex-col flex-wrap items-center min-h-[50px]'>
							<p className='m-0'>Total Servicio de Mesa:</p>
							<span className='font-bold'>$ {totalTableService}</span>
						</div>
						<div className='flex flex-col flex-wrap items-center min-h-[50px]'>
							<p className='m-0'>Total Consumo:</p>
							<span className='font-bold'> ${totalItems}</span>
						</div>
						<div className='flex flex-col flex-wrap items-center min-h-[50px]'>
							<p className='m-0'>Total Descuentos:</p>
							<span className='font-bold'> ${totalDiscount}</span>
						</div>
					</div>
				</AccordionTab>
			</Accordion>
		</div>
	);
}
