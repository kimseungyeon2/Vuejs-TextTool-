import Vue from 'vue'
import Vuex from 'vuex'
import Service from './api/service.js'
Vue.use(Vuex)

const service = new Service("http://localhost:3000/");

export default new Vuex.Store({
  state: {
    content:'',
    text_box:'',
    drag_text:'',
    drag_number:0,
  },
  getters: {
    content_getter: (state) => {
      return state.content;
    },
    text_box_getter: (state) =>{
      return state.text_box;
    },
    drag_text_getter: (state) =>{
      return state.drag_text;
    },
    drag_text_number_getter: (state) =>{
      return state.drag_number;
    }
  },
  mutations: {
    content_mutation: (state, payload) =>{
      state.content = payload;
    },
    text_box_mutation: (state, payload) =>{
      state.text_box = payload;
    },
    drag_text_mutation: (state,payload) =>{
      state.drag_text = payload.text;
      state.drag_number = payload.number;
    },
  },
  actions: {
    drag_text_action:({commit},payload) => {
      commit('drag_text_mutation',payload);
    },
    upload_action: ({commit},payload) => {
      return service.upload('upload',payload);
    },
    file_call_action: ({commit},payload) =>{
      return service.file_call('call',payload);
    },
    content_action: ({commit},payload) =>{
      commit('content_mutation',payload);
    },
    text_box_action: ({commit},payload) =>{
      commit('text_box_mutation',payload);
    },
    search_words_action: ({commit},payload) =>{
      return service.search_words("analysis",payload);
    },
    search_word_action: ({commit},payload) =>{
      return service.search_word("crowling",payload);
    },
  }
})
