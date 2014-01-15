define(['app/tabs/period_entry_model', 'backbone'], function(PeriodEntryModel, Backbone) {
	var ChartTabCollection = Backbone.Collection.extend({
		url: 'period/read',
		idAttribute: 'id',
		model: PeriodEntryModel,
		comparator: 'start_date'
	});
	return ChartTabCollection;
});
