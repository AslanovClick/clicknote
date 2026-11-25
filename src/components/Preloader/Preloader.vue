<template>
  <div class="loader-wrapper">
    <div class="loader"></div>
    
    <div class="loader-section section-left"></div>
    <div class="loader-section section-right"></div>
  </div>
</template>

<script>
export default {
  name: 'Preloader'
}
</script>

<style scoped lang="scss">

.loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  opacity: 1;
  // background: var(--bgcolor-1);

  .loaded & {
    opacity: 0;
    z-index: -9;
    -webkit-transition: all 0.5s 1s ease-out;
    transition: all 0.5s 1s ease-out;
  }

  & .loader {
    display: block;
    margin: auto;
    position: relative;
    // left: 50%;
    top: calc(50% - 3.725em);
    width: em(100);
    height: em(100);
    border: 3px solid transparent;
    border-top-color: #F44336;
    border-radius: 50%;
    z-index: 1001;
    -webkit-animation: spin 1s infinite linear;
            animation: spin 1s infinite linear;

    &:before, &:after {
      content: '';
      position: absolute;
      border-radius: 50%;
    }

    &:before {
      top: em(5);
      left: em(5);
      right: em(5);
      bottom: em(5);
      border: em(3) solid transparent;
      border-top-color:#F44336;
      -webkit-animation: spin 2s infinite linear;
              animation: spin 2s infinite linear;
    }

    &:after {
      top: em(15);
      left: em(15);
      right: em(15);
      bottom: em(15);
      border: em(3) solid transparent;
      border-top-color: #F44336;
      -webkit-animation: spin 1s infinite linear;
              animation: spin 1s infinite linear;
    }

    .loaded & {
      -webkit-transition: all 0.6s .4s ease-in-out;
      transition: all 0.6s .4s ease-in-out;
      opacity: 0;
    }
  }
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
</style>