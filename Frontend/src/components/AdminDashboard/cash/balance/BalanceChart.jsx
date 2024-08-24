/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function BalanceChart({ salesData, billsData, labels }) {
	const [chartData, setChartData] = useState({});
	const [chartOptions, setChartOptions] = useState({});

	useEffect(() => {
		const documentStyle = getComputedStyle(document.documentElement);
		const textColor = documentStyle.getPropertyValue('--text-color');
		const textColorSecondary = documentStyle.getPropertyValue(
			'--text-color-secondary'
		);
		const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

		const data = {
			labels,
			datasets: [
				{
					label: 'Ventas',
					backgroundColor: documentStyle.getPropertyValue('--green-300'),
					borderColor: documentStyle.getPropertyValue('--green-300'),
					data: salesData, 
				},
				{
					label: 'Gastos',
					backgroundColor: documentStyle.getPropertyValue('--red-400'),
					borderColor: documentStyle.getPropertyValue('--red-400'),
					data: billsData, 
				},
			],
		};
		const options = {
			maintainAspectRatio: false,
			aspectRatio: 0.8,
			plugins: {
				legend: {
					labels: {
						fontColor: textColor,
					},
				},
			},
			scales: {
				x: {
					ticks: {
						color: textColorSecondary,
						font: {
							weight: 500,
						},
					},
					grid: {
						display: false,
						drawBorder: false,
					},
				},
				y: {
					ticks: {
						color: textColorSecondary,
					},
					grid: {
						color: surfaceBorder,
						drawBorder: false,
					},
				},
			},
		};

		setChartData(data);
		setChartOptions(options);
	}, [salesData, billsData]);

	return (
		<div className='w-full'>
			<Chart type='bar' data={chartData} options={chartOptions} />
		</div>
	);
}
