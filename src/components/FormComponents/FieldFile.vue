<template>
  <field :title="title" :errorAlert="error?.alert" :class="{ error: error }">
    <template #content>
      <div class="form__file_content" :class="{ draggable: draggable }">
        <label
          @dragenter="draggable = true"
          @dragleave="draggable = false"
          @drop="draggable = false"
        >
          <input
            id="fileInput"
            class="form__file"
            type="file"
            :name="name"
            :size="maxSize"
            :accept="fileAccept"
            @change="uploadFile($event)"
            :key="fileInputKey"
          />
        </label>
        <div class="form__file_info">
          <div class="form__file_icon">
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.4806 7.56238H7.62416V11.3853C7.62416 12.0009 7.1208 12.4999 6.49988 12.4999C5.87896 12.4999 5.3756 12.0009 5.3756 11.3853V7.56238H1.5192C0.940012 7.50293 0.499878 7.01909 0.499878 6.44186C0.499878 5.86463 0.940012 5.38079 1.5192 5.32134H5.36351V1.51036C5.42349 0.936195 5.91155 0.499878 6.49383 0.499878C7.07611 0.499878 7.56418 0.936195 7.62416 1.51036V5.32134H11.4806C12.0597 5.38079 12.4999 5.86463 12.4999 6.44186C12.4999 7.01909 12.0597 7.50293 11.4806 7.56238Z"
                fill="#05CD99"
              />
            </svg>
          </div>
          <div class="form__file_drag" v-show="changed === false">
            Перетащите файл сюда или нажмите <span class="green"> Обзор </span>
          </div>
          <div class="form__file_loading" v-show="changed === true">
            <p>
              {{ file.name }}
            </p>
          </div>
          <div class="form__file_formats">
            {{ formatsDescription }}
            <br v-if="weightDescription" />
            {{ weightDescription }}
          </div>
        </div>
        <div v-if="havePreview && previewVisible"
          class="form__file_preview"
        >
          <div
            class="form__file_preview_close"
            @click="previewVisible = false"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z"
                fill="#FF0000"
              />
              <path
                d="M9.84705 10.8489L8.02912 9.03098L6.22696 10.8331C5.93679 11.1233 5.46428 11.1212 5.17157 10.8285C4.87887 10.5358 4.87681 10.0633 5.16698 9.77316L6.96914 7.97099L5.15121 6.15307C4.90621 5.85201 4.92681 5.41645 5.19892 5.14434C5.47103 4.87223 5.9066 4.85163 6.20765 5.09663L8.01988 6.90886L9.81639 5.11234C10.1153 4.86995 10.5511 4.89435 10.8256 5.16884C11.1001 5.44333 11.1245 5.87909 10.8821 6.17802L9.08556 7.97454L10.9035 9.79246C11.1485 10.0935 11.1279 10.5291 10.8558 10.8012C10.5837 11.0733 10.1481 11.0939 9.84705 10.8489Z"
                fill="white"
              />
            </svg>
          </div>
          <img :src="value" alt="" />
        </div>

        <slot name="moreUploadFields"> </slot>
      </div>
    </template>
  </field>
</template>

<script>
import Field from "./Field";

export default {
  components: { Field },

  props: [
    "value",
    "title",
    "name",
    "defaultValue",
    "error",
    "maxSize",
    "fileAccept",
    "formatsDescription",
    "weightDescription",
    "resetInput",
  ],

  emits: ["onFileLoad"],

  data() {
    return {
      draggable: false,
      file: {},
      fileInputKey: 0,

      previewVisible: true,
    };
  },

  computed: {
    changed() {
      return this.file?.name !== null && this.file?.name !== undefined;
    },

    havePreview() {
      return typeof this.value === "string" && this.value.includes('http');
    }
  },

  methods: {
    uploadFile(e) {
      this.file = e.target.files[0];

      this.$emit("onFileLoad", this.file);
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
  }
};
</script>

<style scoped lang="scss">
.form {
  &__file {
    height: 100%;
    width: 100%;
    cursor: pointer;

    &_content {
      width: 100%;
      padding: em(36) 0 em(30);
      height: em(368);
      background: var(--bgcolor-1);
      border: em(2.5) dashed var(--bgcolor-3);
      border-radius: em(15);
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: relative;
      transition: border 0.15s ease-in-out, background 0.15s ease-in-out;

      &.draggable {
        border-color: var(--text-color-2);
      }

      .error & {
        border-color: #ff1923;
        border-style: solid;
      }

      & label {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        opacity: 0;
      }

      &:hover {
        border-color: var(--bgcolor-5);
        & .form__file_preview_close {
          opacity: 1;
        }
      }
    }

    &_info {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      margin-top: em(75);
      margin-bottom: auto;
      height: 6em;
    }

    &_icon {
      width: em(24);
      height: em(24);
      background: var(--bgcolor-2);
      border-radius: em(6);
      margin-bottom: em(8);

      & svg {
        width: 100%;
        height: 100%;
        min-width: em(12);
        max-width: em(12);
      }
    }

    &_drag,
    &_loading {
      font-weight: 600;
      font-size: em(16);
      line-height: em(20, 16);
      color: var(--text-color-4);
      margin-bottom: em(8);
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;

      & .green {
        color: #07dfa7;
        line-height: 100%;
        border-bottom: em(1) solid #07dfa7;
        display: inline-block;
      }
    }

    &_formats {
      font-weight: 500;
      font-size: em(14);
      line-height: em(17, 14);
      color: var(--bgcolor-5);
    }

  }
  
  &__file_preview {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 7;

    & img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      border-radius: 0.9375em;
    }

    &_close {
      position: absolute;
      top: em(-5);
      right: em(-5);
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.15s ease-in-out;

      & svg {
        width: 100%;
        min-width: em(16);
        max-width: em(16);
      }
    }
  }
}
</style>
