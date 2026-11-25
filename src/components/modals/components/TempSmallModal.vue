<template>
  <div class="modal"
    :class="{
        'open': open
    }"
    >
    <div class="modal__wrapper">
        <div class="modal__content">
            <slot name="content">

            </slot>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: [ 'open' ],

    data() {
        return {
            modalOpen: this.open,
        }
    },

    watch: {
        open(newVal) {
            if (newVal == true) {
                this.modalOpen = true;

                !document.body.classList.contains('overflowHidden') && document.body.classList.add('overflowHidden')
            } else {
                document.body.classList.contains('overflowHidden') && document.body.classList.remove('overflowHidden')
            }
        }
    }
}
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
    transition: opacity .15s ease-in-out;
    pointer-events: none;
    overflow: auto;
    padding: em(50) 0;

    &::-webkit-scrollbar {
        width: .5em;
    }
    
    &::-webkit-scrollbar-track {
        background-color: #fff;
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
        width: em(530);
        height: auto;
        // max-height: em(400);
        background: var(--bgcolor-2);
        box-shadow: em(31) em(45) em(35) rgba(125, 130, 141, 0.03), em(14) em(20) em(24) rgba(155, 161, 174, 0.04);
        border-radius: em(25);
        position: relative;
        transition: transform .3s ease-in-out;
        transform: scale(0);
        padding: em(30) em(28);

        .open & {
            transform: scale(1);
        }
    }

    &__title {
        font-weight: 700;
        display: flex;
        align-items: center;
        color: var(--text-color-2);
        font-size: em(24);
        line-height: em(29, 24);
        margin-bottom: em(24, 24);
        text-align: center;

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