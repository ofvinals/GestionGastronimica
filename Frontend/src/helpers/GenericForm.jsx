/* eslint-disable react/prop-types */
import { Form } from 'react-bootstrap';
import Loader from './Loader.jsx';
import { Button } from 'primereact/button';

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
							<Button
								type='submit'
								tooltip='Confirmar'
								tooltipOptions={{ position: 'top' }}
								className='text-white p-2 rounded-full hover:bg-green-800 hover:text-green-800'>
								<i className='fa-solid fa-circle-check text-[40px] text-green-800 hover:text-white'></i>
							</Button>
						)}
						<Button
							type='button'
							tooltip='Cerrar'
							tooltipOptions={{ position: 'top' }}
							className='text-white p-2 rounded-full hover:bg-red-800 hover:text-red-800'
							onClick={onClose}>
							<i className='fa-solid fa-circle-xmark text-[40px] text-red-800 hover:text-white'></i>
						</Button>
					</Form.Group>
				</Form>
			)}
		</>
	);
};

export default GenericForm;
