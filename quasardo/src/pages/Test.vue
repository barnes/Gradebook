<template>
  <q-page>
    <div class="q-ma-lg">
      <h2>TEST</h2>
      <q-input filled v-model="newTask" label="Filled" counter />
      <q-btn @click="onClick" color="secondary" label="Secondary" :disable="!newTask" />
    </div>

    <q-list bordered separator>
      <q-item v-for="task in tasks" :key="task.name">
        <q-item-section>{{ task.name }}</q-item-section>
      </q-item>

      <q-item>
        <q-item-section>Single line item</q-item-section>
      </q-item>
    </q-list>
    
    
  </q-page>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      newTask: '',
      tasks: [
        {name: 'task 1'},
        {name: 'task 2'}
      ]
    }
  },
  methods: {
    onClick() {
      console.log("clicked");
    }
  }
}
</script>
