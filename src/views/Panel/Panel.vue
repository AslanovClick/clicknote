<template>
  <div class="wrapper">
    <div class="container"
      >
        <header-component 
          @openAddProjectModal="modalAdd.open = true" 
          @openFilters="openMobileFilter = true"
          @closeFilters="openMobileFilter = false"
          :sidebarOpen="openMobileFilter"
          :filtersCount="filtersCount"
          @search="inputValue => this.searchInputValue = inputValue"
          @darkmode="darkmode => $emit('darkmode', darkmode)"
          :resetSearch="resetSearch"
          />
        <div class="content full">
          <component :is="currentComponent" 
            :searchInputValue="searchInputValue"
            @darkmode="darkmode => $emit('darkmode', darkmode)"
            @modalEditOpen="project => modalEditOpen(project)"
            @resetSearch="resetSearchHandler" />
        </div>
    </div>

    <project-add 
      :open="modalAdd.open"
      @modalClose="modalAdd.open = false" 
      />

    <project-edit 
      :open="modalEdit.open"
      :project="modalEdit.project"
      @modalClose="modalEditClose" 
      @edit="edit"
      />
  </div>
</template>

<script>
import PanelAdmin from "./PanelAdmin/PanelAdmin";
import PanelExecutor from "./PanelExecutor/PanelExecutor";
import ProjectAdd from "@/components/modals/ProjectAdd";
import ProjectEdit from "@/components/modals/ProjectEdit";
import HeaderComponent from '@/components/header/HeaderComponent.vue';

export default {
  components: {
    PanelAdmin,
    PanelExecutor,
    ProjectAdd,
    ProjectEdit,
    HeaderComponent
  },

  data() {
    return {
      modalEdit: {
        open: false,
        project: {}
      },

      modalAdd: {
        open: false
      },
      
      currentComponent: null,
      searchInputValue: '',

      resetSearch: false
    }
  },

  methods: {
    modalEditOpen(project) {
      this.modalEdit.open = true;
      this.modalEdit.project = project;
    },

    modalEditClose() {
      this.modalEdit.open = false;
      this.modalEdit.project = {};
    },

    resetSearchHandler() {
      this.resetSearch = true

      setTimeout(() => {
        this.resetSearch = false
      }, 100)
    },

    edit() {
      this.$store.dispatch('getProjects');
      this.$store.dispatch('getArchive');
    }
  },

  computed: {
    ROLE() {
      return localStorage.getItem('ROLE');
    }
  },

  mounted() {
    this.currentComponent = this.ROLE !== 'ROLE_EXECUTOR' ? PanelAdmin : PanelExecutor;
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
}

.container {
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
  flex-direction: column;

  &.draggable {
    // overflow: hidden;
    user-select: none;
  }

  &::-webkit-scrollbar {
    width: .5em;
  }
   
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 em(1) rgba(0, 0, 0, 0.3);
    border-radius: 5em;
  }
   
  &::-webkit-scrollbar-thumb {
    background-color: #AEAEAE;
    border-radius: 5em;
  }
}

.content {
  // position: relative;
  position: static;
  width: 100%;
  height: auto;
  // padding-left: 2.225em;
  padding-left: 2.925em;
  padding-right: 3.125em;
  padding-bottom: em(40);
  transition: width .2s .1s ease-in-out;

  width: calc(100% - var(--sidebar-width));
  overflow: unset;

  &.full {
    width: 100%;
  }
}
</style>