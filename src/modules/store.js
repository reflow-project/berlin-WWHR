import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      token: '',
      storedBuildingTypes: [],
      contactFormOpen: false
    }
  },

  getters: {
    getToken(state){
      return state.token;
    },

    getStoredBuildingTypes(state){
      return state.storedBuildingTypes;
    },

    getContactFormState(state){
      return state.contactFormOpen;
    }
  },

  mutations: {
    setToken(state, tokenValue){
      state.token = tokenValue;
    },

    addStoredBuildingType(state, buildingType){
      state.storedBuildingTypes.push(buildingType);
    },

    openContactForm(state) {
      state.contactFormOpen = true;
    },
    closeContactForm(state) {
      state.contactFormOpen = false;
    }
  },

  actions: {
    setToken({commit}, tokenValue){
      commit("setToken", tokenValue);
    },

    addStoredBuildingType({commit}, buildingType){
      commit("addStoredBuildingType", buildingType);
    },

    openContactForm({commit}){
      commit("openContactForm");
    },
    closeContactForm({commit}){
      commit("closeContactForm");
    }
  }
})

export default store
