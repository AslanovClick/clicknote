<template>
  <div class="sidebar__items_container" :class="{sidebar__scroll: filterList.length > 5}">
    <div class="sidebar__item"
      v-for="(item, itemKey) in filterList"
      :key="itemKey"
      >
      <label class="sidebar__checkbox">
        <input
          type="checkbox"
          :checked="item.checked"
          name=""
          @change="$emit('updateCheckBoxValue', item)"
        />
        <span>{{ item.name }}</span>
      </label>
      <span v-if="counts && !item.checked" class="sidebar__item_count">{{ counts[item.id] || 0 }}</span>
    </div>
    <div v-if="!filterList.length" class="sidebar__item sidebar__item--empty">
      Нет вариантов для этих фильтров
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarItemCheckbox',

  props: ['filterList', 'counts'],

  emits: [
    'updateCheckBoxValue'
  ]
};
</script>


<style scoped lang='scss'>

.sidebar {
  &__items_container {
    padding-right: 0.3em;
    // position: relative;
    max-height: 17em;
  }

  &__scroll {
    overflow: auto;
    position: relative;

    /* width */
    &::-webkit-scrollbar {
      width: em(4);
      border-radius: em(20);
    }

    /* Track */
    &::-webkit-scrollbar-track {
      // background: var(--bgcolor-6);=
      border-radius: em(20);
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: var(--bgcolor-5);
      border-radius: em(20);
      transition: background 0.2s ease-in-out;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: rgba(174, 174, 174, 0.8);
    }

  }

  &__item {
    font-weight: 400;
    font-size: max(13px, em(14));
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

  &__checkbox {
    & input {
      display: none;
      &:checked ~ span {
        color: var(--text-color-2);
        &::before {
          opacity: 1 !important;
        }
      }
    }

    & span {
      transition: color 0.15s ease-in-out;
      &::after {
        content: "";
        width: em(16);
        height: em(16);
        background: var(--bgcolor-1);
        border-radius: em(4);
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0, -50%);
        z-index: 1;
        transition: background 0.2s ease-in-out, border-color 0.2s ease-in-out;
      }

      &::before {
        content: "";
        width: em(12);
        height: em(12);
        background: url("/img/form/checked.svg") no-repeat;
        background-size: 100% auto;
        background-position: center top;
        border-radius: em(4);
        position: absolute;
        left: 0.2em;
        top: 50%;
        transform: translate(0, -50%);
        z-index: 2;
        opacity: 0;
      }

      &:hover {
        color: #ff381d;
      }
    }
  }
}

.sidebar__item_count {
  margin-left: auto;
  padding-left: .6em;
  font-size: max(11px, .8em);
  color: var(--text-color-4);
  font-variant-numeric: tabular-nums;
}

.sidebar__item--empty {
  padding-left: 0;
  font-size: max(12px, .8em);
  color: var(--text-color-4);
}
</style>
