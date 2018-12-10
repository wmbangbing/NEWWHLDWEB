function prefix(s) {
  // Make sure the hex# is 2 characters
  if (1==s.length)
    s="0"+s
  return s
}

function breakApart(start) {
  // Split the hex # into the RGB components
  var temp = new Array()
  temp[0] = parseInt(start.substring(0,2),16)
  temp[1] = parseInt(start.substring(2,4),16)
  temp[2] = parseInt(start.substring(4,6),16)
  return temp
}

function diffParts(startInt, endInt, steps) {
  // Determine the increment amount for each step
  var temp = new Array()
  for (var i=0; i<3; i++)
    temp[i] = Math.round((endInt[i] - startInt[i]) / steps)
  return temp
}

//生成十六进制色带
function createHR(start, end, steps) {
  var startInt = breakApart(start)
  var endInt = breakApart(end)
  var stepList = diffParts(startInt, endInt, steps)
	
  var str = [];
	
  for (var r=0; r < steps; r++) {	  
    var hr = prefix(startInt[0].toString(16));
    var hg = prefix(startInt[1].toString(16));
    var hb = prefix(startInt[2].toString(16));
    str.push("#"+hr+hg+hb);
    // increment color
    for (var i=0; i < 3; i++)
      startInt[i]+=stepList[i]
	}
  return str
}

//随机生成十六进制颜色值
function getColor(){
  var colorValue="0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f";
  var colorArray = colorValue.split(",");
   var color="#";
   for(var i=0;i<6;i++){				
		color+=colorArray[Math.floor(Math.random()*16)];
   }
   return color;
}

export {createHR,getColor}
