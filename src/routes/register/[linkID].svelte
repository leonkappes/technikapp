<script>
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import Button from '$lib/Button/Button.svelte';
	import { getApiURL } from '$lib/util';

	let linkID = $page.params.linkID;
	let link = fetchLink();
	let vals = {
        confirmed: true
    };
	let error;

	async function fetchLink() {
		const res = await fetch(`${getApiURL()}/registers/${linkID}`);
		const data = await res.json();
		if (res.ok) {
			return data;
		} else {
			error = 'Ungültiger link!';
			return null;
		}
	}

	async function save() {
        linkID = (await link).id
		const res = await fetch(`${getApiURL()}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vals)
        });
		const data = await res.json();
		if (res.ok) {
            const res2 = await fetch(`${getApiURL()}/registers/${linkID}`,{method: 'DELETE'});
			return goto(`/login`);
		} else {
            console.log(data)
			error = `Ungültige Angaben! Nutzername vergeben oder E-Mail ungültig`;
			return null;
		}
	}
</script>

<div class="w-full flex items-start justify-center relative p-3">
	<div class="bg-sky-700 rounded-lg w-full mb-1">
		{#if error}
			<div
				class="p-4 m-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
				role="alert"
			>
				<span class="font-medium">Fehler!</span>
				{error}
			</div>
		{/if}

		{#await link then link}
			<form class="flex flex-col items-center justify-center mt-4 p-3 text-white" on:submit|preventDefault={save}>
				<h2 class="text-xl md:text-4xl w-full p-3">
					Name:
					<input
						type="text"
						id="name"
						placeholder="Max Mustermann"
						class="bg-sky-600 text-white border-none placeholder:text-stone-300 text-center rounded-lg block w-full pl-4 p-2.5"
						bind:value={vals.name}
						required
					/>
				</h2>
				<h2 class="text-xl md:text-4xl w-full p-3">
					E-Mailadresse:
					<input
						type="email"
						id="email"
						autocomplete="off"
						placeholder="test@example.com"
						class="bg-sky-600 text-white border-none placeholder:text-stone-300 text-center rounded-lg block w-full pl-4 p-2.5"
						bind:value={vals.email}
						required
					/>
				</h2>
				<h2 class="text-xl md:text-4xl w-full p-3">
					Passwort:
					<input
						type="password"
						id="password"
						placeholder="********"
						autocomplete="new-password"
						class="bg-sky-600 text-white border-none placeholder:text-stone-300 text-center rounded-lg block w-full pl-4 p-2.5"
						bind:value={vals.password}
						required
					/>
				</h2>
				<h2 class="text-xl md:text-4xl w-full p-3">
					Nutzername(Loginname):
					<input
						type="text"
						id="username"
						placeholder="MustermannMax"
						autocomplete="off"
						class="bg-sky-600 text-white border-none placeholder:text-stone-300 text-center rounded-lg block w-full pl-4 p-2.5"
						bind:value={vals.username}
						required
					/>
				</h2>
                <Button type="submit">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 mr-4"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
					</svg>
					Registrieren
				</Button>
			</form>
		{/await}
	</div>
</div>
