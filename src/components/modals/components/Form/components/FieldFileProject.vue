<template>
  <field-file
    title="Добавить работу"
    name="project"
    :error="projectError"
    formatsDescription="Ограничений по весу и размеру нет, но имейте совесть"
    @onFileLoad="onFileLoad"
    :resetInput="fieldsReset.drag"
    :value='value'
  >
    <template #moreUploadFields>
      <div class="form__file_more">
        <field-url
          :value="valueUrl"
          :resetInput="fieldsReset.url"
          @input="onInput"
          @error="$emit('errorUrl')"
          @urlEmpty="$emit('error')"
        />
        <field-upload
          name="project"
          :resetInput="fieldsReset.upload"
          @onFileLoad="onUpload"
          :value='value'
        />
      </div>
    </template>
  </field-file>
</template>

<script>
import fieldFile from "@/components/FormComponents/FieldFile";
import FieldUpload from "./FieldUpload.vue";
import FieldUrl from "./FieldUrl.vue";

export default {
  props: ["error", "value", "valueUrl"],

  components: { fieldFile, FieldUrl, FieldUpload },

  data() {
    return {
      file: {},

      url: {
        value: '',
        validated: false,
      },

      uploadButton: {
        value: null,
        validated: false,
      },
      
      fieldsReset: {
        drag: false,
        url: false,
        upload: false,
      },
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
      ];
    },

    findErrors() {
      return this.errors.find((error) => error.regex === true);
    },

    urlValidated() {
      return this.url.validated === true;
    },

    uploadsValidated() {
      return this.uploadButton.validated === true;
    },

    existsOtherFields() {
      return this.urlValidated === true || this.uploadsValidated === true;
    },

    projectError() {
      return !this.changed || this.existsOtherFields ? false : this.findErrors ?? false;
    },

    validated() {
      return this.projectError === false;
    }
  },

  methods: {
    reset(fieldName) {
      for (let key in this.fieldsReset) {
        this.fieldsReset[key] = fieldName !== key;
      }
    },

    onInput({value, validated}) {
      // this.valueUrl = value;
      this.url.validated = validated;
      
      this.file = {};
      this.uploadButton.value = {};
      this.reset("url");

      this.$emit("fieldUrlChange", {value: value, validated: validated});
      this.$emit("fieldChange", {value: null, validated: true});
    },

    onUpload({value, validated}) {
      this.uploadButton.value = value;
      this.uploadButton.validated = validated;

      this.file = {};
      // this.url.value = '';
      this.reset("upload");

      this.$emit("fieldUrlChange", {value: null, validated: true});
      this.$emit("fieldChange", {value: value, validated: validated});
    },

    onFileLoad(file) {
      this.file = file;
      // this.url.value = "";
      this.uploadButton.value = null;
      this.reset("drag");

      this.$emit("fieldUrlChange", {value: null, validated: true});
      this.$emit("fieldChange", {value: file, validated: this.validated});
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  &__file_more {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 93%;
    position: relative;
    z-index: 9;
  }
}
</style>
