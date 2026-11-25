<template>
    <div class="works__archive"
        ref="archive"
        :class="{
            'inside': itemInsideArchive,
        }"
        >
        <div class="works__title">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 2.25C0 1.56 0.56 1 1.25 1H14.75C15.44 1 16 1.56 16 2.25V3.75C16 4.44 15.44 5 14.75 5H1.25C0.56 5 0 4.44 0 3.75V2.25ZM1 6H15V12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15H4C3.20435 15 2.44129 14.6839 1.87868 14.1213C1.31607 13.5587 1 12.7956 1 12V6ZM6.5 8C6.36739 8 6.24021 8.05268 6.14645 8.14645C6.05268 8.24021 6 8.36739 6 8.5C6 8.63261 6.05268 8.75979 6.14645 8.85355C6.24021 8.94732 6.36739 9 6.5 9H9.5C9.63261 9 9.75979 8.94732 9.85355 8.85355C9.94732 8.75979 10 8.63261 10 8.5C10 8.36739 9.94732 8.24021 9.85355 8.14645C9.75979 8.05268 9.63261 8 9.5 8H6.5Z" fill="#555555"/>
            </svg>
            <span>Архив: </span>
            <div class="works__count">
                <span>
                    {{items.length}}
                </span>
            </div>
        </div>

        <works-archive-item :items="items" 
            @edit="edit"
            @restore="removeFromArchive"
            @remove="removeProject"
            :listElement="listElement"
            @itemInsideList="$emit('itemInsideList')"
            @itemOutsideList="$emit('itemOutsideList')"
            />
    </div>
</template>

<script>
import WorksArchiveItem from './WorksArchiveItem.vue';
export default {
  components: { WorksArchiveItem },
    props: [
        'items',
        'itemInsideArchive',
        'listElement'
    ],

    emits: [
        'removeFromArchive', 
        'removeProject',
        'getArchivePositions',
        'itemInsideList',
        'itemOutsideList'
    ],

    data() {
        return {
            draganddrop: false
        }
    },

    methods: {
        edit(project) {
            this.$emit('modalEditOpen', project);
        },

        removeFromArchive(itemID) {
            this.$emit('removeFromArchive', itemID);
        },
        
        removeProject(itemID) {
            this.$emit('removeProject', itemID);
        },

        getArchiveElement() {
            this.$emit('getArchiveElement', this.$refs.archive)
        }
    },

    mounted() {
        this.getArchiveElement()
    }
}
</script>

<style scoped lang="scss">
.works {
    &__title {
        margin-bottom: em(24);
    }
    
    &__count {
        margin-left: .4em;
    }

    &__archive {
        width: 100%;
        // max-width: em(600);
        max-width: 41em;
        margin-left: em(36);
        padding: 0.5em 1em;
        border-radius: 0.6em;
        transition: background .2s ease-in-out;
        min-height: 20em;

        &.inside {
            background: var(--bgcolor-7);
        }
    }
}
</style>