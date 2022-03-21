<script>
    export let onClick;
    export let title;
</script>

<button
	on:click={onClick}
	class="flex flex-row items-center m-3 bg-sky-600 rounded-lg hover:bg-sky-500"
>
	<div class="flex flex-col md:justify-between px-3 py-2 leading-normal">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-white ">
			{title}
		</h5>
	</div>
</button>