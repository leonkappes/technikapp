<script>
	import { goto } from '$app/navigation';

	import Button from '$lib/Button/Button.svelte';
	import Headitem from '$lib/Table/Headitem.svelte';
	import HeadRow from '$lib/Table/HeadRow.svelte';
	import ButtonItem from '$lib/Table/Items/ButtonItem.svelte';
	import TableItem from '$lib/table/Items/TableItem.svelte';
	import TableRow from '$lib/Table/Items/TableRow.svelte';
	import Table from '$lib/Table/Table.svelte';
	import user from '$lib/user';
	import { getApiURL } from '$lib/util';
	import { onMount } from 'svelte';

	let success;
	let materials = fetchMaterials();
	let newMaterialName;

	onMount(() => {
		if (!$user) return goto('/login');
		if ($user.role.type != 'superuser') return goto('/veranstaltungen');
	});

	async function fetchMaterials() {
		const res = await fetch(`${getApiURL()}/materials`, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
		});
		const data = await res.json();
		if (res.ok) {
			return data;
		}
		return [];
	}

	async function deleteItem(_, id) {
		const res = await fetch(`${getApiURL()}/materials/${id}`, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			method: 'DELETE'
		});
		const data = await res.json();
		if (res.ok) {
			success = `${data.name} wurde erfolgreich gelöscht!`;
			materials = await fetchMaterials();
		}
	}

	async function addMaterial() {
		if (!newMaterialName) return;

		const res = await fetch(`${getApiURL()}/materials/`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ name: newMaterialName })
		});
		const data = await res.json();
		if (res.ok) {
			success = `${data.name} wurde erfolgreich angelegt!`;
            newMaterialName = null;
			materials = await fetchMaterials();
		}
	}
</script>

<div class="flex flex-col p-3">
	<div class="inline-block bg-sky-700 rounded-lg align-middle">
		<div class="flex flex-col items-center justify-center m-4 text-white">
			<h1 class="text-5xl">Materialverwaltung</h1>
		</div>
		{#if success}
			<div class="p-4 m-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
				<span class="font-medium">{success}!</span>
			</div>
		{/if}
		<div class="overflow-auto p-3">
			{#await materials then materials}
				<Table>
					<HeadRow slot="head">
						<Headitem title="Materialname" />
						<Headitem title="" />
					</HeadRow>
					{#each materials as material}
						<TableRow>
							<TableItem name={material.name} />
							<ButtonItem>
								<Button color="red" customValue={material.id} onClick={deleteItem}
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
							</ButtonItem>
						</TableRow>
					{/each}
					<TableRow>
						<ButtonItem>
							<p class="flex flex-row text-white">
								<span class="my-auto">Material:</span>
								<input
									type="text"
									id="material"
									placeholder="Beamer"
									autocomplete="off"
									class="bg-sky-600 text-white border-none placeholder:text-stone-300 text-center rounded-lg block w-full pl-4 p-2.5"
									bind:value={newMaterialName}
									required
								/>
							</p>
						</ButtonItem>
						<ButtonItem>
							<Button onClick={addMaterial}
								><svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 mr-3"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
										clip-rule="evenodd"
									/>
								</svg>Material anlegen</Button
							>
						</ButtonItem>
					</TableRow>
				</Table>
			{/await}
		</div>
	</div>
</div>
