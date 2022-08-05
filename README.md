# NetSuite-Default-Values
## Project Overview
### Purpose
This repository holds different examples of setting default field values using SuiteScript and SQL. The different field types include dropdown lists, checkboxes, and text boxes. There is also an example of how to set a field to mandatory using SuiteScript API Version 1.0.
### Features
- Default Field Values
- Mandatory Fields
- Saved Searches
- SQL Default Value Expressions
### Prerequisites
- SuiteScript/JavaScript
  - Modules: N/currentRecord, N/search, N/record
  - SuiteScript Types: Client Script, Scheduled Script
  - API Version: 2.x and 1.0
  - JSDoc Tags
- SQL
- Saved Searches
- Custom Fields/Record Types
## Project Setup
### Saved Searches
Be sure to note the saved search ID.
- **Search for Finished Good Bag:**
    - **Function:** collects all the bag records; filtered by flavor and weight settings to find one result that corresponds to the finished good; used in spec_set_nutrition_facts.js
    - **Search Type:** Bag
    - **Result Columns:** Name, Marshmallow Flavor, Weight Settings, Internal ID
    - **Filters:** Marshmallow Flavor, Weight Settings
    - **Permissions:** Public
- **Search for PO Internal IDs:**
    - **Function:** collects all the purchase order record internal IDs; used in set_po_item_status_scheduled.js to load all the purchase order records
    - **Search Type:** Transaction
    - **Criteria:** Main Line is true, Record Type starts with purchaseorder
    - **Result Columns:** Internal ID
    - **Permissions:** Public
- **Active Non Phantom Items:**
    - **Function:** collects all active, non-phantom items; used in update_wms_settings.js to load all the item records
    - **Search Type:** Transaction
    - **Criteria:** Main Line is true, Record Type starts with purchaseorder
    - **Result Columns:** Internal ID
    - **Permissions:** Public
### Custom Fields/Record Types
- **Fields:** Most of the data fields that I referenced were custom fields. These programs will also work with standard fields, as long as you can identify their internal IDs.
- **Record Types:** I used custom record types for the dropdown list field in spec_set_nutrition_facts.js. Each record of my custom record type held data that would autofill fields on an item record.
### Uploading to NetSuite
- **Adding a SuiteScript to the File Cabinet:** navigate Customization>Scripting>Scripts>New; next to the "Script File" dropdown, press the plus sign to upload a new SuiteScript file; select the NetSuite folder that you want to store the SuiteScript files in; under "Select File," press the "Choose File" button; select the SuiteScript file that you want to upload and press open; save and press the blue "Create Script Record" button; name the file, input a relevant ID, and save
- **Using SQL Expressions in Saved Searches:** create a new saved search; add a new column under the "Results" subtab that uses one of the formula fields ("Formula (Currency)", "Formula (Date)", "Formula (Date/Time)", "Formula (Numeric)", "Formula (Percent)", "Formula (Text)"); in the formula field that corresponds to the new formula column, input the SQL expression; this will create a new column in the saved search that presents the results of the formula
- **Using SQL Expressions in Custom Fields:** create a new custom field; under the "Validation & Defaulting" subtab and in the "Default Value" field, input the SQL expression; check the formula box next to the "Default Value" field; unselect the "Store Value" checkbox to automatically update the field value based on the formula; this will display the result to the SQL formula in a new field
## File Descriptions
### spec_set_nutrition_facts.js
- **Programming Languages:** JavaScript, SuiteScript 2.0
- **SuiteScript Type:** Client Script, fieldChanged, beforeLoad
- **Description:** sets the bag selection based on the flavor and weight settings selections
- **Catering the Code to Your NetSuite:**
    - Changing the Saved Search IDs: whenever there is a search load instance (search.load), change the parameter "id" to the correct search ID
    - Referencing Different Fields: whenever there is a set/get value instance (itemRecord.getValue or itemRecord.setValue), change the parameter "fieldId" to the correct internal ID
- **Deploying SuiteScript:** go to the SuiteScript file; press the "Deploy Script" button; enter a name and relevant ID; change the status to "Testing"; under "Execute As Role," choose "Administrator" so that the code will get full access to NetSuite and will not create any permissions errors; under "Applies To," select the record type that you want the button to appear on (I used Lot Numbered Assembly/Bill of Materials); once the code has been tested, change the status to "Released" and select who can use the button under the "Audience" subtab (selecting "All Roles" will make all users able to use it)
### set_po_item_status_scheduled.js
- **Programming Languages:** JavaScript, SuiteScript 2.0
- **SuiteScript Type:** Scheduled Script, execute
- **Description:** sets a purchase order's line item's status in a custom field; was not practical to use since I found SQL expressions instead, but would be a useful foundation for future projects
- **Catering the Code to Your NetSuite:**
    - Changing the Saved Search IDs: whenever there is a search load instance (search.load), change the parameter "id" to the correct search ID
    - Referencing Different Fields: whenever there is a set/get value instance (itemRecord.getValue or itemRecord.setValue), change the parameter "fieldId" to the correct internal ID
    - Applying to Different Record Type: change the saved searches to search under the correct record type; whenever there is a record load instance (record.load), change the record type to the correct one
- **Deploying SuiteScript:** go to the SuiteScript file; press the "Deploy Script" button; enter a name and relevant ID; change the status to "Testing"; press the blue "Save" button and choose "Save and Execute"; once the code has been tested, change the status to "Scheduled"; under "Execute As Role," choose "Administrator" so that the code will get full access to NetSuite and will not create any permissions errors; under the "Schedule" subtab, choose the schedule that the SuiteScript should execute on (Daily Event, Repeat Every 1 Day(s), Start Time 12:00am, Repeat Every 2 Hours)

![itemclosure](https://user-images.githubusercontent.com/94419306/182230760-12e71f7d-c89d-40db-b7cd-322819ff8310.png)

### set_item_status.sql
- **Programming Languages:** SQL
- **Skills:** case statements
- **Description:** sets a purchase order's line item's status in a custom field or saved search column; use SQL expressions like these to easily source fields
- **Catering the Code to Your NetSuite:**
    - Using Different Formula Types in a Saved Search: when selecting the field as a column under the "Results" subtab in a new saved search, choose the type that corresponds to the output (numeric for numbers, text for words, etc.)

![sqlformula](https://user-images.githubusercontent.com/94419306/182231231-a107f69b-4983-4c17-ac84-e42654e1a5af.PNG)

### set_master_default.js
- **Programming Languages:** JavaScript, SuiteScript 2.0
- **SuiteScript Type:** Client Script, pageInit
- **Description:** automatically sets the first bill of materials on an item record to the master default
- **Catering the Code to Your NetSuite:**
    - Selecting a Different Sublist Line as the Master Default: find where the sublist line is selected (itemRecord.selectLine); change the "line" parameter to the correct line index; line indices start at 0
    - Applying Changes to a Different Sublist: whenever there is a reference to a sublist for a parameter "sublistId", change it to the desired sublist ID
    - Setting a Different Field: whenever the sublist field value is set (itemRecord.setCurrentSublistValue), change the parameter "fieldId" to the desired field and change the parameter "value" to the correct field value
- **Deploying SuiteScript:** go to the SuiteScript file; press the "Deploy Script" button; enter a name and relevant ID; change the status to "Testing"; under "Execute As Role," choose "Administrator" so that the code will get full access to NetSuite and will not create any permissions errors; under "Applies To," select the record type that you want the button to appear on (I used Lot Numbered Assembly/Bill of Materials); once the code has been tested, change the status to "Released" and select who can use the button under the "Audience" subtab (selecting "All Roles" will make all users able to use it)

![masterdefault](https://user-images.githubusercontent.com/94419306/182231417-6a1592db-2f2e-4b46-b5e8-a78725f39d78.PNG)

### set_expiration_mandatory_es.js
- **Programming Languages:** JavaScript, SuiteScript 1.0
- **SuiteScript Type:** Client Script, beforeLoad
- **Description:** sets the expiration date field on inventory number records to mandatory
- **Catering the Code to Your NetSuite:**
    - Setting a Different Field: whenever the field value is selected (nlapiGetField), change the parameter "expirationdate" to the desired field ID
    - Changing the Mandatory Permissions: whenever the field mandatory permissions are set (setMandatory), change the parameter "true" to the correct value
- **Deploying SuiteScript:** go to the SuiteScript file; press the "Deploy Script" button; enter a name and relevant ID; change the status to "Testing"; under "Execute As Role," choose "Administrator" so that the code will get full access to NetSuite and will not create any permissions errors; once the code has been tested, change the status to "Released" and select who can use the button under the "Audience" subtab (selecting "All Roles" will make all users able to use it)

![expirationdate](https://user-images.githubusercontent.com/94419306/182232474-96723c92-08ab-46a3-b91f-f33a18b5c24f.png)

### set_lot_bin_mix.js
- **Programming Languages:** JavaScript, SuiteScript 1.0
- **SuiteScript Type:** Client Script, beforeLoad
- **Description:** sets the "Mix Items in Bins" and "Mix Lots in Bins" fields to true for all inventory items
- **Catering the Code to Your NetSuite:**
    - Setting a Different Field: whenever the sublist field value is set (itemRecord.setValue), change the parameter "fieldId" to the desired field and change the parameter "value" to the correct field value
- **Deploying SuiteScript:** go to the SuiteScript file; press the "Deploy Script" button; enter a name and relevant ID; change the status to "Testing"; under "Execute As Role," choose "Administrator" so that the code will get full access to NetSuite and will not create any permissions errors; under "Applies To," select the record type that you want the button to appear on (I used Lot Numbered Inventory Item); once the code has been tested, change the status to "Released" and select who can use the button under the "Audience" subtab (selecting "All Roles" will make all users able to use it)

![wms_checkboxes](https://user-images.githubusercontent.com/94419306/183113654-aac5b584-86cd-4264-a869-97e0f8e54ee8.PNG)

### set_lot_bin_mix_assmbly.js
- **Programming Languages:** JavaScript, SuiteScript 1.0
- **SuiteScript Type:** Client Script, beforeLoad
- **Description:** sets the "Mix Items in Bins" and "Mix Lots in Bins" fields to true for all non-phantom assembly items
- **Catering the Code to Your NetSuite:**
    - Setting a Different Field: whenever the sublist field value is set (itemRecord.setValue), change the parameter "fieldId" to the desired field and change the parameter "value" to the correct field value
- **Deploying SuiteScript:** go to the SuiteScript file; press the "Deploy Script" button; enter a name and relevant ID; change the status to "Testing"; under "Execute As Role," choose "Administrator" so that the code will get full access to NetSuite and will not create any permissions errors; under "Applies To," select the record type that you want the button to appear on (I used Lot Numbered Assembly/Bill of Materials); once the code has been tested, change the status to "Released" and select who can use the button under the "Audience" subtab (selecting "All Roles" will make all users able to use it)

![wms_checkboxes](https://user-images.githubusercontent.com/94419306/183113654-aac5b584-86cd-4264-a869-97e0f8e54ee8.PNG)

### update_wms_settings.js
- **Programming Languages:** JavaScript, SuiteScript 1.0
- **SuiteScript Type:** Scheduled Script, execute
- **Description:** sets the "Mix Items in Bins" and "Mix Lots in Bins" fields to true for all non-phantom assembly items; used to mass update old item records
- **Catering the Code to Your NetSuite:**
    - Setting a Different Field: whenever the sublist field value is set (itemRecord.setValue), change the parameter "fieldId" to the desired field and change the parameter "value" to the correct field value
- **Deploying SuiteScript:** go to the SuiteScript file; press the "Deploy Script" button; enter a name and relevant ID; change the status to "Testing"; press the blue "Save" button and choose "Save and Execute"; once the code has been tested, change the status to "Scheduled"; under "Execute As Role," choose "Administrator" so that the code will get full access to NetSuite and will not create any permissions errors; under the "Schedule" subtab, choose the schedule that the SuiteScript should execute on (Single Event)

![wms_checkboxes](https://user-images.githubusercontent.com/94419306/183113654-aac5b584-86cd-4264-a869-97e0f8e54ee8.PNG)

## References
### Helpful Links
- **SuiteScript 2.0:** https://docs.oracle.com/cd/E60665_01/netsuitecs_gs/NSAPI/NSAPI.pdf
- **SuiteScript Modules:** https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/set_1502135122.html
- **SQL:** https://www.w3schools.com/sql/
## Extra Tips
- Choose to execute as the administrator role when deploying the SuiteScripts to make sure everyone has full permissions
- Be sure to check the global permission in all of the saved searches
- Go back to the script deployments to check that their status is "Released" and that their audience includes all roles
