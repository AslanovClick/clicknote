<template>
  <label class="sidebar__option">
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.32045 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293422 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293422 3.25394 0.679545 3.2143H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.2143H7.32045C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32045 4.70834Z"
        fill="var(--bgcolor-5)"
      />
    </svg>
    <input type="checkbox" name="" />
    <span>
      {{ optionName }}
    </span>
  </label>
</template>

<script>
export default {
  name: 'SidebarOption',

  props: ['optionName']
};
</script>

<style scoped lang="scss">
.sidebar {
  &__option {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & svg {
      width: 100%;
      height: 100%;

      min-width: em(10);
      max-width: em(10);
      margin-right: em(6);
      position: absolute;
      left: 0.2em;
      top: 0;
      z-index: 2;
    }

    & span {
      color: var(--bgcolor-5);
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
        opacity: 0;
      }
    }

    &:hover {
      & span {
        // color: #FF381D;
        color: #7e7e7e;

        &::after {
          opacity: 1;
        }
      }

      & svg path {
        fill: #05cd99;
      }
    }

    & input {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -9;
      opacity: 0;
    }
  }
}
</style>
