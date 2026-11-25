<template>
  <div class="form__file_upload">
    <label>
      <input
        type="file"
        ref="projectArchive"
        @change="uploadFile($event)"
        :key="fileInputKey"
      />
    </label>
    <span v-if="file && file.name">
      {{ file.name }}
    </span>
    <span v-else> Загрузить </span>
  </div>
</template>

<script>
export default {
  props: ["value", "name", "resetInput"],

  data() {
    return {
      file: {},
      fileInputKey: 0,
    };
  },

  computed: {
    validated() {
      return this.file !== undefined || Object.keys(this.file).length !== 0;
    }
  },

  methods: {
    uploadFile(e) {
      this.file = e.target.files[0];

      this.$emit("onFileLoad", {value: this.file, validated: true});
    },

    fileInputReset() {
      this.file = {};
      this.fileInputKey++;
    },
  },

  watch: {
    resetInput(newVal) {
      if (newVal === true) {
        this.fileInputReset();
      }
    },
    
    value(newValue) {
      if (newValue === null) {
        this.file = {};
        this.fileInputKey++;
      } 
    }
  },
};
</script>

<style scoped lang="scss">
.form {
  &__file_upload {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.68em 0.95em;
    background: var(--bgcolor-3);
    border-radius: em(15);
    margin-left: 0.5em;
    cursor: pointer;
    position: relative;
    font-size: 1em;
    padding: 0.875em 0.35em;
    height: 3.1em;
    width: 7.9em;
    & svg {
      width: 100%;
      min-width: em(15);
      max-width: em(15);
      margin-right: em(7);
    }

    & span {
      font-weight: 500;
      font-size: em(16);
      line-height: em(20, 16);
      color: var(--bgcolor-5);
      margin-bottom: 0;
      transition: color 0.15s ease-in-out;
      width: 5.9em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
    }

    & label {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      cursor: pointer;
    }

    & input {
      width: 100%;
      height: 100%;
      cursor: pointer;
      position: relative;
      z-index: -1;
    }

    &:hover {
      & span {
        color: #ff1923;
      }
    }
  }
}
</style>
