<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-orange">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Калькулятор
        </q-toolbar-title>

        
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  components: {  },
  data () {
    return {
      leftDrawerOpen: false,
    }
  }
}
</script>
