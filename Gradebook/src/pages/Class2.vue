// Refactored version, breaking into components.
<template>
<q-page> 
  <classList></classList>

  <q-dialog v-model="popover">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <q-btn :to="studentLink" :label="popoverData.firstName + ' ' + popoverData.lastName" size="lg" />
        </q-card-section>

        <q-card-section align="center" >
          <q-btn @click="newEntryPos(popoverData.id)" round size="3rem" color="primary" label="+" class="q-pa-sm" name="pos"/>
          <q-input outlined v-model="newComment"  class="q-pa-sm" />
          <q-btn @click="newEntryNeg(popoverData.id)" round size="3rem" color="primary" label="-" class="q-pa-sm" name="neg"/>
          <h4>Current Score: {{ popoverData.score }}</h4>
        </q-card-section>

      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import db from '../boot/firebase'
import classList from '../components/classList.vue'
export default {
  components: {
    classList
  },
  data () {
    return{
      students: [],
      popover: false,
      popoverData: {
        firstName: '',
        lastName: '',
        score: 0,
        id: ''
      },
      newComment: '',
      studentLink: '' 
    }
  },
  methods: {
    popoverLaunch(studentID){
      this.popover = true;
      let index = this.students.findIndex(student => student.id === studentID );
      this.popoverData.firstName = this.students[index].firstName;
      this.popoverData.lastName = this.students[index].lastName;
      this.popoverData.score = this.students[index].score; 
      this.popoverData.id = this.students[index].id;
      this.studentLink = "student/" + this.students[index].id;
      console.log(this.studentLink)
    },
    newEntryPos(studentID){
      let index = this.students.findIndex(student => student.id === studentID );
      let newEntry = {
        comment: this.newComment,
        score: 1
      }
      db.collection("students").doc(studentID).collection("entries").add(newEntry)
       .then((docRef) => {
         console.log("Document written with ID: ", docRef.id)
       })
       .catch((error) => {
         console.error("Error adding document: ", error)
       });
       this.newComment = ''

       let studentRef = db.collection("students").doc(studentID);
       let newScore = this.popoverData.score+1;
       this.popoverData.score = newScore;
       return studentRef.update({
         score: newScore
       })
       .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
    },
    newEntryNeg(studentID){
      let index = this.students.findIndex(student => student.id === studentID );
      let newEntry = {
        comment: this.newComment,
        score: -1
      }
      db.collection("students").doc(studentID).collection("entries").add(newEntry)
       .then((docRef) => {
         console.log("Document written with ID: ", docRef.id)
       })
       .catch((error) => {
         console.error("Error adding document: ", error)
       });
       this.newComment = ''

       let studentRef = db.collection("students").doc(studentID);
       let newScore = this.popoverData.score-1;
       this.popoverData.score = newScore;
       return studentRef.update({
         score: newScore
       })
       .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
      
    }

  },
  mounted() {
    db.collection("students").orderBy('score')
    .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let studentChange = change.doc.data()
          studentChange.id = change.doc.id
            if (change.type === "added") {
                console.log("New task ", studentChange);
                this.students.unshift(studentChange)
            }
            if (change.type === "modified") {
                console.log("Modified task: ", studentChange);
                let index = this.students.findIndex(student => student.id === studentChange.id );
                this.students[index].score = studentChange.score;
            }
            if (change.type === "removed") {
                console.log("Removed task: ", studentChange);
            }
        });
    });
}

}
</script>

