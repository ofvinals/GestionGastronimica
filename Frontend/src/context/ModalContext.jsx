import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);
	const onClose = () => setIsOpen(false);

	return (
		<ModalContext.Provider value={{ isOpen, openModal, onClose }}>
			{children}
		</ModalContext.Provider>
	);
};
