<template>
  <div class="sidebar__items">
    <SidebarItemCheckbox v-if="filter.type == 'checkbox'" :filterList="filter.list"
      @updateCheckBoxValue="(item) => updateCheckBoxValue(item, filterIndex)"
      />

    <template v-if="filter.type == 'option'">
      <SidebarOptionSelected
        v-for="option in optionsSelected"
        :key="option"
        :optionName="optionName(option)"
        @click="removeOption(option, filterIndex)"
      />

      <SidebarOptionSearch
        @resetInput="filterSearchInput = ''"
        v-model:filterInput="filterSearchInput"
        :placeholder="filter.placeholder"
      />

      <SidebarOptions :optionSearchResult="optionSearchResult(filterIndex)"
        @selectOption="option => selectOption(option, filterIndex)" />
    </template>
  </div>
</template>

<script>
// import SidebarOption from './SidebarOption.vue';
import SidebarOptionSelected from './SidebarOptionSelected.vue';
import SidebarOptionSearch from './SidebarOptionSearch.vue';
import SidebarItemCheckbox from './SidebarItemCheckbox.vue';
import SidebarOptions from './SidebarOptions.vue';
// import SidebarItem from './SidebarItem.vue';

export default {
  components: {
    // SidebarOption,
    SidebarOptionSelected,
    SidebarOptionSearch,
    SidebarItemCheckbox,
    SidebarOptions,
    // SidebarItem
  },

  props: [
    'filter', 
    'filterIndex',
    'optionsFromUrl'
  ],

  // options передавай пропсами

  data() {
    return {
      options: {
        client: [],
        executor: [],
        tag: [],
      },

      filterSearchInput: "",
    }
  },

  computed: {
    optionsSelected() {
      return this.filter.list.filter(option => option.checked === true);
    },

    optionsLeft() {
      return this.filter.list.filter((option) => option.checked === false);
    },
  },

  methods: {
    updateCheckBoxValue(item, itemKey) {
      this.$store.commit('updateFilterCheckboxValue', {filterKey: itemKey, filterId: item.id, value: !item.checked});
    },

    optionName(option) {
      return Object.prototype.hasOwnProperty.call(option, 'name')
        ? option.name
        : option.firstName + " " + option.lastName;
    },

    removeOption(option, type) {
      this.$store.commit('updateFilterCheckboxValue', {filterKey: type, filterId: option.id, value: false})
    },
    
    selectOption(option, type) {
      this.$store.commit('updateFilterCheckboxValue', {filterKey: type, filterId: option.id, value: true})
      this.filterSearchInput = "";
    },

    optionSearchResult() {
      return this.optionsLeft.filter((o) => this.optionName(o)
          .toLowerCase()
          .includes(this.filterSearchInput.toLowerCase()));
    },

    getFiltersCount(filterName) {
      let counter = 0;
      let currentCount = 0;

      for (let key in this.filters) {
        const result = this.options[key]?.length;
        
        if (result) {
          counter++;
          if (filterName === key) {
            currentCount = result;
          }
        }
      }

      this.$emit("getFiltersCount", counter);

      return currentCount;
    },
  },

  watch: {
    optionsFromUrl: {
      handler(newValue) {
        this.options = {...newValue};
      },
      deep: true
    }
  }
};
</script>

<style scoped lang='scss'>

.sidebar {
  &__items {
    position: relative;
  }
}
</style>
