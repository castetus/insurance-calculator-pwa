export function GET_DATA (state, data) {
  state.ready = true;
  state.banks = data.banks;
  state.insCompanies = JSON.parse(data.companies);
  state.rates = JSON.parse(data.rates);
  // console.log(data.rates)
}
export function SAVE_BANKS (state, data) {
  state.banks = data;
}
export function SAVE_COMPANIES (state, data) {
  state.insCompanies = data;
}
export function SAVE_RATES (state, data) {
  state.rates = data;
}
export function LOGIN(state, uid){
  state.uid = uid;
}