import { useState } from 'react';
import { generatePaymentQR } from '../../../../hooks/useGenerateQR';
import QRCode from 'qrcode';

const PaymentQR = ({ orderDetails }) => {
	const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');

	const createQRCode = async (url) => {
		try {
			const qrCodeDataUrl = await QRCode.toDataURL(url);
			return qrCodeDataUrl;
		} catch (error) {
			console.error('Error generating QR code:', error);
			throw error;
		}
	};

	const handleGenerateQR = async () => {
		try {
			const paymentUrl = await generatePaymentQR(orderDetails);
			const qrDataUrl = await createQRCode(paymentUrl);
			setQrCodeDataUrl(qrDataUrl);
		} catch (error) {
			console.error('Error generating QR code:', error);
		}
	};

	return (
		<div>
			<button onClick={handleGenerateQR}>Generar QR para Pago</button>
			{qrCodeDataUrl && (
				<img src={qrCodeDataUrl} alt='Código QR para Pago' />
			)}
		</div>
	);
};

export default PaymentQR;
