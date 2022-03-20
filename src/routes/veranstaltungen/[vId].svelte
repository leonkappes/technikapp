<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Table from '$lib/table/Table.svelte';
	import TableItem from '$lib/table/TableItem.svelte';
	import user from '$lib/user';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!$user) goto('/login');
	});

	let vId = $page.params.vId;
	let event = fetchEvent();
	let error = null;
	let isAccepted = false;

	async function fetchEvent() {
		const res = await fetch(`http://localhost:1337/veranstaltungens/${vId}`, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
		});
		const data = await res.json();
		isAccepted = data.users_permissions_users.some((v) => v.id === $user.id);
		return data;
	}

	async function acceptEvent() {
		const curData = await fetchEvent();
		let toSend = {
			accepted: curData.accepted + 1,
			users_permissions_users: [...curData.users_permissions_users, $user]
		};
		const res = await fetch(`http://localhost:1337/veranstaltungens/${vId}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			method: 'PUT',
			body: JSON.stringify(toSend)
		});
		const data = await res.json();
		if (res.ok) {
			event = fetchEvent()
			return;
		} else {
			error = `Es ist ein Fehler beim eintragen aufgetreten: ${data.message}`;
		}
	}
	async function removeEvent() {
		const curData = await event;
		let toSend = {
			accepted: curData.accepted - 1,
			users_permissions_users: curData.users_permissions_users.filter((v) => v.id !== $user.id)
		};
		const res = await fetch(`http://localhost:1337/veranstaltungens/${vId}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			method: 'PUT',
			body: JSON.stringify(toSend)
		});
		const data = await res.json();
		if (res.ok) {
			event = fetchEvent()
			return;
		} else {
			error = `Es ist ein Fehler beim eintragen aufgetreten: ${data.message}`;
		}
	}
	async function deleteEvent() {
		const curData = await event;
		const res = await fetch(`http://localhost:1337/veranstaltungens/${vId}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			method: 'DELETE'
		});
		const data = await res.json();
		if (res.ok) {
			goto('/veranstaltungen')
			return;
		} else {
			error = `Es ist ein Fehler beim eintragen aufgetreten: ${data.message}`;
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
		{#await event then event}
			<div class="flex flex-col items-center justify-center mt-4 text-white">
				<h1 class="text-5xl">{event.title}</h1>
				<h2 class="text-xl md:text-4xl">{event.date}</h2>
				<div class="w-full p-3">
					<p class="p-3 w-full whitespace-pre-line text-justify rounded-lg bg-sky-600">
						{@html event.description}
					</p>
				</div>
			</div>

			<Table name="Techniker">
				{#each event.users_permissions_users as name}
					<TableItem name={name.name} />
				{/each}
			</Table>

			<Table name="Material">
				{#each event.materials as name}
					<TableItem name={name.name} />
				{/each}
			</Table>

			<div class="flex flex-col md:flex-row m-3 mr-1 mb-1 justify-end">
				{#if isAccepted}
					<button
						type="button"
						href="/login"
						class="text-white bg-red-700 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
						on:click={removeEvent}
					>
						<div class="flex flex-row">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 mr-4"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
							</svg>
							Austragen
						</div>
					</button>
				{:else}
					<button
						type="button"
						href="/login"
						class="text-white bg-sky-600 hover:bg-sky-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
						on:click={acceptEvent}
					>
						<div class="flex flex-row">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 mr-4"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
							</svg>
							Eintragen
						</div>
					</button>
				{/if}
				{#if $user.role.id == 3}
					<a
						href="/veranstaltungen/edit/{event.id}"
						class="text-white bg-sky-600 hover:bg-sky-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
					>
						<div class="flex flex-row">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 mr-4"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
								/>
							</svg>
							Bearbeiten
						</div>
					</a>
					<button
						type="button"
						href="/login"
						class="text-white bg-red-700 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
						on:click={deleteEvent}
					>
						<div class="flex flex-row">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 mr-4"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
									clip-rule="evenodd"
								/>
							</svg>
							Löschen
						</div>
					</button>
				{/if}
			</div>
		{/await}
	</div>
</div>
