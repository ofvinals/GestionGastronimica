/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal';
import '../css/Custom.css';

export const Modals = ({ isOpen, onClose, title, children }) => {
	return (
		<Modal centered show={isOpen} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title className='text-background font-bold'>
					{title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
		</Modal>
	);
};

export default Modals;
