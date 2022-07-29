define(['N/search', 'N/record'], function(search, record){
    /**
      * @NApiVersion 2.x
      * @NScriptType ScheduledScript
      */
    function execute(scriptContext) {
        var poSearch = search.load({               //searches for all POs
            id: 'customsearchpo_id'
        });
        poSearch.run().each(function(result){
            if(result != null && result != ''){
                var internalid = result.getValue({
                    name: "internalid"
                });
                var poRecord = record.load({
                    type: record.Type.PURCHASE_ORDER,
                    id: internalid
                });
                for (var i = 0; i < poRecord.getLineCount('item'); i++){        //execute for every item line in the PO
                    var quantityBilled = poRecord.getSublistValue({         //get PO item's quantities
                        sublistId: 'item',
                        fieldId: 'quantitybilled',
                        line: i
                    });
                    var quantityRec = poRecord.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'quantityreceived',
                        line: i
                    });
                    var quantity = poRecord.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'quantity',
                        line: i
                    });
                    var isClosed = poRecord.getSublistValue({
                        sublistId: "item",
                        fieldId: "isclosed",
                        line: i
                    });
                    if(quantityRec >= quantity && quantityBilled >= quantity){      //set fully billed
                        poRecord.setSublistValue({
                            sublistId: 'item',
                            fieldId: 'custcolitem_status',
                            line: i,
                            value: 2
                        });
                    }
                  	if(isClosed == true){           //set closed
                        poRecord.setSublistValue({
                            sublistId: 'item',
                            fieldId: 'custcolitem_status',
                            line: i,
                            value: 1
                        });
                    }
                    else if(quantityRec < quantity && quantityRec > 0 && quantityBilled < quantityRec){         //set pending billing/partially received
                        poRecord.setSublistValue({
                            sublistId: 'item',
                            fieldId: 'custcolitem_status',
                            line: i,
                            value: 6
                        });
                    }
                    else if(quantityRec < quantity && quantityRec > 0 && quantityBilled >= quantityRec){        //set partially received
                        poRecord.setSublistValue({
                            sublistId: 'item',
                            fieldId: 'custcolitem_status',
                            line: i,
                            value: 3
                        });
                    }
                    else if(quantityRec < quantity && quantityRec == 0){        //set pending receipt
                        poRecord.setSublistValue({
                            sublistId: 'item',
                            fieldId: 'custcolitem_status',
                            line: i,
                            value: 5
                        });
                    }
                    else if(quantityRec >= quantity && quantityBilled < quantityRec){       //set pending billing
                        poRecord.setSublistValue({
                            sublistId: 'item',
                            fieldId: 'custcolitem_status',
                            line: i,
                            value: 4
                        });
                    }
                    else{
                        poRecord.setSublistTest({           //set blank
                            sublistId: 'item',
                            fieldId: 'custcolitem_status',
                            line: i,
                            value: ''
                        });
                    }
                }
                poRecord.save(false, false);        //save changes to PO record
            }
            return true;
        });
    }
    return {
        execute: execute
    }
});