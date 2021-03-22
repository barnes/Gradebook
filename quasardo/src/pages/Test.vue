<template>
  <q-page>
    <div class="q-ma-lg">
      <h2>TEST</h2>
      <q-input filled v-model="newTask" label="Filled" counter />
      <q-btn @click="onClick" color="secondary" label="Secondary" :disable="!newTask" />
    </div>
    
    
  </q-page>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      newTask: ''
    }
  },
  methods: {
    onClick() {
      console.log("clicked");
    }
  }
}
</script>
