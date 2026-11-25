<template>
    <template v-for="(item) in items"
        :key="item.id">
        <div class="item"
            @mousedown="dragStart"
            @mouseup="dragEnd($event, item.id)"
            @mousemove="mouseMove($event, item.id)"
            @mouseleave="mouseLeave($event)"
            :class="{
                'draggable': draggableItem?.id === item.id,
            }"
            v-if="isAdminRole || isExecutorRole && user.id === item.executor.id"
            >
            <div class="item__img">
                <img :src="item.preview" alt="">
            </div>
            <div class="item__title">
                <span>
                    {{ item.name }}
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
            <div class="item__buttons">
                <div class="item__button item__button_edit"
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
                <div class="item__button item__button_restore"
                    @click="$emit('restore', item.id)"
                    >
                    <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.00866 2.23C2.78168 2.44238 2.78168 2.78926 3.01622 3.00165C3.2432 3.21403 3.61394 3.21403 3.84092 3.00165L5.04391 1.86895L5.04379 4.25481C5.04377 4.55587 5.30461 4.79994 5.62637 4.79994C5.94811 4.79994 6.20894 4.5559 6.20895 4.25486L6.20908 1.86895L7.41207 3.00165C7.63905 3.21403 8.00979 3.21403 8.23677 3.00165C8.35026 2.89545 8.41078 2.75387 8.41078 2.61228C8.41078 2.47777 8.35026 2.33619 8.23677 2.23L6.03506 0.162824C5.92913 0.0566339 5.77781 0 5.62649 0C5.46761 0 5.32385 0.0566339 5.21036 0.162824L3.00866 2.23ZM1.75 5.70008C1.19772 5.70008 0.75 6.14779 0.75 6.70008V9.90003C0.75 10.457 0.970121 10.9911 1.36194 11.3849C1.75375 11.7788 2.28517 12 2.83929 12H8.41071C8.96483 12 9.49625 11.7788 9.88806 11.3849C10.2799 10.9911 10.5 10.457 10.5 9.90003V6.70008C10.5 6.14779 10.0523 5.70008 9.5 5.70008H1.75ZM4.33413 7.20257C4.39944 7.13693 4.48801 7.10006 4.58036 7.10006H6.66964C6.762 7.10006 6.85056 7.13693 6.91587 7.20257C6.98117 7.26821 7.01786 7.35723 7.01786 7.45006C7.01786 7.54288 6.98117 7.6319 6.91587 7.69754C6.85056 7.76318 6.762 7.80005 6.66964 7.80005H4.58036C4.48801 7.80005 4.39944 7.76318 4.33413 7.69754C4.26883 7.6319 4.23214 7.54288 4.23214 7.45006C4.23214 7.35723 4.26883 7.26821 4.33413 7.20257Z" fill="#7E7E7E"/>
                    </svg>
                    <span>
                        Из архива
                    </span>
                </div>
                <div class="item__button item__button_remove"
                    @click="$emit('remove', item.id)"
                    >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1223 1.94633C11.3557 1.94633 11.55 2.13953 11.55 2.38612V2.61411C11.55 2.8547 11.3557 3.05389 11.1223 3.05389H1.17831C0.944316 3.05389 0.75 2.8547 0.75 2.61411V2.38612C0.75 2.13953 0.944316 1.94633 1.17831 1.94633H2.92774C3.28311 1.94633 3.59238 1.69314 3.67233 1.33675L3.76394 0.927568C3.90632 0.370187 4.3749 0 4.91175 0H7.38884C7.91985 0 8.39309 0.370187 8.53022 0.898769L8.62826 1.33615C8.70762 1.69314 9.01689 1.94633 9.37284 1.94633H11.1223ZM10.2338 10.2806C10.4164 8.57851 10.7362 4.53405 10.7362 4.49325C10.7478 4.37025 10.7076 4.25326 10.6276 4.15846C10.5419 4.07086 10.4333 4.01807 10.3137 4.01807H1.99137C1.87117 4.01807 1.75679 4.07086 1.67743 4.15846C1.59691 4.25326 1.55723 4.37025 1.56306 4.49325C1.56413 4.50075 1.57561 4.64319 1.59479 4.88133C1.68 5.93935 1.91736 8.88634 2.07073 10.2806C2.17927 11.3072 2.85325 11.9534 3.8295 11.9768C4.58284 11.9942 5.35893 12.0002 6.15254 12.0002C6.90004 12.0002 7.6598 11.9942 8.4359 11.9768C9.44599 11.9588 10.1194 11.3252 10.2338 10.2806Z" fill="var(--bgcolor-5)"/>
                    </svg>
                    <span>
                        Удалить
                    </span>
                </div>
            </div>
        </div>
    </template> 
</template>

<script>
export default {
    props: [
        'items',
        'listElement',
    ],

    emits: [
        'edit',
        'restore',
        'remove',
        'itemInsideList',
        'itemOutsideList',
    ],

    data() {
        return {
            draggable: false,
            draggableItem: null
        }
    },

    computed: {
        user() {
            const user = JSON.parse(localStorage.getItem('user'));

            return user;
        },

        isAdminRole() {
            const ROLE = localStorage.getItem('ROLE');
            return ROLE === 'ROLE_ADMIN'
        },

        isExecutorRole() {
            const ROLE = localStorage.getItem('ROLE');
            return ROLE === 'ROLE_EXECUTOR'
        },
    },

    methods: {
        dragStart() {
            this.draggable = true;
        },

        dragEnd(e, itemIndex) {
            this.draggable = false;
            this.draggableItem = null;

            const elem = !e.target.classList.contains('item') ? e.target.closest('.item') : e.target;
            const rect = elem.getBoundingClientRect();
            const checkPos = this.checkPositions(rect.top, rect.left, rect.left + rect.width, rect.top + rect.height);
           
            elem.style.left = '';
            elem.style.top = '';

            elem.closest('.container').classList.contains('draggable') && elem.closest('.container').classList.remove('draggable');
            
            checkPos ? this.$emit('restore', itemIndex) : this.$emit('itemOutsideList');
        },
        
        updatePositions(e, itemIndex) {
            console.log(itemIndex);
            const elem = !e.target.classList.contains('item') ? e.target.closest('.item') : e.target;
            const rect = elem.getBoundingClientRect();

            const containerScroll = {
                top: elem.closest('.container').scrollTop,
                left: elem.closest('.container').scrollLeft,
            }

            const pos = {
                x: `${e.clientX+containerScroll.left - rect.width/2}px`,
                y: `${e.clientY+containerScroll.top - rect.height/2}px`,
            }

            elem.style.left = pos.x;
            elem.style.top = pos.y;
        },

        mouseMove(e, itemIndex) {
            if (!this.draggable) return;

            if (this.draggableItem && this.draggableItem.id !== itemIndex) {
                this.updatePositions(e, this.draggableItem.id)
                return
            }

            this.draggableItem = this.items.find(i => i.id === itemIndex);

            const elem = !e.target.classList.contains('item') ? e.target.closest('.item') : e.target;
            const rect = elem.getBoundingClientRect();
            const checkPos = this.checkPositions(rect.top, rect.left, rect.left + rect.width, rect.top + rect.height);

            this.updatePositions(e, itemIndex);

            checkPos ? this.$emit('itemInsideList') : this.$emit('itemOutsideList');
            !elem.closest('.container').classList.contains('draggable') && elem.closest('.container').classList.add('draggable');
        },
        mouseLeave(e) {
            this.dragEnd(e)
        },

        checkPositions(top, left, right, bottom) {
            const listPositions = this.listElement.getBoundingClientRect();

            const insideXBorder = right >= listPositions.left && left <= listPositions.left + listPositions.width;
            const insideYBorder = top >= listPositions.top && bottom <= listPositions.top + listPositions.height;

            return insideXBorder && insideYBorder;
        }
    }
}
</script>

<style lang="scss" scoped>
.item {
    display: grid;
    grid-template-columns: 18% 15% 18% 19% 13%;
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
        width: 36em;

        &:hover {
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
    
    &__button_remove {
        & span {
            color: #EE5D50
        }

        &:hover {
            & svg path {
                fill: #EE5D50;
            }
        }
    }

    &__button_restore {
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