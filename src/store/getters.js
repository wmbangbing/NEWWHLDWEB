const getters = {
    sidebar: state => state.app.sidebar,
    language: state => state.app.language,
    size: state => state.app.size,
    device: state => state.app.device,
    // visitedViews: state => state.tagsView.visitedViews,
    // cachedViews: state => state.tagsView.cachedViews,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    status: state => state.user.status,
    roles: state => state.user.roles,
    setting: state => state.user.setting,
    definitionExpression:state => state.map.layer.definitionExpression,
    enXBInfo:state => state.xbInfo.enXBInfo,
    cnXBInfo:state => state.xbInfo.cnXBInfo,
    tableRow:state => state.tableRow.tableRow

    // errorLogs: state => state.errorLog.logs
  }
  export default getters