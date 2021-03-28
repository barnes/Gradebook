<template>
    <h1> student Entry </h1>
      <!-- <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <q-btn :to="studentLink" :label="popoverData.firstName + ' ' + popoverData.lastName" size="lg" />
        </q-card-section>

        <q-card-section align="center" >
          <q-btn @click="newEntryPos(popoverData.id)" round size="3rem" color="primary" label="+" class="q-pa-sm" name="pos"/>
          <q-input outlined v-model="newComment"  class="q-pa-sm" />
          <q-btn @click="newEntryNeg(popoverData.id)" round size="3rem" color="primary" label="-" class="q-pa-sm" name="neg"/>
          <h4>Current Score: {{ popoverData.score }}</h4>
        </q-card-section>

      </q-card> -->
</template>

<script>
export default {
    name: 'studentEntry',
    props: {
        studentLink: String,
        popoverData: Object,
        newComment: String
    },
    

}
</script>
