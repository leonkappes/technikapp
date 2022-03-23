<script>
	import user from '$lib/user';
</script>

<div class="bg-sky-700 px-3 sm:px-4 py-2.5 shadow w-full">
	<div class="container flex flex-wrap justify-start items-center mx-auto">
		<a href="/impressum">
			<span class="text-white p-2 text-sm">Impressum</span>
		</a>
		<a href="/kontakt">
			<span class="text-white p-2 text-sm">Kontakt</span>
		</a>
		{#if $user}
			<div class="ml-auto">
				<span class="text-white p-2 text-sm whitespace-nowrap">{$user.name}</span>
			</div>
		{/if}
	</div>
</div>
