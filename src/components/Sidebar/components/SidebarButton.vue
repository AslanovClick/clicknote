<template>
  <div class="sidebar__button">
    <span> Фильтровать </span>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.sidebar {
  &__button {
    padding: em(14) em(20);
    width: 100%;
    background: #ff1923;
    border-radius: em(15);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    max-width: 11.8em;
    transition: background 0.15s ease-in-out;
    margin: auto;

    & span {
      font-style: normal;
      font-weight: 600;
      font-size: em(16);
      line-height: em(20, 16);
      color: #f4f7fe;
    }

    &:hover {
      background: #ff381d;
    }

    @media (max-width: 500px) {
      max-width: unset;
      width: 90%;
    }
  }
}
</style>
