<template>
  <div class="form__url" :class="{ urlError: value?.length !== 0 && urlError }">
    <input
      type="text"
      required
      :value="value"
      placeholder="Ссылка на работу"
      @input="onInput"
    />
    <div class="form__url_error">
      <span>
        {{ urlError.alert }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "error", "resetInput"],

  emits: ["input"],

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
          regex:
            !this.targetValue?.startsWith("http://") &&
            !this.targetValue?.startsWith("https://"),
          alert: "Неправильный формат ссылки!",
        },
        {
          regex: !this.targetValue?.includes("."),
          alert: "Неправильный формат ссылки!",
        },
      ];
    },

    findErrors() {
      return this.errors.find((error) => error.regex === true);
    },

    urlError() {
      return !this.changed ? false : this.findErrors ?? false;
    },

    validated() {
      return this.urlError === false;
    }
  },

  methods: {
    onInput(e) {
      this.changed = true;
      this.targetValue = e.target.value;
      this.$emit("input", {value: this.targetValue, validated: this.validated});
    },
  },

  watch: {
    resetInput(newVal) {
      if (newVal === true) {
        this.changed = false;
        // this.$emit("input", null);
      }
    },

    value(newValue) {
      if (this.changed === false) return;
      if (newValue === null) {
        this.changed = false;
      } 
    }
  },
};
</script>

<style scoped lang="scss">
.form {
  &__url {
    width: 72%;

    & input {
      background: var(--bgcolor-2);
      border: em(1) solid var(--bgcolor-5);
      border-radius: em(15);
      font-weight: 500;
      line-height: em(15);
      color: var(--bgcolor-5);
      font-size: 1em;
      padding: 0.875em 1.25em;
      width: 100%;
      height: 3.1em;
      display: block;
      color: var(--text-color-1);

      &::placeholder {
        font-size: 0.9em;
      }
    }

    & .form__url_error {
      opacity: 0;
      position: absolute;
      bottom: -1em;
      left: 0;
    }

    &.urlError {
      & .form__url_error {
        opacity: 1;

        & span {
          font-weight: 400;
          color: #ff1923;
          font-size: 0.75em;
          line-height: 120%;
          display: block;
          width: 100%;
        }
      }

      & input {
        border-color: #ff1923;
      }
    }
  }
}
</style>
