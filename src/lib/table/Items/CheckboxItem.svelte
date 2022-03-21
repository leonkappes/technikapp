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
			class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
		/>
		<label for="checkbox-table-1" class="sr-only">checkbox</label>
	</div>
</td>
