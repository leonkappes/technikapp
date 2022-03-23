<script>
	export let hover = true;
</script>

{#if hover}
	<div class="flex flex-row items-center m-3 bg-sky-600 rounded-lg hover:bg-sky-500">
		<div class="flex flex-col md:justify-between px-3 py-2 leading-normal">
			<slot />
		</div>
	</div>
{:else}
	<div class="flex flex-row items-center m-3 bg-sky-600 rounded-lg">
		<div class="flex flex-col md:justify-between px-3 py-2 leading-normal">
			<slot />
		</div>
	</div>
{/if}
