<template>
  <q-page
    class="full-width column wrap justify-start items-center content-center q-pt-md"
  >
    <h1 class="text-h5">Калькулятор страхования ипотеки</h1>
    <p class="text-body2 text-justify">
      Это удобное мобильное приложение "2 in 1", в котором специалист по
      недвижимости может моментально рассчитать стоимость ипотечного полиса для
      клиента и свою комиссию.
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
    <q-form class="">
      <q-select
        @input="calc"
        v-model="bank"
        :options="BANKS"
        label="Банк"
        class="q-mb-md"
        color="green"
      />
      <q-input
        @input="calc"
        v-model="debtSum"
        label="Сумма задолженности"
        class="q-mb-md"
        color="green"
      />
      <q-option-group
        @input="calc"
        v-model="gender"
        :options="genderOptions"
        color="green"
        right-label
        class="q-mb-md"
      />
      <q-input
        v-model="birthDate"
        @focusout="calc"
        label="Дата рождения"
        mask="##.##.####"
        color="green"
        class="q-mb-md"
      />
      <q-option-group
        @input="calc"
        v-model="risks"
        :options="riskOptions"
        color="green"
        type="toggle"
        class="q-mb-md"
      />
    </q-form>
    <div
      v-if="results.length"
      style="display: contents"
      class="items-center content-center"
    >
      <q-separator />
      <h6 class="text-h5">Расчет для клиентов</h6>
      <q-markup-table>
        <thead>
          <tr>
            <th>СК</th>
            <th>Стоимость, руб</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="result in results" :key="result.id">
            <td>{{ result.label }}</td>
            <td>
              <p class="q-mb-none" v-if="result.life">Жизнь: {{ result.life }}</p>
              <p class="q-mb-none" v-if="result.estate">Имущество: {{ result.estate }}</p>
              <p class="q-mb-none" v-if="result.title">Титул: {{ result.title }}</p>
              <p class="q-mb-none">Итого: {{ result.clientSum }}</p>
            </td>
            <td>
              <q-btn
                @click="copyText(result.clientText)"
                flat
                color="green"
                icon="mdi-content-copy"
                style="float: right"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <p class="text-body2 text-justify q-mt-md">
        Вы можете скопировать результаты расчета для клиента по каждой страховой
        кликнув на иконку "Копировать"
      </p>
      <q-separator inset />
      <h6 class="text-h5">Расчет для партнеров</h6>
      <q-markup-table :wrap-cells="true" separator="cell">
        <thead>
          <tr>
            <th>СК</th>
            <th>Текст</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="result in results" :key="result.id">
            <td>{{ result.label }}</td>
            <td>
              <q-btn
                @click="copyText(result.text)"
                flat
                color="green"
                icon="mdi-content-copy"
                style="float: right"
              />
              <p>{{ result.text }}</p>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <p class="text-body2 text-justify q-mt-md">
        В нашей партнерской программе работает простая формула округления
        комиссии до сотен рублей в большую сторону, и это всегда не менее 1000
        руб. Никаких вычетов налогов. Ровно 50% от комиссии страховой компании.
      </p>
      <q-btn
        @click="copyText(listText)"
        color="green"
        class="q-my-md"
        icon="mdi-text-box"
        label="Список документов"
      />
      <p class="text-body2 text-justify q-mt-md">
        Вы можете скопировать (в буфер) для себя и своего клиента список
        документов, которые необходимы для оформления полисов в зависимости от
        выбранных рисков.
      </p>
      <div style="display: none">{{ listText }}</div>
      <h6 class="text-h5">Посчитали, что дальше?</h6>
      <p class="text-body2 text-justify q-mt-md">
        Это предварительный расчет, который можно озвучить клиенту. Однако, у
        страховых часто меняются тарифы, мы это, конечно, отслеживаем и
        актуализируем коэффициенты. Но точный расчет производится при
        оформлении, поэтому
        <a class="text-orange-5" href="https://wa.me/79219532923">пишите</a>
        Антону Храмову, Вашему страховому брокеру. Или звоните
        <a class="text-orange-5" href="tel:+79219532923">+7 (921) 953-29-23</a>
      </p>
      <div class="q-mt-md text-center">
        <a
          class="text-orange-5"
          target="blank"
          href="https://taplink.cc/khramov_insur"
          >Ссылки на контакты и сайты</a
        >
      </div>
      <div class="q-mt-md text-center">
        <a
          class="insta-link"
          target="blank"
          href="https://www.instagram.com/khramov_insur/"
          >@khramov_insur</a
        >
      </div>
      <p class="text-body2 text-justify q-mt-md">
        P.S. За рекомендацию коллегам при оформлении полиса для любого банка Вы
        получаете 1000 руб.
      </p>
    </div>
    <q-tooltip v-if="copyBanner" v-model="copyBanner">Текст скопирован</q-tooltip>
  </q-page>
</template>

<script>
import { copyToClipboard } from "quasar";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PageIndex",
  data() {
    return {
      bank: null,
      bankOptions: [
        {
          value: "sber",
          label: "Сбербанк"
        },
        {
          value: "vtb",
          label: "ВТБ"
        }
      ],
      debtSum: null,
      gender: null,
      genderOptions: [
        {
          value: "male",
          label: "Муж"
        },
        {
          value: "female",
          label: "Жен"
        }
      ],
      birthDate: "",
      risks: [],
      riskOptions: [
        {
          value: "life",
          label: "Жизнь"
        },
        {
          value: "estate",
          label: "Имущество"
        },
        {
          value: "title",
          label: "Титул"
        },
        {
          value: "long",
          label: "Пролонгация"
        }
      ],
      results: [],
      listText: "",
      copyBanner: false
    };
  },
  computed: {
    ...mapGetters("insurancecalc", [
      "LIST_TEXT",
      "BANKS",
      "INS_COMPANIES",
      "RATES"
    ]),
    setAge() {
      let age = 0;
      if (this.birthDate !== "") {
        const date = this.birthDate.split(".").reverse();
        const dateOfBirth = new Date(date[0], parseInt(date[1]) - 1, date[2]);
        const now = new Date();
        age = (now - dateOfBirth) / (24 * 3600 * 365.25 * 1000);
      }
      return Math.floor(age);
    },
    setDebt() {
      if (this.bank.value !== 19) {
        return Math.round(this.debtSum * 1.1);
      }
      return this.debtSum;
    }
  },
  mounted() {
    const isPartner = localStorage.getItem("insurancePartner");
    if (!isPartner && this.$route.path !== "/enter") {
      this.$router.push("/enter");
    }
  },
  methods: {
    copyText(text) {
      copyToClipboard(text);
      this.copyBanner = true;
      setTimeout(() => {
        this.copyBanner = false;
      }, 1000);
    },
    calcTitleCost(companyId) {
      const company = this.INS_COMPANIES.find(
        company => company.id === companyId
      );
      return Math.ceil(this.setDebt * company.banks[this.bank.value].title);
    },
    calcEstateCost(companyId) {
      const company = this.INS_COMPANIES.find(
        company => company.id === companyId
      );
      return Math.ceil(this.setDebt * company.banks[this.bank.value].estate);
    },
    calcLifeCost(companyId) {
      const company = this.INS_COMPANIES.find(
        company => company.id === companyId
      );
      const lifeType = typeof company.banks[this.bank.value].life;
      if (lifeType === "string") {
        const rate = this.RATES[company.banks[this.bank.value].life];
        // console.log(this.RATES[company.banks[this.bank.value].life])
        if (!rate[this.setAge] || !rate[this.setAge][this.gender]) {
          console.log('impossible')
          return 0;
        }
        return Math.ceil(this.setDebt * rate[this.setAge][this.gender]);
      } else {
        return Math.ceil(this.setDebt * company.banks[this.bank.value].life);
      }
    },
    calcSum(arr) {
      return Math.round(arr.reduce((acc, i) => {
        return acc + i;
      }));
    },
    calcComission(cost) {
      let comission =
        Math.ceil(Math.ceil((cost * this.bank.comission) / 2) / 100) * 100;
      comission < 1000 && comission > 0 ? (comission = 1000) : comission;
      this.bank.comission === 0 ? comission = 0 : comission
      return comission;
    },
    calc() {
      this.results = [];
      if (!this.risks.length || !this.bank || !this.debtSum) {
        return;
      }
      if (
        this.risks.includes("life") &&
        (!this.gender || this.birthDate === "")
      ) {
        return;
      }

      for (let company of this.INS_COMPANIES) {
        if (!company.banks[this.bank.value]) {
          return;
        }
        let insuranceCost = 0;
        const result = {};
        const resArr = [];

        if (this.risks.includes("life")) {
          const calcLifeCost = this.calcLifeCost(company.id);
          insuranceCost = insuranceCost + calcLifeCost;
          resArr.push(calcLifeCost);
          result.life = calcLifeCost;
        }
        if (this.risks.includes("estate")) {
          const calcEstateCost = this.calcEstateCost(company.id);
          insuranceCost = insuranceCost + calcEstateCost;
          resArr.push(calcEstateCost);
          result.estate = calcEstateCost;
        }
        if (this.risks.includes("title")) {
          let calcTitleCost = this.calcTitleCost(company.id);
          if (isNaN(calcTitleCost)) {
            calcTitleCost = 0;
          }
          insuranceCost = insuranceCost + calcTitleCost;
          resArr.push(calcTitleCost);
          result.title = calcTitleCost;
        }
        const resultSum = this.calcComission(insuranceCost);
        result.id = company.id;
        result.label = company.label;
        result.text = `Комиссия по ${
          this.bank.label
        } составляет ${this.setPercentage(this.bank.comission)}. `;
        result.text += `Ваша комиссия составит ${resultSum}р.: ((${resArr.join(
          "+"
        )}) × ${this.setPercentage(this.bank.comission)}) ÷ 2 = ${resultSum}р.`;
        result.text += ``;
        result.clientText = `${company.label}. Страховая сумма для ${
          this.bank.label
        } ${this.setDebt} руб. Стоимость полиса: ((${resArr.join(
          "+"
        )})=${this.calcSum(resArr)} руб.`;
        result.clientSum = this.calcSum(resArr);

        const oldResult = this.results.findIndex(item => item.id === result.id);
        if (oldResult !== -1) {
          this.results.splice(oldResult, 1);
        }
        this.results.push(result);
      }
      this.setListText();
    },
    setPercentage(int) {
      return int * 100 + "%";
    },
    setListText() {
      let text = this.LIST_TEXT.common;
      this.risks.forEach(risk => {
        text += this.LIST_TEXT[risk];
      });
      this.listText = text;
    }
  }
};
</script>
<style></style>

function newFunction(age) {
	console.log(age, now);
}
