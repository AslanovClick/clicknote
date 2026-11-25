<template>
  <div class="project__img">
    <img :src="previewSrc" alt="" />
  </div>
</template>

<script>
export default {
  props: ["previewSrc"],
};
</script>

<style scoped lang="scss">
.project {
  &__img {
    height: 14.8em;
    overflow: hidden;
    border-radius: em(15) em(15) 0 0;
    background: #c4c4c4;
    cursor: pointer;
    @media (min-width: 1080px) {
      .full & {
        height: 17.8em;
      }
    }
    & img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    @media (max-width: 500px) {
      height: em(100);
    }
  }
}
</style>
