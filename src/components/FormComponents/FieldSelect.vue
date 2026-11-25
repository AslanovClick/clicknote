<template>
  <field :title="title"
    :class="{'error': error}"
    >
    <template #content>
      <select class="form__select" 
        :name="name" 
        :value='value'
        @change="select"
        >
        <option disabled selected value>Выбрать</option>
        <option v-for="option in options"  
          :key="option.id"
          :value="option.id"
          >
          {{optionName(option)}}
        </option>
      </select>
      <div class="form__select_arrow">
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0014 1.89161L7.60014 7.07942C7.26869 7.39777 6.73131 7.39777 6.39986 7.07942L0.998588 1.89161C0.667139 1.57326 0.667139 1.05711 0.998588 0.738762C1.33004 0.420412 1.86742 0.420412 2.19887 0.738762L7 5.35015L11.8011 0.738762C12.1326 0.420412 12.67 0.420412 13.0014 0.738763C13.3329 1.05711 13.3329 1.57326 13.0014 1.89161Z" fill="var(--bgcolor-5)"/>
        </svg>
      </div>
    </template>
  </field>
</template>

<script>
import Field from './Field.vue'
export default {
  components: { Field },

  props: [
    'value',
    'title',
    'name',
    'options',
    // 'defaultValue',
    'error',
  ],

  emits: [
    'fieldChange'
  ],

  data() {
    return {
      targetValue: ''
    }
  },

  computed: {
    validated() {
      return this.targetValue !== null;
    }
  },

  methods: {
    select(e) {
      this.targetValue = e.target.value;
      this.$emit("fieldChange", { value: this.targetValue, validated: this.validated });
    },
    
    optionName(option) {
      return option.name ? option.name : option.firstName +' '+ option.lastName;
    },
  },
}
</script>

<style scoped lang="scss">
.form {
  &__select {
    width: 100%;
    padding: em(14) em(20);
    background: var(--bgcolor-2);
    border: em(1) solid var(--bgcolor-5);
    border-radius: em(15);
    appearance: none;
    font-weight: 500;
    color: var(--text-color-1);
    cursor: pointer;
    transition: border-color .15s ease-in-out;

    &_content {
        width: 100%;
        position: relative;
    }

    &:nth-child(2n) {
        margin-right: 0;
        margin-left: em(18);
    }

    .error & {
        border-color: #FF1923;
    }

    &:hover {
        border-color: #383838;
    }

    &:hover ~ .form__select_arrow path {
        fill: #FF1923;
    }

    &_arrow {
      position: absolute;
      right: 1.4375em;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
      pointer-events: none;

      & svg {
        display: block;
        width: 100%;
        height: 100%;
        min-width: 0.875em;
        max-width: 0.875em;
      }

      & path {
        transition: fill .15s ease-in-out;
      }
    }
  }
}
</style>