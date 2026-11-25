<template>
  <div class="sidebar__filters">
    <div
      class="sidebar__filter"
      v-for="(filter, filterIndex) in filters"
      :class="filter.open && 'open'"
      :key="filterIndex"
    >
      <SidebarHead
        :title="filter.title"
        :filtersCount="getFiltersCount(filterIndex)"
        @click="openFilter(filter)"
      />

      <SidebarItems :filter="filter" 
        :filterIndex="filterIndex" />
    </div>
  </div>
  <SidebarButton @click="search" />
</template>

<script>
import { mapState } from "vuex";
import { isLoggedUser } from "@/Hooks/isLoggedUser";
import SidebarHead from "./SidebarHead.vue";
import SidebarButton from "./SidebarButton.vue";
import SidebarItems from './SidebarItems.vue';
import {isMobileScreen} from '@/Hooks/isMobileScreen'

export default {
  components: {
    SidebarHead,
    SidebarButton,
    SidebarItems
  },

  props: ["openMobileFilter"],

  emits: ["sidebarClose", "filter"],

  data() {
    return {
      sidebarOpen: true,

      filtersQuery: {},

      sidebar: null,
      sidebarScrollElement: null,
      sidebarHeight: null,
      sidebarScroll: false,
    };
  },

  computed: {
    ...mapState({
      filters: (state) => state.sidebarFilters,
      filtersData: (state) => state.filtersData,
      users: (state) => state.users,
    }),
    
    searchQuery() {
      const query = this.objToIdFormat(this.filters);
      let parsedQuery = "";

      for (let key in query) {
        if (query[key].length) {
          query[key].forEach((q, indx) => {
            parsedQuery += parsedQuery === "" ? `?${key}[${indx}]=${q}` : `&${key}[${indx}]=${q}`;
          });
        }
      }

      return parsedQuery;
    },

    urlQuery() {
      return window.location.search;
    },
  },

  methods: {
    objToIdFormat(object) {
      const result = Object.keys(object).map(key => {
        return [key, object[key].list.reduce((accum, l) => l.checked === true ? [...accum, l.id] : accum, [])]
      })

      return Object.fromEntries(result);
    },

    // "?scope[0]=34&type[0]=5" -> { scope: ["34"], type: ["5"] }
    parseQuery(query) {
      const currentFilters = {};
      new URLSearchParams(query || "").forEach((value, key) => {
        const currentKey = key.replace(/\[[^\]]*\]/g, "");
        if (!currentFilters[currentKey]) currentFilters[currentKey] = [];
        currentFilters[currentKey].push(value);
      });
      return currentFilters;
    },

    optionsLeft(type) {
      return this.filters[type].list.filter( (option) => option.checked === false );
    },

    getSelectedCount(filterName) {
      return (
        this.filters[filterName].list.length &&
        this.filters[filterName].list.filter((f) => f.checked === true).length
      );
    },

    getFiltersCount(filterName) {
      let counter = 0;
      let currentCount = 0;

      for (let key in this.filters) {
        const result = this.getSelectedCount(key);
        // console.log(this.getSelectedCount(key));
        if (result) {
          counter++;
          if (filterName === key) {
            currentCount = result;
          }
        }
      }

      this.$emit("getFiltersCount", counter);

      return currentCount;
    },

    openFilter(filter) {
      filter.open = filter.open === true ? false : true;
    },

    updateUrlData() {
      // A path, not a full URL: vue-router treats "http://..." as a path and lands on 404.
      this.$router.push(`/${this.searchQuery}`);

      // window.location = window.location.origin + "/" + this.searchQuery;
    },

    setFiltersCheckboxes(checkedFilters) {
      for (let key in this.filters) {
        if (checkedFilters[key] !== undefined) {
          const list = checkedFilters[key];
          list.forEach(filterId => this.$store.commit('updateFilterCheckboxValue', { filterKey: key, filterId: Number(filterId) }))
        }
      }
    },

    checkFilterQuery() {
      const checkedFilters = this.parseQuery(this.urlQuery);
      console.log('checkedFilters: ', checkedFilters);
      this.setFiltersCheckboxes(checkedFilters);
    },

    search() {
      // this.checkFilterQuery();
      this.updateUrlData();
      // updateProjects();
      // console.log(this.$route.query);
      // this.$emit("filter");

      if (isMobileScreen(window.innerWidth)) {
        // реализовать мобильную версию
        this.$emit("closeMobileFilter");
      }
    },
  },

  created() {
    if (isLoggedUser()) {
      this.$store.dispatch("getSidebarFilters").then(() => {
        this.checkFilterQuery()
        this.$emit('filtersLoaded', true)
      });
    } else {
      this.$store.dispatch("getSidebarFiltersForGuest").then(() => {
        this.checkFilterQuery()
        this.$emit('filtersLoaded', true)
      });
    }
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  &__filters {
    width: 100%;
    height: auto;
  }

  &__filter {
    margin-bottom: em(20);
    border-bottom: em(0.5) solid var(--bgcolor-3);
    overflow: hidden;
    padding: 0 em(11);
    width: 98%;
    transition: border-color 0.2s ease-in-out;
    position: relative;

    &:last-child {
      border-bottom: 0;
    }

    & .sidebar__arrow {
      transform: rotate(180deg);
    }

    & .sidebar__items {
      max-height: 0;
      transition: max-height 0.3s ease-in-out;
      overflow: hidden;
    }

    &.open {
      border-bottom-color: transparent;

      & .sidebar__arrow {
        transform: rotate(0deg);
      }

      & .sidebar__items {
        max-height: 50vh;
      }
    }
  }

  &__scroll {
    max-height: 10em;
    overflow: auto;
    padding-right: 0.3em;

    /* width */
    &::-webkit-scrollbar {
      width: em(4);
      border-radius: em(20);
    }

    /* Track */
    &::-webkit-scrollbar-track {
      // background: var(--bgcolor-6);=
      border-radius: em(20);
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: var(--bgcolor-5);
      border-radius: em(20);
      transition: background 0.2s ease-in-out;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: rgba(174, 174, 174, 0.8);
    }
  }

  &__item {
    font-weight: 400;
    font-size: em(14);
    line-height: 130%;
    color: var(--bgcolor-5);
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    position: relative;
    margin-bottom: em(12);
    padding-left: em(26);

    & label {
      cursor: pointer;
    }
  }

  &__checkbox {
    & input {
      display: none;
      &:checked ~ span {
        color: var(--text-color-2);
        &::before {
          opacity: 1 !important;
        }
      }
    }

    & span {
      transition: color 0.15s ease-in-out;
      &::after {
        content: "";
        width: em(16);
        height: em(16);
        background: var(--bgcolor-1);
        border-radius: em(4);
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0, -50%);
        z-index: 1;
        transition: background 0.2s ease-in-out, border-color 0.2s ease-in-out;
      }

      &::before {
        content: "";
        width: em(12);
        height: em(12);
        background: url("/img/form/checked.svg") no-repeat;
        background-size: 100% auto;
        background-position: center top;
        border-radius: em(4);
        position: absolute;
        left: 0.2em;
        top: 50%;
        transform: translate(0, -50%);
        z-index: 2;
        opacity: 0;
      }

      &:hover {
        color: #ff381d;
      }
    }
  }

  &__options {
    max-height: 10em;
    overflow: auto;
    overflow-x: hidden;
    padding-right: 0.15em;

    /* width */
    &::-webkit-scrollbar {
      width: em(4);
      border-radius: em(20);
    }

    /* Track */
    &::-webkit-scrollbar-track {
      // background: var(--bgcolor-6);
      border-radius: em(20);
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: var(--bgcolor-5);
      border-radius: em(20);
      transition: background 0.2s ease-in-out, border-color 0.2s ease-in-out;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: rgba(174, 174, 174, 0.8);
    }
  }
}
</style>
