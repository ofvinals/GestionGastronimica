/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Roboto', 'sans-serif'], // Aquí puedes definir tus fuentes personalizadas
			},
			colors: {
				primary: '#25aff0',
				secondary: '',
				background: '#185574',
			},
		},
		dropShadow: {
			'3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
			'4xl': [
				'0 35px 35px rgba(0, 0, 0, 0.25)',
				'0 45px 65px rgba(0, 0, 0, 0.15)',
			],
		},
		textShadow: {
			textShadow: '4px 4px 2px rgba(0,0,0,0.6)',
		},
		boxShadow: {
			'3xl': '7px 5px 10px 0px rgba(0,0,0,0.62);',
			'2xl': '5px 5px 5px 0px rgba(0,0,0,0.62);',
		},
	},
	plugins: [],
};
