<script>
	import { goto } from '$app/navigation';

	import Table from '$lib/Table/Table.svelte';
	import user from '$lib/user';
	import { onMount } from 'svelte';
	import CheckboxItem from '$lib/Table/Items/CheckboxItem.svelte';
	import HeadRow from '$lib/Table/HeadRow.svelte';
	import Headitem from '$lib/Table/Headitem.svelte';
	import TableRow from '$lib/Table/Items/TableRow.svelte';
	import TableItem from '$lib/table/Items/TableItem.svelte';
	import Button from '$lib/Button/Button.svelte';
	import LinkButton from '$lib/Button/LinkButton.svelte';
import { getApiURL } from '$lib/util';

	onMount(() => {
		if (!$user) goto('/login');
		if ($user.role.type != 'superuser') goto('/veranstaltungen');
	});

	let event = fetchEvent();

	let vals = {
		materials: [],
		accepted: 0,
		needed: 1,
	};
	let materials;
	let error;

	async function fetchEvent() {
		const matRes = await fetch(`${getApiURL()}/materials`, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
		});
		materials = await matRes.json();
		return materials;
	}

	async function save() {
		const res = await fetch(`${getApiURL()}/veranstaltungens/`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			method: 'POST',
			body: JSON.stringify(vals)
		});
		const data = await res.json();
		if (res.ok) {
			goto(`/veranstaltungen/${data.id}`);
			return;
		} else {
			error = `Es ist ein Fehler beim eintragen aufgetreten: ${data.message}`;
		}
	}

	async function changeHandler(e, name) {
		if (e.target.checked) {
			// Checkbox ticked
			vals.materials = [...vals.materials, materials.find((v) => v.name === name)];
		} else {
			// Checkbox removed
			vals.materials = vals.materials.filter((v) => v.name !== name);
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
				<h1 class="text-5xl w-full p-3">
					<input
						type="text"
						id="title"
						placeholder="Veranstaltungsname"
						class="bg-sky-600 text-white border-none placeholder:text-stone-300 text-center rounded-lg block w-full pl-4 p-2.5"
						bind:value={vals.title}
						required
					/>
				</h1>
				<h2 class="text-xl md:text-4xl w-full p-3">
					<input
						type="text"
						id="date"
						placeholder="Datum"
						class="bg-sky-600 text-white border-none placeholder:text-stone-300 text-center rounded-lg block w-full pl-4 p-2.5"
						bind:value={vals.date}
						required
					/>
				</h2>
				<p class="p-3 w-full">
					<span
						type="text"
						id="description"
						class="bg-sky-600 text-white border-none placeholder:text-stone-300 whitespace-pre text-justify rounded-lg block w-full pl-4 p-2.5 before:empty:content-['Beschreibung'] before:empty:text-stone-300"
						contenteditable
						bind:innerHTML={vals.description}
						required
					/>
				</p>
				<p class="p-3 w-full flex flex-row">
					<span class="mr-1 mt-2">Techniker:</span>
					<input
						type="number"
						bind:value={vals.needed}
						min="1"
						class="bg-sky-600 text-white border-none text-center placeholder:text-stone-300 rounded-lg block"
					/>
				</p>
			</div>

			<Table>
				<HeadRow slot="head">
					<Headitem title="" />
					<Headitem title="Material" />
				</HeadRow>
				{#each materials as material}
					<TableRow
						><CheckboxItem checkboxVal={false} name={material.name} onChange={changeHandler} />
						<TableItem name={material.name} />
					</TableRow>
				{/each}
			</Table>

			<div class="flex flex-col md:flex-row m-3 gap-3 justify-end">
				<Button onClick={save}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 mr-4"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
					</svg>
					Speichern
				</Button>
				<LinkButton color="red" href="/veranstaltungen">
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
					Abbrechen
				</LinkButton>
			</div>
		{/await}
	</div>
</div>
