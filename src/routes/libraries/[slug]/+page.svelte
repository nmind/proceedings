<script lang="ts">
	import EvaluationDetail from '$lib/components/EvaluationDetail.svelte';
	import type { Library, Evaluation } from '$lib/types';
	export let data: Library;
</script>

<div class="min-w-full flex justify-center">
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

		<div class="my-6 text-center">
			<hr class="my-3" />
			<small><em>@TODO: display maintainers?</em></small>
			<hr class="my-3" />
		</div>

		{#if data?.evaluations.length > 0}
			{#if data?.evaluations.length == 1}
				<EvaluationDetail evaluation={data.evaluations[0]} />
			{:else}
				<h2 class="text-lg lg:text-xl xl:text-2xl pt-6 pb-2">NMIND Evaluations:</h2>
				<p>wow you got a lot of evaluations!</p>
			{/if}
		{/if}
	</div>
</div>
