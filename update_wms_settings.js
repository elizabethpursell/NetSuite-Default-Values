define(['N/search', 'N/record'], function(search, record){
    /**
      * @NApiVersion 2.x
      * @NScriptType ScheduledScript
      */
    function execute(scriptContext) {
        var itemSearch = search.load({               //searches for all active non-phantom items
            id: 'customsearch1960'
        });
        itemSearch.run().each(function(result){
            if(result != null && result != ''){
                var internalid = result.getValue({
                    name: "internalid"
                });
                var itemType = result.getValue({
                    name: "type"
                });
              	var isLotItem = result.getValue({
          			name: "islotitem"
          		});
                var itemRecord = "";
                if(itemType == "Assembly" && isLotItem == false){
                    itemRecord = record.load({                //loads assembly record
                        type: record.Type.ASSEMBLY_ITEM,
                        id: internalid
                    });
                    itemRecord.setValue({         //set field value
                        fieldId: 'custitem_wmsse_mix_item',
                        value: true
                    });
                    itemRecord.setValue({         //set field value
                        fieldId: 'custitem_wmsse_mix_lot',
                        value: true
                    });
                    itemRecord.save(false, false);        //save changes to item record
                }
                else if(itemType == "InvtPart" && isLotItem == false){
                    itemRecord = record.load({                //loads inventory item record
                        type: record.Type.INVENTORY_ITEM,
                        id: internalid
                    });
                    itemRecord.setValue({         //set field value
                        fieldId: 'custitem_wmsse_mix_item',
                        value: true
                    });
                    itemRecord.setValue({         //set field value
                        fieldId: 'custitem_wmsse_mix_lot',
                        value: true
                    });
                    itemRecord.save(false, false);        //save changes to item record
                }
                else if(itemType == "Assembly" && isLotItem == true){
                    itemRecord = record.load({                //loads lot numbered assembly record
                        type: record.Type.LOT_NUMBERED_ASSEMBLY_ITEM,
                        id: internalid
                    });
                    itemRecord.setValue({         //set field value
                        fieldId: 'custitem_wmsse_mix_item',
                        value: true
                    });
                    itemRecord.setValue({         //set field value
                        fieldId: 'custitem_wmsse_mix_lot',
                        value: true
                    });
                    itemRecord.save(false, false);        //save changes to item record
                }
                else if(itemType == "InvtPart" && isLotItem == true){
                    itemRecord = record.load({                //loads lot numbered item record
                        type: record.Type.LOT_NUMBERED_INVENTORY_ITEM,
                        id: internalid
                    });
                    itemRecord.setValue({         //set field value
                        fieldId: 'custitem_wmsse_mix_item',
                        value: true
                    });
                    itemRecord.setValue({         //set field value
                        fieldId: 'custitem_wmsse_mix_lot',
                        value: true
                    });
                    itemRecord.save(false, false);        //save changes to item record
                }
            }
            return true;
        });
    }
    return {
        execute: execute
    }
});