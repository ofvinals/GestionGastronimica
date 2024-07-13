/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useAuthActions } from '../../hooks/useAuthActions.jsx';
import '../../css/Custom.css';
import Modals from '../Modals.jsx';
import Profile from './Profile.jsx';

const UserMenu = ({ displayName }) => {
	const [show, setShow] = useState(false);
	const { logout } = useAuthActions();
	const [openProfileModal, setOpenProfileModal] = useState(false);

	// FUNCION P MANEJAR ESTADO DEL BOTON C MENU (DROPDOWNBOTTON)
	const handleToggle = (nextShow) => {
		setShow(nextShow);
	};

	// FUNCION P EJECUTAR LOGOUT
	const handleLogOut = () => {
		logout();
	};

	// FUNCION PARA ABRIR MODAL DE EDICION DE PROFILE
	const handleProfileModal = () => {
		setOpenProfileModal(true);
	};

	// CIERRA MODALES
	const handleCloseModal = () => {
		setOpenProfileModal(false);
	};

	return (
		<>
			{displayName ? (
				<div className='flex flex-row flex-wrap items-center justify-center w-full bg-transparent'>
					<DropdownButton
						title={
							<p className='flex items-center'>
								<i className='pr-2 text-xl lg:hidden fa fa-user-check'></i>{' '}
								{displayName}
							</p>
						}
						show={show}
						onToggle={handleToggle}
						id='dropdown-basic-button'>
						<Dropdown.Item
							href='#/edit-profile'
							onClick={handleProfileModal}>
							<i className='fa-solid fa-user-pen pr-2'></i>
							Editar Perfil
						</Dropdown.Item>
						<Dropdown.Item onClick={handleLogOut}>
							<i className='fa-solid fa-lock pr-2'></i>
							Cerrar Sesión
						</Dropdown.Item>
					</DropdownButton>
				</div>
			) : null}
			<Modals
				isOpen={openProfileModal}
				onClose={handleCloseModal}
				title='Editar Datos de Usuario'>
				<Profile onClose={handleCloseModal} mode='edit' />
			</Modals>
		</>
	);
};

export default UserMenu;
