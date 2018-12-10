<template>
  <div class="ExpandTable esri-popup__main-container esri-widget esri-popup--shadow" style="width:800px;height:300px;display:none">
    <header class="esri-popup__header">
      <h2 class="esri-popup__header-title" tabindex="0">
        小班管护措施
      </h2>
      <div class="esri-popup__header-buttons">
        <div role="button" tabindex="0" class="esri-popup__button" aria-label="关闭" title="关闭" @click="close">
          <span aria-hidden="true" class="esri-popup__icon esri-icon-close">
          </span>
        </div>
      </div>
    </header>
    <el-table
    :data="tableData"
    height="200"
    v-loading="loading"
    style="width: 100%">      
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="top" block class="demo-table-expand" :key="data.Id" v-for="data in props.row.GHCS"  >
            <el-form-item label="管护措施">
              <span>{{ data.Measure }}</span>
            </el-form-item>
            <el-form-item label="说明"> 
              <span>{{ data.Desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      
      <el-table-column
        label="小班编号"
        prop="XBH">
      </el-table-column>
        <el-table-column
        label="任务名"
        prop="Title">
      </el-table-column>
        <el-table-column
        label="任务负责人"
        prop="Person">
      </el-table-column>
        <el-table-column
        label="任务时间"
        prop="DateTime">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios"
import { getFormData } from '@/api/formData'
import { fadeOut,fadeIn } from '@/utils/style'


export default {
  data() {
    return {
      tableData:[],
      loading:true,
    }
  },
  props:[
    "expandTableParam"
  ],
  watch:{
    "expandTableParam.visible":function(curVal,oldVal){
      // expandTb.style.display = "block";
      fadeIn(expandTb);
      this.getData();
    }
  },
  methods: {
    getData(){
      getFormData("XBInfo").then(response => {
        response.data.map((data, index, array)=>{
           if(data.XBH == this.expandTableParam.XBId){         
              this.createTable(data);
            }else{
              return null;
            }
        })
      })
    },
    createTable(data){
      if(data == null){
        this.$message({
          message: '数据库未能查到此小班',
          type: 'error'
        })
      }else{
        let tableData = [];
        var taskId = this.expandTableParam.task;
        if(taskId == null){
          data.Plans.map((plan,index)=>{
            tableData.push({});
            tableData[index].XBH = data.XBH;
            tableData[index].Title = plan.Task.Title;
            tableData[index].Person = plan.Task.Person;
            tableData[index].DateTime = plan.Task.DateTime;
            tableData[index].GHCS = [];
            plan.PlanGhcsRels.map((PlanGhcsRel,idx)=>{
              tableData[index].GHCS.push({});
              tableData[index].GHCS[idx].Desc = PlanGhcsRel.Ghcs.Desc;
              tableData[index].GHCS[idx].Measure = PlanGhcsRel.Ghcs.Measure;
              tableData[index].GHCS[idx].Id = idx;
            })
          })
          this.tableData = tableData;
        }else{
          let taskData = data.Plans.filter(this.filterData);      
          let tableData = [{
            XBH:data.XBH,
            Title:taskData[0].Task.Title,
            Person:taskData[0].Task.Person,
            DateTime:taskData[0].Task.DateTime,
            GHCS:[]
          }];

          taskData[0].PlanGhcsRels.map((PlanGhcsRel,idx)=>{
            tableData[0].GHCS.push({}); 
            tableData[0].GHCS[idx].Desc = PlanGhcsRel.Ghcs.Desc;
            tableData[0].GHCS[idx].Measure = PlanGhcsRel.Ghcs.Measure;
            tableData[0].GHCS[idx].Id = idx;
          })
          this.tableData = tableData;          
        }      
      }
        this.loading = false;      
    },
    filterData(data){
      return data.TId === this.expandTableParam.task;
    },
    close(){
      // var div = document.getElementById("expandTb");
      expandTb.style.display = "none";
      this.loading = true;
      this.expandTableParam.task = null;
    }
  },
}
</script>
<style>
   .demo-table-expand {
    font-size: 0;
    /* display: block; */
  }
  .demo-table-expand label {
    width: 80px;
    color: #99a9bf;
  }
  /* .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 20%;
  }  */
</style>
