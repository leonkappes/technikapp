<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/Button/Button.svelte';
	import user from '$lib/user';
	import { getApiURL } from '$lib/util';

	let identifier;
	let password;
	let error;

	async function login() {
		const res = await fetch(`${getApiURL()}/auth/local`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ identifier, password })
		});
		const data = await res.json();
		if (res.ok) {
			localStorage.setItem('token', data.jwt);
			$user = data.user;
			return goto('/veranstaltungen');
		}else {
			error = "Falscher Nutzername/Passwort!"
		}
	}
</script>

<div class="w-full flex items-start justify-center relative p-3">
	<div class="inline-block w-full bg-sky-700 rounded-lg align-middle">
		<div class="flex flex-col items-center justify-center m-4 mb-0 text-white">
			<h1 class="text-5xl">Login</h1>
		</div>
		{#if error}
			<div
				class="p-4 m-4 text-sm text-red-700 bg-red-100 rounded-lg"
				role="alert"
			>
				<span class="font-medium">Fehler!</span>
				{error}
			</div>
		{/if}
		<form class="p-3" on:submit|preventDefault={login}>
			<div class="mb-2">
				<label for="name" class="block mb-2 text-lg text-white">Nutzername</label>
				<input
					type="text"
					id="name"
					class="bg-sky-600 text-white placeholder:text-stone-300 rounded-lg block w-full pl-4 p-2.5"
					placeholder="MustermMa"
					bind:value={identifier}
					required
				/>
			</div>
			<div class="mb-4">
				<label for="password" class="block mb-2 text-lg text-white">Passwort</label>
				<input
					type="password"
					id="password"
					class="bg-sky-600 text-white placeholder:text-stone-300 rounded-lg block w-full pl-4 p-2.5"
					placeholder="*******"
					bind:value={password}
					required
				/>
			</div>
			<Button type="submit">Einloggen</Button>
		</form>
	</div>
</div>
