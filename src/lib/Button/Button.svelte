<script>
	import BaseButton from './BaseButton.svelte';

	export let type = undefined;
	export let color = 'sky';
	export let onClick = undefined;
</script>

<button {type} on:click={onClick}><BaseButton {color}><slot /></BaseButton></button>
