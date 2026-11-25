<template>
  <div class="sidebar__button" :class="{ disabled: count === 0 }">
    <span>{{ label }}</span>
  </div>
</template>

<script>
// On desktop the filters apply as soon as an option is ticked, so the button is
// only shown on phones, where it applies the set and closes the panel.
export default {
  props: {
    count: { type: Number, default: null },
  },

  computed: {
    label() {
      if (this.count === null) return "Фильтровать";
      if (this.count === 0) return "Нет работ";
      const n = this.count, mod10 = n % 10, mod100 = n % 100;
      const word = mod10 === 1 && mod100 !== 11 ? "работу"
        : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? "работы" : "работ";
      return `Показать ${n} ${word}`;
    },
  },
};
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

.sidebar__button {
  @media (min-width: 501px) {
    display: none;
  }

  &.disabled {
    opacity: .5;
  }
}
</style>
