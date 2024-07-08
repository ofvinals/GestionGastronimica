/* eslint-disable react/prop-types */
import { Form } from 'react-bootstrap';

const FormField = ({
	id,
	label,
	type,
	register,
	errors,
	as = 'input',
	extraProps,
	renderAs, 
	...rest
}) => {
	const { togglePasswordVisibility, showPassword } = extraProps || {};

	return (
		<Form.Group controlId={id}>
			{' '}
			<div>
				{renderAs === 'toggle' ? (
					<div className='flex flex-row flex-wrap'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background font-medium'>
							{label}
						</Form.Label>

						<Form.Check
							type='switch'
							id={id}
							{...register}
							{...rest}
							className={`${
								errors ? 'is-invalid' : ''
							} ml-5 mt-1 text-2xl`}
						/>
					</div>
				) : (
					<>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							{label}
						</Form.Label>
						<Form.Control
							as={as}
							type={type}
							{...register}
							{...rest}
							className={errors ? 'is-invalid' : ''}
						/>
					</>
				)}
				{errors && (
					<Form.Text className='invalid-feedback'>
						{errors.message}
					</Form.Text>
				)}
				{/* Renderiza el botón de mostrar/ocultar contraseña si el tipo es 'password'  */}
				{type === 'password' && togglePasswordVisibility && (
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
