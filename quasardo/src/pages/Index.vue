<template>
  <q-page>
    <div class="q-ma-xl q-px-xl">

        <q-input
          filled
          v-model="newTaskContent"
          label="Enter a task."
        />

        <div>
          <q-btn @click="onSubmit" label="Submit" type="submit" color="primary" />
        </div>
        <q-btn @click="onOkay" label="okay" type="okay" color="secondary" />
    </div>


    <div class="q-px-xl q-ma-xl">
      <q-list>
        <q-item v-for="task in tasks" :key="task">
          <q-card class="my-card">
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">Task Content</div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="left">
              <q-btn flat>Task Complete</q-btn>
            </q-card-actions>
          </q-card>
        </q-item>
      </q-list>
    </div>


    

  </q-page>
</template>

<script>
import db from 'src/boot/firebase'
export default {
  name: 'PageIndex',
  data() {
    return {
      newTaskContent: '',
      tasks: [
        {task: "Task 1"},
        {task: "Task 2"}
      ]
    }
  },
  methods: {
    onSubmit() {
      console.log(newTask)
      // let newTask = {
      //   content: this.newTaskContent,
      // }
      
      //this.newTaskContent = ''
    },
    onOkay() {
      console.log('OKAY')
    }
  }
}
</script>


// <script>
// import { formatDistance } from 'date-fns'
// import  db  from 'src/boot/firebase'
// export default {
//   name: "PageHome",
//   data() {
//     return {
//       newQweetContent: '',
//       qweets: [

//       ]
//     }
//   },
//   methods: {
//     addNewQweet() {
//       let newQweet = {
//         content: this.newQweetContent,
//         date: Date.now(),
//         liked: false,
//       }
//       // Add a new document with a generated id.
//       db.collection("qweets").add(newQweet)
//       .then((docRef) => {
//         console.log("Document written with ID: ", docRef.id)
//       })
//       .catch((error) => {
//         console.error("Error adding document: ", error)
//       });
//       this.newQweetContent = ''
//     },
//     deleteQweet(qweet){
//       db.collection("qweets").doc(qweet.id).delete().then(() => {
//         console.log("Document successfully deleted!")
//       }).catch((error) => {
//         console.error("Error removing document: ", error)
//       })
//     },
//     toggleLike(qweet){
//       db.collection("qweets").doc(qweet.id).update({
//           liked: !qweet.liked
//       })
//       .then(() => {
//           console.log("Document successfully updated!");
//       })
//       .catch((error) => {
//           // The document probably doesn't exist.
//           console.error("Error updating document: ", error);
//       });
//     }
//   },
//   filters: {
//     relativeDate(value) {
//       return formatDistance(value, new Date())
//     }
//   },
//   mounted() {
//     db.collection('qweets').orderBy('date').onSnapshot((snapshot) => {
//       snapshot.docChanges().forEach((change) => {
//           let qweetChange = change.doc.data()
//           qweetChange.id = change.doc.id
//           if (change.type === "added") {
//               console.log("New qweet: ", qweetChange)
//               this.qweets.unshift(qweetChange)
//           }
//           if (change.type === "modified") {
//               console.log("Modified qweet: ", qweetChange)
//               let index = this.qweets.findIndex(qweet => qweet.id === qweetChange.id)
//               Object.assign(this.qweets[index], qweetChange)
//           }
//           if (change.type === "removed") {
//               console.log("Removed qweet: ", qweetChange)
//               let index = this.qweets.findIndex(qweet => qweet.id === qweetChange.id)
//               this.qweets.splice(index, 1);
//           }
//       });
//     });
//   }
// };
// </script>
