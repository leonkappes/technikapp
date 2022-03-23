<script>
	import BaseCard from '$lib/Cards/BaseCard.svelte';
</script>

<div class="flex flex-col p-3">
	<div class="bg-sky-700 rounded-lg">
		<div class="flex flex-col items-center justify-center m-4 text-white">
			<h1 class="text-5xl">Kontakt</h1>
		</div>
		<div class="flex flex-row">
			<div class="flex-1 -mr-1.5">
				<BaseCard hover={false}>
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-white">Entwickler</h5>
					<p class="font-normal text-white">
						Leon Kappes & Lennart M&uuml;nter
					</p>
				</BaseCard>
			</div>
			<div class="flex-1 -ml-1.5">
				<BaseCard hover={false}>
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-white ">Kontaktinformationen</h5>
					<p class="font-normal text-white">
						<a href="mailto:technikapp@elsetech.cloud">technikapp@elsetech.cloud</a>
					</p>
				</BaseCard>
			</div>
		</div>
	</div>
</div>