<script>
	import LinkButton from '$lib/Button/LinkButton.svelte';
</script>

<svelte:head>
	<title>Technikteam | Home</title>
</svelte:head>

<div class="w-full flex items-start justify-center p-3">
	<div class="inline-block w-full bg-sky-700 rounded-lg align-middle">
		<div class="flex flex-col items-center justify-center mt-4 text-white">
			<h1 class="text-3xl my-2">Hallo</h1>
			<p class="px-5 mb-4">
				Hier steht ein toller Text mit was das hier ist und vielleicht sind wir sogar so nett, dass
				wir erklären wie und wo man seinen Zugang erhält!
			</p>
			<LinkButton href="/login">Einloggen</LinkButton>
		</div>
	</div>
</div>
