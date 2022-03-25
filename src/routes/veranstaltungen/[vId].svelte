<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Table from '$lib/Table/Table.svelte';
	import user from '$lib/user';
	import { onMount } from 'svelte';
	import Button from '$lib/Button/Button.svelte';
	import LinkButton from '$lib/Button/LinkButton.svelte';
	import HeadRow from '$lib/Table/HeadRow.svelte';
	import Headitem from '$lib/Table/Headitem.svelte';
	import TableRow from '$lib/Table/Items/TableRow.svelte';
	import { getApiURL } from '$lib/util';
	import TableItem from '$lib/table/Items/TableItem.svelte';

	onMount(() => {
		if (!$user) goto('/login');
	});

	let vId = $page.params.vId;
	let event = fetchEvent();
	let error = null;
	let isAccepted = false;

	async function fetchEvent() {
		const res = await fetch(`${getApiURL()}/veranstaltungens/${vId}`, {
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
		const res = await fetch(`${getApiURL()}/veranstaltungens/${vId}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			method: 'PUT',
			body: JSON.stringify(toSend)
		});
		const data = await res.json();
		const res2 = await fetch(`${getApiURL()}/users/${$user.id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			method: 'PUT',
			body: JSON.stringify({totaleVeranstaltungen: $user.totaleVeranstaltungen > 0 ? $user.totaleVeranstaltungen+1 : 1})
		});
		if (res.ok && res2.ok) {
			event = fetchEvent();
			$user = await res2.json();
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
		const res = await fetch(`${getApiURL()}/veranstaltungens/${vId}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			method: 'PUT',
			body: JSON.stringify(toSend)
		});
		const res2 = await fetch(`${getApiURL()}/users/${$user.id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			method: 'PUT',
			body: JSON.stringify({totaleVeranstaltungen: $user.totaleVeranstaltungen > 1 ? $user.totaleVeranstaltungen-1 : 0})
		});
		const data = await res.json();
		if (res.ok) {
			event = fetchEvent();
			$user = await res2.json();
			return;
		} else {
			error = `Es ist ein Fehler beim eintragen aufgetreten: ${data.message}`;
		}
	}
	async function deleteEvent() {
		const res = await fetch(`${getApiURL()}/veranstaltungens/${vId}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			method: 'DELETE'
		});
		const data = await res.json();
		if (res.ok) {
			goto('/veranstaltungen');
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

			<Table>
				<HeadRow slot="head">
					<Headitem title="Techniker" />
				</HeadRow>
				{#each event.users_permissions_users as name}
					<TableRow><TableItem name={name.name} /></TableRow>
				{/each}
			</Table>

			<Table>
				<HeadRow slot="head">
					<Headitem title="Material" />
				</HeadRow>
				{#each event.materials as name}
					<TableRow><TableItem name={name.name} /></TableRow>
				{/each}
			</Table>

			<div class="flex flex-col md:flex-row m-3 gap-3 justify-end">
				{#if isAccepted}
					<Button onClick={removeEvent}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 mr-4"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
						</svg>
						Austragen
					</Button>
				{:else}
					<Button type="button" onClick={acceptEvent}>
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
					</Button>
				{/if}
				{#if $user.role.type == 'superuser'}
					<LinkButton href="/veranstaltungen/edit/{event.id}">
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
					</LinkButton>
					<Button type="button" color="red" onClick={deleteEvent}>
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
					</Button>
				{/if}
			</div>
		{/await}
	</div>
</div>
