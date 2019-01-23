<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input  placeholder="请输入查询内容" style="width: 200px;"  v-model="taskTableParams.search"  />
      <el-button type="primary" @click="openDialog">查看已完成管护措施</el-button>
    </div>

    <el-table
      ref="taskTable"
      v-loading="listLoading"
      :data="datas"
      border
      fit
      highlight-current-row
      @selection-change="selectionChange"
      @sort-change="sortChange"
      :row-key="getRowKeys"
      style="width: 100%">
      <el-table-column
        type="selection"
        :reserve-selection="true"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        width="50"
        :index="indexMethod">
      </el-table-column>
      <el-table-column label="任务名" width="100%" prop="TId" sortable="custom">
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
        :current-page="taskTableParams.currentPage"
        :page-sizes="[5, 20, 50, 100]"
        :page-size="taskTableParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="taskTableParams.total">
      </el-pagination>    
    </div>

    <el-dialog title="需实地考察管护措施" :close-on-click-modal=false :modal=true :visible.sync="dialogVisible" width="60%">
      <div class="filter-container">
        <el-input  placeholder="请输入查询内容" style="width: 200px;"  v-model="ghTableParams.search"  />
      </div>
      <el-table
        :data="selectvtrdedDatas"
        border
        fit
        highlight-current-row
        height="30rem"
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column label="区" width="100%">
          <template  slot-scope="scope">
            <span>{{ scope.row["区"] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="任务名" width="100%">
          <template  slot-scope="scope">
            <span>{{ scope.row["任务名"] }}</span>
          </template>
        </el-table-column>  
        <el-table-column label="任务负责人" width="100%">
          <template  slot-scope="scope">
            <span>{{ scope.row["任务负责人"] }}</span>
          </template>
        </el-table-column>  
        <el-table-column label="提交时间" width="160px">
          <template  slot-scope="scope">
            <span>{{ scope.row["提交时间"] }}</span>
          </template>
        </el-table-column>  
        <el-table-column label="小班号" width="150px">
          <template  slot-scope="scope">
            <span>{{ scope.row["小班号"] }}</span>
          </template>
        </el-table-column>  
        <el-table-column label="管护措施" width="100%">
          <template  slot-scope="scope">
            <span>{{ scope.row["管护措施"] }}</span>
          </template>
        </el-table-column>  
        <el-table-column label="实施面积" width="100%">
          <template  slot-scope="scope">
            <span>{{ scope.row["实施面积"] }}</span>
          </template>
        </el-table-column>  
        <el-table-column label="小班面积" width="100%">
          <template  slot-scope="scope">
            <span>{{ scope.row["小班面积"] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
        </el-table-column>       
      </el-table>

      <div class="pagination-container">
        <el-pagination
          @size-change="handleGhSizeChange"
          @current-change="handleGhCurrentChange"
          :current-page="ghTableParams.currentPage"
          :page-sizes="[5, 20, 50, 100]"
          :page-size="ghTableParams.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="selectedData.length">
        </el-pagination>    
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="downloadAsExcel">导出到表格</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllTask,GetAllTaskByPagination } from "@/api/task";
import { constructTaskData,constructGhData } from "@/utils/filterData";
import store from "../../store";

export default {
  name: "",
  data() {
    return {
      list: [],
      listLoading: true,      
      dialogVisible: false,
      selectedData: [],
      taskTableParams:{
        search: "",  
        currentPage: 1,
        pageSize: 5,
        total:0,
        sort:"+id",
        district:this.$store.getters.district
      },
      ghTableParams:{
        currentPage: 1,
        pagesize: 5,
        search: "",
      }
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        pass: "success",
        unreview: "info",
        refuse: "danger"
      };
      return statusMap[status];
    },
    zhStatus(status) {
      const statusMap = {
        pass: "通过",
        unreview: "未审核",
        refuse: "未通过"
      };
      return statusMap[status];
    }
  },
  computed: {
    datas: function() {
      const search = this.taskTableParams.search;
      if (search) {       
        return this.list.filter(dataNews => {
          return Object.keys(dataNews).some(key => {
            return (
              String(dataNews[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.list;
    },
    selectvtrdedDatas:function(){
      const search = this.ghTableParams.search;
      if(search){
        debugger;
        return this.selectedData.filter(dataNews =>{
          return Object.keys(dataNews).some(key =>{
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.selectedData
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      GetAllTaskByPagination(this.taskTableParams).then(res => {
        this.list = constructTaskData(JSON.parse(res.data.list));
        this.taskTableParams.total = res.data.total;
        this.listLoading = false;
      })
    },
    indexMethod(index) {
      return (this.taskTableParams.currentPage - 1) * this.taskTableParams.pageSize + index + 1;
    },
    handleSizeChange(val) {    
      this.taskTableParams.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {      
      this.taskTableParams.currentPage = val;
      this.getList();
    },
    refreshTaskList() {
      this.getList();
    },
  
    openDialog() {
      this.dialogVisible = true;
    },
    selectionChange(data) {
      this.selectedData = constructGhData(data);
    },   
    getRowKeys(row){
      return row.TId;
    },
    sortChange(data){
      const { column, prop, order } = data;
      console.log(column, prop, order);
      debugger;
      if(order === "ascending"){
        this.taskTableParams.sort = "+id"     
      }else{
        this.taskTableParams.sort = "-id"
      }    
      this.taskTableParams.currentPage = 1
      this.getList();
    },
    handleGhSizeChange(val){
      this.ghTableParams.pagesize = val;
    },
    handleGhCurrentChange(){
      this.ghTableParams.currentPage = val;
    },
    downloadAsExcel(){     
      import('@/vendor/Export2Excel').then(excel => {        
        const tHeader =  ["区","任务名","任务负责人","提交时间","小班号","管护措施","实施面积","小班面积"];
        // const tHeader =  ["District","TaskName","SubmissionTime","XBH","Measure","Principal","ImpArea","XBMJ"];  
        
        const data = []; 
        this.selectedData.map(d =>{
          var a = [];
          Object.keys(d).forEach(key => {
            a.push(d[key]);
          });
          data.push(a)
        }) 

        this.saveAs(excel,tHeader,data,"1")    
      })
    },
    saveAs(excel,tHeader,data,name){
      excel.export_json_to_excel({
        header: tHeader,
        data,
        filename:name,
        autoWidth: true
      })
    },


    // sortByDate(obj1, obj2) {
    //   let val1 = obj1.SubmissionTime;
    //   let val2 = obj2.SubmissionTime;
    //   return val1 - val2;
    // },
    // copy(p, c) {
    //   var c = c || {};
    //   for (var i in p) {
    //     if (typeof p[i] === "object") {
    //       c[i] = p[i].constructor === Array ? [] : {};
    //       this.copy(p[i], c[i]);
    //     } else {
    //       c[i] = p[i];
    //     }
    //   }
    //   return c;
    // },
    // removeDuplicateItems(arr) {
    //   return [...new Set(arr)];
    // }
  }
};
</script>

<style scoped>
.el-button {
  margin-left: 10px;
}
</style>