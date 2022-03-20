<form>
	<div class="mb-6">
		<label for="email" class="block mb-2 text-sm font-medium text-gray-900"
			>Nutzername</label
		>
		<input
			type="username"
			id="name"
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
			placeholder="KappesLe"
			required
		/>
	</div>
	<div class="mb-6">
		<label for="password" class="block mb-2 text-sm font-medium text-gray-900"
			>Passwort</label
		>
		<input
			type="password"
			id="password"
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
			required
		/>
	</div>
	<div class="flex items-start mb-6">
		<div class="flex items-center h-5">
			<input
				id="remember"
				aria-describedby="remember"
				type="checkbox"
				class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300"
				required
			/>
		</div>
	</div>
	<button
		type="submit"
		class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
		>Einloggen</button
	>
</form>
