<script lang="ts">
	import type { Library } from '$lib/types';
	import LibraryListviewCard from './LibraryListviewCard.svelte';
	const sectionTierWidgetData = [
		{
			name: 'Bronze',
			value: 'testingBronze'
		},
		{
			name: 'Silver',
			value: 'testingSilver'
		},
		{
			name: 'Gold',
			value: 'testingGold'
		},
		{
			name: 'Bronze',
			value: 'infrastructureBronze'
		},
		{
			name: 'Silver',
			value: 'infrastructureSilver'
		},
		{
			name: 'Gold',
			value: 'infrastructureGold'
		},
		{
			name: 'Bronze',
			value: 'documentationBronze'
		},
		{
			name: 'Silver',
			value: 'documentationSilver'
		},
		{
			name: 'Gold',
			value: 'documentationGold'
		}
	];

	let librariesPerPage = 5;
	let currentPage = 1;
	let searchQuery = '';
	let metadataQuery = '';
	let sectionTierQuery: string[] = [];
	let filteredLibraries: Library[] = [];
	let paginatedLibraries: Library[] = [];

	$: filterData(searchQuery, metadataQuery, sectionTierQuery);
	$: paginatefilteredData(filteredLibraries, currentPage);

	async function filterData(textQuery: string, tagQuery: string, sectionTierQuery: string[]) {
		const data = await import('$lib/data.json');
		let ongoingFilteredLibraries = data.evaluatedLibraries;
		// first filter by sectionTier completion
		if (sectionTierQuery.length) {
			// @TODO: add actual logic here
			sectionTierQuery.map((sectionTier) => {
				console.log(
					'🚀 ~ file: PaginatedLibraries.svelte:21 ~ sectionTierQuery.map ~ sectionTier:',
					sectionTier
				);
			});
		}

		// then filter by tag
		if (tagQuery) {
			ongoingFilteredLibraries = ongoingFilteredLibraries.filter((item) =>
				item.tags.some((tag) => tag.toLowerCase().includes(tagQuery.toLowerCase()))
			);
		}
		// then filter by name
		if (textQuery) {
			ongoingFilteredLibraries = ongoingFilteredLibraries.filter(
				(item) => item.name.toLowerCase().includes(textQuery.toLowerCase())
				// @TODO: ask NMIND team if we also want to search by description:
				// || item.description.toLowerCase().includes(textQuery.toLowerCase())
			);
		}
		
		filteredLibraries = ongoingFilteredLibraries;
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

	<div class="flex flex-col">
		<p class="label-text text-lg mb-2">Filter by section- and tier-completion</p>
		<!-- Border classes specced to match those of `input` tags above -->
		<div class="grid grid-cols-3 gap-4 p-4 border-1 border-primary rounded-sm">
			{#each sectionTierWidgetData as sectionTier, index (sectionTier.value)}
				{#if index === 0}
					<h2 class="col-span-3 font-medium">Testing:</h2>
				{:else if index === 3}
					<h2 class="col-span-3 font-medium">Infrastructure:</h2>
				{:else if index === 6}
					<h2 class="col-span-3 font-medium">Documentation:</h2>
				{/if}

				<label class="inline">
					<input
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

	<hr/>

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
