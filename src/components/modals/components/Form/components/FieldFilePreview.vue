<template>
  <field-file
    title="Добавить превью"
    name="preview"
    :error="previewError"
    formatsDescription="Форматы: JPEG, PNG"
    weightDescription="Вес: до 500kb"
    @onFileLoad="onFileLoad"
  />
</template>

<script>
import fieldFile from "@/components/FormComponents/FieldFile";

export default {
  props: ["error"],

  components: { fieldFile },

  data() {
    return {
      file: {},
    };
  },

  computed: {
    changed() {
      return this.error || this.file?.name !== undefined;
    },

    errors() {
      return [
        {
          regex: this.file?.name === undefined,
          alert: "Это обязательно поле!",
        },
        {
          regex:
            this.file.type !== "image/jpeg" &&
            this.file.type !== "image/jpg" &&
            this.file.type !== "image/png",
          alert: "Ошибка! Допустимые форматы превью: JPEG, PNG",
        },
        {
          regex: this.file.size > 500000,
          alert: "Ошибка! Допустимый вес превью: до 500kb",
        },
      ];
    },

    findErrors() {
      return this.errors.find(error => error.regex === true);
    },

    previewError() {
      return !this.changed ? false : this.findErrors ?? false;
    },

    validated() {
      return this.previewError === false;
    }
  },

  methods: {
    onFileLoad(file) {
      this.file = file;
      this.$emit("fieldChange", {value: file, validated: this.validated});
    },
  },
};
</script>

<style></style>
