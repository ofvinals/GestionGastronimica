// Pagination.jsx
import PropTypes from 'prop-types';

export const Pagination = ({ totalPages, currentPage, paginate }) => {
	return (
		<div className='flex items-center justify-center'>
			{Array.from({ length: totalPages }, (_, index) => (
				<button
					key={index}
					onClick={() => paginate(index + 1)}
					className={`noborder bg-slate-700 mb-2 mt-2 text-slate-100 mx-1 py-2 px-4 border border-gray-300 ${
						currentPage === index + 1 ? 'bg-slate-100 text-slate-900' : ''
					}`}>
					{index + 1}
				</button>
			))}
		</div>
	);
};

Pagination.propTypes = {
	totalPages: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	paginate: PropTypes.func.isRequired,
};
