<template>
  <q-page>
    <div class="q-ma-lg">
      <h2>TEST</h2>
      <q-input filled v-model="newTaskContent" label="Filled" counter />
      <q-btn @click="newTask" color="secondary" label="Secondary" :disable="!newTask" />
    </div>

    <q-list bordered separator>
      <q-item v-for="task in tasks" :key="task.id">
        <q-item-section>{{ task.name }}</q-item-section>
        <q-item-section>{{ task.date }}</q-item-section>
        <q-btn @click="deleteTask(task)" color="secondary" label="Delete" />
      </q-item>

    </q-list>
    
    
  </q-page>
</template>

<script>
import db from 'src/boot/firebase'
import { formatDistance } from 'date-fns'
export default {
  name: 'Test',
  data () {
    return {
      newTaskContent: '',
      tasks: [
      ]
    }
  },
  methods: {
    newTask() {
      let newTask = {
        name: this.newTaskContent,
        date: Date.now()
      }
      
       db.collection("tasks").add(newTask)
       .then((docRef) => {
         console.log("Document written with ID: ", docRef.id)
       })
       .catch((error) => {
         console.error("Error adding document: ", error)
       });
       this.newTaskContent = ''
    },
    deleteTask(task) {
      db.collection("tasks").doc(task.id).delete().then(() => {
         console.log("Document successfully deleted!")
       }).catch((error) => {
         console.error("Error removing document: ", error)
       })
    }
  },
  mounted() {
    db.collection("tasks")
    .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let taskChange = change.doc.data()
          taskChange.id = change.doc.id
            if (change.type === "added") {
                console.log("New task ", taskChange);
                this.tasks.unshift(taskChange)
            }
            if (change.type === "modified") {
                console.log("Modified task: ", taskChange);
            }
            if (change.type === "removed") {
                console.log("Removed task: ", taskChange);
                let index = this.tasks.findIndex(task => task.id === taskChange.id )
                this.tasks.splice(index,1)
            }
        });
    });
  }
}
</script>


