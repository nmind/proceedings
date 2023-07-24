<script lang="ts">
	import type { Library } from './types';
	import LibraryListviewCard from './LibraryListviewCard.svelte';
	let librariesPerPage = 10;
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

<div class="search-container">
	<input
		type="text"
		placeholder="Search by library name..."
		bind:value={searchQuery}
		on:focus={() => changePage(1)}
		class="input input-bordered input-primary w-full max-w-xs"
	/>
</div>

{#if paginatedLibraries?.length}
	{#each paginatedLibraries as item (item.slug)}
		<LibraryListviewCard library={item} />
	{/each}

	<div class="join pagination-wrapper">
		<button
			disabled={currentPage === 1}
			on:click={() => changePage(currentPage - 1)}
			class="join-item btn btn-outline"
		>
			Previous
		</button>
		<div class="page-counter">
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

<style>
	div.search-container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 1rem;
	}

	div.pagination-wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
		margin: 2rem 0;
	}

	div.page-counter {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 1rem;
	}
</style>
