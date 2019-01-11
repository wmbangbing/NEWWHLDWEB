<template>
  <div id="area"></div>
</template>

<script>
  import $ from 'jquery'
  import jqueryui from 'jqueryui'
  import pivottable from 'pivottable';
  import "pivottable/dist/pivot.min.css";
  // import c3 from 'c3'
  // import "pivottable/dist/c3_renderers.min.js"
  import "pivottable/dist/plotly_renderers.min.js"
  import "pivottable/dist/pivot.zh.js"

  export default {
    name: '',
    data() {
      return {
        plotyParam:this.plotyParams
      }
    },
    props:['ploty_params'],
    created(){
    },
    mounted(){
      this.$nextTick(function () {
          this.initPivottable()    
      })
    },
    methods: {
      initPivottable(){
        var derivers = $.pivotUtilities.derivers;
        var renderers = $.extend($.pivotUtilities.renderers,
            $.pivotUtilities.plotly_renderers);
        var data = this.$store.getters.cnXBInfo;
        $("#area").pivotUI(     
          this.$store.getters.cnXBInfo,{
            cols:this.ploty_params.cols,
            vals:this.ploty_params.vals,
            rows:this.ploty_params.rows,
            rendererName:this.ploty_params.rendererName,
            // cols: ["县/区"],
            // vals: ["小班面积"],
            // rendererName: "柱形图",
        //   cols: ["区"],
            renderers: $.pivotUtilities.locales.zh.renderers,
            aggregators:$.pivotUtilities.locales.zh.aggregators,
            aggregatorName:"求和",
            localeStrings:$.pivotUtilities.locales.zh.localeStrings,
            // showUI:false,
            // autoSortUnusedAttrs:true,
            unusedAttrsVertical:false
          }
        );
      }
    },
  }
</script>

<style scoped>
  #area{
    width: 50%;
    height: 100%;
  }
</style>