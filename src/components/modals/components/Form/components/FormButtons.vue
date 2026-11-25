<template>
  <div class="form__buttons" :class="{three_buttons: haveArchiveButton}">
    <form-button title="Отмена" color="red">
      <template #icon>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-0.000732422 10C-0.000732422 4.47715 4.47718 0 10 0C15.5229 0 20.0008 4.47715 20.0008 10C20.0008 15.5228 15.5229 20 10 20C4.47718 20 -0.000732422 15.5228 -0.000732422 10Z"
            fill="#EE5D50"
          />
          <path
            d="M13.6864 12.1741L11.5122 10.0011L13.6852 7.82806C14.1032 7.4113 14.1032 6.733 13.6852 6.31624C13.2672 5.89581 12.5913 5.89703 12.1734 6.31501L9.99911 8.48803L7.82488 6.31257C7.4069 5.89459 6.72982 5.89703 6.31184 6.31257C5.89508 6.73055 5.89508 7.40885 6.31184 7.82561L8.48729 10.0011L6.31673 12.1704C5.89874 12.5884 5.89874 13.2667 6.31673 13.6822C6.52572 13.8925 6.79826 13.9963 7.07202 13.9963C7.34701 13.9963 7.61956 13.8924 7.82855 13.6835L9.99911 11.5129L12.1746 13.6871C12.3836 13.8961 12.6561 14 12.9299 14C13.2036 14 13.4774 13.8949 13.6864 13.6871C14.1044 13.2691 14.1044 12.5921 13.6864 12.1741Z"
            fill="var(--bgcolor-1)"
          />
        </svg>
      </template>
    </form-button>
    <form-button title="Архивировать" color="silver" v-if="haveArchiveButton" @click="$emit('archive')">
      <template #icon>
        <svg
          width="19"
          height="16"
          viewBox="0 0 19 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 1.53125C0.5 0.755 1.13 0.125 1.90625 0.125H17.0938C17.87 0.125 18.5 0.755 18.5 1.53125V3.21875C18.5 3.995 17.87 4.625 17.0938 4.625H1.90625C1.13 4.625 0.5 3.995 0.5 3.21875V1.53125ZM1.625 5.75H17.375V12.5C17.375 13.3951 17.0194 14.2536 16.3865 14.8865C15.7536 15.5194 14.8951 15.875 14 15.875H5C4.10489 15.875 3.24645 15.5194 2.61351 14.8865C1.98058 14.2536 1.625 13.3951 1.625 12.5V5.75ZM7.8125 8C7.66332 8 7.52024 8.05926 7.41475 8.16475C7.30926 8.27024 7.25 8.41332 7.25 8.5625C7.25 8.71168 7.30926 8.85476 7.41475 8.96025C7.52024 9.06574 7.66332 9.125 7.8125 9.125H11.1875C11.3367 9.125 11.4798 9.06574 11.5852 8.96025C11.6907 8.85476 11.75 8.71168 11.75 8.5625C11.75 8.41332 11.6907 8.27024 11.5852 8.16475C11.4798 8.05926 11.3367 8 11.1875 8H7.8125Z"
            fill="#AEAEAE"
          />
        </svg>
      </template>
    </form-button>

    <form-button
      v-if="haveNextStep"
      title="Продолжить"
      color="green"
      @click="$emit('nextStep')"
      :disabled="disabledNext"
    >
      <template #icon>
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="0.5" width="20" height="20" rx="10" fill="white" />
          <path
            d="M9.75258 5.8415C9.38889 5.42586 8.75713 5.38374 8.3415 5.74742C7.92586 6.11111 7.88374 6.74287 8.24742 7.1585L9.75258 5.8415ZM8.24742 13.8415C7.88374 14.2571 7.92586 14.8889 8.3415 15.2526C8.75713 15.6163 9.38889 15.5741 9.75258 15.1585L8.24742 13.8415ZM12.5 10.5L13.2526 11.1585C13.5825 10.7815 13.5825 10.2185 13.2526 9.8415L12.5 10.5ZM8.24742 7.1585L11.7474 11.1585L13.2526 9.8415L9.75258 5.8415L8.24742 7.1585ZM11.7474 9.8415L8.24742 13.8415L9.75258 15.1585L13.2526 11.1585L11.7474 9.8415Z"
            fill="#05CD99"
          />
        </svg>
      </template>
    </form-button>
    <form-button
      v-else
      title="Опубликовать"
      color="green"
      @click="$emit('save')"
      :disabled="disabledSave"
    >
      <template #icon>
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" width="20" height="20" rx="10" fill="white" />
          <path
            d="M9.16235 14.3241C8.90981 14.3241 8.65727 14.2283 8.46449 14.0355L5.78918 11.3602C5.40361 10.9746 5.40361 10.3501 5.78918 9.96562C6.17475 9.58005 6.7982 9.57892 7.18377 9.96449L9.16235 11.9431L13.8162 7.28918C14.2018 6.90361 14.8253 6.90361 15.2108 7.28918C15.5964 7.67475 15.5964 8.29932 15.2108 8.68489L9.8602 14.0355C9.66742 14.2283 9.41488 14.3241 9.16235 14.3241Z"
            fill="#05CD99"
          />
        </svg>
      </template>
    </form-button>
  </div>
</template>

<script>
import FormButton from "@/components/FormComponents/FormButton.vue";
export default {
  props: ["haveNextStep", "disabledNext", "disabledSave", "haveArchiveButton"],

  emits: ["nextStep", "save"],

  components: { FormButton },
};
</script>

<style scoped lang="scss">
.form {
  &__buttons {
    display: grid;
    grid-template-columns: 49% 49%;
    grid-column-gap: 1%;
    width: 100%;

    &.three_buttons {
      grid-template-columns: 24% 24% 49%;
    }
  }
}
</style>
