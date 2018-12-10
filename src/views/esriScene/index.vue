<template>
  <div id="map"></div>
</template>
<script>
import esriLoader from "esri-loader";

export default  {
  name: 'twoDMap',
  mounted(){
    const options = {
      // url: 'http://223.255.43.21/arcgis_js_api4.8/library/4.8/dojo/dojo.js'
      url: 'http://202.114.148.160/arcgis_js_api4.8/library/4.8/dojo/dojo.js'
    };
    esriLoader.loadModules(['esri/Map','esri/views/SceneView'], options)
    .then(([Map,SceneView]) => {
      let map = new Map({
        basemap: 'dark-gray'
      });

      const view = new SceneView({
        map: map,
        container: 'map',
      })
    })
    .catch(err => {
      console.error(err);
    });
  }
}
</script>

<style>
  /* @import url('http://255.43.21/arcgis_js_api4.8/library/4.8/esri/css/main.css'); */
  @import url('http://202.114.148.160/arcgis_js_api4.8/library/4.8/esri/css/main.css');
  #map{
    min-height: calc(100vh - 50px);
    position: relative;
    overflow: hidden;
  }
    
</style>

