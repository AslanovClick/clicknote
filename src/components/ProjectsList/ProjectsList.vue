<template>
  <div class="list">
    <template v-if="!projectsError && !emptyFilteredProjects">
      <div class="list__projects" :class="{ loaded: projectsLoaded }">
        <div class="list__projects_wrapper">
          <project-item
            v-for="project in projectsView"
            :key="project.id"
            :project="project"
            @modalEditOpen="(project) => $emit('modalEditOpen', project)"
            @mobileHover="(id) => (mobileHoverElemId = id)"
            :mobileHoverElemId="mobileHoverElemId"
            class="list__project"
          />
        </div>

        <div v-if="hasMore" ref="more" class="list__more">
          <button class="list__more_button" @click="showMore">
            Показать ещё
            <span class="list__more_count">{{ shownCount }} из {{ searchResult.length }}</span>
          </button>
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

const PAGE_SIZE = 48;

export default {
  components: {
    ProjectItem,
    SearchError,
  },

  props: ["searchInputValue"],

  data() {
    return {
      mobileHoverElemId: null,
      // The grid used to stop at 50 projects; now it grows in pages as you scroll.
      limit: PAGE_SIZE,
      observer: null,
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
      const projects = Array.from(this.projects);
      if (!this.searchInputValue.length) {
        return projects;
      }
      const query = this.searchInputValue.toLowerCase();
      return projects.filter((project) =>
        project.name.toLowerCase().includes(query)
      );
    },

    projectsView() {
      return this.searchResult.slice(0, this.limit);
    },

    shownCount() {
      return this.projectsView.length;
    },

    hasMore() {
      return this.searchResult.length > this.limit;
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

  methods: {
    showMore() {
      this.limit += PAGE_SIZE;
    },

    // Loads the next page automatically when the "show more" row scrolls into view.
    observeMore() {
      if (this.observer) this.observer.disconnect();
      if (!this.$refs.more || !("IntersectionObserver" in window)) return;
      this.observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) this.showMore();
        },
        { rootMargin: "600px 0px" }
      );
      this.observer.observe(this.$refs.more);
    },
  },

  watch: {
    stateProjects() {
      this.limit = PAGE_SIZE;
    },
    searchInputValue() {
      this.limit = PAGE_SIZE;
    },
    hasMore() {
      this.$nextTick(this.observeMore);
    },
  },

  mounted() {
    this.observeMore();
  },

  beforeUnmount() {
    if (this.observer) this.observer.disconnect();
  },
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
      grid-row-gap: em(32);

      // Four columns only where they fit; cards and captions stay readable on laptops and tablets.
      @media (max-width: 1279px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }

  &__more {
    display: flex;
    justify-content: center;
    padding-bottom: 4em;

    &_button {
      display: inline-flex;
      align-items: center;
      gap: em(10);
      padding: em(12) em(24);
      border: none;
      border-radius: em(12);
      background: var(--bgcolor-2);
      color: var(--text-color-1);
      font: inherit;
      font-size: max(13px, em(14));
      cursor: pointer;
      transition: background 0.2s ease-in-out;

      &:hover {
        background: var(--bgcolor-7);
      }
    }

    &_count {
      opacity: 0.5;
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
