<template>
  <el-dialog
    :title=title
    :visible="visible"
    @close='closeDialog'
    width="50%">
      <div  ref="canvas" id="img" style="height:600px;"></div>
      <!-- <img src="../../../public/360/16.2.jpg" alt=""> -->
      <!-- <div class="btn" id="left" style="width: 50px;height: 50px;position: absolute;top: 50%;transform: translate(0, -50%);left: 5%;background-color:rgba(255,255,255,0);border:none">
				<img class="btnImg" width="100%" height="100%" src="@/assets/png/left-circle.png"/>
			</div>
			<div class="btn" id="right" style="width: 50px;height: 50px;position: absolute;top: 50%;transform: translate(0, -50%);right: 5%;background-color:rgba(255,255,255,0);border:none">
				<img class="btnImg" width="100%" height="100%" src="@/assets/png/right-circle.png"/>
			</div> -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="previous">上一张</el-button>
        <el-button type="primary" @click="next">下一张</el-button>
      </div>
  </el-dialog>
</template>
<script>
  import * as three from 'three';
  import * as PhotoSphereViewer from "photo-sphere-viewer";
  import "photo-sphere-viewer/dist/photo-sphere-viewer.css";
  // import p16 from "@/assets/360/16.2.jpg"
  // import p17 from "@/assets/360/17-18.2.jpg"
  // import p19 from "@/assets/360/19.2.jpg"
  // import p20 from "@/assets/360/20.2.jpg"
  // import p24 from "@/assets/360/24-25.2.jpg"
  // import p26 from "@/assets/360/26.2.jpg"
  export default {
    name: '',
    data() {
      return {
        title:"全景图",
        visible:this.PhotoSphereViewerParam.visible,
        imgID:this.PhotoSphereViewerParam.imgID,
        PSV:null,
        // m:{
        //   '16.2':p16,
        //   '17-18.2':p17,
        //   '19.2':p19,
        //   '20.2':p20,
        //   '24-25.2':p24,
        //   '26.2':p26
        // },
        a:["10-11","12","14","16","17-18","19","20","23","24-25","26","27","28","29","30","32","33","34","34","36","38","39"],
        oldPano:null,
        i:null
      }
    },
    props:["PhotoSphereViewerParam"],
    watch:{
      "PhotoSphereViewerParam.visible":function(curVal,oldVal){      
        this.visible = true;
        this.$nextTick(function () {
          this.PSV=null;
          this.$refs.canvas.innerHTML="";
          this.i = this.a.indexOf(this.PhotoSphereViewerParam.imgID);
          this.init();        
        })
      }
    },
    methods:{
      closeDialog(){
        this.visible = false;
      },
      init(){      
        // var s = this.m[`${this.PhotoSphereViewerParam.imgID}`]
        // this.i = this.a.indexOf(this.PhotoSphereViewerParam.imgID);
        // this.oldPano = s;
        this.renderer(this.PhotoSphereViewerParam.imgID)   
      },
      previous(){
        // this.$refs.canvas.innerHTML=""
        if(this.i>0){
          this.i = this.i-1;
        }else{
          this.i = this.a.length-1;
        }  

        // var s = this.m[this.a[this.i]];    
        this.renderer(this.a[this.i]);
        // this.oldPano = s;        
      },
      next(){
        if(this.i<this.a.length-1){
          this.i = this.i+1;
        }else{
          this.i = 0;
        }
        // var s = this.m[this.a[this.i]];    
        this.renderer(this.a[this.i]);
        // this.oldPano = s;        
      },
      renderer(id){
        if(this.PSV!=null){
          // this.PSV.clearPanoramaCache(this.oldPano);
          this.PSV.destroy();
          this.$refs.canvas.innerHTML=""          
          // this.PSV = new PhotoSphereViewer({
          //   panorama: s,
          //   zoom_level:50,
          //   caption:this.a[this.i],
          //   navbar:true,
          //   container: document.getElementById("img")
          // })   
        }else{
          // this.PSV = new PhotoSphereViewer({
          //   // panorama: s,
          //   panorama: require(`../../../public/360/${this.PhotoSphereViewerParam.imgID}.jpg`),
          //   zoom_level:50,
          //   caption:this.a[this.i],
          //   navbar:true,
          //   container: document.getElementById("img")
          // })   
        }
        this.PSV = new PhotoSphereViewer({
          // panorama: s,
          // panorama: require(`../../../public/360/${id}.jpg`),
          panorama: require(`../../assets/360/${id}.jpg`),
          zoom_level:50,
          caption:id,
          navbar:true,
          container: document.getElementById("img")
        })   
      
        // this.PSV = new PhotoSphereViewer({
        //   panorama: s,
        //   zoom_level:50,
        //   caption:this.a[this.i],
        //   navbar:true,
        //   container: document.getElementById("img")
        // })   
      }
    }
  }
</script>

<style scoped>
  .btnImg:hover{
    cursor : pointer;
  }
</style>