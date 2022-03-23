<script lang="ts">
	import { page } from '$app/stores';
	import user from '$lib/user';

	let isHidden = true;
	const activeClasses = 'text-white bg-sky-500 rounded md:bg-transparent md:p-0';
	const inActiveClasses =
		'text-white bg-sky-600 hover:bg-sky-500 rounded md:text-stone-300 md:bg-sky-700 md:hover:bg-transparent md:hover:text-white md:p-0';
	function toggleNav() {
		isHidden = !isHidden;
	}
</script>

<nav class="bg-sky-700 px-3 sm:px-4 py-2.5 shadow w-full">
	<div class="container flex flex-wrap justify-between items-center mx-auto">
		<a href="/" class="flex items-center">
			<span class="text-white p-2 self-center text-xl font-semibold whitespace-nowrap"
				>Technikteam</span
			>
		</a>
		<button
			type="button"
			class="inline-flex items-center p-2 ml-3 text-sm text-white rounded-lg md:hidden hover:bg-sky-600"
			aria-controls="mobile-menu-2"
			aria-expanded="false"
			on:click={toggleNav}
		>
			<span class="sr-only">Open main menu</span>
			<svg
				class="w-6 h-6"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
					clip-rule="evenodd"
				/></svg
			>
			<svg
				class="hidden w-6 h-6"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/></svg
			>
		</button>
		<div class="w-full md:block md:w-auto" id="mobile-menu" class:hidden={isHidden}>
			<ul class="flex flex-col text-lg mt-3 md:flex-row md:space-x-8 md:mt-0 md:font-medium">
				<li>
					<a
						href="/"
						class="block py-4 pr-4 pl-3 {$page.url.pathname == '/'
							? activeClasses
							: inActiveClasses}"
						aria-current="page">Home</a
					>
				</li>
				<li>
					<a
						href="/veranstaltungen"
						class="block py-4 mt-3 md:m-0 pr-4 pl-3 {$page.url.pathname == '/veranstaltungen'
							? activeClasses
							: inActiveClasses}">Veranstaltungen</a
					>
				</li>
				{#if $user && $user.role.type == 'superuser'}
					<li>
						<a
							href="/users"
							class="block py-4 mt-3 md:m-0 pr-4 pl-3 {$page.url.pathname == '/users'
								? activeClasses
								: inActiveClasses}">Nutzerverwaltung</a
						>
					</li>
				{/if}
				{#if $user == null}
					<li>
						<a
							href="/login"
							class="block py-4 mt-3 md:m-0 pr-4 pl-3 {$page.url.pathname == '/login'
								? activeClasses
								: inActiveClasses}">Einloggen</a
						>
					</li>
				{/if}
			</ul>
		</div>
	</div>
</nav>
