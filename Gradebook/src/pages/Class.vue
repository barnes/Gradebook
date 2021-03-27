<template>
<q-page>
  

  <div class="q-pa-md row text-white q-gutter-md">
    <div v-for="student in students" :key="student.name" @click="popoverLaunch(student.id)">
      <q-btn round size="3rem" color="primary" :label="student.firstName.charAt(0) + student.lastName.charAt(0)" />
    </div>
  </div>

  <q-dialog
      v-model="popover"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">{{ popoverData.firstName + ' ' + popoverData.lastName  }}</div>
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
export default {
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
      newComment: '' 
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
    },
    newEntryPos(studentID){
      let index = this.students.findIndex(student => student.id === studentID );
      let newEntry = {
        score: 1,
        comment: this.newComment
      }
      db.collection("students").doc(studentID).collection("entries").add(newEntry)
       .then((docRef) => {
         console.log("Document written with ID: ", docRef.id)
       })
       .catch((error) => {
         console.error("Error adding document: ", error)
       });
       this.newComment = ''
    },
    newEntryNeg(studentID){
      let index = this.students.findIndex(student => student.id === studentID );
      let newEntry = {
        score: -1,
        comment: this.newComment
      }
      db.collection("students").doc(studentID).collection("entries").add(newEntry)
       .then((docRef) => {
         console.log("Document written with ID: ", docRef.id)
       })
       .catch((error) => {
         console.error("Error adding document: ", error)
       });
       this.newComment = ''
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
            }
            if (change.type === "removed") {
                console.log("Removed task: ", studentChange);
            }
        });
    });
}

}
</script>

