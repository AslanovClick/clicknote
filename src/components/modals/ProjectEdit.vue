<template>
  <div>
    <template-modal :open="open" @modalClose="closeModal">
      <template #title>
        <svg
          class="modal__title_icon"
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.102 14.6807C15.5972 14.6807 16 15.0887 16 15.5903C16 16.0929 15.5972 16.5 15.102 16.5H10.0264C9.53118 16.5 9.12842 16.0929 9.12842 15.5903C9.12842 15.0887 9.53118 14.6807 10.0264 14.6807H15.102ZM11.5821 1.12139L12.8932 2.16292C13.4309 2.58335 13.7893 3.13756 13.9119 3.72044C14.0534 4.3616 13.9025 4.99129 13.478 5.53595L5.66791 15.6359C5.30947 16.0946 4.78125 16.3526 4.2153 16.3621L1.10257 16.4003C0.932788 16.4003 0.7913 16.2857 0.75357 16.1232L0.046132 13.056C-0.0764907 12.4922 0.046132 11.9093 0.404567 11.4602L5.94145 4.29375C6.03578 4.17909 6.20556 4.16094 6.31875 4.24598L8.64858 6.09971C8.7995 6.22393 9.00702 6.29082 9.22397 6.26215C9.68616 6.20482 9.99743 5.78438 9.95027 5.33528C9.92197 5.10596 9.80878 4.91485 9.65786 4.77152C9.6107 4.7333 7.39406 2.95601 7.39406 2.95601C7.25257 2.84135 7.22427 2.63113 7.33746 2.48876L8.21469 1.35072C9.02588 0.309188 10.4408 0.213635 11.5821 1.12139Z"
            fill="#7E7E7E"
          />
        </svg>
        Редактировать проект
      </template>

      <template #content>
        <form-content
          :defaultValues="defaultValues"
          @success="success"
          @error="error"
          @save="save"
          :haveArchiveButton="true"
          @addToArchive="addToArchive"
        />
        <div class="form__preloader" :class="{'active': loading}">
          <Preloader />
        </div>
      </template>
    </template-modal>

    <modal-success
      :open="modalSuccessOpen"
      @modalClose="modalSuccessOpen = false"
    >
      <template #title>
        Проект *<span class="success-project-name">{{ projectName }}</span
        >* успешно отредактирован
      </template>
    </modal-success>

    <modal-error
      :open="modalErrorOpen"
      @close="close"
      @back="modalErrorOpen = false"
    >
    </modal-error>
  </div>
</template>

<script>
import TemplateModal from "./components/TemplateModal";
import ModalSuccess from "@/components/modals/ModalSuccess.vue";
import ModalError from "@/components/modals/ModalError.vue";

import FormContent from "./components/Form/FormContent.vue";
import { updateProjects } from "@/Hooks/updateProjects";
import Preloader from '@/components/Preloader/Preloader.vue';

export default {
  components: {
    TemplateModal,
    ModalSuccess,
    ModalError,
    FormContent,
    Preloader,
  },

  props: ["open", "project"],

  data() {
    return {
      modalErrorOpen: false,
      modalSuccessOpen: false,
      projectName: "",

      defaultValues: {},
      loading: false,
    };
  },

  methods: {
    closeModal() {
      this.$emit("modalClose");
    },

    close() {
      this.modalErrorOpen = false;

      this.closeModal();
    },

    error() {
      this.modalErrorOpen = true;
    },

    success(name) {
      this.projectName = name;
      this.modalSuccessOpen = true;
      setTimeout(() => (this.modalSuccessOpen = false), 1500);

      this.closeModal();

      updateProjects();
      this.$emit("edit");
      this.$store.dispatch("getArchive");
    },

    setDefaultValues() {
      this.defaultValues = {
        name: this.project.name,
        scope: this.project.scope.id,
        direction: this.project.direction.id,
        url: this.project.url,
        preview: this.project.preview,
        executor: this.project.executor.id,
        client: this.project.client.id,
        type: this.project.type.id,
        program: this.project.program.id,
        format: this.project.format.id,
        tag: this.project.tags,
      };
    },

    save(data) {
      this.loading = true;
      
      this.$store
        .dispatch("editProject", {
          formData: data,
          projectId: this.project.id,
        })
        .then((data) => {
          this.loading = false;
          if (data.errors) {
            this.error();
          } else {
            this.success(data.project.name);
          }
        });
    },

    addToArchive() {
      this.closeModal();

      this.$store.dispatch("removeProject", { id: this.project.id }).then(() => {
        this.$store.dispatch("getProjects");
        this.$store.dispatch("getArchive");
      });
    },
  },

  watch: {
    project(newVal) {
      if (Object.keys(newVal).length !== 0) {
        this.setDefaultValues();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.success-project-name {
  display: inline-block;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
.modal {
  &__title_icon {
    width: 100%;
    height: 100%;
    min-width: em(10);
    max-width: em(10);
    margin-right: em(8);
  }
}

.form {
  &__preloader {
    position: relative;
    z-index: -1;
    opacity: 0;
    transition: opacity .15s ease-in-out;
    background: rgba(247, 247, 247, .7);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 1.5625em;
    &.active {
      opacity: 1;
      z-index: 99;
    }
  }
}
</style>
