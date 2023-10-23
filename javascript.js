function onEdit(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var editedCell = sheet.getActiveCell();
  
  // Check if the edited column is column 4 (D) and the cell value is not empty
  if (editedCell.getColumn() == 4 && editedCell.getValue() !== '') {
    var timestamp = new Date();
    var currentRow = editedCell.getRow();

    // Insert the current date and time in columns 2 and 3
    sheet.getRange(currentRow, 1).setValue(1);
    sheet.getRange(currentRow, 2).setValue(timestamp);
    sheet.getRange(currentRow, 3).setValue(timestamp.toLocaleTimeString());

    // Calculate and set the sum of values in column A from A1 to the edited row
    var sumRange = sheet.getRange("A1:A" + currentRow);
    var values = sumRange.getValues();
    var sum = values.reduce(function(acc, current) {
      return acc + current[0];
    }, 0);
    sheet.getRange(currentRow + 1, 1).setValue(sum);
    sheet.getRange("A1").setValue("Date");
    sheet.getRange("B1").setValue("Time");
    sheet.getRange("C1").setValue("Name");
  }
}
  
// 2nd
function calculateCumulativeFrequency() {
  var sourceSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  var targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet5");

  var arr = sourceSheet.getDataRange().getValues();
  var countByDate = new Map();
  for (var i = 1; i < arr.length-1; i++) {
    var date = new Date(arr[i][1]);
    var formattedDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    var value = arr[i][0];
    if (!countByDate.has(formattedDate)) {
      console.log(formattedDate);
      countByDate.set(formattedDate, 0);
    }
    countByDate.set(formattedDate, countByDate.get(formattedDate) + value);
  }

  var result = [];
  var sum=0;
  for (var [key, value] of countByDate.entries()) {
     sum+=value;
    result.push([key, sum,value]);
  }

 
  // targetSheet.getRange(2,3,counts.length,1).setValue(counts);
  // targetSheet.getRange(2,2,counts.length,1).setValue(values);
  // var heading = ["SW.Date", "Sum", "Diff"];
 targetSheet.getRange("A1").setValue("SW.Date");
 targetSheet.getRange("B1").setValue("Sum");
 targetSheet.getRange("C1").setValue("Diff");
 targetSheet.getRange(2, 1, result.length, 3).setValues(result);
 
}
