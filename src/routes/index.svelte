<script>
	import LinkButton from '$lib/Button/LinkButton.svelte';
</script>

<svelte:head>
	<title>Technikteam | Home</title>
</svelte:head>

<div class="w-full flex items-start justify-center p-3">
	<div class="inline-block w-full bg-sky-700 rounded-lg align-middle">
		<div class="flex flex-col items-center justify-center mt-4 text-white">
			<h1 class="text-5xl">Technikteam</h1>
			<p class="px-5 mt-2">
				Koordination von Technikteam-Mitgliedern &uuml;ber Veranstaltungen, inklusive Anzahl ben&ouml;tigter Helfer und Materialliste.
				Zugriff kann &uuml;ber die Technikteam-Leitung angefordert werden.
			</p>
			<p class="px-5 mt-2 mb-4">
				Bei R&uuml;ckfragen erreichbar &uuml;ber <u><a href="/kontakt">Kontakt</a></u>.
			</p>
			<div class="mb-3">
				<LinkButton href="/login">Einloggen</LinkButton>
			</div>
		</div>
	</div>
</div>
