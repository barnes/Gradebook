<template>
  <q-layout view="lHh lpR lFf">

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
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: false
    }
  }
}
</script>