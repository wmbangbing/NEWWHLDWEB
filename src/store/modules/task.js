import { getFormData } from '@/api/formData'
import { replaceKey } from '@/utils/replaceData'


const task = {
  state: {
    enTaskJson:[],
    cnTaskJson:null,
  },
  mutations: {
    SET_ENTASKJSON:(state,json)=>{
      state.enTaskJson = json
    },
    SET_CNTASKJSON:(state,json)=>{
      state.cnTaskJson = json
    },
  },
  actions: {
    GetTask({ commit }){
      getFormData("task").then(response=>{          
        commit('SET_ENTASKJSON', response.data);    

        var enKeys = ["XBH","DWMC","XIANG","CUN","XBMJ","PD","HB","JD","WD","LDQS","LMQS","DL","LL","QLLX","ZLSJ","SZZC","YSSZ","PJSG","PJXJ","HJSZ","HJPJSG","HJPJXJ","MMXJ","LZU","MMZS","YBD","SLJKDJ","QLJG","GMZL","GMGD","CBZL","CBGD","ZBGD","RWGR","YYGHS","GHXS"];
        var cnKeys = ["小班号","县/区","乡/街道","村/社区","小班面积","坡度","海拔","经度","纬度","林地权属","林木权属","地类","林龄","群落类型","造林时间","树种组成","优势树种","平均树高","平均胸径","混交树种","混交树种平均树高","混交树种平均胸径","每亩蓄积","龄组","每亩株数","郁闭度","森林健康等级","群落结构","灌木种类","灌木盖度","草本种类","草本盖度","植被盖度","人为干扰","已有管护措施","管护形式/建议管护措施"];

        commit('SET_CNTASKJSON',replaceKey(response.data,enKeys,cnKeys));

 
      })
    },
  }
}

export default task