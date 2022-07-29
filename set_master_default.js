/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
 define(['N/currentRecord'], function(currentRecord) {
    function pageInit(context) {
      	var itemRecord = context.currentRecord;
        itemRecord.selectLine({
    		sublistId: 'billofmaterials',
          	line: 0
		});
      	itemRecord.setCurrentSublistValue({
        	sublistId: 'billofmaterials',
            fieldId: 'masterdefault',
            value: true
        });
    }
    return {
        pageInit: pageInit,
    }
});