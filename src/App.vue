<template>
  <div id="all_list">
    <section>
      <div class="list_container">
        <table id="table">
          <thead>
            <tr>
              <th v-for="data in list_header" v-bind:key="data" v-on:click="sorting(data)">{{data}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in list_row" v-bind:key="row">
              <td class="idx">{{idx[index]}}</td>
              <td class="list" v-for="list in paginatedData[index]" v-bind:key="list.ID">{{list}}</td>
            </tr>
          </tbody>
        </table>
        <div id="pagination">
          <ul>
            <li class="page_list">
              <button class="page_button" type="button" v-on:click="firstPage()">&lt;&lt;</button>
            </li>
            <li class="page_list">
              <button class="page_button" type="button" v-on:click="prevPage()">&lt;</button>
            </li>
            <li
              class="page_list"
              v-for="pageNum in pageCount"
              v-on:click="movePage(pageNum)"
              v-bind:key="pageNum"
              :class=" { active_page : pageEvent(pageNum)}"
            >{{pageNum}}</li>
            <li class="page_list">
              <button class="page_button" type="button" v-on:click="nextPage()">&gt;</button>
            </li>
            <li class="page_list">
              <button class="page_button" type="button" v-on:click="endPage()">&gt;&gt;</button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: "",
      list_row: "",
      list_header: [],
      host: this.$store.state.host,
      pageNumber: 0,
      size: 10,
      no: [],
      idx: []
    };
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  created() {},
  watch: {
    data: function(val) {
      this.makeList();
    }
  },
  methods: {
    makeList: function() {
      this.list_header = Object.keys(this.data[0]);
      this.list_header.unshift("No");
      this.list_row = this.data.length;
      for (let i = 1; i < this.list_row + 1; i++) {
        this.no.push(i);
      }
    },
    nextPage: function() {
      if (this.pageNumber == Math.ceil(this.data.length / this.size) - 1) {
        return;
      }
      this.pageNumber++;
    },
    endPage: function() {
      this.pageNumber = Math.ceil(this.data.length / this.size) - 1;
    },
    prevPage: function() {
      if (this.pageNumber == 0) {
        return;
      }
      this.pageNumber--;
    },
    firstPage: function() {
      this.pageNumber = 0;
    },
    movePage: function(page) {
      this.pageNumber = page - 1;
    },
    pageEvent: function(page) {
      return this.pageNumber + 1 === page;
    },
    sorting: function(name) {
      this.data.sort(function(a, b) {
        return a[name] < b[name] ? -1 : a[name] > b[name] ? 1 : 0;
      });
    }
  },
  computed: {
    paginatedData: function() {
      const start = this.pageNumber * this.size;
      const end = start + this.size;
      this.list_row = this.no.slice(start, end);
      this.idx = this.no.slice(start, end);
      return this.data.slice(start, end);
    },
    pageCount: function() {
      var page = [];
      var length = Math.ceil(this.data.length / this.size);

      for (let i = 1; i < length + 1; i++) {
        page.push(i);
      }
      if (length > 5) {
        if (this.pageNumber < 3) {
          page = page.splice(0, 5);
        } else {
          page = page.slice(this.pageNumber - 2, this.pageNumber + 3);
        }
      }
      return page;
    }
  }
};
</script>


<style scoped>
#all_list {
  width: 1200px;
}
.list_container {
  box-sizing: border-box;
  height: 600px;
  width: 100%;
  border: 1px solid;
}
#table {
  width: 100%;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.idx {
  width: 50px;
  text-align: center;
}
.list {
  text-align: center;
}
#pagination {
  text-align: center;
}
.page_list {
  display: inline-block;
  margin: 0 10px;
  cursor: pointer;
}
.active_page {
  color: #b348ff;
}
</style>
