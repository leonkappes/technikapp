<script>
	import BaseButton from './BaseButton.svelte';

	export let href;
	export let color = 'sky';
</script>

<a {href}><BaseButton {color}><slot /></BaseButton></a>
