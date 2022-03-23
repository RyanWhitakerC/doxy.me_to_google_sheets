  function fetchcalldata() {

var ss = SpreadsheetApp.getActiveSpreadsheet();        
  var mainSheet = ss.getSheetByName("Sheet1");

  mainSheet.appendRow(["id","startTime","endTime","durationSeconds","roomSlug","providerFirstName", "providerLastName","providerEmail","pidList"]);

 var formData = {
  'email': 'Doxy.Me Email Address',
  'password': 'Doxy.Me Password',
};

var options = {
  'method' : 'post',
  'redirect' : 'follow',
  'payload' : formData
};

var response = UrlFetchApp.fetch('https://api.doxy.me/api/users/login', options);

var login = JSON.parse(response.getContentText());

Logger.log(response.getContentText());
Logger.log(`sessid: ${login["id"]}`);

var getdata = UrlFetchApp.fetch('https://api.doxy.me/api/sessions/exportClinic', { headers: { Authorization: `${login['id']}` } });

Logger.log(getdata.getContentText());

var data = JSON.parse(getdata.getContentText());

for (var i=0;i<data.length;i++){

   mainSheet.appendRow([data[i].id,data[i].startTime,data[i].endTime,data[i].durationSeconds,data[i].roomSlug,data[i].providerFirstName, data[i].providerLastName,data[i].providerEmail,(data[i].pidList).toString()]);
}





}
