/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
 define(['N/currentRecord', 'N/search'], function(currentRecord, search) {
    function pageInit(context) {
      	//TO DO
    }
    function fieldChanged(context) {
        var itemRecord = context.currentRecord;
        var fieldName = context.fieldId;
        if(fieldName == 'custitemselect_flavor' || fieldName == 'custitemselect_weight'){
          	var flavor = itemRecord.getValue({
        		fieldId: 'custitemselect_flavor'
        	});
        	var weight = itemRecord.getValue({
          		fieldId: 'custitemselect_weight'
        	});
            var bagSearch = search.load({
                id: 'customsearchspfg_bag'
            });
            var flavorFilter = search.createFilter({
                name: 'custrecordmarshmallow_flavor',
                operator: search.Operator.IS,
                values: [flavor]
            });
            var weightFilter = search.createFilter({
                name: 'custrecordweight_settings',
                operator: search.Operator.IS,
                values: [weight]
            });
            var internalid = 0;
            bagSearch.filters.push(flavorFilter);
            bagSearch.filters.push(weightFilter);
            bagSearch.run().each(function(result){
                internalid = result.getValue({
                    name: "internalid"
                });
      	    });
          	if(internalid == null || internalid == ''){
              	itemRecord.setValue({
                	fieldId: 'custitemnutrition_facts_select',
                	value: 22
            	});
            }
          	else{
              	itemRecord.setValue({
                	fieldId: 'custitemnutrition_facts_select',
                	value: internalid
            	});
            }
        }
    }
    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged
    }
});
