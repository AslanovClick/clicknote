<template>
  <component :is="currentComponent" />
</template>

<script>
import ProjectUser from "./ProjectUser/ProjectUser";
import ProjectGuest from "./ProjectGuest/ProjectGuest";
import { updateProjects } from "../../Hooks/updateProjects";

export default {
  components: {
    ProjectUser,
    ProjectGuest,
  },

  data() {
    return {
      currentComponent: null
    }
  },

  computed: {
    ROLE() {
      return localStorage.getItem('ROLE');
    },

    AUTH_TOKEN() {
      return localStorage.getItem('X-AUTH-TOKEN');
    },

    projectUrl() {
      // window.location.href
      return encodeURIComponent(window.location.href)
    }
  },

  mounted() {
    this.currentComponent = (this.AUTH_TOKEN && this.ROLE) ? ProjectUser : ProjectGuest;
  },

  created() {
    updateProjects();
  }
};
</script>

<style scoped lang="scss">

</style>