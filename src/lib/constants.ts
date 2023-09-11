export const libraryURLTextDescriptors = {
	DOCS: 'Documentation'
};

// Yes, this duplicates the values below: but because it is used for checking equality
// on an array inside `PaginatedLibraries` using JS (which checks by reference),
// we can't simply run e.g. `sectionTierCompletionCheckboxData.map(({ value }) => value)`
export const allSectionTierNames = [
	'testing-bronze',
	'testing-silver',
	'testing-gold',
	'infrastructure-bronze',
	'infrastructure-silver',
	'infrastructure-gold',
	'documentation-bronze',
	'documentation-silver',
	'documentation-gold'
];

export const sectionTierCompletionCheckboxData = [
	{
		name: 'Bronze',
		value: 'testing-bronze'
	},
	{
		name: 'Silver',
		value: 'testing-silver'
	},
	{
		name: 'Gold',
		value: 'testing-gold'
	},
	{
		name: 'Bronze',
		value: 'infrastructure-bronze'
	},
	{
		name: 'Silver',
		value: 'infrastructure-silver'
	},
	{
		name: 'Gold',
		value: 'infrastructure-gold'
	},
	{
		name: 'Bronze',
		value: 'documentation-bronze'
	},
	{
		name: 'Silver',
		value: 'documentation-silver'
	},
	{
		name: 'Gold',
		value: 'documentation-gold'
	}
];
