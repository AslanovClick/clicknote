<template>
  <div class="home-buttons">
    <div class="home-button"
        v-for="(button, index) in buttons"
        :key="button+index"
        :class="{'active': button.active === true}"
        @click="$emit('selected', { filterId: button.filterId, index })"
        >
        <div class="home-button__icon">
            <svg xmlns="http://www.w3.org/2000/svg" :width="button.icon.svg.width" :height="button.icon.svg.height" :viewBox="`0 0 ${button.icon.svg.width} ${button.icon.svg.height}`" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" :d="button.icon.svg.path.d" fill="#AEAEAE"/>
            </svg>
        </div>
        <div class="home-button__title">
            {{ button.title }}
        </div>
    </div>
</div>
</template>

<script>
export default {
  props: [
    'buttons'
  ],

  emits: [
    'selected'
  ],
}
</script>

<style lang="scss">
.home-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: em(12) 0;
  width: 100%;
  border-radius: em(25);
  margin-bottom: em(36);
  min-height: 3.3em;
  // Tabs keep one line; if they don't fit (narrow screens, more directions) the row scrolls.
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 500px) {
    overflow: auto;
    margin-bottom: 0.95em;
    padding: 0.5em;
    border-radius: em(15);

    &::-webkit-scrollbar {
        height: 0;
        background:transparent;
    }
  }
}

.home-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: em(12) em(16);
    border-radius: em(20);
    margin-right: em(12);
    cursor: pointer;
    border: em(1) solid transparent;
    transition: background .2s ease-in-out, border .2s ease-in-out;
    user-select: none;
    background: var(--bgcolor-2);
    flex: 1 0 auto;
    white-space: nowrap;

    &:last-child {
      margin-right: 0;
    }

    & svg path {
        transition: fill .2s ease-in-out;
    }

    &:hover {
        border: em(1) solid var(--bgcolor-3);
        & .home-button__title {
            color: #FF381D;
        }
        & svg path {
            fill: #FF381D;
        }
    }

    &.active {
        background: var(--bgcolor-10);

        & svg path {
            fill: #FF381D;
        }

        & .home-button {
            &__title {
                color: #FF381D;
            }
        }
    }

    &__title {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 500;
      // font-size: em(16);
      font-size: max(13px, .9em);
      line-height: em(20, 16);
      color: #AEAEAE;
      margin-left: em(12);
      transition: color .15s ease-in-out;
  }

  &__icon {
      & svg {
          min-width: em(24);
          max-width: em(24);
          width: 100%;
          height: 100%;
      }
  }

  @media (max-width: 500px) {
    flex: 0 0 auto;
    padding: em(10) em(16);
    font-size: max(12px, 0.75em);

    &__title {
        font-size: max(12px, em(12));
        width: max-content;
    }
  }
}
</style>