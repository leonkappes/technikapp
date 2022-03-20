<script>
	import Card from '$lib/Card.svelte';

	let veranstaltungen = [
		{ name: 'Pizza essen', date: '18. März 2022 | 18:00 - 20:00 Uhr', needed: 12, accepted: 7, id: 1 },
		{ name: 'Grundschuldingsda', date: '22 März 11 Uhr', needed: 2, accepted: 2, id: 1 },
		{ name: 'Abiball', date: '26 Juni 22 Uhr', needed: 6, accepted: 2, id: 2 }
	];
</script>

<div class="flex flex-col h-full p-3">
	<div class="inline-block h-full bg-sky-700 rounded-lg align-middle">
		<div class="flex flex-col items-center justify-center m-4 text-white">
			<h1 class="text-5xl">Veranstaltungen</h1>
		</div>
		<div class="overflow-hidden">
			{#each veranstaltungen as v}
				<Card id={v.id} title={v.name} date={v.date} accepted={v.accepted} needed={v.needed} />
			{/each}
		</div>
	</div>
</div>
