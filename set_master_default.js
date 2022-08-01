/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
 define(['N/currentRecord'], function(currentRecord) {
    function pageInit(context) {
      	var itemRecord = context.currentRecord;         //get current record
        itemRecord.selectLine({                     //select first line in sublist
    		sublistId: 'billofmaterials',
          	line: 0
		});
      	itemRecord.setCurrentSublistValue({         //set sublist's field value
        	sublistId: 'billofmaterials',
            fieldId: 'masterdefault',
            value: true
        });
    }
    return {
        pageInit: pageInit,
    }
});
