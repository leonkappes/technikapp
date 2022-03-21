<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status }) {
		return {
			props: {
				status,
				error: error.message
			}
		};
	}
</script>

<script>
	export let status;
	export let error;
</script>

<div class="flex flex-col p-3">
	<div class="inline-block bg-sky-700 rounded-lg align-middle">
		{#if status != 404}
			<div class="flex flex-col items-center justify-center m-4 text-white">
				<h1 class="text-5xl">ERROR: {status}</h1>
			</div>
			<div class="flex flex-col p-3">
				<div class="inline-block bg-sky-600 rounded-lg align-middle">
					<div class="flex flex-col md:justify-between px-4 py-2 leading-normal">
						<p class="font-normal text-white">
							{error}
						</p>
					</div>
				</div>
			</div>
		{:else}
			<div class="flex flex-col items-center justify-center m-4 text-white">
				<h1 class="text-5xl">SOON™</h1>
                <div class="flex flex-col md:justify-between px-4 py-2 leading-normal">
                    <p class="font-normal text-white">
                        (error {status})
                    </p>
                </div>
			</div>
		{/if}
	</div>
</div>
