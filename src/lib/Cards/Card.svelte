<script>
	import BaseCard from './BaseCard.svelte';

	export let id;
	export let title;
	export let date;
	export let accepted;
	export let needed;
</script>

<a href="/veranstaltungen/{id}">
	<BaseCard>
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-white ">
			{title}
		</h5>
		<p class="font-normal text-white">
			{date}<br />
			Eingetragen: {accepted}/{needed}
		</p>
	</BaseCard>
</a>
