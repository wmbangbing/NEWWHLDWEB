<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input  placeholder="请输入查询内容" style="width: 200px;"  v-model="search"  />
      <el-button v-permission="['admin']" type="primary" @click="openDialog">发布任务</el-button>
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
        <!-- <template  slot-scope="scope">
          <el-tag :type="scope.row.Status | statusFilter">{{scope.row.Status | zhStatus}}</el-tag>
        </template> -->
      </el-table-column>
      <el-table-column label="操作">
        <!-- <template slot-scope="scope">
        </template> -->
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

    <UploadTaskDialog :UploadTaskParam=UploadTaskParam  @refreshTaskSel="refreshTaskList" />
  </div>
</template>

<script>
  import UploadTaskDialog from '@/components/UploadTaskDialog' 
  import { getReleaseTask } from "@/api/task"
  import { constructTaskData } from"@/utils/filterData"
  import store from "../../../store"
  import { Machine } from 'xstate'
  import permission from '@/directive/permission/index.js'

  export default {
    name: '',
    data() {
      return {
        list:[],
        listLoading:true,
        currentPage:1,
        pagesize:20,
        search:"",     
        UploadTaskParam:{
          visible:false,
          // url:"http://202.114.148.160/WHLDWebApi2/api/task/UploadAdminExcel"
          url:"http://223.255.43.21:82/WHLDWebApi2/api/task/UploadReviewExcel"
          // url:"http://localhost:42501/api/task/UploadAdminExcel"
        },
      }
    },
    components:{
      UploadTaskDialog
    },
    directives: { permission },
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
        this.listLoading = true;
        getReleaseTask(store.getters.district).then(res =>{         
          this.list = constructTaskData(res.data);
          // console.log(res.data);
          // this.list = res.data;
          this.listLoading = false
        })
      },
      handleSizeChange(val) {
        this.pagesize = val
      },
      handleCurrentChange(val) {
        this.currentPage = val
      },
      refreshTaskList(){
        this.getList();
      },
      openDialog(){
        this.UploadTaskParam.visible = !this.UploadTaskParam.visible;
      }   
    }
  }
</script>

<style scoped>
  .el-button {
    margin-left: 10px;
  }
</style>