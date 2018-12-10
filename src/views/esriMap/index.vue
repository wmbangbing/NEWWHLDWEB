<template>
<div>
  <div id="map">
    <button class="action-button esri-icon-upload" id="openUpload" @click="openUploadTask" title="打开上传面板" style="display:none"></button>
    <button class="action-button esri-icon-maps" id="renderer"  @click="openRenderer" style="display:none"></button>


    <TaskSelector :taskSelectorParam=taskSelectorParam @returnXBH="getSelectedXBH" id="SelectedXBH"/>
    <ExpandTable :expandTableParam=expandTableParam  id="expandTb"/>
    <FieldTable  :fieldTableParam=fieldTableParam @returnXBH="moveToDK"  @openRowEdit="openRowEdit" @openDownloadDialog=openDownloadDialog id="fieldTb"/>
  </div>
  <PivottableDialog :pivottableParam=pivottableParam  />
  <UploadTaskDialog id="UploadTask" :UploadTaskParam=UploadTaskParam  @refreshTaskSel="refreshTaskSel" />
  <DownloadDialog :DownloadParam=DownloadParam />
  <row-edit :rowEditParam=rowEditParam />
  <RendererDialog @renderer="rendererXBLayer" :rendererParam=rendererParam />
  <PhotoSphereViewerDialog :PhotoSphereViewerParam=PhotoSphereViewerParam />
  <!-- <QueryDialog /> -->
</div>
 
</template>
<script>
import esriLoader from "esri-loader";
import FieldTable from '@/components/FieldTable' 
import ChartDialog from '@/components/ChartDialog' 
import PivottableDialog from '@/components/PivottableDialog' 
import TaskSelector from '@/components/TaskSelector' 
import ExpandTable from '@/components/ExpandTable' 
import QueryDialog from '@/components/QueryDialog' 
import RowEdit from '@/components/RowEdit' 
import UploadTaskDialog from '@/components/UploadTaskDialog' 
import DownloadDialog from '@/components/DownloadDialog' 
import RendererDialog from '@/components/RendererDialog' 
import PhotoSphereViewerDialog from '@/components/PhotoSphereViewerDialog' 
import {createMap} from "./esriMap"
import panoramicJson from "@/assets/json/panoramic.json"
// import { unique } from '@/utils/filterData'

export default  {
  name: 'EsriMap',
  data(){
    return {
      chartParam:{
        visible:false,
        field:null        
      },
      pivottableParam:{
        visible:false,
        data:null,
        id:""
      },
      fieldTableParam:{
        visible:false,
        data:null,       
      },
      taskSelectorParam:{
        visible:false,
        count:0
      },
      expandTableParam:{
        visible:false,
        XBId:null,
        task:null
      },
      dialogFormVisible:false,
      UploadTaskParam:{
        visible:false
      },
      DownloadParam:{
        visible:false
      },
      rowEditParam:{
        visible:false
      },
      rendererParam:{
        visible:false
      },
      PhotoSphereViewerParam:{
        visible:false,
        imgID:""
      },
      selectId:[],
      xbLayer:undefined,
      view:undefined,
      renderer:null
    }
  },
  components:{
    FieldTable,
    ChartDialog,
    PivottableDialog,
    TaskSelector,
    ExpandTable,
    QueryDialog,
    RowEdit,
    UploadTaskDialog,
    DownloadDialog,
    RendererDialog,
    PhotoSphereViewerDialog
  },
  mounted(){      
    var self = this;
    this.initMap(self);
  },
  methods:{
    initMap(self){
      const options = {
        // url: 'http://223.255.43.21/arcgis_js_api4.8/library/4.8/dojo/dojo.js',
        url: 'http://202.114.148.160/arcgis_js_api4.8/library/4.8/dojo/dojo.js',
        // url:'https://js.arcgis.com/4.9/'
      };
      createMap(esriLoader,options,panoramicJson,self)
    },
    getSelectedXBH(value){
      this.expandTableParam.visible = !this.expandTableParam.visible;
      this.expandTableParam.XBId = value[1];
      this.expandTableParam.task = value[0];     
      this.moveToDK(value[1])
    },
    moveToDK(XBH){
      var query = this.xbLayer.createQuery();
      query.where = `XBH = ${XBH}`;
      query.outFields = [ "XBH" ];
      query.returnGeometry = true;

      this.xbLayer.queryFeatures(query).then(reponse =>{
        this.view.goTo(reponse.features[0].geometry)    
      })
    },
    openRowEdit(visible){
      this.rowEditParam.visible = !this.rowEditParam.visible;
    },
    openUploadTask(){
      this.UploadTaskParam.visible =! this.UploadTaskParam.visible;
    },
    refreshTaskSel(){
      this.taskSelectorParam.count++;
    },
    openDownloadDialog(){
      this.DownloadParam.visible = !this.DownloadParam.visible;
    },
    openRenderer(){
      this.rendererParam.visible = !this.rendererParam.visible
    },
    rendererXBLayer(renderer){
      this.xbLayer.renderer = renderer;
      // this.xbLayer.opacity = 1;
      
    }
  },
}
</script>

<style>
  /* @import url('http://223.255.43.21/arcgis_js_api4.8/library/4.8/esri/css/main.css'); */
  /* @import url('https://js.arcgis.com/4.9/esri/css/main.css'); */
  @import url('https://js.arcgis.com/4.9/esri/css/main.css');
  #map{
    min-height: calc(100vh - 50px);
    position: relative;
    overflow: hidden;
  }  

  .layerTooltip {
    position: absolute;
    pointer-events: none;
    transition: opacity 200ms;
  }

  .layerTooltip>div {
    margin: 0 auto;
    padding: 12px;
    border-radius: 4px;
    box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.75);
    transform: translate3d(-50%, -125%, 0);
  }

  .action-button {
    font-size: 16px;
    background-color: #fff;
    border: 1px solid #D3D3D3;
    color: #6e6e6e;
    height: 32px;
    width: 32px;
    text-align: center;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);  
  }

  .action-button:hover{
    cursor:pointer;
    background-color:whitesmoke;
    color:#6e6e6e;
  }
</style>

