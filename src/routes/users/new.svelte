<script>
	import Button from '$lib/Button/Button.svelte';
	import { getApiURL, getFullURL } from '$lib/util';

	let link;
	let success;
	let error;

	async function createLink() {
		let id = generateId();
		const res = await fetch(`${getApiURL()}/registers/`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			method: 'POST',
			body: JSON.stringify({ link: id })
		});
		const data = await res.json();
		if (res.ok) {
			link = composeLink(id);
		} else if (res.status === 500) {
			return createLink();
		} else {
			error = `Es ist ein Fehler beim eintragen aufgetreten: ${data.message}`;
		}
	}

	function composeLink(id) {
		return `${getFullURL()}/register/${id}`;
	}

	function dec2hex(dec) {
		return dec.toString(16).padStart(2, '0');
	}

	function generateId() {
		let arr = new Uint8Array(6 / 2);
		window.crypto.getRandomValues(arr);
		return Array.from(arr, dec2hex).join('');
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(link);
		success = 'Text erfolgreich kopiert';
	}
</script>

<div class="flex flex-col p-3">
	<div class="inline-block bg-sky-700 rounded-lg align-middle text-white">
		<div class="flex flex-col items-center justify-center m-4">
			<h1 class="text-5xl">Neuen Nutzer erstellen</h1>
		</div>
		{#if success}
			<div class="p-4 m-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
				<span class="font-medium">{success}!</span>
			</div>
		{/if}
		{#if error}
			<div class="p-4 m-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
				<span class="font-medium">Fehler: {error}!</span>
			</div>
		{/if}
		<p class="m-3">
			Neuen Nutzer registrieren: <br />
			1. Den folgenden Knopf drücken um einen Anmelde-Link zu generieren. <br />
			2. Es wird ein Link erstellt, welcher kopiert werden kann. <br />
			3. Diesen Link dem Techniker zukommen lassen, dieser kann sich dann auf dieser Seite seinen Account
			einrichten. <br />
			-> Profit!
		</p>
		{#if !link}
			<div class="flex flex-row m-3">
				<Button onClick={createLink}>Link erstellen</Button>
			</div>
		{/if}
		{#if link}
			<div class="flex justify-end items-center bg-sky-600 text-white rounded-lg pl-4 p-2.5 m-3">
				{link}<span class="ml-auto"
					><Button onClick={copyToClipboard}
						><svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 mr-2"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
							<path
								d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"
							/>
						</svg>Kopieren</Button
					></span
				>
			</div>
		{/if}
	</div>
</div>
