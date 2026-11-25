<template>
  <div class="works"
    :class="{'loaded': projectsLoaded}"
    >
    <works-list
      :items="searchResult"
      :archiveElement="archiveElement"
      :itemInsideList="itemInsideList"
      @addToArchive="addToArchive"
      @getListElement="getListElement"
      @modalEditOpen="project => $emit('modalEditOpen', project)"

      @itemInsideArchive="itemInsideArchive = true"
      @itemOutsideArchive="itemInsideArchive = false"
    />

    <works-archive
      :items="archiveProjects"
      :listElement="listElement"
      :itemInsideArchive="itemInsideArchive"
      @removeFromArchive="removeFromArchive"
      @removeProject="removeProject"
      @getArchiveElement="getArchiveElement"
      @modalEditOpen="project => $emit('modalEditOpen', project)"

      @itemInsideList="itemInsideList = true"
      @itemOutsideList="itemInsideList = false"
    />

  </div>
</template>

<script>
import WorksList from "./WorksList.vue";
import WorksArchive from "./WorksArchive.vue";
import { mapState } from 'vuex';

export default {
  components: {
    WorksList,
    WorksArchive,
  },

  props: ['searchInputValue'],

  emits: [
    'resetSearch'
  ],

  data() {
    return {
      archivePositions: null,
      itemInsideArchive: false,
      itemInsideList: false,

      archiveElement: null,
      listElement: null,
    };
  },

  computed: {
    ...mapState({
      user: state => state.user,
      projects: state => state.projects,
      archiveProjects: state => state.archiveProjects,
    }),

    projectsLoaded() {
      return Object.keys(this.projects).length > 0 && Object.keys(this.archiveProjects).length > 0;
    },

    searchResult() {
        if (!this.searchInputValue.length) {
            return this.projects.length ? this.projects : []
        }

        const result = this.projects.length ? this.projects.filter(project => project.name.toLowerCase().includes(this.searchInputValue.toLowerCase())) : [];

        return result;
    },
  },

  methods: {
    addToArchive(itemID) {
      this.$store.dispatch('removeProject', {id: itemID}).then(() => {
        this.$store.dispatch('getProjects');
        this.$store.dispatch('getArchive');

        this.itemInsideArchive = false

        this.$emit('resetSearch')
        this.$router.push('/panel')
      })
    },

    removeFromArchive(itemID) {
      this.$store.dispatch('restoreProject', {id: itemID}).then(() => {
        this.$store.dispatch('getProjects');
        this.$store.dispatch('getArchive');

        this.itemInsideList = false;

        this.$emit('resetSearch')

        this.$router.push('/panel')
      })
    },

    removeProject(itemID) {
      this.$store.dispatch('deleteProject', {id: itemID}).then(() => {
        this.$store.dispatch('getProjects');
        this.$store.dispatch('getArchive');
      })
    },

    getArchiveElement(elem) {
      this.archiveElement = elem;
    },

    getListElement(elem) {
      this.listElement = elem;
    }
  },

  created() {
    this.$store.dispatch('getProjects').then(data => {
      if (data.errors && data.errors.find(error => error.code === 400)) {
        // this.$router.push('/login')
      }
    });
    this.$store.dispatch('getArchive');
  }
};
</script>

<style lang="scss">
.works {
    width: 100%;
    display: grid;
    grid-template-columns: 63% 37%;
    padding-top: 0.5em;

    opacity: 0;
    transform: translate(0, -2em);
    transition: opacity .2s ease-in-out, transform .3s ease-in-out;
    pointer-events: none;
    
    &.loaded {
        pointer-events: auto;
        transform: unset;
        opacity: 1;
    }

    &__title {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: em(24);

        & svg {
          width: 100%;
          height: auto;
          min-width: em(13);
          max-width: em(13);
          margin-right: em(10);
        }

        & span {
          font-style: normal;
          font-weight: 500;
          font-size: em(16);
          line-height: 100%;
          color: #555555;
          align-self: flex-end;
        }
    }
}
</style>