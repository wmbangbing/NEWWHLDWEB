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
// import { getFormData } from '@/api/formData'
import { getPassTask } from '@/api/task'
import store from '../../store'


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
      getPassTask(store.getters.district).then(response =>{     
        this.options = [];
        let datas = response.data;
        // console.log(datas);     
        // datas.map((data,index)=>{
        //   this.options.push({});
        //   this.options[index].label = data.Title;
        //   this.options[index].value = data.TId;
        //   this.options[index].children = [];
        //   data.Plans.map((plan,idx)=>{
        //     this.options[index].children.push({});
        //     this.options[index].children[idx].label = `小班号${plan.XBInfo.XBH}` ;
        //     this.options[index].children[idx].value = plan.XBInfo.XBH;       
        //   })
        // })
        var Model = {
          label:"",
          value:"",
          children:[]
        }

        for(let i = 0;i<datas.length;i++){    
          var levelOne = {
            label:datas[i].TaskName,
            value:datas[i].TId,
            children:[]
          }
          this.options.push(levelOne);
          // this.options.push({});
          // this.options[i].label = datas[i].TaskName;
          // this.options[i].value = datas[i].TId;
          // this.options[i].children = [];
          datas[i].TaskInfo.map((plan,idx)=>{
            var levelTwo = {
              label:`小班号${plan.XBH}`,
              value: plan.XBH,
              children:[]
            }
            this.options[i].children.push(levelTwo);

            // this.options[i].children.push({});
            // this.options[i].children[idx].label = `小班号${plan.XBH}` ;
            // this.options[i].children[idx].value = plan.XBH;       
            // this.options[i].children[idx].children = [];    
            plan.TaskInfo_Ghcs_Rel.map((Rel,index)=>{
              var levelThree = {
                label:Rel.Ghcs.Measure,
                value: Rel.Ghcs.Measure,
              }             
              this.options[i].children[idx].children.push(levelThree);
              // this.options[i].children[idx].children[index].label = Rel.Ghcs.Measure;
              // this.options[i].children[idx].children[index].value = Rel.Ghcs.Measure;
            }) 
          })
        }
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
