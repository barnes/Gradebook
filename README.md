# Gradebook
## A stupid fast, stupid simple performance based asssessment tool for project-based classrooms.

-Basic functionality / workflow is "Select a student, add a comment or tag and submit as positive of negative"

## Pages:
* Class: See a grid of all students in a class, 
* Student: See a students report over time, a cumultive score, all submitted notes.
* Settings: Create a class, export reports, etc. Likely many sub-pages here. 

## Schema:
* Student: First Name, Last Name, Score, Grade, ID
* Grade Entry: Student, Pos/Neg, Comment, Tag

### 03/26/21
Scaffolding out the class view page. Using local data objects for the time being. Bringing in all needed Quasar features, getting actions to work well. Next step when the page looks good is to import data from Firebase, and save data to Firebase.

Styling of class page is complete mostly. Perhaps I could instead use these knob components, make it submitable directly on that page. 

Going to bring in the class from Firebase now, and then start using the QDialog component for the popover element. 

Firebase integrated, popover functional, form submitting new 'entry' collection to a student. Need to have that entries score pass back up to the students overall score. Should likely be done in the mount hook.

### 03/27/21
Class page fully functional. Scores live update on completing an entry. Next move is completing a 'Student' page that reports all entries. Afterward I will try to add in tags.

Student page is now loading great, links working from popover. Next step is ability to delete an entry from this page.

Deleting entries works, but does not change score, that needs to be done still. Entries are NOT being removed on the server. No error being thrown, not sure why that is.

Score is now being changed based on deletion, but currently the delete is still not removing the document from the DB.

Delete now fully functional. It was a typo all along. 

Next steps: Add tags. A 'add tag' dialog. Get the list of tags in the popover dialog. Use q-fab for the add tag button.

Code is getting too large in pages. Need to split out into components or something. Going to start with making a new page for adding tags, and trying to import components.

Working to refactor, but getting complicated. Classlist needs to pass down the button press event to the studententry component. Probably not that complicated, but holding off for now.

### 3/28/21

Tags functional. Need a way to make new tags, and a way to display tags on the student page.

Create a new component for tag entry. Try to open it in a different Qdialog. Should be dead simple.

Tag entry component in progess. Need to finish delete function, then try to inject into the class page with a dialog.

Tag entry injected into a dialog with the dialog plugin. A bit tricky to do, but seems to work well for this application at least. 

### 3/31/21
Next steps: Clean up functionality. Do some simple styling to make it look decent. Clean up navigation. When the single class looks good, begin migration to new project with the auth built in. When auth is done, move onto creating an account page, add class page, etc. 

### 4/5/21
Prepping to use in class this semester. Going to more or less brute force it. Student entry on index.
TODO:
* clean up studentEntry component. Enter to add a student, single line with some code to split the string.
* passdown classID prop to student page.
* add rest of classes for this semester
* deploy

