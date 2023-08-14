<script lang="ts">
	import type { Library } from '$lib/types';
	import LibraryListviewCard from './LibraryListviewCard.svelte';
	let librariesPerPage = 5;
	let currentPage = 1;
	let searchQuery = '';
	let filteredLibraries: Library[] = [];
	let paginatedLibraries: Library[] = [];

	$: filterData(searchQuery);
	$: paginatefilteredData(filteredLibraries, currentPage);

	async function filterData(query: string) {
		const data = await import('$lib/data.json');
		filteredLibraries = data.evaluatedLibraries.filter((item) =>
			item.name.toLowerCase().includes(query.toLowerCase())
		);
	}

	async function paginatefilteredData(libraries: Library[], pageNumber: number) {
		const libraryStart = (pageNumber - 1) * librariesPerPage;
		const libraryEnd = pageNumber * librariesPerPage;
		paginatedLibraries = libraries.slice(libraryStart, libraryEnd);
	}

	function changePage(newPage: number) {
		const outOfRange: boolean =
			newPage < 1 || newPage - 1 > filteredLibraries.length / librariesPerPage;

		if (outOfRange) {
			currentPage = 1;
		} else {
			currentPage = newPage;
		}
	}
</script>

<div class="flex justify-center items-center mb-4">
	<input
		type="text"
		placeholder="Search by library name..."
		bind:value={searchQuery}
		on:focus={() => changePage(1)}
		class="input input-bordered input-primary w-full max-w-xs"
	/>
</div>

{#if paginatedLibraries?.length}
	<div class="sticky top-0 w-screen z-10">
		<!-- The Tailwind values below are taken from the inverse of the <div> 
			underneath the `Library Icon && Details` comment inside 
			`LibraryListviewCard`, in order to maintain identical 
			vertical-spacing with the SVG shield-icons -->
		<div class="ml-auto w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 bg-white">
			<div class="h-24 flex flex-row flex-grow flex-wrap justify-center items-center">
				<p class="w-56 pr-8 text-center text-lg">Testing</p>
				<p class="w-56 pr-8 text-center text-lg">Infrastructure</p>
				<p class="w-56 pr-8 text-center text-lg">Documentation</p>
			</div>
		</div>
	</div>

	{#each paginatedLibraries as item (item.slug)}
		<LibraryListviewCard library={item} />
	{/each}

	<div class="join w-full flex justify-center mt-8 mb-8 ml-0 mr-0">
		<button
			disabled={currentPage === 1}
			on:click={() => changePage(currentPage - 1)}
			class="join-item btn btn-outline"
		>
			Previous
		</button>
		<div class="flex justify-center items-center mt-0 mb-0 ml-4 mr-4">
			<p>Page {currentPage} of {Math.ceil(filteredLibraries.length / librariesPerPage)}</p>
		</div>

		<button
			disabled={currentPage >= filteredLibraries.length / librariesPerPage}
			on:click={() => changePage(currentPage + 1)}
			class="join-item btn btn-outline"
		>
			Next
		</button>
	</div>
{:else}
	<p>No matching libraries found.</p>
{/if}
