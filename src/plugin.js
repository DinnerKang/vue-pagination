import Pagination from './App.vue';


module.exports = {
    install: function (Vue, options) {
      Vue.component('vue-pagination', Pagination);
    }
  };