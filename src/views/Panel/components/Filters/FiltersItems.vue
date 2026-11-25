<template>
  <div class="filters__items">
    <div class="filters__table">
        <template
            v-for="(filter, type) in filters"
            :key="type"
            >
            <div class="filters__column" v-if="type !== 'tag'">
                <div class="filters__title">
                    {{filter.title}}
                </div>
                <div class="filters__item"
                    v-for="item in filter.items"
                    :key="item.id"
                    >
                    <div class="filters__item_edit"
                        v-if="filter.edit.active && filter.edit.id === item.id"
                        >
                        <input type="text"
                            v-model="filter.edit.value"
                            :class="{'active': filter.edit.active}"
                            @keydown.enter="editFilter(type, item.id, filter.edit.value)"
                            />
                        <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg"
                            class="filters__item_edit_button"
                            @click="editFilter(type, item.id, filter.edit.value)"
                            >
                            <path d="M3.6643 7.32413C3.41176 7.32413 3.15923 7.2283 2.96644 7.03551L0.29113 4.3602C-0.0944392 3.97463 -0.0944392 3.35006 0.29113 2.96562C0.6767 2.58005 1.30015 2.57892 1.68572 2.96449L3.6643 4.94307L8.31819 0.289177C8.70376 -0.0963923 9.32721 -0.0963923 9.71278 0.289177C10.0983 0.674746 10.0983 1.29932 9.71278 1.68489L4.36216 7.03551C4.16937 7.2283 3.91683 7.32413 3.6643 7.32413Z" fill="#05CD99"/>
                        </svg>
                    </div>
                    <div class="filters__item_read"
                        v-else
                        >
                        <div class="filters__item_button filters__item_button_edit"
                            @click="startFilterEdit(filter, item.id, item.name, type)"
                            >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.3265 10.6355C11.6979 10.6355 12 10.9415 12 11.3178C12 11.6947 11.6979 12 11.3265 12H7.51979C7.14839 12 6.84631 11.6947 6.84631 11.3178C6.84631 10.9415 7.14839 10.6355 7.51979 10.6355H11.3265ZM8.68657 0.466042L9.66991 1.24719C10.0732 1.56251 10.342 1.97817 10.4339 2.41533C10.5401 2.8962 10.4269 3.36847 10.1085 3.77696L4.25093 11.3519C3.98211 11.6959 3.58594 11.8894 3.16148 11.8966L0.82693 11.9253C0.699591 11.9253 0.593475 11.8393 0.565178 11.7174L0.034599 9.41698C-0.057368 8.99416 0.034599 8.55701 0.303426 8.22018L4.45609 2.84532C4.52683 2.75932 4.65417 2.7457 4.73906 2.80948L6.48644 4.19978C6.59963 4.29295 6.75526 4.34311 6.91797 4.32161C7.26462 4.27861 7.49807 3.96329 7.4627 3.62646C7.44148 3.45447 7.35659 3.31114 7.2434 3.20364C7.20802 3.17497 5.54554 1.84201 5.54554 1.84201C5.43943 1.75601 5.41821 1.59835 5.5031 1.49157L6.16102 0.638038C6.76941 -0.143109 7.83057 -0.214774 8.68657 0.466042Z" fill="var(--bgcolor-5)"/>
                            </svg>
                        </div>
                        <div class="filters__item_name">
                            <span>
                                {{item.name}}
                            </span>
                        </div>
                        <div class="filters__item_button filters__item_button_delete"
                            @click="removeFilter(type, item.id)"
                            >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1223 1.94633C11.3557 1.94633 11.55 2.13953 11.55 2.38612V2.61411C11.55 2.8547 11.3557 3.05389 11.1223 3.05389H1.17831C0.944316 3.05389 0.75 2.8547 0.75 2.61411V2.38612C0.75 2.13953 0.944316 1.94633 1.17831 1.94633H2.92774C3.28311 1.94633 3.59238 1.69314 3.67233 1.33675L3.76394 0.927568C3.90632 0.370187 4.3749 0 4.91175 0H7.38884C7.91985 0 8.39309 0.370187 8.53022 0.898769L8.62826 1.33615C8.70762 1.69314 9.01689 1.94633 9.37284 1.94633H11.1223ZM10.2338 10.2806C10.4164 8.57851 10.7362 4.53405 10.7362 4.49325C10.7478 4.37025 10.7076 4.25326 10.6276 4.15846C10.5419 4.07086 10.4333 4.01807 10.3137 4.01807H1.99137C1.87117 4.01807 1.75679 4.07086 1.67743 4.15846C1.59691 4.25326 1.55723 4.37025 1.56306 4.49325C1.56413 4.50075 1.57561 4.64319 1.59479 4.88133C1.68 5.93935 1.91736 8.88634 2.07073 10.2806C2.17927 11.3072 2.85325 11.9534 3.8295 11.9768C4.58284 11.9942 5.35893 12.0002 6.15254 12.0002C6.90004 12.0002 7.6598 11.9942 8.4359 11.9768C9.44599 11.9588 10.1194 11.3252 10.2338 10.2806Z" fill="var(--bgcolor-5)"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="filters__add_wrapper" :class="{silver: isPairfiltersAdd(filter.items.length)}">
                    <label class="filters__item filters__add"
                        @click.stop="filterCreateActive(type)"
                        >
                        <input type="text" 
                            v-model="filter.create.value" 
                            :class="{'active': filter.create.active}"
                            @keydown.enter="createFilter(type, filter.create.value)"
                            />
                        <div class="filters__add_button"
                            @click="createFilter(type, filter.create.value)"
                            >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.9807 7.06251H7.12428V10.8855C7.12428 11.501 6.62092 12 6 12C5.37908 12 4.87572 11.501 4.87572 10.8855V7.06251H1.01932C0.440134 7.00305 0 6.51921 0 5.94198C0 5.36475 0.440134 4.88092 1.01932 4.82146H4.86363V1.01048C4.92361 0.436317 5.41167 0 5.99396 0C6.57624 0 7.0643 0.436317 7.12428 1.01048V4.82146H10.9807C11.5599 4.88092 12 5.36475 12 5.94198C12 6.51921 11.5599 7.00305 10.9807 7.06251Z" fill="var(--bgcolor-5)"/>
                            </svg>
                        </div>
                    </label>
                    <div class="filters__alert" :class="{'open': alert.open && alert.type === type}">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 -0.000488281C15.53 -0.000488281 20 4.48051 20 9.99951C20 15.5205 15.53 19.9995 10 19.9995C4.48 19.9995 0 15.5205 0 9.99951C0 4.48051 4.48 -0.000488281 10 -0.000488281ZM10 12.9305C9.52 12.9305 9.13 13.3205 9.13 13.8005C9.13 14.2805 9.52 14.6805 10.01 14.6805C10.49 14.6805 10.88 14.2805 10.88 13.8005C10.88 13.3205 10.49 12.9305 10 12.9305ZM10 5.32951C9.52 5.32951 9.12 5.73051 9.12 6.20951V10.6295C9.12 11.1105 9.52 11.4995 10 11.4995C10.48 11.4995 10.87 11.1105 10.87 10.6295V6.20951C10.87 5.73051 10.48 5.32951 10 5.32951Z" fill="var(--bgcolor-2)"/>
                        </svg>
                        <span>
                            Такой фильтр уже существует
                        </span>
                    </div>
                </div>
                <div class="filters__item empty"
                    v-for="(i, index) in filtersMaxLength - filter.items.length"
                    :key="index"
                    >
                </div>
            </div>
        </template>
        <div class="filters__column filters__column_tags">
            <div class="filters__title">
                Теги
            </div>
            
            <filters-tags 
                :tags="filters.tag"
                @edit="(e) => filters.tag.edit = e"
                @input="val => filters.tag.create.value = val"
                @createTag="createFilter"
                @editTag="editFilter"
                @removeTag="removeFilter"
                @alert="text => $emit('alert', text)" />
        </div>
    </div>
  </div>
</template>

<script>
import FiltersTags from './FiltersTags.vue';
import { mapState } from 'vuex';

export default {
    components: { FiltersTags },

    data() {
        return {
            filters: {},

            filterEdit: {},

            alert: {
                type: null,
                open: false,
            }
        }
    },

    created() {
        this.formatFilters()
        this.loadFilters()
    },

    computed: {
        ...mapState({
            filtersData: state => state.filtersData,
            filtersFromState: state => state.filters
        }),
        
        filtersMaxLength() {
            let maxLength = 0;

            for (let key in this.filters) {
                const filter = this.filters[key];

                if (filter.items.length > maxLength && key !== 'tag') {
                    maxLength = filter.items.length;
                }
            }
            
            return maxLength
        },
    },

    methods: {
        formatFilters() {
            const obj = {};

            this.filtersData.forEach(f => {
                obj[f.name] = {
                    title: f.title,
                    create: {
                        active: false,
                        value: '',
                    },
                    edit: {
                        id: null,
                        active: false,
                        value: '',
                    },
                    items: []
                }
            })

            this.filters = {...obj};
        },

        loadFilters() {
            for (let filterType in this.filters) {
                this.$store.dispatch('getFilter', {filterType: filterType}).then(() => {
                    const filter = this.filters[filterType];
                    filter.items = this.filtersFromState[filterType]
                })
            }
        },

        updateFilter(filterType) {
            this.$store.dispatch('getFilter', {filterType: filterType}).then(() => {
                const filter = this.filters[filterType]
                filter.items = this.filtersFromState[filterType]
            })
        },

        isPairfiltersAdd(itemsLength) {
            return (itemsLength+1) % 2 !== 0
        },
        
        filterCreateActive(type) {
            for (let t in this.filters) {
                this.filters[t].create.active = false
                this.filters[t].create.value = ''
            }

            this.filters[type].create.active = true;

            document.currentFilterType = type; 

            this.onInputFocusOut(this.filters[type].create.active, this.filterCreateHandler)
        },

        filterExist(filter, filterName, filterType) {
            const exist = !!filter.items.find(item => item.name === filterName);

            if (exist) {
                this.$emit('alert', 'Такой фильтр уже существует');

                this.alert.open = true;
                this.alert.type = filterType;
                
                setTimeout(() => {
                    this.alert.open = false;
                    this.type = null;
                }, 2000)
            }

            return exist;
        },

        createFilter(filterType, name) {
            const filter = this.filters[filterType];

            if (filter.create.value === '') return;
            if (this.filterExist(filter, name, filterType)) return;

            this.$store.dispatch('createFilter', { filterType: filterType, filterName: name }).then(() => {
                this.updateFilter(filterType)
            })

            filter.create.value = ''
            filter.create.active = false;
        },

        resetFilter(type) {
            console.log('reset type: ', type);
            const filter = this.filters[type]

            filter.edit = {
                active: false,
                value: '',
                id: null
            };
        },

        removeFilter(filterType, id) {
            const what = filterType === 'tag' ? 'этот тег' : 'это значение фильтра';
            if (!window.confirm(`Удалить ${what}? Это действие нельзя отменить.`)) return;

            this.$store.dispatch('removeFilter', {filterType, id}).then(() => {
                this.updateFilter(filterType)
            })
        },

        editFilter(filterType, id, name) {
            this.$store.dispatch('updateFilter', {filterType, id, name}).then(() => {
                this.updateFilter(filterType);
                this.resetFilter(filterType)
            })
        },

        startFilterEdit(filter, id, name, type) {
            filter.edit = {
                id: id,
                active: true,
                value: name
            }

            document.currentEditFilterType = type;

            this.onInputFocusOut(filter.edit.active, this.filterEditHandler)
        },

        filterCreateHandler(e) {
            const el = e.target;
            if(!el.closest('.filters__add')) {
                const filter = this.filters[e.currentTarget.currentFilterType];
                filter.create.value = ''
                filter.create.active = false;

                document.removeEventListener('mousedown', this.filterCreateHandler)
            }
        },

        filterEditHandler(e) {
            const el = e.target;
            if(!el.closest('.filters__item_edit')) {
                this.resetFilter(e.currentTarget.currentEditFilterType)
                document.removeEventListener('mousedown', this.filterEditHandler)
            }
        },

        onInputFocusOut(inputFocused, handler) {
            if(inputFocused) {
                document.addEventListener('mousedown', handler)
            } else {
                document.removeEventListener('mousedown', handler)
            }
        },
    }
}
</script>

<style scoped lang="scss">
.filters {
    &__table {
        width: 100%;
        // display: flex;
        // align-items: flex-start;
        // justify-content: flex-start;
        overflow: hidden;
        border-right: em(1) solid var(--bgcolor-3);
        display: grid;
        grid-template-columns: 12.7% 12.7% 12.7% 12.7% 12.7% 12.7% 23.8%;
        transition: background .2s ease-in-out, border .2s ease-in-out;
    }

    &__column {
        // width: em(264);
        width: 100%;
        border-right: em(1) solid var(--bgcolor-3);
        transition: border .2s ease-in-out;
    }

    &__column:nth-child(1) &__item {
        border-radius: em(10) 0 0 em(10);
    }

    &__column_tags {
        // width: em(500);
        border-right: none;
    }

    &__title {
        padding: em(24) em(32);
        font-style: normal;
        font-weight: 600;
        text-transform: uppercase;
        color: var(--bgcolor-5);
        border-bottom: 0.0625em solid var(--bgcolor-3);
        transition: color .2s ease-in-out, border .2s ease-in-out;

        & span {
            font-size: em(14);
            line-height: em(17, 14);
        }
    }

    &__item {
        height: em(50);
        // padding: em(10) em(32);
        padding: 0.625em 0.6em;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: background .2s ease-in-out;

        &:nth-child(2n) {
            background: var(--bgcolor-8);
        }

        &:hover {
            background: var(--bgcolor-2);
        }

        & input {
            width: 86%;
            border: 0;
            background: transparent;
            max-width: 0;
            display: block;
            transition: max-width .2s ease-in-out;
            -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
            -moz-box-sizing: border-box;    /* Firefox, other Gecko */
            box-sizing: border-box;
            padding: 0;
            color: var(--text-color-1);
            transition: color .2s ease-in-out;

            &.active {
                max-width: 100%;
                padding: em(10);
            }
        }
    }

    &__item_button {
        position: relative;
        z-index: 8;
        margin-right: .2em;

        & svg {
            height: auto;
            width: 100%;
            min-width: em(13);
            max-width: em(13);
            
            & path {
                transition: fill .2s ease-in-out;
            }
        }

        &_edit {
            &:hover {
                & svg path {
                    fill: #05CD99;
                }
            }
        }

        &_delete {
            &:hover {
                & svg path {
                    fill: #EE5D50;
                }
            }
        }
    }
    
    &__item_edit {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    &__item_edit_button {
        cursor: pointer;
        height: auto;
        width: 100%;
        min-width: em(14);
        max-width: em(14);
    }

    &__item_read {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
    }

    &__item.empty:hover {
        background: #F7F7F7;
        &:nth-child(2n) {
            background: rgba(236, 236, 236, 0.5);
        }
    }

    &__item_name {
        font-style: normal;
        font-weight: 400;
        color: var(--text-color-1);
        width: 70%;
        // max-width: 20em;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: .3em;

        & span {
            font-size: em(14);
            line-height: 104%;
        }
    }

    &__item_button {
        opacity: 0;
        visibility: hidden;
        transition: opacity .2s ease-in-out;
        cursor: pointer;

        .filters__item:hover & {
            opacity: 1;
            visibility: visible;
        }
    }
    
    &__add_wrapper {
        position: relative;
    }

    &__add {
        padding: em(10) em(10);
        text-align: center;
        cursor: pointer;
        justify-content: center;
        position: relative;

        & svg {
            height: auto;
            width: 100%;
            min-width: em(14);
            max-width: em(14);
        }

        & svg path {
            transition: fill .2s ease-in-out
        }

        &:hover svg path {
            fill: #05CD99;
        }
    }

    &__add_wrapper {
        &.silver {
            background: var(--bgcolor-8);
            transition: background .2s ease-in-out
        }
    }
}
</style>