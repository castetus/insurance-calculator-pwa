<template>
  <div
    class="fullscreen bg-white text-orange text-center q-pa-md flex flex-center"
  >
    <div>
      <q-img src="./../assets/logo.svg" spinner-color="white" width="30%" />
      <h4 class="q-my-lg">Калькулятор стоимости ипотечного страхования</h4>

      <p class="text-body2 text-justify">
        Это удобное мобильное приложение "2 in 1", в котором специалист по
        недвижимости может моментально рассчитать стоимость ипотечного полиса
        для клиента и свою комиссию.
      </p>
      <p class="text-body2 text-justify">
        Промокод для пользования доступен при подписке в
        <a
          class="insta-link"
          href="https://www.instagram.com/khramov_insur/"
          target="blank"
          >@khramov_insur</a
        >
      </p>

      <div class="text-h6" style="opacity:.4">
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
  name: "Enter",
  data() {
    return {
      promo: ""
    };
  },
  methods: {
    logoPath() {
      return require("../assets/logo.png");
    },
    checkCode() {
      if (this.promo.toLowerCase() === "partner") {
        this.$router.push("/");
        localStorage.setItem("insurancePartner", true);
      }
    }
  }
};
</script>
