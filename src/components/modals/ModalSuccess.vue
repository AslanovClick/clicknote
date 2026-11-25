<template>
    <div class="modal"
        :class="{'open': modalOpen}"
        >
        <div class="success"
            :class="{'open': open}"
            >
            <svg class="success__icon" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M24 3.99805C35.06 3.99805 44 12.96 44 23.998C44 35.04 35.06 43.998 24 43.998C12.96 43.998 4 35.04 4 23.998C4 12.96 12.96 3.99805 24 3.99805ZM20.7432 30.2568C21.0516 30.5653 21.4557 30.7186 21.8598 30.7186C22.2638 30.7186 22.6679 30.5653 22.9763 30.2568L31.5373 21.6958C32.1542 21.0789 32.1542 20.0796 31.5373 19.4627C30.9204 18.8458 29.9229 18.8458 29.306 19.4627L21.8598 26.9089L18.694 23.7432C18.0771 23.1263 17.0796 23.1281 16.4627 23.745C15.8458 24.3601 15.8458 25.3594 16.4627 25.9763L20.7432 30.2568Z" fill="white"/>
            </svg>
            <div class="success__title">
                <slot name="title">

                </slot>
            </div>
        </div>
    </div>
</template>

<script>

export default {

    props: [
        'open'
    ],

    data() {
        return {
            modalOpen: false,
        }
    },
    watch: {
        open(newVal) {
            if (newVal == true) {
                this.modalOpen = true;
                !document.body.classList.contains('overflowHidden') && document.body.classList.add('overflowHidden');
            } else {
                this.modalOpen = false;
                document.body.classList.contains('overflowHidden') && document.body.classList.remove('overflowHidden')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
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

    &.open {
        opacity: 1;
        pointer-events: auto;
        z-index: 999;
    }
}

.success {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: em(16) em(36);
    background: #05CD99;
    box-shadow: em(31) em(45) em(35) rgba(5, 205, 153, 0.08), em(14) em(20) em(24) rgba(5, 205, 153, 0.07);
    border-radius: em(25);
    max-width: em(490);

    transition: transform .3s ease-in-out;
    transform: scale(0);

    .open & {
        transform: scale(1);
    }

    &__icon {
        margin-right: em(24);
        width: 100%;
        min-width: em(48);
        max-width: em(48);
    }

    &__title {
        font-weight: 600;
        font-size: em(21);
        line-height: 130%;
        color: var(--bgcolor-2);
    }
}
</style>