<script>
	export let name;
	export let checkboxVal = false;
	export let onChange = undefined;
</script>

<td class="w-4 p-4">
	<div class="flex items-center">
		<input
			id="checkbox-table-1"
			type="checkbox"
			checked={checkboxVal}
			on:change={(e) => onChange(e, name)}
			class="form-checkbox w-4 h-4 bg-stone-200 border-stone-300 rounded checked:bg-sky-400 hover:checked:bg-sky-400"
		/>
		<label for="checkbox-table-1" class="sr-only">checkbox</label>
	</div>
</td>
