<script lang="ts">
	import type { Library } from './types';

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
		placeholder="Search by name..."
		bind:value={searchQuery}
		on:focus={() => changePage(1)}
	/>
</div>

{#if paginatedLibraries && paginatedLibraries.length}
	<ul>
		{#each paginatedLibraries as item (item.slug)}
			<li>
				<img style="width: 20px; height: 20px;"
					src={`/library_icons/${item.image}`}
					alt={`The icon of the ${item.name} neuroimaging library`}
				/>
				<a href={`libraries/${item.slug}`}>
					{item.name}
				</a>
			</li>
		{/each}
	</ul>

	<div class="pagination-buttons" style="display: flex;">
		<button disabled={currentPage === 1} on:click={() => changePage(currentPage - 1)}
			>Previous</button
		>
		<p>Page {currentPage} of {Math.ceil(filteredLibraries.length / librariesPerPage)}</p>
		<button
			disabled={currentPage >= filteredLibraries.length / librariesPerPage}
			on:click={() => changePage(currentPage + 1)}>Next</button
		>
	</div>
{:else}
	<p>No matching libraries found.</p>
{/if}
