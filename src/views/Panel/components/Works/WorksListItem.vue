<template>
        <div class="item"
        @mousedown="dragStart"
        @mouseup="dragEnd($event, item.id)"
        @mousemove="mouseMove($event, item.id)"
        @mouseleave="mouseLeave($event)"
        :class="{
            'draggable': draggableElem === item.id,
        }"
        v-if="isAdminRole || isExecutorRole && user.id === item.executor.id"
        >
        <div class="item__img">
            <img :src="item.preview" alt="">
        </div>
        <div class="item__title">
            <span 
                @click="$router.push(`/project/${item.id}`)"
                >
                {{ item.name }}
            </span>
        </div>
        <div class="item__author">
            <span>
                {{ item.executor.firstName }}
                {{ item.executor.lastName }}
            </span>
        </div>
        <div class="item__type">
            <span 
                @click="$router.push(`/project/${item.direction.id}`)"
                >
                {{item.direction.name}}
            </span>
        </div>
        <div class="item__tags">
            <div class="item__tag">
                <span>
                    {{item.client.name}}
                </span>
            </div>
        </div>
        
        <div class="item__public">
            <switcher v-if="isAdminRole" :value="itemPublic" 
                @switcherChange="value => changePublic(item.id, itemPublic)" 
                :checkedIcon="'/img/eye-closed.svg'" 
                :uncheckedIcon="'/img/eye-showed.svg'"
                />
        </div>
        <div class="item__buttons">
            <div class="item__button  item__button_edit"
                @click="$emit('edit', item)"
                v-if="isAdminRole || isExecutorRole && user.id === item.executor.id"
                >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.3265 10.6355C11.6979 10.6355 12 10.9415 12 11.3178C12 11.6947 11.6979 12 11.3265 12H7.51979C7.14839 12 6.84631 11.6947 6.84631 11.3178C6.84631 10.9415 7.14839 10.6355 7.51979 10.6355H11.3265ZM8.68657 0.466042L9.66991 1.24719C10.0732 1.56251 10.342 1.97817 10.4339 2.41533C10.5401 2.8962 10.4269 3.36847 10.1085 3.77696L4.25093 11.3519C3.98211 11.6959 3.58594 11.8894 3.16148 11.8966L0.82693 11.9253C0.699591 11.9253 0.593475 11.8393 0.565178 11.7174L0.034599 9.41698C-0.057368 8.99416 0.034599 8.55701 0.303426 8.22018L4.45609 2.84532C4.52683 2.75932 4.65417 2.7457 4.73906 2.80948L6.48644 4.19978C6.59963 4.29295 6.75526 4.34311 6.91797 4.32161C7.26462 4.27861 7.49807 3.96329 7.4627 3.62646C7.44148 3.45447 7.35659 3.31114 7.2434 3.20364C7.20802 3.17497 5.54554 1.84201 5.54554 1.84201C5.43943 1.75601 5.41821 1.59835 5.5031 1.49157L6.16102 0.638038C6.76941 -0.143109 7.83057 -0.214774 8.68657 0.466042Z" fill="var(--bgcolor-5)"/>
                </svg>
                <span>
                    Править
                </span>
            </div>
            <div class="item__button item__button_archive"
                @click="$emit('add', item.id)"
                >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 1.6875C0 1.17 0.42 0.75 0.9375 0.75H11.0625C11.58 0.75 12 1.17 12 1.6875V2.8125C12 3.33 11.58 3.75 11.0625 3.75H0.9375C0.42 3.75 0 3.33 0 2.8125V1.6875ZM0.75 4.5H11.25V9C11.25 9.59674 11.0129 10.169 10.591 10.591C10.169 11.0129 9.59674 11.25 9 11.25H3C2.40326 11.25 1.83097 11.0129 1.40901 10.591C0.987053 10.169 0.75 9.59674 0.75 9V4.5ZM4.875 6C4.77554 6 4.68016 6.03951 4.60983 6.10983C4.53951 6.18016 4.5 6.27554 4.5 6.375C4.5 6.47446 4.53951 6.56984 4.60983 6.64017C4.68016 6.71049 4.77554 6.75 4.875 6.75H7.125C7.22446 6.75 7.31984 6.71049 7.39017 6.64017C7.46049 6.56984 7.5 6.47446 7.5 6.375C7.5 6.27554 7.46049 6.18016 7.39017 6.10983C7.31984 6.03951 7.22446 6 7.125 6H4.875Z" fill="var(--bgcolor-5)"/>
                </svg>
                <span>
                    В архив
                </span>
            </div>
        </div>
    </div>
    
</template>

<script>

import Switcher from '@/components/UI/Switcher.vue';
// import { updateProjects } from '@/Hooks/updateProjects';

export default {
    props: [
        "item",
        "itemId",
        "archiveElement",
        "draggableElem"
    ],

    emits: [
        "edit",
        "add",
        "itemInsideArchive",
        "itemOutsideArchive",
        "draggableStart",
        "draggableEnd",
    ],

    components: { 
        Switcher 
    },

    data() {
        return {
            draggable: false,
            
            itemPublic: false,
        };
    },

    computed: {
        user() {
            const user = JSON.parse(localStorage.getItem("user"));
            return user;
        },
        isAdminRole() {
            const ROLE = localStorage.getItem("ROLE");
            return ROLE === "ROLE_ADMIN";
        },
        isExecutorRole() {
            const ROLE = localStorage.getItem("ROLE");
            return ROLE === "ROLE_EXECUTOR";
        },
    },

    methods: {
        dragStart() {
            this.draggable = true;
            this.$emit('draggableStart', this.item.id)

            console.log(this.draggable)
        },
        dragEnd(e, itemIndex) {
            this.$emit('draggableEnd', null)
            this.draggable = false;
            // this.draggableItem = null;
            const elem = !e.target.classList.contains('item') ? e.target.closest('.item') : e.target;
            const rect = elem.getBoundingClientRect();
            const checkPos = this.checkPositions(rect.top, rect.left, rect.left + rect.width, rect.top + rect.height);
            
            elem.style.left = "";
            elem.style.top = "";
            elem.closest(".container").classList.contains("draggable") && elem.closest(".container").classList.remove("draggable");
            checkPos ? this.$emit("add", itemIndex) : this.$emit("itemOutsideArchive");
        },
        updatePositions(e) {
            const elem = !e.target.classList.contains('item') ? e.target.closest('.item') : e.target;
            const rect = elem.getBoundingClientRect();

            if (this.draggable == true) {
                console.log('leave', elem);
            }

            const containerScroll = {
                top: elem.closest(".container").scrollTop,
                left: elem.closest(".container").scrollLeft,
            };
            
            const pos = {
                x: `${e.clientX + containerScroll.left - rect.width / 2}px`,
                y: `${e.clientY + containerScroll.top - rect.height / 2}px`,
            };

            elem.style.left = pos.x;
            elem.style.top = pos.y;
        },
        mouseMove(e, itemIndex) {
            if (!this.draggable) return;

            if (this.draggableElem && this.draggableElem !== itemIndex) {
                this.updatePositions(e);
                return;
            }

            const elem = !e.target.classList.contains('item') ? e.target.closest('.item') : e.target;
            const rect = elem.getBoundingClientRect();
            const checkPos = this.checkPositions(rect.top, rect.left, rect.left + rect.width, rect.top + rect.height);
            this.updatePositions(e);
            checkPos ? this.$emit("itemInsideArchive") : this.$emit("itemOutsideArchive");
            !elem.closest(".container").classList.contains("draggable") && elem.closest(".container").classList.add("draggable");
        },
        mouseLeave(e) {
            this.dragEnd(e)
            // if (this.draggable === true) {
            //     console.log('поймал');
            //     this.updatePositions(e)
            // }
            // if (!this.draggable) return;

            // if (this.draggableElem && this.draggableElem !== itemIndex) {
            //     this.updatePositions(e);
            //     return;
            // }
        },
        checkPositions(top, left, right, bottom) {
            const archivePositions = this.archiveElement.getBoundingClientRect();
            const insideXBorder = right >= archivePositions.left && left <= archivePositions.left + archivePositions.width;
            const insideYBorder = top >= archivePositions.top && bottom <= archivePositions.top + archivePositions.height;
            return insideXBorder && insideYBorder;
        },

        changePublic(id, val) {
            this.$store.dispatch('setPublic', {id: id, publicValue: !val,}).then(() => {
                this.itemPublic = !this.itemPublic;
                // updateProjects();
            })
        }
    },

    mounted() {
        this.itemPublic = this.item.public;
    }
}
</script>

<style lang='scss' scoped>
.item {
    display: grid;
    grid-template-columns: 10% 12% 16% 17% 18% 7% 6%;
    grid-gap: em(24);
    align-items: center;

    padding: em(10) em(25) em(10) em(10);
    background: var(--bgcolor-8);
    border-radius: em(10);
    transition: background .2s ease-in-out, box-shadow .2s ease-in-out;
    position: relative;

    &.draggable {
        position: absolute;
        user-select: none;
        z-index: 999;
        width: 69em;

        &:hover {
            // cursor: pointer;
            cursor: move;
        }
    }

    &:nth-child(2n) {
        background: var(--bgcolor-1);
    }

    &:hover {
        background: var(--bgcolor-2);
        &::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            box-shadow: em(31) em(45) em(35) rgba(167, 167, 167, 0.03), em(14) em(20) em(24) rgba(134, 134, 134, 0.04);
            z-index: 2;
        }
    }

    &__img {
        width: em(106);
        height: em(60);
        overflow: hidden;
        border-radius: .3em;
        position: relative;
        z-index: 3;
        
        & img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__title {
        max-width: 15em;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        z-index: 3;
        & span {
            font-style: normal;
            color: var(--text-color-2);
            font-weight: 600;
            font-size: em(14);
            line-height: em(17, 14);
            transition: color .15s ease-in-out;
        }
        
        &:hover {
            text-decoration: underline;
            cursor: pointer;
            text-decoration-color: #FF381D;

            & span {
                color: #FF381D;
            }
        }
    }

    &__type {
        justify-self: center;
        position: relative;
        z-index: 3;
        text-align: center;
        & span {
            font-style: normal;
            font-weight: 500;
            font-size: em(12);
            line-height: em(15, 12);
            color: var(--bgcolor-5);
        }
    }

    &__author {
        justify-self: center;
        position: relative;
        z-index: 3;
        & span {
            font-style: normal;
            font-weight: 500;
            font-size: em(12);
            line-height: em(15, 12);
            color: var(--bgcolor-5);
        }
    }

    &__tags {
        text-align: center;
        position: relative;
        z-index: 3;
        & span {
            font-style: normal;
            font-weight: 500;
            font-size: em(12);
            line-height: em(15, 12);
            color: var(--bgcolor-5);
        }
    }

    &__public {
        z-index: 3;
        position: relative;
    }

    &__buttons {
        display: flex;
        position: relative;
        z-index: 3;
    }

    &__button {
        cursor: pointer;
        margin-left: em(12);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        & svg {
            width: 100%;
            min-width: em(12);
            max-width: em(12);
            & path {
                transition: fill .15s ease-in-out;
            }
        }

        & span {
            opacity: 0;
            font-weight: 500;
            font-size: em(8);
            line-height: em(10, 8);
            color: #05CD99;
            position: absolute;
            // bottom: -1.35em;
            bottom: -2.55em;
            left: 50%;
            transform: translate(-50%, 0);
            transition: opacity .15s ease-in-out;
            white-space: nowrap;
        }

        &:hover {
            & svg path {
                fill: #05CD99;
            }
            & span {
                opacity: 1;
            }
        }
    }

    &__button_archive {
        & span {
            color: #7E7E7E
        }
        
        &:hover {
            & svg path {
                fill: #7E7E7E;
            }
        }
    }
}

</style>