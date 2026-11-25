<template>
    <div class="tabs">
        <div class="tabs__items"
            :class="{'flex-start': tabs.length < 6}">
            <div class="tabs__item"
                v-for="(tab, index) in tabs"
                :key="tab+index"
                :class="{'active': tab.active == true}"
                @click="selectTab(index)"
                >
                <div class="tabs__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" :width="tab.icon.svg.width" :height="tab.icon.svg.height" :viewBox="`0 0 ${tab.icon.svg.width} ${tab.icon.svg.height}`" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" :d="tab.icon.svg.path.d" fill="#AEAEAE"/>
                    </svg>
                </div>
                <div class="tabs__title">
                    {{ tab.title }}
                </div>
            </div>
        </div>
        <div class="tabs__contents">
            <slot name='tabs-content'>
                
            </slot>
        </div>
    </div>
</template>

<script>

export default {
    props: [
        'tabs', 
        'role'
    ],

    computed: {
        selected() {
            return this.tabs.find(c => c.active = true);
        }
    },

    methods: {
        selectTab(tabIndex) {
            this.$emit('selected', tabIndex)
        }
    }
}
</script>

<style scoped lang="scss">
.tabs {
    height: 100%;
    display: flex;
    flex-direction: column;
    
    &__items {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: em(12);
        width: 100%;
        background: var(--bgcolor-2);
        border-radius: em(25);
        margin-bottom: em(36);
        transition: background .2s ease-in-out, border .2s ease-in-out;

        &.flex-start {
            justify-content: flex-start;
        }
    }

    &__title {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 500;
        // font-size: em(16);
        font-size: max(13px, .9em);
        line-height: em(20, 16);
        color: #AEAEAE;
        margin-left: em(12);
        transition: color .2s ease-in-out;
    }

    &__item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: em(12) em(16);
        width: em(250);
        border-radius: em(20);
        margin-right: em(12);
        cursor: pointer;
        border: em(1) solid transparent;
        transition: background .2s ease-in-out, border .2s ease-in-out;

        & svg path {
            transition: fill .2s ease-in-out;
        }

        &:hover {
            border: em(1) solid var(--bgcolor-3);
            & .tabs__title {
                color: #FF381D;
            }
            & svg path {
                fill: #FF381D;
            }
        }

        &.active {
            background: var(--bgcolor-1);

            & svg path {
                fill: #FF381D;
            }

            & .tabs {
                &__title {
                    color: #FF381D;
                }
            }
        }
    }

    &__icon {
        & svg {
            min-width: em(24);
            max-width: em(24);
            width: 100%;
            height: 100%;
        }
    }

    &__contents {
        height: 100%;
    }

    @media (max-width: 500px) {
        &__items {
            overflow: auto;
            margin-bottom: 0.95em;
            padding: 0.5em;
            border-radius: em(15);

            &::-webkit-scrollbar {
                height: 0;
                background:transparent;
            }
        }

        &__item {
            width: 100%;
            padding: em(10) em(16);

            font-size: max(12px, 0.75em);
        }

        &__title {
            font-size: max(12px, em(12));
            width: max-content;
        }
    }
}
</style>