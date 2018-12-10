import { getFormData } from '@/api/formData'
import { replaceKey } from '@/utils/replaceData'

var enKeys = ["XBH","DWMC","XIANG","CUN","XBMJ","PD","HB","JD","WD","LDQS","LMQS","DL","LL","QLLX","ZLSJ","SZZC","YSSZ","PJSG","PJXJ","HJSZ","HJPJSG","HJPJXJ","MMXJ","LZU","MMZS","YBD","SLJKDJ","QLJG","GMZL","GMGD","CBZL","CBGD","ZBGD","RWGR","YYGHS","GHXS"];
var cnKeys = ["小班号","县/区","乡/街道","村/社区","小班面积","坡度","海拔","经度","纬度","林地权属","林木权属","地类","林龄","群落类型","造林时间","树种组成","优势树种","平均树高","平均胸径","混交树种","混交树种平均树高","混交树种平均胸径","每亩蓄积","龄组","每亩株数","郁闭度","森林健康等级","群落结构","灌木种类","灌木盖度","草本种类","草本盖度","植被盖度","人为干扰","已有管护措施","管护形式/建议管护措施"];

const xbInfo = {
  state: {
    enXBInfo:null,
    cnXBInfo:null
  },
  mutations: {
    SET_ENXBINFO:(state,json)=>{
      state.enXBInfo = json
    },
    SET_CNXBINFO:(state,json)=>{
      state.cnXBInfo = json
    },
    GET_CNXBINFO:(state)=>{
      return state.cnXBInfo
    },
    GET_ENXBINFO:(state)=>{
      return state.enXBInfo
    },
  },
  actions: {
    async  SetXBInfo({ commit }){
      return new Promise((resolve, reject) => {
        getFormData("XBInfo").then(response=>{
          commit('SET_ENXBINFO', response.data);     
          commit('SET_CNXBINFO',replaceKey(response.data,enKeys,cnKeys));
          resolve();
        })
      //  return getFormData("XBInfo").then(response=>{
      //   commit('SET_ENXBINFO', response.data);     
      //   commit('SET_CNXBINFO',replaceKey(response.data,enKeys,cnKeys));
      //   debugger;
      // })
      })
    }
    // EditXBInfo({commit},data){
    //   var lcXBInfo = this.getters.enXBInfo;
    //   lcXBInfo.map((val)=>{
    //     if(val.XBH == data.XBH){
    //       for(var v in data){
    //         val[v] = data[v];
    //       }
    //     }
    //   })
    //   commit('SET_ENXBINFO', lcXBInfo); 
    //   commit('SET_CNXBINFO',replaceKey(lcXBInfo,enKeys,cnKeys));      
    // }
  }
}

export default xbInfo