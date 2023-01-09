/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
 define(['N/log'], function(log) {
    function pageInit(context) {
        if (context.mode !== 'create')          //only execute in create mode
            return;
        var currentRecord = context.currentRecord;
        var itemName = currentRecord.getText({
            fieldId: "item"
        });
        if(itemName.search(/SPFG/i) != -1 || itemName.search(/SPWIP/i) != -1){
            var currentDate = new Date();
            var date = currentDate.getFullYear().toString();
            var month = currentDate.getMonth() + 1;
            if(month < 10){
                month = "0" + month.toString();
            }
            date += (month).toString();
            var day = currentDate.getDate();
            if(day < 10){
                day = "0" + day.toString();
            }
            date += day.toString();
            currentRecord.selectLine({
                sublistId: 'inventoryassignment',
                line: 0
            });
            currentRecord.setCurrentSublistText({      //set date as lot number on new inventory details
                sublistId: 'inventoryassignment',
                fieldId: 'receiptinventorynumber',
                text: date,
                ignoreFieldChange: true
            });
        }
    }
    return {
        pageInit: pageInit
    }
});
