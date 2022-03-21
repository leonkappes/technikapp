<script>
	import { goto } from '$app/navigation';

	import Table from '$lib/Table/Table.svelte';
	import TableItem from '$lib/Table/Items/TableItem.svelte';
	import user from '$lib/user';
	import { onMount } from 'svelte';
	import ButtonItem from '$lib/Table/Items/ButtonItem.svelte';
	import LinkButton from '$lib/Button/LinkButton.svelte';
	import TableRow from '$lib/Table/Items/TableRow.svelte';
	import Headitem from '$lib/Table/Headitem.svelte';
import HeadRow from '$lib/Table/HeadRow.svelte';

	let users = fetchEvents();

	async function fetchEvents() {
		const res = await fetch('http://localhost:1337/users', {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
		});
		const data = await res.json();
		return data;
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
		<div class="overflow-auto">
			{#await users then users}
				<Table>
					<HeadRow slot="head">
						<Headitem title="Techniker" />
						<Headitem title="" />
					</HeadRow>
					{#each users as u}
						<TableRow
							><TableItem name={u.name} /><ButtonItem
								><LinkButton color="orange" href="/users/{u.id}">Bearbeiten</LinkButton></ButtonItem
							></TableRow
						>
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
