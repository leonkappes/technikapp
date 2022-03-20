<script>
	import Navbar from '$lib/Navbar.svelte';

	import '../app.css';
</script>

<div class="flex flex-col h-full w-full">
	<Navbar />
	<div class="flex-grow">
		<slot />
	</div>
</div>
