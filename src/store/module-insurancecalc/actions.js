import firebase from 'firebase/app'

require('firebase/database')
require('firebase/auth')

export async function GET_DATA ({commit}) {
  try {
    const data = await (await firebase.database().ref().once('value')).val()
    commit('GET_DATA', data)
  } catch (error) {
    console.log(error)
  }
}
export async function SAVE_BANKS({commit}, data){
  try {
    firebase.database().ref('banks').set(
      data
    )
    .then(commit('SAVE_BANKS', data));
    
  } catch (error) {
    console.log(error)
  }
}
export async function SAVE_COMPANIES({commit}, data){

  try {
    firebase.database().ref('companies').set(
      JSON.stringify(data)
    )
    .then(commit('SAVE_COMPANIES', data));
  } catch (error) {
    console.log(error)
  }
}
export async function SAVE_RATES({commit}, data){
  try {
    firebase.database().ref('rates').set(
      JSON.stringify(data)
    )
    .then(commit('SAVE_RATES', data));
  } catch (error) {
    console.log(error)
  }
}
export async function AUTH({commit}, data){
  try {
    const auth = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    if (auth.user.uid){
      this.$router.push('/admin');
      commit('LOGIN', auth.user.uid)
    }
  } catch (error) {
    console.log(error)
  }
}
