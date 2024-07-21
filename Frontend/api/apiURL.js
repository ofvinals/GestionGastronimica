import axios from 'axios';

export const apiURL = axios.create({
	baseURL: 'https://restoflow-gestion-gastronomica.onrender.com',
});
