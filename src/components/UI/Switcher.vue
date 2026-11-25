<template>
  <label class="switcher" :class="{ checked: value }">
    <input
      type="checkbox"
      class="switcher__checkbox"
      :checked="value"
      @change="$emit('switcherChange')"
    />
    <div class="switcher__circle">
      <img :src="value ? checkedIcon : uncheckedIcon" alt="" />
    </div>
  </label>
</template>

<script>
export default {
  props: ["value", "checkedIcon", "uncheckedIcon"],

  emits: ["switcherChange"],

  data() {
    return {
      inputValue: Boolean,
    };
  },

  mounted() {
    this.inputValue = this.value;
  },
};
</script>

<style scoped lang="scss">
.switcher {
  padding: em(4);

  width: em(56);
  min-width: em(56);
  height: em(32);
  background: var(--bgcolor-1);
  border-radius: em(20);
  border: 0;
  cursor: pointer;
  // margin-right: 1.5em;
  margin-right: .5em;
  position: relative;
  transition: background 0.2s ease-in-out;
  display: block;

  // &.checked {
  //     background: var(--bordercolor-1);
  // }

  &__circle {
    width: em(24);
    height: em(24);
    background: var(--bgcolor-5);
    border-radius: em(15);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.25s ease-in-out, background 0.2s ease-in-out;
    position: relative;

    // .checked & {
    //     background: #775FFC;
    // }'
    
    & img {
      user-select: none ;
    }
  }

  &__checkbox {
    position: absolute;
    z-index: -5;
    top: 0;
    left: 0;
    opacity: 0;
  }

  &__checkbox:checked ~ &__circle {
    transform: translate(80%, 0);
  }

  &:hover {
    opacity: 0.85;
  }
}
</style>
