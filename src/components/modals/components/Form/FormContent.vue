<template>
  <back-form-button v-if="step !== 0" @click="step = 0" />

  <form ref="formCreate" class="form" method="post">
    <div class="form__content" v-show="step === 0">
      <field-input
        title="Название"
        name="name"
        :value="fieldsData.name.value"
        :error="fieldsData.name.error"
        @fieldChange="(args) => onFieldChange('name', args)"
      />

      <field-select
        title="Сфера"
        name="scope"
        :value="fieldsData.scope.value"
        :options="filters.scope"
        :error="fieldsData.scope.error"
        @fieldChange="(args) => onFieldChange('scope', args)"
      />

      <field-select
        title="Исполнитель"
        name="executor"
        :value="fieldsData.executor.value"
        :options="executors"
        :error="fieldsData.executor.error"
        @fieldChange="(args) => onFieldChange('executor', args)"
      />

      <field-select
        title="Направление"
        name="direction"
        :value="fieldsData.direction.value"
        :options="filters.direction"
        :error="fieldsData.direction.error"
        @fieldChange="(args) => onFieldChange('direction', args)"
      />

      <field-file-project
        :value="fieldsData.project.value"
        :valueUrl="fieldsData.url.value"
        :error="fieldsData.project.error || fieldsData.url.error"
        @fieldUrlChange="(args) => onFieldChange('url', args)"
        @fieldChange="(args) => onFieldChange('project', args)"
      />

      <field-file-preview
        :error="fieldsData.preview.error"
        :value="fieldsData.preview.value"
        @fieldChange="(args) => onFieldChange('preview', args)"
      />
    </div>

    <div class="form__content" v-show="step === 1">
      <field-select
        title="Клиент"
        name="client"
        :value="fieldsData.client.value"
        :options="filters.client"
        :error="fieldsData.client.error"
        @fieldChange="(args) => onFieldChange('client', args)"
      />

      <field-select
        title="Тип работы"
        name="type"
        :value="fieldsData.type.value"
        :options="filters.type"
        :error="fieldsData.type.error"
        @fieldChange="(args) => onFieldChange('type', args)"
      />

      <field-select
        title="Программа"
        name="program"
        :value="fieldsData.program.value"
        :options="filters.program"
        :error="fieldsData.program.error"
        @fieldChange="(args) => onFieldChange('program', args)"
      />

      <field-select
        title="Формат"
        name="format"
        :value="fieldsData.format.value"
        :options="filters.format"
        :error="fieldsData.format.error"
        @fieldChange="(args) => onFieldChange('format', args)"
      />

      <form-tags
        title="Тэги проекта"
        name="tag"
        :tags="fieldsData.tag.value"
        :error="fieldsData.tag.error"
        @onTagsChange="(args) => onFieldChange('tag', args)"
      />
    </div>

    <form-buttons
      :haveNextStep="haveNextStep"
      @nextStep="next"
      @save="save"
      :disabledNext="Boolean(firstStepFieldsError)"
      :disabledSave="Boolean(error)"
      :haveArchiveButton="haveArchiveButton"
      @archive="$emit('addToArchive')"
    />
  </form>
</template>

<script>
import { mapState } from "vuex";
import BackFormButton from "@/components/UI/BackFormButton.vue";

import FieldInput from "@/components/FormComponents/FieldInput";
import FieldSelect from "@/components/FormComponents/FieldSelect";
import FieldFileProject from "./components/FieldFileProject.vue";
import FieldFilePreview from "./components/FieldFilePreview.vue";
import FormButtons from "./components/FormButtons.vue";
import FormTags from "./components/FormTags.vue";

export default {
  components: {
    FieldInput,
    FieldSelect,
    FieldFileProject,
    FieldFilePreview,
    FormButtons,
    FormTags,
    BackFormButton,
  },

  props: ["defaultValues", "reset", "haveArchiveButton"],

  data() {
    return {
      fields: {
        name: {
          title: "Название",
          value: null,
          error: false,
        },
        scope: {
          title: "Сфера",
          value: null,
          error: false,
        },
        executor: {
          title: "Исполнитель",
          value: null,
          error: false,
        },
        direction: {
          title: "Направление",
          value: null,
          error: false,
        },
        project: {
          value: null,
          error: false,
        },
        url: {
          value: null,
          error: false,
        },
        preview: {
          value: null,
          error: false,
        },
        client: {
          title: "Клиент",
          value: null,
          error: false,
        },
        type: {
          title: "Тип работы",
          value: null,
          error: false,
        },
        program: {
          title: "Программа",
          value: null,
          error: false,
        },
        format: {
          title: "Формат",
          value: null,
          error: false,
        },
        tag: {
          title: "Tag",
          value: null,
          error: false,
        },
      },

      firstStepFields: [
        "name",
        "scope",
        "executor",
        "direction",
        "project",
        "url",
        "preview",
      ],

      step: 0,
    };
  },

  computed: {
    ...mapState({
      executors: (state) => state.users,
      filters: (state) => state.filters,
    }),

    haveNextStep() {
      return this.step === 0;
    },

    firstStepFieldsError() {
      const res = [];

      this.firstStepFields.forEach((key) => {
        if (this.fields[key].error === true) {
          res.push(this.fields[key]);
        }
      });

      return res.length !== 0;
    },

    error() {
      return (
        Object.values(this.fields).find((field) => field.error === true) ??
        false
      );
    },

    fieldsData() {
      const fields = { ...this.fields };

      for (let key in fields) {
        if (Object.prototype.hasOwnProperty.call(this.defaultValues, key)) {
          fields[key].value = this.defaultValues[key];
        }
      }

      return fields;
    },
  },

  methods: {
    checkError(typeOfField) {
      const field = this.fields[typeOfField];

      if (typeOfField === "project" || typeOfField === "url") {
        this.checkProjectError(field);
        return;
      }

      field.error = field.value === null || field.value === "";
    },

    checkProjectError(field) {
      const project = this.fields["project"];
      const url = this.fields["url"];
      const isProjectFields = project.value === null && url.value === null;

      if (!isProjectFields) {
        project.error = false;
        url.error = false;
      } else {
        field.error = field.value === null || field.value === "";
      }
    },

    checkValues() {
      for (let type in this.fields) {
        this.checkError(type);
      }
    },

    onFieldChange(fieldKey, {value, validated}) {
      this.fields[fieldKey].value = value;
      this.fields[fieldKey].error = !validated;
    },

    checkFirstStepValues() {
      for (let type of this.firstStepFields) this.checkError(type);
    },

    getFormData() {
      const formData = new FormData();

      for (let key in this.fields) {
        const field = this.fields[key];
        if (field.value === null) continue;
        if (
          key === "preview" &&
          typeof field.value === "string" &&
          field.value.includes("http")
        )
          continue;

        if (key === "tag") {
          field.value.forEach((tag, i) =>
            formData.append(`tags[${i}]`, tag.id)
          );
        } else {
          formData.append(key, field.value);
        }
      }

      for (var [key, value] of formData.entries()) {
        console.log(key, value);
      }

      return formData;
    },

    resetFields() {
      for (let key in this.fields) {
        if (Object.prototype.hasOwnProperty.call(this.defaultValues, key)) {
          this.fields[key].value = this.defaultValues[key];
        } else {
          this.fields[key].value = null;
        }

        this.fields[key].error = false;
      }
      
      this.step = 0;
    },

    next() {
      this.checkFirstStepValues();
      // console.log(this.firstStepFieldsError);
      if (!this.firstStepFieldsError) {
        console.log('next');
        console.log(this.step);
        this.step = 1;
      }
    },

    save() {
      this.checkValues();

      const data = this.getFormData();

      if (!this.error && data) {
        this.$emit("save", data);
      }
    },
  },

  watch: {
    reset(newVal) {
      if (newVal === true) {
        this.resetFields();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  margin-top: em(12);

  &__content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    align-items: flex-start;
    justify-content: flex-start;
  }
}
</style>
