<template>
  <div class="sidebar__close_mobile">
    <svg
      width="10"
      height="11"
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.77057 9.75834L5.04368 7.03145L2.34044 9.73469C1.90519 10.1699 1.19642 10.1669 0.757359 9.7278C0.3183 9.28874 0.315214 8.57997 0.750466 8.14472L3.45371 5.44148L0.726821 2.71459C0.359319 2.263 0.39022 1.60966 0.798385 1.20149C1.20655 0.793329 1.85989 0.762428 2.31148 1.12993L5.02982 3.84827L7.72459 1.1535C8.17299 0.789918 8.82663 0.82651 9.23837 1.23825C9.6501 1.64998 9.68669 2.30362 9.32311 2.75202L6.62834 5.44679L9.35523 8.17368C9.72273 8.62527 9.69183 9.27861 9.28367 9.68678C8.8755 10.0949 8.22216 10.1258 7.77057 9.75834Z"
        fill="white"
      />
    </svg>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.sidebar {
  &__close_mobile {
    display: none;
  }

  @media (max-width: 500px) {
    &__close_mobile {
      display: block;
      width: em(24);
      height: em(24);
      background: #ee5d50;
      border-radius: em(8);
      position: absolute;
      top: em(-5);
      right: em(-5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 6;

      & svg {
        width: 100%;
        height: auto;
        min-width: em(12);
        max-width: em(12);
      }
    }
  }
}
</style>