<template>
  <label class="sidebar__option_search">
    <svg  class="sidebar__option_search_icon"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.03569 2.44068C4.51021 2.44068 2.44068 4.5136 2.44068 7.09825C2.44068 9.68291 4.51021 11.7558 7.03569 11.7558C9.56116 11.7558 11.6307 9.68291 11.6307 7.09825C11.6307 5.8588 11.1434 4.67271 10.2802 3.80022C9.41748 2.92818 8.25012 2.44068 7.03569 2.44068ZM0 7.09825C0 3.19034 3.13771 0 7.03569 0C8.90591 0 10.6969 0.751058 12.0153 2.08366C13.3333 3.41582 14.0714 5.21987 14.0714 7.09825C14.0714 8.37997 13.7339 9.5845 13.1427 10.6246C13.2904 10.7002 13.4304 10.7965 13.5582 10.9136L14.9179 12.0111H15.0262L15.3844 12.3732C16.2052 13.2029 16.2052 14.5426 15.3844 15.3723C14.5564 16.2092 13.2084 16.2092 12.3804 15.3723L12.3536 15.3451L10.8942 13.6726L10.8199 13.5888L10.7985 13.5617C10.7162 13.4575 10.6452 13.3457 10.5862 13.2282C9.54518 13.8434 8.33251 14.1965 7.03569 14.1965C3.13771 14.1965 0 11.0062 0 7.09825Z"
        fill="var(--bgcolor-5)"
      />
    </svg>
    <input
      type="text"
      :placeholder="placeholder"
      :value="filterInput"
      @input="$emit('update:filterInput', $event.target.value)"
    />
    <svg
      class="sidebar__option_reset"
      @click="$emit('resetInput')"
      width="10"
      height="11"
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.77057 9.75846L5.04368 7.03157L2.34044 9.73482C1.90519 10.1701 1.19642 10.167 0.757359 9.72792C0.3183 9.28886 0.315214 8.58009 0.750466 8.14484L3.45371 5.4416L0.726821 2.71471C0.359319 2.26312 0.39022 1.60978 0.798385 1.20162C1.20655 0.793451 1.85989 0.76255 2.31148 1.13005L5.02982 3.84839L7.72459 1.15362C8.17299 0.790039 8.82663 0.826632 9.23837 1.23837C9.6501 1.6501 9.68669 2.30374 9.32311 2.75214L6.62834 5.44691L9.35523 8.1738C9.72273 8.62539 9.69183 9.27873 9.28367 9.6869C8.8755 10.0951 8.22216 10.126 7.77057 9.75846Z"
        fill="var(--bgcolor-3)"
      />
    </svg>
  </label>
</template>

<script>
export default {
  name: "SidebarOption",

  props: ["optionName", "filterInput", "placeholder"],

  emits: ['resetInput', "update:filterInput"]
};
</script>

<style scoped lang="scss">
.sidebar {
  &__option_search {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: em(1) solid var(--bgcolor-3);
    margin-bottom: em(16);
    padding-bottom: em(9);
    padding-left: 0.425em;
    margin-top: em(16);
    transition: border-color 0.2s ease-in-out;

    &_icon {
      width: 100%;
      min-width: em(16);
      max-width: em(16);
      margin-right: em(5);
    }

    & input {
      width: 80%;
      border: 0;
      font-style: normal;
      font-weight: 400;
      font-size: em(14);
      line-height: em(17, 14);
      margin-right: em(5);
      color: var(--text-color-2);
      background: transparent;
      transition: color 0.2s ease-in-out;

      &::placeholder {
        color: var(--bgcolor-5);
      }
    }
  }
  
  &__option_reset {
    width: 100%;
    min-width: em(12);
    max-width: em(12);
    margin-right: em(8);
    cursor: pointer;

    & path {
      transition: fill 0.2s ease-in-out;
    }
  }
}
</style>
