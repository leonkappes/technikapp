<script>
	import BaseButton from './BaseButton.svelte';

	export let type = undefined;
	export let color = 'sky';
	export let onClick = function(e, val) {};
	export let customValue = undefined;
</script>

<button {type} on:click={e => onClick(e, customValue)}><BaseButton {color}><slot /></BaseButton></button>
