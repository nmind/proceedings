<script lang="ts">
	import EvaluationShieldIcon from './EvaluationShieldIcon.svelte';
	import { getCompletionFractionFromSectionTier, mungeChecklistSectionTier } from '$lib/utils';
	import { fillColors } from '$lib/constants';
	import type { Checklist } from '$lib/types';

	export let checklist: Checklist;
	export let schemaVersion: number;
</script>

<div class="flex flex-row flex-grow flex-wrap justify-center">
	<!-- Testing -->
	<div class="h-20 w-56 pr-8 flex">
		<EvaluationShieldIcon
			fillColor={fillColors.bronze}
			sectionTierCompletionFraction={getCompletionFractionFromSectionTier(checklist.testing.bronze)}
			sectionTierCompletionEvidence={mungeChecklistSectionTier(
				checklist.testing.bronze,
				schemaVersion
			)}
		/>
		<EvaluationShieldIcon
			fillColor={fillColors.silver}
			sectionTierCompletionFraction={getCompletionFractionFromSectionTier(checklist.testing.silver)}
			sectionTierCompletionEvidence={mungeChecklistSectionTier(
				checklist.testing.silver,
				schemaVersion
			)}
		/>
		<EvaluationShieldIcon
			fillColor={fillColors.gold}
			sectionTierCompletionFraction={getCompletionFractionFromSectionTier(checklist.testing.gold)}
			sectionTierCompletionEvidence={mungeChecklistSectionTier(
				checklist.testing.gold,
				schemaVersion
			)}
		/>
	</div>

	<!-- Infrastructure -->
	<div class="h-20 w-56 pr-8 flex">
		<EvaluationShieldIcon
			fillColor={fillColors.bronze}
			sectionTierCompletionFraction={getCompletionFractionFromSectionTier(
				checklist.infrastructure.bronze
			)}
			sectionTierCompletionEvidence={mungeChecklistSectionTier(
				checklist.infrastructure.bronze,
				schemaVersion
			)}
		/>
		<EvaluationShieldIcon
			fillColor={fillColors.silver}
			sectionTierCompletionFraction={getCompletionFractionFromSectionTier(
				checklist.infrastructure.silver
			)}
			sectionTierCompletionEvidence={mungeChecklistSectionTier(
				checklist.infrastructure.silver,
				schemaVersion
			)}
		/>
		<EvaluationShieldIcon
			fillColor={fillColors.gold}
			sectionTierCompletionFraction={getCompletionFractionFromSectionTier(
				checklist.infrastructure.gold
			)}
			sectionTierCompletionEvidence={mungeChecklistSectionTier(
				checklist.infrastructure.gold,
				schemaVersion
			)}
		/>
	</div>

	<!-- Documentation -->
	<div class="h-20 w-56 pr-8 flex">
		<EvaluationShieldIcon
			fillColor={fillColors.bronze}
			sectionTierCompletionFraction={getCompletionFractionFromSectionTier(
				checklist.documentation.bronze
			)}
			sectionTierCompletionEvidence={mungeChecklistSectionTier(
				checklist.documentation.bronze,
				schemaVersion
			)}
		/>
		<EvaluationShieldIcon
			fillColor={fillColors.silver}
			sectionTierCompletionFraction={getCompletionFractionFromSectionTier(
				checklist.documentation.silver
			)}
			sectionTierCompletionEvidence={mungeChecklistSectionTier(
				checklist.documentation.silver,
				schemaVersion
			)}
		/>
		<EvaluationShieldIcon
			fillColor={fillColors.gold}
			sectionTierCompletionFraction={getCompletionFractionFromSectionTier(
				checklist.documentation.gold
			)}
			sectionTierCompletionEvidence={mungeChecklistSectionTier(
				checklist.documentation.gold,
				schemaVersion
			)}
		/>
	</div>
</div>
