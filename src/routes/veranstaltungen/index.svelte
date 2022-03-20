<script>
	import { goto } from '$app/navigation';

	import Card from '$lib/Card.svelte';
	import user from '$lib/user';
	import { onMount } from 'svelte';

	let veranstaltungen = fetchEvents();

	async function fetchEvents() {
		const res = await fetch('http://localhost:1337/veranstaltungens', {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
		});
		const data = await res.json();
		return data;
	}

	onMount(() => {
		if (!$user) goto('/login');
	});
</script>

<div class="flex flex-col p-3">
	<div class="inline-block bg-sky-700 rounded-lg align-middle">
		<div class="flex flex-col items-center justify-center m-4 text-white">
			<h1 class="text-5xl">Veranstaltungen</h1>
		</div>
		<div class="overflow-auto">
			{#await veranstaltungen then veranstaltungen}
				{#each veranstaltungen as v}
					<Card id={v.id} title={v.title} date={v.date} accepted={v.accepted} needed={v.needed} />
				{/each}
			{/await}
		</div>
	</div>
</div>
