<script>
    export let name;
</script>

<div class="overflow-hidden shadow-md rounded-lg mx-3 mt-3">
    <table class="min-w-full">
        <thead class="bg-sky-500">
            <tr>
                <th
                    scope="col"
                    class="py-3 px-4 text-m text-left text-white uppercase"
                >
                    {name}
                </th>
            </tr>
        </thead>
        <tbody>
            <slot />
        </tbody>
    </table>
</div>