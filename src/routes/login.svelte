<script>
	import { goto } from '$app/navigation';
	import user from '$lib/user';

	let identifier;
	let password;

	async function login() {
		const res = await fetch('http://localhost:1337/auth/local', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ identifier, password })
		});
		const data = await res.json();
		if (res.ok) {
			localStorage.setItem('token', data.jwt);
			$user = data.user;
			goto('/veranstaltungen');
		}
		console.log(data);
	}
</script>

<div class="w-full flex items-start justify-center relative p-3">
	<div class="inline-block w-full bg-sky-700 rounded-lg align-middle">
		<div class="flex flex-col items-center justify-center m-4 mb-0 text-white">
			<h1 class="text-5xl">Login</h1>
		</div>
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
			<button
				type="submit"
				class="text-white w-full font-bold md:w-auto bg-sky-600 hover:bg-sky-500 rounded-lg px-5 py-2.5 text-center"
				>Einloggen</button
			>
		</form>
	</div>
</div>
