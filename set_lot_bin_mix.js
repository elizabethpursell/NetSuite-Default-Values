/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
 define(['N/currentRecord'], function(currentRecord) {
    function pageInit(context) {
      	var itemRecord = context.currentRecord;         //get current record
      	itemRecord.setValue({         //set field value
            fieldId: 'custitem_wmsse_mix_item',
            value: true
        });
        itemRecord.setValue({         //set field value
            fieldId: 'custitem_wmsse_mix_lot',
            value: true
        });
    }
    return {
        pageInit: pageInit
    }
});