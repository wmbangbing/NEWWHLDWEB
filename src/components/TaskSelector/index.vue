<template>
<div>
  <div class="" style="width:150px;" v-if="visible">
    <el-cascader
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      :options="options"
      filterable
      @change="handleChange">
    ></el-cascader>
  </div>
  <div v-else></div>
</div>

</template>
<script>
import { getFormData } from '@/api/formData'


export default {
  data() {
    return {
      visible:this.taskSelectorParam.visible,
      options:[],
      loading:true
    };

  },
  props:[
    "taskSelectorParam"
  ],
  watch:{
    "taskSelectorParam.visible":function(curVal,oldVal){
      this.visible = true;
      this.createSelectorData()      
    },
    "taskSelectorParam.count":function(curVal,oldVal){
      this.loading =true;
      this.createSelectorData()
      // this.loading =false;    
    }
  },
  created(){},
  methods: {
    createSelectorData(){
      getFormData("task").then(response =>{   
        console.log(response.data);   
        this.options = [];
        let datas = response.data;       
        datas.map((data,index)=>{
          this.options.push({});
          this.options[index].label = data.Title;
          this.options[index].value = data.TId;
          this.options[index].children = [];
          data.Plans.map((plan,idx)=>{
            this.options[index].children.push({});
            this.options[index].children[idx].label = `小班号${plan.XBInfo.XBH}` ;
            this.options[index].children[idx].value = plan.XBInfo.XBH;       
          })
        })
        this.loading = false;
        // console.log(this.options)      
      })
    },
    handleChange(value){
      console.log(value);
      this.$emit('returnXBH',value)
    }
  }
};
</script>
