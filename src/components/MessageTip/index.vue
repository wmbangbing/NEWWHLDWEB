<template>
  <el-badge :value=noteLength type="primary" title="消息">
    <el-popover
      placement="top"
      width="900"
      v-model="visible2">
      <el-table 
         v-loading="loading"
        :data="gridData" 
        :show-header=true>
        <el-table-column label="任务名" width="100px">
          <template  slot-scope="scope">
            <span>{{ scope.row.TaskName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="任务负责人" width="100px">
          <template  slot-scope="scope">
            <span>{{ scope.row.Principal }}</span>
          </template>
        </el-table-column>
        <el-table-column label="区" width="100px">
          <template  slot-scope="scope">
            <span>{{ scope.row.District }}</span>
          </template>
        </el-table-column>
         <el-table-column label="状态" width="100px">
          <template  slot-scope="scope">
            <el-tag :type="scope.row.Status | statusFilter">{{scope.row.Status | zhStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="时间" width="180px">
          <template  slot-scope="scope">
            <span>{{ scope.row.SubmissionTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="反馈信息" width="150px">
          <template  slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.Text }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">反馈信息</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="确认">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click.once="checkProcess(scope.row)">确认已读</el-button>        
        </template>
      </el-table-column>
      </el-table>
      <div style="text-align: right; margin: 0">
        <el-button style="margin-top:10px" type="primary" size="mini" @click="confirmAll">全部已读</el-button>
      </div>
    <el-button  size="mini"  type="info" icon="el-icon-message" slot="reference" circle></el-button>
    </el-popover>
  </el-badge>
</template>

<script>
    import { getNote,confirmNote,confirmAllNote} from '@/api/task'
  import store from '../../store'

  export default {
    name: '',
    data() {
      return {
        visible2:false,
        gridData: [],
        loading:true,
        noteLength:0,
      }
    },
    created(){
      this.createTable();
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
    methods:{
      createTable(){
        getNote(store.getters.district).then(res =>{
          this.gridData = res.data;
          this.noteLength = res.data.length;
          this.loading = false
        })
      },
      checkProcess(row){
        row.Seen = true;
        confirmNote(row.NId).then(res =>{
          if(res.status == 200){
            this.noteLength--;
            this.$message({
              message: '确认已读',
              type: 'success'
            })
          }
        })
      },
      confirmAll(){
        confirmAllNote(store.getters.district).then(res =>{
          this.noteLength = 0;
          this.$message({
            message: '全部已读',
            type: 'success'
          })
        })      
      }
    }
  }
</script>

<style lang="" scoped>
  
</style>