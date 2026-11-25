<template>
  <div class="wrapper"
    :class="{'no-scroll': openMobileFilter || searchError}"
    >
    <header-component 
      @openAddProjectModal="modalAddOpen = true" 
      @openFilters="openMobileFilter = true"
      @closeFilters="openMobileFilter = false"
      :sidebarOpen="openMobileFilter"
      :filtersCount="filtersCount"
      @search="inputValue => this.searchInputValue = inputValue"
      @darkmode="darkmode => $emit('darkmode', darkmode)"
      />

    <div class="container">
      <sidebar 
        @filter="filter"
        @sidebarClose="openMobileFilter = false"
        @sidebarOpen="openMobileFilter = true"
        :openMobileFilter="openMobileFilter"
        @getFiltersCount="count => this.filtersCount = count"
        />

      <div class="content" :class="fullContent && 'full'">
        <home-content @modalEditOpen="modalEditOpen" 
          :searchInputValue="searchInputValue"
          @searchError="error => searchError = error"
          ref="homeContent"
          />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/header/HeaderComponent";
import Sidebar from "@/components/Sidebar/Sidebar";
import HomeContent from "@/components/HomeContent/HomeContent";

import {updateProjects} from '@/Hooks/updateProjects'

export default {
  components: {
    HeaderComponent,
    Sidebar,
    HomeContent,
  },

  data() {
    return {
      modalEdit: {
        open: false,
        project: {}
      },
      
      modalAddOpen: false,

      openMobileFilter: false,
      filtersCount: 0,
      searchInputValue: '',
      searchError: false
    };
  },

  methods: {
    setOpenMobileFilter() {
      this.openMobileFilter = true;
    },

    modalEditOpen(project) {
      this.modalEdit.open = true;
      this.modalEdit.project = project;
    },

    modalEditClose() {
      this.modalEdit.open = false;
      this.modalEdit.project = {};
    },

    filter() {
      localStorage.setItem('currentDirection', -1);
      this.$refs.homeContent.resetButtons()
      // updateProjects()
    },

    edit() {
      updateProjects()
    },

    checkPagePagination() {
      const pages = JSON.parse(localStorage.getItem('pagesList'));
      console.log(pages.current);
      return pages.current.split('?')[0] === pages.prev.split('?')[0];
    }
  },

  // beforeRouteUpdate(to, from, next) {
  //   updateProjects();
  //   next()
  // }
  
  updated() {
    updateProjects();
  },
};
</script>

<style lang="scss">
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: 500px) {
    height: auto;
    &.no-scroll {
      height: 100%;
    }
  }
}

.container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  height: 100%;
  flex-grow: 2;
  height: 100%;
  overflow: hidden; 
}

.content {
  position: relative;
  width: 100%;
  height: 100%;
  padding-left: 3.125em;
  padding-right: 3.125em;
  padding-bottom: 4em;
  // display: flex;
  // flex-direction: column;
  // align-items: flex-start;
  // justify-content: flex-start;
  transition: width .2s .1s ease-in-out;
  
  overflow: auto;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: .5em;
  }
   
  &::-webkit-scrollbar-track {
    border-radius: 5em;
  }
   
  &::-webkit-scrollbar-thumb {
    background-color: var(--bgcolor-5);
    border-radius: 5em;
  }

  &.full {
    width: 100%;
  }

  @media (max-width: 500px) {
    width: 100%;
    padding: 0 1em;
    overflow: unset;

    padding-bottom: 2em;
  }
}
</style>