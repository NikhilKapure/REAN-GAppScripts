function Initialize() {
  
  var triggers = ScriptApp.getProjectTriggers();
  
  for(var i in triggers) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  
  ScriptApp.newTrigger("SendGoogleForm")
  .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
  .onFormSubmit()
  .create();
  
}

function SendGoogleForm(e) 
{  
  try 
  {  
    var form = FormApp.openById('11AtQSJngKPyJt2LKMs-TYJ_OuT7tNLG_xe9KQfqeFjE');
    form.setCollectEmail(true)
    var responses=form.getResponses()
    var emailTo = []
    for(var i = 0; i < responses.length; i++){
      emailTo[i] = responses[i].getRespondentEmail();
      var UserEmail = emailTo[i];
    }
    Logger.log (UserEmail)
    
    //var email = Session.getActiveUser().getEmail();
    var email_to = "ushr@reancloud.com";
    var email_cc = "krishnan.saidapet@reancloud.com" + "," + "hemanth.palaparthi@reancloud.com";
    var email_bcc = "";
    var subject = "A user has submitted Google Form - REAN Cloud US Support Request";  
    
    var s = SpreadsheetApp.getActiveSheet();
    var columns = s.getRange(1,1,1,s.getLastColumn()).getValues()[0];    
    var message = "<p><strong>Your form - REAN Cloud US Support Request - has a new entry. Here are all the answers.</strong></p>" + "\n\n";
    // Only include form fields that are not blank
    for ( var keys in columns ) {
      var key = columns[keys];
      Logger.log(key);
      if ( e.namedValues[key] && (e.namedValues[key] != "") ) {
        message += "<p><strong>"+key+' :: '+"</strong>"+ e.namedValues[key] + "</p>" + "\n"; 
      }
      
    }
    
    MailApp.sendEmail({
      to: email_to,
      cc: email_cc,
      bcc: email_bcc,
      subject: subject,
      htmlBody: message
    });    
    } catch (e) {
      Logger.log(e.toString());
    }
    
  }
