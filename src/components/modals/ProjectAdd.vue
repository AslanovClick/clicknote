<template>
  <div>
    <template-modal :open="open" @modalClose="closeModal">
      <template #title>
        <svg
          class="modal__title_icon"
          width="18"
          height="21"
          viewBox="0 0 18 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.2525 0.5C10.5099 0.5 10.7079 0.71 10.7079 0.96V4.18C10.7079 6.01 12.203 7.51 14.0149 7.52C14.7673 7.52 15.3614 7.53 15.8168 7.53C16.1238 7.53 16.6287 7.52 17.0545 7.52C17.302 7.52 17.5 7.72 17.5 7.97V16.01C17.5 18.49 15.5099 20.5 13.0446 20.5H5.17327C2.59901 20.5 0.5 18.39 0.5 15.79V5.01C0.5 2.53 2.5 0.5 4.96535 0.5H10.2525ZM8.81683 8.27C8.41089 8.27 8.07426 8.6 8.07426 9.01V10.74H6.37129C5.96535 10.74 5.62871 11.07 5.62871 11.49C5.62871 11.9 5.96535 12.23 6.37129 12.23H8.07426V13.96C8.07426 14.37 8.41089 14.7 8.81683 14.7C9.22277 14.7 9.54951 14.37 9.54951 13.96V12.23H11.2624C11.6683 12.23 12.005 11.9 12.005 11.49C12.005 11.07 11.6683 10.74 11.2624 10.74H9.54951V9.01C9.54951 8.6 9.22277 8.27 8.81683 8.27ZM12.1496 1.4062C12.1496 0.9752 12.6674 0.7612 12.9635 1.0722C14.0338 2.1962 15.9041 4.1612 16.9496 5.2592C17.2387 5.5622 17.0268 6.0652 16.61 6.0662C15.7961 6.0692 14.8367 6.0662 14.1466 6.0592C13.0516 6.0592 12.1496 5.1482 12.1496 4.0422V1.4062Z"
            fill="#7E7E7E"
          />
        </svg>
        Добавить новый проект
      </template>

      <template #content>
        <form-content
          :defaultValues="defaultValues"
          :reset="resetFields"
          @success="success"
          @error="error"
          @save="create"
        />
        <div class="form__preloader" :class="{'active': loading}">
          <preloader />
        </div>
      </template>
    </template-modal>

    <modal-success
      :open="modalSuccessOpen"
      @modalClose="modalSuccessOpen = false"
    >
      <template #title>
        Проект *<span class="success-project-name">{{ projectName }}</span
        >* успешно добавлен
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
import { mapState } from "vuex";
import Preloader from '@/components/Preloader/Preloader.vue';

export default {
  components: {
    TemplateModal,
    ModalSuccess,
    ModalError,
    FormContent,
    Preloader,
  },

  props: ["open"],

  data() {
    return {
      modalErrorOpen: false,
      modalSuccessOpen: false,
      projectName: '',

      defaultValues: {},
      resetFields: false,
      loading: false,
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },

  methods: {
    closeModal() {
      this.$emit("modalClose");
      this.reset()
    },

    reset() {
      this.resetFields = true;

      setTimeout(() => this.resetFields = false, 1500)
    },

    close() {
      this.modalErrorOpen = false;

      this.closeModal();
      this.reset()
    },

    error() {
      this.modalErrorOpen = true;
    },

    success(name) {
      this.projectName = name;
      this.modalSuccessOpen = true;
      setTimeout(() => this.modalSuccessOpen = false, 1500);

      this.closeModal();

      updateProjects({ force: true });
    },

    setDefaultValues() {
      this.defaultValues = {
        executor: this.user.id,
      };
    },

    create(data) {
      this.loading = true;

      this.$store
        .dispatch("createProject", { formData: data })
        .then((data) => {
          this.loading = false;
          if (data.errors || !data.project) {
            this.error();
          } else {
            this.success(data.project.name);
            this.reset();
          }
        })
        .catch(() => {
          this.loading = false;
          this.error();
        });
    },
  },
  mounted() {
    this.setDefaultValues();
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
