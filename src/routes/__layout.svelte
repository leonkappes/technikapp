<script>
	import Navbar from '$lib/Navbar.svelte';
	import Footer from '$lib/Footer.svelte';
	import { onMount } from 'svelte';
	import userStore from '$lib/user';

	import '../app.css';

	let loading = true;

	onMount(async () => {
		// Check if 'token' exists in localStorage
		if (!localStorage.getItem('token')) {
			loading = false;
			return { props: { user: null } };
		}

		if ($userStore == null) {
			// Fetch the user from strapi
			const res = await fetch('http://localhost:1337/auth/me', {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			});
			const user = await res.json();
			loading = false;
			if (res.ok) {
				$userStore = user;
			}
		}
		loading = false;
	});
</script>

<div class="h-full min-h-full">
	<div class="flex flex-col h-full w-full">
		<Navbar />
		<div class="flex-grow h-full overflow-auto">
			{#if !loading}
				<slot />
			{/if}
		</div>
		<Footer />
	</div>
</div>
