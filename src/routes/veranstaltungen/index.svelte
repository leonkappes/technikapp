<script>
	import { goto } from '$app/navigation';
	import LinkButton from '$lib/Button/LinkButton.svelte';

	import Card from '$lib/Cards/Card.svelte';
	import user from '$lib/user';
	import { getApiURL } from '$lib/util';
	import { onMount } from 'svelte';

	let veranstaltungen = fetchEvents();

	async function fetchEvents() {
		const res = await fetch(`${getApiURL()}/veranstaltungens`, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
		});
		const data = await res.json();
		return data;
	}

	onMount(() => {
		if (!$user) return goto('/login');
	});
</script>

<div class="flex flex-col p-3">
	<div class="bg-sky-700 rounded-lg">
		<div class="flex flex-col items-center justify-center m-4 text-white">
			<h1 class="text-5xl">Veranstaltungen</h1>
		</div>
		{#if $user && $user.role.type == 'superuser'}
			<div class="flex flex-row ml-3">
				<LinkButton href="/veranstaltungen/new">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 mr-4"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
						/>
					</svg>Neue Veranstaltung erstellen
				</LinkButton>
			</div>
		{/if}
		<div class="overflow-auto">
			{#await veranstaltungen then veranstaltungen}
				{#each veranstaltungen as v}
					<Card id={v.id} title={v.title} date={v.date} accepted={v.accepted} needed={v.needed} />
				{/each}
			{/await}
		</div>
	</div>
</div>
