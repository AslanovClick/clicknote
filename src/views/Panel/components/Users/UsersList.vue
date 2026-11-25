<template>
    <div class="users__list">
        <users-item 
            v-for="user in sortedUsers"
            :key="user.id"
            :user="user"
            :userID="userID"
            @removeUser="userID => $emit('removeUser', userID)"
        />
    </div>
</template>

<script>
import UsersItem from "./UsersItem.vue"

export default {
    components: { UsersItem },
    
    props: ['users', 'userID'],

    emits: ['removeUser'],

    computed: {
        sortedUsers() {
            const admins = this.users.filter(user => user.role === 'ROLE_ADMIN')
            const executors = this.users.filter(user => user.role === 'ROLE_EXECUTOR')
            const managers = this.users.filter(user => user.role === 'ROLE_MANAGER')

            return admins.concat(executors, managers);
        }
    }
}
</script>

<style scoped lang="scss">

.users {
    &__list {
        width: 100%;
    }
}
</style>