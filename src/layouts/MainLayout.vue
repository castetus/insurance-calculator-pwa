<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-orange">
      <q-toolbar>
        <q-btn
          v-if="login"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Калькулятор стоимости ипотечного страхования
        </q-toolbar-title>

        
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-1"
      v-if="login"
    >
      <q-list>
        <q-item to="/" clickable v-ripple>
          <q-item-section>
            Калькулятор
          </q-item-section>
        </q-item>
        <q-item to="/admin" clickable v-ripple>
          <q-item-section>
            Ввод данных
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
  name: 'MainLayout',
  components: {  },
  data () {
    return {
      leftDrawerOpen: false,
    }
  },
  computed: {
    login(){
      console.log(this.$store.getters['insurancecalc/UID'])
      return this.$store.getters['insurancecalc/UID']
    }
  }
}
</script>
