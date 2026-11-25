<template>
    <temp-small-modal
        :open="open"
        >
        <template #content>
            <svg class="modal__icon" width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.0002 0.998535C31.0602 0.998535 40.0002 9.96054 40.0002 20.9985C40.0002 32.0405 31.0602 40.9985 20.0002 40.9985C8.96021 40.9985 0.000213623 32.0405 0.000213623 20.9985C0.000213623 9.96054 8.96021 0.998535 20.0002 0.998535ZM20.0002 26.8605C19.0402 26.8605 18.2602 27.6405 18.2602 28.6005C18.2602 29.5605 19.0402 30.3605 20.0202 30.3605C20.9802 30.3605 21.7602 29.5605 21.7602 28.6005C21.7602 27.6405 20.9802 26.8605 20.0002 26.8605ZM20.0002 11.6585C19.0402 11.6585 18.2402 12.4605 18.2402 13.4185V22.2585C18.2402 23.2205 19.0402 23.9985 20.0002 23.9985C20.9602 23.9985 21.7402 23.2205 21.7402 22.2585V13.4185C21.7402 12.4605 20.9602 11.6585 20.0002 11.6585Z" fill="#EE5D50"/>
            </svg>

            <div class="modal__title">
                <span>
                    Вы точно хотите закрыть это окно? 
                    <br>
                    Внесенные изменения не сохранятся.
                </span>
            </div>

            <div class="modal__buttons">
                <div class="modal__button modal__button_silver"
                    @click="$emit('back')"
                    >
                    <span>
                        Отмена
                    </span>
                </div>
                <div class="modal__button modal__button_red"
                    @click="$emit('close')"
                    >
                    <span>
                        Закрыть
                    </span>
                </div>
            </div>
            
        </template>
    </temp-small-modal>
</template>

<script>
import TempSmallModal from './components/TempSmallModal'

export default {

    props: [
        'open'
    ],

    emits: [
        'back',
        'close',
    ],

    components: {
        TempSmallModal
    },
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

    &__icon {
        width: 100%;
        height: auto;
        min-width: em(40);
        max-width: em(40);
        margin: auto;
        margin-bottom: em(23);
        display: block;
    }

    &__title {
        font-weight: 500;
        color: var(--text-color-2);
        margin-bottom: em(28);
        text-align: center;

        & span {
            font-size: .9em;
            line-height: 100%;
        }
    }

    &__buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    &__button {
        padding: em(14) em(20);
        border-radius: em(15);
        width: 48%;
        text-align: center;
        cursor: pointer;

        & span {
            font-weight: 500;
            font-size: .9em;
            line-height: 100%;
        }

        &_silver {
            background: #ECECEC;
            transition: background .15s ease-in-out;
            
            & span {
                color: #919191;
            }

            &:hover {
                background: #FF1923;

                & span {
                    color: var(--bgcolor-2);
                }

                & svg path:first-child {
                    fill: #fff;
                }

                & svg path:nth-child(2) {
                    fill: #FF1923;
                }
            }
        }

        &_red {
            background: #EE5D50;
            transition: background .15s ease-in-out;

            & span {
                color: #fff;
            }

            &:hover {
                background: #FF1923;
            }
        }
    }
}
</style>