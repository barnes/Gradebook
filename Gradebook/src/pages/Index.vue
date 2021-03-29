<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
    <q-btn fab icon="add" color="accent" @click="showTagEntry"/>
    <q-dialog ref="dialog" persistant>
       <tagEntry></tagEntry>
    </q-dialog>
    </div>
  </q-page>
    
</template>

<script>
import db from 'src/boot/firebase'
import tagEntry from '../components/tagEntry'
export default {
  data () {
    return {
      tagEntryDialog:false
    }
  },
  components: {
    tagEntry
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


