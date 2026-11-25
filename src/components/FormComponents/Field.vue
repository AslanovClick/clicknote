<template>
  <div class="form__field">
    <div class="form__field_title">
      <span>
        {{title}}
      </span>
    </div>
    <div class="form__field_content">
      <slot name="content">

      </slot>
    </div>
    <div class="form__field_error">
      <span>
        {{errorAlert}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'title',
    "error",
    'errorAlert'
  ]
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  align-items: flex-start;
  justify-content: flex-start;

  &__field {
    width: calc(50% - 0.625em);
    position: relative;
    margin-bottom: em(24);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-right: em(10);
    font-style: normal;
    font-weight: 500;
    color: var(--text-color-4);

    &:nth-child(2n) {
        margin-right: 0;
        margin-left: em(10);
    }

    &_title {
      display: block;
      color: var(--text-color-4);
      font-size: em(14);
      line-height: 100%;
      margin-bottom: em(6, 14);
  
      .error & {
        & span {
            color: #FF1923;
        }
      }
    }

    &_content {
      width: 100%;
      position: relative;
    }

    
    &_error {
      opacity: 0;
      pointer-events: none;
      margin-top: em(4);
      height: em(15);
      opacity: 1;

      & span {
        font-weight: 400;
        color: #ff1923;
        font-size: em(12);
        line-height: 120%;
        display: block;
        width: 100%;
      }

      .error & {
        opacity: 1;
      }
    }
  }
}
</style>