<script>
	import BaseCard from './BaseCard.svelte';

	export let onClick;
	export let title;
</script>

<button on:click={onClick}>
	<BaseCard>
		<h5 class="text-2xl font-bold tracking-tight text-white ">
			{title}
		</h5>
		<slot />
	</BaseCard>
</button>
