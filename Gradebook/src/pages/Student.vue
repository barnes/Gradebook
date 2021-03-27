<template>
    <q-page>
        <h1>{{ student.firstName + ' ' + student.lastName }}</h1>
        <h2>Score: {{ student.score }} </h2>
        <q-list>
            <q-item v-for="entry in entries" :key="entry.id">
                <h4>{{ entry.comment }}</h4>
                <q-btn label="delete"/>
            </q-item>
        </q-list>
    </q-page>
</template>

<script>
import db from '../boot/firebase'
//let studentID = this.$route.params.id;
//console.log(studentID);
export default {
  data () {
    return{
        student: {
            firstName: '',
            lastName: '',
            score: 0
         },
        entries: []

      
    }
  },
  methods: {
      test() {
          console.log(this.$route.params.id);
      }
  },
  mounted() {
    db.collection("students").doc(this.$route.params.id)
    .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        console.log(doc.data().firstName);
        this.student.firstName = doc.data().firstName;
        this.student.lastName = doc.data().lastName;
        this.student.score = doc.data().score;
    });
    db.collection("students").doc(this.$route.params.id).collection("entries")
    .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let entryChange = change.doc.data()
          entryChange.id = change.doc.id
            if (change.type === "added") {
                console.log("New task ", entryChange);
                this.entries.unshift(entryChange)
            }
            if (change.type === "modified") {
                console.log("Modified task: ", entryChange);
            }
            if (change.type === "removed") {
                console.log("Removed task: ", entryChange);
            }
        });
    });
  }
  
}


</script>