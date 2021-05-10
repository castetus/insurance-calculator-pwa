<template>
  <q-page>
    <h3 class="text-h3">Банки</h3>
    <q-list>
      <q-item>
        <q-item-section>
          ID
        </q-item-section>
        <q-item-section>
          Название
        </q-item-section>
        <q-item-section>
          Комиссия
        </q-item-section>
      </q-item>
      <q-item v-for="bank in banks" :key="bank.id">
        <q-item-section>{{bank.value}}</q-item-section>
        <q-item-section>
          <q-input outlined v-model="bank.label"/>
        </q-item-section>
        <q-item-section>
          <q-input outlined type="number" v-model="bank.comission"/>
        </q-item-section>
      </q-item>
    </q-list>
    <q-btn-group>
      <q-btn label="Добавить" @click="addBank"></q-btn>
      <q-btn label="Сохранить" @click="saveBanks"></q-btn>
    </q-btn-group>
    <q-intersection></q-intersection>
    <h3>Страховые компании</h3>
      <q-card v-for="company in companies" :key="company.id">
          <h5> 
          {{company.label}} </h5>
          Название: <q-input outlined v-model="company.label"></q-input>
          ID: {{company.id}}
        <q-list>
          <q-item v-for="(bank, index) in company.banks" :key="index">
            <q-item-section>
              {{bankName(index)}}
            </q-item-section>
            <q-item-section>
              <q-select label="Жизнь" :options="ratesNames()" v-model="bank.life"></q-select>
            </q-item-section>
            <q-item-section>
              <q-input type="number" label="Имущество" v-model="bank.estate"></q-input>
            </q-item-section>
            <q-item-section>
              <q-input type="number" label="Титул" v-model="bank.title"></q-input>
            </q-item-section>
            <q-item-section>
              <q-btn push @click="removeCompanyBank({company: company.id, bank: index})" label="Удалить"></q-btn>
            </q-item-section>
          </q-item>
        </q-list>
          <q-select label="Добавить банк" v-model="selectedBank" :options="banks" @input="addCompanyBank({id: company.id, bank: selectedBank})"></q-select>
          <q-btn label="Сохранить" @click="saveCompanies"></q-btn>
      </q-card>
      <q-btn @click="addCompany">Добавить страховую</q-btn>
    
    <q-intersection></q-intersection>

    <h3>Тарифы</h3>
      <q-file color="purple-12" v-model="loadedRate" label="Загрузить файл">
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
      <q-btn @click="onUpload">Обработать</q-btn>
    <q-card v-for="(rate, index) in rates" :key="index">
      <h5>{{index}}</h5>
      <q-btn label="Сохранить тарифы" @click="saveRates"></q-btn>
      <q-btn label="Удалить тариф" @click="removeRate(index)"></q-btn>
      <q-list>
        <q-item>
          <q-item-section>
            Возраст
          </q-item-section>
          <q-item-section>
            Муж
          </q-item-section>
          <q-item-section>
            Жен
          </q-item-section>
        </q-item>
        <q-item v-for="(age, i) in rates[index]" :key="i">
          <q-item-section>
            {{i}}
          </q-item-section>
          <q-item-section>
            {{rates[index][i].male}}
          </q-item-section>
          <q-item-section>
            {{rates[index][i].female}}
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
    

  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Papa from 'papaparse'
export default {
  name: 'Admin',
  data() {
    return {
      banks: [],
      companies: [],
      rates: {},
      selectedBank: null,
      loadedRate: null
    }
  },
  watch: {
    READY: function() {
      this.banks = JSON.parse(JSON.stringify(this.BANKS));
      this.companies = JSON.parse(JSON.stringify(this.INS_COMPANIES));
      this.rates = JSON.parse(JSON.stringify(this.RATES));
    }
  },
  computed: {
    ...mapGetters('insurancecalc', [
      'READY',
      'LIST_TEXT',
      'BANKS',
      'INS_COMPANIES',
      'RATES',
      'UID'
    ]),
  },
  mounted(){
    if (!this.UID){
      this.$router.push('/login')
    } 
    if (this.READY){
      this.banks = JSON.parse(JSON.stringify(this.BANKS));
      this.companies = JSON.parse(JSON.stringify(this.INS_COMPANIES));
      this.rates = JSON.parse(JSON.stringify(this.RATES));
    }
  },
  methods: {
    ...mapActions('insurancecalc', [
      'SAVE_BANKS',
      'SAVE_COMPANIES',
      'SAVE_RATES'
    ]),
    bankName(id){
      return this.banks.find(bank => bank.value == id).label
    },
    ratesNames(){
      return Object.keys(this.rates)
    },
    removeBank(index){
      this.banks.splice(index, 1);
    },
    removeCompanyBank(data){
      this.$delete(this.companies.find(comp => comp.id == data.company).banks, data.bank)
    },
    addBank(){
      const ids = [];
      this.banks.forEach(bank => ids.push(bank.value))
      const maxId = ids.sort((a, b) => {return a - b})[ids.length - 1]
      this.banks.push({value: maxId + 1, label: ``, comission: 0})
    },
    addCompany(){
      const ids = [];
      this.companies.forEach(company => ids.push(company.id))
      const maxId = ids.sort((a, b) => {return a - b})[ids.length - 1]
      this.companies.push({
        id: maxId + 1,
        name: '',
        label: '',
        banks: {}
      })
    },
    addCompanyBank(data){
      console.log(data)
      this.companies.find(company => company.id == data.id).banks[data.bank.value] = data.bank
      console.log(this.companies.find(company => company.id == data.id).banks[data.bank])
    },
    onUpload(){
      if (this.loadedRate === null){
        return;
      }
      const parser = Papa.parse(this.loadedRate, {
        complete: (result) => {
          this.parseRate(result.data);
        }
      });
    },
    parseRate(data){
      const rate = {};
      const firstLine = data.splice(0, 1);
      const rateIdentifier = firstLine[0][0].toString();
      data.forEach((item, index) => {
        if (item.length !== 3){
          data.splice(index, 1);
        }
      })
      data.forEach((item) => {
        rate[item[0]] = {}
        rate[item[0]].male = parseFloat((item[1]  * 0.01).toFixed(5));
        rate[item[0]].female = parseFloat((item[2]  * 0.01).toFixed(5));
      })
      this.$set(this.rates, rateIdentifier, rate);
    },
    saveBanks(){
      this.SAVE_BANKS(this.banks)
    },
    saveCompanies(){
      this.SAVE_COMPANIES(this.companies)
    },
    saveRates(){
      this.SAVE_RATES(this.rates)
    },
    removeRate(index){
      this.$delete(this.rates, index);
    }
  }
}
</script>

<style>

</style>