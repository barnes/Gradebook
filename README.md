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