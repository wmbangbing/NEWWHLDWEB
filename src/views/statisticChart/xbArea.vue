<template>
  <plotly :ploty_params=ploty_params class="chartArea"/>
</template>

<script>
  import plotly from '@/components/plotly' 

  export default {
    name: '',
    data() {
      return {
        ploty_params:{
          cols: [],
          vals: ["小班面积"],
          rows: ["县/区"],
          rendererName: "柱形图",
        }
      }
    },
    components:{
      plotly
    }
  }
</script>

<style scoped>
  .chartArea{
    widows: 100wh;
    height:100vh-50px;
  }
</style>