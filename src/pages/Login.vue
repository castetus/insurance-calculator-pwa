<template>
  <div class="fullscreen bg-orange text-white text-center q-pa-md flex flex-center">
    <div>
      <h1>Калькулятор стоимости ипотечного страхования</h1>

      <div class="text-h2" style="opacity:.4">
        Вход для администратора
      </div>
      <q-input v-model="email" bg-color="white" type="email" hint="Email" />
      <q-input v-model="password" bg-color="white" type="password" hint="Password" />
      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        @click="login"
        label="Вход"
        no-caps
      />
      <div>{{message}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return{
      email: '',
      password: '',
      message: '',
    }
  },
  methods: {
    login(){
      this.$store.dispatch('insurancecalc/AUTH', {email: this.email, password: this.password})
    }
  }
}
</script>