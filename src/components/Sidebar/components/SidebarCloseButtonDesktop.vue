<template>
  <div class="sidebar__close_desktop">
    <div class="sidebar__close_desktop_icon">
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
          fill="#FF1923"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.sidebar {
  &__close_desktop {
    font-size: 1em;
    cursor: pointer;
    position: absolute;
    top: 1.7em;
    left: 97%;
    padding: 0;
    width: em(20);
    height: em(20);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bgcolor-1);
    border: em(0.5) solid var(--bgcolor-1);
    border-radius: 50%;
    transition: opacity 0.25s .2s ease-in-out, background 0.2s ease-in-out, border-color 0.2s ease-in-out;
    pointer-events: none;
    z-index: 6;
    opacity: 0;

    &_icon {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.2s ease-in-out;
      opacity: 0;

      & svg {
        width: 100%;
        height: auto;
        font-size: 1em;
        min-width: em(6);
        max-width: em(6);
        & path {
          transition: fill 0.2s ease-in-out;
        }
      }

      .open & {
        opacity: 1;
      }
    }

    .open & {
      background: var(--bgcolor-1);
      pointer-events: auto;
      opacity: 1;
    }

    &:hover {
      background: var(--bgcolor-2);

      & path {
        fill: #ff381d;
      }
    }
    @media (max-width: 500px) {
      display: none;
    }
  }
  
}
</style>