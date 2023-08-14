<script lang="ts">
	import LibraryListviewEvaluation from './LibraryListviewEvaluation.svelte';
	import { getMostRecentEvaluation, getLibraryUrlByType } from '$lib/utils';
	import type { Library, Evaluation } from '$lib/types';
	export let library: Library;

	let mostRecentEvaluation: Evaluation | null = getMostRecentEvaluation(library.evaluations);
	let homePageUrl = getLibraryUrlByType(library, 'Home Page');
	let docsUrl = getLibraryUrlByType(library, 'Documentation');
</script>

<div class="p-4">
	<a href={`libraries/${library.slug}`}>
		<div
			class="w-full flex flex-col justify-center lg:flex-row lg:justify-between items-center bg-base-100 shadow-xl"
		>
			<!-- Library Icon && Details -->
			<div
				class="w-full lg:max-w-1/4 xl:max-w-1/3 2xl:max-w-1/2 flex flex-row justify-center items-center"
			>
				<div class="aspect-square object-cover h-32 p-4">
					{#if docsUrl}
						<a href={`https://www.${docsUrl.href}`} target="_blank" rel="noopener noreferrer">
							<img
								src={`/library_icons/${library.image}`}
								alt={`The icon of the ${library.name} neuroimaging library`}
							/>
						</a>
					{:else}
						<div class="tooltip" data-tip="No online documentation available">
							<img
								src={`/library_icons/${library.image}`}
								alt={`The icon of the ${library.name} neuroimaging library`}
							/>
						</div>
					{/if}
				</div>

				<div class="w-full max-w-2/3 p-4">
					<h2 class="text-lg font-semibold break-words">{library.name}</h2>
					{#if library?.urls?.length > 0}
						<div class="truncate pb-2">
							<a
								href={`https://${library.urls[0].href}`}
								target="_blank"
								rel="noopener noreferrer"
								class="underline text-sky-500 hover:text-sky-700 decoration-sky-500 hover:decoration-sky-700"
								>{library.urls[0].href}</a
							>
						</div>
					{/if}
					<p class="text-sm pb-1">Evaluated on {mostRecentEvaluation?.date}</p>
					<p class="text-sm pb-1">Evaluated using Checklist v{mostRecentEvaluation?.toolVersion}</p>
				</div>
			</div>

			<!-- Most-Recent Evaluation -->
			{#if mostRecentEvaluation}
				<LibraryListviewEvaluation checklist={mostRecentEvaluation.checklist} />
			{:else}
				<div class="w-full text-center">
					<p>
						This library has not been evaluated yet! To help do so, <a
							href="/"
							class="underline text-sky-500 hover:text-sky-700 decoration-sky-500 hover:decoration-sky-700"
							>click here</a
						>
					</p>
				</div>
			{/if}
		</div>
	</a>
</div>
