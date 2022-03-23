import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		version: {
			name: "0.1"
		},
		adapter: adapter({
			fallback: 'index.html'
		}),
	}
};

export default config;
