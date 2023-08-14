<script lang="ts">
	import EvaluationShieldIcon from './EvaluationShieldIcon.svelte';
	import { mungeChecklistValue } from '$lib/utils';
	import type { Checklist } from '$lib/types';
	
	export let checklist: Checklist;
</script>

<div class="flex flex-row flex-grow flex-wrap justify-center">
	<!-- Testing -->
	<div class="h-20 w-56 pr-8 flex">
		<EvaluationShieldIcon
			fillColor="#CD7F32"
			sectionTier={mungeChecklistValue(checklist.infrastructure.bronze)}
		/>
		<EvaluationShieldIcon
			fillColor="#1C274C"
			sectionTier={mungeChecklistValue(checklist.infrastructure.silver)}
		/>
		<EvaluationShieldIcon
			fillColor="#FFD700"
			sectionTier={mungeChecklistValue(checklist.infrastructure.gold)}
		/>
	</div>

	<!-- Infrastructure -->
	<div class="h-20 w-56 pr-8 flex">
		<EvaluationShieldIcon
			fillColor="#CD7F32"
			sectionTier={mungeChecklistValue(checklist.testing.bronze)}
		/>
		<EvaluationShieldIcon
			fillColor="#1C274C"
			sectionTier={mungeChecklistValue(checklist.testing.silver)}
		/>
		<EvaluationShieldIcon
			fillColor="#FFD700"
			sectionTier={mungeChecklistValue(checklist.testing.gold)}
		/>
	</div>

	<!-- Documentation -->
	<div class="h-20 w-56 pr-8 flex">
		<EvaluationShieldIcon
			fillColor="#CD7F32"
			sectionTier={mungeChecklistValue(checklist.documentation.bronze)}
		/>
		<EvaluationShieldIcon
			fillColor="#1C274C"
			sectionTier={mungeChecklistValue(checklist.documentation.silver)}
		/>
		<EvaluationShieldIcon
			fillColor="#FFD700"
			sectionTier={mungeChecklistValue(checklist.documentation.gold)}
		/>
	</div>
</div>
