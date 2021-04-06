<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
    <q-btn fab icon="add" color="accent" @click="showTagEntry"/>
    <q-dialog ref="dialog" persistant>
       <tagEntry></tagEntry>
    </q-dialog>
    <studentEntrySingleLine></studentEntrySingleLine>
    </div>
  </q-page>
    
</template>

<script>
import db from 'src/boot/firebase'
import tagEntry from '../components/tagEntry'
import studentEntry from '../components/studentEntry'
import StudentEntry from '../components/studentEntry.vue'
import studentEntrySingleLine from '../components/studentEntrySingleLine.vue'
export default {
  
  components: {
    tagEntry,
    //studentEntry,
    studentEntrySingleLine
  }, 
  methods: {
    showTagEntry () {
      this.$q.dialog({
        component: tagEntry
      })
    },
  } 
}


</script>


