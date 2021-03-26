<template>
<q-page>
  <div class="q-pa-md bg-grey-10 text-white">
    <q-list dark bordered separator style="max-width: 100px">
      <q-item clickable v-ripple>
        <q-item-section>RB</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>TS</q-item-section>
      </q-item>
    </q-list>
  </div>

  <div class="q-pa-md text-white">
    <q-list dark bordered separator style="max-width: 100px">
      <q-item clickable v-ripple v-for="student in students" :key="student.name">
        <q-item-section>{{ student.firstName.charAt(0) + student.lastName.charAt(0)  }}</q-item-section>
        <q-item-section>{{ student.score }}</q-item-section>
      </q-item>
    </q-list>
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
          firstName: "Taylor",
          lastName: "Swift",
          score: 0,
          id: 1
        },
      ]
    }
  }

}
</script>

