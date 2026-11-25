<template>
  <div
    class="works__list"
    ref="list"
    :class="{
      inside: itemInsideList,
    }"
  >
    <div class="works__title">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.46144 7.91464C5.33879 7.91464 6.04191 8.62461 6.04191 9.50818V11.6294C6.04191 12.5067 5.33879 13.2223 4.46144 13.2223H2.3583C1.48718 13.2223 0.777832 12.5067 0.777832 11.6294V9.50818C0.777832 8.62461 1.48718 7.91464 2.3583 7.91464H4.46144ZM11.6421 7.91464C12.5132 7.91464 13.2225 8.62461 13.2225 9.50818V11.6294C13.2225 12.5067 12.5132 13.2223 11.6421 13.2223H9.53891C8.66157 13.2223 7.95845 12.5067 7.95845 11.6294V9.50818C7.95845 8.62461 8.66157 7.91464 9.53891 7.91464H11.6421ZM4.46144 0.777832C5.33879 0.777832 6.04191 1.4934 6.04191 2.37137V4.49255C6.04191 5.37612 5.33879 6.08547 4.46144 6.08547H2.3583C1.48718 6.08547 0.777832 5.37612 0.777832 4.49255V2.37137C0.777832 1.4934 1.48718 0.777832 2.3583 0.777832H4.46144ZM11.6421 0.777832C12.5132 0.777832 13.2225 1.4934 13.2225 2.37137V4.49255C13.2225 5.37612 12.5132 6.08547 11.6421 6.08547H9.53891C8.66157 6.08547 7.95845 5.37612 7.95845 4.49255V2.37137C7.95845 1.4934 8.66157 0.777832 9.53891 0.777832H11.6421Z"
          fill="#555555"
        />
      </svg>
      <span>{{ title }}</span>
      <div class="works__count">
        <span>
          {{ userProjects.length }}
        </span>
      </div>
    </div>
    
    <works-list-item
      v-for="item in userProjects"
      :key="item"
      :item="item"
      :archiveElement="archiveElement"
      :draggableElem="draggableElem"
      @edit="edit"
      @add="addToArchive"
      @itemInsideArchive="$emit('itemInsideArchive')"
      @itemOutsideArchive="$emit('itemOutsideArchive')"
      @draggableStart="elem => draggableElem = elem"
      @draggableEnd="elem => draggableElem = elem"
    />

    <search-error v-if="projectsError" />
  </div>
</template>

<script>
import SearchError from "@/components/SearchError/SearchError.vue";
import WorksListItem from "./WorksListItem.vue";
import { mapState } from "vuex";
export default {
  components: { WorksListItem, SearchError },

  props: ["items", "archiveElement", "itemInsideList"],

  emits: [
    "addToArchive",
    "itemInsideArchive",
    "itemOutsideArchive",
    "getListElement",
  ],

  data() {
    return {
        draggableElem: false,
    };
  },

  computed: {
    ...mapState({
      projects: (state) => state.projects,
      user: state => state.user
    }),

    userProjects() {
      return this.isAdminRole ? this.items : this.isExecutorRole && this.items.filter(item => this.user.id === item.executor.id);
    },

    projectsError() {
      return this.projectsLoaded && this.items.length < 1;
    },

    projectsLoaded() {
      return Object.keys(this.projects).length !== 0;
    },

    title() {
      return this.isExecutorRole ? "Мои работы: " : "Все работы: ";
    },

    isAdminRole() {
      const ROLE = localStorage.getItem("ROLE");
      return ROLE === "ROLE_ADMIN";
    },

    isExecutorRole() {
      const ROLE = localStorage.getItem("ROLE");
      return ROLE === "ROLE_EXECUTOR";
    },
  },

  methods: {
    edit(project) {
      this.$emit("modalEditOpen", project);
    },

    addToArchive(itemID) {
      this.$emit("addToArchive", itemID);
    },

    getListElement() {
      this.$emit("getListElement", this.$refs.list);
    },
  },

  mounted() {
    this.getListElement();
  },
};
</script>

<style scoped lang="scss">
.works {
  &__title {
    margin-bottom: em(24);
  }

  &__count {
    margin-left: 0.4em;
  }

  &__list {
    width: 100%;
    max-width: em(1148);
    padding: 0.5em 0.2em;
    padding-right: em(46);
    padding-bottom: 0.125em;
    transition: background .2s ease-in-out, border .2s ease-in-out;
    min-height: 20em;
    border-right: em(2) solid var(--bgcolor-3);

    &.inside {
      background: var(--bgcolor-7);
    }
  }
}
</style>
