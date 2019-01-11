<template>
  <el-dialog 
  title="导出为EXCEL" 
  :visible.sync="dialogFormVisible" 
  width="30%">
    <el-form label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="选择时间" label-width="100px">
          <el-select  filterable style="width:300px" v-model="value" placeholder="请选择">
            <el-option              
              v-for="item in options"            
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件名" label-width="100px">
          <el-input @change="getName" placeholder="请输入文件名" />
        </el-form-item>
      </el-form>  
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <!-- <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{ $t('table.confirm') }}</el-button> -->
        <el-button type="primary" @click="download">导出</el-button>
      </div>
  </el-dialog>
</template>
  
<script>
  import { replaceKey } from '@/utils/replaceData'
  // import {getHistoryTime,GetXBInfoByTime} from "@/api/histXBInfo"
  import {getHistoryTime,GetXBInfoByTime} from "@/api/xbInfo"
  export default {
    name: '',
    data() {
      return {
        dialogFormVisible:this.DownloadParam.visible,
        options:[],
        value : '',
        name:null,
      }
    },
    props:["DownloadParam"],
    watch:{
      "DownloadParam.visible":function(curVal,oldVal){
        this.dialogFormVisible = true;
        this.getTime();
      }
    },
    mounted:function(){},
    methods:{
      download(){
        var enKeys = ["XBH","DWMC","XIANG","CUN","XBMJ","PD","HB","JD","WD","LDQS","LMQS","DL","LL","QLLX","ZLSJ","SZZC","YSSZ","PJSG","PJXJ","HJSZ","HJPJSG","HJPJXJ","MMXJ","LZU","MMZS","YBD","SLJKDJ","QLJG","GMZL","GMGD","CBZL","CBGD","ZBGD","RWGR","YYGHS","GHXS"];
        var cnKeys = ["小班号","县/区","乡/街道","村/社区","小班面积","坡度","海拔","经度","纬度","林地权属","林木权属","地类","林龄","群落类型","造林时间","树种组成","优势树种","平均树高","平均胸径","混交树种","混交树种平均树高","混交树种平均胸径","每亩蓄积","龄组","每亩株数","郁闭度","森林健康等级","群落结构","灌木种类","灌木盖度","草本种类","草本盖度","植被盖度","人为干扰","已有管护措施","管护形式/建议管护措施"];
  
        import('@/vendor/Export2Excel').then(excel => {        
          if(this.value == "最新"){
            const tHeader = cnKeys;
            const filterVal = cnKeys;
            const data = this.formatJson(filterVal, replaceKey(this.$store.getters.enXBInfo,enKeys,cnKeys))
            this.saveAs(excel,tHeader,data,this.name)

          }else{
            GetXBInfoByTime(this.value).then(res=>{
              const tHeader = cnKeys;
              const filterVal = cnKeys;
              const data = this.formatJson(filterVal, replaceKey(res.data,enKeys,cnKeys))
              this.saveAs(excel,tHeader,data,this.name)
            })  
          }       
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
      getTime(){
        getHistoryTime().then(res=>{
          var options = [];  
          for(var i =0;i<res.data.length;i++){                 
            options.push({});
            options[i].value = res.data[i].Time;
            options[i].label = res.data[i].Time;
            options[i].key = i;
          }
          options.push({value:"最新",label:"最新",key:res.data.length});
          this.options = options.reverse();
        })
      },
      getName(val){
        this.name = val
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      }
    }
  }
</script>

<style lang="" scoped>
  
</style>