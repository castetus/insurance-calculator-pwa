<template>
  <div class="fullscreen bg-white text-orange text-center q-pa-md flex flex-center">
    <div>
      <q-img
        src="./../assets/logo.svg"
        spinner-color="white"
        width="30%"
        
      />
      <h1 color="orange">Калькулятор стоимости ипотечного страхования</h1>

      <div class="text-h2" style="opacity:.4">
        Введите промокод:
      </div>
      <q-input outlined bg-color="white" v-model="promo"></q-input>
      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="orange"
        elevated
        @click="checkCode"
        label="Вход"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Enter',
  data() {
    return{
      promo: '',
    }
  },
  methods: {
    logoPath(){
      return require('../assets/logo.png')
    },
    checkCode(){
      if (this.promo.toLowerCase() === 'partner'){
        this.$router.push('/');
        localStorage.setItem('insurancePartner', true)
      }
    }
  }
}
</script>