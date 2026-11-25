<template>
  <button
    class="form__button"
    type="button"
    :class="{
      color_red: color === 'red',
      color_silver: color === 'silver',
      color_green: color === 'green',
      disabled: disabled,
    }"
  >
    <slot name="icon"> </slot>
    <span>
      {{ title }}
    </span>
  </button>
</template>

<script>
export default {
  props: ["title", "color", "disabled"],
};
</script>

<style lang="scss">
.form {
  &__button {
    padding: em(14) em(20);
    background: var(--bgcolor-3);
    border-radius: em(15);
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    cursor: pointer;
    font-family: "Montserrat";
    font-size: 1em;

    & svg {
      margin-right: em(8);
      width: 100%;
      height: auto;
      min-width: em(18);
      max-width: em(18);
    }

    & span {
      font-weight: 500;
      font-size: em(16);
      line-height: em(20, 16);
      color: var(--bgcolor-5);
      margin-bottom: 0;
    }
  }

  .color_silver {
    transition: background 0.15s ease-in-out;
    & svg {
      & path {
        transition: fill 0.15s ease-in-out;
      }
    }

    & span {
      transition: color 0.15s ease-in-out;
    }

    &:hover {
      background: #aeaeae;

      & span {
        color: var(--bgcolor-2);
      }

      & svg path {
        fill: var(--bgcolor-2);
      }
    }
  }

  .color_red {
    transition: background 0.15s ease-in-out;
    & svg {
      width: 100%;
      min-width: em(20);
      max-width: em(20);

      & path {
        transition: fill 0.15s ease-in-out;
      }
    }

    & span {
      color: #ee5d50;
      transition: color 0.15s ease-in-out;
    }

    &:hover {
      background: #ff1923;

      & span {
        color: var(--bgcolor-2);
      }

      & svg path:first-child {
        fill: #fff;
      }

      & svg path:nth-child(2) {
        fill: #ff1923;
      }
    }
  }

  .color_green {
    background: rgba(7, 223, 167, 1);
    box-shadow: em(8) em(8) em(16) rgba(77, 255, 209, 0.24);
    border-radius: em(15);
    transition: background 0.15s ease-in-out;

    &.disabled {
      background: rgba(7, 223, 167, 0.5);
      pointer-events: none;
    }

    & svg {
      width: 100%;
      min-width: em(16);
      max-width: em(16);
      margin-right: em(10);
    }

    & span {
      color: var(--bgcolor-2);
    }

    &:hover {
      background: #17eeb6;
    }
  }
}
</style>
