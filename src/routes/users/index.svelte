<script>
	import { goto } from '$app/navigation';

	import Table from '$lib/Table/Table.svelte';
	import user from '$lib/user';
	import { onMount } from 'svelte';
	import ButtonItem from '$lib/Table/Items/ButtonItem.svelte';
	import TableRow from '$lib/Table/Items/TableRow.svelte';
	import Headitem from '$lib/Table/Headitem.svelte';
	import HeadRow from '$lib/Table/HeadRow.svelte';
	import TableItem from '$lib/table/Items/TableItem.svelte';
	import Button from '$lib/Button/Button.svelte';
	import { getApiURL } from '$lib/util';

	let users = fetchUsers();
	let success;

	async function fetchUsers() {
		const res = await fetch(`${getApiURL()}/users`, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
		});
		const data = await res.json();
		return data;
	}

	async function deleteUser(_, val) {
		const res = await fetch(`${getApiURL()}/users/${val}`, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
		});
		const data = await res.json();
		if (res.ok && data.role.type != 'superuser') {
			const resDel = await fetch(`${getApiURL()}/users/${val}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`
				},
				method: 'DELETE'
			});
			if(res.ok) {
				users = fetchUsers();
				success = `Nutzer ${data.name} erfolgreich gelöscht!`;
			}
		}
	}

	onMount(() => {
		if (!$user) goto('/login');
		if ($user.role.type != 'superuser') goto('/');
	});
</script>

<div class="flex flex-col p-3">
	<div class="inline-block bg-sky-700 rounded-lg align-middle">
		<div class="flex flex-col items-center justify-center m-4 text-white">
			<h1 class="text-5xl">Nutzerverwaltung</h1>
		</div>
		{#if success}
			<div class="p-4 m-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
				<span class="font-medium">{success}!</span>
			</div>
		{/if}
		<div class="overflow-auto">
			{#await users then users}
				<Table>
					<HeadRow slot="head">
						<Headitem title="Techniker" />
						<Headitem title="Anzahl Veranstaltungen(total)" />
						<Headitem title="" />
					</HeadRow>
					{#each users as u}
						<TableRow>
							<TableItem name={u.name} />
							<TableItem name={u.totaleVeranstaltungen} />
							<ButtonItem>
								<div class="flex gap-3">
									<Button color="red" onClick={deleteUser} customValue={u.id}
										><svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fill-rule="evenodd"
												d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
												clip-rule="evenodd"
											/>
										</svg></Button
									>
								</div>
							</ButtonItem>
						</TableRow>
					{/each}
				</Table>
				<div class="flex flex-col md:flex-row m-3 mr-1 mb-1 justify-end">
					<a
						href="/users/new"
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
							Neuen Nutzer erstellen
						</div>
					</a>
				</div>
			{/await}
		</div>
	</div>
</div>
