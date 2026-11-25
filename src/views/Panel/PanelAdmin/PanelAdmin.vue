<template>
  <panel-tabs @modalEditOpen="project => $emit('modalEditOpen', project)"
    @resetSearch="$emit('resetSearch')"
    :searchInputValue="searchInputValue" />
</template>

<script>
import PanelTabs from "../components/PanelTabs";

export default {
  name: 'PanelAdmin',

  components: {
    PanelTabs
  },

  props: ['searchInputValue']
};
</script>