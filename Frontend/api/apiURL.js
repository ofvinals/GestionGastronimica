import axios from 'axios';

export const apiURL = axios.create({
	baseURL: 'https://resto-flow-gestion-gastronomica.vercel.app',
});
