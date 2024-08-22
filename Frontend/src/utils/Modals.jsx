/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal';
import '../css/Custom.css';

export const Modals = ({ isOpen, onClose, title, children }) => {
	if (!isOpen) return null;
	return (
		<Modal centered show={isOpen} onHide={onClose}>
			<Modal.Header closeButton className='bg-slate-700 text-white '>
				<Modal.Title className='text-white font-bold  '>
					{title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className='bg-slate-200'>{children}</Modal.Body>
		</Modal>
	);
};

export default Modals;
