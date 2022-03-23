<script>
	export let color = 'sky';
</script>

<div
	class="text-white bg-{color}-600 hover:bg-{color}-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
>
	<div class="flex flex-row"><slot /></div>
</div>
