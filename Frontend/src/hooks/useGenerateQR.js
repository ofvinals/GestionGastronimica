import axios from 'axios';

const modoApi = axios.create({
  baseURL: 'https://ecommerce-modal.preprod.modo.com.ar/bundle.js', // La URL base de la API de MODO (esto es solo un ejemplo)
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer YOUR_API_KEY` // Reemplaza con tu API Key de MODO
  }
});

export const generatePaymentQR = async (orderDetails) => {
  try {
    const response = await modoApi.post('/payments', {
      amount: orderDetails.amount, // Monto de la orden
      currency: 'ARS', // Moneda
      description: `Pago para orden ${orderDetails.orderId}`, // Descripción del pago
      // Otros detalles que requiera la API de MODO
    });

    const paymentUrl = response.data.paymentUrl; // URL para el pago recibida de la API de MODO
    return paymentUrl;
  } catch (error) {
    console.error('Error generating payment QR:', error);
    throw error;
  }
};
