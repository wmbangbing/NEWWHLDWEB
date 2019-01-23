//将对象数组去重，重构为对象{pro1：[hash], pro02: [hash]}
export function unique(objArr) {

  var result = {};

  var proObj = objArr[0];
  for(var pro in proObj){
    var hash = []; 
    for(var i = 0; i < objArr.length; i++){
      var obj = objArr[i];
      for(var pros in obj){
        if(pros === pro){
          var val = obj[pros];
          if(!hash[val]){
            var valueObj = {};
            valueObj.lable = val;
            valueObj.value = val;
            hash.push(valueObj);
            hash[val] = true;
          }
        }
      }
    }
    result[pro] = hash;
  }
  return result;
}

export function ArrayToObj(objArr){
  var result = {};

  var proObj = objArr[0];
  for(var pro in proObj){
    var hash = []; 
    for(var i = 0; i < objArr.length; i++){
      var obj = objArr[i];
      for(var pros in obj){
        if(pros === pro){
          var val = obj[pros];
          hash.push(val);
        }
      }
    }
    result[pro] = hash;
  }
  return result;
}

//数据过滤，保留一级属性
export function filterData(jsonData){
  for(let data in jsonData){
    console.log(jsonData[data]);
    
  }
}
class data{
  constructor(XBH, XBMJ,QU,CUN) {
    this.小班号 = XBH;
    this.小班面积 = XBMJ;
    this.区 = QU;
    this.村 = CUN;
  }
}

export function constructTaskData(data){
  var tableData = [];

  data.map((t)=>{
    var levelOne = {
      District:t.District,
      Principal:t.Principal,
      ReviewTime:t.ReviewTime,
      Status:t.Status,
      SubmissionTime:t.SubmissionTime,
      TId:t.TId,
      TaskName:t.TaskName,
      TaskInfo:[]
    };
    t.TaskInfo.map((x)=>{
      x.TaskInfo_Ghcs_Rel.map((y)=>{
        var levelTwo = {
          XBH:x.XBH,
          Measure:y.Ghcs.Measure,
          XBMJ:x.XBInfo.XBMJ,
          ImpArea:y.ImpArea,
          GhStatus:y.Status
        }
        levelOne.TaskInfo.push(levelTwo);
      })
    })
    tableData.push(levelOne);
  })
  // for(let i = 0;i < data.TaskInfo.length;i++){
  //   var s = {
  //     XBH:data.XBH,
  //     TaskName:data.TaskInfo[i].Task.TaskName,
  //     ReviewTime:data.TaskInfo[i].Task.ReviewTime,
  //     Principal:data.TaskInfo[i].Task.Principal,
  //     XBMJ:data.XBMJ,
  //     GHCS:[]
  //   };

  //   for(let j = 0;j < data.TaskInfo[i].TaskInfo_Ghcs_Rel.length;j++){
  //     var t = {
  //       ImpArea:data.TaskInfo[i].TaskInfo_Ghcs_Rel[j].ImpArea,
  //       Measure:data.TaskInfo[i].TaskInfo_Ghcs_Rel[j].Ghcs.Measure,
  //       Id:j
  //     }
  //     s.GHCS.push(t)
  //   }           
    
  //   tableData.push(s);
  // }
  return tableData;
}

export function constructGhData(data){
  var d = data.filter((item) => {
    return item.TaskInfo.length != 0 && item.TaskInfo.some( tItem => {
      return tItem.GhStatus === "unreviewed"
    })
  })

  var res = [];

  d.map(i => {
    var GhInfo = i.TaskInfo.filter(j => {
      return j.GhStatus === "unreviewed"
    })

    GhInfo.map(x => {
      var obj = {
        ["区"]:i.District,   
        ["任务名"]:i.TaskName,
        ["任务负责人"]:i.Principal,
        ["提交时间"]:i.SubmissionTime,      
        ["小班号"]:x.XBH,
        ["管护措施"]:x.Measure,
        ["实施面积"]:x.ImpArea,
        ["小班面积"]:x.XBMJ
      };
      var obj1 = {
        District:i.District,   
        TaskName:i.TaskName,
        Principal:i.Principal,
        SubmissionTime:i.SubmissionTime,      
        XBH:x.XBH,
        Measure:x.Measure,
        ImpArea:x.ImpArea,
        XBMJ:x.XBMJ
      };
      res.push(obj);
    })
    
  })
  return res;
}