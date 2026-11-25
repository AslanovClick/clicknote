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
        :filterIndex="filterIndex"
        :counts="counts[filterIndex]" />
    </div>
  </div>
  <SidebarButton :count="resultCount" @click="search" />
</template>

<script>
import { mapState } from "vuex";
import { isLoggedUser } from "@/Hooks/isLoggedUser";
import SidebarHead from "./SidebarHead.vue";
import SidebarButton from "./SidebarButton.vue";
import SidebarItems from './SidebarItems.vue';
import {isMobileScreen} from '@/Hooks/isMobileScreen'
import {
  parseFilterQuery,
  buildFilterQuery,
  facetCounts,
  filterProjects,
} from "@/Hooks/projectFilters";

export default {
  components: {
    SidebarHead,
    SidebarButton,
    SidebarItems
  },

  props: ["openMobileFilter"],

  emits: ["sidebarClose", "filter", "getFiltersCount", "filtersLoaded", "closeMobileFilter"],

  data() {
    return {
      filtersReady: false,
    };
  },

  computed: {
    ...mapState({
      filters: (state) => state.sidebarFilters,
      allProjects: (state) => state.allProjects,
    }),

    // What the checkboxes say right now, plus URL facets the sidebar has no group for
    // (a guest has no "direction" group, but the tabs still filter by it).
    pendingFilters() {
      const fromUrl = parseFilterQuery(this.routeSearch);
      const result = {};
      Object.keys(fromUrl).forEach((key) => {
        if (!this.filters[key]) result[key] = fromUrl[key];
      });
      Object.keys(this.filters).forEach((key) => {
        const ids = this.filters[key].list.filter((item) => item.checked).map((item) => item.id);
        if (ids.length) result[key] = ids;
      });
      return result;
    },

    searchQuery() {
      return buildFilterQuery(this.pendingFilters);
    },

    routeSearch() {
      const query = this.$route.fullPath.split("?")[1];
      return query ? `?${query}` : "";
    },

    visibleProjects() {
      if (!Array.isArray(this.allProjects)) return null;
      return isLoggedUser() ? this.allProjects : this.allProjects.filter((project) => project.public);
    },

    // { scope: { 34: 17, ... }, ... }: works each option would give, other groups applied.
    counts() {
      const result = {};
      Object.keys(this.filters).forEach((key) => {
        result[key] = this.visibleProjects
          ? facetCounts(this.visibleProjects, this.pendingFilters, key)
          : null;
      });
      return result;
    },

    resultCount() {
      return this.visibleProjects
        ? filterProjects(this.visibleProjects, this.pendingFilters).length
        : null;
    },
  },

  methods: {
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
      if (buildFilterQuery(parseFilterQuery(this.routeSearch)) === this.searchQuery) return;
      // A path, not a full URL: vue-router treats "http://..." as a path and lands on 404.
      this.$router.push(`/${this.searchQuery}`);
    },

    // Ticks exactly the options in the URL, so Back/Forward and the tabs keep the sidebar in step.
    syncFromUrl() {
      const fromUrl = parseFilterQuery(this.routeSearch);
      for (let key in this.filters) {
        const ids = fromUrl[key] || [];
        this.filters[key].list.forEach((item) => {
          const checked = ids.includes(item.id);
          if (item.checked !== checked) {
            this.$store.commit('updateFilterCheckboxValue', { filterKey: key, filterId: item.id, value: checked });
          }
        });
        // A group with a ticked option opens by itself.
        if (ids.length) this.filters[key].open = true;
      }
    },

    search() {
      this.updateUrlData();

      if (isMobileScreen(window.innerWidth)) {
        this.$emit("closeMobileFilter");
      }
    },

    filtersLoaded() {
      this.syncFromUrl();
      this.filtersReady = true;
      this.$emit('filtersLoaded', true);
    },
  },

  watch: {
    routeSearch() {
      if (this.filtersReady) this.syncFromUrl();
    },

    // On desktop a ticked option applies at once; on a phone the button applies the set.
    searchQuery() {
      if (this.filtersReady && !isMobileScreen(window.innerWidth)) this.updateUrlData();
    },
  },

  created() {
    const action = isLoggedUser() ? "getSidebarFilters" : "getSidebarFiltersForGuest";
    this.$store.dispatch(action).then(this.filtersLoaded).catch(() => {});
    this.$store.dispatch("loadAllProjects").catch(() => {});
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
    max-height: 17em;
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
    max-height: 17em;
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
