<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary"  @click="dialogVisible = true">test</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
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
          <span>{{ scope.row.task_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务负责人" width="150px">
        <template  slot-scope="scope">
          <span>{{ scope.row.task_manager }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区" width="150px">
        <template  slot-scope="scope">
          <span>{{ scope.row.district}}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交时间" width="200px">
        <template  slot-scope="scope">
          <span>{{ scope.row.submit_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="150px">
        <template  slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status | zhStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button size="mini" type="success" @click="checkProcess(scope.row,'pass')">通过</el-button>
          <el-button size="mini" type="warning" @click="checkProcess(scope.row,'refuse')">不通过</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog v-el-drag-dialog :close-on-click-modal=false :modal=false title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
  import { fetchList } from '@/api/task'
  import { Machine } from 'xstate'

  export default {
    name: '',
    directives: { elDragDialog },
   
    data() {
      return {
        dialogVisible:false,
        list:null,
        listLoading:true,
        listQuery: {
          page: 1,
          limit: 20,
          task_name: undefined,
          sort: '+id'
        },
        total:null,
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
      }
    },
    created(){
      this.getList();
    },
    methods:{
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      // handleDrag() {
      //   this.$refs.select.blur()
      // }
      getList(){
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data.total
          console.log(response);
          // Just to simulate the time of the request
          setTimeout(() => {
          this.listLoading = false
          }, 1.5 * 1000)
        })
      },
      checkProcess(row,nextState){
        console.log(this.stateMachine)

        if(this.stateMachine.initial != row.status){
          this.$message({
            message: '状态已锁定',
            type: 'warning'
          })
        }else{
          var res = this.stateMachine.transition(row.status,nextState)
          row.status = res.value;
          console.log(res.value);
        }
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
    }
  }
</script>

<style lang="" scoped>
  
</style>