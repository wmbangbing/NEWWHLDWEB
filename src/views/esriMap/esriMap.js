export const createMap = function (esriLoader, options,panoramicJson, self) {
  esriLoader.loadModules(
    [
      'esri/Map',
      "esri/Basemap",
      "esri/Viewpoint",
      "esri/Graphic",
      "esri/geometry/Polygon",
      "esri/geometry/geometryEngine",
      'esri/views/MapView',
      "esri/layers/FeatureLayer",
      "esri/layers/WebTileLayer",
      "esri/layers/TileLayer",
      "esri/layers/GraphicsLayer",
      "esri/layers/MapImageLayer",
      "esri/widgets/Expand",
      "esri/widgets/Home",
      "esri/widgets/LayerList",
      "esri/widgets/BasemapGallery",
      "esri/widgets/Legend",
      "esri/widgets/Compass",
      "esri/widgets/Print",
      "esri/views/2d/draw/Draw",
      "esri/core/urlUtils",
    ],options)
  .then(
    ([
      Map,
      Basemap,
      Viewpoint,
      Graphic,
      Polygon,
      geometryEngine,
      MapView,
      FeatureLayer,
      WebTileLayer,
      TileLayer,
      GraphicsLayer,
      MapImageLayer,
      Expand,
      Home,
      LayerList,
      BasemapGallery,
      Legend,
      Compass,
      Print,
      Draw,
      urlUtils
    ]) => {

    // urlUtils.addProxyRule({
    //   urlPrefix: "http://202.114.148.160//arcgis_js_api4.8",
    //   proxyUrl: "http://202.114.148.160/DotNet/proxy.ashx"
    // });

    //地图底图
    const ESRIvectorBaselayer = new TileLayer({
      url:"https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer"
    })

    const ESRIVectorBasemap = new Basemap({
        baseLayers: [ESRIvectorBaselayer],
        title: "ESRI矢量图",
        thumbnailUrl: "https://www.arcgis.com/sharing/rest/content/items/fb84ad313bd3432983488ed1ba1d5bf3/info/thumbnail/ago_downloaded.png?f=json"
    });

    const ESRIrasterBaselayer = new TileLayer({
        url: "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
    })

    const ESRIRasterBasemap = new Basemap({
        baseLayers: [ESRIrasterBaselayer],
        title: "ESRI影像图",
        thumbnailUrl: "https://www.arcgis.com/sharing/rest/content/items/25cefd52161e44b8a5eec87768f79079/info/thumbnail/thumbnail.jpeg?f=json"
    });

    const rasterTileLayer = new WebTileLayer({
      urlTemplate: "http://{subDomain}.tianditu.com/DataServer?T=img_w&x={col}&y={row}&l={level}",
      subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
      copyright: "天地图影像"
    });

    const vectorTileLayer = new WebTileLayer({
      urlTemplate: "http://{subDomain}.tianditu.com/DataServer?T=vec_w&x={col}&y={row}&l={level}",
      subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
      copyright: "天地图矢量"
    });

    const imgAnnotationTileLayer = new WebTileLayer({
      urlTemplate: "http://{subDomain}.tianditu.com/DataServer?T=cia_w&x={col}&y={row}&l={level}",
      subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
      copyright: "天地图影像"
    });

    const vecAnnotationTileLayer = new WebTileLayer({
      urlTemplate: "http://{subDomain}.tianditu.com/DataServer?T=cva_w&x={col}&y={row}&l={level}",
      subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
      copyright: "天地图矢量"
    });

    const grayLayer = new TileLayer({
      url: "https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer",
    })

    const vecBasemap = new Basemap({
      baseLayers: [vectorTileLayer, vecAnnotationTileLayer],
      title: "天地矢量",
      thumbnailUrl: "https://www.arcgis.com/sharing/rest/content/items/fb84ad313bd3432983488ed1ba1d5bf3/info/thumbnail/ago_downloaded.png?f=json"
    });

    const imgBasemap = new Basemap({
      baseLayers: [rasterTileLayer, imgAnnotationTileLayer],
      title: "天地影像",
      thumbnailUrl: "https://www.arcgis.com/sharing/rest/content/items/25cefd52161e44b8a5eec87768f79079/info/thumbnail/thumbnail.jpeg?f=json"
    });

    const gray = new Basemap({
      baseLayers: [grayLayer],
      title: "灰色图",
      thumbnailUrl: "https://www.arcgis.com/sharing/rest/content/items/74e992f4fce3450aaf57a9a0df0007c3/info/thumbnail/cn_canvas.jpg?f=json"
    })

    //底图数组
    const basemaps = [ESRIVectorBasemap,ESRIRasterBasemap,vecBasemap, imgBasemap, gray];

    //弹窗
    const GhcsAct = {
      title: "管护措施",
      id: "GHCS_id",
      // image: require('@/assets//search.png')
      className:"esri-icon-search"
    }

    const HistAct = {
      title: "历史小班",
      id: "Hist_id",
      // image: require('@/assets//history.png')
      className:"esri-icon-time-clock"
    }

    const popupTemplate = {
      title: "小班号：{XBH}",
      content: [{
        type: "fields",
        fieldInfos: [{
          fieldName: "DWMC",
          label: "管理所属",
        },{
          fieldName: "XIANG_NAME",
          label: "街道",
        },{
          fieldName: "CUN_NAME",
          label: "村",
        },{
          fieldName: "XBMJ",
          label: "面积",
          // format: {
          //   places: 0,
          //   digitSeparator: true
          // }
        }]
      }],
      actions:[GhcsAct,HistAct]
    };

    //基础图层
    self.xbLayer = new FeatureLayer({
      // url:"http://202.114.148.160:8000/arcgis/rest/services/LinYeMapService/whld_2018/MapServer/0",
      // url:"http://223.255.43.21:6080/arcgis/rest/services/WHLD_Group/WHLD/MapServer",
      // url:"http://202.114.148.160:8000/arcgis/rest/services/LinYeMapService/whld_2019_1/MapServer",
      url:"http://223.255.43.21:6080/arcgis/rest/services/WHLD_Group/WHLD_2019/MapServer",
      outFields:["*"],
      visible: true,
      title:"小班图层",
      popupTemplate: popupTemplate,
      definitionExpression: self.$store.getters.definitionExpression,
      renderer:{
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
      }
    }) 

    // const droneBaseMap = new MapImageLayer({
    //   url:"http://202.114.148.160:8000/arcgis/rest/services/LinYeMapService/WHLDIMGNC/MapServer",
    //   // sublayers: [{
    //   //   id: 0
    //   // }]
    // })

    const testlayer = new TileLayer({
      url:"http://223.255.43.21:6080/arcgis/rest/services/WHLD_Group/WHLDIMG/MapServer"
    })

    //360图层
    var gralayer = new GraphicsLayer({
      title:"360全景点"
    });
    const markerSymbol = {
      type: "simple-marker", 
      color: [226, 119, 40],
      outline: {
        color: [255, 255, 255],
        width: 2
      }
    };

    for(let i=0;i<panoramicJson.length;i++){
      gralayer.add(createGraphic360(panoramicJson[i]));
    }
    
    function createGraphic360(data){
      var graphic =  new Graphic(data);
      graphic.symbol = markerSymbol;
       return graphic;
    }

    //地图
    self.map = new Map({
      basemap: 'satellite',
      layers:[testlayer,self.xbLayer,gralayer]
    });

    self.view = new MapView({
      map: self.map,
      container:self.$refs.map,
      // container: 'map',
      zoom: 10,
      center: [114.31, 30.59],
    });

    //鼠标浮动
    var layerTooltip = createLayerTooltip();
	
    self.view.on("pointer-move", function(event) {
      self.view.hitTest(event.x, event.y)
        .then(function(hit) {
          var results = hit.results.filter(function(result) {
            return result.graphic.layer === self.xbLayer;
          });
          
          if(results.length) {
            var graphic = results[0].graphic;
            var screenPoint = hit.screenPoint;
            layerTooltip.show(screenPoint, `小班号:${graphic.getAttribute("XBH")}`);
          } else {
            layerTooltip.hide();
        }
      })
    })
		
		
    function createLayerTooltip() {
      var tooltip = document.createElement("div");
      var style = tooltip.style;

      tooltip.setAttribute("role", "layerTooltip");
      tooltip.classList.add("layerTooltip");

      var textElement = document.createElement("div");
      textElement.classList.add("esri-widget");
      tooltip.appendChild(textElement);

      self.view.container.appendChild(tooltip);

      var x = 0;
      var y = 0;
      var targetX = 0;
      var targetY = 0;
      var visible = false;

      // move the tooltip progressively
      function move() {
        x += (targetX - x) * 0.1;
        y += (targetY - y) * 0.1;

        if (Math.abs(targetX - x) < 1 && Math.abs(targetY - y) < 1) {
          x = targetX;
          y = targetY;
        } else {
          requestAnimationFrame(move);
        }

        style.transform = "translate3d(" + Math.round(x) + "px," + Math.round(
          y) + "px, 0)";
      }

      return {
        show: function(point, text) {
          if (!visible) {
            x = point.x;
            y = point.y;
          }

          targetX = point.x;
          targetY = point.y;
          style.opacity = 1;
          visible = true;
          textElement.innerHTML = text;
          move();
        },

        hide: function() {
          style.opacity = 0;
          visible = false;
        }
      };
    }
    

    //图层管理
    const layerList = new LayerList({
      view: self.view,
      listItemCreatedFunction:defineActions
    });

    function defineActions(event) {
      let item = event.item;    
      
      switch(item.title){
        case "小班图层":
        item.actionsSections = [
          [{
            title: "缩放到图层",
            className: "esri-icon-zoom-out-fixed",
            id: "full-extent"
          }, {
            title: "图层信息",
            className: "esri-icon-description",
            id: "information"
          }],
          [{
            title: "提高透明度",
            className: "esri-icon-up",
            id: "increase-opacity"
          }, {
            title: "降低透明度",
            className: "esri-icon-down",
            id: "decrease-opacity"
          }],
          [{
            title: "属性列表",
            className: "esri-icon-table",
            id: "field"
          },{
            title: "分析图表",
            className: "esri-icon-table",
            id: "pivot"
          }]
        ]
        break;       
      }
    }
    
    const exp = new Expand({
      view: self.view,
      content: layerList
    });

    var defaultSym = {
        type: "simple-fill",
        outline: { 
            color: "lightgray",
            width: 0.5
        }
    };

    self.view.when(function(){     
      self.taskSelectorParam.visible = true //任务查询可见
      // openUpload.style.display = "block";
      renderer.style.display = "block";
      // measure.style.display = "block";

      layerList.on("trigger-action", function(event) {
        var layer = event.item.layer; //被选图层
        var id = event.action.id;     //被选操作

        if (id === "full-extent") {
          self.view.goTo(layer.fullExtent);
        } else if (id === "information") {
          window.open(layer.url);
        } else if (id === "increase-opacity") {
          if (layer.opacity > 0) {
            layer.opacity -= 0.25;
          }
        } else if (id === "decrease-opacity"){
          if (layer.opacity < 1) {
            layer.opacity += 0.25;
          }
        } else if (id === "field"){
          self.fieldTableParam.visible = !self.fieldTableParam.visible;
        } else if (id === "pivot"){
          self.pivottableParam.visible = !self.pivottableParam.visible;
        }
      })

      //测量面积
      // var draw = new Draw({
      //   view: self.view
      // });
      
      // var drawPolygonButton = document.getElementById("measure");
      // drawPolygonButton.addEventListener("click", function() {
      //   self.view.graphics.removeAll();
      //   enableCreatePolygon(draw, self.view);
      // });


      //360全景图片
      var arr = [];
      panoramicJson.map(function(dt){
        arr.push(dt.attributes.imgID)
      });

      self.view.on("click", function (event) {
        var screenPoint = {
            x: event.x,
            y: event.y
        };
     
        self.view.hitTest(screenPoint).then(function (response) {
           if (response.results.length) {
              var graphic = response.results.filter(function (result) {
              return result.graphic.layer === gralayer;
            })[0].graphic;
            self.PhotoSphereViewerParam.visible = !self.PhotoSphereViewerParam.visible;
            self.PhotoSphereViewerParam.imgID = graphic.attributes.imgID;
         }
        }); 	
      });
    });

    self.xbLayer.when(()=>{
      console.log(self.xbLayer)
      self.view.goTo(self.xbLayer.fullExtent);

      const homeWidget = new Home({
        view: self.view,
        viewpoint:new Viewpoint({
          targetGeometry:self.xbLayer.fullExtent
        })
      });

      self.view.ui.add([{
        component: homeWidget,
        position: "top-left",
        index: 1
      }])

      // self.xbLayer.queryFeatures().then(function (results) {
      //   var features = results.features;
      //   var attributes = self.$store.getters.enXBInfo;
      //   for(var feature of features){
      //     if(feature.attributes.XBH == 1171028){
      //       feature.attributes.XBMJ = 123456;
      //     }else{
      //       continue;
      //     }
      //   }

      //   var rendererLayer = new FeatureLayer({
      //     source:features,
      //     fields: [],
      //     outFields:["*"],
      //     objectIdField: "FID",  // field name of the Object IDs
      //     geometryType: "polygon",
      //     title:"渲染图层",
      //     popupTemplate: popupTemplate,
      //     renderer:{
      //       type: "simple", 
      //       symbol: {
      //         type: "simple-fill", 
      //         size: 6,
      //         color:[0, 255, 123, 0.1],
      //         outline: { 
      //           width: 0.5,
      //           color: "red"
      //         }
      //       }
      //     }
      //   })
      //   map.add(rendererLayer);
      // })      
    })

    function enableCreatePolygon(draw, view) {
      // create() will return a reference to an instance of PolygonDrawAction
      var action = draw.create("polygon");

      // focus the view to activate keyboard shortcuts for drawing polygons
      view.focus();

      // listen to vertex-add event on the action
      action.on("vertex-add", drawPolygon);

      // listen to cursor-update event on the action
      action.on("cursor-update", drawPolygon);

      // listen to vertex-remove event on the action
      action.on("vertex-remove", drawPolygon);

      // *******************************************
      // listen to draw-complete event on the action
      // *******************************************
      action.on("draw-complete", drawPolygon);
    }

    // this function is called from the polygon draw action events
    // to provide a visual feedback to users as they are drawing a polygon
    function drawPolygon(event) {
      var vertices = event.vertices;

      //remove existing graphic
      self.view.graphics.removeAll();

      // create a new polygon
      var polygon = createPolygon(vertices);

      // create a new graphic representing the polygon, add it to the view
      var graphic = createGraphic(polygon);
      self.view.graphics.add(graphic);

      // calculate the area of the polygon
      var area = geometryEngine.geodesicArea(polygon, "square-meters");
      if (area < 0) {
        // simplify the polygon if needed and calculate the area again
        var simplifiedPolygon = geometryEngine.simplify(polygon);
        if (simplifiedPolygon) {
          area = geometryEngine.geodesicArea(simplifiedPolygon, "square-meters");
        }
      }
      // start displaying the area of the polygon
      labelAreas(polygon, area);
    }

    // create a polygon using the provided vertices
    function createPolygon(vertices) {
      return new Polygon({
        rings: vertices,
        spatialReference: self.view.spatialReference
      });
    }

    // create a new graphic representing the polygon that is being drawn on the view
    function createGraphic(polygon) {
      var graphic = new Graphic({
        geometry: polygon,
        symbol: {
          type: "simple-fill", // autocasts as SimpleFillSymbol
          color: [178, 102, 234, 0.8],
          style: "solid",
          outline: { // autocasts as SimpleLineSymbol
            color: [255, 255, 255],
            width: 2
          }
        }
      });
      return graphic;
    }

    //Label polyon with its area
    function labelAreas(geom, area) {
      var graphic = new Graphic({
        geometry: geom.centroid,
        symbol: {
          type: "text",
          color: "white",
          haloColor: "black",
          haloSize: "1px",
          text: area.toFixed(2) + " 平方米",
          xoffset: 3,
          yoffset: 3,
          font: { // autocast as Font
            size: 14,
            family: "sans-serif"
          }
        }
      });
      self.view.graphics.add(graphic);
    }

    //显示管护措施表格
    function GHTb(Id){
      self.expandTableParam.visible = !self.expandTableParam.visible;
      self.expandTableParam.task = null;   
      self.expandTableParam.XBId = Id;
    }

    function openHistTb(XBH){
      self.historyTableParam.visible = !self.historyTableParam.visible;
      self.historyTableParam.XBH = XBH;
    }

    self.view.popup.on("trigger-action", function(event) {
      switch (event.action.id){
        case "GHCS_id":
          var Id = event.target.selectedFeature.attributes.XBH;
          GHTb(Id);
          break;
        case "Hist_id":
          var XBH = event.target.selectedFeature.attributes.XBH;
          openHistTb(XBH);
          break;
        default:
          // console.log("sss")
          break;
      }
      // if (event.action.id === "GHCS_id") {
      //   let Id = event.target.selectedFeature.attributes.XBH;
      //   GHTb(Id)
      // }
    });

    //窗口组件
    const basemapGallery = new BasemapGallery({
      view: self.view,
      container: document.createElement("div"),
      source: basemaps
    });

    const bgExpand = new Expand({
      view: self.view,
      content: basemapGallery.container,
      expandIconClass: "esri-icon-basemap"
    });

    // const homeWidget = new Home({
    //   view: self.view
    // });

    const compass = new Compass({
      view: self.view,
      viewpoint:new Viewpoint({
        targetGeometry: self.xbLayer.fullExtent
      })
    })

    const print = new Print({
      view: self.view,
      printServiceUrl:"http://223.255.43.21:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
      // printServiceUrl:"http://202.114.148.160:8000/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
      container: document.createElement("div")  
    })

    const printExpand = new Expand({
      view: self.view,
      content: print.container,
      expandIconClass: "esri-icon-printer"
    })

    const legend = new Legend({
      view: self.view,
      layerInfos: [{
        layer: self.xbLayer,
        title: "图例"
      }]
    })

    const taskExp = new Expand ({
      view: self.view,
      content: SelectedXBH,
      expandIconClass: "esri-icon-review"
    })

    self.view.ui.add([
      {
        component: bgExpand,
        position: "top-right",
        index: 0
      },{
        component: exp,
        position: "top-right",
        index: 1
      },
      {
        component: printExpand,
        position: "top-right",
        index: 2
      },
      // {
      //   component: measure,
      //   position: "top-right",
      //   index: 3
      // },
      {
        component: compass,
        position: "top-left",
        index: 2
      },
      // {
      //   component: openUpload,
      //   position: "top-left",
      //   index: 4
      // },
      {
        component: renderer,
        position: "top-left",
        index: 3
      },  
      {
        component: taskExp,
        position: "top-left",
        index: 4
      },
      {
        component: legend,
        position: "bottom-right",
        index: 0
      },
      {
        component: expandTb,
        position: "bottom-left",
        // index: 4
      },
      {
        component: fieldTb,
        position: "bottom-left",
        // index: 4
      },
      {
        component:historyTb,
        position: "bottom-left",        
      }
      
      // {
      //   component: table,
      //   position: "bottom-left",
      //   index: 0
      // }
    ]);  
  })
  .catch(err => {
    console.error(err);
  });
}

export const test = function(esriLoader, options, self){
  esriLoader.loadModules(
    [
      'esri/Map',
      "esri/Basemap",
      "esri/Viewpoint",
      "esri/Graphic",
      "esri/geometry/Polygon",
      "esri/geometry/geometryEngine",
      'esri/views/MapView',
      "esri/layers/FeatureLayer",
      "esri/layers/WebTileLayer",
      "esri/layers/TileLayer",
      "esri/layers/GraphicsLayer",
      "esri/layers/MapImageLayer",
      "esri/widgets/Expand",
      "esri/widgets/Home",
      "esri/widgets/LayerList",
      "esri/widgets/BasemapGallery",
      "esri/widgets/Legend",
      "esri/widgets/Compass",
      "esri/widgets/Print",
      "esri/views/2d/draw/Draw",
      "esri/core/urlUtils",
    ],options)
  .then(
    ([
      Map,
      Basemap,
      Viewpoint,
      Graphic,
      Polygon,
      geometryEngine,
      MapView,
      FeatureLayer,
      WebTileLayer,
      TileLayer,
      GraphicsLayer,
      MapImageLayer,
      Expand,
      Home,
      LayerList,
      BasemapGallery,
      Legend,
      Compass,
      Print,
      Draw,
      urlUtils
    ]) => {
      var layer = new FeatureLayer({
        url:"http://223.255.43.21:6080/arcgis/rest/services/WHLD_Group/WHLD_2019/MapServer"
      });

      self.map.add(layer);
    }
  )
}