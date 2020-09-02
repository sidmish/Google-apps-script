var bodyTemplate = '<p>Hello [Contact First],</p><p>Kindly arrange UPS pickup for these shipments.</p><p>The labels are attached</p><table cellspacing="0" cellpadding="0" dir="ltr" border="1" style="table-layout:fixed;font-size:10pt;font-family:arial,sans,sans-serif;width:0px;border-collapse:collapse;border:none"><colgroup><col width="170"><col width="227"></colgroup><tbody><tr style="height:21px"><td style="overflow:hidden;padding:2px 3px;vertical-align:bottom;font-family:Arial;border:1px solid rgb(204,204,204)" processed="true">PL- Shipment ID</td><td style="overflow:hidden;padding:2px 3px;vertical-align:bottom;text-align:right;border:1px solid rgb(204,204,204)" processed="true">[PL- Shipment ID]</td></tr><tr style="height:21px"><td style="overflow:hidden;padding:2px 3px;vertical-align:bottom;border:1px solid rgb(204,204,204)" processed="true">SKU:</td><td style="overflow:hidden;padding:2px 3px;vertical-align:bottom;text-align:right;border:1px solid rgb(204,204,204)" processed="true">[SKU]</td></tr><tr style="height:21px"><td style="overflow:hidden;padding:2px 3px;vertical-align:bottom;border:1px solid rgb(204,204,204)" processed="true"># of Cartons</td><td style="overflow:hidden;padding:2px 3px;vertical-align:bottom;text-align:right;border:1px solid rgb(204,204,204)" processed="true">[Cases]</td></tr><tr style="height:21px"><td style="overflow:hidden;padding:2px 3px;vertical-align:bottom;border:1px solid rgb(204,204,204)" processed="true">Product Name on BL</td><td style="overflow:hidden;padding:2px 3px;vertical-align:bottom;text-align:right;border:1px solid rgb(204,204,204)" processed="true">[Name on BL]</td></tr><tr style="height:21px"><td style="overflow:hidden;padding:2px 3px;vertical-align:bottom;font-family:arial;color:rgb(34,34,34);border:1px solid rgb(204,204,204)" processed="true">Attachments:</td><td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) transparent rgb(204,204,204) rgb(204,204,204);overflow:visible;padding:2px 0px;vertical-align:bottom" processed="true"><div style="white-space:nowrap;overflow:hidden;width:515px" processed="true"><div style="float:left" processed="true">[Shipment Name].pdf</div></div></td></tr></tbody></table><p>Thank you,</p>';

function createDraft(recipient,subject,body) {
    var options = {
        name: 'The GSUITE User sending checking the box',
        htmlBody: body,
        cc: 'adam@nutriworldinc.com,georgianne@nutiworldinc.com,heidi@nutriworldinc.com'
    };
    GmailApp.createDraft(recipient, subject, '', options);
}

function onEditCustom(e) {
    var range = e.range;
    var colNumber = range.getColumn();
    var sheet = e.source.getActiveSheet();
    var sheetName = sheet.getName();
    if (colNumber === 9 && sheetName == 'LogShipment') {
        var data = sheet.getRange(range.getRow(), 1, 1, sheet.getLastColumn()).getDisplayValues();
        if (data[0][8] == 'TRUE') {
            var emailBody = createEmailBody(data[0][18], data[0][17], data[0][3], data[0][4], data[0][14], data[0][10]);
            createDraft(data[0][19], data[0][10], emailBody);
        } else {
          Logger.log("check box unchecked");
        }
    };
}

function createEmailBody(contactName, shipmentId, sku, cases, nameOnBl, shipmentName){
  var emailBody = bodyTemplate;
  emailBody = emailBody.replace('[Contact First]', contactName);
  emailBody = emailBody.replace('[PL- Shipment ID]', shipmentId);
  emailBody = emailBody.replace('[SKU]', sku);
  emailBody = emailBody.replace('[Cases]', cases);
  emailBody = emailBody.replace('[Name on BL]', nameOnBl);
  emailBody = emailBody.replace('[Shipment Name]', shipmentName);
  return emailBody;
}