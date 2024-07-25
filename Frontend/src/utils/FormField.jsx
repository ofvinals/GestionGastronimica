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
	mode,
	...rest
}) => {
	const { togglePasswordVisibility, showPassword } = extraProps || {};

	const readOnlyClass = mode === 'view' ? 'bg-transparent' : '';

	return (
		<Form.Group controlId={id} className='relative'>
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
								errors ? 'is-invalid text-red-800' : ''
							} ml-5 mt-1 text-2xl ${readOnlyClass}`}
						/>
					</div>
				) : (
					<>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							{label}
						</Form.Label>
						<div className='relative'>
							<Form.Control
								as={as}
								type={type}
								{...register}
								{...rest}
								className={`${
									errors ? 'is-invalid' : ''
								} ${readOnlyClass}`}
							/>
							{type === 'password' && togglePasswordVisibility && (
								<button
									type='button'
									onClick={togglePasswordVisibility}
									className='absolute right-2 top-1/2 transform -translate-y-1/2 border-none p-2 bg-transparent cursor-pointer'>
									<i
										className={`text-xl ${
											showPassword
												? 'fa-solid fa-eye-slash'
												: 'fa-solid fa-eye'
										}`}></i>
								</button>
							)}
						</div>
					</>
				)}
				{errors && (
					<Form.Text className='invalid-feedback'>
						{errors.message}
					</Form.Text>
				)}
			</div>
		</Form.Group>
	);
};

export default FormField;
