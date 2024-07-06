/* eslint-disable react/prop-types */
import { Form } from 'react-bootstrap';
import Loader from './Loader.jsx';

const GenericForm = ({ loading, onSubmit, children, onClose, mode }) => {
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<Form onSubmit={onSubmit}>
					{children}
					<Form.Group className='flex flex-wrap items-center justify-around mt-3'>
						{mode !== 'view' && (
							<button
								type='submit'
								className='text-white p-2 rounded-full hover:bg-green-800 hover:text-green-800'>
								<i className='fa-solid fa-circle-check text-[40px] text-green-800 hover:text-white'></i>
							</button>
						)}
						<button
							type='button'
							className='text-white p-2 rounded-full hover:bg-red-800 hover:text-red-800'
							onClick={onClose}>
							<i className='fa-solid fa-circle-xmark text-[40px] text-red-800 hover:text-white'></i>
						</button>
					</Form.Group>
				</Form>
			)}
		</>
	);
};

export default GenericForm;