<template>
  <div id="all_list">
    <section>
      <div class="list_container">
        <table id="table">
          <thead>
            <tr class="table_head">
              <th v-for="data in list_header" v-bind:key="data">
                {{data}}
                <div class="arrow_down" v-on:click="sorting(data)"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in list_row" v-bind:key="row">
              <td class="idx" v-if="isIndex">{{idx[index]}}</td>
              <td class="list" v-for="list in paginatedData[index]" v-bind:key="list.ID">{{list}}</td>
            </tr>
          </tbody>
        </table>
        <div id="pagination">
          <ul>
            <li class="page_list" v-on:click="firstPage()">
              <img :src="first_arrow" class="page_button">
            </li>
            <li class="page_list" v-on:click="prevPage()">
              <img :src="pre_arrow" class="page_button">
            </li>
            <li
              class="page_list"
              v-for="pageNum in pageCount"
              v-on:click="movePage(pageNum)"
              v-bind:key="pageNum"
              :class=" { active_page : pageEvent(pageNum)}"
            >{{pageNum}}</li>
            <li class="page_list" v-on:click="nextPage()">
              <img :src="pre_arrow" class="page_button next">
            </li>
            <li class="page_list" v-on:click="endPage()">
              <img :src="first_arrow" class="page_button next">
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
      list_row: "",
      list_header: [],
      pageNumber: 0,
      size: 10,
      no: [],
      idx: [],
      first_arrow: require("./assets/front-arrow.png"),
      pre_arrow: require("./assets/pre-arrow.png")
    };
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    isIndex: {
      type: Boolean
    }
  },
  created() {
    this.makeList();
  },
  watch: {
    data: function(val) {
      this.makeList();
    }
  },
  methods: {
    makeList: function() {
      this.list_header = Object.keys(this.data[0]);
      if (this.isIndex == true) {
        this.list_header.unshift("No");
      }
      if (this.list_row == 0) {
        this.list_row = this.data.length;
        for (let i = 1; i < this.list_row + 1; i++) {
          this.no.push(i);
        }
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
}
#table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  text-align: center;
}
.table_head {
  border-top: 2px solid #3a3b3d;
  color: #333333;
  background-color: #f2f2f2;
}
tr {
  height: 48px;
}
tbody > tr {
  color: #555555;
  border-top: 1px solid #cecece;
  border-bottom: 1px solid #cecece;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.idx {
  width: 50px;
}
#pagination {
  text-align: center;
}
.page_list {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 75px 3.5px 0;
  width: 32px;
  height: 32px;
  border: 1px solid #dedcde;
  cursor: pointer;
}
.active_page {
  color: #b348ff;
}
.arrow_down {
  display: inline-block;
  margin-left: 3px;
  cursor: pointer;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #777777;
}
.next {
  transform: rotate(180deg);
}
</style>
