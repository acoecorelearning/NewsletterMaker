 
/*
* This is the main Code.gs file that runs on the Sreadsheet. Replace the Code.gs in Apps Script with this code below. 
* It opens a sidebar with a place to set recipient of email and subject, and sends a constructed HTML email from data in the columns
* that correspond to the classes in column 1 of the spreadsheet.
* It also translates all The English into Spanish. 
*/

//method that takes in the title and the 3 messages and constructs an HTML message.
function constructEnglishMsg(title,mssg,messg2,messg3){

 
    var mathMsg = "<ul><li>This week in <b style='color:purple'>"+title+"</b> students will: "+mssg+"</li><li>For independent work, students should: "+messg2+"</li><li>Check in with your students about: "+messg3+"</li></ul>";
    
    return mathMsg;


}
//simple translation from source to destination language
function translateFromEngToSpan(text){

  var esp = LanguageApp.translate(text, 'en', 'es');
   Logger.log("Espanol: " + esp);
   
   //not sure why it thinks Mates is math ?
   esp = esp.replace("Mates", "Matemáticas");
   
   return esp;

}

function constructSpanishMsg(title,mssg,mssg2,mssg3){

    //translate:
    var titulo = translateFromEngToSpan(title);
    var msj=translateFromEngToSpan(mssg);
    var msj2=translateFromEngToSpan(mssg2);
    var msj3=translateFromEngToSpan(mssg3);
    
    

   var mensaje = "<ul><li>Esta semana en <b style='color:purple'>" +titulo+"</b> los almunos : "+ msj + "</li><li>Para su trabajo independient, deberán: " +msj2+"</li><li>Hable con su hijo/a acerca de: "+msj3+"</li></ul>";

  return mensaje;

}

function sendEmailToRecipients(to, subj){

  //dedlare the sheet based on the active sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  
  //grab all the values on the sheet
  var data = sheet.getDataRange().getValues();
  
  var genMessg = '';
  var genMessgEsp='';
  
  //an array to store all the messages
  var messages =[];
  // y en espa˜õl
  var mensajes=[];
 
  //to hold the data that constructs message
  var title, messg, messg2,messg3 ='';
  
  //two separate headers
  var headOfMsgEng="<h1 style='padding:20px; background-color:purple; color:#ffffff;'>6th Grade Weekly Newsletter</h1>";
  var headOfMsgSpan="<h1 style='padding:20px; background-color:green; color:#ffffff;'>Grado 6, Actualización semanal</h1>";
  
  //these will hold the constructed message
  var messgEng="";
  var messgSpan = "";
  
  //the final body of the email
  var payload="";
  
  
  //go through each row of the spreadsheet
  for (var i = 1; i < data.length; i++){
  
    //grab the right columns for title and our 3 messages
    //col. 0 has the timestamp, we don't need
   
    title= data[i][1];  //col 1 has title
    messg=data[i][2];  //col 2-4 have the messages the teacher inputs
    messg2=data[i][3];
    messg3=data[i][4];
    
    if(title=="General Announcement"){
   
    //the fifth column will have optional general announcement. 
    var toTranslate= data[i][5];
    var translatedGenMsg = translateFromEngToSpan(toTranslate);
    Logger.log(translatedGenMsg);
    
    genMessg = "<p >Announcement: <i style='color:red'>"+data[i][5]+"</i><p>";
    genMessgEsp ="<p >Anuncio: <i style='color:red'>"+translatedGenMsg+"</i><p>";
    
    }else{
    
    
    //send to the HTML & Spanish factory! and fill our array with our messages
    messages.push(constructEnglishMsg(title,messg,messg2,messg3));
    mensajes.push(constructSpanishMsg(title,messg,messg2,messg3));
   
    
    }
    
   
  
  }
  
 
//declare english message
 
  
 
 for(var j = 0; j<messages.length; j++){
 
 
   //now organize them in English
    
    
    messgEng = messgEng + "<p></p> " + messages[j];
    
     
 
 }
 
 for(var k =0; k<mensajes.length; k++){
 
     //and in Spanish
    messgSpan = messgSpan + "<p></p> " + mensajes[k];
 
 
 }
 
 
 
 //now stitch it all together, if there is a general message, add it here
 if(genMessg!=''){
 
 Logger.log('we have a gen message in spanish :' + genMessgEsp);
 
   payload = headOfMsgEng +genMessg+ messgEng + headOfMsgSpan+ genMessgEsp + messgSpan;
 
 } else{
 
 
 
   payload = headOfMsgEng + messgEng + headOfMsgSpan +  messgSpan;
}
  
//send our mail!

MailApp.sendEmail({
      to:to,
      subject:subj,
      htmlBody:payload});

}


function createNewsletter(){
 
 var html = HtmlService.createHtmlOutputFromFile('index')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setTitle('Create Newsletter')
      .setWidth(300);
      
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);
  
}
function showAbout(){
 
 var html = HtmlService.createHtmlOutputFromFile('about')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setWidth(500);
      
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showModalDialog(html, 'About');
  
}

function onOpen(e) {
  // Add a custom menu to the spreadsheet.
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .createMenu('NewsLetterMaker')
      .addItem('Make Newsletter', 'createNewsletter')
      .addItem('About','showAbout')
      .addToUi();
  
  
}


function onInstall(e) {
  onOpen(e);
}
