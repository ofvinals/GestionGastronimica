/* eslint-disable react/prop-types */
import { useFormContext } from 'react-hook-form';

const OrderItem = ({ item, index, mode }) => {
	const { register } = useFormContext();

	return (
		<div
			key={index}
			className='flex flex-row flex-wrap items-center justify-around w-full mt-2'>
			{mode === 'edit' ? (
				<>
					<input
						type='text'
						className='w-2/6 form-control'
						defaultValue={item.name}
						{...register(`items[${index}].name`, {
							required: 'El nombre del item es requerido',
						})}
					/>
					<input
						type='number'
						className='w-1/6 form-control'
						defaultValue={item.quantity}
						{...register(`items[${index}].quantity`, {
							required: 'La cantidad es requerida',
						})}
					/>
					<input
						type='number'
						className='w-1/6 form-control'
						defaultValue={item.price}
						{...register(`items[${index}].price`, {
							required: 'El precio es requerido',
						})}
					/>
					<p className='w-1/6 text-center'>
						$ {item.price * item.quantity}
					</p>
				</>
			) : (
				<>
					<p className='w-5/12 text-center'>{item.name}</p>
					<p className='w-1/12 text-center'>{item.quantity}</p>
					<p className='w-3/12 text-center'>$ {item.price}</p>
					<p className='w-3/12 text-center'>
						$ {item.price * item.quantity}
					</p>
				</>
			)}
		</div>
	);
};

export default OrderItem;
