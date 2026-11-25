<template>
  <field
    :title="title"
    :errorAlert="inputError.alert"
    :class="{ error: inputError }"
  >
    <template #content>
      <input
        class="form__input"
        required
        name="name"
        type="text"
        placeholder="Здесь должно быть название..."
        :value="value"
        @input="input"
      />
    </template>
  </field>
</template>

<script>
import Field from "./Field.vue";
export default {
  components: { Field },

  props: ["title", "error", "value"],

  emits: [
    'fieldChange'
  ],

  data() {
    return {
      changed: false,
      targetValue: '',
    };
  },

  computed: {
    errors() {
      return [
        {
          regex: this.targetValue === null || this.targetValue.length === 0,
          alert: "Строка должна содержать какое-то значение",
        },
        {
          regex: this.targetValue !== null && this.targetValue.length > 30,
          alert: "Ошибка! Допустимое количество символов: 30",
        },
      ];  
    },

    findErrors() {
      return this.errors.find((error) => error.regex === true);
    },

    inputError() {
      return !this.changed ? false : this.findErrors ?? false;
    },

    validated() {
      return this.inputError === false;
    }
  },

  methods: {
    input(e) {
      this.changed = true;
      this.targetValue = e.target.value;

      this.$emit("fieldChange", { value: this.targetValue, validated: this.validated });
    },
  },

  watch: {
    error() {
      if (this.changed === false) this.changed = true;
    },

    value(newVal) {
      if (newVal === null) {
        this.changed = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  &__input {
    width: 100%;
    padding: 0.875em 1.25em;
    background: var(--bgcolor-2);
    border: 0.0625em solid var(--bgcolor-5);
    border-radius: 0.9375em;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-weight: 500;
    color: var(--text-color-1);

    .error & {
      border-color: #ff1923;
    }

    // &_error {
    //   opacity: 0;
    //   pointer-events: none;
    //   margin-top: em(4);
    //   height: em(15);

    //   & span {
    //     font-weight: 400;
    //     color: #ff1923;
    //     font-size: em(12);
    //     line-height: 120%;
    //     display: block;
    //     width: 100%;
    //   }

    //   .error & {
    //     opacity: 1;
    //   }
    // }
  }
}
</style>
