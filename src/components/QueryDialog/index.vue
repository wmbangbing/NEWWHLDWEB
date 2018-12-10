<template>
  <el-dialog
  title="查询面板" 
  :visible="visible"
  height=800
  width="500px">
    <el-row>请输入查询语句</el-row>
    <el-row>
      <select class="select" size="5" style="width:100%"></select>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="9">
        <el-row :gutter="10">
          <el-col :span="8"><button class="btn">=</button></el-col>
          <el-col :span="8"><button class="btn"><></button></el-col>
          <el-col :span="8"><button class="btn">Like</button></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8"><button class="btn">></button></el-col>
          <el-col :span="8"><button class="btn">>=</button></el-col>
          <el-col :span="8"><button class="btn">And</button></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8"><button class="btn"><</button></el-col>
          <el-col :span="8"><button class="btn"><=</button></el-col>
          <el-col :span="8"><button class="btn">Or</button></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8"> 
            <button class="btn" style="width:50%">_</button>   
            <button class="btn" style="width:50%">%</button>   
          </el-col>
          <el-col :span="8"><button class="btn">()</button></el-col>
          <el-col :span="8"><button class="btn">Not</button></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8"><button class="btn">Is</button></el-col>
          <el-col :span="8"><button class="btn">In</button></el-col>
          <el-col :span="8"><button class="btn">Null</button></el-col>
        </el-row>
      </el-col>    
      <el-col :span="15">
        <el-row style="margin-bottom:8px"><select class="select" size="10" style="width:100%;height:100%"></select></el-row>
        <el-row><button class="btn">获取值</button></el-row>
      </el-col>
    </el-row>   
    <el-row>SELECT * FROM "" where</el-row>
    <el-row :gutter="0">    
      
      <textarea rows="3" style="width: 100%;" id="showStrArea"></textarea>
    </el-row>
    <el-row>历史记录:</el-row>
    <el-row :gutter="0">    
      
      <el-select v-model="value" placeholder="请选择" style="width: 100%;" >
        <el-option 
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-row>
    <!-- <table id="tbSearch" cellspacing="5px" style="width:100%">
				<tr>
					<td colspan="4">输入查询语句</td>
				</tr>
				<tr>
					<td colspan="4">
						<select size="5" style="width:100%"></select>
					</td>
				</tr>
				<tr>
					<td width="10%">
            <button class="btn">=</button>
					</td>
					<td width="10%">
            <button class="btn"> <> </button>            
					</td>
					<td width="10%">
            <button class="btn">Like</button>   
					</td>
					<td rowspan="4">	
						<select size="10" style="width:100%"></select>
					</td>
				</tr>
				<tr>
					<td width="10%">
            <button class="btn">></button>
					</td>
					<td width="10%">
            <button class="btn">>=</button>
					</td>
					<td width="10%">
            <button class="btn">And</button>
					</td>
				</tr>
				<tr>
					<td width="10%">
            <button class="btn"><</button>
					</td>
					<td width="10%">
            <button class="btn"><=</button>
					</td>
					<td width="10%">
            <button class="btn">Or</button>
					</td>
				</tr>
				<tr>
					<td width="10%">
            <button class="btn" style="width:50%">_</button>   
            <button class="btn" style="width:50%">%</button>   
					</td>
					<td width="10%">
            <button class="btn">()</button>            
					</td>
					<td width="10%">
            <button class="btn">Not</button> 
					</td>
				</tr>
				<tr>
					<td width="10%">
            <button class="btn">Is</button> 
					</td>
					<td width="10%">
            <button class="btn">In</button> 
					</td>
					<td width="10%">
            <button class="btn">Null</button> 
					</td>
					<td width="70%" align="right">
            <button class="btn">获取值</button> 
					</td>
				</tr>
				<tr>
					<td colspan="4">SELECT * FROM "" where</td>
				</tr>
				<tr>
					<td colspan="4" align="right">
						<textarea rows="3" style="width: 100%;" id="showStrArea"></textarea>
					</td>
				</tr>
				<tr>
					<td colspan="4">历史记录:</td>				
				</tr>
				<tr>
					<td colspan="4" align="right">
						<input style="width:98%;" class="easyui-combobox fieldBox" id="lsjlCb">
					</td>
				</tr>
			</table> -->
  </el-dialog>
</template>
<script>
import { getFormData } from '@/api/formData'
import { filterData } from '@/utils/filterData'

export default {
  data() {
    return {
      visible: true,    
      value: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  mounted(){
    getFormData("XBInfo").then(respone=>{
      console.log(respone.data);
      filterData(respone.data);
    })
  },
}
</script>

<style>
  /* .row{
    margin-bottom: 20px;
  } */

  .el-row{
    margin-bottom: 10px;
  }
  .btn
  {
    width: 100%;
    height: 35px;
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    border-color: #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    outline: none;
    /* margin: 0; */
    transition: .3s;
    border-radius: 4px;
  }

  button:hover{
    background:#00BFFF;
    color: whitesmoke   
  }

  button:active
  { 
    border:black;
    color: whitesmoke
  }
</style>
