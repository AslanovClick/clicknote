<template>
  <div class="list">
    <template v-if="!projectsError && !emptyFilteredProjects">
      <div class="list__projects" :class="{ loaded: projectsLoaded }">
        <div class="list__projects_wrapper">
          <project-item
            v-for="(project, index) in projectsView"
            :key="index"
            :project="project"
            @modalEditOpen="(project) => $emit('modalEditOpen', project)"
            @mobileHover="(id) => (mobileHoverElemId = id)"
            :mobileHoverElemId="mobileHoverElemId"
            class="list__project"
          />
        </div>
      </div>
    </template>

    <search-error v-if="projectsError || emptyFilteredProjects" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProjectItem from "@/components/ProjectItem/ProjectItem.vue";
import SearchError from "../SearchError/SearchError.vue";

import { isLoggedUser } from "@/Hooks/isLoggedUser";
// import {updateProjects} from '@/Hooks/updateProjects'

export default {
  components: {
    ProjectItem,
    SearchError,
  },

  props: ["searchInputValue"],

  data() {
    return {
      mobileHoverElemId: null,
    };
  },

  computed: {
    ...mapState({
      stateProjects: (state) => state.projects,
    }),

    projects() {
      return isLoggedUser()
        ? this.stateProjects
        : Array.from(this.stateProjects).filter((project) => project.public);
    },

    projectsLoaded() {
      const projectsExists = Object.keys(this.stateProjects).length !== 0;
      return projectsExists;
    },

    isDesktop() {
      return window.innerWidth > 500;
    },

    searchResult() {
      if (!this.searchInputValue.length) {
        const projects = Array.from(this.projects);
        projects.splice(50, projects.length - 50);

        return projects.length ? projects : [];
      }
      const result = this.projects.length
        ? this.projects.filter((project) =>
            project.name
              .toLowerCase()
              .includes(this.searchInputValue.toLowerCase())
          )
        : [];

      result.splice(50, result.length - 50);

      return result;
    },

    projectsView() {
      return this.searchResult;
    },

    isAdminRole() {
      return localStorage.getItem("ROLE") === "ROLE_ADMIN";
    },

    isExecutorRole() {
      return localStorage.getItem("ROLE") === "ROLE_EXECUTOR";
    },

    emptyFilteredProjects() {
      const isNotSearchQuery =
        !window.location.href.includes("?s") &&
        window.location.href.includes("?");
      return isNotSearchQuery && this.projects.length === 0;
    },

    projectsError() {
      const error = this.projectsLoaded && !this.projectsView.length;
      this.$emit("searchError", error);

      return error;
    },
  },

  // created() {
  //   updateProjects();
  // },
};
</script>

<style scoped lang="scss">
.list {
  width: 100%;
  height: 100%;

  &__projects {
    opacity: 0;
    transform: translate(0, -2em);
    will-change: opacity, transform;
    pointer-events: none;

    &.loaded {
      pointer-events: auto;
      animation: showProjects 0.2s forwards ease-in-out,
        translateProjects 0.3s forwards ease-in-out;
    }

    &_wrapper {
      padding-bottom: 4em;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: em(20);
      grid-row-gap: em(60);
    }
  }

  @media (max-width: 500px) {
    &__projects_wrapper {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-wrap: wrap;
      flex-direction: row;
      grid-template-columns: unset;
      grid-gap: unset;
      grid-row-gap: unset;
    }
  }
}

@keyframes showProjects {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes translateProjects {
  0% {
    transform: translate(0, -2em);
  }
  100% {
    transform: translate(0);
  }
}
</style>
