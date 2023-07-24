/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			maxWidth: {
				'1/4': '25%',
				'1/3': '33%',
				'1/2': '50%',
				'2/3': '66%'
			}
		}
	},
	daisyui: {
		themes: ['corporate']
	},
	plugins: [require('daisyui')]
};
