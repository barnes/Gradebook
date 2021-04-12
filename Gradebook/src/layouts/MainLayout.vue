<template>
  <q-layout view="hHh LpR fFf">

    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          Gradebook
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      
      <q-list dense bordered padding class="rounded-borders">
        <q-item clickable v-ripple to="/">
          <q-item-section>
            Home
          </q-item-section>
        </q-item>
        <q-item v-for="clas in classes" :key="clas.id" clickable v-ripple :to="'/class/' + clas.classID">
          <q-item-section>
            {{clas.classID}}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view :key="$route.path"></router-view>
    </q-page-container>

  </q-layout>
</template>

<script>
import db from '../boot/firebase'
export default {
  data () {
    return {
      left: false,
      classes: []
    }
  },
  mounted() {
    db.collection("classes").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let dbChange = change.doc.data()
            if (change.type === "added") {
                console.log("New class ", dbChange);
                this.classes.unshift(dbChange);
            }
            if (change.type === "modified") {
                console.log("Modified class: ", studentChange);
            }
            if (change.type === "removed") {
                console.log("Removed class: ", studentChange);
            }
        });
    });
    
  }
}
</script>