<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input  placeholder="请输入查询内容" style="width: 200px;"  v-model="search"  />
      <!-- <el-button type="primary">test</el-button> -->
    </div>

    <el-table
      v-loading="listLoading"
      :data="datas.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)"
      border
      fit
      highlight-current-row
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column label="任务名" width="100%">
        <template  slot-scope="scope">
          <span>{{ scope.row.TaskName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务负责人" width="150px">
        <template  slot-scope="scope">
          <span>{{ scope.row.Principal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区" width="150px">
        <template  slot-scope="scope">
          <span>{{ scope.row.District}}</span>
        </template>
      </el-table-column>     
      <el-table-column label="提交时间" width="200px">
        <template  slot-scope="scope">
          <span>{{ scope.row.SubmissionTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="详细信息" align="center" width="200px">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="right">
            <el-table width="800px" :data="scope.row.TaskInfo">
              <el-table-column label="小班号" width="100px">
                <template slot-scope="scope">
                  <span>{{ scope.row.XBH }}</span>
                </template>
              </el-table-column>
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
              <el-table-column label="小班面积" width="100px">
                <template slot-scope="scope">
                  <span>{{ scope.row.XBMJ }}</span>
                </template>
              </el-table-column>                    
            </el-table>
             <!-- <p>{{ scope.row.TaskInfo }}</p> -->
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">管护相关信息</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="150px">
        <template  slot-scope="scope">
          <el-tag :type="scope.row.Status | statusFilter">{{scope.row.Status | zhStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button :disabled="scope.row.Status | disable" size="mini" type="success" @click="checkProcess(scope.row,'pass')">通过</el-button>
          <el-button :disabled="scope.row.Status | disable" size="mini" type="warning" @click="checkProcess(scope.row,'refuse')">不通过</el-button>          
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="datas.length">
      </el-pagination>    
      <!-- <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/> -->
    </div>

    <el-dialog v-el-drag-dialog :close-on-click-modal=false :modal=false title="反馈意见" :visible.sync="dialogVisible" width="30%">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入反馈内容"
        v-model="reviewRes.Text">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import { getReviewTask,reviewTask } from "@/api/task"
  import  { constructTaskData } from"@/utils/filterData"
  import store from "../../../store"
  import { Machine } from 'xstate'
  import elDragDialog from '@/directive/el-dragDialog' //

  export default {
    name: '',
    directives: { elDragDialog },
    data() {
      return {
        list:[],
        listLoading:true,
        currentPage:1,
        pagesize:20,
        search:"",
        dialogVisible:false,
        reviewRes:{
          Text:'',
          TId:'',
          Status:''
        },
        row:'',
        stateMachine:new Machine({
          id:"check",
          initial:"unreview",
          states:{
            unreview:{
              on:{ 
                pass : "pass",
                refuse : "refuse"
              },   
            },
            pass:{
              type: 'final'
            },
            refuse:{
              type: 'final'
            }
          },
          onDone: {
            actions: function(){
              console.log("end");
            }
          }
        })
      }
    },
    filters:{
      statusFilter(status){  
        const statusMap = {
          pass: 'success',
          unreview: 'info',
          refuse: 'danger'
        }
        return statusMap[status]
      },
      zhStatus(status){
        const statusMap = {
          pass: '通过',
          unreview: '未审核',
          refuse: '未通过'
        }
        return statusMap[status]
      },
      disable(status){
        const statusMap = {
          pass: true,
          unreview: false,
          refuse: true
        }
        return statusMap[status]
      }
    },
    computed:{
      datas:function(){
        const search = this.search;
        if(search){
          return this.list.filter(dataNews =>{
            return Object.keys(dataNews).some(key =>{
                return String(dataNews[key]).toLowerCase().indexOf(search) > -1        
            })
          })
        }
        console.log(this.tableData);
        return this.list
      }
    },
    created(){
      this.getList();
    },    
    methods:{
      getList(){
        getReviewTask(store.getters.district).then(res =>{
          this.list = constructTaskData(res.data);
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      checkProcess(row,nextState){
        console.log(this.stateMachine)

        if(this.stateMachine.initial != row.Status){
          this.$message({
            message: '状态已锁定',
            type: 'warning'
          })
        }else{
          var res = this.stateMachine.transition(row.Status,nextState);
          this.reviewRes.Status = res.value;
          this.reviewRes.TaskName = row.TaskName;

          this.reviewRes.Text = '';
          this.row = row;
          
          this.dialogVisible = true;

          // row.Status = res.value;           
          // let reviewRes = {
          //   TId:row.TId,
          //   Status:row.Status
          // };

          // reviewTask(reviewRes).then(res =>{
          //   if(res.status == 200){
          //     this.$message({
          //       message: '修改成功',
          //       type: 'success'
          //     })
          //   }else {
          //     this.$message({
          //       message: '修改失败',
          //       type: 'error'
          //     })
          //   }
          // })
          // console.log(reviewRes);
        }
      },
      confirm(){
        if(this.reviewRes.Text === ''){
          this.$message({
            message: '不可为空！',
            type: 'warning'
          })
        }else{
          reviewTask(this.reviewRes).then(res =>{
            if(res.status == 200){
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            }else {
              this.$message({
                message: '修改失败',
                type: 'error'
              })
            }
          })

          this.row.Status = this.reviewRes.Status;

        }
      }
    }
  }
</script>

<style scoped>
  .el-button {
    margin-left: 10px;
  }
</style>