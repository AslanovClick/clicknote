<template>
  <main-header
    v-if="isDesktop"
    @openAddProjectModal="$emit('openAddProjectModal')"
    @openFilters="$emit('openFilters')"
    @closeFilters="$emit('closeFilters')"
    @search="(inputValue) => $emit('search', inputValue)"
    @darkmode="(darkmode) => $emit('darkmode', darkmode)"
    :sidebarOpen="sidebarOpen"
    :filtersCount="filtersCount"
    :resetSearch="resetSearch"
  />

  <mobile-header
    v-else
    @openAddProjectModal="$emit('openAddProjectModal')"
    @openFilters="$emit('openFilters')"
    @closeFilters="$emit('closeFilters')"
    :sidebarOpen="sidebarOpen"
    :filtersCount="filtersCount"
    @search="(inputValue) => $emit('search', inputValue)"
    @darkmode="(darkmode) => $emit('darkmode', darkmode)"
  />
</template>

<script>
import MainHeader from "@/components/header/MainHeader.vue";
import MobileHeader from "@/components/header/MobileHeader.vue";

export default {
  components: {
    MainHeader,
    MobileHeader,
  },

  props: ["sidebarOpen", "filtersCount", "resetSearch"],

  data: () => {
    return {
        isDesktop: window.innerWidth > 768
    }
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    onResize() {
      this.isDesktop = window.innerWidth > 600;
    },
  },
};
</script>

<style scoped lang="scss">
.mob {
  display: none;
}

.desc {
  display: flex;
}

@media (max-width: 1080px) and (orientation: portrait) {
  .mob {
    display: flex;
  }

  .desc {
    display: none;
  }
}
</style>
