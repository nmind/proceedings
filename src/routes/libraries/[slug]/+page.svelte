<script lang="ts">
	import EvaluationDetail from '$lib/components/EvaluationDetail.svelte';
	import { sortEvaluationsByDate } from '$lib/utils';
	import type { Library, Evaluation } from '$lib/types';

	export let data: Library;
	let sortedEvaluations = sortEvaluationsByDate(data?.evaluations);
	let [mostRecentEvaluation, ...priorEvaluations] = sortedEvaluations;
	let selectedOption: Evaluation = priorEvaluations[0];
</script>

<svelte:head>
	<title>{data?.name ? `${data?.name} | ` : ''}NMIND</title>
</svelte:head>

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

		<h2 class="text-xl lg:text-2xl xl:text-3xl pt-6 pb-2">Links</h2>
		<ul class="menu menu-md bg-base-200 w-fit rounded-box">
			{#each data?.urls as url (url)}
				<li>
					<a href={`https://${url.href}`} target="_blank" rel="noopener noreferrer">
						{url.text}
					</a>
				</li>
			{/each}
		</ul>

		{#if sortedEvaluations?.length > 0}
			<h2 class="text-xl lg:text-2xl xl:text-3xl pt-6 pb-2">NMIND Evaluation</h2>
			<EvaluationDetail evaluation={mostRecentEvaluation} />
			{#each priorEvaluations as evaluation (evaluation)}
				<div class="collapse collapse-arrow">
					<input type="radio" name="my-accordion-2" bind:group={selectedOption} />
					<div class="collapse-title text-xl font-medium bg-base-300">
						Prior Evaluation: {evaluation.date}
					</div>
					<div class="collapse-content bg-base-200">
						<div class="mt-6">
							<EvaluationDetail {evaluation} />
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
