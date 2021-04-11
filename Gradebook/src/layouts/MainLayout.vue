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
        <q-item clickable v-ripple to="/class">
          <q-item-section>
            Example Class
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/78stem">
          <q-item-section>
            7-8 STEM
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/csd">
          <q-item-section>
            CSD
          </q-item-section>
        </q-item>
         <q-item clickable v-ripple to="/5c1">
          <q-item-section>
            5th Grade Cycle 1
          </q-item-section>
        </q-item>
      </q-list>
      <q-list dense bordered padding class="rounded-borders">
        <q-item v-for="clas in classes" :key="clas.id" clickable v-ripple :to="clas.classID">
          <q-item-section>
            <p>{{clas.classID}}</p>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
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