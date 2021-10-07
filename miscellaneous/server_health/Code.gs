var REPORT_MAIL = 'example@gmail.com';
var REPORT_SUBJECT = 'Server health not ok';
var MAX_AGE_S = 70;
var REPORT_CACHE = 60 * 24 * 93; // keep up to ~3 months of minutely reports

function doGet(e) {
  //SpreadsheetApp.getActiveSheet().getRange("C2").setValue(JSON.stringify(e));
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow([
    e.parameter["timestamp"],
    e.parameter["health"],
    e.parameter["data"],
  ]);
  return ContentService.createTextOutput("ok\n");
}



function check() {
  values = getLastRowValues();
  age_s = calculateAge(values);
  
  if (age_s > MAX_AGE_S) {
    GmailApp.sendEmail(REPORT_MAIL, REPORT_SUBJECT, "The server failed to report its health.\n\nLast report: " + values);
    return;
  }
  if (values[1] != "ok") {
    GmailApp.sendEmail(REPORT_MAIL, REPORT_SUBJECT, "The server doesn't feel ok. You better check up on it!\n\nLast report:" + values);
    return;
  }
}

function cleanLog() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var excess = lastRow - 1 - REPORT_CACHE;
  if (excess > 0) {
    sheet.deleteRows(2, excess);
  }
}



function getLastRowValues() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var range = sheet.getRange(sheet.getLastRow(), 1, 1, sheet.getMaxColumns());
  var vals = range.getValues()[0];
  return vals;
}

function calculateAge(values) {
  return new Date().getTime() / 1000 - parseInt(values[0]);
}
