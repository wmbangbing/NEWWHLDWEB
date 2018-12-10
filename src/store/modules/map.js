const map = {
  state: {
    layer:{
      definitionExpression:''
    }
  },
  mutations: {
    SET_LAYERDEFINITION:(state,definitionExpression)=>{
      state.layer.definitionExpression = definitionExpression
    }
  },
  actions: {
   setxbLayerDefinition({ commit },role){
    var definitionExpression = "";
    switch (role)
    {
      case "All":
        definitionExpression= ``;
        break;
      case "HS":
        definitionExpression=`DWMC = '洪山区'`;
        break;
      case "JX":
        definitionExpression=`DWMC = '江夏区'`;
        break;
    }
    commit('SET_LAYERDEFINITION', definitionExpression)
   }
  }
}

export default map