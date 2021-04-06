<template>
  <q-page>
      <h1> student Entry </h1>
      <q-input v-model="className" label="Classname" />
       <br />
          <br />
      <div class="col q-pb-md">
        <div v-for="student in students" :key="student.score" >
          <q-input v-model="student.firstName" label="First Name" />
          <q-input v-model="student.lastName" label="Last Name" />
          <br />
          <br />
          <q-separator color="orange" inset/>
        </div>
      </div>
      <q-btn label="add student" color="accent" @click="addField" />
      <q-btn label="submit class" color="accent" @click="submitClass" />
  </q-page>
        
</template>

<script>
import db from '../boot/firebase'
export default {
    name: 'studentEntry',
    data() {
      return {
        className: '',
        students: [
          {
            firstName: '',
            lastName: '',
            score: 0
          },
          {
            firstName: '',
            lastName: '',
            score: 0
          },
          {
            firstName: '',
            lastName: '',
            score: 0
          },
          {
            firstName: '',
            lastName: '',
            score: 0
          },
        ]
      }
    },
    methods: {
      addField() {
        let emptyStudent = {
          firstName: '',
          lastName: '',
          score: 0
        }
        this.students.push(emptyStudent);
      },
      submitClass() {
        
        this.students.forEach(student => {
          db.collection(this.className).add(student)
            .then((docRef) => {
              console.log("Document written with ID: ", docRef.id)
          })
          .catch((error) => {
              console.error("Error adding document: ", error)
          });
        })
      }
    },
    mounted() {
    }
    

}
</script>
