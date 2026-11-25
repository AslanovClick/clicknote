<template>
  <transition name="api-error">
    <div v-if="visible" class="api-error" role="alert" @click="visible = false">
      Не удалось выполнить запрос к серверу. Проверьте соединение и попробуйте ещё раз.
    </div>
  </transition>
</template>

<script>
// Shows a short notice whenever a store action fails (network error or an error
// response), so a failed request no longer looks like an endless loading state.
export default {
  name: "ApiErrorToast",

  data() {
    return {
      visible: false,
      timer: null,
      unsubscribe: null,
    };
  },

  methods: {
    show() {
      this.visible = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => (this.visible = false), 5000);
    },
  },

  mounted() {
    this.unsubscribe = this.$store.subscribeAction({
      error: (action, state, error) => {
        console.error(`Action "${action.type}" failed`, error);
        this.show();
      },
    });
  },

  unmounted() {
    clearTimeout(this.timer);
    if (this.unsubscribe) this.unsubscribe();
  },
};
</script>

<style scoped>
.api-error {
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  z-index: 10000;
  max-width: calc(100% - 32px);
  padding: 12px 20px;
  border-radius: 12px;
  background: #ff381d;
  color: #fff;
  font-size: 14px;
  line-height: 1.4;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.api-error-enter-active,
.api-error-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.api-error-enter-from,
.api-error-leave-to {
  opacity: 0;
  transform: translate(-50%, 8px);
}
</style>
