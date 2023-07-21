<script lang="ts">
	import type { Library } from './types';

	export let library: Library;
</script>

<div class="card-wrapper">
	<a href={`libraries/${library.slug}`}>
		<div class="card lg:card-side bg-base-100 shadow-xl">
			<div class="card-aside-left">
				<img
					class="library-icon"
					src={`/library_icons/${library.image}`}
					alt={`The icon of the ${library.name} neuroimaging library`}
				/>
				<div class="library-details">
					<h2 class="card-title">{library.name}</h2>
					{#if library?.urls?.length > 0}
						<div class="library-external-link">
							<!-- @TODO: make a string-parsing util fn to only add `https://www.` if absent -->
							<a href={`https://www.${library.urls[0]}`} target="_blank" rel="noopener noreferrer"
								>{library.urls[0]}</a
							>
						</div>
					{/if}
				</div>
			</div>
			<div class="card-body">
				<h2>yo dog so many evaluations!!!</h2>
				<p>(are gonna go here... eventually)</p>
				<p>(and now i'm just adding text)</p>
				<p>(to artificially inflate the height of this div for visual testing)</p>
				<!-- <div class="card-actions justify-end">
          <button class="btn btn-primary">Listen</button>
        </div> -->
			</div>
		</div>
	</a>
</div>

<style>
	div.card-wrapper {
		padding: 1rem;
	}

	div.card-aside-left {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	@media (min-width: 1024px) {
		div.card-aside-left {
			width: 25%;
		}
	}

	img.library-icon {
		max-width: 33%;
		aspect-ratio: 1/1;
		padding: 1rem;
	}

	div.library-details {
		min-width: 66%;
	}

	div.library-external-link {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
