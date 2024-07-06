/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
import { Form } from 'react-bootstrap';

const FormField = ({
	id,
	label,
	type,
	register,
	errors,
	as = 'input',
	extraProps,
	...rest
}) => {
	const { togglePasswordVisibility, showPassword } = extraProps || {}; // Extrae togglePasswordVisibility y showPassword de extraProps si están definidos

	return (
		<Form.Group controlId={id}>
			<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
				{label}
			</Form.Label>
			<div>
				<Form.Control
					as={as}
					type={type}
					{...register}
					{...rest}
					className={errors ? 'is-invalid' : ''}
				/>
				{errors && (
					<Form.Text className='invalid-feedback'>
						{errors.message}
					</Form.Text>
				)}
				{type === 'password' &&
					togglePasswordVisibility && ( // Renderiza el botón de mostrar/ocultar contraseña si el tipo es 'password' y togglePasswordVisibility está definido
						<button
							type='button'
							onClick={togglePasswordVisibility}
							className='absolute right-0 top-0 border-none p-2'>
							<i
								className={`text-xl ${
									showPassword
										? 'fa-solid fa-eye-slash'
										: 'fa-solid fa-eye'
								}`}></i>
						</button>
					)}
			</div>
		</Form.Group>
	);
};

export default FormField;
