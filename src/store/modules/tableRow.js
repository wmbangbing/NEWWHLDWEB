
const tableRow = {
  state: {
    tableRow:null
  },
  mutations: {
    SET_TABLEROW:(state,json)=>{
      state.tableRow = json
    }
  },
  actions: {
    SetTableRow({ commit },data){
      commit('SET_TABLEROW',data);
    },
    EditTableRow({commit},data){
      var tableRow = this.getters.tableRow;

      for(var val in data){
        tableRow[val] = data[val]
      }

      commit('SET_TABLEROW',tableRow);    
    }
  }
}

export default tableRow