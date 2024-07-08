import Swal from 'sweetalert2';

export const showAlert = (options) => {
	return Swal.fire({
		...options,
		showConfirmButton: options.showConfirmButton || false,
		timer: options.timer || 3000,
	});
};

export const confirmAction = async (options) => {
	const result = await Swal.fire({
		...options,
		showCancelButton: true,
		confirmButtonColor: options.confirmButtonColor || '#d33',
		cancelButtonColor: options.cancelButtonColor || '#8f8e8b',
		confirmButtonText: options.confirmButtonText || 'Sí, confirmar',
		cancelButtonText: options.cancelButtonText || 'Cancelar',
	});
	return result.isConfirmed;
};
