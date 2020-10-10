export default {
  namespaced: true,
  state: {
    userInfo: undefined
  },
  mutations: {
    setUser(state, user) {
      state.userInfo = user
    }
  }
}
