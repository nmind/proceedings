// types.ts

export interface Library {
	name: string;
	urls: string[];
	description: string;
	slug: string;
	image: string;
	maintainers: {
		name: string;
		email: string;
		affiliation: string;
	}[];
	evaluations: Evaluation[];
}

export interface Evaluation {
	checklistVersion: string;
	toolVersion: string;
	date: string;
	evaluatorEmail: string;
	checklist: Checklist;
}

export interface Checklist {
	testing: {
		bronze: {
			bronze_tst_1: boolean;
			bronze_tst_2: boolean;
		};
		silver: {
			silver_tst_1: boolean;
			silver_tst_2: boolean;
		};
		gold: {
			gold_tst_1: boolean;
			gold_tst_2: boolean;
		};
	};
	infrastructure: {
		bronze: {
			bronze_inf_1: boolean;
			bronze_inf_2: boolean;
			bronze_inf_3: boolean;
			bronze_inf_4: boolean;
			bronze_inf_5: boolean;
			bronze_inf_6: boolean;
			bronze_inf_7: boolean;
		};
		silver: {
			silver_inf_1: boolean;
			silver_inf_2: boolean;
			silver_inf_3: boolean;
		};
		gold: {
			gold_inf_1: boolean;
			gold_inf_2: boolean;
			gold_inf_3: boolean;
			gold_inf_4: boolean;
			gold_inf_5: boolean;
		};
	};
	documentation: {
		bronze: {
			bronze_doc_1: boolean;
			bronze_doc_2: boolean;
			bronze_doc_3: boolean;
			bronze_doc_4: boolean;
			bronze_doc_5: boolean;
			bronze_doc_6: boolean;
			bronze_doc_7: boolean;
			bronze_doc_8: boolean;
			bronze_doc_9: boolean;
		};
		silver: {
			silver_doc_1: boolean;
			silver_doc_2: boolean;
			silver_doc_3: boolean;
			silver_doc_4: boolean;
			silver_doc_5: boolean;
			silver_doc_6: boolean;
		};
		gold: {
			gold_doc_1: boolean;
			gold_doc_2: boolean;
			gold_doc_3: boolean;
			gold_doc_4: boolean;
			gold_doc_5: boolean;
			gold_doc_6: boolean;
		};
	};
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface EvaluationSchema {
	'@context': {
		'@version': number;
		reproschema: string;
	};
	tiers: { [key: string]: Tier };
	items: Item[];
}

interface Tier {
	intendedAudience: string[];
	benefits: string[];
	prerequisiteTiers?: string[];
}

interface Item {
	prompt: string;
	type: string;
	id?: string;
	tier?: string;
	section?: string;
	items?: Item[];
	options?: string[];
}
