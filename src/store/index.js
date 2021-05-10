import Vue from 'vue'
import Vuex from 'vuex'
// var firebase = require('firebase/app')
import firebase from 'firebase/app';
import insurancecalc from './module-insurancecalc';

Vue.use(Vuex)

const firebaseConfig = {
  apiKey: "AIzaSyBnAsRHrlnjU1m3bUNWR76rGMSOXMZtjoM",
  authDomain: "insurance-calculator-ba1c5.firebaseapp.com",
  projectId: "insurance-calculator-ba1c5",
  storageBucket: "insurance-calculator-ba1c5.appspot.com",
  messagingSenderId: "328345359679",
  appId: "1:328345359679:web:e1891e1fff25b8a9ab2f8a",
  measurementId: "G-YMQMCKE0C4",
  databaseURL: "https://insurance-calculator-ba1c5-default-rtdb.europe-west1.firebasedatabase.app/"
};

firebase.initializeApp(firebaseConfig)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      insurancecalc
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
