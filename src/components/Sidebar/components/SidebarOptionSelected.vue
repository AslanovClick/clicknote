<template>
  <div class="sidebar__option_selected">
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.84705 6.8489L4.02912 5.03098L2.22696 6.83314C1.93679 7.12331 1.46428 7.12125 1.17157 6.82854C0.878867 6.53584 0.87681 6.06332 1.16698 5.77316L2.96914 3.97099L1.15121 2.15307C0.906213 1.85201 0.926813 1.41645 1.19892 1.14434C1.47103 0.872229 1.9066 0.851628 2.20765 1.09663L4.01988 2.90886L5.81639 1.11234C6.11533 0.869955 6.55109 0.89435 6.82558 1.16884C7.10007 1.44333 7.12446 1.87909 6.88207 2.17802L5.08556 3.97454L6.90349 5.79246C7.14849 6.09352 7.12789 6.52908 6.85578 6.80119C6.58367 7.0733 6.1481 7.0939 5.84705 6.8489Z"
        fill="#FF1923"
      />
    </svg>
    <span>
      {{ optionName }}
    </span>
  </div>
</template>

<script>
export default {
  name: "SidebarOptionSelected",

  props: ["optionName"],
};
</script>

<style scoped lang="scss">
.sidebar {
  &__option_selected {
    cursor: pointer;
    margin-bottom: 0.64em;
    padding-left: 0.11em;

    & span {
      font-weight: 500;
      font-size: em(14);
      line-height: 130%;
      color: var(--text-color-2);
      padding-left: 0.35em;
      transition: color 0.15s ease-in-out;
    }

    & svg {
      width: 100%;
      min-width: em(10);
      max-width: em(10);
      margin-right: em(7);
    }

    &:hover {
      & span {
        color: #ff381d;

        &::after {
          opacity: 1;
        }
      }
    }
  }
}
</style>
