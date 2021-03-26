<template>
  <q-page>
    <div class="q-ma-lg">
      <h2>TEST</h2>
      <q-input filled v-model="newTaskContent" label="Task"  />

      <q-select
        filled
        v-model="newCategoryCont"
        use-input
        use-chips
        multiple
        input-debounce="0"
        @new-value="createCat"
        :options="cats"
        style="width: 250px"
      />
      <q-btn @click="newTask" color="secondary" label="Submit" :disable="!newTaskContent" />
    </div>

    <q-list bordered separator>
      <q-item v-for="task in tasks" :key="task.id">
        <q-item-section>{{ task.name }}</q-item-section>
        <q-item-section>{{ task.cat }}</q-item-section>
        <q-item-section>{{ task.date | relativeDate }}</q-item-section>
        <q-btn @click="deleteTask(task)" color="secondary" label="Delete" />
      </q-item>

    </q-list>
    
    
  </q-page>
</template>

<script>
import db from 'src/boot/firebase'
import { formatDistance, format } from 'date-fns'
export default {
  name: 'Test',
  data () {
    return {
      newTaskContent: '',
      newCategoryCont: '',
      createCat: '',
      tasks: [
      ],
      cats: [

      ]
    }
  },
  methods: {
    newTask() {
      let newTask = {
        name: this.newTaskContent,
        date: Date.now(),
        cat: this.newCategoryCont
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
  filters: {
    relativeDate(value) {
      return format(value, 'MM/dd/yyyy h:m')
    }
  },
  mounted() {
    db.collection("tasks").orderBy('date')
    .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let taskChange = change.doc.data()
          taskChange.id = change.doc.id
            if (change.type === "added") {
                console.log("New task ", taskChange);
                this.tasks.unshift(taskChange)
                this.cats.unshift(taskChange.cat)
                
            }
            if (change.type === "modified") {
                console.log("Modified task: ", taskChange);
            }
            if (change.type === "removed") {
                console.log("Removed task: ", taskChange);
                let index = this.tasks.findIndex(task => task.id === taskChange.id )
                this.tasks.splice(index,1)
                this.cats.splice(index,1)
            }
        });
    });
  }
}
</script>


