<script lang="ts">
	import EvaluationDetail from '$lib/components/EvaluationDetail.svelte';
	import type { Library, Evaluation } from '$lib/types';
	export let data: Library;
	let sortedEvaluations = data?.evaluations.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
	let selectedOption: Evaluation = sortedEvaluations[0];
</script>

<div class="min-w-full flex justify-center mb-8">
	<div class="max-w-prose">
		<div class="flex flex-row items-center justify-evenly">
			<div class="aspect-square object-cover max-h-56 p-4">
				<img
					src={`/library_icons/${data?.image}`}
					alt={`Icon for the ${data?.name} neuroimaging library`}
				/>
			</div>
			<h1 class="text-4xl lg:text-5xl xl:text-6xl break-words">{data?.name}</h1>
		</div>

		<p class="pt-6">{data?.description}</p>

		<h2 class="text-lg lg:text-xl xl:text-2xl pt-6 pb-2">Visit:</h2>
		<ul class="menu menu-md bg-base-200 w-fit rounded-box">
			{#each data?.urls as url (url)}
				<li><a href={`https://${url}`}>{url}</a></li>
			{/each}
		</ul>

		<div class="mt-6 py-3 text-center">
			<small class="text-gray-500"><em>*** @TODO: display maintainers? ***</em></small>
		</div>

		{#if data?.evaluations.length > 0}
			{#if data?.evaluations.length == 1}
				<h2 class="text-lg lg:text-xl xl:text-2xl pt-6 pb-2">NMIND Evaluation</h2>
				<EvaluationDetail evaluation={data.evaluations[0]} />
			{:else}
				<h2 class="text-lg lg:text-xl xl:text-2xl pt-6 pb-2">NMIND Evaluations</h2>
				{#each sortedEvaluations as evaluation (evaluation)}
					<div class="collapse collapse-arrow bg-base-300">
						<input type="radio" name="my-accordion-2" bind:group={selectedOption} />
						<div class="collapse-title text-xl font-medium">
							Evaluation: {evaluation.date}
						</div>
						<div class="collapse-content bg-base-200">
							<div class="mt-6">
								<EvaluationDetail {evaluation} />
							</div>
						</div>
					</div>
				{/each}
			{/if}
		{/if}
	</div>
</div>
