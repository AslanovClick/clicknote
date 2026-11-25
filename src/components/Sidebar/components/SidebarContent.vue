<template>
  <div class="sidebar__content" :class="{ loaded: filtersLoaded }">
    <SidebarFilters 
      @filtersLoaded="filtersLoaded = true"
      @closeMobileFilter="$emit('closeMobileFilter')"
      @getFiltersCount="count => $emit('getFiltersCount', count)" />
  </div>
</template>

<script>
import SidebarFilters from './SidebarFilters.vue';

export default {
  components: {
    SidebarFilters
  },

  emits: ["sidebarClose", "filter"],

  data: () => {
    return {
      filtersLoaded: false
    }
  },
};
</script>

<style scoped lang="scss">
.sidebar {
  &__content {
    opacity: 0;
    transition: opacity 0.1s ease-in;
    pointer-events: none;

    &.loaded {
      pointer-events: auto;
      opacity: 1;
    }
  }

  @media (max-width: 500px) {
    &__content {
      width: 100%;
      height: auto;
    }
  }
}

</style>