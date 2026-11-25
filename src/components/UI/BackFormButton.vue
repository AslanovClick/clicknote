<template>
  <div class="back">
    <div class="back__icon">
      <svg
        width="7"
        height="12"
        viewBox="0 0 7 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.20947 0.238643L0.229167 5.42386C-0.0764489 5.74205 -0.0764489 6.25794 0.229167 6.57614L5.20947 11.7614C5.51508 12.0795 6.01058 12.0795 6.3162 11.7614C6.62181 11.4432 6.62181 10.9273 6.3162 10.6091L1.88927 6L6.3162 1.39091C6.62181 1.07272 6.62181 0.556834 6.3162 0.238643C6.01058 -0.0795478 5.51508 -0.0795478 5.20947 0.238643Z"
          fill="#AEAEAE"
        />
      </svg>
    </div>

    <span> Назад </span>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.back {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  border-radius: em(15);
  align-self: center;
  position: absolute;
  left: 1.75em;
  top: 1.875em;

  &__icon {
    & svg {
      width: 100%;
      height: 100%;
      min-width: em(15);
      max-width: em(15);
      max-height: em(11);
      & path {
        transition: fill 0.15s ease-in-out;
      }
    }
  }
  & span {
    font-weight: 500;
    font-size: em(16);
    line-height: em(20);
    color: var(--bgcolor-5);
    transition: color 0.15s ease-in-out;
  }
  &:hover {
    & span {
      color: #ff0000;
    }
    & path {
      fill: #ff0000;
    }
  }
}
</style>
