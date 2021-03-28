<template>
    <div class="q-pa-md row text-white q-gutter-md">
        <div v-for="student in students" :key="student.name" @click="popoverLaunch(student.id)">
        <q-btn round size="3rem" color="primary" :label="student.firstName.charAt(0) + student.lastName.charAt(0)" />
        </div>
    </div>
</template>

<script>
    import db from '../boot/firebase'
    export default {
        name: 'classList',
        data () {
            return {
                students: []
            }
        },
        mounted () {
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

