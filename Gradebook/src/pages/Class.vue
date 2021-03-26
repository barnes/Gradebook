<template>
<q-page>
  

  <div class="q-pa-md row text-white q-gutter-md">
    <div v-for="student in students" :key="student.name">
      <q-btn round size="3rem" color="primary" :label="student.firstName.charAt(0) + student.lastName.charAt(0)" />
    </div>
  </div>

  </q-page>
</template>

<script>
export default {
  data () {
    return{
      students: [
        {
          firstName: "Taylor",
          lastName: "Swift",
          score: 0,
          id: 1
        },
        {
          firstName: "Harry",
          lastName: "Styles",
          score: 0,
          id: 1
        },
        {
          firstName: "Harry",
          lastName: "Styles",
          score: 0,
          id: 1
        },
        {
          firstName: "Harry",
          lastName: "Styles",
          score: 0,
          id: 1
        },
        {
          firstName: "Harry",
          lastName: "Styles",
          score: 0,
          id: 1
        },
        {
          firstName: "Harry",
          lastName: "Styles",
          score: 0,
          id: 1
        },
        {
          firstName: "Harry",
          lastName: "Styles",
          score: 0,
          id: 1
        },
        {
          firstName: "Harry",
          lastName: "Styles",
          score: 0,
          id: 1
        },
        {
          firstName: "Harry",
          lastName: "Styles",
          score: 0,
          id: 1
        },
        {
          firstName: "Harry",
          lastName: "Styles",
          score: 0,
          id: 1
        },
      ]
    }
  }

}
</script>

