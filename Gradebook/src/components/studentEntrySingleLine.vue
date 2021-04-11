<template>
  <q-page>
      <h1> student Entry </h1>
      <q-input v-model="className" label="Classname" />
       <br />
          <br />
      <div class="col q-pb-md">
        <div v-for="(student, index) in students" :key="student.score" >
          <q-input v-model="studentName[index]" label="First Name / Last Name" @input="splitName(index)"/>
          <br />
          <br />
          <q-separator color="orange" inset/>
        </div>
      </div>
      <q-btn label="add student" color="accent" @click="addField" v-on:keyup.enter="addField" />
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
        studentName: ['','', '',''],
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
      splitName(index) {
        let splitName = this.studentName[index].split(" ");
        this.students[index].firstName = splitName[0];
        this.students[index].lastName = splitName[1];
        console.log(this.students[index]);
      },
      addField() {
        let emptyStudent = {
          firstName: '',
          lastName: '',
          score: 0
        }
        this.students.push(emptyStudent);
        this.studentName.push('');
      },
      submitClass() {
        
        this.students.forEach(student => {
          db.collection("classes").doc(this.className).collection("students").add(student)
            .then((docRef) => {
              console.log("Document written with ID: ", docRef.id)
          })
          .catch((error) => {
              console.error("Error adding document: ", error)
          });
        });
        db.collection("classes").doc(this.className).set({classID: this.className})
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
      }
    },
    mounted() {
    }
    

}
</script>
