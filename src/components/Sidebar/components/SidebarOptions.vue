<template>
  <div class="sidebar__options">
    <div
      class="sidebar__item"
      v-for="option in optionSearchResult"
      :key="option"
    >
      <SidebarOption
        @mousedown="$emit('selectOption', option)"
        :optionName="this.optionName(option)"
      />
    </div>
  </div>
</template>

<script>
import SidebarOption from './SidebarOption.vue';
import {optionName} from '@/mixins/optionName'

export default {
  name: 'SidebarOptions',

  props: [
    'optionSearchResult',
    'selectOption'
  ],

  components: {
    SidebarOption
  },

  mixins: [optionName],
};
</script>

<style scoped lang='scss'>
.sidebar {
  &__item {
    font-weight: 400;
    font-size: em(14);
    line-height: 130%;
    color: var(--bgcolor-5);
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    position: relative;
    margin-bottom: em(12);
    padding-left: em(26);

    & label {
      cursor: pointer;
    }
  }

  &__options {
    max-height: 17em;
    overflow: auto;
    overflow-x: hidden;
    padding-right: 0.15em;

    /* width */
    &::-webkit-scrollbar {
      width: em(4);
      border-radius: em(20);
    }

    /* Track */
    &::-webkit-scrollbar-track {
      // background: var(--bgcolor-6);
      border-radius: em(20);
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: var(--bgcolor-5);
      border-radius: em(20);
      transition: background 0.2s ease-in-out, border-color 0.2s ease-in-out;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: rgba(174, 174, 174, 0.8);
    }
  }
}
</style>
