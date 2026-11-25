<template>
  <div class="filters__tags">
    <template v-for="obj in tagsByAlphabet"
        :key="obj">
        
        <div v-if="obj.values.length" class="filters__tags_sort">
            <div class="filters__tags_sort_name">
                {{obj.key}}
            </div>
            <div class="filters__tag"
                v-for="tag in obj.values"
                :key="tag.id"
                >
                
                <div class="filters__tag_edit"
                    v-if="edit.active && edit.id == tag.id"
                    >
                    <span class="filters__input_size_calibration">
                        {{edit.value}}
                    </span>
                    <input type="text" 
                        v-model="edit.value"
                        @keydown.enter="editTag(tag.id, edit.value)"
                        >
                    <div class="filters__add_tag_button"
                        @click="editTag(tag.id, edit.value)"
                        >
                        <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.92988 6.4594C2.72785 6.4594 2.52582 6.38274 2.37159 6.22851L0.231342 4.08826C-0.0771139 3.7798 -0.0771139 3.28014 0.231342 2.97259C0.539797 2.66413 1.03856 2.66323 1.34701 2.97169L2.92988 4.55455L6.65299 0.831439C6.96144 0.522984 7.4602 0.522984 7.76866 0.831439C8.07711 1.13989 8.07711 1.63956 7.76866 1.94801L3.48816 6.22851C3.33394 6.38274 3.13191 6.4594 2.92988 6.4594Z" fill="var(--bgcolor-5)"/>
                        </svg>
                    </div>
                </div>
                <div class="filters__tag_read"
                    v-else
                    >
                    <div class="filters__tag_button filters__tag_button--edit"
                        @click="editTagStart(tag.id, tag.name)"
                        >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6Z" fill="#05CD99"/>
                            <path d="M8.36705 8.06039C8.53212 8.06039 8.66638 8.19639 8.66638 8.36361C8.66638 8.53114 8.53212 8.66683 8.36705 8.66683H6.67516C6.51009 8.66683 6.37584 8.53114 6.37584 8.36361C6.37584 8.19639 6.51009 8.06039 6.67516 8.06039H8.36705ZM7.19373 3.54063L7.63078 3.8878C7.81 4.02795 7.92948 4.21268 7.97035 4.40697C8.01751 4.6207 7.96721 4.83059 7.82572 5.01214L5.22232 8.3788C5.10285 8.53169 4.92677 8.61768 4.73812 8.62087L3.70053 8.63361C3.64394 8.63361 3.59678 8.59539 3.5842 8.54124L3.34839 7.51882C3.30751 7.3309 3.34839 7.13661 3.46786 6.98691L5.31351 4.59808C5.34495 4.55986 5.40154 4.55381 5.43927 4.58216L6.21589 5.20007C6.2662 5.24147 6.33537 5.26377 6.40769 5.25421C6.56175 5.2351 6.66551 5.09496 6.64979 4.94526C6.64036 4.86881 6.60263 4.80511 6.55232 4.75734C6.5366 4.7446 5.79771 4.15217 5.79771 4.15217C5.75055 4.11395 5.74112 4.04387 5.77885 3.99641L6.07126 3.61707C6.34166 3.26989 6.81329 3.23804 7.19373 3.54063Z" fill="var(--bgcolor-2)"/>
                        </svg>
                    </div>
                    <span>
                        {{tag.name}}
                    </span>
                    <div class="filters__tag_button filters__tag_button--delete"
                        @click="removeTag(tag.id)"
                        >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6Z" fill="#FF1923"/>
                            <path d="M7.38528 8.13655L6.02184 6.77311L4.67022 8.12473C4.45259 8.34236 4.09821 8.34081 3.87868 8.12128C3.65915 7.90176 3.65761 7.54737 3.87523 7.32975L5.22685 5.97812L3.86341 4.61468C3.67966 4.38889 3.69511 4.06221 3.89919 3.85813C4.10327 3.65405 4.42995 3.6386 4.65574 3.82235L6.01491 5.18152L7.36229 3.83414C7.5865 3.65234 7.91332 3.67064 8.11918 3.87651C8.32505 4.08237 8.34335 4.40919 8.16156 4.6334L6.81417 5.98078L8.17761 7.34422C8.36137 7.57002 8.34592 7.89669 8.14183 8.10077C7.93775 8.30485 7.61108 8.3203 7.38528 8.13655Z" fill="var(--bgcolor-2)"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <div class="filters__add_tag">
        <label>
            <div class="filters__add_tag_active"
                v-if="filtersAdd"
                >
                <span class="filters__input_size_calibration">
                    {{newTagName}}
                </span>
                <input type="text" 
                    v-model="newTagName" 
                    @input="$emit('input', newTagName)"
                    @keydown.enter="createTag"
                    >
                <div class="filters__add_tag_button"
                    @click="createTag"
                    >
                    <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.92988 6.4594C2.72785 6.4594 2.52582 6.38274 2.37159 6.22851L0.231342 4.08826C-0.0771139 3.7798 -0.0771139 3.28014 0.231342 2.97259C0.539797 2.66413 1.03856 2.66323 1.34701 2.97169L2.92988 4.55455L6.65299 0.831439C6.96144 0.522984 7.4602 0.522984 7.76866 0.831439C8.07711 1.13989 8.07711 1.63956 7.76866 1.94801L3.48816 6.22851C3.33394 6.38274 3.13191 6.4594 2.92988 6.4594Z" fill="var(--bgcolor-5)"/>
                    </svg>
                </div>
            </div>
            <div class="filters__add_tag_plus"
                v-else
                @click="tagCreate"
                >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.32045 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293422 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293422 3.25394 0.679545 3.2143H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.2143H7.32045C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32045 4.70834Z" fill="var(--bgcolor-5)"/>
                </svg>
            </div>
        </label>
        <div class="filters__alert" :class="{'open': alertOpen}">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 -0.000488281C15.53 -0.000488281 20 4.48051 20 9.99951C20 15.5205 15.53 19.9995 10 19.9995C4.48 19.9995 0 15.5205 0 9.99951C0 4.48051 4.48 -0.000488281 10 -0.000488281ZM10 12.9305C9.52 12.9305 9.13 13.3205 9.13 13.8005C9.13 14.2805 9.52 14.6805 10.01 14.6805C10.49 14.6805 10.88 14.2805 10.88 13.8005C10.88 13.3205 10.49 12.9305 10 12.9305ZM10 5.32951C9.52 5.32951 9.12 5.73051 9.12 6.20951V10.6295C9.12 11.1105 9.52 11.4995 10 11.4995C10.48 11.4995 10.87 11.1105 10.87 10.6295V6.20951C10.87 5.73051 10.48 5.32951 10 5.32951Z" fill="var(--bgcolor-2)"/>
            </svg>
            <span>
                Такой тег уже существует
            </span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: [
        'tags'
    ],

    emits: [
        'tagsUpdate',
        'createTag',
        'input'
    ],

    data() {
        return {
            newTagName: '',

            edit: {
                id: null,
                active: false,
                value: ''
            },

            filtersAdd: false,
            alertOpen: false
        }
    },

    computed: {
        sort() {
            const sortByNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            const sortByAplhabetEn = ["A", "B", "C","D", "E", "F","G", "H", "I","J", "K", "L", "M", "N", "O","P", "Q", "R","S", "T", "U","V", "W", "X", "Y", "Z"]
            const sortByAplhabetRu = ["А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я"]
            
            return sortByAplhabetEn.concat(sortByAplhabetRu, sortByNumbers);
        },

        tagsByAlphabet() {
            const tagsArray = this.tags.items;
            const tags = new Set();
            const sort = this.sort;

            sort.forEach(s => {
                const key = s.toUpperCase();
                const filteredTags = []

                for (let index in tagsArray) {
                    const tag = tagsArray[index];

                    if (tag.name.toUpperCase()[0] === key) {
                        filteredTags.push(tag)
                    }
                }

                const obj = {};

                obj.key = key;
                obj.values = filteredTags;

                tags.add(obj);
            })

            return tags;
        },
    },

    methods: {
        filterExist(filter, filterName) {
            const exist = !!filter.items.find(item => item.name === filterName);

            if (exist) {
                this.$emit('alert', 'Такой тег уже существует');

                this.alertOpen = true;

                setTimeout(() => this.alertOpen = false, 2000)
            }

            return exist;
        },

        createTag() {
            if (this.newTagName === '') return;
            if (this.filterExist(this.tags, this.newTagName)) return;

            if (Array.from(this.tags).find(tag => tag.name === this.newTagName)) return;

            this.$emit('createTag', 'tag', this.newTagName);
            this.newTagName = '';
            this.filtersAdd = false
        },

        editTag(id, value) {
            this.$emit('editTag', 'tag', id, value);

            this.edit = {
                id: null,
                active: false,
                value: ''
            }   
        },

        removeTag(id) {
            this.$emit('removeTag', 'tag', id);
        },

        editTagStart(id, name) {
            this.edit = {
                id: id,
                active: true,
                value: name
            }
        },

        tagCreate() {
            this.filtersAdd = true;
            this.onInputFocusOut()
        },

        closeListener(e) {
            console.log(123);
            const el = e.target;
            if(!el.closest('.filters__add_tag_active')) {
                this.newTagName = '';
                this.filtersAdd = false
                document.removeEventListener('mousedown', this.closeListener)
            }
        },

        onInputFocusOut() {
            if(this.filtersAdd) {
                document.addEventListener('mousedown', this.closeListener)
            } else{
                document.removeEventListener('mousedown', this.closeListener)
            }
        },

        addTagsPack() {
            const array = [ "vr", "vfx", "simulation", "ui", "screencast", "rigging", "character animation", "houdini", "unreal engine", "weapon", "preroll", "logo reveal", "cybersport"];

            array.forEach(arr => {
                console.log(arr);
                this.$emit('createTag', 'tag', arr);
            })
        },

    },

    mounted() {
    }
}
</script>

<style scoped lang="scss">
.filters {
    &__tags {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        padding: em(16);

        &_sort {
            display: flex;
            flex-wrap: wrap;
            width: 100%;

            &_name {         
                font-family: 'Montserrat';
                font-style: normal;
                font-weight: 600;
                font-size: em(16);
                line-height: em(20, 16);
                text-align: center;
                color: #7E7E7E;
                width: em(72, 16);
                margin-right: em(6, 16);

                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 0.375em;
            }
        }
    }

    &__tag {
        margin-right: em(6);
        margin-bottom: em(6);
    }
    &__tag_read {
        padding: em(8) em(16);
        height: em(40);
        background: var(--bgcolor-2);
        border-radius: em(25);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: background .2s ease-in-out;

        & span {
            font-style: normal;
            font-weight: 500;
            font-size: max(12px, em(12));
            line-height: em(15, 12);
            color: var(--text-color-4);
            user-select: none;
        }
    }

    &__tag_button {
        position: absolute;
        top: -.2em;
        cursor: pointer;
        opacity: 0;
        z-index: 0;
        transition: opacity .15s ease-in-out;

        &--edit {
            left: 0;

            & svg {
                height: auto;
                width: 100%;
                min-width: em(15);
                max-width: em(15);
            }
        }

        &--delete {
            right: 0;

            & svg {
                height: auto;
                width: 100%;
                min-width: em(15);
                max-width: em(15);
            }
        }
    }

    &__tag_read:hover {
        box-shadow: em(15) em(15) em(20) rgba(167, 167, 167, 0.03), em(10) em(15) em(15) rgba(134, 134, 134, 0.04);
        
        & .filters__tag_button {
            opacity: 1;
            z-index: 1;
        }
    }

    &__add_tag {
        width: 100%;
        position: relative;
    }
    
    &__add_tag_active, &__tag_edit {
        padding: em(6) em(8) em(6) em(10);
        // width: em(78);
        height: em(40);
        max-width: 100%;
        background: var(--bgcolor-2);
        border: em(1) solid var(--bgcolor-5);
        border-radius: em(25);
        display: flex;
        align-items: center;
        justify-content: space-between;

        position: relative;
        min-width: em(78);
        width: min-content;

        & input {
            width: max-content;
            border: 0;
            font-style: normal;
            font-weight: 500;
            font-size: max(12px, em(12));
            line-height: em(15, 12);
            color: var(--text-color-2);

            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 0.625em;
            width: 100%;
            width: calc(100% - 2.4em);
            padding: 0;
            background: transparent;
        }
    }

    &__input_size_calibration {
        visibility: hidden;
        background: #000;
        white-space: pre;
        font-style: normal;
        font-weight: 500;
        font-size: max(12px, em(12));
        line-height: em(15, 12);
        width: 62%;
    }

    &__add_tag_plus {
        padding: em(6) em(16);
        width: em(48);
        height: em(40);
        background: var(--bgcolor-3);
        border-radius: em(25);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background .15s ease-in-out;
        cursor: pointer;

        & svg {
            height: auto;
            width: 100%;
            min-width: em(11);
            max-width: em(11);
        }

        & svg path {
            transition: fill .15s ease-in-out
        }

        &:hover {
            background: var(--bgcolor-2);
            box-shadow: em(15) em(15) em(20) rgba(167, 167, 167, 0.03), em(10) em(15) em(15) rgba(134, 134, 134, 0.04);
            border-radius: em(25);

            & svg path {
                fill: #05CD99
            }
        }
    }

    &__add_tag_button {
        cursor: pointer;

        & svg {
            height: auto;
            width: 100%;
            min-width: em(9);
            max-width: em(9);
        }
    }
}
</style>