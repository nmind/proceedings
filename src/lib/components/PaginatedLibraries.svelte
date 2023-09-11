<script lang="ts">
	import { sectionTierCompletionCheckboxData, allSectionTierNames } from '$lib/constants';
	import type { Library } from '$lib/types';
	import { filterLibraryData } from '$lib/utils';

	import LibraryListviewCard from './LibraryListviewCard.svelte';

	let librariesPerPage = 5;
	let currentPage = 1;
	let searchQuery = '';
	let metadataQuery = '';
	let sectionTierQuery: string[] = [];
	let filteredLibraries: Library[] = [];
	let paginatedLibraries: Library[] = [];

	$: filterLibraryData(searchQuery, metadataQuery, sectionTierQuery).then(
		(response) => (filteredLibraries = response)
	);
	$: paginatefilteredData(filteredLibraries, currentPage);

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

	function setMetadataQuery(event: MouseEvent): void {
		event.preventDefault();
		const target = event.target as HTMLButtonElement;
		metadataQuery = target.innerHTML;
	}

	function selectAllSectionTiers() {
		sectionTierQuery = allSectionTierNames;
	}

	function unselectAllSectionTiers() {
		sectionTierQuery = [];
	}
</script>

<div
	class="flex flex-col items-center md:flex-row md:items-stretch md:justify-around lg:justify-center mb-4 lg:gap-8 xl:gap-12"
>
	<div class="flex flex-col justify-evenly">
		<div>
			<label for="library-name" class="label">
				<span class="label-text text-lg">Search by text</span>
			</label>
			<input
				type="text"
				placeholder="Enter library name"
				bind:value={searchQuery}
				on:focus={() => changePage(1)}
				class="input input-bordered input-primary w-full max-w-xs"
				id="library-name"
			/>
		</div>

		<div>
			<label for="library-tags" class="label">
				<span class="label-text text-lg">Search by tag</span>
			</label>
			<input
				type="text"
				placeholder="Enter library metadata"
				bind:value={metadataQuery}
				on:focus={() => changePage(1)}
				class="input input-bordered input-primary w-full max-w-xs"
				id="library-tags"
			/>
		</div>
	</div>

	<div class="flex flex-col" role="region" aria-label="Filter by section and tier completion">
		<p class="label-text text-lg mb-2">Filter by section- and tier-completion</p>

		{#if sectionTierQuery == allSectionTierNames}
			<button
				type="button"
				class="btn btn-primary btn-outline btn-xs"
				on:click={unselectAllSectionTiers}>Unselect All</button
			>
		{:else}
			<button type="button" class="btn btn-primary btn-xs" on:click={selectAllSectionTiers}
				>Select All</button
			>
		{/if}

		<!-- Border classes specced to match those of `input` tags above -->
		<div class="grid grid-cols-3 gap-4 p-4 border-1 border-primary rounded-sm">
			{#each sectionTierCompletionCheckboxData as sectionTier, index (sectionTier.value)}
				{#if index === 0}
					<h2 class="col-span-3 font-medium">Testing:</h2>
				{:else if index === 3}
					<h2 class="col-span-3 font-medium">Infrastructure:</h2>
				{:else if index === 6}
					<h2 class="col-span-3 font-medium">Documentation:</h2>
				{/if}

				<label for={sectionTier.value} class="inline">
					<input
						id={sectionTier.value}
						type="checkbox"
						name={sectionTier.value}
						value={sectionTier.value}
						bind:group={sectionTierQuery}
					/>
					{sectionTier.name}
				</label>
			{/each}
		</div>
	</div>
</div>

<hr class="mt-12" />

{#if paginatedLibraries?.length}
	<div class="sticky top-0 w-screen z-10 bg-white">
		<!-- The Tailwind values below are taken from the inverse of the <div> 
			underneath the `Library Icon && Details` comment inside 
			`LibraryListviewCard`, in order to maintain identical 
			vertical-spacing with the SVG shield-icons -->
		<div class="ml-auto w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2">
			<!-- Fully admit this is janky as hell, but: the "relative/right-6" offset
			compensates for the fact to that, (despite my best research) inexplicably,
			the bounding flexbox for the `LibraryListviewCard` component's SVG shields
			always calculates out to a couple REM wider than the bounding flexbox below.
			It's not perfect: but looks better than without, across all breakpoints. -->
			<div
				class="h-24 flex flex-row flex-grow flex-wrap justify-center items-center relative right-2 lg:right-4 xl:right-6"
			>
				<p class="w-56 text-center text-lg">Testing</p>
				<p class="w-56 text-center text-lg">Infrastructure</p>
				<p class="w-56 text-center text-lg">Documentation</p>
			</div>
		</div>
	</div>

	<hr />

	{#each paginatedLibraries as library (library.slug)}
		<LibraryListviewCard {library} {setMetadataQuery} />
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
