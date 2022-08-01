/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
 define(['N/currentRecord', 'N/search'], function(currentRecord, search) {
    function pageInit(context) {
      	//TO DO
    }
    function fieldChanged(context) {
        var itemRecord = context.currentRecord;				//get current record and field
        var fieldName = context.fieldId;
        if(fieldName == 'custitemselect_flavor' || fieldName == 'custitemselect_weight'){		//executes if flavor or weight settings changed
          	var flavor = itemRecord.getValue({			//get the current values
        		fieldId: 'custitemselect_flavor'
        	});
        	var weight = itemRecord.getValue({
          		fieldId: 'custitemselect_weight'
        	});
        	if(flavor != null && flavor != '' && weight != null && weight != ''){		//if both selections are not null
            	var bagSearch = search.load({			//load search for all bag records
                	id: 'customsearchspfg_bag'
            	});
             	var flavorFilter = search.createFilter({		//create filters for flavor and weight settings
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
            	bagSearch.run().each(function(result){			//run search; get internal ID of each result (should only be one result)
                	internalid = result.getValue({
                    	name: "internalid"
                	});
      	    	});
          		if(internalid == null || internalid == ''){				//set bag selection if option does not exist
              		itemRecord.setValue({
                		fieldId: 'custitemnutrition_facts_select',
                		value: 22
            		});
            	}
          		else{
              		itemRecord.setValue({								//set bag selection if option exists
                		fieldId: 'custitemnutrition_facts_select',
                		value: internalid
            		});
            	}
            }
        }
    }
    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged
    }
});
