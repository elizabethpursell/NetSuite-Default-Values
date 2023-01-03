/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
 define(['N/log'], function(log) {
    function pageInit(context) {
        if (context.mode !== 'create')          //only execute in create mode
            return;
        var currentRecord = context.currentRecord;
        var currentDate = new Date();
        var date = currentDate.getFullYear().toString();
        date += (currentDate.getMonth() + 1).toString();
        date += currentDate.getDate().toString();
        currentRecord.selectLine({
            sublistId: 'inventoryassignment',
            line: 0
        });
        currentRecord.setCurrentSublistValue({      //set date as lot number on new inventory details
            sublistId: 'inventoryassignment',
            fieldId: 'receiptinventorynumber',
            value: date,
            ignoreFieldChange: true
        });
    }
    return {
        pageInit: pageInit
    }
})