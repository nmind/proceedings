<script lang="ts">
	import type { Evaluation } from '$lib/types';
	export let evaluation: Evaluation;
</script>

<dl class="flex justify-start pb-1">
	<dt>Checklist Version:</dt>
	<dd class="pl-2">{evaluation.checklistVersion}</dd>
</dl>

<dl class="flex justify-start pb-1">
	<dt>Tool Version:</dt>
	<dd class="pl-2">{evaluation.toolVersion}</dd>
</dl>

<dl class="flex justify-start pb-1">
	<dt>Evaluator:</dt>
	<dd class="pl-2">{evaluation.evaluatorEmail}</dd>
</dl>

<dl class="flex justify-start pb-1">
	<dt>Date:</dt>
	<dd class="pl-2">{evaluation.date}</dd>
</dl>

<div class="mt-6 py-3 text-center">
	<small class="text-gray-500"><em>*** @TODO evaluation details go here ***</em></small>
</div>
