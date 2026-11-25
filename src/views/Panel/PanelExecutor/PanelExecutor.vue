<template>
  <works @modalEditOpen="project => $emit('modalEditOpen', project)" 
    @resetSearch="$emit('resetSearch')"
    :searchInputValue="searchInputValue" />
</template>

<script>
import Works from "../components/Works/Works";

export default {
  name: 'PanelExecutor',

  components: {
    Works
  },
  
  props: ['searchInputValue']
};
</script>