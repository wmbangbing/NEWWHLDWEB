<template>
    <el-dialog
    title="上传任务表"
    :visible="visible"
    width="40%"
    @close='closeDialog'> 
      <el-upload
      class="uploadArea"
      show-file-list
      drag
      action="http://202.114.148.160/WHLDWebApi/api/UploadExcel"
      accept=".xlsx"
      :on-success="uploadSuccess"
      :on-error="uploadError">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="downloadExcel">下载模板文件</el-button>
      </span>
    </el-dialog>
</template>

<script>
  import store from '../../store'
  export default {
    data() {
      return {
        visible:this.UploadTaskParam.visible
      }
    },
    props:['UploadTaskParam'],
    watch:{
      "UploadTaskParam.visible":function(curVal,oldVal){
        this.visible = true;
      }
    },
    methods:{
      downloadExcel(){
        // window.location.href = "http://223.255.43.21/whldwebapi/api/downloadexcel";
        window.location.href = "http://202.114.148.160/whldwebapi/api/downloadexcel";
      },
      closeDialog(){
        this.visible = false;
      },
      uploadSuccess(){
        this.$message({
          message: '上传成功',
          type: 'success'
        });
        this.$emit('refreshTaskSel')
      },
      uploadError(err){      
        this.$message({
          message: err.message,
          type: 'error'
        })
      },
      // uploadProgress(event, file, fileList){
      //   console.log(event);
      //   console.log(file);
      //   console.log(fileList);
      // }
    }
  }
</script>

<style  scoped>
  .uploadArea{
    width: 98%;
    margin:0 auto;
    text-align:center;
    /* display: flex;
    align-items: center;
    justify-content: center; */
  }
</style>

