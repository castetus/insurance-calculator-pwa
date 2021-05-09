<template>
  <q-page class="full-width column wrap justify-start items-center content-center q-pt-md">
    <q-form class="">
      <q-select
        @input="calc" 
        v-model="bank" 
        :options="BANKS" 
        label="Банк" 
        class="q-mb-md"
        color="green"/>
      <q-input 
        @input="calc" 
        v-model="debtSum" 
        label="Сумма задолженности" 
        class="q-mb-md"
        color="green"/>
      <q-option-group
        @input="calc" 
        v-model="gender"
        :options="genderOptions"
        color="green"
        right-label
        class="q-mb-md"
      />
      <q-input v-model="birthDate" 
        @focusout="calc" 
        label="Дата рождения"
        mask="##.##.####" 
        color="green"
        class="q-mb-md"/>
      <q-option-group
        @input="calc" 
        v-model="risks"
        :options="riskOptions"
        color="green"
        type="toggle"
        class="q-mb-md"
      />
    </q-form>
    <q-separator inset/>
    <q-markup-table v-if="results.length" :wrap-cells="true" separator="cell" >
      <thead>
        <tr>
          <th>СК</th>
          <th>Текст</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in results" :key="result.id">
          <td>{{result.label}}</td>
          <td>
            <q-btn 
              @click="copyText(result.text)"
              flat 
              color="green" 
              icon="mdi-content-copy" 
              style="float: right"/>
            <p>{{result.text}}</p>
            <!-- <p>{{result.text2}}</p> -->
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-btn 
      @click="copyText(listText)"
      color="green" 
      class="q-my-md" 
      icon="mdi-text-box" 
      label="Список документов" />
    <div style="display: none">{{listText}}</div>
  </q-page>
</template>

<script>
import { copyToClipboard } from 'quasar'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PageIndex',
  data() {
    return {
      bank: null,
      bankOptions: [
        {
          value: 'sber',
          label: 'Сбербанк'
        },
        {
          value: 'vtb',
          label: 'ВТБ'
        },
      ],
      debtSum: null,
      gender: null,
      genderOptions: [
        {
          value: 'male',
          label: 'Муж'
        },
        {
          value: 'female',
          label: 'Жен'
        },
      ],
      birthDate: '',
      risks: [],
      riskOptions: [
        {
          value: 'life',
          label: 'Жизнь'
        },
        {
          value: 'estate',
          label: 'Имущество'
        },
        {
          value: 'title',
          label: 'Титул'
        },
        {
          value: 'long',
          label: 'Пролонгация'
        },
      ],
      results: [],
      listText: ''
    }
  },
  computed: {
    ...mapGetters('insurancecalc', [
      'LIST_TEXT',
      'BANKS',
      'INS_COMPANIES',
      'RATES'
    ]),
    setAge() {
      let age = 0
      if (this.birthDate !== ''){
        const date = this.birthDate.split('.').reverse()
        const dateOfBirth = new Date(date[0], date[1], date[2])
        const now = new Date()
        age = (now - dateOfBirth) / (24 * 3600 * 365.25 * 1000)
      }
      return Math.floor(age)
    },
    setDebt() {
      if (this.bank.value !== 19){
        return this.debtSum * 1.1
      }
      return this.debtSum
    }
  },
  mounted(){
    const isPartner = localStorage.getItem('insurancePartner');
    if (!isPartner && this.$route.path !== '/enter'){
      this.$router.push('/enter');
    }
  },
  methods: {
    copyText(text){
      copyToClipboard(text)
    },
    calcTitleCost(companyId) {
      const company = this.INS_COMPANIES.find(company => company.id === companyId)
      return Math.ceil(this.setDebt * company.banks[this.bank.value].title)
    },
    calcEstateCost(companyId) {
      const company = this.INS_COMPANIES.find(company => company.id === companyId)
      return Math.ceil(this.setDebt * company.banks[this.bank.value].estate)
    },
    calcLifeCost(companyId) {
      const company = this.INS_COMPANIES.find(company => company.id === companyId)
      const lifeType = typeof company.banks[this.bank.value].life
      if (lifeType === 'string'){
        const rate = this.RATES[company.banks[this.bank.value].life]
        return Math.ceil(this.setDebt * rate[this.setAge][this.gender])
      } else {
        return Math.ceil(this.setDebt * company.banks[this.bank.value].life)
      }
    },
    calc() {
      if (!this.risks.length || !this.bank || !this.debtSum){
        return
      }
      if (this.risks.includes('life') && (!this.gender || this.birthDate === '')){
        return
      }
      
      for (let company of this.INS_COMPANIES){
        let insuranceCost = 0
        const result = {}
        const resArr = []

        if (this.risks.includes('life')){
          const calcLifeCost = this.calcLifeCost(company.id)
          insuranceCost = insuranceCost + calcLifeCost
          resArr.push(calcLifeCost)
        }
        if (this.risks.includes('estate')){
          const calcEstateCost = this.calcEstateCost(company.id)
          insuranceCost = insuranceCost + calcEstateCost
          resArr.push(calcEstateCost)
        }
        if (this.risks.includes('title')){
          const calcTitleCost = this.calcTitleCost(company.id)
          insuranceCost = insuranceCost + calcTitleCost
          resArr.push(calcTitleCost)
        }
        const resultSum = Math.ceil((insuranceCost * this.bank.comission * 0.87) / 2)
        result.id = company.id
        result.label = company.label
        result.text = `Комиссия по ${this.bank.label} составляет ${this.setPercentage(this.bank.comission)}. `
        result.text += `Ваша комиссия составит ${resultSum}р.: ((${resArr.join('+')}) × ${this.setPercentage(this.bank.comission)} - 13%) ÷ 2 = ${resultSum}р.`
        
        const oldResult = this.results.findIndex(item => item.id === result.id)
        if (oldResult !== -1){
          this.results.splice(oldResult, 1)
        }
        this.results.push(result)
      }
      this.setListText()
    },
    setPercentage(int){
      return (int * 100) + '%'
    },
    setListText(){
      let text = this.LIST_TEXT.common
      this.risks.forEach((risk) => {
        text += this.LIST_TEXT[risk]
      })
      this.listText = text
    }
  }
}
</script>
