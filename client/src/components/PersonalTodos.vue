<template>
<div class="all-todos">
    <div v-for="personalTodo in personalTodos" :key="personalTodo.id" class="todo">
        <div>
            <div class="selected-checkbox"><input type="checkbox"></div>
            <!-- slice text if there are more than 120 characters  -->
            <h3>{{ personalTodo.title?.length > 120 ? `${personalTodo.title.slice(0, 120)}...` : personalTodo.title }}</h3>
        </div>
        <div class="important-checkbox"><input type="checkbox"></div>
    </div>
</div>
</template>

<script>
export default {
    props: ['personalTodos'],
    methods: {
        
    }
}
</script>

<style>

</style>