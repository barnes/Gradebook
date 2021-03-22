<template>
  <q-page>
    <q-input 
      bottom-slots 
      v-model="newInput"  
      counter 
      maxlength="850" 
      :dense="dense"
      >
      <template v-slot:after>
        <q-btn @click="onClick" round dense flat icon="send" />
      </template>
    </q-input>
    
  </q-page>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      newInput: ''
    }
  },
  methods: {
    onClick() {
      console.log("clicked");
    }
  }
}
</script>
