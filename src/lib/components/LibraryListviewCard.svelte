<script lang="ts">
	import type { Library } from './types';
	import LibraryListviewShield from './LibraryListviewShield.svelte';
	export let library: Library;
</script>

<div class="p-4">
	<a href={`libraries/${library.slug}`}>
		<div
			class="w-full flex flex-col justify-center lg:flex-row lg:justify-between items-center bg-base-200 shadow-xl"
		>
			<div class="w-full lg:max-w-1/2 flex flex-row justify-center items-center">
				<div class="aspect-square object-cover h-32 p-4">
					<img
						src={`/library_icons/${library.image}`}
						alt={`The icon of the ${library.name} neuroimaging library`}
					/>
				</div>
				<div class="w-full max-w-2/3 p-4">
					<h2 class="text-lg font-semibold break-words">{library.name}</h2>
					{#if library?.urls?.length > 0}
						<div class="truncate">
							<a href={`https://www.${library.urls[0]}`} target="_blank" rel="noopener noreferrer"
								>{library.urls[0]}</a
							>
						</div>
					{/if}
					<p class="text-sm">Evaluated on March 03, 2022</p>
					<p class="text-sm">Evaluated using Checklist v0.1</p>
				</div>
			</div>
			<div class="flex flex-row flex-grow flex-wrap justify-center">
				<div style="height: 5rem; width: 15rem; padding-right: 2rem;  display: flex">
					<LibraryListviewShield fillColor="#FFD700" borderColor="black" />
					<LibraryListviewShield fillColor="#1C274C" borderColor="black" />
					<LibraryListviewShield fillColor="#CD7F32" borderColor="black" />
				</div>
				<div style="height: 5rem; width: 15rem; padding-right: 2rem;  display: flex">
					<LibraryListviewShield fillColor="#FFD700" borderColor="black" />
					<LibraryListviewShield fillColor="#1C274C" borderColor="black" />
					<LibraryListviewShield fillColor="#CD7F32" borderColor="black" />
				</div>
				<div style="height: 5rem; width: 15rem; padding-right: 2rem;  display: flex">
					<LibraryListviewShield fillColor="#FFD700" borderColor="black" />
					<LibraryListviewShield fillColor="#1C274C" borderColor="black" />
					<LibraryListviewShield fillColor="#CD7F32" borderColor="black" />
				</div>
			</div>
		</div>
	</a>
</div>
