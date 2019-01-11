<template>
  <div v-drag class="ExpandTable esri-popup__main-container esri-widget esri-popup--shadow" style="width:800px;height:300px;display:none">
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
      <!-- <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline  class="demo-table-expand" :key="data.Id" v-for="data in props.row.GHCS"  >
            <el-form-item label="管护措施">
              <span>{{ data.Measure }}</span>
            </el-form-item>
            <el-form-item label="说明"> 
              <span>{{ data.Desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column> -->     
      <!-- <el-table-column
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
      </el-table-column> -->
      <el-table-column label="小班号" width="100%">
        <template  slot-scope="scope">
          <span>{{ scope.row.XBH }}</span>
        </template>
      </el-table-column>
      <el-table-column label="小班面积" width="100%">
        <template  slot-scope="scope">
          <span>{{ scope.row.XBMJ }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务名" width="100%">
        <template  slot-scope="scope">
          <span>{{ scope.row.TaskName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务负责人" width="100%">
        <template  slot-scope="scope">
          <span>{{ scope.row.Principal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="通过时间" align="center"  width="200px">
        <template  slot-scope="scope">
          <span>{{ scope.row.ReviewTime }}</span>
        </template>
      </el-table-column>
       <el-table-column label="详细信息" align="center" width="200px">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <el-table width="800px" :data="scope.row.GHCS">             
              <el-table-column label="管护措施" width="100px">
                <template slot-scope="scope">
                  <span>{{ scope.row.Measure }}</span>
                </template>
              </el-table-column>
              <el-table-column label="实施面积" width="100px">
                <template slot-scope="scope">
                  <span>{{ scope.row.ImpArea }}</span>
                </template>
              </el-table-column>
               <el-table-column label="审核人" width="100px">
                <template slot-scope="scope">
                  <span>暂无</span>
                </template>
              </el-table-column>      
               <el-table-column label="审核状态" width="100px">
                <template slot-scope="scope">
                  <!-- <span>{{ scope.row.ImpArea }}</span> -->
                  <el-tag size="medium" type="info">未审核</el-tag>
                </template>
              </el-table-column>                        
            </el-table>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">管护相关信息</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios"
// import { getFormData } from '@/api/formData'
import { getXBInfoByXBH } from '@/api/xbInfo'
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
      getXBInfoByXBH(this.expandTableParam.XBId).then(response => {
        // response.data.map((data, index, array)=>{
        //    if(data.XBH == this.expandTableParam.XBId){         
        //       this.createTable(data);
        //     }else{
        //       return null;
        //     }
        // })
        console.log(response)
        this.createTable(response.data[0])
      })
    },
    createTable(data){
      if(data == null){
        this.$message({
          message: '数据库未能查到此小班',
          type: 'error'
        })
      }else{
        var tableData = [];
        var taskId = this.expandTableParam.task;
        console.log(data);
        if(taskId == null){
          for(let i = 0;i < data.TaskInfo.length;i++){
            if(data.TaskInfo[i].Task.Status == "pass"){

              var s = {
                XBH:data.XBH,
                TaskName:data.TaskInfo[i].Task.TaskName,
                ReviewTime:data.TaskInfo[i].Task.ReviewTime,
                Principal:data.TaskInfo[i].Task.Principal,
                XBMJ:data.XBMJ,
                GHCS:[]
              };

              for(let j = 0;j < data.TaskInfo[i].TaskInfo_Ghcs_Rel.length;j++){
                var t = {
                  ImpArea:data.TaskInfo[i].TaskInfo_Ghcs_Rel[j].ImpArea,
                  Measure:data.TaskInfo[i].TaskInfo_Ghcs_Rel[j].Ghcs.Measure,
                  Id:j
                }
                s.GHCS.push(t)
              }           
              
              tableData.push(s);
              
              // console.log(tableData);
              // tableData[i].XBH = data.XBH;
              // tableData[i].Title = data.TaskInfo[i].Task.TaskName;
              // tableData[i].Person = data.TaskInfo[i].Task.Principal;
              // tableData[i].DateTime = data.TaskInfo[i].Task.ReviewTime;
              // tableData[i].GHCS = [];
              // for(let j = 0;j < data.TaskInfo[i].TaskInfo_Ghcs_Rel.length;j++){
              //   tableData[i].GHCS.push({});
              //   tableData[i].GHCS[j].Desc = "";
              //   tableData[i].GHCS[j].Measure = data.TaskInfo[i].TaskInfo_Ghcs_Rel[j].Ghcs.Measure;
              //   tableData[i].GHCS[j].Id = j;
              // }           
            }else{
              continue;
            }           
          }
          this.tableData = tableData;
        }else{
          var tableData = [];
          for(let i = 0;i < data.TaskInfo.length;i++){
              console.log(data.TaskInfo[i].Task.TaskName);
            if(data.TaskInfo[i].Task.TId == taskId){
              tableData = [{
                XBH:data.XBH,
                TaskName:data.TaskInfo[i].Task.TaskName,
                Principal:data.TaskInfo[i].Task.Principal,
                ReviewTime:data.TaskInfo[i].Task.ReviewTime,
                XBMJ:data.XBMJ,
                GHCS:[]
              }];

              for(let j = 0;j < data.TaskInfo[i].TaskInfo_Ghcs_Rel.length;j++){
                tableData[0].GHCS.push({}); 
                // tableData[0].GHCS[j].Desc = "";
                tableData[0].GHCS[j].Measure = data.TaskInfo[i].TaskInfo_Ghcs_Rel[j].Ghcs.Measure;
                tableData[0].GHCS[j].ImpArea = data.TaskInfo[i].TaskInfo_Ghcs_Rel[j].ImpArea;
                tableData[0].GHCS[j].Id = j;
              }         
            }
          }

          this.tableData = tableData;
        }

        // if(taskId == null){
        //   data.Plans.map((plan,index)=>{
        //     tableData.push({});
        //     tableData[index].XBH = data.XBH;
        //     tableData[index].Title = plan.Task.Title;
        //     tableData[index].Person = plan.Task.Person;
        //     tableData[index].DateTime = plan.Task.DateTime;
        //     tableData[index].GHCS = [];
        //     plan.PlanGhcsRels.map((PlanGhcsRel,idx)=>{
        //       tableData[index].GHCS.push({});
        //       tableData[index].GHCS[idx].Desc = PlanGhcsRel.Ghcs.Desc;
        //       tableData[index].GHCS[idx].Measure = PlanGhcsRel.Ghcs.Measure;
        //       tableData[index].GHCS[idx].Id = idx;
        //     })
        //   })
        //   this.tableData = tableData;
        // }else{
        //   let taskData = data.Plans.filter(this.filterData);      
        //   let tableData = [{
        //     XBH:data.XBH,
        //     Title:taskData[0].Task.Title,
        //     Person:taskData[0].Task.Person,
        //     DateTime:taskData[0].Task.DateTime,
        //     GHCS:[]
        //   }];

        //   taskData[0].PlanGhcsRels.map((PlanGhcsRel,idx)=>{
        //     tableData[0].GHCS.push({}); 
        //     tableData[0].GHCS[idx].Desc = PlanGhcsRel.Ghcs.Desc;
        //     tableData[0].GHCS[idx].Measure = PlanGhcsRel.Ghcs.Measure;
        //     tableData[0].GHCS[idx].Id = idx;
        //   })
        //   this.tableData = tableData;          
        // }      
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
   /* .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 80px;
    color: #99a9bf;
  } */

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 30%;
  }
</style>
