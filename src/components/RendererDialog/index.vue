<template>
  <el-dialog
  :visible=dialogVisible
  title="渲染面板"
  @close='closeDialog'
  width=350px>
    <!-- <el-scrollbar wrap-class="list">  -->
    <el-tabs tab-position="top" @tab-click="handleClick" style="height: 400px;" class="innerbox">
      <el-tab-pane label="按类别渲染">              
        <el-select @change="uniqueChange"  style="width:100%" v-model="value1" placeholder="请选择字段">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>    
        <div v-bind:key="item.name" v-for="item in uniqueItems" class="colorRow">    
          <P>{{item.name}}:</P> 
          <el-row>
            <el-col :span="21"><div class="grid-content bg-purple" v-bind:style="{background:item.color}"></div></el-col>
            <el-col :span="2"><el-color-picker v-model="item.color"></el-color-picker> </el-col>
          </el-row>                               
        </div>                 
      </el-tab-pane>
      <el-tab-pane label="按数值渲染">
        <el-select @change="valChange"  style="width:100%" v-model="value2" placeholder="请选择字段">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>   
        <el-select @change="classChange"  style="width:100%;margin-top:10px" v-model="value3" placeholder="请选择分类数">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>    
        <div v-bind:key="item.name" v-for="item in valueItems" class="colorRow">    
          <P>{{item.min}}-{{item.max}}</P> 
          <el-row>
            <el-col :span="21"><div class="grid-content bg-purple" v-bind:style="{background:item.color}"></div></el-col>
            <el-col :span="2"><el-color-picker v-model="item.color"></el-color-picker> </el-col>
          </el-row>                               
        </div>             
      </el-tab-pane>
    </el-tabs>
    <!-- </el-scrollbar>  -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="defaultRenderer">默 认 渲 染</el-button>
      <el-button @click="dialogVisible=false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>    
  </el-dialog>
</template>

<script>
  import { createHR } from '@/utils/color'

  export default {
    name: '',
    data() {
      return {
        options1: [{
          value: 'DWMC',
          label: '县/区'
        },{
          value: 'DL',
          label: '地类'
        },{
          value: 'YBD',
          label: '郁闭度'
        }],
        value1: '',
        uniqueField:"",
        classRdrDg:{
          'DWMC': ["东湖高新", "东湖高新区","东西湖区","新洲区", "江夏区", "洪山区", "蔡甸区", "黄陂区"],
          'DL': ["非林地", "灌木林地", "建筑用地", "苗圃地", "其它宜林地", "疏林地", "水域", "未成林地", "无立木林地", "宜林荒山荒地", "有林地"],
          '造林时间': ["0", "2002", "2003", "2004", "2005"],
          'YBD': ["0", "0.1", "0.15", "0.2", "0.25", "0.30", "0.40", "0.45", "0.50", "0.55", "0.60", "0.65", "0.70", "0.75", "0.80", "0.85", "0.90", "0.95", "0.100"],
          '位置': ["机场路生态风景林带", "环城高速生态风景林带"]
        },
        uniqueItems:[],
        tabID:0,
        options2:[{
          value:"PJSG",
          label:"平均树高"
        },{
          value:"PJXJ",
          label:"平均胸径"
        },{
          value:"MMZS",
          label:"每亩株数"
        },],
        value2: '',
        options3:[{
          value:3,
          label:3
        },{
          value:4,
          label:4
        },{
          value:5,
          label:5
        },{
          value:6,
          label:6
        },{
          value:7,
          label:7
        }],
        value3: '',
        maxmin:{
          "PJSG":{
            max:19,
            min:0,
          },
          "PJXJ":{
            max:29,
            min:0,
          },        
          "MMZS":{
            max:334,
            min:0,
          }
        },
        valueItems:[],
        valueField:null,
        klass:null,
        dialogVisible:this.rendererParam.visible,
        renderer:null
      }
    },  
    props:['rendererParam'],
    computed:{
      classSelectors() {
        const { valueField, klass } = this;
        return {
          valueField,
          klass
        }
      }
    },
    watch:{
      classSelectors: {
        handler: function(val) {
          if(val.valueField&&val.klass){
            this.valueItems = [];            
            var colorArr = createHR("006400", "00F400",val.klass);
            var maxmin = this.maxmin[val.valueField];
            var midValue = Math.round((maxmin.max - maxmin.min) / val.klass);
            for(let i = 0; i < val.klass;i++){
              let item = {};
              item.min = maxmin.min+midValue * i;
              item.max = maxmin.min+midValue * (i + 1);
              item.color = colorArr[i];
              this.valueItems.push(item)  
            }
          }
        },
        deep: true
      },
      "rendererParam.visible":function(){
        this.dialogVisible = true;
      }
    },
    methods:{
      uniqueChange(field){
        this.uniqueField = field;
        this.uniqueItems = [];
        var valArr = this.classRdrDg[field];
        var colorArr = createHR("006400", "00F400",valArr.length)
        for(var val in valArr){
          let item = {};
          item.name = valArr[val];
          item.color = colorArr[val];
          this.uniqueItems.push(item)          
        };
      },     
      valChange(field){
        this.valueField = field;
      },
      classChange(field){
        this.klass = field;
      },
      confirm(){
        if(!this.uniqueField&&!this.valueField){
          this.$message({
            message: '请选择后再确认！',
            type: 'warning'
          })
        }
        if(this.tabID == 0){
          var uniqueRenderer = {
            type: "unique-value", 
            field: this.uniqueField,
            defaultSymbol: { type: "simple-fill" },
            uniqueValueInfos: []
          };
          for(let i in this.uniqueItems){
            var s = {
              value:  this.uniqueItems[i].name,
              symbol: {
                type: "simple-fill", 
                color: this.uniqueItems[i].color
              }
            };
            uniqueRenderer.uniqueValueInfos.push(s);
          }     
          console.log(uniqueRenderer);
          this.renderer = uniqueRenderer;
        }else{
          var classBreakRenderer = {
            type: "class-breaks", // autocasts as new ClassBreaksRenderer()
            field: this.valueField,
            classBreakInfos:[]
          };
          for(let i in this.valueItems){
            var s = {
              minValue:this.valueItems[i].min,
              maxValue:this.valueItems[i].max,
              symbol:{
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: this.valueItems[i].color,
                style: "solid",
                outline: {
                  width: 0.5,
                  color: "white"
                }
              },
            };                     
            classBreakRenderer.classBreakInfos.push(s);
          }
          console.log(classBreakRenderer);
          this.renderer = classBreakRenderer;
        }
        this.$emit("renderer",this.renderer);
      },
      defaultRenderer(){
        this.renderer = {
          type: "simple", 
          symbol: {
            type: "simple-fill", 
            size: 6,
            color:[0, 255, 123, 0.1],
            outline: { 
              width: 0.5,
              color: "red"
            }
          }
        };
        this.$emit("renderer",this.renderer);
        this.dialogVisible = false;
      },
      handleClick(tab,event){
        this.tabID = tab.index;
      },
       closeDialog(){
        this.dialogVisible = false;
      },
    }
  }
</script>

<style scoped>
  .el-scrollbar__wrap {
    overflow: visible;
    overflow-x: hidden;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

</style>

