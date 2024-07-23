/* eslint-disable react/prop-types */
const TipButtons = ({ onTipSelect, selectedTip, setSelectedTip }) => {
	const tipPercentages = ['Sin Tips', 5, 10, 15, 20];

	const handleClick = (percentage) => {
		setSelectedTip(percentage); 
		onTipSelect(percentage);
	};

	return (
		<div className='mb-2 w-full'>
			<div className='flex flex-row items-center justify-around flex-wrap gap-2'>
				{tipPercentages.map((percentage, index) => (
					<button
						key={index}
						type='button'
						onClick={() => handleClick(percentage)}
						className={`noborder flex items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:from-slate-to-slate-800 text-slate-50 font-bold py-2 px-3 rounded ${
							selectedTip === percentage ? 'bg-gradient-to-b from-green-500 to-slate-400 ' : ''
						}`}>
						{percentage === 'Sin Tips' ? percentage : `${percentage}%`}
					</button>
				))}
			</div>
		</div>
	);
};

export default TipButtons;
