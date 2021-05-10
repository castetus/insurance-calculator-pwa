<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  created(){
    this.$store.dispatch('insurancecalc/GET_DATA');
  }
}
</script>
<style lang="scss">
*{
  box-sizing: border-box;
}
  h1, h2, h3, h4, h5, h6{
    margin: 0;
    text-align: center;
  }
    .q-header{
    width: 100%;
  }
  .text-body2{
    padding: 0 1rem;
  }
  .text-h5{
    margin: 1rem 0;
  }
  .insta-link{
    color: orange;
    background-image: url('./assets/instagram.svg');
    background-size: contain;
    background-position: left;
    padding-left: 20px;
    margin-left: 10px;
    background-repeat: no-repeat;
  }
  .q-table th, .q-table td{
    padding: 7px;
  }
  .q-table__container{
    width: 100%;
  }
</style>