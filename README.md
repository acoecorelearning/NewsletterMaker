# NewsletterMaker
A Google Apps Script that parses Form data from a Google Sheet and creates an email for parents and students with weekly assignment updates submitted by teachers.
The form is customized for a school that takes in 3 questions per class.  The Script will look at the Announcement Type for a class. Then it will look at the 3 questions and create an HTML email that also translates into Spanish using Google's Language.

It will only run on the spreadsheet that is linked to the script. 

Installation notes:

1. Create a Google Form based on this template: https://docs.google.com/forms/d/1p3QpIV7QAmgrK5HuXNY722yno4q9FpdtnFtvQOYLHN4/viewform 
2. Activate the Spreadsheet that collects responses. 
3. In the Google spreadsheet, select Tools > Script Editor. This will launch Google Apps Scripts. 
4. Replace the contents of Code.gs with the the Code.gs contents of the NewsLetterMaker 
5. Create a new HTML File in the same instance of Google Apps Scripts that is connected to the Spreadsheet and name it index.html. This will contain the sidebar. 
6. Paste the contents of the NewsletterMaker index.html file
7. Create a another HTML file and name it about.html and paste about.html contents. 
8. Save all files using the outdated floppy disk icon (red asterisk will dissppear when saved). 
9. The first time the script will run, you will need to Authorize the Script to access your Google Services. 

Usage notes:
1. Share the Form link with all teachers and ask them to choose their class, and enter the information for the week "This week in class, students will: " etc. 
2. Once all teachers have submitted their updates, go to the Spreadsheet and reload if necessary. A NewsLetterMaker menu item should appear along with the other Spreadsheet Menu items.
3. Click on the MakeNewsletter option.
4. Enter an email to be the main recipient and a subject line, which should incude the date or week. 
5. Click Send.
6. Verify the content looks good on the recipient's end, make translation adjustments, etc. 
7. Send to whole group!
8. Delete all rows of the incoming Form data so it is ready for the next session. If you want to preserve the data, then copy and paste it into another sheet. 


***** Note******
Further updates could include adding a preview window, options for choosing sheet columns for data, saving user preferences. 
