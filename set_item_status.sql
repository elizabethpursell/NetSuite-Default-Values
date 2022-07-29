CASE 
WHEN {quantityreceived} >= {quantity} AND {quantitybilled} >= {quantity} THEN 'Fully Billed' 
WHEN {isclosed} = 'T' THEN 'Closed' 
WHEN {quantityreceived} < {quantity} AND {quantityreceived} > 0 AND {quantitybilled} < {quantityreceived} THEN 'Pending Billing/Partially Received' 
WHEN {quantityreceived} < {quantity} AND {quantityreceived} > 0 AND {quantitybilled} >= {quantityreceived} THEN 'Partially Received' 
WHEN {quantityreceived} < {quantity} AND {quantityreceived} = 0 THEN 'Pending Receipt' 
WHEN {quantityreceived} >= {quantity} AND {quantitybilled} < {quantityreceived} THEN 'Pending Billing' 
ELSE ' '
END