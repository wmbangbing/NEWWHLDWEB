<template>
  <el-dialog
    title="分析图表"
    :visible="visible"
    @close='closeDialog'
    width="90%">
    <!-- <el-scrollbar style="height:100%;"> -->
      <div id="table" style="height:1000px;"></div>
    <!-- </el-scrollbar>    -->
  </el-dialog>
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

import { getFormData } from '@/api/formData'


export default{
  data(){
    return {
      visible:this.pivottableParam.visible,
      renderers:$.renderers
    }
  },
  watch:{
    "pivottableParam.visible":function(curVal,oldVal){
      this.visible = true;
      // if(this.pivottableParam.id === "pivotTableDK"){
      //   this.$nextTick(function () {
      //     this.initPivottable(getList)    
      //   })
      // }else{
      //   this.$nextTick(function () {
      //     this.initPivottable(getFormData)    
      //   })
      // }  
      this.$nextTick(function () {
          this.initPivottable(getFormData)    
      })
      // this.initPivottable(getFormData)    
    }
  },
  props:["pivottableParam"],
  created(){
    // var derivers = $.pivotUtilities.derivers;
    // var renderers = $.extend($.pivotUtilities.renderers,
    //     $.pivotUtilities.plotly_renderers);
      
      // var renderers = $.extend($.pivotUtilities.renderers,$.pivotUtilities.c3_renderers);
  },
  methods:{
    closeDialog(){
      this.visible = false;
    },
    initPivottable(fct){
      // var self = this;
      // fct("XBInfo").then(response => {
      //   console.log(response)
      //   $("#table").pivotUI(
      //     response.data,{
      //       renderers: self.renderers,
      //     }
      //   );
      // })
      var derivers = $.pivotUtilities.derivers;
      // var renderers = $.extend($.pivotUtilities.renderers,
      //     $.pivotUtilities.c3_renderers);
      var renderers = $.extend($.pivotUtilities.renderers,
          $.pivotUtilities.plotly_renderers);

      // renderers = $.pivotUtilities.locales.zh.renderers;

      var data = this.$store.getters.cnXBInfo;
      $("#table").pivotUI(
        this.$store.getters.cnXBInfo,{
          renderers: $.pivotUtilities.locales.zh.renderers,
          aggregators:$.pivotUtilities.locales.zh.aggregators,
          localeStrings:$.pivotUtilities.locales.zh.localeStrings
        }
      );
    }
  }
}
</script>
<style>
.el-dialog{
  display:flex;
  flex-direction:column;
  max-height:calc(100% - 50px);
  max-width:calc(100% - 200px);
}

.el-dialog > .el-dialog__body{
  overflow:auto
}   
/* @import url("https://cdnjs.cloudflare.com/ajax/libs/pivottable/2.20.0/pivot.min.css"); */
/* @import url("https://cdn.bootcss.com/pivottable/2.20.0/pivot.min.css"); */

</style>

