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
      case "林业局":
        definitionExpression= ``;
        break;
      case "新洲区":
        definitionExpression=`DWMC = '新洲区'`;
        break;
      case "江夏区":
        definitionExpression=`DWMC = '江夏区'`;
        break;
      case "黄陂区":
        definitionExpression=`DWMC = '黄陂区'`;
        break;
      default:
        definitionExpression=``;
        break;
    }
    commit('SET_LAYERDEFINITION', definitionExpression)
   }
  }
}

export default map