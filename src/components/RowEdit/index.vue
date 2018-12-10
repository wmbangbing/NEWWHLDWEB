<template>
   <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="30%">
      <el-dialog
        width="30%"
        :visible.sync="innerVisible"
        append-to-body>
        <P style="font-family:微软雅黑,宋体;font-size:1.5em;color:#f00;margin：0 auto;">请确认修改！</p>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取消</el-button>
          <!-- <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{ $t('table.confirm') }}</el-button> -->
          <el-button type="primary" @click="updateData">确定</el-button>
        </div>
      </el-dialog>
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <!-- <el-form-item label="时间" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date"/>
        </el-form-item> -->
        <el-form-item label="森林健康等级" label-width="100px">
          <el-input v-model="temp.SLJKDJ"/>
        </el-form-item>
        <el-form-item label="平均树高" label-width="100px">
          <el-input v-model="temp.PJSG"/>
        </el-form-item>
        <el-form-item label="混交树种" label-width="100px">
          <el-input v-model="temp.HJSZ"/>
        </el-form-item>
        <el-form-item label="每亩株数" label-width="100px">
          <el-input v-model="temp.MMZS"/>
        </el-form-item>
      </el-form>  
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <!-- <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{ $t('table.confirm') }}</el-button> -->
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
</template>
<script>
import store from '../../store'
import { putData } from '@/api/xbInfo'

export default {
  data(){
    return{
      temp:{
        SLJKDJ:null,
        PJSG:null,
        HJSZ:null,
        MMZS:null,
      },
      dialogFormVisible:this.rowEditParam.visible,
      innerVisible: false,
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
    }
  },
  props:["rowEditParam"],
  watch:{
    "rowEditParam.visible":function(curVal,oldVal){
      this.dialogFormVisible = true;  
      var editRow = this.$store.getters.tableRow;
      this.temp = {
        SLJKDJ:editRow.SLJKDJ,
        PJSG:editRow.PJSG,
        HJSZ:editRow.HJSZ,
        MMZS:editRow.MMZS,
      }
    }
  },
  methods:{
    updateData(){
      // const tempData = Object.assign({}, this.temp);
      // for(let value in tempData){
      //   if(tempData[value] !== this.$store.getters.tableRow[value]){
      //     //保存
      //     tempData["XBH"] = this.$store.getters.tableRow.XBH;
      //     store.dispatch("EditTableRow",tempData);
      //     store.dispatch("EditXBInfo",tempData);
      //     return null;
      //   }
      // }
      // this.$message({
      //   message: '您未作出任何修改',
      //   type: 'success'
      // })
      const tempData = Object.assign({}, this.temp);
      tempData["XBH"] = this.$store.getters.tableRow.XBH;
      // store.dispatch("EditXBInfo",tempData);
      store.dispatch("EditTableRow",tempData);
      putData(tempData).then(response=>{
        if(response.status == 204){
          this.$message({
            message:"修改成功",
            type:"success"
          })
        }else{
           this.$message({
            message:"修改失败",
            type:"error"
          })        
        }

        this.innerVisible = false;

      })
      
    },
    confirm(){
      const tempData = Object.assign({}, this.temp);
      for(let value in tempData){
        if(tempData[value] !== this.$store.getters.tableRow[value]){
          this.innerVisible = true;
          return null;
        }
      }
      this.$message({
        message: '您未作出任何修改',
        type: 'warning'
      })
    }
  }
}
</script>
<style>

</style>

