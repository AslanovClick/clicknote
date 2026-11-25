<template>
  <div>
    <div
      class="modal"
      :class="{
        open: modalOpen !== false,
      }"
    >
      <div class="modal__wrapper">
        <div class="modal__close" @click="closeModalOpen = true">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.77057 9.27311L5.04368 6.54622L2.34044 9.24946C1.90519 9.68471 1.19642 9.68163 0.75736 9.24257C0.318301 8.80351 0.315215 8.09474 0.750466 7.65949L3.45371 4.95625L0.726821 2.22936C0.35932 1.77777 0.390221 1.12443 0.798385 0.716263C1.20655 0.308099 1.85989 0.277198 2.31148 0.644699L5.02982 3.36304L7.72459 0.66827C8.17299 0.304688 8.82663 0.34128 9.23837 0.753015C9.6501 1.16475 9.68669 1.81839 9.32311 2.26679L6.62834 4.96156L9.35523 7.68845C9.72273 8.14004 9.69183 8.79338 9.28367 9.20154C8.8755 9.60971 8.22216 9.64061 7.77057 9.27311Z"
              fill="white"
            />
          </svg>
        </div>

        <div class="modal__title">
          <slot name="title"> </slot>
        </div>

        <div class="modal__content">
          <slot name="content"> </slot>
        </div>
      </div>
    </div>

    <modal-close
      :open="closeModalOpen"
      @back="closeModalOpen = false"
      @close="close"
    />

    <modal-error
      :open="errorModalOpen"
      @back="errorModalOpen = false"
      @close="close"
    />
  </div>
</template>

<script>
import ModalClose from "../ModalClose.vue";
import ModalError from "../ModalError.vue";

export default {
  components: {
    ModalClose,
    ModalError,
  },

  props: ["open"],

  data() {
    return {
      modalOpen: this.open,

      closeModalOpen: false,
    };
  },

  methods: {
    close() {
      this.closeModalOpen = false;
      this.errorModalOpen = false;

      this.$emit("modalClose");
    },
  },

  watch: {
    open(newVal) {
      this.modalOpen = newVal;
      if (newVal == true) {
        !document.body.classList.contains("overflowHidden") &&
          document.body.classList.add("overflowHidden");
      } else {
        document.body.classList.contains("overflowHidden") &&
          document.body.classList.remove("overflowHidden");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  z-index: 9;
  transition: opacity 0.15s ease-in-out;
  pointer-events: none;
  overflow: auto;
  padding: em(50) 0;
  font-size: 1em;
  
  @media (max-width: 1600px) {
    font-size: 12px;
  }

  &::-webkit-scrollbar {
    width: 0.5em;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--bgcolor-2);
    box-shadow: inset 0 0 em(2) rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5em;
  }

  &.open {
    opacity: 1;
    pointer-events: auto;
    z-index: 999;
  }

  &__wrapper {
    margin: auto;
    // width: em(820);
    width: em(1150);
    height: auto;
    // max-height: em(400);
    background: var(--bgcolor-2);
    box-shadow: em(31) em(45) em(35) rgba(125, 130, 141, 0.03),
      em(14) em(20) em(24) rgba(155, 161, 174, 0.04);
    border-radius: em(25);
    position: relative;
    transition: transform 0.3s ease-in-out;
    transform: scale(0);
    padding: em(30) em(28);

    .open & {
      transform: scale(1);
    }
  }

  &__close {
    width: em(24);
    height: em(24);
    background: #ee5d50;
    border-radius: em(8);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: em(24);
    right: em(24);
    cursor: pointer;
    transition: background 0.15s ease-in-out;

    & svg {
      width: 100%;
      height: 100%;
      min-width: em(10);
      max-width: em(10);
      display: block;
      margin: auto;
    }

    &:hover {
      background: #ff0000;
    }
  }

  &__title {
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color-2);
    font-size: em(24);
    line-height: em(29, 24);
    margin-bottom: em(24, 24);

    & svg {
      width: 100%;
      height: 100%;
      min-width: em(17);
      max-width: em(17);
      background: #000;
    }
  }
}
</style>
