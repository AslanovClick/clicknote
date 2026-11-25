<template>
  <div class="sidebar__open">
    <div class="sidebar__open_icon">
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.06675 11.5201L10.1122 11.5325C10.3645 11.5334 10.5687 11.7446 10.5687 12.0036V14.2794C10.5687 14.5393 10.4211 14.7744 10.1912 14.8831L6.51892 16.6074C6.43312 16.6472 6.34217 16.6667 6.25122 16.6667C6.13024 16.6667 6.00927 16.6313 5.90373 16.5615C5.71926 16.4395 5.60772 16.2292 5.60772 16.0038V11.9912C5.60772 11.7305 5.81364 11.5192 6.06675 11.5201ZM14.8932 0C15.873 0 16.6667 0.817544 16.6667 1.82688V3.10313C16.6667 3.59277 16.4753 4.06297 16.1356 4.4059L10.7147 9.88918C10.6212 9.98464 10.4942 10.0377 10.3629 10.0368L5.82411 10.0226C5.68597 10.0226 5.5547 9.96343 5.46032 9.86002L0.478764 4.38115C0.170742 4.04264 0 3.59542 0 3.13141V1.82776C0 0.818428 0.793651 0 1.77349 0H14.8932Z"
          fill="var(--bgcolor-5)"
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
  
  &__open {
    cursor: pointer;
    position: absolute;
    left: 0;
    top: em(12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    padding: 0 0.9375em;
    width: em(17);
    height: 3.313em;
    background: var(--bgcolor-2);
    border: 0.03125em solid var(--bgcolor-1);
    border-radius: 0 1.5625em 1.5625em 0;
    transition: transform 0.25s ease-in-out, background 0.2s ease-in-out, border-color 0.2s ease-in-out;

    &_icon {
      display: flex;
      transition: opacity 0.15s ease-in-out;
      opacity: 1;
      top: 50%;
      left: 50%;
      position: absolute;
      transform: translate(-65%, -50%);

      .open & {
        opacity: 0;
      }

      & svg {
        width: 100%;
        height: auto;
        font-size: 1em;
        min-width: em(16);
        max-width: em(16);

        & path {
          transition: fill 0.15s ease-in-out;
        }
      }
    }

    &:hover {
      background: var(--bgcolor-2);

      & path {
        fill: #ff381d;
      }
    }
  }
}
</style>