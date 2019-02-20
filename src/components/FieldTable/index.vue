<template>
  <div v-drag class="FieldTable esri-popup__main-container esri-widget esri-popup--shadow" style="width:1200px;height:550px;display:none">
    <header class="esri-popup__header">
      <h2 class="esri-popup__header-title" tabindex="0">
        属性列表
      </h2>
      <div class="esri-popup__header-buttons">
        <div role="button" tabindex="0" class="esri-popup__button" aria-label="关闭" title="关闭"  @click="close">
          <span aria-hidden="true" class="esri-popup__icon esri-icon-close">
          </span>
        </div>
      </div>
    </header>
    <div>
      <div style="width:98%;margin:0 auto;margin-bottom:10px">
        搜索： <el-input size=small v-model="search" style="width:200px" />
        <el-button @click="openDownloadDialog" type="primary" size=small style="float:right">导出Excel</el-button>
      </div>
      <!-- :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" -->
      <el-table    
      :data="datas.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)"
      @row-click="rowClick"
      stripe
      border
      v-loading="loading"
      element-loading-text="数据获取中..."
      size=small
      height=350
      style="width: 98%;margin:0 auto">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="XBH"
          fixed
          width="120"    
          label="小班号">
        </el-table-column>
         <el-table-column
          prop="NewID"
          width="180"    
          label="小班全编号">
        </el-table-column>
        <el-table-column
          prop="DWMC"
          width="100" 
          label="管理所属">
        </el-table-column>
         <el-table-column
          prop="XIAN"
          label="县/区代码">
        </el-table-column>
        <el-table-column
          prop="XIANG"
          width="100" 
          label="乡/街道代码">
        </el-table-column>
        <el-table-column
          prop="CUN"
          width="100" 
          label="村/社区代码">
        </el-table-column>
        <el-table-column
          prop="LIN_BAN"
          label="林班代码">
        </el-table-column>
        <el-table-column
          prop="XIAO_BAN"
          label="小班代码">
        </el-table-column>
          <el-table-column
          prop="XIAN_NAME"
          width="110"
          label="县/区名称">
        </el-table-column>
        <el-table-column
          prop="XIANG_NAME"
          width="100" 
          label="乡/街道名称">
        </el-table-column>
        <el-table-column
          prop="CUN_NAME"
          width="100" 
          label="村/社区名称">
        </el-table-column>
        <el-table-column
          prop="XBMJ"
          width="150"
          label="小班面积">
        </el-table-column>
        <el-table-column
          prop="PD"
          label="坡度">
        </el-table-column>
        <el-table-column
          prop="HB"
          width="150"                
          label="海拔">
        </el-table-column>
        <el-table-column
          prop="JD"
          width="120"      
          label="经度">
        </el-table-column>
        <el-table-column
          prop="WD"
          width="120"          
          label="纬度">
        </el-table-column>
        <el-table-column
          prop="TDQS"
          label="林地权属">
        </el-table-column>
        <el-table-column
          prop="LMQS"
          label="林木权属">
        </el-table-column>
        <el-table-column
          prop="DL"
          width="100"                          
          label="地类">
        </el-table-column>
        <el-table-column
          prop="LL"
          label="林龄">
        </el-table-column>
        <el-table-column
          prop="QLLX"
          width="100"                
          label="群落类型">
        </el-table-column>
        <el-table-column
          prop="ZLSJ"
          label="造林时间">
        </el-table-column>
        <el-table-column
          prop="ZLSJ"
          label="造林时间">
        </el-table-column>
        <el-table-column
          prop="ZLSJ"
          label="造林时间">
        </el-table-column>
        <el-table-column
          prop="SZJG"
          label="树种组成">
        </el-table-column>
        <el-table-column
          prop="YSSZ"
          width="100"                          
          label="优势树种">
        </el-table-column>
        <el-table-column
          prop="PJSG"
          label="平均树高">
        </el-table-column>
        <el-table-column
          prop="PJXJ"
          label="平均胸径">
        </el-table-column>
        <el-table-column
          prop="HJSZ"
          label="混交树种">
        </el-table-column>
        <el-table-column
          prop="HJPJSG"
          width="118"
          label="混交树种平均树高">
        </el-table-column>
        <el-table-column
          prop="HJPJXJ"
          width="118"
          label="混交树种平均胸径">
        </el-table-column>
        <el-table-column
          prop="MMXJ"
          label="每亩蓄积">
        </el-table-column>
        <el-table-column
          prop="LZU"
          label="龄组">
        </el-table-column>
        <el-table-column
          prop="MMZS"
          label="每亩株树">
        </el-table-column>
        <el-table-column
          prop="YBD"
          label="郁闭度">
        </el-table-column>
        <el-table-column
          prop="SLJKDJ"
          width="100"
          label="森林健康等级">
        </el-table-column>
        <el-table-column
          prop="QLJG"
          width="100"                          
          label="群落结构">
        </el-table-column>
        <el-table-column
          prop="GMZL"
          width="110"                          
          label="灌木种类">
        </el-table-column>
        <el-table-column
          prop="GMGD"
          label="灌木盖度">
        </el-table-column>
        <el-table-column
          prop="CBZL"
          width="110"                         
          label="草本种类">
        </el-table-column>
        <el-table-column
          prop="CBGD"
          label="草本盖度">
        </el-table-column>
        <el-table-column
          prop="ZBGD"
          label="植被盖度">
        </el-table-column>
        <el-table-column
          prop="RWGR"
          label="人为干扰">
        </el-table-column>
        <el-table-column
          prop="YYGHCS"
          width="100"
          label="已有管护措施">
        </el-table-column>
        <el-table-column
          prop="GHXS"
          width="150"
          label="管护形式/建议管护措施">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot="header" slot-scope="slot">
            <el-input
              v-model="search"
              size="mini"
              placeholder="Type to search"/>
          </template>
          <template slot-scope="scope">
            <el-button v-permission="['admin','district']"  type="text" size="small"  @click="handleUpdate(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="width:98%;margin:0 auto;margin-top:20px">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="datas.length">
      </el-pagination>    
    </div>
  </div>
</template>
<script>
import { getFormData } from '@/api/formData'
import { fadeIn } from '@/utils/style'
import permission from '@/directive/permission/index.js'

export default {
  data() {
    return {
      tableData:[],
      loading:true,
      currentPage:1,
      pagesize:20,
      search:""
    }
  },
  directives: { permission },
  props:[
    "fieldTableParam"
  ],
  watch:{
    "fieldTableParam.visible":function(curVal,oldVal){
      fadeIn(fieldTb);
      // getFormData("XBInfo").then(response=>{
      //   this.tableData = response.data
      //   this.loading = false;
      // })
      // this.tableData = [];
      
    },
    gettableData(val){
      this.tableData = val;
      this.loading = false;
    }
  },
  // mounted(){
  //   getFormData("XBInfo").then(response=>{
  //     this.tableData = response.data
  //   })
  // },
  computed:{
    datas:function(){
      const search = this.search;
      if(search){
        var searchList = this.splitByComma(search);
        return this.tableData.filter(dataNews =>{
          // return Object.keys(dataNews).some(key =>{
          //   // return String(dataNews[key]).toLowerCase().indexOf(search) > -1   
          //   return this.determineAll(searchList,dataNews,key);    
          // })
          return searchList.every(a => {
            return Object.keys(dataNews).some(key =>{
              return String(dataNews[key]).toLowerCase().indexOf(a) > -1   
            })
          })
        })
      }
      // console.log(this.tableData);
      return this.tableData || []
    },
    gettableData:function(){
      return this.$store.getters.enXBInfo;
    }
  },
  methods:{
    handleSizeChange: function (size) {
        this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
    },
    close(){
      fieldTb.style.display = "none";
      this.loading = true;
    },
    handleUpdate(row){
      this.$store.dispatch("SetTableRow",row);  
      this.$emit('openRowEdit',true)
    },
    openDownloadDialog(){
      this.$emit("openDownloadDialog")
    },
    rowClick(row, event, column){    
      this.$emit("returnXBH",row.XBH)
    },
    splitByComma(str){
      var temp = str.split(/[\n\s+,，]/g);
      for (var i = 0; i < temp.length; i++) {
        if (temp[i] == "") {
          temp.splice(i, 1);
          i--;
        }
      }
      return temp;
    }
  }
}
</script>
<style scoped>
.esri-popup__main-container {
  max-height: 800px
}

.esri-view-height-large .esri-popup__main-container{
  max-height: 800px   
}

.el-table__body-wrapper .is-scrolling-middle{
  background-color: #a1a3a9;
  border-radius: 3px;
  width: 10px;
  height: 10px;
}
</style>

