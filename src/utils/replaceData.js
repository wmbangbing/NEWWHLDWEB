export function replaceKey(json,replacedArr,replaceArr){
  var jsonData;
  if(typeof json === "string"){
    jsonData = json;
  }else{
    jsonData = JSON.stringify(json);
  }
  replacedArr.map((key,index) =>{
    jsonData = jsonData.replace(new RegExp(key,'g'),replaceArr[index])
  })

  return JSON.parse(jsonData);
}