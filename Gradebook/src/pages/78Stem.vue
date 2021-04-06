<template>
<q-page>
    
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="add" color="accent" @click="showTagEntry"/>
  </q-page-sticky>
    <q-dialog ref="dialog" persistant>
       <tagEntry></tagEntry>
    </q-dialog>

    <div class="q-pa-sm">
        <h2>7-8 STEM Q4</h2>
    </div>
  <div class="q-pa-md row text-white q-gutter-md">
      
    <div v-for="student in students" :key="student.name" @click="popoverLaunch(student.id)">
      <q-btn round size="3rem" color="primary" :label="student.firstName.charAt(0) + student.lastName.charAt(0)" />
    </div>
  </div>

  <q-dialog v-model="popover">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <q-btn :to="studentLink" :label="popoverData.firstName + ' ' + popoverData.lastName" size="lg" />
        </q-card-section>

        <q-card-section align="center" >
          <q-btn @click="newEntryPos(popoverData.id)" round size="3rem" color="primary" label="+" class="q-pa-sm" name="pos"/>
          <q-input outlined v-model="newComment" label="comment"  class="q-pa-sm" />
          <q-input outlined v-model="tagDisplay"  label="tags" class="q-pa-sm" disable />
          <q-item v-for="(tag) in tags" :key="tag.id">
            <q-btn :label="tag.tag" size="sm" @click="addTag(tag.tag)" />
          </q-item>
          <q-btn @click="newEntryNeg(popoverData.id)" round size="3rem" color="primary" label="-" class="q-pa-sm" name="neg"/>
          <h4>Current Score: {{ popoverData.score }}</h4>
        </q-card-section>

      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import db from '../boot/firebase'
import studentEntry from '../components/studentEntry'
import tagEntry from '../components/tagEntry'
export default {
  components: {
    tagEntry
  },
  data () {
    return{
      classID: '78stem',
      students: [],
      tags: [],
      popover: false,
      popoverData: {
        firstName: '',
        lastName: '',
        score: 0,
        id: ''
      },
      newComment: '',
      tagDisplay: [],
      newTagList: [],
      studentLink: '' 
    }
  },
  methods: {
    showTagEntry () {
      this.$q.dialog({
        component: tagEntry
      })
    },
    addTag(tag){
      if(this.newTagList.includes(tag)){
        let index=this.newTagList.findIndex(tagIn => tagIn === tag );
        this.newTagList.splice(index,1);
      } else {
        this.newTagList.push(tag);
      }
      console.log(this.newTagList)
      this.tagDisplay = this.newTagList;
    },
    popoverLaunch(studentID){
      this.popover = true;
      let index = this.students.findIndex(student => student.id === studentID );
      this.popoverData.firstName = this.students[index].firstName;
      this.popoverData.lastName = this.students[index].lastName;
      this.popoverData.score = this.students[index].score; 
      this.popoverData.id = this.students[index].id;
      this.studentLink = "student/" + this.classID + "/" + this.students[index].id;
      console.log(this.studentLink)
    },
    newEntryPos(studentID){
      let index = this.students.findIndex(student => student.id === studentID );
      let newEntry = {
        comment: this.newComment,
        score: 1,
        tags: this.newTagList
      }
      db.collection(this.classID).doc(studentID).collection("entries").add(newEntry)
       .then((docRef) => {
         console.log("Document written with ID: ", docRef.id)
       })
       .catch((error) => {
         console.error("Error adding document: ", error)
       });
       this.newComment = '';
       this.newTagList = [];

       let studentRef = db.collection(this.classID).doc(studentID);
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
        score: -1,
        tags: this.newTagList
      }
      db.collection(this.classID).doc(studentID).collection("entries").add(newEntry)
       .then((docRef) => {
         console.log("Document written with ID: ", docRef.id)
       })
       .catch((error) => {
         console.error("Error adding document: ", error)
       });
       this.newComment = '';
       this.newTagList = [];

       let studentRef = db.collection(this.classID).doc(studentID);
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
    db.collection(this.classID).orderBy('score')
    .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let studentChange = change.doc.data()
          studentChange.id = change.doc.id
            if (change.type === "added") {
                console.log("New student ", studentChange);
                this.students.unshift(studentChange)
            }
            if (change.type === "modified") {
                console.log("Modified student: ", studentChange);
                let index = this.students.findIndex(student => student.id === studentChange.id );
                this.students[index].score = studentChange.score;
            }
            if (change.type === "removed") {
                console.log("Removed student: ", studentChange);
            }
        });
    });

    db.collection("tags")
    .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let tagChange = change.doc.data()
          tagChange.id = change.doc.id
            if (change.type === "added") {
                console.log("New tag ", tagChange);
                this.tags.unshift(tagChange)
            }
            if (change.type === "modified") {
                console.log("Modified tag: ", tagChange);
            }
            if (change.type === "removed") {
                console.log("Removed tag: ", tagChange);
            }
        });
    });
}

}
</script>

